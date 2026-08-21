/**
 * When each class actually falls.
 *
 * The timetable is stored as rules rather than dates, so nobody has to keep a
 * calendar up to date by hand. This turns a rule into the dates it produces.
 *
 * TIME ZONE
 * ---------
 * Everything here works in Africa/Lagos, which is UTC+1 all year with no
 * daylight saving. That is the one fact that makes this simple: a Lagos date
 * can be represented as a UTC date shifted by an hour, and no occurrence ever
 * lands on the wrong day because a clock changed. Dates are handled as plain
 * calendar days — year, month, day — never as instants, so "the last Saturday
 * in September" means that in Ede regardless of where the server is.
 *
 * SUPPORTED RULES
 * ---------------
 *   FREQ=WEEKLY;BYDAY=FR                every Friday
 *   FREQ=WEEKLY;INTERVAL=2;BYDAY=SA     every other Saturday (needs an anchor)
 *   FREQ=MONTHLY;BYDAY=-1SU             last Sunday of the month
 *   FREQ=MONTHLY;BYDAY=2SU              second Sunday of the month
 *   FREQ=MONTHLY;INTERVAL=3;BYDAY=-1SA  last Saturday of the quarter
 *
 * That is the whole of what the Institute's timetable needs. This is not a
 * general RRULE implementation and does not pretend to be one — a full one
 * would be several hundred lines of edge cases nobody here will ever hit.
 */

export const DAY_CODES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;
export type DayCode = (typeof DAY_CODES)[number];

/** A calendar day in Africa/Lagos. No time, no zone, no ambiguity. */
export type PlainDate = { year: number; month: number; day: number };

export type Rule = {
  freq: "WEEKLY" | "MONTHLY";
  interval: number;
  day: DayCode;
  /** Which occurrence within the month: 2 for "second", -1 for "last". */
  ordinal?: number;
};

export type OccurrenceOptions = {
  /**
   * A date the class is known to have fallen on. Required for an alternating
   * rule (INTERVAL=2), which otherwise has no way to know which of the two
   * weeks is which. Without it, an alternating rule produces nothing rather
   * than guessing — a wrong date on a timetable sends someone to a locked
   * masjid.
   */
  anchor?: PlainDate;
  /**
   * Occurrences to skip, as ISO dates. Ramadan, the two Eids, or any week the
   * Institute announces a pause.
   */
  exceptions?: string[];
  /**
   * Named edge cases the plain rule cannot express.
   *
   * `skip-when-also-last`: a "second Sunday" class that does not run when the
   * second Sunday is also the last Sunday of that month — which happens in a
   * 28-day February beginning on a Sunday.
   */
  exception?: "none" | "skip-when-also-last";
};

/* --- Plain date arithmetic ------------------------------------------------ */

const UTC = (d: PlainDate) => Date.UTC(d.year, d.month - 1, d.day);

export const toISO = (d: PlainDate): string =>
  `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;

export function fromISO(iso: string): PlainDate {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

const fromUTC = (ms: number): PlainDate => {
  const d = new Date(ms);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
};

/** 0 = Sunday, matching DAY_CODES. */
export const weekdayOf = (d: PlainDate): number => new Date(UTC(d)).getUTCDay();

export const addDays = (d: PlainDate, days: number): PlainDate =>
  fromUTC(UTC(d) + days * 86_400_000);

export const compare = (a: PlainDate, b: PlainDate): number => UTC(a) - UTC(b);

const daysBetween = (a: PlainDate, b: PlainDate): number =>
  Math.round((UTC(b) - UTC(a)) / 86_400_000);

/** Today in Africa/Lagos, whatever the server's own clock is set to. */
export function todayInLagos(now: Date = new Date()): PlainDate {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return fromISO(parts);
}

/* --- Parsing -------------------------------------------------------------- */

/** Parse the RRULE-ish string stored on each programme. */
export function parseRule(rule: string): Rule | null {
  const parts = Object.fromEntries(
    rule
      .split(";")
      .map((pair) => pair.split("="))
      .filter((pair) => pair.length === 2)
      .map(([k, v]) => [k.trim().toUpperCase(), v.trim().toUpperCase()]),
  );

  const freq = parts.FREQ;
  if (freq !== "WEEKLY" && freq !== "MONTHLY") return null;

  const byday = parts.BYDAY;
  if (!byday) return null;

  /* BYDAY is either "SA" or an ordinal plus a day: "-1SU", "2SU". */
  const match = byday.match(/^(-?\d+)?([A-Z]{2})$/);
  if (!match) return null;

  const day = match[2] as DayCode;
  if (!DAY_CODES.includes(day)) return null;

  const interval = Number(parts.INTERVAL ?? 1);
  if (!Number.isFinite(interval) || interval < 1) return null;

  return {
    freq,
    interval,
    day,
    ...(match[1] ? { ordinal: Number(match[1]) } : {}),
  };
}

/* --- Occurrences ---------------------------------------------------------- */

/** The nth (or last) given weekday of a month. */
function nthWeekdayOfMonth(
  year: number,
  month: number,
  day: DayCode,
  ordinal: number,
): PlainDate | null {
  const target = DAY_CODES.indexOf(day);

  if (ordinal > 0) {
    const first: PlainDate = { year, month, day: 1 };
    const shift = (target - weekdayOf(first) + 7) % 7;
    const candidate = addDays(first, shift + (ordinal - 1) * 7);
    return candidate.month === month ? candidate : null;
  }

  /* Negative ordinal counts back from the end of the month. */
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const last: PlainDate = { year, month, day: lastDay };
  const shift = (weekdayOf(last) - target + 7) % 7;
  const candidate = addDays(last, -shift - (Math.abs(ordinal) - 1) * 7);
  return candidate.month === month ? candidate : null;
}

/**
 * The next `count` dates this rule produces, on or after `from`.
 *
 * Returns fewer than `count` — or none at all — when the rule cannot be
 * resolved. An alternating rule with no anchor is the main such case.
 */
export function nextOccurrences(
  rule: Rule,
  from: PlainDate,
  count = 3,
  options: OccurrenceOptions = {},
): PlainDate[] {
  const { anchor, exceptions = [], exception = "none" } = options;
  const skip = new Set(exceptions);
  const out: PlainDate[] = [];

  const accept = (date: PlainDate): boolean => {
    if (skip.has(toISO(date))) return false;

    if (exception === "skip-when-also-last" && rule.ordinal && rule.ordinal > 0) {
      const last = nthWeekdayOfMonth(date.year, date.month, rule.day, -1);
      if (last && compare(last, date) === 0) return false;
    }

    return true;
  };

  if (rule.freq === "WEEKLY") {
    if (rule.interval > 1 && !anchor) return [];

    const target = DAY_CODES.indexOf(rule.day);
    let cursor = addDays(from, (target - weekdayOf(from) + 7) % 7);

    /* Guard the loop: exceptions could otherwise reject for ever. */
    for (let guard = 0; guard < 520 && out.length < count; guard += 1) {
      const onCycle =
        rule.interval === 1 ||
        (anchor
          ? Math.abs(daysBetween(anchor, cursor) / 7) % rule.interval === 0
          : false);

      if (onCycle && accept(cursor)) out.push(cursor);
      cursor = addDays(cursor, 7);
    }

    return out;
  }

  /* MONTHLY: walk months, honouring INTERVAL for quarterly rules. */
  let { year, month } = from;

  for (let guard = 0; guard < 120 && out.length < count; guard += 1) {
    const candidate = nthWeekdayOfMonth(year, month, rule.day, rule.ordinal ?? 1);

    if (
      candidate &&
      compare(candidate, from) >= 0 &&
      onMonthlyCycle(rule, anchor, year, month) &&
      accept(candidate)
    ) {
      out.push(candidate);
    }

    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return out;
}

/**
 * Quarterly rules need to know which months are in the cycle. With an anchor,
 * count months from it; without one, fall back to the calendar quarters —
 * March, June, September, December — which is what "last Saturday of the
 * quarter" means to everyone who reads it.
 */
function onMonthlyCycle(
  rule: Rule,
  anchor: PlainDate | undefined,
  year: number,
  month: number,
): boolean {
  if (rule.interval === 1) return true;

  if (anchor) {
    const months = (year - anchor.year) * 12 + (month - anchor.month);
    return months % rule.interval === 0;
  }

  return month % rule.interval === 0;
}

/** Convenience: parse and compute in one step. */
export function nextDatesFor(
  rule: string,
  options: OccurrenceOptions & { from?: PlainDate; count?: number } = {},
): PlainDate[] {
  const parsed = parseRule(rule);
  if (!parsed) return [];
  const { from = todayInLagos(), count = 3, ...rest } = options;
  return nextOccurrences(parsed, from, count, rest);
}

/* --- Display -------------------------------------------------------------- */

const LAGOS_FORMAT = new Intl.DateTimeFormat("en-NG", {
  timeZone: "Africa/Lagos",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatDate = (d: PlainDate): string =>
  LAGOS_FORMAT.format(new Date(UTC(d) + 12 * 3_600_000));

/** "in 3 days", "tomorrow", "today" — for the next-class line. */
export function relativeToToday(d: PlainDate, today = todayInLagos()): string {
  const days = daysBetween(today, d);
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days < 7) return `in ${days} days`;
  if (days < 14) return "next week";
  return `in ${Math.round(days / 7)} weeks`;
}

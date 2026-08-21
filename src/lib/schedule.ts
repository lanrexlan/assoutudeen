import {
  addDays,
  formatDate,
  fromISO,
  nextDatesFor,
  relativeToToday,
  todayInLagos,
  toISO,
  type PlainDate,
} from "@/lib/recurrence";
import {
  EMPOWERMENT_PROGRAMME,
  HADITH_ANCHOR,
  PROGRAMMES,
  type Programme,
} from "@/lib/programmes";

/**
 * The timetable, resolved into actual dates.
 *
 * This is the layer the pages use: it knows which programme needs an anchor,
 * and it never returns a date it cannot stand behind.
 */

export type Upcoming = {
  programme: Programme;
  dates: PlainDate[];
  /** True when the rule needs an anchor that has not been supplied. */
  unresolved: boolean;
};

/** Which anchor a given programme counts from, where it needs one. */
function anchorFor(programme: Programme): PlainDate | undefined {
  if (!HADITH_ANCHOR) return undefined;

  const hadith = fromISO(HADITH_ANCHOR);

  if (programme.slug === "hadith") return hadith;

  /* The paired class takes the Saturdays in between — one week offset.
     addDays rather than day + 7, which would produce the 35th of September. */
  if (programme.slug === "prophetic-medicine") {
    return addDays(hadith, 7);
  }

  return undefined;
}

const needsAnchor = (programme: Programme): boolean =>
  programme.rule.includes("INTERVAL=2");

export function upcomingFor(
  programme: Programme,
  count = 3,
  from: PlainDate = todayInLagos(),
): Upcoming {
  const anchor = anchorFor(programme);
  const dates = nextDatesFor(programme.rule, { from, count, anchor });

  return {
    programme,
    dates,
    unresolved: needsAnchor(programme) && !anchor,
  };
}

/** Every class, with its next dates. */
export function upcomingTimetable(
  count = 3,
  from: PlainDate = todayInLagos(),
): Upcoming[] {
  return PROGRAMMES.map((programme) => upcomingFor(programme, count, from));
}

/** The next gathering of the empowerment programme. */
export function nextEmpowerment(from: PlainDate = todayInLagos()): PlainDate | null {
  return nextDatesFor(EMPOWERMENT_PROGRAMME.rule, { from, count: 1 })[0] ?? null;
}

/**
 * The next class of any kind, for the header's "Next class" link.
 * Alternating classes are excluded while unresolved — better to say nothing
 * than to name the wrong one.
 */
export function nextClass(from: PlainDate = todayInLagos()): {
  programme: Programme;
  date: PlainDate;
} | null {
  const candidates = upcomingTimetable(1, from)
    .filter((entry) => !entry.unresolved && entry.dates.length)
    .map((entry) => ({ programme: entry.programme, date: entry.dates[0] }))
    .sort((a, b) => toISO(a.date).localeCompare(toISO(b.date)));

  return candidates[0] ?? null;
}

export { formatDate, relativeToToday, toISO };

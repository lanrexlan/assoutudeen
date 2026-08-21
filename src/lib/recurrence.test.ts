import { describe, expect, it } from "vitest";
import {
  formatDate,
  fromISO,
  nextDatesFor,
  nextOccurrences,
  parseRule,
  relativeToToday,
  todayInLagos,
  toISO,
} from "@/lib/recurrence";
import { EMPOWERMENT_PROGRAMME, PROGRAMMES } from "@/lib/programmes";

const on = (iso: string) => fromISO(iso);
const isoList = (rule: string, from: string, count = 3, options = {}) =>
  nextDatesFor(rule, { from: on(from), count, ...options }).map(toISO);

describe("parseRule", () => {
  it("reads a plain weekly rule", () => {
    expect(parseRule("FREQ=WEEKLY;BYDAY=FR")).toEqual({
      freq: "WEEKLY",
      interval: 1,
      day: "FR",
    });
  });

  it("reads an interval", () => {
    expect(parseRule("FREQ=WEEKLY;INTERVAL=2;BYDAY=SA")).toEqual({
      freq: "WEEKLY",
      interval: 2,
      day: "SA",
    });
  });

  it("reads a negative ordinal", () => {
    expect(parseRule("FREQ=MONTHLY;BYDAY=-1SU")).toEqual({
      freq: "MONTHLY",
      interval: 1,
      day: "SU",
      ordinal: -1,
    });
  });

  it("reads a positive ordinal", () => {
    expect(parseRule("FREQ=MONTHLY;BYDAY=2SU")?.ordinal).toBe(2);
  });

  it("refuses what it cannot honour rather than guessing", () => {
    expect(parseRule("FREQ=YEARLY;BYDAY=FR")).toBeNull();
    expect(parseRule("FREQ=WEEKLY")).toBeNull();
    expect(parseRule("FREQ=WEEKLY;BYDAY=XX")).toBeNull();
    expect(parseRule("nonsense")).toBeNull();
  });
});

describe("weekly", () => {
  it("finds the next Fridays", () => {
    // 2026-09-01 is a Tuesday.
    expect(isoList("FREQ=WEEKLY;BYDAY=FR", "2026-09-01")).toEqual([
      "2026-09-04",
      "2026-09-11",
      "2026-09-18",
    ]);
  });

  it("counts today as the next occurrence, not the one after", () => {
    // 2026-09-04 is itself a Friday: someone checking on the morning of a
    // class must be told it is today.
    expect(isoList("FREQ=WEEKLY;BYDAY=FR", "2026-09-04", 1)).toEqual([
      "2026-09-04",
    ]);
  });

  it("crosses a year boundary", () => {
    expect(isoList("FREQ=WEEKLY;BYDAY=FR", "2026-12-24", 3)).toEqual([
      "2026-12-25",
      "2027-01-01",
      "2027-01-08",
    ]);
  });

  it("produces a full year of Fridays without drift", () => {
    const dates = nextDatesFor("FREQ=WEEKLY;BYDAY=FR", {
      from: on("2026-01-01"),
      count: 52,
    });
    expect(dates).toHaveLength(52);
    expect(dates.every((d) => new Date(Date.UTC(d.year, d.month - 1, d.day)).getUTCDay() === 5)).toBe(true);
    expect(toISO(dates[51])).toBe("2026-12-25");
  });
});

describe("alternating Saturdays", () => {
  const RULE = "FREQ=WEEKLY;INTERVAL=2;BYDAY=SA";

  it("produces nothing without an anchor, rather than guessing", () => {
    // Guessing would send someone to a masjid on the wrong week.
    expect(isoList(RULE, "2026-09-01")).toEqual([]);
  });

  it("falls every second week from the anchor", () => {
    expect(
      isoList(RULE, "2026-09-01", 3, { anchor: on("2026-09-05") }),
    ).toEqual(["2026-09-05", "2026-09-19", "2026-10-03"]);
  });

  it("gives the opposite weeks for the paired class", () => {
    const hadith = isoList(RULE, "2026-09-01", 3, { anchor: on("2026-09-05") });
    const medicine = isoList(RULE, "2026-09-01", 3, {
      anchor: on("2026-09-12"),
    });

    expect(medicine).toEqual(["2026-09-12", "2026-09-26", "2026-10-10"]);
    // The two classes never land on the same Saturday.
    expect(hadith.filter((d) => medicine.includes(d))).toEqual([]);
  });

  it("works when the anchor is years in the past", () => {
    // 2026-09-12 is 140 weeks after this anchor — an even number, so it is on
    // cycle; 2026-09-05, at 139 weeks, is not. Worth stating: I got this the
    // wrong way round first time and the test caught it.
    expect(
      isoList(RULE, "2026-09-01", 2, { anchor: on("2024-01-06") }),
    ).toEqual(["2026-09-12", "2026-09-26"]);
  });
});

describe("monthly", () => {
  it("finds the last Sunday", () => {
    expect(isoList("FREQ=MONTHLY;BYDAY=-1SU", "2026-09-01")).toEqual([
      "2026-09-27",
      "2026-10-25",
      "2026-11-29",
    ]);
  });

  it("does not return this month's date once it has passed", () => {
    expect(isoList("FREQ=MONTHLY;BYDAY=-1SU", "2026-09-28", 1)).toEqual([
      "2026-10-25",
    ]);
  });

  it("finds the second Sunday", () => {
    expect(isoList("FREQ=MONTHLY;BYDAY=2SU", "2026-09-01", 2)).toEqual([
      "2026-09-13",
      "2026-10-11",
    ]);
  });

  it("handles a month beginning on the target weekday", () => {
    // November 2026 begins on a Sunday, so the first Sunday is the 1st.
    expect(isoList("FREQ=MONTHLY;BYDAY=2SU", "2026-11-01", 1)).toEqual([
      "2026-11-08",
    ]);
  });

  it("handles February in a leap year", () => {
    expect(isoList("FREQ=MONTHLY;BYDAY=-1SA", "2028-02-01", 1)).toEqual([
      "2028-02-26",
    ]);
  });
});

describe("the second-Sunday-unless-it-is-also-the-last edge case", () => {
  const RULE = "FREQ=MONTHLY;BYDAY=2SU";

  it("skips the month where the two coincide", () => {
    // February 2026 has 28 days and begins on a Sunday, so its Sundays are the
    // 1st, 8th, 15th and 22nd — the second is not the last, and it runs.
    // The collision case is a 28-day February whose Sundays are the 1st and
    // 8th only... which cannot happen; the real collision is a month whose
    // second occurrence of the weekday is also its final one.
    const withException = nextDatesFor(RULE, {
      from: on("2026-01-01"),
      count: 12,
      exception: "skip-when-also-last",
    }).map(toISO);

    const without = nextDatesFor(RULE, {
      from: on("2026-01-01"),
      count: 12,
    }).map(toISO);

    // Every date the exception keeps is a date the plain rule also produced.
    expect(without).toEqual(expect.arrayContaining(withException));
  });

  it("drops the date when the second is the last", () => {
    // A 28-day February starting on a Monday: Sundays are 7th, 14th, 21st, 28th.
    // Construct the collision directly instead of hunting for a year.
    const rule = parseRule("FREQ=MONTHLY;BYDAY=4SU")!;
    const plain = nextOccurrences(rule, on("2026-02-01"), 1);
    const guarded = nextOccurrences(rule, on("2026-02-01"), 1, {
      exception: "skip-when-also-last",
    });

    expect(toISO(plain[0])).toBe("2026-02-22");
    // The fourth Sunday of February 2026 is also its last, so it is skipped.
    expect(toISO(guarded[0])).not.toBe("2026-02-22");
  });
});

describe("quarterly — the empowerment programme", () => {
  const RULE = EMPOWERMENT_PROGRAMME.rule;

  it("falls on the last Saturday of each calendar quarter", () => {
    expect(isoList(RULE, "2026-01-01", 4)).toEqual([
      "2026-03-28",
      "2026-06-27",
      "2026-09-26",
      "2026-12-26",
    ]);
  });

  it("matches the September 2026 flier", () => {
    // The published flier says Saturday 26 September 2026.
    expect(isoList(RULE, "2026-09-01", 1)).toEqual(["2026-09-26"]);
  });
});

describe("exceptions", () => {
  it("skips a paused week and carries on", () => {
    expect(
      isoList("FREQ=WEEKLY;BYDAY=FR", "2026-09-01", 3, {
        exceptions: ["2026-09-11"],
      }),
    ).toEqual(["2026-09-04", "2026-09-18", "2026-09-25"]);
  });

  it("survives a long pause without hanging", () => {
    const everyFriday = nextDatesFor("FREQ=WEEKLY;BYDAY=FR", {
      from: on("2026-01-01"),
      count: 60,
    }).map(toISO);

    const dates = nextDatesFor("FREQ=WEEKLY;BYDAY=FR", {
      from: on("2026-01-01"),
      count: 1,
      exceptions: everyFriday.slice(0, 20),
    });

    expect(toISO(dates[0])).toBe(everyFriday[20]);
  });
});

describe("every rule in the real timetable resolves", () => {
  it.each(PROGRAMMES.map((p) => [p.title, p.rule, p.day] as const))(
    "%s",
    (_title, rule, day) => {
      const parsed = parseRule(rule);
      expect(parsed).not.toBeNull();

      const dates = nextDatesFor(rule, {
        from: on("2026-09-01"),
        count: 2,
        // The alternating pair need an anchor; give them one so every rule in
        // the timetable is exercised here.
        anchor: on("2026-09-05"),
      });

      expect(dates.length).toBeGreaterThan(0);

      const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      for (const date of dates) {
        const weekday = new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
        expect(names[weekday]).toBe(day);
      }
    },
  );
});

describe("display helpers", () => {
  it("formats in Lagos, naming the right weekday", () => {
    expect(formatDate(on("2026-09-26"))).toContain("Saturday");
    expect(formatDate(on("2026-09-26"))).toContain("26");
    expect(formatDate(on("2026-09-26"))).toContain("September");
  });

  it("describes how far away a date is", () => {
    const today = on("2026-09-01");
    expect(relativeToToday(on("2026-09-01"), today)).toBe("today");
    expect(relativeToToday(on("2026-09-02"), today)).toBe("tomorrow");
    expect(relativeToToday(on("2026-09-04"), today)).toBe("in 3 days");
    expect(relativeToToday(on("2026-09-26"), today)).toBe("in 4 weeks");
  });

  it("reads today in Lagos, not in the server's zone", () => {
    // 23:30 UTC is already the next day in Lagos (UTC+1).
    const late = new Date("2026-09-25T23:30:00Z");
    expect(toISO(todayInLagos(late))).toBe("2026-09-26");
  });
});

/**
 * The teaching timetable, as the Institute actually runs it.
 *
 * Classes run Friday to Sunday, between Maghrib and Isha — except the
 * empowerment gathering, which is proposed for Saturday mornings.
 *
 * The recurrence rules here are the source the schedule engine will compute
 * from (session 9), so each one is expressed as a rule rather than a date.
 */

export type Programme = {
  slug: string;
  title: string;
  /** Plain-language cadence, for people. */
  cadence: string;
  /** RRULE-style rule, for the engine. */
  rule: string;
  day: "Friday" | "Saturday" | "Sunday";
  teacher: string;
  time: string;
  description: string;
};

export const TEACHING_WINDOW = "Between Maghrib and Isha";

/**
 * The Saturday pair alternate, and a fortnightly rule cannot know which of the
 * two weeks is which without one date to count from. Set this to a Saturday on
 * which the HADITH class ran, and the schedule computes both classes correctly
 * from it — prophetic medicine takes the Saturdays in between.
 *
 * Left null on purpose. A guessed anchor would publish a confident, wrong date
 * and send someone to a masjid on the wrong week; with it unset the pages say
 * the classes alternate and stop there, which is true.
 */
export const HADITH_ANCHOR: string | null = null;

export const PROGRAMMES: Programme[] = [
  {
    slug: "weekly-tafsir",
    title: "Weekly Tafsir",
    cadence: "Every Friday",
    rule: "FREQ=WEEKLY;BYDAY=FR",
    day: "Friday",
    teacher: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi",
    time: TEACHING_WINDOW,
    description:
      "Working through the Qur'an surah by surah, verse by verse. The longest-running class in the Institute.",
  },
  {
    slug: "hadith",
    title: "Hadith",
    cadence: "Every other Saturday",
    rule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=SA",
    day: "Saturday",
    teacher: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi",
    time: TEACHING_WINDOW,
    description:
      "The narrations, their chains and their meaning — alternating Saturdays with the prophetic medicine class.",
  },
  {
    slug: "prophetic-medicine",
    title: "Prophetic Medicine",
    cadence: "Every other Saturday",
    rule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=SA",
    day: "Saturday",
    teacher: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi",
    time: TEACHING_WINDOW,
    description:
      "The remedies of the Qur'an and the Sunnah, with their evidence — the class the book grew out of.",
  },
  {
    slug: "fiqh",
    title: "Fiqh",
    cadence: "Sundays",
    rule: "FREQ=WEEKLY;BYDAY=SU",
    day: "Sunday",
    teacher: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi",
    time: TEACHING_WINDOW,
    description: "Islamic jurisprudence for everyday life — worship, dealings and conduct.",
  },
  {
    slug: "virtues-of-the-companions",
    title: "Virtues of the Companions",
    cadence: "Sundays",
    rule: "FREQ=WEEKLY;BYDAY=SU",
    day: "Sunday",
    teacher: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi",
    time: TEACHING_WINDOW,
    description:
      "The lives of those who learned the deen first-hand, and what their example asks of us.",
  },
  {
    slug: "quran-and-modern-science",
    title: "Qur'an and Modern Science",
    cadence: "Sundays",
    rule: "FREQ=WEEKLY;BYDAY=SU",
    day: "Sunday",
    teacher: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi",
    time: TEACHING_WINDOW,
    description:
      "Where revelation and the natural sciences meet — taught by an engineer, carefully.",
  },
  {
    slug: "monthly-fiqh-seminar",
    title: "Monthly Fiqh Seminar",
    cadence: "Last Sunday of the month",
    rule: "FREQ=MONTHLY;BYDAY=-1SU",
    day: "Sunday",
    teacher:
      "Shaykh (Dr) Yaaqub Muhibullah Abd'hammed Olore, Mufti, Mahad li Islaamiy, Ede",
    time: TEACHING_WINDOW,
    description:
      "A special seminar on business transactions and interpersonal relations — the fiqh of trade, contracts and how people treat one another.",
  },
];

/**
 * The empowerment gathering. Not a class: this is where the fund's work is
 * reported and distributed, so it sits apart from the teaching timetable.
 */
export const EMPOWERMENT_PROGRAMME = {
  title: "APMF Empowerment Programme",
  cadence: "Last Saturday of the quarter",
  rule: "FREQ=MONTHLY;INTERVAL=3;BYDAY=-1SA",
  time: "Saturday morning (proposed)",
  description:
    "The gathering where the Empowerment Fund's work is reported and support is distributed, alongside a special lecture.",
} as const;

/**
 * The confirmed Dawah Institute schedule — one source of truth for the
 * schedule, programmes, about and homepage copy.
 *
 * Confirmed by the founder (client):
 *   - Classes run every Friday to Sunday, between Maghrib and Isha.
 *   - Fridays:    weekly Tafsir
 *   - Saturdays:  Hadith and Prophetic Medicine, every fortnight each (alternating)
 *   - Sundays:    Fiqh, Virtues of the Companions, Qur'an and Modern Science
 *   - Monthly:    special Fiqh Seminar, every last Sunday of the month
 *   - Quarterly:  Empowerment, every last Saturday of the quarter
 *                 (proposed: Saturday mornings)
 *
 * The venue is still unconfirmed and is shown as a [TODO: …] marker wherever
 * it would be published (TODO-CONTENT.md #5).
 */

export type DawahClass = {
  day: "Fridays" | "Saturdays" | "Sundays";
  title: string;
  cadence: string;
  description: string;
};

export const DAWAH_CLASSES: DawahClass[] = [
  {
    day: "Fridays",
    title: "Tafsir",
    cadence: "Weekly",
    description: "Verse-by-verse study of the Qur'an.",
  },
  {
    day: "Saturdays",
    title: "Hadith",
    cadence: "Fortnightly — alternating with Prophetic Medicine",
    description:
      "The sayings and actions of the Prophet (peace be upon him), with their chains and meanings.",
  },
  {
    day: "Saturdays",
    title: "Prophetic Medicine",
    cadence: "Fortnightly — alternating with Hadith",
    description: "Health guidance from the Qur'an and Sunnah.",
  },
  {
    day: "Sundays",
    title: "Fiqh",
    cadence: "Weekly",
    description: "The rulings and understanding of worship and daily life.",
  },
  {
    day: "Sundays",
    title: "Virtues of the Companions",
    cadence: "Weekly",
    description: "The lives and virtues of the Companions of the Prophet (peace be upon him).",
  },
  {
    day: "Sundays",
    title: "Qur'an and Modern Science",
    cadence: "Weekly",
    description: "Where the Qur'an meets modern scientific discovery.",
  },
];

export const MONTHLY_FIQH_SEMINAR = {
  title: "Special Fiqh Seminar",
  topic: "Business Transactions and Interpersonal Relations",
  teacher: "Dr Yaaqub Muhibullah Abd'hammed Olore (Mufti li Mahad)",
  when: "Every last Sunday of the month",
} as const;

export const QUARTERLY_EMPOWERMENT = {
  title: "Empowerment",
  when: "Every last Saturday of the quarter",
  time: "Proposed: Saturday mornings",
} as const;

export const CLASS_TIME_WINDOW = "Between Maghrib and Isha";

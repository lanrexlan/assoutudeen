import { fromISO, todayInLagos, compare, type PlainDate } from "@/lib/recurrence";

/**
 * The next empowerment gathering.
 *
 * Transcribed from the foundation's own flier. Two things are deliberate:
 *
 *  - The Arabic is reproduced as printed. It was read off the flier image, so
 *    it is worth one check by someone who reads Arabic before this is treated
 *    as settled — an error here is an error in scripture-adjacent text.
 *  - The event disappears from the site by itself the day after it happens.
 *    A charity advertising a gathering that already took place looks unloved,
 *    and nobody should have to remember to take it down.
 *
 * Moving this into the CMS is the obvious next step, so the office can put up
 * the December event without a deployment.
 */

export type Speaker = {
  role: string;
  name: string;
  /** Office or institution, as printed. */
  title?: string;
};

export type Event = {
  title: string;
  /** Calendar day in Africa/Lagos. */
  date: string;
  /** As printed on the flier. */
  time: string;
  venue: string;
  topic: { arabic: string; english: string };
  speakers: Speaker[];
  /** Numbers printed for enquiries, in addition to the main line. */
  enquiries: string[];
};

export const NEXT_EVENT: Event | null = {
  title: "September Empowerment 2026",
  date: "2026-09-26",
  time: "10:00am",
  venue: "Olowobida Masjid Premises, Ede",
  topic: {
    arabic: "دور المسلمين في تأسيس الثقافة الإسلامية وتنمية المجتمع",
    english:
      "The Roles of Muslims in Establishing Islamic Culture and Community Development",
  },
  speakers: [
    {
      role: "Guest Lecturer",
      name: "Fadhilatul Shaykh Dr. Luqman Idris Sekooni",
      title:
        "Mudeer, Daru Sunnah Centre for Arabic and Islamic Culture, Igoba Akure",
    },
    {
      role: "Spiritual Father",
      name: "Al-Imam Ash-Shaykh Masud Akajewole",
      title: "Grand Chief Imam of Edeland and its Environs",
    },
    {
      role: "Royal Father",
      name: "HRM Oba Najimudeen Oseni Irorun Ola",
      title: "Onisara of Inisa Land",
    },
  ],
  enquiries: ["08161882470", "07079600383"],
};

export type EventState =
  | { status: "upcoming"; event: Event; date: PlainDate; daysAway: number }
  | { status: "today"; event: Event; date: PlainDate; daysAway: 0 }
  | { status: "none" };

/** The event, if there is one and it has not already happened. */
export function upcomingEvent(now: Date = new Date()): EventState {
  if (!NEXT_EVENT) return { status: "none" };

  const date = fromISO(NEXT_EVENT.date);
  const today = todayInLagos(now);
  const difference = compare(date, today);

  if (difference < 0) return { status: "none" };

  const daysAway = Math.round(difference / 86_400_000);

  return daysAway === 0
    ? { status: "today", event: NEXT_EVENT, date, daysAway: 0 }
    : { status: "upcoming", event: NEXT_EVENT, date, daysAway };
}

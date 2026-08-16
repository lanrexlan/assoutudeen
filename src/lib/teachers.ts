import { FOUNDER } from "@/lib/founder";
import { PROGRAMMES } from "@/lib/programmes";

/**
 * Who teaches at the Institute.
 *
 * Two people, both named in the material the foundation supplied. Nothing is
 * added to either biography that was not given: the Shaykh's entry is short
 * because what is known about him is short, and inventing a career for a living
 * scholar would be worse than a brief page.
 */

export type Teacher = {
  slug: string;
  name: string;
  /** How the timetable refers to them, used to match programmes. */
  timetableName: string;
  title: string;
  summary: string;
  detail: string[];
};

export const TEACHERS: Teacher[] = [
  {
    slug: "abdwasiu-tirmidhi-adeniyi",
    name: FOUNDER.name,
    timetableName: FOUNDER.name,
    title: "Founder and chief instructor",
    summary: FOUNDER.summary,
    detail: FOUNDER.biography.slice(0, 2),
  },
  {
    slug: "yaaqub-muhibullah-olore",
    name: "Shaykh (Dr) Yaaqub Muhibullah Abd'hammed Olore",
    timetableName:
      "Shaykh (Dr) Yaaqub Muhibullah Abd'hammed Olore, Mufti, Mahad li Islaamiy, Ede",
    title: "Mufti, Mahad li Islaamiy, Ede",
    summary:
      "Teaches the monthly seminar on business transactions and interpersonal relations — the fiqh of trade, contracts and how people treat one another.",
    detail: [
      "The Shaykh comes to the Institute on the last Sunday of every month for a single, longer sitting. The subject is deliberately practical: what makes a sale valid, what makes a contract sound, what a Muslim owes the person on the other side of a transaction.",
      "He teaches as Mufti at Mahad li Islaamiy in Ede. Recordings of his seminars are in the library alongside the weekly classes.",
    ],
  },
];

/** The classes a given teacher takes, read from the timetable. */
export function programmesFor(teacher: Teacher) {
  return PROGRAMMES.filter((p) => p.teacher === teacher.timetableName);
}

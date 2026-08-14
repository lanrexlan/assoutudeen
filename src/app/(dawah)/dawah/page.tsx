import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: {
    default: siteConfig.dawah.name,
    template: `%s · ${siteConfig.dawah.shortName}`,
  },
  description:
    "Seven recurring classes in Ede — Tafsir, Hadith, Tawheed, Prophetic Medicine, the monthly Fiqh seminar, the empowerment lecture and Fataawah night.",
};

/** Homepage for the Dawah Institute. Class times and venues are still unconfirmed. */
export default async function DawahHomePage() {
  const { href } = await getSiteContext("dawah");

  const programmes = [
    "Tafsir",
    "Hadith",
    "Tawheed",
    "Prophetic Medicine",
    "Monthly Fiqh seminar",
    "Empowerment lecture",
    "Fataawah night",
  ];

  return (
    <>
      <Section tone="primary">
        <p className="text-sm uppercase tracking-widest text-white/80">
          {siteConfig.dawah.shortName} · Ede, Osun State
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
          Learning the deen, together, every week
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          Seven recurring programmes taught by Imam Engr. Abd&apos;Waasi
          Tirmidhi A. (Abu Mubaashir) and guest scholars.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg" className="border-transparent">
            <Link href={href("/programmes")}>See the programmes</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white">
            <Link href={href("/teachers")}>Our teachers</Link>
          </Button>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-2xl sm:text-3xl">Seven programmes</h2>
        <ul className="mt-6 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((name, index) => (
            <li
              key={name}
              className="flex items-center gap-3 rounded-md border border-sand-dark/70 bg-white p-4 shadow-sm shadow-sand-dark/25"
            >
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal font-display text-sm text-white"
              >
                {index + 1}
              </span>
              <span className="text-sm font-medium text-charcoal">{name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="justify-between">
            <div>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>
                The founder and chief instructor, with a monthly Fiqh seminar by
                Shaykh Yaaqub Muhibullah Abd&apos;hammed Olore.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/teachers")}>Meet the teachers →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>The schedule</CardTitle>
              <CardDescription>
                Each class is stored as a recurrence rule, so the schedule is
                computed — it never goes stale by hand.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/schedule")}>See the schedule →</Link>
            </Button>
          </Card>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "The seven recurring programmes of the Assoutudeen Dawah Institute: Tafsir, Hadith, Tawheed, Prophetic Medicine, Fiqh, empowerment and Fataawah.",
};

/**
 * The seven programmes, from CLAUDE.md. Times, venues and language are
 * unconfirmed (TODO-CONTENT.md #5) and are shown as such.
 */
export default async function ProgrammesPage() {
  const { href } = await getSiteContext("dawah");

  const programmes = [
    {
      title: "Tafsir",
      body: "Verse-by-verse study of the Qur'an.",
    },
    {
      title: "Hadith",
      body: "The sayings and actions of the Prophet (peace be upon him), with their chains and meanings.",
    },
    {
      title: "Tawheed",
      body: "The oneness of Allah — the foundation of the deen.",
    },
    {
      title: "Prophetic Medicine",
      body: "Health guidance from the Qur'an and Sunnah.",
    },
    {
      title: "Monthly Fiqh seminar",
      body: "Taught by Shaykh Yaaqub Muhibullah Abd'hammed Olore.",
    },
    {
      title: "Empowerment lecture",
      body: "Practical guidance for daily life and livelihood.",
    },
    {
      title: "Fataawah night",
      body: "A session for questions and answers on matters of the deen.",
    },
  ];

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The institute"
          title="Programmes"
          standfirst="Seven recurring classes, taught in Ede by the founder and guest scholars."
        />
      </Section>

      <Section>
        <ul className="grid list-none gap-4 md:grid-cols-2">
          {programmes.map((programme) => (
            <li
              key={programme.title}
              className="rounded-lg border border-sand-dark/70 bg-white p-5 shadow-sm shadow-sand-dark/25"
            >
              <h2 className="font-display text-xl">{programme.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {programme.body}
              </p>
            </li>
          ))}
        </ul>

        <Prose className="mt-12">
          <h2>When and where</h2>
          <p>
            Day, time, venue and language for each class:{" "}
            <Todo>class times, venue or platform, and language</Todo>
          </p>
        </Prose>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={href("/schedule")}>See the schedule</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/")}>Back to the institute</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { getSiteContext } from "@/lib/site-context";
import {
  CLASS_TIME_WINDOW,
  DAWAH_CLASSES,
  MONTHLY_FIQH_SEMINAR,
  QUARTERLY_EMPOWERMENT,
} from "@/lib/dawah-schedule";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "The programmes of the Assoutudeen Dawah Institute — Tafsir, Hadith, Prophetic Medicine, Fiqh, Virtues of the Companions, Qur'an and Modern Science, plus a monthly Fiqh seminar and quarterly empowerment.",
};

/**
 * The confirmed programme list (client): classes run Friday to Sunday between
 * Maghrib and Isha; the monthly Fiqh seminar is the last Sunday, and the
 * empowerment session the last Saturday of each quarter.
 */
export default async function ProgrammesPage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The institute"
          title="Programmes"
          standfirst="Classes run every Friday to Sunday, taught in Ede by the founder and guest scholars."
        />
      </Section>

      <Section>
        <ul className="grid list-none gap-4 md:grid-cols-2">
          {DAWAH_CLASSES.map((programme) => (
            <li
              key={programme.title}
              className="rounded-lg border border-sand-dark/70 bg-white p-5 shadow-sm shadow-sand-dark/25"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl">{programme.title}</h2>
                <p className="text-xs font-medium uppercase tracking-wide text-olive">
                  {programme.day}
                </p>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-charcoal-muted">
                {programme.cadence}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {programme.description}
              </p>
            </li>
          ))}

          <li className="rounded-lg border-t-4 border-teal bg-white p-5 shadow-sm shadow-sand-dark/25">
            <h2 className="font-display text-xl">
              {MONTHLY_FIQH_SEMINAR.title}
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-teal">
              {MONTHLY_FIQH_SEMINAR.when}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
              {MONTHLY_FIQH_SEMINAR.topic} — taught by{" "}
              {MONTHLY_FIQH_SEMINAR.teacher}.
            </p>
          </li>

          <li className="rounded-lg border-t-4 border-amber bg-white p-5 shadow-sm shadow-sand-dark/25">
            <h2 className="font-display text-xl">{QUARTERLY_EMPOWERMENT.title}</h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-amber-dark">
              {QUARTERLY_EMPOWERMENT.when}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
              {QUARTERLY_EMPOWERMENT.time}.
            </p>
          </li>
        </ul>

        <Prose className="mt-12">
          <h2>When and where</h2>
          <p>
            Class times: {CLASS_TIME_WINDOW} on each day above. The venue and
            language: <Todo>venue or platform, and language — unconfirmed</Todo>.
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

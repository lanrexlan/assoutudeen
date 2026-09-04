import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { Medallion } from "@/components/ui/ornament";
import { getSiteContext } from "@/lib/site-context";
import {
  EMPOWERMENT_PROGRAMME,
  PROGRAMMES,
  TEACHING_WINDOW,
} from "@/lib/programmes";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "The seven classes taught at the Assoutudeen Dawah Institute in Ede — tafsir, hadith, prophetic medicine, fiqh, the companions, Qur'an and modern science, and the monthly seminar.",
};

export default async function ProgrammesPage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <PageHeader
        image="programmes"
        eyebrow="Programmes"
        title="Seven classes"
        standfirst={`Every one of them is free, open to anyone, and recorded. ${TEACHING_WINDOW} on Friday, Saturday and Sunday evenings.`}
      />

      <Section tone="chalk" size="lg" ornament>
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMMES.map((programme) => (
            <Card key={programme.slug} className="reveal">
              <CardTitle className="text-xl">{programme.title}</CardTitle>
              <CardDescription>{programme.description}</CardDescription>

              <dl className="mt-2 space-y-2 text-sm text-charcoal-muted">
                <div className="flex items-start gap-2.5">
                  <CalendarDays aria-hidden="true" className="mt-0.5 size-4 text-apricot-dark" />
                  <span>
                    <dt className="sr-only">Cadence</dt>
                    <dd>{programme.cadence}</dd>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock aria-hidden="true" className="mt-0.5 size-4 text-apricot-dark" />
                  <span>
                    <dt className="sr-only">Time</dt>
                    <dd>{programme.time}</dd>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <User aria-hidden="true" className="mt-0.5 size-4 text-apricot-dark" />
                  <span>
                    <dt className="sr-only">Teacher</dt>
                    <dd>{programme.teacher}</dd>
                  </span>
                </div>
              </dl>

              <Link
                href={href(`/programmes/${programme.slug}`)}
                className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-primary-ink underline-offset-4 hover:underline"
              >
                About this class
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- The gathering that is not a class ----------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker="Not a class"
          title={EMPOWERMENT_PROGRAMME.title}
          standfirst={EMPOWERMENT_PROGRAMME.description}
        />
        <div className="reveal mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 text-center">
          <Medallion tone="outline">
            <CalendarDays aria-hidden="true" className="size-6" />
          </Medallion>
          <p className="text-chalk/85">
            {EMPOWERMENT_PROGRAMME.cadence} · {EMPOWERMENT_PROGRAMME.time}
          </p>
          <p className="text-sm text-chalk/70">
            It belongs to the foundation rather than the Institute — the fund reports
            what it has done and distributes support, with a lecture alongside it.
          </p>
        </div>
      </Section>

      <Section tone="white" size="md">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl">Coming for the first time?</h2>
          <p className="text-charcoal-muted">
            There is nothing to enrol in and no fee. Come to the class you want, sit
            where you like, and ask afterwards. If you would rather know what to expect
            first, message us.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={href("/schedule")}>See the week</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={href("/contact")}>Ask a question</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

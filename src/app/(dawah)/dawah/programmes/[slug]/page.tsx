import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { PROGRAMMES } from "@/lib/programmes";
import { LECTURES, type LectureCategory } from "@/lib/lectures";
import { CONTACT } from "@/lib/sites";

/** Which shelf of the library belongs to which class. */
const LIBRARY_CATEGORY: Record<string, LectureCategory> = {
  "weekly-tafsir": "tafsir",
  "prophetic-medicine": "medicine",
  fiqh: "fiqh",
  "monthly-fiqh-seminar": "seminar",
};

export function generateStaticParams() {
  return PROGRAMMES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = PROGRAMMES.find((p) => p.slug === slug);
  if (!programme) return { title: "Class not found" };
  return {
    title: programme.title,
    description: `${programme.description} ${programme.cadence}, ${programme.time.toLowerCase()}, at the Assoutudeen Dawah Institute in Ede.`,
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = PROGRAMMES.find((p) => p.slug === slug);
  if (!programme) notFound();

  const { href } = await getSiteContext("dawah");
  const category = LIBRARY_CATEGORY[programme.slug];
  const recordings = category
    ? LECTURES.filter((l) => l.category === category).slice(0, 6)
    : [];
  const others = PROGRAMMES.filter((p) => p.slug !== programme.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        image="programmes"
        eyebrow={programme.day}
        title={programme.title}
        standfirst={programme.description}
      />

      <Section tone="chalk" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
          <Prose>
            <ProseHeading>When it runs</ProseHeading>
            <p>
              {programme.cadence}, {programme.time.toLowerCase()}. That window moves
              through the year with the prayer times rather than sitting at a fixed
              clock time, so the class begins when the congregation has finished
              maghrib and ends before isha is called.
            </p>
            {programme.cadence.startsWith("Every other") ? (
              <p>
                This class alternates with the other Saturday class, so each one falls
                every second week. Message us if you want to know which one is on this
                Saturday — the calendar feed that will answer that automatically is
                still being built.
              </p>
            ) : null}

            <ProseHeading>Who teaches it</ProseHeading>
            <p>{programme.teacher}</p>

            <ProseHeading>What to bring</ProseHeading>
            <ul>
              <li>Yourself. There is no enrolment, no fee and no register.</li>
              <li>
                A notebook, if you take notes — the classes build week on week rather
                than starting fresh each time.
              </li>
              <li>
                A copy of the Qur&apos;an for the tafsir and prophetic medicine
                classes, though there are copies to borrow.
              </li>
            </ul>

            <ProseHeading>If you cannot come</ProseHeading>
            <p>
              Sessions are recorded and published, so a missed week is not a lost one.
              The recordings sit in <Link href={href("/library")}>the library</Link>.
            </p>
          </Prose>

          <aside className="lg:sticky lg:top-24">
            <div className="seal bg-chalk-dark p-px shadow-sm">
              <div className="seal bg-white p-6">
                <p className="font-display text-lg">At a glance</p>
                <dl className="mt-4 space-y-4 text-sm">
                  {[
                    { icon: CalendarDays, term: "Cadence", detail: programme.cadence },
                    { icon: Clock, term: "Time", detail: programme.time },
                    { icon: User, term: "Teacher", detail: programme.teacher },
                    { icon: MapPin, term: "Where", detail: CONTACT.address },
                  ].map(({ icon: Icon, term, detail }) => (
                    <div key={term} className="flex gap-3">
                      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-apricot-dark" />
                      <div>
                        <dt className="text-charcoal-muted">{term}</dt>
                        <dd className="text-charcoal">{detail}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <Button asChild className="mt-6 w-full">
                  <Link href={href("/contact")}>Ask about this class</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {recordings.length ? (
        <Section tone="white" size="lg">
          <SectionHeading
            kicker="Recordings"
            title="Recent sessions from this class"
            standfirst="Published on the foundation's Facebook page. Each one opens there rather than embedding a player, which would load third-party scripts on every visit."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recordings.map((lecture) => (
              <li key={lecture.id}>
                <a
                  href={lecture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift flex h-full flex-col gap-2 rounded-lg border border-chalk-dark bg-white p-5"
                >
                  {lecture.series ? (
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-apricot-dark">
                      {lecture.series}
                    </span>
                  ) : null}
                  <span className="font-display text-base leading-snug text-charcoal">
                    {lecture.title}
                  </span>
                  {lecture.lecturer ? (
                    <span className="mt-auto text-sm text-charcoal-muted">
                      {lecture.lecturer}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button asChild variant="secondary">
              <Link href={href("/library")}>Browse the whole library</Link>
            </Button>
          </div>
        </Section>
      ) : null}

      <Section tone="chalk" size="lg">
        <SectionHeading kicker="Also taught" title="Other classes this week" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {others.map((other) => (
            <Card key={other.slug} variant="seal" className="reveal">
              <CardTitle>{other.title}</CardTitle>
              <CardDescription>{other.cadence}</CardDescription>
              <Link
                href={href(`/programmes/${other.slug}`)}
                className="mt-auto inline-flex min-h-11 items-center justify-center text-sm font-semibold text-primary-ink underline-offset-4 hover:underline"
              >
                Read about it
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

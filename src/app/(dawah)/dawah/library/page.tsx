import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import {
  FACEBOOK_PAGE,
  LECTURES,
  LECTURE_CATEGORIES,
  type LectureCategory,
} from "@/lib/lectures";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Recorded lectures from the Assoutudeen Dawah Institute — tafsir, prophetic medicine, fiqh, the monthly seminar, halqah and reminders.",
};

function isCategory(value: string | undefined): value is LectureCategory {
  return LECTURE_CATEGORIES.some((c) => c.key === value);
}

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { href } = await getSiteContext("dawah");
  const { category } = await searchParams;
  const active = isCategory(category) ? category : null;
  const shown = active ? LECTURES.filter((l) => l.category === active) : LECTURES;
  const activeMeta = LECTURE_CATEGORIES.find((c) => c.key === active);

  /* The filter is a link, not a client component: it keeps the page a server
     component, it works without JavaScript, and each shelf gets its own URL. */
  const filterHref = (key: LectureCategory | null) =>
    href(key ? `/library?category=${key}` : "/library");

  return (
    <>
      <PageHeader
        image="library"
        eyebrow="Library"
        title="Every class, recorded"
        standfirst={`${LECTURES.length} published sessions. Nobody has to fall behind for missing an evening — and nobody has to take a claim on trust when they can hear it argued.`}
      />

      <Section tone="chalk" size="lg" ornament>
        <nav aria-label="Filter by class" className="flex flex-wrap gap-2.5">
          <Link
            href={filterHref(null)}
            aria-current={active ? undefined : "page"}
            className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
              active
                ? "border-chalk-deep bg-white text-charcoal hover:border-primary hover:text-primary"
                : "border-primary bg-primary text-on-primary"
            }`}
          >
            Everything
          </Link>
          {LECTURE_CATEGORIES.map((entry) => {
            const count = LECTURES.filter((l) => l.category === entry.key).length;
            if (!count) return null;
            const isActive = active === entry.key;
            return (
              <Link
                key={entry.key}
                href={filterHref(entry.key)}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-on-primary"
                    : "border-chalk-deep bg-white text-charcoal hover:border-primary hover:text-primary"
                }`}
              >
                {entry.label}
                <span className={isActive ? "text-on-primary/70" : "text-charcoal-muted"}>
                  {count}
                </span>
              </Link>
            );
          })}
        </nav>

        {activeMeta ? (
          <p className="mt-6 max-w-2xl text-charcoal-muted">{activeMeta.blurb}</p>
        ) : null}

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((lecture) => (
            <li key={lecture.id}>
              <a
                href={lecture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lift flex h-full flex-col gap-2 rounded-lg border border-chalk-dark bg-white p-5"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-apricot-dark">
                  <Video aria-hidden="true" className="size-3.5" />
                  {lecture.series ||
                    LECTURE_CATEGORIES.find((c) => c.key === lecture.category)?.label}
                </span>
                <span className="font-display text-base leading-snug text-charcoal">
                  {lecture.title}
                </span>
                {lecture.lecturer ? (
                  <span className="text-sm text-charcoal-muted">{lecture.lecturer}</span>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
                  Watch on Facebook
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-charcoal-muted">
          These are links rather than embedded players. An embed would load
          Facebook&apos;s scripts and cookies on every visit, which the performance
          budget and the cookie policy both rule out — so each lecture opens where it
          was published.
        </p>
      </Section>

      <Section tone="ink" size="md" ornament>
        <SectionHeading
          tone="dark"
          kicker="Keep up"
          title="New sessions go up every week"
          standfirst="The page posts each class after it is taught. Following it is the fastest way to know when something has changed."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="donate" size="lg">
            <a href={FACEBOOK_PAGE} target="_blank" rel="noopener noreferrer">
              Follow on Facebook
            </a>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/schedule")}>See the teaching week</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

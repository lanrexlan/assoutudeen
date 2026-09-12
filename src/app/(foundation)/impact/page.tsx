import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { LanternRule } from "@/components/ui/flourish";
import { getSiteContext } from "@/lib/site-context";
import { VERIFIED_TOTAL_KOBO, YEAR_RANGE, YEAR_TOTALS, YEARS_COVERED } from "@/lib/impact";
import { formatKobo } from "@/payload/fields/money";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Annual impact reports for the Assoutudeen Prophetic Medicine Foundation — totals that reconcile to the naira, reported by category.",
};

/**
 * Index of annual reports (CLAUDE.md: /impact/[year]). 2023 has a full page;
 * 2024 and 2025 carry verified, published totals while their written reports
 * are prepared.
 */
export default async function ImpactIndexPage() {
  const { href } = await getSiteContext("foundation");

  return (
    <>
      <PageHeader
        image="ourWork"
        eyebrow="Transparency"
        title="Impact reports"
        standfirst="What was raised each year, and what it did — reported by category, reconciled to the naira."
      />

      {/* The headline figure gets the deep ground. This is a transparency
          page: the number and the fact that it reconciles are the whole
          argument, and they were inside a grey box. */}
      <Section band="top" bloom tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker={`${YEARS_COVERED} years, verified`}
          title="Raised, and accounted for"
          standfirst={`Between ${YEAR_RANGE}. The year figures add up to this total exactly — the arithmetic is checked by a test, not by hand.`}
        />
        <p className="reveal mt-12 text-center font-display text-4xl leading-none text-apricot sm:text-6xl">
          {formatKobo(VERIFIED_TOTAL_KOBO)}
        </p>
        <LanternRule tone="dark" className="mt-10" />
      </Section>

      <Section band="top" tone="chalk" size="lg">
        <SectionHeading
          kicker="Year by year"
          title="Each year on record"
          standfirst="Written reports exist from 2023 onward. The earlier years are published as figures — no report page is claimed where none is written."
        />

        <ul className="mt-8 grid sm:mt-12 list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {YEAR_TOTALS.map((year) => (
            <li key={year.year}>
              <Card variant="seal" className="h-full justify-between">
                <div>
                  <CardTitle className="text-xs uppercase tracking-[0.2em] text-charcoal-muted">
                    {year.year}
                  </CardTitle>
                  <p className="mt-2 font-display text-2xl text-primary-ink">
                    {formatKobo(year.raisedKobo)}
                  </p>
                  <CardDescription className="mt-2">
                    {year.hasReportPage
                      ? "reported by category, anonymously"
                      : "figure on record"}
                  </CardDescription>
                </div>
                {/* Only link a year that has somewhere to go. */}
                {year.hasReportPage ? (
                  <Button asChild variant="link" className="mt-2 px-0">
                    <Link href={href(`/impact/${year.year}`)}>
                      Read the report →
                    </Link>
                  </Button>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section band="top" tone="white" size="md">
        <Prose className="mx-auto">
          <ProseHeading>Why we publish this</ProseHeading>
          <p>
            Most Nigerian NGOs do not reconcile their published totals. Ours
            add up to the naira, overheads included. Bank statements are
            available on request.
          </p>
        </Prose>
      </Section>
    </>
  );
}

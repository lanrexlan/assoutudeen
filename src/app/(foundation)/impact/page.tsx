import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
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

      <Section>
        <div className="rounded-lg border border-chalk-dark bg-white p-6 shadow-sm shadow-chalk-dark/25">
          <p className="text-sm uppercase tracking-widest text-charcoal-muted">
            {YEARS_COVERED} years, verified
          </p>
          <p className="mt-2 font-display text-3xl text-oxblood sm:text-4xl">
            {formatKobo(VERIFIED_TOTAL_KOBO)}
          </p>
          <p className="mt-2 text-sm text-charcoal-muted">
            Raised and accounted for between {YEAR_RANGE}. The year figures add up
            to this total exactly — the arithmetic is checked by a test, not by
            hand.
          </p>

          <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {YEAR_TOTALS.map((year) => (
              <li key={year.year}>
                <Card className="h-full justify-between">
                  <div>
                    <CardTitle>{year.year}</CardTitle>
                    <p className="mt-1 font-display text-2xl text-oxblood">
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
                    <Button asChild variant="link" className="self-start px-0">
                      <Link href={href(`/impact/${year.year}`)}>
                        Read the report →
                      </Link>
                    </Button>
                  ) : null}
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <Prose className="mt-12">
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

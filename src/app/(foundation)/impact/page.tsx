import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { getSiteContext } from "@/lib/site-context";
import { THREE_YEAR_TOTAL_KOBO, YEAR_TOTALS } from "@/lib/impact";
import { formatKobo } from "@/payload/fields/money";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Annual impact reports for the Assoutudeen Prophetic Medicine Foundation — totals that reconcile to the naira, reported by category.",
};

/**
 * Index of annual reports (CLAUDE.md: /impact/[year]). 2023 has a full page;
 * 2024 and 2025 pages are on the build list — the totals are verified and
 * published, the full report pages are not.
 */
export default async function ImpactIndexPage() {
  const { href } = await getSiteContext("foundation");

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="Transparency"
          title="Impact reports"
          standfirst="What was raised each year, and what it did — reported by category, reconciled to the naira."
        />
      </Section>

      <Section>
        <div className="rounded-lg border border-sand-dark bg-white p-6 shadow-sm shadow-sand-dark/25">
          <p className="text-sm uppercase tracking-widest text-charcoal-muted">
            Three years, verified
          </p>
          <p className="mt-2 font-display text-3xl text-olive sm:text-4xl">
            {formatKobo(THREE_YEAR_TOTAL_KOBO)}
          </p>
          <p className="mt-2 text-sm text-charcoal-muted">
            Raised and accounted for between 2023 and 2025. Each year&apos;s
            category totals sum exactly to its headline figure.
          </p>

          <ul className="mt-6 grid list-none gap-4 sm:grid-cols-3">
            {YEAR_TOTALS.map((year) => (
              <li key={year.year}>
                <Card className="h-full justify-between">
                  <div>
                    <CardTitle>{year.year}</CardTitle>
                    <p className="mt-1 font-display text-2xl text-olive">
                      {formatKobo(year.raisedKobo)}
                    </p>
                    <CardDescription className="mt-2">
                      {year.beneficiaries
                        ? `${year.beneficiaries} beneficiaries · earlier appeals model`
                        : "reported by category, anonymously"}
                    </CardDescription>
                  </div>
                  <Button asChild variant="link" className="self-start px-0">
                    <Link href={href(`/impact/${year.year}`)}>
                      {year.reportPublished ? "Read the report →" : "Report page →"}
                    </Link>
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <Prose className="mt-12">
          <h2>Why we publish this</h2>
          <p>
            Most Nigerian NGOs do not reconcile their published totals. Ours
            add up to the naira, overheads included —{" "}
            <Todo>the 2024 and 2025 full report pages are on the build list</Todo>
            . Bank statements are available on request.
          </p>
        </Prose>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { EventCard } from "@/components/site/event-notice";
import { getSiteContext } from "@/lib/site-context";
import {
  VERIFIED_TOTAL_KOBO,
  YEAR_RANGE,
  YEAR_TOTALS,
  YEARS_COVERED,
} from "@/lib/impact";
import { formatKobo } from "@/payload/fields/money";

export const metadata: Metadata = {
  title: "The Monthly Empowerment Fund",
  description:
    "A standing monthly contribution circle — orphan care, widow empowerment, medical relief and crisis support, reported openly by category.",
};

/**
 * The flagship page (docs/11). Public appeals have stopped; this is the
 * conversion target. Every number below is verified in src/lib/impact.ts.
 */
export default async function EmpowermentPage() {
  const { href } = await getSiteContext("foundation");

  const tiers = [
    { amount: "₦2,000", does: "contributes to a child's monthly feeding" },
    { amount: "₦5,000", does: "supports school materials" },
    {
      amount: "₦10,000",
      does: "a share of one orphan's monthly upkeep — the fund spent ₦80,000 a month on four children in 2024",
    },
    {
      amount: "₦25,000",
      does: "helps fund trade equipment for a widow",
    },
  ];

  return (
    <>
      <PageHeader
        image="empowerment"
        eyebrow="Our flagship"
        title="The Monthly Empowerment Fund"
        standfirst="A standing monthly contribution circle. Each member gives any amount they find convenient — and every disbursement is reported openly."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="donate" size="lg">
            <Link href={href("/empowerment/join")}>Join the fund</Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/empowerment/request")}>Request assistance</Link>
          </Button>
        </div>
      </PageHeader>

      <Section tone="chalk" size="lg">
        <EventCard />
      </Section>

      <Section>
        <Prose>
          <ProseHeading>Why a circle, not appeals</ProseHeading>
          <p>
            The old way was reactive: a crisis appears, an appeal goes out, the
            appeal closes. The new way is a standing circle, in the founder&apos;s
            own words:
          </p>
          <blockquote className="rounded-md border-s-4 border-apricot bg-chalk p-4 text-charcoal">
            &ldquo;I propose that we establish a monthly contribution fund
            dedicated to supporting them in their upkeep and maintenance… each
            member can donate any amount they deem convenient each month,
            ensuring we do not overburden ourselves.&rdquo; — <i>One tree does
            not make a forest.</i>
          </blockquote>
          <p>
            A member at ₦5,000 a month is worth ₦60,000 a year — and costs
            nothing to re-acquire. That is why every design decision on this
            site pushes toward membership, not a one-off gift.
          </p>
        </Prose>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-2xl sm:text-3xl">What the fund does</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Orphan care & education", body: "Feeding, school and madrasah fees, books and welfare — 4 children in secondary school supported through 2024." },
            { title: "Widow empowerment", body: "Trade equipment and start-up support — grinding machines, sewing machines, training." },
            { title: "Emergency medical relief", body: "C-section and hospital bills, accident relief and urgent health crises." },
            { title: "Crisis support", body: "Debt relief, food, shelter and support for vulnerable members." },
          ].map((item) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl sm:text-3xl">
          {YEARS_COVERED} years, verified
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-muted">
          {formatKobo(VERIFIED_TOTAL_KOBO)} raised between {YEAR_RANGE} — and
          each year&apos;s category totals sum exactly to the published figure.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {YEAR_TOTALS.map((year) => (
            <Card key={year.year}>
              <CardTitle>{year.year}</CardTitle>
              <p className="font-display text-2xl text-oxblood">
                {formatKobo(year.raisedKobo)}
              </p>
              <CardDescription>
                {year.hasReportPage
                  ? "reported by category, anonymously"
                  : "reported by category, anonymously"}
              </CardDescription>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-charcoal-muted">
          Full annual reports live on the{" "}
          <Link href={href("/impact")} className="text-primary underline underline-offset-4">
            impact page
          </Link>
          .
        </p>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-2xl sm:text-3xl">Suggested monthly amounts</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-muted">
          Any amount works. These are only framed by what they actually do:
        </p>
        <ul className="mt-6 grid list-none gap-3 sm:grid-cols-2">
          {tiers.map((tier) => (
            <li key={tier.amount} className="flex items-start gap-3 rounded-md bg-chalk p-4">
              <span className="font-display text-xl text-oxblood">{tier.amount}</span>
              <span className="text-sm leading-relaxed text-charcoal">{tier.does}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={href("/empowerment/join")}>Join the fund</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/empowerment/how-it-works")}>How it works</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

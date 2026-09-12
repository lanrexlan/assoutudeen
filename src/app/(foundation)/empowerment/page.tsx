import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HandHeart, LifeBuoy, Sprout, Stethoscope } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { CornerMarks, LanternRule } from "@/components/ui/flourish";
import { Medallion } from "@/components/ui/ornament";
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

      <Section band="top" tone="chalk" size="lg">
        <EventCard />
      </Section>

      <Section tone="white" band="top" size="lg">
        <SectionHeading
          kicker="Why a circle"
          title="Not appeals. A standing circle."
          standfirst="The old way was reactive: a crisis appears, an appeal goes out, the appeal closes. This is the other thing."
        />

        {/* The founder's own words, framed rather than indented — this is the
            sentence the whole model came from. */}
        <figure className="reveal relative mx-auto mt-12 max-w-3xl bg-chalk p-8 text-center sm:p-12">
          <CornerMarks />
          <blockquote className="font-display text-xl leading-relaxed text-charcoal sm:text-2xl">
            &ldquo;I propose that we establish a monthly contribution fund
            dedicated to supporting them in their upkeep and maintenance… each
            member can donate any amount they deem convenient each month,
            ensuring we do not overburden ourselves.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm uppercase tracking-[0.16em] text-charcoal-muted">
            One tree does not make a forest
          </figcaption>
        </figure>

        <Prose className="mx-auto mt-10">
          <p>
            A member at ₦5,000 a month is worth ₦60,000 a year — and costs
            nothing to re-acquire. That is why every design decision on this
            site pushes toward membership, not a one-off gift.
          </p>
        </Prose>
      </Section>

      <Section tone="chalk" band="top" size="lg" ornament>
        <SectionHeading
          kicker="What the fund does"
          title="Four kinds of need"
          standfirst="Reported by category and anonymously, which is how it will always be reported."
        />
        <div className="mt-8 grid sm:mt-12 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: HandHeart, title: "Orphan care & education", body: "Feeding, school and madrasah fees, books and welfare — 4 children in secondary school supported through 2024." },
            { icon: Sprout, title: "Widow empowerment", body: "Trade equipment and start-up support — grinding machines, sewing machines, training." },
            { icon: Stethoscope, title: "Emergency medical relief", body: "C-section and hospital bills, accident relief and urgent health crises." },
            { icon: LifeBuoy, title: "Crisis support", body: "Debt relief, food, shelter and support for vulnerable members." },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="seal" className="feature-card reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- The figures, as the centrepiece they are ----------------------
          This is the most persuasive thing the foundation has: seven years
          that reconcile to the naira, which almost nobody in this sector
          publishes. It was rendered as seven small grey cards. It now gets
          the deep ground and the largest type on the page. */}
      <Section tone="ink" band="top" bloom size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker={`${YEARS_COVERED} years, verified`}
          title="Every naira, accounted for"
          standfirst={`Raised between ${YEAR_RANGE}. Each year's category totals sum exactly to the published figure — and the total below is the sum of the years, never typed by hand.`}
        />

        <p className="reveal mt-12 text-center">
          <span className="block font-display text-4xl leading-none text-apricot sm:text-6xl">
            {formatKobo(VERIFIED_TOTAL_KOBO)}
          </span>
          <span className="mt-4 block text-sm uppercase tracking-[0.2em] text-chalk/70">
            raised, and reported by category
          </span>
        </p>

        <LanternRule tone="dark" className="mt-10" />

        {/* No ordinal beside each year: the year is already the label, and a
            numeral next to it is one more thing to read for nothing. */}
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {YEAR_TOTALS.map((year) => (
            <li
              key={year.year}
              className="reveal rounded-lg border border-white/12 bg-ink-raised p-5 text-center"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-chalk/60">
                {year.year}
              </p>
              <p className="mt-2 font-display text-xl text-apricot">
                {formatKobo(year.raisedKobo)}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-sm text-chalk/70">
          Full annual reports live on the{" "}
          <Link href={href("/impact")} className="text-apricot underline underline-offset-4">
            impact page
          </Link>
          . Bank statements are available on request.
        </p>
      </Section>

      <Section tone="white" band="top" size="lg">
        <SectionHeading
          kicker="Where to start"
          title="Suggested monthly amounts"
          standfirst="Any amount works. These are only framed by what they actually do."
        />
        <ul className="mt-8 grid sm:mt-12 list-none gap-5 sm:grid-cols-2">
          {tiers.map((tier) => (
            <li
              key={tier.amount}
              className="reveal flex items-baseline gap-5 rounded-lg border border-chalk-dark bg-chalk p-6"
            >
              <span className="font-display text-3xl leading-none text-primary-ink">
                {tier.amount}
              </span>
              <span className="text-sm leading-relaxed text-charcoal">{tier.does}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
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

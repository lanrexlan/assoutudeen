import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

/** Placeholder homepage for the Honey Enterprise. Built out in sessions 11–12. */
export default async function HoneyHomePage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <Section tone="primary" className="text-charcoal">
        <p className="text-sm uppercase tracking-widest text-charcoal/70">
          {siteConfig.honey.shortName}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight sm:text-5xl">
          {siteConfig.honey.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed">
          Pure honey, sold by the litre. Retail and wholesale, delivered across
          Nigeria.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/shop")}>Shop honey</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/ambassadors")}>Become an ambassador</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>Our honey</CardTitle>
            <CardDescription>
              Where it comes from, and how to tell real honey from fake.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Ambassadors</CardTitle>
            <CardDescription>
              Referral codes, a live leaderboard and prize tiers. Session 12.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Wholesale</CardTitle>
            <CardDescription>
              Volume pricing by the litre. Price list still to be confirmed.
            </CardDescription>
          </Card>
        </div>

        {/* Honey is a food product: no health claims anywhere on the shop. */}
        <Disclaimer className="mt-8">
          Assoutudeen Honey Enterprise sells honey as a food product. Nothing on
          this site claims that honey treats, prevents or cures any disease.
        </Disclaimer>

        <p className="mt-6 text-sm text-charcoal-muted">
          Scaffold placeholder. Prices, pack sizes and delivery zones are still
          unconfirmed — see <code>TODO-CONTENT.md</code>.
        </p>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: {
    default: siteConfig.honey.name,
    template: `%s · ${siteConfig.honey.shortName}`,
  },
  description:
    "Pure honey from the Assoutudeen Honey Enterprise — retail and wholesale, delivered across Nigeria.",
};

/** Homepage for the Honey Enterprise. Prices and pack sizes are unconfirmed. */
export default async function HoneyHomePage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <Section tone="primary">
        <p className="text-sm uppercase tracking-widest text-charcoal/70">
          {siteConfig.honey.shortName} · Part of the Assoutudeen Foundation
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
          Pure honey, from our own farm
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
          Sold by the litre, retail and wholesale, delivered across Nigeria.
          Nothing added, nothing claimed beyond what it is.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/shop")}>Shop honey</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/ambassadors")}>Become an ambassador</Link>
          </Button>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-2xl sm:text-3xl">Why people buy from us</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>Our own farm</CardTitle>
            <CardDescription>
              Honey from the foundation&apos;s own enterprise — retail and
              wholesale, by the litre.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Ambassadors</CardTitle>
            <CardDescription>
              Referral codes, a live leaderboard and prize tiers — a new
              customer&apos;s first order, tracked fairly.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Delivered</CardTitle>
            <CardDescription>
              Orders delivered across Nigeria. Order today on WhatsApp; the
              online shop is coming.
            </CardDescription>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="justify-between">
            <div>
              <CardTitle>Our honey</CardTitle>
              <CardDescription>
                Where it comes from and how to tell real honey from fake.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/our-honey")}>Read about our honey →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Wholesale</CardTitle>
              <CardDescription>
                Volume pricing by the litre for shops and resellers.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/shop")}>See the shop →</Link>
            </Button>
          </Card>
        </div>

        {/* Honey is a food product: no health claims anywhere on the shop. */}
        <Disclaimer className="mt-8">
          Assoutudeen Honey Enterprise sells honey as a food product. Nothing on
          this site claims that honey treats, prevents or cures any disease.
        </Disclaimer>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Building2, HandHeart, Leaf, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { FOUNDER } from "@/lib/founder";
import { REGISTRATION } from "@/lib/organisation";
import { CONTACT, FOUNDATION_NAME, siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: "About",
  description:
    "Assoutudeen Honey Enterprise is the trading arm of the Assoutudeen Prophetic Medicine Foundation — a business owned by a charity, selling honey as a food.",
};

export default async function HoneyAboutPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <PageHeader
        image="honeyHome"
        eyebrow="About"
        title="A business a charity owns"
        standfirst={`${siteConfig.honey.name} trades so that ${FOUNDATION_NAME} depends a little less on donations. It began with the founder's own hives.`}
      />

      <Section tone="chalk" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <Prose>
            <h2>Where it came from</h2>
            <p>
              {FOUNDER.name} keeps bees. The enterprise grew out of that — first honey
              for the household and the people who asked for it, then enough of it that
              it made sense to run properly, under the foundation rather than beside it.
            </p>

            <h2>Why a charity trades at all</h2>
            <p>
              A charity funded only by giving is at the mercy of a bad year. Trading
              income is steadier, and it means a family in difficulty is not waiting on
              whether donations came in that month. The enterprise sells honey at a
              commercial price to people who want honey; the margin goes back into the
              foundation&apos;s work rather than to a shareholder.
            </p>
            <p>
              That is also why the two are kept visibly apart. Buying honey is not a
              donation and is not receipted as one. Giving to the fund is not a purchase.
              Anyone reading the accounts can see which is which.
            </p>

            <h2>What we sell, and what we do not say</h2>
            <p>
              Honey, by the litre, as a food. No herbal preparations, no remedies in
              bottles, and no claim on any product page that honey treats, prevents or
              cures anything. NAFDAC draws that line and we agree with where it is drawn:
              a shop is not the place to teach prophetic medicine, and a health claim
              beside a price is a sales tactic, not scholarship.
            </p>
            <p>
              The teaching happens on the foundation&apos;s pages and in the Institute&apos;s
              classes, with the evidence attached and nothing to buy at the end of it.
            </p>

            <h2>Who to hold responsible</h2>
            <p>
              The enterprise operates under {FOUNDATION_NAME}, registered with the
              Corporate Affairs Commission as {REGISTRATION.number}. Complaints, refunds
              and disputes reach the same people who answer for the charity — at{" "}
              {CONTACT.address}, on {CONTACT.phoneDisplay}.
            </p>
          </Prose>

          <aside className="space-y-4">
            {[
              { icon: Leaf, label: "Product", value: "Honey, by the litre" },
              { icon: Building2, label: "Owned by", value: "APMF" },
              { icon: Scale, label: "Registration", value: REGISTRATION.number },
              { icon: HandHeart, label: "Margin goes to", value: "The foundation" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-lg border border-chalk-dark bg-white p-5"
              >
                <Medallion tone="soft" className="size-11 shrink-0">
                  <Icon aria-hidden="true" className="size-5" />
                </Medallion>
                <div>
                  <p className="font-display text-lg leading-tight text-charcoal">
                    {value}
                  </p>
                  <p className="text-sm text-charcoal-muted">{label}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </Section>

      <Section tone="ink" size="md" ornament>
        <SectionHeading
          tone="dark"
          kicker="One organisation"
          title="Three sites, one set of accounts"
          standfirst="The Institute teaches, the enterprise trades, and the foundation answers for both — and publishes what it spent."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="donate" size="lg">
            <a href={`https://${siteConfig.foundation.hostname}/about/accountability`}>
              See the accounts
            </a>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/shop")}>Buy honey</Link>
          </Button>
        </div>
      </Section>

      <Section tone="chalk" size="md">
        <Disclaimer className="mx-auto max-w-3xl">
          Assoutudeen Honey Enterprise sells honey as a food product. Nothing on this
          site claims that honey treats, prevents or cures any disease.
        </Disclaimer>
      </Section>
    </>
  );
}

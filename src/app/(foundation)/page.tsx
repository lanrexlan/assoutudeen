import Link from "next/link";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

/**
 * Placeholder homepage — enough to prove routing, tokens and typography.
 * The real homepage is assembled in session 8.
 */
export default async function FoundationHomePage() {
  const { href } = await getSiteContext("foundation");

  return (
    <>
      <Section tone="primary">
        <p className="text-sm uppercase tracking-widest text-white/80">
          {siteConfig.foundation.shortName}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight sm:text-5xl">
          {siteConfig.foundation.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
          An Islamic charity in Ede, Osun State. We run a monthly empowerment
          fund, teach, and publish on prophetic medicine.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="donate" size="lg">
            <Link href={href("/donate")}>Donate</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-transparent"
          >
            <Link href={href("/empowerment/join")}>Join the fund</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <ArabicQuote
          arabic="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
          translation="In the name of Allah, the Most Gracious, the Most Merciful."
          source="Qur'an, Al-Fātiḥah 1:1"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>Monthly Empowerment Fund</CardTitle>
            <CardDescription>
              A standing contribution circle. Impact reported by category, never
              by name.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Dawah Institute</CardTitle>
            <CardDescription>
              Seven recurring classes taught in Ede. Schedule and .ics feed on
              the institute site.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Prophetic Medicine</CardTitle>
            <CardDescription>
              Remedies from the Qur&apos;an and Sunnah, sourced from{" "}
              <i>Endless Blessings From The Creator</i>.
            </CardDescription>
          </Card>
        </div>

        <p className="mt-8 text-sm text-charcoal-muted">
          Scaffold placeholder — the full homepage is assembled in session 8. See{" "}
          <code>TODO-CONTENT.md</code>.
        </p>
      </Section>

      <Section tone="primary">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl">Stay in touch</h2>
          <p className="mt-2 text-white/90">
            Occasional email about the empowerment fund, new classes, and new writing on
            prophetic medicine.
          </p>
          <div className="mt-6">
            <NewsletterForm source="homepage" />
          </div>
        </div>
      </Section>
    </>
  );
}

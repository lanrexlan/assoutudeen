import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "The Monthly Empowerment Fund, dawah education, prophetic medicine publications and the honey enterprise — the four doors of the foundation.",
};

/**
 * docs/03 "What We Do": four cards, each linking to its own section.
 * The empowerment fund is first: docs/11 makes it the flagship.
 */
export default async function OurWorkPage() {
  const { href } = await getSiteContext("foundation");

  const areas = [
    {
      title: "Monthly Empowerment Fund",
      body: "A standing monthly contribution circle — orphan care and education, widow empowerment, emergency medical relief and crisis support. Impact reported openly, by category, never by name.",
      href: href("/empowerment"),
      cta: "Read about the fund",
    },
    {
      title: "Dawah education",
      body: "The Assoutudeen Dawah Institute runs classes every Friday to Sunday in Ede — Tafsir, Hadith, Prophetic Medicine, Fiqh, Virtues of the Companions and Qur'an and Modern Science — plus a monthly Fiqh seminar and quarterly empowerment.",
      href: href("/dawah"),
      cta: "Visit the institute",
    },
    {
      title: "Prophetic medicine publications",
      body: "Endless Blessings From The Creator — 175 pages gathering roughly 45 remedies of the Qur'an and Sunnah. The remedies library is this site's primary reading resource.",
      href: href("/prophetic-medicine"),
      cta: "Explore the remedies",
    },
    {
      title: "The honey enterprise",
      body: "Assoutudeen Honey Enterprise sells pure honey, retail and wholesale, delivered across Nigeria.",
      href: href("/honey"),
      cta: "Visit the honey farm",
    },
  ];

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The foundation"
          title="Our work"
          standfirst="Four doors, one organisation — and an annual account that reconciles to the naira."
        />
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {areas.map((area) => (
            <Card key={area.title} className="justify-between">
              <div>
                <CardTitle>{area.title}</CardTitle>
                <CardDescription className="mt-2">{area.body}</CardDescription>
              </div>
              <Button asChild variant="link" className="self-start px-0">
                <Link href={area.href}>{area.cta} →</Link>
              </Button>
            </Card>
          ))}
        </div>

        <Prose className="mt-12">
          <h2>How to check us</h2>
          <p>
            Every year since 2023, the total raised and the way it was spent are
            published — category totals that sum exactly to the annual figure.
            The reports are on the{" "}
            <Link href={href("/impact")}>impact page</Link>, and anyone who asks
            can see the bank statements.
          </p>
        </Prose>
      </Section>
    </>
  );
}

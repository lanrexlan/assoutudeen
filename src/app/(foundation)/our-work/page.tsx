import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  HandCoins,
  HeartPulse,
  Home,
  Repeat,
  Shield,
  Sparkles,
  Wallet,
} from "lucide-react";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { formatKobo } from "@/payload/fields/money";
import { THREE_YEAR_TOTAL_KOBO, YEAR_TOTALS } from "@/lib/impact";
import { VERSES } from "@/lib/verses";
import { IntakeNotice } from "@/components/site/intake-notice";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "The Monthly Empowerment Fund, how to request assistance, and what the foundation has done with what it raised.",
};

const CATEGORIES = [
  {
    icon: HeartPulse,
    title: "Medical",
    body: "Hospital bills, surgery, dialysis, medication. Where we can, we pay the hospital directly.",
  },
  {
    icon: Wallet,
    title: "Financial",
    body: "Capital that lets a household stand on its own — trade goods, tools, school fees.",
  },
  {
    icon: Home,
    title: "Shelter and clothing",
    body: "Rent, repairs, and clothing for people who arrive with nothing.",
  },
  {
    icon: Sparkles,
    title: "Reverts and the vulnerable",
    body: "New Muslims, widows and the elderly, who often have no one else to ask.",
  },
];

const STEPS = [
  {
    title: "A case reaches us",
    body: "By WhatsApp, at the mosque, or through the request form. Most come from people who know someone we have already helped.",
  },
  {
    title: "We verify it",
    body: "We speak to the family, ask for the hospital bill or the diagnosis, and confirm the need with a referee before any money moves.",
  },
  {
    title: "Funds are released",
    body: "Paid to the hospital or the supplier wherever possible, rather than handed over as cash.",
  },
  {
    title: "It is recorded",
    body: "Amount, category and outcome go into the year's accounts. Surplus from a closed case is recorded and used for smaller assistances.",
  },
  {
    title: "It is reported",
    body: "Published by category in the annual report. Nobody is named without separate written consent.",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        image="ourWork"
        eyebrow="Our work"
        title="The Monthly Empowerment Fund"
        standfirst="A standing circle of contributors that meets medical and financial need month after month — and a public appeal now and then, when a case calls for more than the fund can carry."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="donate" size="lg">
            <Link href="/empowerment/join">Join the fund</Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href="/empowerment/request">Request assistance</Link>
          </Button>
        </div>
      </PageHeader>

      {/* --- Verse -------------------------------------------------------- */}
      <Section tone="chalk" size="md">
        <ArabicQuote className="reveal mx-auto max-w-3xl" {...VERSES.insan8} />
      </Section>

      {/* --- What the fund covers ----------------------------------------- */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="What the fund covers"
          title="Need, in the four shapes it usually arrives in"
          standfirst="Every case is different, but nearly all of them fall into one of these. The fund is for Muslims in need wherever they are — the office is in Ede, the work is not."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="seal" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- How it works -------------------------------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker="How it works"
          title="From a phone call to a published line in the accounts"
          standfirst="The unspoken question every donor has is what happens between giving and helping. This is the whole of it."
        />

        <ol className="reveal mx-auto mt-12 max-w-3xl space-y-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-5 rounded-lg border border-white/12 bg-ink-raised p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-apricot/40 font-display text-apricot">
                {index + 1}
              </span>
              <div>
                <p className="font-display text-lg text-white">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-chalk/75">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* --- What it has done ---------------------------------------------- */}
      <Section tone="chalk" size="lg">
        <SectionHeading
          kicker="What it has done"
          title={`${formatKobo(THREE_YEAR_TOTAL_KOBO)} over three years`}
          standfirst="Reported by year and by category. Names appear only where someone has given written permission for them to."
        />

        <ul className="reveal mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {YEAR_TOTALS.map((year) => (
            <li
              key={year.year}
              className="rounded-lg border border-chalk-dark bg-white p-6 text-center shadow-sm"
            >
              <p className="font-display text-lg">{year.year}</p>
              <p className="mt-2 font-display text-2xl text-oxblood">
                {formatKobo(year.raisedKobo)}
              </p>
              <p className="mt-2 text-sm text-charcoal-muted">
                {year.beneficiaries
                  ? `${year.beneficiaries} beneficiaries`
                  : "report in preparation"}
              </p>
            </li>
          ))}
        </ul>

        <Prose className="mx-auto mt-12">
          <ProseHeading>Why we report by category</ProseHeading>
          <p>
            People come to us at the worst moment of their year. Publishing a name and
            a diagnosis alongside a figure buys the foundation credibility at their
            expense, and we are not willing to make that trade.
          </p>
          <p>
            So the reports say <em>four children back in secondary school</em>, or{" "}
            <em>a revert sister housed and clothed</em>. Where someone wants their
            story told and signs to say so, we tell it, and we keep the consent on
            file.
          </p>
        </Prose>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/about/accountability">Read the accounts</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/empowerment/join">Join the fund</Link>
          </Button>
        </div>
      </Section>

      {/* --- Two doors ------------------------------------------------------ */}
      <Section tone="white" size="lg">
        <IntakeNotice className="mx-auto mb-10 max-w-3xl" />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="reveal border-oxblood/25">
            <Medallion>
              <Repeat aria-hidden="true" className="size-6" />
            </Medallion>
            <CardTitle className="text-xl">Join the fund</CardTitle>
            <CardDescription>
              A monthly contribution, by card or standing transfer. Steady giving is
              what lets us answer a case in the same week it arrives.
            </CardDescription>
            <Button asChild className="mt-2 self-start">
              <Link href="/empowerment/join">Join the fund</Link>
            </Button>
          </Card>

          <Card className="reveal">
            <Medallion tone="outline">
              <ClipboardList aria-hidden="true" className="size-6" />
            </Medallion>
            <CardTitle className="text-xl">Request assistance</CardTitle>
            <CardDescription>
              One confidential form. Health details are treated as sensitive data, and
              nothing about you is published without your separate written consent.
            </CardDescription>
            <Button asChild variant="secondary" className="mt-2 self-start">
              <Link href="/empowerment/request">Request assistance</Link>
            </Button>
          </Card>
        </div>

        <p className="mt-10 flex items-center justify-center gap-3 text-sm text-charcoal-muted">
          <Shield aria-hidden="true" className="size-4 text-apricot" />
          Zakat is held as a separate fund, with its own eligibility rules.
        </p>
      </Section>

      <Section tone="chalk" size="md">
        <div className="mx-auto max-w-3xl text-center">
          <HandCoins aria-hidden="true" className="mx-auto size-8 text-apricot" />
          <p className="mt-4 font-display text-2xl">
            Give once, or give every month.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="donate" size="lg">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { formatKobo } from "@/payload/fields/money";

export const metadata: Metadata = {
  title: "Impact 2023",
  description:
    "The 2023 annual report: ₦5,323,500 raised across 11 beneficiaries, itemised to the naira.",
};

/**
 * The 2023 report — historical record of the earlier public-appeals model
 * (docs/11 labels it as such). Figures verified in docs/01 and the seed.
 * Names appear because APMF itself published them in its 2023 report; consent
 * is re-confirmed before anything like this is republished elsewhere.
 */
export default async function Impact2023Page() {
  const { href } = await getSiteContext("foundation");

  const beneficiaries = [
    {
      name: "Mr. Ayoola Raheem",
      need: "Cerebral angiography following a brain injury",
      place: "UCH Ibadan",
      raised: 1_690_000,
      target: 2_000_000,
    },
    {
      name: "A divorcee with 8 children",
      need: "Empowerment towards financial stability",
      raised: 340_000,
      target: 500_000,
    },
    {
      name: "A revert sister",
      need: "Treatment for malaria, ruqyah, shelter and clothing",
      raised: 90_000,
      target: 0,
    },
    {
      name: "Yusuf Fatai Abolore",
      need: "Kidney transplant",
      place: "St. Nicholas Hospital, Lagos",
      raised: 3_035_000,
      target: 22_000_000,
    },
  ];

  const surplus = [
    { description: "A vulnerable sister", amount: 20_000 },
    { description: "A revert sister", amount: 40_000 },
    { description: "A child's leg surgery", amount: 20_000 },
    { description: "A caesarean delivery", amount: 15_000 },
    { description: "A brother's debts", amount: 23_500 },
    { description: "A struggling brother", amount: 50_000 },
  ];

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="Impact report"
          title="2023"
          standfirst={`${formatKobo(5_323_500)} raised across 11 beneficiaries — the public-appeals year, published as historical record.`}
        />
      </Section>

      <Section>
        <Prose>
          <h2>A note on the model</h2>
          <p>
            2023 ran on the earlier model: public appeals for named
            beneficiaries, followed by a full public accounting. The foundation
            has since moved to the{" "}
            <Link href={href("/empowerment")}>Monthly Empowerment Fund</Link>,
            which reports by category rather than by name. This page is kept
            because it is part of the record — including the appeal that closed
            short of its target, which is exactly why it can be trusted.
          </p>
        </Prose>

        <h2 className="mt-12 font-display text-2xl">Beneficiaries</h2>
        <ul className="mt-4 grid list-none gap-4 md:grid-cols-2">
          {beneficiaries.map((b) => (
            <li key={b.name}>
              <Card className="h-full">
                <CardTitle>{b.name}</CardTitle>
                <CardDescription className="mt-2">{b.need}</CardDescription>
                {b.place ? (
                  <p className="text-sm text-charcoal-muted">{b.place}</p>
                ) : null}
                <p className="mt-3 text-sm">
                  <strong>{formatKobo(b.raised)}</strong>
                  {b.target > 0 ? (
                    <span className="text-charcoal-muted">
                      {" "}
                      of {formatKobo(b.target)} target
                    </span>
                  ) : (
                    <span className="text-charcoal-muted"> raised</span>
                  )}
                </p>
              </Card>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl">
          Assistances from surplus funds
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-muted">
          The gap between the named beneficiaries and the published total —{" "}
          {formatKobo(168_500)} — went to six smaller assistances:
        </p>
        <ul className="mt-4 grid list-none gap-2 sm:grid-cols-2">
          {surplus.map((s) => (
            <li
              key={s.description}
              className="flex items-center justify-between gap-4 rounded-md bg-sand px-4 py-3 text-sm"
            >
              <span className="text-charcoal">{s.description}</span>
              <span className="font-semibold text-charcoal">
                {formatKobo(s.amount)}
              </span>
            </li>
          ))}
        </ul>

        <Prose className="mt-12">
          <h2>It reconciles</h2>
          <p>
            The four beneficiaries total{" "}
            {formatKobo(5_155_000)}; with the{" "}
            {formatKobo(168_500)} of surplus assistances that is exactly{" "}
            {formatKobo(5_323_500)} — the published figure, to the naira.
            Overheads are published rather than buried, and the bank statements
            are available on request.
          </p>
        </Prose>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={href("/empowerment/join")}>Join the monthly fund</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/impact")}>All reports</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

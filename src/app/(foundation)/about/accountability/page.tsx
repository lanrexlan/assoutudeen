import type { Metadata } from "next";
import { BadgeCheck, ScrollText, Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { BankDetails } from "@/components/site/bank-details";
import { CONTACT } from "@/lib/sites";
import { formatKobo } from "@/payload/fields/money";
import { OVERHEADS_2025, THREE_YEAR_TOTAL_KOBO, YEAR_TOTALS } from "@/lib/impact";
import {
  CONSTITUTION_RULES,
  GOVERNING_OFFICES,
  REGISTRATION,
  TRUSTEES,
} from "@/lib/organisation";

export const metadata: Metadata = {
  title: "Accountability",
  description:
    "CAC registration, trustees, annual reports, how donations are spent, bank details and a named contact for financial questions.",
};

/**
 * docs/03: "This page is the difference between a diaspora donor giving ₦5,000
 * and giving ₦500,000."
 *
 * Registration details come from the certificate of incorporation and the
 * filed constitution. Financial figures come from APMF's own published
 * reports. Nothing on this page is estimated.
 */
export default function AccountabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Accountability"
        standfirst="What we raised, what we spent it on, who is answerable for it, and how to check every word of that."
      />

      {/* --- Registration card ------------------------------------------ */}
      <Section tone="sand" size="md">
        <div className="reveal grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="border-olive/20">
            <div className="flex items-start gap-4">
              <Medallion>
                <BadgeCheck aria-hidden="true" className="size-6" />
              </Medallion>
              <div>
                <CardTitle className="text-xl">Registered with the CAC</CardTitle>
                <CardDescription>
                  Incorporated Trustees under the Companies and Allied Matters Act.
                </CardDescription>
              </div>
            </div>

            <dl className="mt-2 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                { term: "Registration number", value: REGISTRATION.number },
                { term: "Date of incorporation", value: REGISTRATION.incorporatedOnDisplay },
                { term: "Registered name", value: REGISTRATION.registeredName },
                { term: "Filed as", value: REGISTRATION.form },
                { term: "Registered office", value: REGISTRATION.registeredOffice },
                { term: "Registrar", value: REGISTRATION.registrar },
              ].map((row) => (
                <div key={row.term}>
                  <dt className="text-xs uppercase tracking-widest text-charcoal-muted">
                    {row.term}
                  </dt>
                  <dd className="mt-1 font-medium leading-snug text-charcoal">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="text-sm text-charcoal-muted">
              A copy of the certificate for download:{" "}
              <Todo>certificate of incorporation as a PDF for the website</Todo>
            </p>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <Medallion tone="outline">
                <Users aria-hidden="true" className="size-6" />
              </Medallion>
              <div>
                <CardTitle className="text-xl">Board of trustees</CardTitle>
                <CardDescription>
                  The three trustees named on the certificate of incorporation.
                </CardDescription>
              </div>
            </div>

            <ul className="space-y-3">
              {TRUSTEES.map((trustee) => (
                <li
                  key={trustee.name}
                  className="flex items-baseline justify-between gap-4 border-b border-sand-dark pb-3 last:border-0"
                >
                  <span className="font-medium text-charcoal">{trustee.name}</span>
                  <span className="shrink-0 text-sm text-charcoal-muted">
                    {trustee.role ?? "Trustee"}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm leading-relaxed text-charcoal-muted">
              The constitution also provides for the offices of{" "}
              {GOVERNING_OFFICES.join(", ").toLowerCase()}. Who currently holds each
              beyond the trustees above:{" "}
              <Todo>current officers by name and office</Todo>
            </p>
          </Card>
        </div>
      </Section>

      {/* --- The numbers -------------------------------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker="Three years, verified"
          title={formatKobo(THREE_YEAR_TOTAL_KOBO)}
          standfirst="Raised and accounted for between 2023 and 2025. The year figures below add up to this total exactly — they are meant to, and they do."
        />

        <ul className="reveal mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {YEAR_TOTALS.map((year) => (
            <li
              key={year.year}
              className="rounded-lg border border-white/12 bg-ink-raised p-6 text-center"
            >
              <p className="font-display text-lg text-white">{year.year}</p>
              <p className="mt-2 font-display text-2xl text-amber">
                {formatKobo(year.raisedKobo)}
              </p>
              <p className="mt-2 text-sm text-sand/65">
                {year.beneficiaries
                  ? `${year.beneficiaries} beneficiaries`
                  : "beneficiary count to confirm"}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* --- What the constitution binds us to ---------------------------- */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="The rules we signed up to"
          title="What the constitution binds us to"
          standfirst="These are not promises made on a website. They are the terms the trustees signed and the Commission registered in 2019."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONSTITUTION_RULES.map((rule) => (
            <Card key={rule.title} className="reveal">
              <div className="flex items-center gap-3">
                <Medallion tone="outline" className="size-11">
                  <ScrollText aria-hidden="true" className="size-5" />
                </Medallion>
                <span className="text-xs uppercase tracking-widest text-charcoal-muted">
                  {rule.article}
                </span>
              </div>
              <CardTitle>{rule.title}</CardTitle>
              <CardDescription>{rule.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- Reports, spending, bank ------------------------------------- */}
      <Section tone="sand" size="lg">
        <Prose>
          <h2>Annual reports</h2>
          <p>
            The 2023 report is written and published in the foundation&apos;s own
            format: the beneficiary table with amounts, the assistances made from
            surplus funds, and the totals. Full report pages for each year are the
            next thing we are building.
          </p>
          <ul>
            <li>
              <strong>2023</strong> — {formatKobo(YEAR_TOTALS[0].raisedKobo)} across 11
              beneficiaries. Report written; web page in preparation.
            </li>
            <li>
              <strong>2024</strong> — {formatKobo(YEAR_TOTALS[1].raisedKobo)}.{" "}
              <Todo>2024 report document</Todo>
            </li>
            <li>
              <strong>2025</strong> — {formatKobo(YEAR_TOTALS[2].raisedKobo)}.{" "}
              <Todo>2025 report document</Todo>
            </li>
          </ul>
          <p>
            Independent auditors are appointed by the general meeting each year, and
            the audited statements are annexed to the annual returns filed with the
            Corporate Affairs Commission — a filing anyone may verify against the
            public register.
          </p>

          <h2>How donations are spent</h2>
          <p>
            Money given for a specific purpose is spent on that purpose. Where we can,
            we pay a hospital or a supplier directly rather than handing over cash.
            What is left after a case closes is recorded as surplus and used for
            smaller assistances, each one listed in the annual report.
          </p>
          <p>
            <strong>Zakat is a separate fund.</strong> It is held apart from general
            donations, spent only on recipients eligible under the eight
            Qur&apos;anic categories, and never used for running costs. Our full
            zakat policy —{" "}
            <Todo>zakat policy: eligibility checks, who verifies, scholarly review</Todo>{" "}
            — will be published on its own page.
          </p>
          <p>
            <strong>We publish our overheads rather than burying them.</strong> In
            2025 the foundation spent {formatKobo(OVERHEADS_2025.operationalKobo)} on
            operations and {formatKobo(OVERHEADS_2025.gadgetsKobo)} on equipment. We
            would rather you saw those figures than wondered about them.
          </p>

        </Prose>

        <div className="mt-12">
          <BankDetails />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="reveal">
            <CardTitle>Questions about money</CardTitle>
            <CardDescription>
              Financial questions should reach a named person, not a general inbox.
            </CardDescription>
            <div className="text-sm leading-relaxed text-charcoal">
              <p>
                Under the constitution the Financial Secretary and the Treasurer report
                the accounts to the general meeting, together with the auditor&apos;s
                report.
              </p>
              <p className="mt-2">
                Named contact: <Todo>financial contact — full name and office held</Todo>
              </p>
              <p className="mt-2">
                Email: <Todo>direct email for financial questions</Todo> (until then,{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-primary underline underline-offset-4"
                >
                  {CONTACT.email}
                </a>
                )
              </p>
              <p className="mt-2">
                Phone:{" "}
                <a
                  href={`tel:+${CONTACT.phoneE164}`}
                  className="text-primary underline underline-offset-4"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}

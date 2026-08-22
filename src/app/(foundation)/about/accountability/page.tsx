import type { Metadata } from "next";
import { BadgeCheck, ScrollText, Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { BankDetails } from "@/components/site/bank-details";
import { CONTACT } from "@/lib/sites";
import { formatKobo } from "@/payload/fields/money";
import {
  OVERHEADS_2025,
  VERIFIED_TOTAL_KOBO,
  YEAR_RANGE,
  YEAR_TOTALS,
  YEARS_COVERED,
} from "@/lib/impact";
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
        image="accountability"
        eyebrow="About"
        title="Accountability"
        standfirst="What we raised, what we spent it on, who is answerable for it, and how to check every word of that."
      />

      {/* --- Registration card ------------------------------------------ */}
      <Section tone="chalk" size="md">
        <div className="reveal grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="border-oxblood/20">
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
              Any of this can be checked against the Corporate Affairs Commission&apos;s
              public register. We do not post the certificate itself, because the filed
              copy carries the trustees&apos; personal phone numbers and signatures —
              ask and we will show you a redacted copy.
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
                  className="flex items-baseline justify-between gap-4 border-b border-chalk-dark pb-3 last:border-0"
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
              {GOVERNING_OFFICES.join(", ").toLowerCase()}, filled by the general
              meeting. Write to us for the current office-holders.
            </p>
          </Card>
        </div>
      </Section>

      {/* --- The numbers -------------------------------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker={`${YEARS_COVERED} years, verified`}
          title={formatKobo(VERIFIED_TOTAL_KOBO)}
          standfirst={`Raised and accounted for between ${YEAR_RANGE}. The year figures below add up to this total exactly — they are meant to, and a test checks it on every build.`}
        />

        <ul className="reveal mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {YEAR_TOTALS.map((year) => (
            <li
              key={year.year}
              className="rounded-lg border border-white/12 bg-ink-raised p-6 text-center"
            >
              <p className="font-display text-lg text-white">{year.year}</p>
              <p className="mt-2 font-display text-2xl text-apricot">
                {formatKobo(year.raisedKobo)}
              </p>
              <p className="mt-2 text-sm text-chalk/65">
                {year.hasReportPage ? "reported by category" : "on record"}
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
      <Section tone="chalk" size="lg">
        <Prose>
          <ProseHeading>Annual reports</ProseHeading>
          <p>
            Every year the foundation has operated is on record here, and the
            figures below add up to the published total exactly. The reports from
            2023 onward are written up by category; the earlier years are
            published as the verified totals they are.
          </p>
          <ul>
            {YEAR_TOTALS.map((year) => (
              <li key={year.year}>
                <strong>{year.year}</strong> — {formatKobo(year.raisedKobo)}
                {year.year === 2025 ? (
                  <>
                    , of which {formatKobo(OVERHEADS_2025.operationalKobo)} was
                    operational and {formatKobo(OVERHEADS_2025.gadgetsKobo)} went on
                    equipment
                  </>
                ) : null}
                .
              </li>
            ))}
          </ul>
          <p>
            Independent auditors are appointed by the general meeting each year, and
            the audited statements are annexed to the annual returns filed with the
            Corporate Affairs Commission — a filing anyone may verify against the
            public register.
          </p>

          <ProseHeading>How donations are spent</ProseHeading>
          <p>
            Money given for a specific purpose is spent on that purpose. Where we can,
            we pay a hospital or a supplier directly rather than handing over cash.
            What is left after a case closes is recorded as surplus and used for
            smaller assistances, each one listed in the annual report.
          </p>
          <p>
            <strong>Zakat is a separate fund.</strong> It is held apart from general
            donations, spent only on recipients eligible under the eight
            Qur&apos;anic categories, and never used for running costs. Eligibility is
            checked case by case in the same way every other request is: we speak to
            the applicant, ask for evidence of the need, and confirm it with someone
            who knows them.
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
                Write to{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-primary underline underline-offset-4"
                >
                  {CONTACT.email}
                </a>{" "}
                marked for the Financial Secretary, and it reaches them.
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

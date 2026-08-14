import type { Metadata } from "next";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { CONTACT } from "@/lib/sites";
import { formatKobo } from "@/payload/fields/money";
import {
  OVERHEADS_2025,
  THREE_YEAR_TOTAL_KOBO,
  YEAR_TOTALS,
} from "@/lib/impact";

export const metadata: Metadata = {
  title: "Accountability",
  description:
    "Registration, trustees, annual reports, how donations are spent, bank details and a named contact for financial questions.",
};

/**
 * docs/03: "This page is the difference between a diaspora donor giving ₦5,000
 * and giving ₦500,000."
 *
 * Every number here comes from a published APMF report. Nothing is estimated.
 */
export default function AccountabilityPage() {
  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="About"
          title="Accountability"
          standfirst="What we raised, what we spent it on, who is responsible, and how to check any of it."
        />
      </Section>

      <Section>
        <div className="rounded-lg border border-sand-dark bg-white p-6">
          <p className="text-sm uppercase tracking-widest text-charcoal-muted">
            Three years, verified
          </p>
          <p className="mt-2 font-display text-3xl text-olive sm:text-4xl">
            {formatKobo(THREE_YEAR_TOTAL_KOBO)}
          </p>
          <p className="mt-2 text-sm text-charcoal-muted">
            Raised and accounted for between 2023 and 2025.
          </p>

          <ul className="mt-6 grid list-none gap-4 sm:grid-cols-3">
            {YEAR_TOTALS.map((year) => (
              <li key={year.year} className="rounded-md bg-sand p-4">
                <p className="font-display text-xl">{year.year}</p>
                <p className="mt-1 text-lg font-semibold text-charcoal">
                  {formatKobo(year.raisedKobo)}
                </p>
                <p className="mt-1 text-sm text-charcoal-muted">
                  {year.beneficiaries
                    ? `${year.beneficiaries} beneficiaries`
                    : "beneficiary count to confirm"}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Prose className="mt-10">
          <h2>Registration</h2>
          <p>
            Assoutudeen Prophetic Medicine Foundation is registered with the Corporate
            Affairs Commission as Incorporated Trustees.
          </p>
          <ul>
            <li>
              CAC registration number: <Todo>CAC registration number</Todo>
            </li>
            <li>
              Date of incorporation: <Todo>date of incorporation</Todo>
            </li>
            <li>
              Certificate: <Todo>scan or PDF of the CAC certificate</Todo>
            </li>
          </ul>

          <h2>Board of trustees</h2>
          <p>
            <Todo>
              trustees — full names and roles, one line each. Do not publish this section
              until the list is confirmed
            </Todo>
          </p>

          <h2>Annual reports</h2>
          <p>
            The 2023 report is written and published in the foundation&apos;s own format:
            the beneficiary table with amounts, the assistances made from surplus funds,
            the totals, and the standing offer of bank statements. Full report pages for
            each year are the next thing we are building.
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

          <h2>How donations are spent</h2>
          <p>
            Money given for a specific purpose is spent on that purpose. Where we can, we
            pay a hospital or supplier directly rather than handing over cash. What is
            left after a case closes is recorded as surplus and used for smaller
            assistances, which are listed by name in the annual report.
          </p>
          <p>
            <strong>Zakat is a separate fund.</strong> It is held apart from general
            donations, spent only on recipients eligible under the eight Qur&apos;anic
            categories, and never used for running costs. Our full zakat policy —{" "}
            <Todo>zakat policy: eligibility checks, who verifies, scholarly review</Todo>{" "}
            — will be published on its own page.
          </p>
          <p>
            <strong>We publish our overheads rather than burying them.</strong> In 2025
            the foundation spent {formatKobo(OVERHEADS_2025.operationalKobo)} on
            operations and {formatKobo(OVERHEADS_2025.gadgetsKobo)} on equipment. We would
            rather you see those figures than wonder about them.
          </p>

          <h2>Ask for the bank statements</h2>
          <p>
            Anyone who wants the foundation&apos;s bank statements for the past calendar
            year can ask for them, and we will provide them. Message us on WhatsApp or
            email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </Prose>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardTitle>Giving by bank transfer</CardTitle>
            <CardDescription>
              Many donors prefer a transfer to a card, and we support it. Both
              accounts are at Jaiz Bank and have been verified.
            </CardDescription>
            <div className="space-y-4 text-sm leading-relaxed text-charcoal">
              <div className="rounded-md bg-sand p-3">
                <p className="text-xs uppercase tracking-widest text-charcoal-muted">
                  Nigerian account (₦)
                </p>
                <p className="mt-1 font-medium">
                  Assoutudeen Prophetic Medicine Foundation
                </p>
                <p className="font-display text-lg text-olive">0010939336</p>
                <p className="text-charcoal-muted">Jaiz Bank</p>
              </div>
              <div className="rounded-md bg-sand p-3">
                <p className="text-xs uppercase tracking-widest text-charcoal-muted">
                  Foreign account
                </p>
                <p className="mt-1 font-medium">
                  Assoutudeen Prophetic Medicine Foundation
                </p>
                <p className="font-display text-lg text-olive">0011579597</p>
                <p className="text-charcoal-muted">
                  Jaiz Bank · SWIFT JAIZNGLAXXX
                </p>
              </div>
              <p className="text-charcoal-muted">
                After a transfer, message us on WhatsApp with your name and the
                amount so we can confirm and send a receipt.
              </p>
            </div>
          </Card>

          <Card>
            <CardTitle>Questions about money</CardTitle>
            <CardDescription>
              Financial questions should reach a named person, not a general inbox.
            </CardDescription>
            <div className="text-sm leading-relaxed text-charcoal">
              <p>
                Contact: <Todo>named financial contact — full name and role</Todo>
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

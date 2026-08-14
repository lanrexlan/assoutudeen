import type { Metadata } from "next";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { CONTACT } from "@/lib/sites";
import { THREE_YEAR_TOTAL_KOBO } from "@/lib/impact";
import { formatKobo } from "@/payload/fields/money";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give to the Assoutudeen Prophetic Medicine Foundation — the empowerment fund, medical relief and education. Zakat is held in a separate fund.",
};

/** Verified accounts (confirmed by the founder). Both are Jaiz Bank. */
const ACCOUNTS = {
  naira: {
    bank: "Jaiz Bank",
    accountName: "Assoutudeen Prophetic Medicine Foundation",
    accountNumber: "0010939336",
    note: "Nigerian naira account",
  },
  foreign: {
    bank: "Jaiz Bank",
    accountName: "Assoutudeen Prophetic Medicine Foundation",
    accountNumber: "0011579597",
    swift: "JAIZNGLAXXX",
    note: "Foreign account",
  },
} as const;

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I have just made a transfer to the Assoutudeen Prophetic Medicine Foundation. My name and the amount:",
)}`;

/**
 * The donation path. Card payments (Paystack) are wired in a later session;
 * bank transfer works today — the Jaiz accounts below have been confirmed by
 * the founder (TODO-CONTENT.md #23 is resolved).
 */
export default function DonatePage() {
  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="Give"
          title="Donate"
          standfirst="Your gift funds the empowerment circle, medical relief and dawah education — and every kobo is accounted for in a published report."
        />
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>The empowerment fund</CardTitle>
            <CardDescription>
              Orphan care and education, widow empowerment, emergency medical
              relief and crisis support — reported openly by category.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Where the money goes</CardTitle>
            <CardDescription>
              Direct to hospitals and suppliers wherever possible. Surplus is
              recorded and used for smaller assistances, listed in the annual
              report.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Zakat is separate</CardTitle>
            <CardDescription>
              Zakat is held apart from general donations, spent only on the
              Qur&apos;anic categories, and never on running costs.
            </CardDescription>
          </Card>
        </div>

        <h2 className="mt-12 font-display text-2xl sm:text-3xl">
          Give by bank transfer
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-muted">
          Transfer to either account below. Then message us on WhatsApp with
          your name and what the gift is for, so we can confirm it and send your
          receipt.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardTitle>Nigerian account (₦)</CardTitle>
            <dl className="space-y-2 text-sm leading-relaxed text-charcoal">
              <div>
                <dt className="text-charcoal-muted">Account name</dt>
                <dd className="font-medium">{ACCOUNTS.naira.accountName}</dd>
              </div>
              <div>
                <dt className="text-charcoal-muted">Account number</dt>
                <dd className="font-display text-xl text-olive">
                  {ACCOUNTS.naira.accountNumber}
                </dd>
              </div>
              <div>
                <dt className="text-charcoal-muted">Bank</dt>
                <dd className="font-medium">{ACCOUNTS.naira.bank}</dd>
              </div>
            </dl>
          </Card>
          <Card>
            <CardTitle>Foreign account</CardTitle>
            <dl className="space-y-2 text-sm leading-relaxed text-charcoal">
              <div>
                <dt className="text-charcoal-muted">Account name</dt>
                <dd className="font-medium">{ACCOUNTS.foreign.accountName}</dd>
              </div>
              <div>
                <dt className="text-charcoal-muted">Account number</dt>
                <dd className="font-display text-xl text-olive">
                  {ACCOUNTS.foreign.accountNumber}
                </dd>
              </div>
              <div>
                <dt className="text-charcoal-muted">Bank</dt>
                <dd className="font-medium">{ACCOUNTS.foreign.bank}</dd>
              </div>
              <div>
                <dt className="text-charcoal-muted">SWIFT code</dt>
                <dd className="font-medium">{ACCOUNTS.foreign.swift}</dd>
              </div>
            </dl>
          </Card>
        </div>

        <Prose className="mt-12">
          <h2>Confirm your transfer</h2>
          <p>
            After you transfer, message us on WhatsApp —{" "}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT.phoneDisplay}
            </a>{" "}
            — or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>,
            with your name and the amount. We confirm every gift and send a
            receipt; bank statements for the past year are available on request.
          </p>
          <p>
            Online card giving through Paystack arrives in a later session.{" "}
            <Todo>Paystack checkout — wired when the donation collection is built</Todo>
          </p>
          <p>
            <strong>Monthly is worth more than one-off.</strong> A regular
            member at ₦5,000 a month contributes ₦60,000 a year — so consider{" "}
            joining the Monthly Empowerment Fund instead of a single gift.
          </p>

          <h2>What your giving has done</h2>
          <p>
            {formatKobo(THREE_YEAR_TOTAL_KOBO)} was raised and accounted for
            between 2023 and 2025, with the reports published and the bank
            statements available on request.
          </p>
        </Prose>
      </Section>
    </>
  );
}

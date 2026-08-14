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

/**
 * The donation path. Card payments (Paystack) are wired in a later session;
 * until the bank details are verified we deliberately print no account number
 * (TODO #23) — a wrong digit sends a stranger's money elsewhere.
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

        <Prose className="mt-12">
          <h2>The simplest way to give today</h2>
          <p>
            Message us on WhatsApp —{" "}
            <a
              href={`https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
                "As-salaamu alaykum. I would like to donate to the Assoutudeen Prophetic Medicine Foundation.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT.phoneDisplay}
            </a>{" "}
            — or email{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, and we will
            send you the verified bank details. We are deliberately not printing
            an account number on this page until it has been confirmed; a wrong
            digit on a public donations page misdirects someone else&apos;s money.
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

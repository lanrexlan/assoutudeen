import type { Metadata } from "next";
import Link from "next/link";
import { AssistanceRequestForm } from "@/components/site/assistance-request-form";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Request Assistance",
  description:
    "Ask the foundation for support — orphan care, widow empowerment, medical relief or crisis support. The application is reviewed by a real person.",
};

/**
 * docs/11 Form 1 — intake for people in distress. Designed for a cheap phone:
 * large fields, no jargon, WhatsApp fallback at every step, and the phone
 * number, local government, state of origin, applicant category and a referee
 * all required (confirmed by the founder).
 */
export default function RequestAssistancePage() {
  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The empowerment fund"
          title="Request Assistance"
          standfirst="If you are facing a hardship — orphan care, widow empowerment, a medical emergency or crisis support — tell us about it and a real person will review it."
        />
        <p className="mt-6 text-sm text-on-primary/90">
          Emergency? Call{" "}
          <a
            href={`tel:+${CONTACT.phoneE164}`}
            className="font-semibold underline underline-offset-4"
          >
            {CONTACT.phoneDisplay}
          </a>{" "}
          or go to a hospital first — do not wait for this form.
        </p>
      </Section>

      <Section>
        <Prose>
          <h2>What happens after you apply</h2>
          <p>
            Your application is stored securely and reviewed by a member of the
            foundation — we may call you or contact your referee to verify. If it
            is approved, help is arranged directly: hospitals and suppliers are
            paid wherever possible rather than handing over cash. Support is
            reported by category, never by name, unless you choose to be named.
          </p>
          <p>
            Every contributor is told what the fund does each month. You can read
            more about how the fund works on the{" "}
            <Link href="/empowerment/how-it-works" className="underline underline-offset-4">
              how it works
            </Link>{" "}
            page.
          </p>
        </Prose>

        <div className="mt-10 rounded-lg border border-sand-dark bg-white p-5 shadow-sm shadow-sand-dark/25 sm:p-6">
          <h2 className="font-display text-2xl">The application</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-muted">
            Please fill in every required field. If the form is difficult on your
            phone, the WhatsApp button at the bottom reaches the same people.
          </p>
          <div className="mt-6">
            <AssistanceRequestForm />
          </div>
        </div>
      </Section>
    </>
  );
}

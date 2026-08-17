import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How the empowerment fund verifies requests, holds and disburses money, and reports — and how privacy is protected.",
};

/**
 * docs/11: verification, disbursement, reporting, consent, and the standing
 * promise that contributors are kept informed. Nothing beyond what the brief
 * states.
 */
export default async function HowItWorksPage() {
  const { href } = await getSiteContext("foundation");

  return (
    <>
      <PageHeader
        image="empowerment"
        eyebrow="The Monthly Empowerment Fund"
        title="How it works"
        standfirst="Where a request goes, how money is held and paid out, and how you can check it."
      />

      <Section>
        <Prose>
          <ProseHeading>For contributors</ProseHeading>
          <p>
            You choose any monthly amount — no minimum — and pay however suits
            you: card auto-debit, or a simple manual transfer each month. Both
            paths are supported; older and senior members often prefer to
            transfer manually and be thanked personally, and that is fine.
          </p>
          <p>
            Disbursement is conducted openly. Contributors are kept informed of
            every cycle, and the annual reports reconcile to the naira.
          </p>

          <ProseHeading>For those requesting assistance</ProseHeading>
          <p>Every request goes through the same funnel:</p>
          <ol>
            <li>
              <strong>Received.</strong> The request is submitted — name, phone,
              category of need, and a referee who can vouch for the situation.
            </li>
            <li>
              <strong>Reviewed and verified.</strong> A human verifies the case,
              including contacting the referee. Nothing is paid out on a single
              story.
            </li>
            <li>
              <strong>Approved and assisted.</strong> Where possible we pay a
              hospital or supplier directly rather than handing over cash.
            </li>
            <li>
              <strong>Reported.</strong> Support is reported by category —
              &ldquo;4 children in secondary school&rdquo;, &ldquo;a revert
              sister&rdquo; — never by name unless consent has been given.
            </li>
          </ol>

          <ProseHeading>Money is held separately</ProseHeading>
          <p>
            <strong>Zakat is a separate fund</strong> with its own ledger, spent
            only on the eight Qur&apos;anic categories and never pooled with
            general donations. What is left after a case closes is recorded as
            surplus and used for smaller assistances, listed in the annual
            report.
          </p>

          <ProseHeading>Your information</ProseHeading>
          <p>
            Requests contain health and personal data, which is a special
            category under Nigeria&apos;s NDPA 2023. It is stored with restricted
            access, and every consent box on the form ships unticked by default.
            Publishing a name or photo happens only with separate, explicit,
            recorded consent.
          </p>
        </Prose>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={href("/empowerment/join")}>Join the fund</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/empowerment/request")}>Request assistance</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

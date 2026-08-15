import type { Metadata } from "next";
import { LegalShell } from "@/components/site/legal-shell";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Returns and refunds",
  description:
    "When honey and books can be returned, when they cannot, and how refunds are handled.",
};

export default function ReturnsPage() {
  return (
    <LegalShell
      title="Returns and refunds"
      standfirst="Food cannot be returned once opened — but if we send you something damaged or wrong, that is our problem to fix, not yours."
    >
      <h2>Honey</h2>
      <p>
        Honey is a food product. Once a container has been opened we cannot accept it
        back, because we cannot resell it and cannot verify how it has been kept. That is
        a food safety rule, not a way of avoiding refunds.
      </p>
      <p>We will replace or refund honey where:</p>
      <ul>
        <li>it arrives damaged, leaking, or with a broken seal;</li>
        <li>we sent the wrong product or the wrong volume;</li>
        <li>
          it is not what we described it to be. Our honey is sold as pure honey, and if
          what you received is not that, we want to know immediately.
        </li>
      </ul>
      <p>
        Tell us within 48 hours of delivery and send photographs. Contact{" "}
        <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a> or{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>

      <h2>Books</h2>
      <p>
        A physical book can be returned unread and undamaged within 7 days of
        delivery. Digital editions cannot be returned once the download link has been
        used, which is why a sample is offered first.
      </p>

      <h2>How refunds are paid</h2>
      <p>
        Refunds go back to the account the payment came from, through Paystack, within
        7 working days of us agreeing the refund. Where the fault is ours we pay the
        return delivery; where you have simply changed your mind about a book, you do.
      </p>

      <h2>Your rights</h2>
      <p>
        Nothing here removes rights you have under the Federal Competition and Consumer
        Protection Act. A blanket &ldquo;no returns under any circumstances&rdquo; policy
        is not enforceable in Nigeria, and we are not attempting one: where the fault is
        ours, you are entitled to a remedy.
      </p>

      <h2>Donations</h2>
      <p>
        Donations are not purchases and are not generally refundable. If you gave in
        error, tell us as soon as you can and we will do what we reasonably can — see the
        terms page.
      </p>


    </LegalShell>
  );
}

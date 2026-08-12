import type { Metadata } from "next";
import { LegalShell } from "@/components/site/legal-shell";
import { Todo } from "@/components/ui/todo";
import { CONTACT, FOUNDATION_NAME } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use and terms of sale for the Assoutudeen Prophetic Medicine Foundation website.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms"
      standfirst="The terms on which you use this site, give to the foundation, and buy from us."
    >
      <h2>Using this site</h2>
      <p>
        This site is run by {FOUNDATION_NAME}, {CONTACT.address}. By using it you accept
        these terms. If you do not accept them, please do not use the site.
      </p>

      <h2>What this site is not</h2>
      <p>
        Nothing on this site is medical advice, and nothing here is a diagnosis. Our
        writing on prophetic medicine is educational: it quotes the Qur&apos;an, the
        Sunnah and classical scholarship, and it does not claim that any food or remedy
        treats, prevents or cures a disease. Speak to a qualified doctor about any health
        condition, and do not stop prescribed treatment on the strength of anything you
        read here.
      </p>

      <h2>Donations</h2>
      <ul>
        <li>
          A donation given for a stated purpose is used for that purpose. Where a case
          closes with money left over, the surplus is recorded and used for other
          assistance, and reported in the annual accounts.
        </li>
        <li>
          Zakat is held as a separate fund and given only to recipients eligible under the
          eight Qur&apos;anic categories.
        </li>
        <li>
          Donations are not generally refundable. Where a payment is made in error, tell
          us within <Todo>window for reporting a mistaken donation</Todo> and we will do
          what we reasonably can.
        </li>
      </ul>

      <h2>Terms of sale</h2>
      <p>
        These apply to the book and to honey bought through the Assoutudeen Honey
        Enterprise.
      </p>
      <ul>
        <li>
          Prices are in Nigerian naira and include <Todo>whether prices include VAT</Todo>.
          Delivery is charged separately — see the delivery policy.
        </li>
        <li>
          Your order is an offer to buy. A contract exists when we confirm the order, not
          when you submit it. If an item is unavailable we will tell you and refund in
          full.
        </li>
        <li>
          Payment is taken through Paystack. We do not store card details at any point.
        </li>
        <li>
          <Todo>order acceptance and availability terms, confirmed with a lawyer</Todo>
        </li>
      </ul>

      <h2>Classes at the Dawah Institute</h2>
      <p>
        <Todo>
          course terms — whether classes are free, withdrawal, any refund window,
          certification conditions
        </Todo>
      </p>

      <h2>Consultations</h2>
      <p>
        <Todo>
          consultation terms — what a consultation is and is not, fees if any,
          cancellation, and an explicit statement that it does not replace medical care
        </Todo>
      </p>

      <h2>Wholesale and distribution</h2>
      <p>
        Wholesale supply and the ambassador programme are governed by a separate written
        agreement: <Todo>distributor agreement, to be drafted by a lawyer</Todo>. It is a
        commercial contract rather than a web page, and it is not covered by these terms.
      </p>

      <h2>Liability</h2>
      <p>
        <Todo>limitation of liability clause, drafted by a lawyer</Todo>
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of Nigeria, and the
        courts of <Todo>jurisdiction — Osun State, or as advised</Todo> have jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </LegalShell>
  );
}

import type { Metadata } from "next";
import { LegalShell } from "@/components/site/legal-shell";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "Delivery zones, timeframes and costs for honey and books from Assoutudeen.",
};

export default function DeliveryPage() {
  return (
    <LegalShell
      title="Delivery"
      standfirst="Where we deliver, how long it takes, what it costs, and what happens if a delivery fails."
    >
      <h2>Where we deliver</h2>
      <p>
        We deliver honey and books across Nigeria. Rates depend on the zone and, for
        honey, on the volume ordered — it is sold by the litre and it is heavy.
      </p>
      <p>
        Rates are quoted when you order, because they depend on the weight and the
        destination. As a rule: Ede and the rest of Osun are cheapest, the wider
        south-west next, and the rest of Nigeria is priced by the courier&apos;s own
        table. Ask before you pay and you will have the figure in writing.
      </p>

      <h2>How long it takes</h2>
      <p>
        Within Ede and Osun, usually one to two working days. Elsewhere in the
        south-west, two to four. Further afield depends on the courier, and we will
        tell you what they have told us.
      </p>
      <p>
        Orders are dispatched once payment has been confirmed. Nothing is dispatched on
        Fridays around Jumu&apos;ah, on public holidays, or over Eid.
      </p>



      <h2>Collection in person</h2>
      <p>
        You are welcome to collect from {CONTACT.address}, free of charge. Call first so
        that someone is there with your order — the office keeps teaching hours as well
        as working ones.
      </p>

      <h2>If a delivery fails</h2>
      <p>
        If nobody is available to receive an order, the courier will attempt contact on
        the phone number given. Please make sure it is one you answer.
      </p>
      <p>
        The courier will hold an undelivered order for their standard period, usually a
        week. If it comes back to us, we will hold it for you and arrange redelivery at
        the courier&apos;s cost, or refund the goods less the delivery already spent.
      </p>

      <h2>Damaged or leaking on arrival</h2>
      <p>
        Honey travels in liquid form and can leak if a container is damaged in transit. If
        your order arrives damaged or leaking, photograph it before opening anything and
        contact us on <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>{" "}
        within 48 hours of delivery. We will replace it. See the returns page.
      </p>
    </LegalShell>
  );
}

import type { Metadata } from "next";
import { LegalShell } from "@/components/site/legal-shell";
import { Todo } from "@/components/ui/todo";
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
        <Todo>
          delivery zones with a price for each, and the courier or couriers used
        </Todo>
      </p>

      <h2>How long it takes</h2>
      <p>
        <Todo>
          delivery timeframes per zone — Ede and Osun, the south-west, the rest of Nigeria
        </Todo>
      </p>
      <p>
        Orders are dispatched after payment is confirmed. Fridays, public holidays and Eid
        affect dispatch: <Todo>dispatch days and cut-off time</Todo>.
      </p>

      <h2>What it costs</h2>
      <p>
        <Todo>delivery charges, and any order value above which delivery is free</Todo>
      </p>

      <h2>Collection in person</h2>
      <p>
        You are welcome to collect from {CONTACT.address}.{" "}
        <Todo>whether collection needs to be arranged in advance, and when</Todo>
      </p>

      <h2>If a delivery fails</h2>
      <p>
        If nobody is available to receive an order, the courier will attempt contact on
        the phone number given. Please make sure it is one you answer.
      </p>
      <p>
        <Todo>
          policy on failed deliveries — redelivery charge, how long an item is held, and
          what happens if it comes back to us
        </Todo>
      </p>

      <h2>Damaged or leaking on arrival</h2>
      <p>
        Honey travels in liquid form and can leak if a container is damaged in transit. If
        your order arrives damaged or leaking, photograph it before opening anything and
        contact us on <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>{" "}
        within <Todo>window for reporting damage — 48 hours is typical</Todo>. We will
        replace it. See the returns page.
      </p>
    </LegalShell>
  );
}

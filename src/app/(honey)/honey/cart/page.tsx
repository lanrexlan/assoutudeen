import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Basket",
  description:
    "Orders for Assoutudeen honey are taken on WhatsApp until card checkout is live. Here is exactly what to send.",
};

const orderHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to order honey.\nLitres: \nTown: \nDelivery or collection: ",
)}`;

/**
 * The basket, before there is a basket.
 *
 * The header carries a basket icon because the shop will have one. Until
 * Paystack is wired up with a verified webhook, this page says so plainly and
 * hands the visitor the route that does work, rather than showing an empty
 * basket that can never fill.
 */
export default async function CartPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <PageHeader
        image="honeyHome"
        eyebrow="Basket"
        title="Orders go through WhatsApp"
        standfirst="Card checkout is not live yet. Rather than show you a basket that cannot take your money, here is the route that works — and it is faster anyway."
      />

      <Section tone="chalk" size="lg">
        <div className="mx-auto max-w-2xl">
          <div className="seal bg-chalk-dark p-px shadow-sm">
            <div className="seal bg-white p-8 text-center">
              <Medallion className="mx-auto">
                <ShoppingBag aria-hidden="true" className="size-6" />
              </Medallion>
              <p className="mt-5 font-display text-2xl text-charcoal">
                Send us three lines
              </p>
              <ul className="mx-auto mt-5 max-w-sm space-y-2 text-start text-charcoal-muted">
                <li>How many litres you want.</li>
                <li>Your town.</li>
                <li>Whether you are collecting in Ede or want it delivered.</li>
              </ul>
              <p className="mt-5 text-sm text-charcoal-muted">
                You will have a price, including delivery, the same day — in writing,
                before anything is paid.
              </p>
              <Button asChild variant="donate" size="lg" className="mt-7">
                <a href={orderHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <Prose className="mx-auto mt-12">
            <ProseHeading>Why not just build the basket now?</ProseHeading>
            <p>
              Because a basket is the easy half. The hard half is making sure an order
              is only ever marked paid when the bank has actually confirmed the payment
              — through a signed webhook, verified on the server, handled so that a
              repeated message cannot count twice. Until that is finished and tested,
              taking card details would be taking a risk with your money, not ours.
            </p>
            <p>
              Transfers are confirmed by a person in the meantime, which is slower and
              entirely reliable.
            </p>
          </Prose>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary">
              <Link href={href("/shop")}>See what we sell</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={href("/contact")}>Ask about wholesale</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

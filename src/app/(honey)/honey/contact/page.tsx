import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { Medallion } from "@/components/ui/ornament";
import { ContactChannels } from "@/components/site/contact-channels";
import { ContactForm } from "@/components/site/contact-form";
import { MapEmbed } from "@/components/site/map-embed";
import { getSiteContext } from "@/lib/site-context";
import { CONTACT, siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Order honey, ask for a wholesale price, or raise a problem with a delivery from the Assoutudeen Honey Enterprise in Ede, Osun State.",
};

export default async function HoneyContactPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <PageHeader
        image="contact"
        eyebrow="Contact"
        title="Orders and questions"
        standfirst="Message us with the litres you need and your town for a same-day price. Anything that went wrong with an order reaches the same people."
      />

      <Section tone="chalk">
        <ContactChannels
          whatsappMessage={siteConfig.honey.whatsappMessage}
          emailSubject="Honey order enquiry"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="flex gap-4 rounded-lg border border-chalk-dark bg-white p-5">
            <Medallion tone="soft" className="size-11 shrink-0">
              <MapPin aria-hidden="true" className="size-5" />
            </Medallion>
            <div>
              <p className="font-display text-lg text-charcoal">Collection</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
                {CONTACT.address}. Free to collect — call first so your order is waiting.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-lg border border-chalk-dark bg-white p-5">
            <Medallion tone="soft" className="size-11 shrink-0">
              <Clock aria-hidden="true" className="size-5" />
            </Medallion>
            <div>
              <p className="font-display text-lg text-charcoal">When we answer</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
                {CONTACT.officeHours}. Nothing is dispatched around Jumu&apos;ah, on
                public holidays, or over the two Eids.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              align="start"
              kicker="Write to us"
              title="Send a message"
              standfirst="Choose 'Distributor or wholesale' for volume pricing and for the ambassador programme."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div>
            <MapEmbed />
            <p className="mt-6 text-sm leading-relaxed text-charcoal-muted">
              The map shows Ede rather than a pin on the door — nobody has supplied
              street-level coordinates, and a guessed marker would send you to the wrong
              street.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href={href("/shop")}>Get a price</Link>
              </Button>
              <Button asChild variant="secondary">
                <a href={`https://${siteConfig.foundation.hostname}/legal/delivery`}>
                  Delivery and returns
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { ContactForm } from "@/components/site/contact-form";
import { MapEmbed } from "@/components/site/map-embed";
import { foundationUrl } from "@/components/site/foundation-link";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Order honey or ask a question — WhatsApp, call or write to the Assoutudeen Honey Enterprise.",
};

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to order honey from Assoutudeen Honey Enterprise.",
)}`;

export default function ContactPage() {
  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="Contact"
          title="Talk to the Enterprise"
          standfirst="Ordering is quickest on WhatsApp. For wholesale and distribution questions, use the form below."
        />
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>Order on WhatsApp</CardTitle>
            <CardDescription>
              The fastest way to order, and how most customers do.
            </CardDescription>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center text-lg font-semibold text-primary underline underline-offset-4"
            >
              Start an order
            </a>
          </Card>

          <Card>
            <CardTitle>Call</CardTitle>
            <CardDescription>Tap to dial from your phone.</CardDescription>
            <a
              href={`tel:+${CONTACT.phoneE164}`}
              className="flex min-h-11 items-center text-lg font-semibold text-primary underline underline-offset-4"
            >
              {CONTACT.phoneDisplay}
            </a>
          </Card>

          <Card>
            <CardTitle>Email</CardTitle>
            <CardDescription>For anything that needs a written record.</CardDescription>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex min-h-11 items-center break-all text-lg font-semibold text-primary underline underline-offset-4"
            >
              {CONTACT.email}
            </a>
          </Card>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Send a message</h2>
            <p className="mt-2 max-w-prose text-sm text-charcoal-muted">
              Pick “Honey wholesale or distribution” in the dropdown for trade
              enquiries; anything else reaches the general inbox.
            </p>
            <div className="mt-6">
              <ContactForm privacyHref={`${foundationUrl}/legal/privacy`} />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl">Find us</h2>
              <div className="mt-4">
                <MapEmbed />
              </div>
            </div>

            <Card>
              <CardTitle>Ordering and delivery</CardTitle>
              <CardDescription>
                Orders are delivered across Nigeria.{" "}
                <Todo>
                  delivery zones, rates and timeframes — unconfirmed
                </Todo>
              </CardDescription>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

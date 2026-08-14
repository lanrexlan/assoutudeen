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
    "Contact the Assoutudeen Dawah Institute — questions about classes, teachers and the schedule.",
};

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I have a question about the Dawah Institute classes.",
)}`;

export default function ContactPage() {
  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="Contact"
          title="Talk to the Institute"
          standfirst="WhatsApp reaches us fastest. The form below routes your message to the right inbox."
        />
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
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
            <CardTitle>WhatsApp</CardTitle>
            <CardDescription>
              The fastest way to ask about classes and schedules.
            </CardDescription>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center text-lg font-semibold text-primary underline underline-offset-4"
            >
              Start a chat
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
              Pick “Classes at the Dawah Institute” in the dropdown and your
              message is routed to the classes inbox.
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
              <CardTitle>Class times and venue</CardTitle>
              <CardDescription>
                <Todo>
                  class times, venue or platform, and language for the seven
                  programmes
                </Todo>
              </CardDescription>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

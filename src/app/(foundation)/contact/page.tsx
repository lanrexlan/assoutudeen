import type { Metadata } from "next";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { FACEBOOK_PAGE } from "@/lib/lectures";
import { ContactForm } from "@/components/site/contact-form";
import { MapEmbed } from "@/components/site/map-embed";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp or email the Assoutudeen Prophetic Medicine Foundation in Ede, Osun State.",
};

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to speak to someone at the foundation.",
)}`;

export default function ContactPage() {
  return (
    <>
      <PageHeader
          eyebrow="Contact"
          title="Talk to us"
          standfirst="WhatsApp reaches us fastest. The form below routes your message to the right person."
        />

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
              The fastest way to reach us, and how most people do.
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
              Choose what your message is about and it will be directed to the right
              inbox.
            </p>
            <div className="mt-6">
              <ContactForm />
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
              <CardTitle>Office hours</CardTitle>
              <CardDescription>
                {CONTACT.officeHours}. Friday afternoons are quieter around Jumu&apos;ah.
                Call before travelling — the imam is often teaching.
              </CardDescription>
            </Card>

            <Card>
              <CardTitle>Follow the foundation</CardTitle>
              <CardDescription>
                Classes are streamed and archived on Facebook, and most day-to-day
                contact happens on WhatsApp.
              </CardDescription>
              <a
                href={FACEBOOK_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-semibold text-oxblood underline decoration-apricot decoration-2 underline-offset-4"
              >
                APMF on Facebook
              </a>
            </Card>
          </div>
        </div>
      </Section>

    </>
  );
}

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
    "Ask about a class at the Assoutudeen Dawah Institute in Ede — which class is on this week, where to come, or how to catch up on a recording.",
};

export default async function DawahContactPage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <PageHeader
        image="contact"
        eyebrow="Contact"
        title="Ask about a class"
        standfirst="Which class is on this Saturday, where to come, whether you have missed too much to start now — WhatsApp answers all three fastest."
      />

      <Section tone="chalk">
        <ContactChannels
          whatsappMessage={siteConfig.dawah.whatsappMessage}
          emailSubject="Question about a class at the Dawah Institute"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="flex gap-4 rounded-lg border border-chalk-dark bg-white p-5">
            <Medallion tone="soft" className="size-11 shrink-0">
              <MapPin aria-hidden="true" className="size-5" />
            </Medallion>
            <div>
              <p className="font-display text-lg text-charcoal">Where classes are</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
                {CONTACT.address}
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-lg border border-chalk-dark bg-white p-5">
            <Medallion tone="soft" className="size-11 shrink-0">
              <Clock aria-hidden="true" className="size-5" />
            </Medallion>
            <div>
              <p className="font-display text-lg text-charcoal">When someone answers</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
                {CONTACT.officeHours}. Messages sent during a class are answered
                afterwards.
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
              standfirst="Pick the subject that fits and it reaches the right person. Choose 'Course enrolment' for anything about the classes."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div>
            <MapEmbed />
            <p className="mt-6 text-sm leading-relaxed text-charcoal-muted">
              The map shows Ede rather than a pin on the door: nobody has supplied
              street-level coordinates, and a guessed marker would send you to the wrong
              street. Call when you are close and someone will bring you in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href={href("/schedule")}>See the teaching week</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={href("/library")}>Catch up on a class</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Images, Megaphone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { CONTACT, siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Media",
  description:
    "News, photographs, recorded lectures and upcoming programmes from the Assoutudeen Prophetic Medicine Foundation.",
};

const STRANDS = [
  {
    icon: Megaphone,
    title: "News and announcements",
    body: "Programme announcements, Ramadan and Eid campaigns, and notes on what the fund has done.",
    status: "Publishing from the CMS as soon as the first posts are written.",
  },
  {
    icon: Images,
    title: "Photographs",
    body: "Organised by event, lazy-loaded, and published only where the people in them have agreed to appear.",
    status: "Waiting on photographs and consent records.",
  },
  {
    icon: Video,
    title: "Lectures",
    body: "Recordings from the seven programmes, grouped by series.",
    status: "Lives on the Dawah Institute site, where the classes are.",
  },
  {
    icon: CalendarDays,
    title: "What is on",
    body: "Every class computed from its recurrence rule, so the calendar is never out of date.",
    status: "The schedule engine is the next thing being built.",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="News, photographs and lectures"
        standfirst="What the foundation has been doing, and what is coming up. Most of it is published from the newsroom in the CMS as it is written."
      />

      <Section tone="sand" size="lg">
        <SectionHeading
          kicker="Four strands"
          title="Where each kind of thing lives"
          standfirst="This page is deliberately honest about what is ready and what is not."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {STRANDS.map(({ icon: Icon, ...strand }) => (
            <Card key={strand.title} className="reveal">
              <div className="flex items-center gap-3">
                <Medallion tone="soft" className="size-11">
                  <Icon aria-hidden="true" className="size-5" />
                </Medallion>
                <CardTitle>{strand.title}</CardTitle>
              </div>
              <CardDescription>{strand.body}</CardDescription>
              <p className="mt-auto rounded-md border border-sand-dark bg-sand px-3 py-2 text-sm text-charcoal-muted">
                {strand.status}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- For journalists ------------------------------------------------ */}
      <Section tone="ink" size="lg" ornament>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            tone="dark"
            kicker="For journalists"
            title="The facts, in one place"
            standfirst="If you are writing about the foundation, everything below is on the public record and can be verified against the CAC register."
          />

          <ul className="reveal mt-10 grid gap-3 sm:grid-cols-2">
            {[
              ["Registered name", "Incorporated Trustees of Assoutudeen Prophetic Medicine Foundation"],
              ["Registration", "CAC/IT/NO 139886, 28 November 2019"],
              ["Based in", "Ede, Osun State, Nigeria"],
              ["Founder", "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi (Abu Mubaashir)"],
              ["Arms", `${siteConfig.dawah.name} · ${siteConfig.honey.name}`],
              ["Press contact", CONTACT.email],
            ].map(([term, value]) => (
              <li
                key={term}
                className="rounded-lg border border-white/12 bg-ink-raised p-4"
              >
                <p className="text-xs uppercase tracking-widest text-amber">{term}</p>
                <p className="mt-1 text-sm text-sand/85">{value}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-sm text-sand/60">
            Logo files and photographs for press use:{" "}
            <Todo className="border-white/30 bg-white/10 text-sand">press kit</Todo>
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="donate" size="lg">
              <Link href="/contact">Contact the foundation</Link>
            </Button>
            <Button asChild variant="ghostLight" size="lg">
              <Link href="/about/accountability">See the accounts</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

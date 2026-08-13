import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenText,
  GraduationCap,
  Landmark,
  Mic,
  Sprout,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArchFrame, Medallion } from "@/components/ui/ornament";
import { LanternScene } from "@/components/ui/illustration";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { BOOK } from "@/lib/book";
import { FOUNDER } from "@/lib/founder";
import { REGISTRATION } from "@/lib/organisation";
import { siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: "The founder",
  description: `${FOUNDER.name} (${FOUNDER.kunya}) — founder of the Assoutudeen Prophetic Medicine Foundation, Chief Imam of Surulere Mosque, and author of ${BOOK.title}.`,
};

const ICONS = [GraduationCap, Landmark, Mic, BookOpenText, Sprout];

/**
 * docs/03: "Donors and patients are trusting a person before they trust an
 * institution — this page carries more weight than the About page."
 */
export default function FounderPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={FOUNDER.name}
        standfirst={`Known as ${FOUNDER.kunya}. ${FOUNDER.summary}`}
      />

      <Section tone="sand" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Prose>
              {FOUNDER.biography.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Prose>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {FOUNDER.credentials.map((credential, index) => {
                const Icon = ICONS[index % ICONS.length];
                return (
                  <Card key={credential.label} className="reveal gap-3 p-5">
                    <div className="flex items-center gap-3">
                      <Medallion tone="soft" className="size-11">
                        <Icon aria-hidden="true" className="size-5" />
                      </Medallion>
                      <CardTitle className="text-base">{credential.label}</CardTitle>
                    </div>
                    <CardDescription>{credential.detail}</CardDescription>
                  </Card>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <figure>
              <ArchFrame className="aspect-3/4 w-full">
                <LanternScene />
              </ArchFrame>
              <figcaption className="mt-3 text-sm leading-relaxed text-charcoal-muted">
                A portrait belongs here.{" "}
                <Todo>portrait photograph of the founder</Todo> — no stock
                photograph will stand in for him.
              </figcaption>
            </figure>

            <Card className="gap-3">
              <div className="flex items-center gap-3">
                <Medallion tone="soft" className="size-11">
                  <UserRound aria-hidden="true" className="size-5" />
                </Medallion>
                <CardTitle className="text-base">On the public record</CardTitle>
              </div>
              <CardDescription>
                Named on the foundation&apos;s certificate of incorporation as{" "}
                <strong className="font-semibold text-charcoal">
                  {FOUNDER.registeredName}
                </strong>
                , Chairman of Trustees. {REGISTRATION.number}, registered{" "}
                {REGISTRATION.incorporatedOnDisplay}.
              </CardDescription>
            </Card>
          </aside>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <SectionHeading
          kicker="Study with him"
          title="What he teaches, and where"
          standfirst="Five of the Institute's seven programmes are his. All of them are free to attend."
        />

        <ul className="reveal mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {FOUNDER.teaches.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-lg border border-sand-dark bg-sand px-4 py-3"
            >
              <Medallion tone="soft" className="size-9">
                <Mic aria-hidden="true" className="size-4" />
              </Medallion>
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <a href={`https://${siteConfig.dawah.hostname}`}>See the class schedule</a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/shop">Read his book</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

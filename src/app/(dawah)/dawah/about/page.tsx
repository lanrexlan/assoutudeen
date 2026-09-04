import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HandHeart, Mic, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { PROGRAMMES, TEACHING_WINDOW } from "@/lib/programmes";
import { LECTURES } from "@/lib/lectures";
import { VERSES } from "@/lib/verses";
import { CONTACT, FOUNDATION_NAME, siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Assoutudeen Dawah Institute is the teaching arm of the Assoutudeen Prophetic Medicine Foundation: seven free classes a week in Ede, all recorded.",
};

export default async function DawahAboutPage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <PageHeader
        image="dawahHome"
        eyebrow="About"
        title="The teaching arm"
        standfirst={`${siteConfig.dawah.name} is where ${FOUNDATION_NAME} teaches. Seven classes a week, free, open to anyone, and recorded.`}
      />

      <Section tone="chalk" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <Prose>
            <ProseHeading>What the Institute is</ProseHeading>
            <p>
              The Institute is not a school with a gate and a fee. It is a set of
              recurring classes taught in Ede, {TEACHING_WINDOW.toLowerCase()}, by
              teachers who are named on the timetable. There is no enrolment, no
              register and no certificate at the end. You come, you learn, you ask.
            </p>
            <p>
              It exists because the foundation&apos;s other work depends on it. The
              remedies it publishes come out of a class that argues them from the
              evidence; the fund it runs is explained and reported at a gathering
              rather than in a newsletter. Teaching is the root, not the outreach.
            </p>

            <ProseHeading>How it teaches</ProseHeading>
            <ul>
              <li>
                <strong>Evidence first.</strong> A claim is traced to its verse or its
                narration in front of you, with the chain named. Nothing is asserted
                because it is popular.
              </li>
              <li>
                <strong>In sequence.</strong> The classes build week on week — the
                tafsir works through the Qur&apos;an verse by verse rather than
                jumping to whatever is topical.
              </li>
              <li>
                <strong>Recorded.</strong> {LECTURES.length} sessions are published, so
                missing an evening costs you nothing and anyone can check what was
                actually said.
              </li>
              <li>
                <strong>Free, and staying free.</strong> No fees, no paid tiers, no
                enrolment. The foundation carries the cost.
              </li>
            </ul>

            <ProseHeading>Where it sits</ProseHeading>
            <p>
              The Institute is one of two arms under the foundation. The other is the
              Honey Enterprise, which trades. The foundation itself is registered with
              the Corporate Affairs Commission and publishes its accounts every year.
            </p>
            <p>
              Classes are held at {CONTACT.address}.
            </p>
          </Prose>

          <aside className="space-y-4">
            {[
              { icon: BookOpen, label: "Classes a week", value: `${PROGRAMMES.length}` },
              { icon: Mic, label: "Recorded sessions", value: `${LECTURES.length}` },
              { icon: Users, label: "Fee", value: "None, ever" },
              { icon: HandHeart, label: "Open to", value: "Anyone" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-lg border border-chalk-dark bg-white p-5"
              >
                <Medallion tone="soft" className="size-11 shrink-0">
                  <Icon aria-hidden="true" className="size-5" />
                </Medallion>
                <div>
                  <p className="font-display text-xl text-charcoal">{value}</p>
                  <p className="text-sm text-charcoal-muted">{label}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </Section>

      <Section tone="ink" size="lg" ornament>
        <ArabicQuote
          arabic={VERSES.zumar9.arabic}
          translation={VERSES.zumar9.translation}
          source={VERSES.zumar9.source}
          tone="dark"
        />
      </Section>

      <Section tone="white" size="lg">
        <SectionHeading
          kicker="Start somewhere"
          title="Three ways in"
          standfirst="You do not have to arrive on the right week or know the syllabus. Pick whichever of these is easiest."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Read the timetable",
              body: "See which class falls on which evening before you set out.",
              cta: "See the week",
              to: "/schedule",
            },
            {
              icon: Mic,
              title: "Listen first",
              body: "Every class is recorded. Hear how a session runs before you come.",
              cta: "Open the library",
              to: "/library",
            },
            {
              icon: Users,
              title: "Meet the teachers",
              body: "Who teaches what, and what they have studied.",
              cta: "Read about them",
              to: "/teachers",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="seal" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              <Link
                href={href(item.to)}
                className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-primary-ink underline-offset-4 hover:underline"
              >
                {item.cta}
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/contact")}>Ask us anything first</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

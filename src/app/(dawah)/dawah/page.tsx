import Link from "next/link";
import { BookOpen, CalendarDays, Mic, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  Kicker,
  Medallion,
  OrnamentField,
  Starfield,
} from "@/components/ui/ornament";
import { Section, SectionHeading } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

/** The Dawah Institute front door. The schedule engine arrives in session 9. */
export default async function DawahHomePage() {
  const { href } = await getSiteContext("dawah");

  const programmes = [
    { title: "Weekly Tafsir", cadence: "Every Friday", teacher: "Imam Engr. Tirimidhi Abd'waasi" },
    { title: "Fortnightly Hadith", cadence: "2nd Saturday", teacher: "Imam Engr. Tirimidhi Abd'waasi" },
    { title: "Fortnightly Tawheed", cadence: "2nd Sunday", teacher: "Imam Engr. Tirimidhi Abd'waasi" },
    { title: "Prophetic Medicine", cadence: "2nd Saturday", teacher: "Imam Engr. Tirimidhi Abd'waasi" },
    { title: "Monthly Fiqh Seminar", cadence: "Last Sunday", teacher: "Shaykh Yaaqub Muhibullah Abd'hammed Olore" },
    { title: "Empowerment Lecture", cadence: "Last Monday", teacher: "Assoutudeen Prophetic Medicine Foundation" },
    { title: "Fataawah Night", cadence: "Quarterly", teacher: "A group of scholars" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-sand">
        <OrnamentField tone="gold" />
        <Starfield />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-b-full bg-[radial-gradient(ellipse_at_top,rgba(217,164,65,0.16),transparent_65%)]"
        />
        <Container className="relative py-16 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Kicker align="center">Assoutudeen Dawah Institute</Kicker>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-white sm:text-5xl">
              Learn the deen, one rule at a time
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sand/85">
              Seven recurring classes taught in Ede. Every one of them follows a rule
              rather than a date, so the schedule never goes stale and &ldquo;what is
              on this week?&rdquo; always has an answer.
            </p>
            <span aria-hidden="true" className="mx-auto mt-8 block h-0.5 w-16 rounded-full bg-amber" />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="donate" size="lg">
                <Link href={href("/schedule")}>See the schedule</Link>
              </Button>
              <Button asChild variant="ghostLight" size="lg">
                <Link href={href("/programmes")}>Browse the programmes</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="sand" size="lg" ornament>
        <SectionHeading
          kicker="The seven"
          title="Every class, every month"
          standfirst="Times, venues and language are being confirmed — see the note below. The cadences here are the ones the Institute has kept for years."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((programme) => (
            <Card key={programme.title} className="reveal">
              <div className="flex items-center gap-3">
                <Medallion tone="outline" className="size-11">
                  <CalendarDays aria-hidden="true" className="size-5" />
                </Medallion>
                <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                  {programme.cadence}
                </span>
              </div>
              <CardTitle>{programme.title}</CardTitle>
              <CardDescription>{programme.teacher}</CardDescription>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-charcoal-muted">
          <Todo>class times, venue or platform, and language of instruction</Todo>
        </p>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Teachers",
              body: "Imam Engr. Abd'Waasi Tirmidhi (Abu Mubaashir) and Shaykh Yaaqub Muhibullah Abd'hammed Olore.",
              href: "/teachers",
            },
            {
              icon: BookOpen,
              title: "Library",
              body: "Recorded lectures and notes, grouped by programme and date.",
              href: "/library",
            },
            {
              icon: Mic,
              title: "Attend",
              body: "Everything is free and open. Subscribe once to the calendar and never miss a session.",
              href: "/schedule",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="arch" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              <Link
                href={href(item.href)}
                className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-teal underline-offset-4 hover:underline"
              >
                {item.title === "Attend" ? "Add to calendar" : `Visit ${item.title.toLowerCase()}`}
              </Link>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-charcoal-muted">
          {siteConfig.dawah.name} is the education arm of the Assoutudeen Prophetic
          Medicine Foundation.
        </p>
      </Section>
    </>
  );
}

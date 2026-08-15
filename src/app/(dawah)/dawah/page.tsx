import Link from "next/link";
import { BookOpen, CalendarDays, HandHeart, Mic, Users } from "lucide-react";
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
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";
import {
  EMPOWERMENT_PROGRAMME,
  PROGRAMMES,
  TEACHING_WINDOW,
} from "@/lib/programmes";

/** The Dawah Institute front door. The schedule engine arrives in session 9. */
export default async function DawahHomePage() {
  const { href } = await getSiteContext("dawah");

  const days = [
    { day: "Friday" as const, label: "Friday" },
    { day: "Saturday" as const, label: "Saturday" },
    { day: "Sunday" as const, label: "Sunday" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-chalk">
        <OrnamentField tone="accent" />
        <Starfield />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-b-full bg-[radial-gradient(ellipse_at_top,rgba(217,164,65,0.16),transparent_65%)]"
        />
        <Container className="relative py-16 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Kicker align="center">Assoutudeen Dawah Institute</Kicker>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-white sm:text-5xl">
              Friday to Sunday, between Maghrib and Isha
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-chalk/85">
              Seven classes across three evenings, taught in Ede. Free, open, and
              recorded — so a missed week is never a lost one.
            </p>
            <span
              aria-hidden="true"
              className="mx-auto mt-8 block h-0.5 w-16 rounded-full bg-apricot"
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="donate" size="lg">
                <Link href={href("/schedule")}>See the schedule</Link>
              </Button>
              <Button asChild variant="ghostLight" size="lg">
                <Link href={href("/library")}>Watch a lecture</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* --- The week ------------------------------------------------------ */}
      <Section tone="chalk" size="lg" ornament>
        <SectionHeading
          kicker="The teaching week"
          title="Three evenings, seven classes"
          standfirst={`Everything runs ${TEACHING_WINDOW.toLowerCase()}. The Saturday pair alternate, so each one falls every other week.`}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {days.map(({ day, label }) => {
            const classes = PROGRAMMES.filter((p) => p.day === day);
            return (
              <div key={day} className="reveal">
                <div className="flex items-center gap-3 border-b border-chalk-dark pb-3">
                  <Medallion tone="soft" className="size-11">
                    <CalendarDays aria-hidden="true" className="size-5" />
                  </Medallion>
                  <h3 className="font-display text-xl">{label}</h3>
                </div>
                <ul className="mt-4 space-y-4">
                  {classes.map((programme) => (
                    <li
                      key={programme.slug}
                      className="rounded-lg border border-chalk-dark bg-white p-5 shadow-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-sage">
                        {programme.cadence}
                      </p>
                      <p className="mt-2 font-display text-lg">{programme.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                        {programme.description}
                      </p>
                      <p className="mt-3 text-sm text-charcoal">{programme.teacher}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* --- Empowerment --------------------------------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <div className="mx-auto max-w-3xl text-center">
          <Medallion className="mx-auto">
            <HandHeart aria-hidden="true" className="size-6" />
          </Medallion>
          <h2 className="mt-6 font-display text-3xl text-white">
            {EMPOWERMENT_PROGRAMME.title}
          </h2>
          <p className="mt-4 leading-relaxed text-chalk/85">
            {EMPOWERMENT_PROGRAMME.description}
          </p>
          <dl className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="text-chalk/55">When</dt>
              <dd className="mt-1 font-medium text-apricot">
                {EMPOWERMENT_PROGRAMME.cadence}
              </dd>
            </div>
            <div>
              <dt className="text-chalk/55">Time</dt>
              <dd className="mt-1 font-medium text-apricot">
                {EMPOWERMENT_PROGRAMME.time}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-chalk/60">
            This is the foundation&apos;s gathering rather than a class — the fund&apos;s
            work is reported and distributed there, alongside a lecture.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Teachers",
              body: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi, and Shaykh (Dr) Yaaqub Muhibullah Abd'hammed Olore for the monthly seminar.",
              href: "/teachers",
              cta: "Meet the teachers",
            },
            {
              icon: BookOpen,
              title: "Library",
              body: "Recordings of the Tafsir, halqah, fiqh and prophetic medicine sessions, grouped by series.",
              href: "/library",
              cta: "Browse the library",
            },
            {
              icon: Mic,
              title: "Attend",
              body: "Everything is free and open. Subscribe once to the calendar and never miss a session.",
              href: "/schedule",
              cta: "Add to calendar",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="seal" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              <Link
                href={href(item.href)}
                className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-sage underline-offset-4 hover:underline"
              >
                {item.cta}
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

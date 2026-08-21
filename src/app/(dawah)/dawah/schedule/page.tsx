import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, CalendarDays, Download, MapPin, Moon, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { Medallion } from "@/components/ui/ornament";
import { getSiteContext } from "@/lib/site-context";
import {
  EMPOWERMENT_PROGRAMME,
  PROGRAMMES,
  TEACHING_WINDOW,
  type Programme,
} from "@/lib/programmes";
import { CONTACT } from "@/lib/sites";
import { upcomingFor, formatDate, relativeToToday } from "@/lib/schedule";
import { todayInLagos, type PlainDate } from "@/lib/recurrence";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The teaching week at the Assoutudeen Dawah Institute: seven classes across Friday, Saturday and Sunday evenings, between maghrib and isha, in Ede.",
};

const DAYS = ["Friday", "Saturday", "Sunday"] as const;

function DayColumn({
  day,
  classes,
  hrefFor,
}: {
  day: string;
  classes: Programme[];
  hrefFor: (slug: string) => string;
}) {
  const today = todayInLagos();
  return (
    <div className="reveal">
      <div className="flex items-center gap-3 border-b border-chalk-dark pb-3">
        <Medallion tone="soft" className="size-11">
          <CalendarDays aria-hidden="true" className="size-5" />
        </Medallion>
        <div>
          <p className="font-display text-xl text-charcoal">{day}</p>
          <p className="text-sm text-charcoal-muted">{TEACHING_WINDOW}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-4">
        {classes.map((programme) => (
          <li key={programme.slug}>
            <Link
              href={hrefFor(programme.slug)}
              className="lift block rounded-lg border border-chalk-dark bg-white p-5"
            >
              <span className="block font-display text-lg text-charcoal">
                {programme.title}
              </span>
              <span className="mt-1 block text-sm text-charcoal-muted">
                {programme.cadence}
              </span>
              <NextDate programme={programme} today={today} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The computed date, or an honest silence.
 *
 * The alternating pair cannot be resolved until someone tells us one Saturday
 * on which the hadith class ran — see HADITH_ANCHOR. Until then this says they
 * alternate rather than naming a date it cannot stand behind.
 */
function NextDate({ programme, today }: { programme: Programme; today: PlainDate }) {
  const { dates, unresolved } = upcomingFor(programme, 1, today);

  if (unresolved) {
    return (
      <span className="mt-3 flex items-center gap-2 text-sm text-charcoal-faint">
        <Repeat aria-hidden="true" className="size-3.5" />
        Alternating Saturdays — ask which falls this week
      </span>
    );
  }

  if (!dates.length) return null;

  return (
    <span className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
      <CalendarCheck aria-hidden="true" className="size-3.5" />
      Next: {formatDate(dates[0])} · {relativeToToday(dates[0], today)}
    </span>
  );
}

export default async function SchedulePage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <PageHeader
        image="schedule"
        eyebrow="Schedule"
        title="The teaching week"
        standfirst="Three evenings, seven classes, one gathering every quarter. Free, open to everyone, and recorded."
      />

      <Section tone="chalk" size="lg" ornament>
        <div className="grid gap-8 lg:grid-cols-3">
          {DAYS.map((day) => (
            <DayColumn
              key={day}
              day={day}
              classes={PROGRAMMES.filter((p) => p.day === day)}
              hrefFor={(slug) => href(`/programmes/${slug}`)}
            />
          ))}
        </div>
      </Section>

      {/* --- How the timings work ------------------------------------------ */}
      <Section tone="white" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Prose>
            <ProseHeading>Why there is no clock time</ProseHeading>
            <p>
              Everything runs between maghrib and isha. In Ede that gap moves through
              the year, so a fixed time on a page would be wrong for most of it. Come
              for maghrib at the masjid and the class begins once the prayer has
              finished.
            </p>

            <ProseHeading>The Saturday pair</ProseHeading>
            <p>
              Hadith and prophetic medicine alternate, so each falls every second
              Saturday. The page computes every other date on this timetable itself;
              for these two it needs one date to count from, so until the Institute
              confirms a Saturday on which the hadith class ran, it says they
              alternate rather than naming a week it cannot vouch for.
            </p>

            <ProseHeading>Ramadan and Eid</ProseHeading>
            <p>
              The timetable changes in Ramadan and pauses over the two Eids. Changes are
              announced in class and on the foundation&apos;s Facebook page before they
              take effect.
            </p>
          </Prose>

          <div className="space-y-4">
            {[
              {
                icon: Repeat,
                title: EMPOWERMENT_PROGRAMME.title,
                body: `${EMPOWERMENT_PROGRAMME.cadence} · ${EMPOWERMENT_PROGRAMME.time}. ${EMPOWERMENT_PROGRAMME.description}`,
              },
              {
                icon: Moon,
                title: "Monthly Fiqh Seminar",
                body: "Last Sunday of the month, taught by Shaykh (Dr) Yaaqub Muhibullah Abd'hammed Olore — business transactions and how people treat one another.",
              },
              {
                icon: MapPin,
                title: "Where to come",
                body: CONTACT.address,
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-lg border border-chalk-dark bg-chalk p-5"
              >
                <Medallion tone="soft" className="size-11 shrink-0">
                  <Icon aria-hidden="true" className="size-5" />
                </Medallion>
                <div>
                  <p className="font-display text-lg text-charcoal">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="ink" size="md" ornament>
        <SectionHeading
          tone="dark"
          kicker="Missed a week"
          title="Every class is recorded"
          standfirst="Sessions are published afterwards, so nobody falls behind for missing an evening."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="donate" size="lg">
            <a href="/dawah/schedule.ics">
              <Download aria-hidden="true" />
              Add to your calendar
            </a>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/library")}>Open the library</Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/contact")}>Ask which class is on</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import {
  CLASS_TIME_WINDOW,
  DAWAH_CLASSES,
  MONTHLY_FIQH_SEMINAR,
  QUARTERLY_EMPOWERMENT,
} from "@/lib/dawah-schedule";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The Dawah Institute schedule — classes every Friday to Sunday between Maghrib and Isha, a monthly Fiqh seminar and quarterly empowerment.",
};

const days = ["Fridays", "Saturdays", "Sundays"] as const;

export default function SchedulePage() {
  const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
    "As-salaamu alaykum. What time are the classes at the Dawah Institute?",
  )}`;

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The institute"
          title="The Schedule"
          standfirst="Classes run every Friday to Sunday, between Maghrib and Isha — with a special monthly Fiqh seminar and a quarterly empowerment session."
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {days.map((day) => (
            <div key={day} className="rounded-lg border border-sand-dark/70 bg-white p-5 shadow-sm shadow-sand-dark/25">
              <p className="text-sm uppercase tracking-widest text-charcoal-muted">
                {day}
              </p>
              <ul className="mt-3 list-none space-y-3">
                {DAWAH_CLASSES.filter((session) => session.day === day).map(
                  (session) => (
                    <li key={session.title}>
                      <p className="font-display text-lg leading-snug text-charcoal">
                        {session.title}
                      </p>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-olive">
                        {session.cadence}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
                        {session.description}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border-t-4 border-teal bg-white p-5 shadow-sm shadow-sand-dark/25">
            <p className="text-sm uppercase tracking-widest text-charcoal-muted">
              Monthly · {MONTHLY_FIQH_SEMINAR.when}
            </p>
            <h2 className="mt-1 font-display text-xl text-charcoal">
              {MONTHLY_FIQH_SEMINAR.title}: {MONTHLY_FIQH_SEMINAR.topic}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
              Taught by {MONTHLY_FIQH_SEMINAR.teacher}.
            </p>
          </div>
          <div className="rounded-lg border-t-4 border-amber bg-white p-5 shadow-sm shadow-sand-dark/25">
            <p className="text-sm uppercase tracking-widest text-charcoal-muted">
              Quarterly · {QUARTERLY_EMPOWERMENT.when}
            </p>
            <h2 className="mt-1 font-display text-xl text-charcoal">
              {QUARTERLY_EMPOWERMENT.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
              {QUARTERLY_EMPOWERMENT.time}.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal-muted">
          Class times: {CLASS_TIME_WINDOW}, except the quarterly empowerment,
          which is proposed for Saturday mornings. The venue and language of the
          classes: <Todo>venue or platform, and language — unconfirmed</Todo>.
          A calendar feed (.ics) is published with the recurrence engine in a
          later session.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-on-primary transition-colors hover:bg-primary-hover"
          >
            Ask about classes on WhatsApp
          </a>
        </div>
      </Section>
    </>
  );
}

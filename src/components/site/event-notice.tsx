import Link from "next/link";
import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OrnamentField } from "@/components/ui/ornament";
import { upcomingEvent } from "@/lib/events";
import { formatDate } from "@/lib/recurrence";
import { CONTACT } from "@/lib/sites";
import { BANK_ACCOUNTS } from "@/lib/banking";
import { cn } from "@/lib/utils";

/**
 * The next empowerment gathering, set as a page rather than as a flier.
 *
 * A flier is an image: unreadable to search engines, unreadable to a screen
 * reader, illegible on a small phone, and a 400KB download on a bad connection.
 * The same information as real text costs a few kilobytes, can be found on
 * Google, and can be enlarged by anyone who needs to.
 *
 * The layout follows the flier's own hierarchy, so someone who has seen the
 * printed one recognises this: title, topic, who is speaking, then when and
 * where.
 */

const account = BANK_ACCOUNTS[0];

export function EventBanner({ className }: { className?: string }) {
  const state = upcomingEvent();
  if (state.status === "none") return null;

  const { event, date, daysAway } = state;
  const today = state.status === "today";

  return (
    <section
      className={cn("relative overflow-hidden bg-ink text-chalk", className)}
      aria-labelledby="next-event"
    >
      <OrnamentField tone="accent" className="opacity-50" />

      <Container className="relative py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
          <span className="seal seal-sm inline-flex items-center gap-2 bg-apricot px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">
            <CalendarDays aria-hidden="true" className="size-3.5" />
            {today ? "Today" : `In ${daysAway} days`}
          </span>

          <p id="next-event" className="font-display text-lg text-white">
            {event.title}
          </p>

          <p className="text-sm text-chalk/75">
            {formatDate(date)} · {event.time} · {event.venue}
          </p>

          <Link
            href="/empowerment#gathering"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-apricot underline-offset-4 hover:underline"
          >
            Details
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** The full card, for the empowerment page. */
export function EventCard() {
  const state = upcomingEvent();
  if (state.status === "none") return null;

  const { event, date } = state;

  return (
    <div id="gathering" className="seal scroll-mt-24 bg-apricot/50 p-px shadow-elevated">
      <div className="seal relative overflow-hidden bg-ink text-chalk">
        <OrnamentField tone="accent" className="opacity-40" />

        <div className="relative p-7 sm:p-10">
          {/* Title */}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-apricot">
            {formatDate(date)}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">
            {event.title}
          </h2>

          {/* Topic — Arabic first, as on the flier */}
          <div className="mt-7 rounded-xl border border-white/12 bg-ink-raised p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-apricot">
              Topic
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="mt-3 font-arabic text-2xl leading-[2] text-white"
            >
              {event.topic.arabic}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-chalk/90">
              {event.topic.english}
            </p>
          </div>

          {/* Who is speaking */}
          <ul className="mt-7 grid gap-4 sm:grid-cols-3">
            {event.speakers.map((speaker) => (
              <li
                key={speaker.name}
                className="rounded-lg border border-white/12 bg-ink-raised p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-apricot">
                  {speaker.role}
                </p>
                <p className="mt-2 font-display text-lg leading-snug text-white">
                  {speaker.name}
                </p>
                {speaker.title ? (
                  <p className="mt-1 text-sm leading-relaxed text-chalk/70">
                    {speaker.title}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>

          {/* When and where */}
          <dl className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              { icon: CalendarDays, term: "Date", detail: formatDate(date) },
              { icon: Clock, term: "Time", detail: event.time },
              { icon: MapPin, term: "Venue", detail: event.venue },
            ].map(({ icon: Icon, term, detail }) => (
              <div key={term} className="flex gap-3">
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-apricot" />
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chalk/55">
                    {term}
                  </dt>
                  <dd className="mt-0.5 text-chalk/90">{detail}</dd>
                </div>
              </div>
            ))}
          </dl>

          {/* Enquiries and giving */}
          <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              <p className="flex items-center gap-2 text-chalk/55">
                <Phone aria-hidden="true" className="size-3.5" />
                Enquiries
              </p>
              <p className="mt-1 flex flex-wrap gap-x-4 text-chalk/90">
                {event.enquiries.map((number) => (
                  <a
                    key={number}
                    href={`tel:+234${number.replace(/^0/, "")}`}
                    className="underline-offset-4 hover:text-apricot hover:underline"
                  >
                    {number}
                  </a>
                ))}
              </p>
            </div>

            <div className="text-sm">
              <p className="text-chalk/55">To support this gathering</p>
              <p className="mt-1 font-mono tracking-[0.08em] text-apricot">
                {account.accountNumber} · {account.bank}
              </p>
            </div>

            <Button asChild variant="donate" size="lg">
              <a
                href={`https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
                  `As-salaamu alaykum. I would like to ask about ${event.title}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask about it
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

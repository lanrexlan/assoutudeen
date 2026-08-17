import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, PlayCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  FACEBOOK_PAGE,
  LECTURES,
  LECTURE_CATEGORIES,
  lecturesIn,
} from "@/lib/lectures";
import { CONTACT, siteConfig } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";
import { FOUNDER } from "@/lib/founder";

export const metadata: Metadata = {
  title: "Media",
  description: `${LECTURES.length} recorded lectures — Tafsir, prophetic medicine, the monthly fiqh seminar and the weekly halqah — from the Assoutudeen Prophetic Medicine Foundation.`,
};

/** How many to list per category before linking out to the full archive. */
const PER_CATEGORY = 6;

export default function MediaPage() {
  return (
    <>
      <PageHeader
        image="media"
        eyebrow="Media"
        title="Lectures and recordings"
        standfirst={`${LECTURES.length} recorded sessions, published as they are taught — Tafsir on Friday evenings, prophetic medicine and hadith on Saturdays, fiqh on Sundays, and the monthly seminar.`}
      >
        <Button asChild variant="donate" size="lg">
          <a href={FACEBOOK_PAGE} target="_blank" rel="noopener noreferrer">
            <Video aria-hidden="true" />
            The full archive on Facebook
          </a>
        </Button>
      </PageHeader>

      {LECTURE_CATEGORIES.map((category, index) => {
        const items = lecturesIn(category.key);
        if (items.length === 0) return null;
        const shown = items.slice(0, PER_CATEGORY);

        return (
          <Section
            key={category.key}
            tone={index % 2 === 0 ? "chalk" : "white"}
            size="lg"
            ornament={index % 2 === 0}
          >
            <SectionHeading
              kicker={`${items.length} recording${items.length === 1 ? "" : "s"}`}
              title={category.label}
              standfirst={category.blurb}
            />

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((lecture) => (
                <li key={lecture.id}>
                  <a
                    href={lecture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lift flex h-full flex-col gap-3 rounded-xl border border-chalk-dark bg-white p-5 shadow-sm hover:border-apricot"
                  >
                    <div className="flex items-center gap-3">
                      <Medallion tone="soft" className="size-11">
                        <PlayCircle aria-hidden="true" className="size-5" />
                      </Medallion>
                      {lecture.series ? (
                        <span className="text-xs font-semibold uppercase tracking-widest text-apricot-dark">
                          {lecture.series}
                        </span>
                      ) : null}
                    </div>
                    <p className="font-display text-base leading-snug text-charcoal">
                      {lecture.title}
                    </p>
                    {lecture.lecturer ? (
                      <p className="text-sm text-charcoal-muted">{lecture.lecturer}</p>
                    ) : null}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-oxblood">
                      Watch
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {items.length > shown.length ? (
              <p className="mt-8 text-center text-sm text-charcoal-muted">
                {items.length - shown.length} more in this series —{" "}
                <a
                  href={FACEBOOK_PAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-oxblood underline decoration-apricot decoration-2 underline-offset-4"
                >
                  see them all
                </a>
                .
              </p>
            ) : null}
          </Section>
        );
      })}

      {/* --- Why they are links -------------------------------------------- */}
      <Section tone="chalk" size="md">
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-charcoal-muted">
          Recordings open on Facebook rather than playing here. Embedding the player
          would load third-party scripts and cookies on every visit, which costs
          mobile data this audience pays for — and would need a cookie banner before
          it could run at all.
        </p>
      </Section>

      {/* --- For journalists ------------------------------------------------ */}
      <Section tone="ink" size="lg" ornament>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            tone="dark"
            kicker="For journalists"
            title="The facts, in one place"
            standfirst="Everything below is on the public record and can be checked against the CAC register."
          />

          <ul className="reveal mt-10 grid gap-3 sm:grid-cols-2">
            {[
              ["Registered name", REGISTRATION.registeredName],
              [
                "Registration",
                `${REGISTRATION.number}, ${REGISTRATION.incorporatedOnDisplay}`,
              ],
              ["Based in", "Ede, Osun State, Nigeria"],
              ["Founder", `${FOUNDER.name} (${FOUNDER.kunya})`],
              ["Arms", `${siteConfig.dawah.name} · ${siteConfig.honey.name}`],
              ["Press contact", CONTACT.email],
            ].map(([term, value]) => (
              <li
                key={term}
                className="rounded-lg border border-white/12 bg-ink-raised p-4"
              >
                <p className="text-xs uppercase tracking-widest text-apricot">{term}</p>
                <p className="mt-1 text-sm text-chalk/85">{value}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-sm text-chalk/60">
            Logo files for press use — stacked, horizontal, icon-only, reversed and
            one-ink — are in{" "}
            <a
              href="/brand/apmf_logo_variant_preview.jpg"
              className="font-medium text-apricot underline decoration-apricot decoration-2 underline-offset-4"
            >
              the logo pack
            </a>
            , with the usage rules in the brand guide.
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

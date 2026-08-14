import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";

export const metadata: Metadata = {
  title: "The founder",
  description:
    "Imam Engr. Abd'Waasi Tirmidhi A. (Abu Mubaashir) — founder of the Assoutudeen Prophetic Medicine Foundation and author of Endless Blessings From The Creator.",
};

/**
 * docs/03: "Donors and patients are trusting a person before they trust an
 * institution — this page carries more weight than the About page."
 *
 * The name is spelled exactly as in docs/01. Do not normalise the apostrophes.
 */
export default function FounderPage() {
  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="About"
          title="Imam Engr. Abd'Waasi Tirmidhi A."
          standfirst="Known as Abu Mubaashir. Founder of the foundation, chief instructor at the Dawah Institute, and author of Endless Blessings From The Creator."
        />
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Prose>
            <h2>Biography</h2>
            <p>
              <Todo>
                full biography — where he was born and raised, how he came to prophetic
                medicine, and what he does day to day
              </Todo>
            </p>

            <h2>Islamic education</h2>
            <p>
              <Todo>
                Islamic education — institutions, years, subjects, any ijāzah held and
                from whom
              </Todo>
            </p>

            <h2>Teachers</h2>
            <p>
              <Todo>teachers he studied under, and in which disciplines</Todo>
            </p>

            <h2>Medical and technical training</h2>
            <p>
              The title <em>Engr.</em> reflects formal engineering training —{" "}
              <Todo>degree, discipline and institution</Todo>. His work in prophetic
              medicine rests on <Todo>relevant health training or qualifications</Todo>.
            </p>
            <p>
              We would rather leave these blank than overstate them. This page will only
              claim credentials that can be checked.
            </p>

            <h2>Years of practice</h2>
            <p>
              <Todo>years teaching, and years advising on prophetic medicine</Todo>
            </p>

            <h2>Publications</h2>
            <p>
              <strong>Endless Blessings From The Creator</strong> — 175 pages, around 45
              natural remedies from the Qur&apos;an and the Sunnah, each traced to its
              evidence, with commentary from Ibn al-Qayyim&apos;s{" "}
              <em>At-Tibb an-Nabawiyy</em>. First produced in August 2023.
            </p>
            <p>
              <Todo>any other publications, articles or contributions</Todo>
            </p>

            <h2>Teaching and speaking</h2>
            <p>
              Through the Assoutudeen Dawah Institute he teaches the weekly Tafsir class
              on Fridays, the fortnightly Hadith and Prophetic Medicine classes on
              Saturdays, and the Sunday classes — Fiqh, Virtues of the Companions and
              Qur&apos;an and Modern Science.{" "}
              <Todo>speaking engagements and external lectures</Todo>
            </p>
          </Prose>

          <aside className="space-y-4">
            <div className="rounded-lg border border-sand-dark bg-white p-5">
              <div className="flex aspect-3/4 items-center justify-center rounded-md bg-sand-dark/60 p-4 text-center text-sm text-charcoal-muted">
                <Todo>portrait photograph of the founder</Todo>
              </div>
              <p className="mt-3 text-sm text-charcoal-muted">
                A good portrait matters here more than anywhere else on the site.
              </p>
            </div>

            <Card>
              <CardTitle>The book</CardTitle>
              <CardDescription>
                <em>Endless Blessings From The Creator</em> — 175 pages, ~45 remedies.
              </CardDescription>
              <Button asChild variant="secondary">
                <Link href="/shop">About the book</Link>
              </Button>
            </Card>

            <Card>
              <CardTitle>Study with him</CardTitle>
              <CardDescription>
                Classes every Friday to Sunday at the Assoutudeen Dawah Institute.
              </CardDescription>
              <Button asChild variant="secondary">
                <a href="https://dawah.assoutudeen.com">Dawah Institute</a>
              </Button>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}

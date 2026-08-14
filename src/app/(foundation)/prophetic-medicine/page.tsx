import type { Metadata } from "next";
import Link from "next/link";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/ui/disclaimer";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "Prophetic Medicine",
  description:
    "The remedies of the Qur'an and Sunnah from Endless Blessings From The Creator — honey, black seed, dates, olive and more, quoted verbatim from the sources.",
};

/**
 * Landing for the remedies library (CLAUDE.md: the primary SEO asset).
 * Roughly 45 chapters; 10–15 free, the rest gated. The chapter list itself is
 * not in the repo yet — it must come from the book, not from memory.
 */
export default async function PropheticMedicinePage() {
  const { href } = await getSiteContext("foundation");

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="From the book"
          title="Prophetic medicine"
          standfirst="The remedies of the Qur'an and Sunnah — honey, black seed, dates, olive and more — explained from the sources, quoted verbatim."
        />
      </Section>

      <Section>
        <ArabicQuote
          arabic="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
          translation="In the name of Allah, the Most Gracious, the Most Merciful."
          source="Qur'an, Al-Fātiḥah 1:1"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>~45 remedies</CardTitle>
            <CardDescription>
              The chapters of{" "}
              <i>Endless Blessings From The Creator</i>, each with its guidance
              from the Qur&apos;an and Sunnah.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>175 pages</CardTitle>
            <CardDescription>
              A practical, book-length reference by Imam Engr. Abd&apos;Waasi
              Tirmidhi A. (Abu Mubaashir).
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Free to read</CardTitle>
            <CardDescription>
              Ten to fifteen remedies will be free on this site; the rest sit
              behind a simple unlock.
            </CardDescription>
          </Card>
        </div>

        <Prose className="mt-12">
          <h2>What prophetic medicine is</h2>
          <p>
            Prophetic medicine is the guidance the Prophet (peace be upon him)
            gave on health: foods and herbs recommended in the Qur&apos;an and
            Sunnah, together with the manners of eating, sleeping and treating
            illness. It sits alongside — never instead of — qualified medical
            care.
          </p>
          <p>
            The remedy chapters, their Arabic quotations and their classical
            references are drawn from the book: <Todo>
              remedy chapter list — from the book, in the author&apos;s order
            </Todo>
            . Every Qur&apos;anic verse will be copied verbatim, diacritics
            intact, never retyped or &ldquo;tidied&rdquo;.
          </p>
        </Prose>

        <Disclaimer className="mt-10" />

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={href("/")}>Back to the homepage</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

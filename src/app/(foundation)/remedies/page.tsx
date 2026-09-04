import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenText, Lock, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { listRemedies, type RemedyCard } from "@/lib/remedies";
import { BOOK } from "@/lib/book";
import { VERSES } from "@/lib/verses";
import { formatNaira } from "@/payload/fields/money";

export const metadata: Metadata = {
  title: "Remedies library",
  description: `The remedies of the Qur'an and the Sunnah, each traced to its evidence — from ${BOOK.title} by ${BOOK.author}.`,
};

/* The library reads from the CMS on every request: a chapter published in the
   admin panel is live immediately, without a deployment. */
export const dynamic = "force-dynamic";

function RemedyTile({ remedy }: { remedy: RemedyCard }) {
  return (
    <li>
      <Link
        href={`/remedies/${remedy.slug}`}
        className="lift flex h-full flex-col gap-2 rounded-lg border border-chalk-dark bg-white p-5"
      >
        <span className="flex items-center justify-between gap-3">
          <span className="font-display text-lg leading-snug text-charcoal">
            {remedy.name}
          </span>
          {remedy.isFree ? (
            <span className="shrink-0 rounded-full bg-apricot/20 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-apricot-dark">
              Free
            </span>
          ) : (
            <Lock
              aria-label="In the book"
              className="size-4 shrink-0 text-charcoal-faint"
            />
          )}
        </span>

        {remedy.arabicName ? (
          <span className="font-arabic text-xl leading-relaxed text-primary-ink">
            <span lang="ar" dir="rtl">
              {remedy.arabicName}
            </span>
          </span>
        ) : null}

        {remedy.transliteration ? (
          <span className="text-sm italic text-charcoal-muted">
            {remedy.transliteration}
          </span>
        ) : null}

        {remedy.bookChapterRef ? (
          <span className="mt-auto pt-2 text-xs text-charcoal-faint">
            {remedy.bookChapterRef}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

export default async function RemediesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const search = q?.trim() ?? "";
  const remedies = await listRemedies(search || undefined);
  const free = remedies.filter((r) => r.isFree).length;

  return (
    <>
      <PageHeader
        image="propheticMedicine"
        eyebrow="Remedies library"
        title="Every remedy, traced to its evidence"
        standfirst={`Around ${BOOK.remedies} natural remedies named in the Qur'an and the Sunnah, each with the verse, the hadith and its full citation, and Ibn al-Qayyim's commentary. Drawn from ${BOOK.title}.`}
      />

      <Section tone="chalk" size="lg" ornament>
        {/* A GET form: it works without JavaScript, and every search has a URL
            that can be shared or linked. */}
        <form
          role="search"
          action="/remedies"
          className="mx-auto flex max-w-xl gap-2.5"
        >
          <label className="sr-only" htmlFor="q">
            Search the remedies
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-charcoal-faint"
            />
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={search}
              placeholder="Black seed, honey, dates…"
              className="min-h-12 w-full rounded-full border border-chalk-deep bg-white ps-10 pe-4 text-charcoal placeholder:text-charcoal-faint focus:border-primary"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>

        {remedies.length ? (
          <>
            <p className="mt-8 text-center text-sm text-charcoal-muted">
              {search ? (
                <>
                  {remedies.length}{" "}
                  {remedies.length === 1 ? "remedy" : "remedies"} matching{" "}
                  <strong className="text-charcoal">{search}</strong> ·{" "}
                  <Link href="/remedies" className="underline underline-offset-4">
                    show all
                  </Link>
                </>
              ) : (
                <>
                  {remedies.length} published · {free} free to read
                </>
              )}
            </p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {remedies.map((remedy) => (
                <RemedyTile key={remedy.id} remedy={remedy} />
              ))}
            </ul>
          </>
        ) : (
          /* Honest when there is nothing: no skeleton rows, no "coming soon"
             banner pretending to be content. */
          <div className="mx-auto mt-12 max-w-xl text-center">
            <Medallion tone="soft" className="mx-auto">
              <BookOpenText aria-hidden="true" className="size-6" />
            </Medallion>
            <p className="mt-5 font-display text-2xl text-charcoal">
              {search ? "Nothing matches that yet" : "The library is being typeset"}
            </p>
            <p className="mt-3 leading-relaxed text-charcoal-muted">
              {search ? (
                <>
                  No remedy matching <strong>{search}</strong> has been published
                  yet.{" "}
                  <Link href="/remedies" className="underline underline-offset-4">
                    See everything published so far
                  </Link>
                  .
                </>
              ) : (
                <>
                  The chapters are being prepared one at a time, with the Arabic
                  reproduced rather than retyped and every hadith carrying its
                  citation. The whole of it is already in the book.
                </>
              )}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild variant="donate" size="lg">
                <Link href="/shop">Get the book — {formatNaira(BOOK.priceKobo)}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/prophetic-medicine">What prophetic medicine is</Link>
              </Button>
            </div>
          </div>
        )}
      </Section>

      {/* --- How a chapter is built ---------------------------------------- */}
      <Section tone="white" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <Prose>
            <h2 className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="seal inline-flex size-8 shrink-0 items-center justify-center bg-apricot/18 text-apricot-dark [--c:0.5rem]"
              >
                <Sparkles className="size-4" />
              </span>
              What is in each chapter
            </h2>
            <p>
              Every remedy is built the same way, because the point is not that a
              food is good for you — it is <em>where that claim comes from</em>.
            </p>
            <ul>
              {BOOK.chapterStructure.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Between ten and fifteen chapters are free to read here. The rest are
              in the book, which is how the printing pays for itself.
            </p>
          </Prose>

          <ArabicQuote
            arabic={VERSES.isra82.arabic}
            translation={VERSES.isra82.translation}
            source={VERSES.isra82.source}
          />
        </div>
      </Section>

      <Section tone="chalk" size="md">
        <Disclaimer className="mx-auto max-w-3xl" />
      </Section>

      <Section tone="ink" size="md" ornament>
        <SectionHeading
          tone="dark"
          kicker="The book"
          title={BOOK.title}
          standfirst={`${BOOK.pages} pages, around ${BOOK.remedies} remedies, every chapter footnoted. ${formatNaira(BOOK.priceKobo)} for a printed copy.`}
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="donate" size="lg">
            <Link href="/shop">Order a copy</Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href="/prophetic-medicine">Read the background</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

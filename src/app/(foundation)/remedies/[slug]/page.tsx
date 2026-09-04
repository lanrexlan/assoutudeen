import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { BookOpenText, Lock, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { getRemedy, listRemedies, remedySlugs } from "@/lib/remedies";
import { BOOK } from "@/lib/book";
import { formatNaira } from "@/payload/fields/money";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return (await remedySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const remedy = await getRemedy(slug);
  if (!remedy) return { title: "Remedy not found" };

  const name = [remedy.name, remedy.transliteration]
    .filter(Boolean)
    .join(" · ");

  return {
    title: remedy.name,
    description: `${name} in the Qur'an and the Sunnah — the verse, the hadith with its full citation, and Ibn al-Qayyim's commentary. From ${BOOK.title}.`,
  };
}

/** Payload richText is null until someone writes it; render nothing then. */
function Rich({ data }: { data: unknown }) {
  if (!data) return null;
  return <RichText data={data as SerializedEditorState} />;
}

const hasRich = (value: unknown): boolean => Boolean(value);

export default async function RemedyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const remedy = await getRemedy(slug);
  if (!remedy) notFound();

  const others = (await listRemedies())
    .filter((r) => r.slug !== remedy.slug)
    .slice(0, 3);

  const hadiths = remedy.hadiths ?? [];
  const verse = remedy.quranVerse;

  /* Gating is a content decision, made in the CMS. What is gated is the
     *commentary and the detail* — never the evidence: if a verse or a hadith is
     shown at all, it is shown whole, with its citation. Quoting scripture and
     then charging for the reference would be the wrong way round. */
  const gated = !remedy.isFree;

  return (
    <>
      <PageHeader
        eyebrow="Remedies library"
        title={remedy.name}
        standfirst={
          [remedy.transliteration, remedy.bookChapterRef]
            .filter(Boolean)
            .join(" · ") || undefined
        }
      >
        {remedy.arabicName ? (
          /* The paragraph stays LTR so the name sits at the start of the
             column with everything else; only the Arabic itself is RTL. */
          <p className="font-arabic text-3xl leading-relaxed text-apricot">
            <span lang="ar" dir="rtl">
              {remedy.arabicName}
            </span>
          </p>
        ) : null}
      </PageHeader>

      {/* --- The evidence, always in full ---------------------------------- */}
      {verse?.arabic || hadiths.length ? (
        <Section tone="chalk" size="lg" ornament>
          <div className="mx-auto max-w-3xl space-y-6">
            {verse?.arabic ? (
              <ArabicQuote
                arabic={verse.arabic}
                translation={verse.translation ?? ""}
                source={verse.reference ?? "Qur'an"}
              />
            ) : null}

            {hadiths.map((hadith, index) => (
              <figure
                key={hadith.id ?? index}
                className="reveal rounded-xl border border-chalk-dark bg-white p-6 shadow-sm sm:p-8"
              >
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-2xl leading-[2.1] text-charcoal"
                >
                  {hadith.arabic}
                </p>
                <figcaption className="mt-5 border-t border-chalk-dark pt-5">
                  <p className="leading-relaxed text-charcoal">
                    {hadith.translation}
                  </p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-semibold text-primary-ink">
                      {hadith.source}
                    </span>
                    {hadith.gradingNote ? (
                      <span className="text-charcoal-muted">
                        {hadith.gradingNote}
                      </span>
                    ) : null}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {/* --- The chapter itself -------------------------------------------- */}
      <Section tone="white" size="lg">
        <div className="mx-auto max-w-3xl">
          {gated ? (
            <div className="seal bg-chalk-dark p-px shadow-sm">
              <div className="seal bg-chalk p-8 text-center">
                <Medallion className="mx-auto">
                  <Lock aria-hidden="true" className="size-6" />
                </Medallion>
                <p className="mt-5 font-display text-2xl text-charcoal">
                  The rest of this chapter is in the book
                </p>
                <p className="mx-auto mt-3 max-w-lg leading-relaxed text-charcoal-muted">
                  The evidence above is published in full, with its citations, as
                  it should be. Ibn al-Qayyim&apos;s commentary, the composition,
                  the traditional uses and the cautions are in{" "}
                  <em>{BOOK.title}</em> — {BOOK.pages} pages, around{" "}
                  {BOOK.remedies} remedies, every chapter footnoted.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="donate" size="lg">
                    <Link href="/shop">
                      Get the book — {formatNaira(BOOK.priceKobo)}
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/remedies">Read a free chapter</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Prose className="max-w-none">
              {hasRich(remedy.ibnQayyimCommentary) ? (
                <>
                  <ProseHeading>Ibn al-Qayyim&apos;s commentary</ProseHeading>
                  <Rich data={remedy.ibnQayyimCommentary} />
                </>
              ) : null}

              {hasRich(remedy.composition) ? (
                <>
                  <ProseHeading>Composition</ProseHeading>
                  <Rich data={remedy.composition} />
                </>
              ) : null}

              {hasRich(remedy.traditionalUses) ? (
                <>
                  <ProseHeading>Traditional uses</ProseHeading>
                  <Rich data={remedy.traditionalUses} />
                </>
              ) : null}

              {hasRich(remedy.precautions) ? (
                <>
                  <ProseHeading>Cautions</ProseHeading>
                  <Rich data={remedy.precautions} />
                </>
              ) : null}
            </Prose>
          )}

          {remedy.bookChapterRef ? (
            <p className="mt-8 flex items-center justify-center gap-2.5 text-sm text-charcoal-muted">
              <ScrollText aria-hidden="true" className="size-4 text-apricot-dark" />
              {remedy.bookChapterRef} of <em>{BOOK.title}</em>
            </p>
          ) : null}

          <Disclaimer className="mt-10" />
        </div>
      </Section>

      {others.length ? (
        <Section tone="chalk" size="lg">
          <h2 className="text-center font-display text-2xl text-charcoal">
            Other remedies
          </h2>
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {others.map((other) => (
              <li key={other.id}>
                <Link
                  href={`/remedies/${other.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-chalk-deep bg-white px-4 text-sm text-charcoal hover:border-primary hover:text-primary-ink"
                >
                  {other.isFree ? (
                    <BookOpenText aria-hidden="true" className="size-3.5 text-apricot-dark" />
                  ) : (
                    <Lock aria-hidden="true" className="size-3.5 text-charcoal-faint" />
                  )}
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button asChild variant="secondary">
              <Link href="/remedies">The whole library</Link>
            </Button>
          </div>
        </Section>
      ) : null}
    </>
  );
}

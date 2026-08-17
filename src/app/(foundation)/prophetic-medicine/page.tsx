import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenText, Leaf, Quote, Stethoscope } from "lucide-react";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/ui/disclaimer";
import { SealFrame, Medallion } from "@/components/ui/ornament";
import { RemedyScene } from "@/components/ui/illustration";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  TestimonyDisclaimer,
  TestimonyWall,
} from "@/components/site/testimony-wall";
import { BOOK } from "@/lib/book";
import { VERSES, VERSE_TEXT_SOURCE } from "@/lib/verses";

export const metadata: Metadata = {
  title: "Prophetic medicine",
  description:
    "What prophetic medicine is, where it sits alongside conventional medicine, and the remedies of the Qur'an and the Sunnah with their evidence attached.",
};

export default function PropheticMedicinePage() {
  return (
    <>
      <PageHeader
        image="propheticMedicine"
        eyebrow="Prophetic medicine"
        title="Healing, traced to its evidence"
        standfirst="The remedies the Qur'an and the Sunnah name — set out with the verse, the hadith and its grading, and the commentary of Ibn al-Qayyim. Nothing here asks you to leave your doctor."
      />

      {/* --- The two verses that frame it --------------------------------- */}
      <Section tone="chalk" size="lg">
        <div className="grid gap-6 lg:grid-cols-2">
          <ArabicQuote className="reveal" {...VERSES.shuara80} />
          <ArabicQuote className="reveal" {...VERSES.isra82} />
        </div>
        <p className="mt-6 text-center text-xs text-charcoal-muted">
          {VERSE_TEXT_SOURCE}
        </p>
      </Section>

      {/* --- What it is, and is not --------------------------------------- */}
      <Section tone="white" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <SectionHeading
              align="start"
              kicker="What it is"
              title="Prophetic medicine, plainly"
              standfirst="Three things get muddled together in Nigeria. They are not the same, and we keep them apart."
            />
            <Prose className="mt-8">
              <ul>
                <li>
                  <strong>Prophetic medicine</strong> — the foods and remedies named in
                  the Qur&apos;an and the Sunnah: honey, black seed, oxblood oil, dates,
                  zamzam, talbīna and the rest. What we teach and publish.
                </li>
                <li>
                  <strong>Ruqyah</strong> — healing sought through the recitation of the
                  Qur&apos;an and authentic supplications. Related, but distinct.
                </li>
                <li>
                  <strong>General herbal practice</strong> — the wider trade in
                  unverified preparations and, at its worst, amulets and charms.
                  Discouraging that is written into our registered objects.
                </li>
              </ul>

              <ProseHeading>Where conventional medicine fits</ProseHeading>
              <p>
                Alongside all of it, and never underneath it. If you are ill, see a
                qualified doctor. If you have been prescribed treatment, take it.
                Nothing on this site is a diagnosis, and nothing here should be read as
                a reason to stop or delay medical care.
              </p>
              <p>
                The founder is a student of knowledge and an engineer, not a physician.
                What the foundation offers is scholarship and evidence, honestly
                sourced — and help paying the hospital when the bill is the thing
                standing in the way.
              </p>
            </Prose>
          </div>

          <SealFrame className="reveal mx-auto aspect-3/4 w-full max-w-sm">
            <RemedyScene />
          </SealFrame>
        </div>
      </Section>

      {/* --- How a remedy page is built ----------------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker="The library"
          title="How every remedy is set out"
          standfirst={`Each chapter of ${BOOK.title} follows the same order, and so will each page of the library.`}
        />

        <ol className="reveal mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {BOOK.chapterStructure.map((item, index) => (
            <li
              key={item}
              className="flex gap-4 rounded-lg border border-white/12 bg-ink-raised p-5"
            >
              <span className="font-display text-sm text-apricot">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-chalk/80">{item}</span>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-chalk/60">
          Ten to fifteen chapters are published free as the Remedies Library. The rest
          stay in the book, which is what keeps the library free.
        </p>
      </Section>

      {/* --- What is coming ------------------------------------------------ */}
      <Section tone="chalk" size="lg">
        <SectionHeading
          kicker="In preparation"
          title="The Remedies Library"
          standfirst="Around forty-five remedies, each one a page. It is being typeset from the book chapter by chapter, because the Arabic has to be copied from the source rather than retyped."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Leaf,
              title: "The remedies",
              body: "Olive oil, black seed, honey, zamzam, dates, talbīna, miswāk, sidr and around forty more.",
            },
            {
              icon: Quote,
              title: "The evidence",
              body: "Verse, hadith and full source citation on every page. Where a grading exists, it is stated.",
            },
            {
              icon: BookOpenText,
              title: "The commentary",
              body: "Ibn al-Qayyim's At-Tibb an-Nabawiyy, as quoted in the book, alongside composition and uses.",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="seal" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/shop">Get the book</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Ask a question</Link>
          </Button>
        </div>
      </Section>

      {/* --- What people have written --------------------------------- */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="From the archive"
          title="What people have written to us"
          standfirst="A few of the messages the foundation has been sent over the years, published anonymously. They are personal experiences, not evidence — read the note below before you read them."
        />

        <TestimonyDisclaimer className="mt-8" />

        <TestimonyWall className="mt-10" />
      </Section>

      <Section tone="chalk" size="md">
        <div className="mx-auto max-w-3xl">
          <Disclaimer>
            <span className="flex items-start gap-3">
              <Stethoscope aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-apricot-dark" />
              <span>
                These pages are educational. They quote the Qur&apos;an, the Sunnah and
                classical scholarship, and they make no claim that any food or remedy
                treats, prevents or cures a disease. Speak to a qualified doctor about
                any health condition, and do not stop prescribed treatment on the
                strength of anything you read here.
              </span>
            </span>
          </Disclaimer>
        </div>
      </Section>
    </>
  );
}

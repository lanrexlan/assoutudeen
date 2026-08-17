import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenText, GraduationCap, MessageCircle, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SealFrame, Medallion } from "@/components/ui/ornament";
import { BookScene } from "@/components/ui/illustration";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { BOOK } from "@/lib/book";
import { CONTACT, siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Shop",
  description: `${BOOK.title} — ${BOOK.pages} pages, around ${BOOK.remedies} remedies from the Qur'an and the Sunnah. Plus honey from the Assoutudeen Honey Enterprise.`,
};

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  `As-salaamu alaykum. I would like to order a copy of ${BOOK.title}.`,
)}`;

export default function ShopPage() {
  return (
    <>
      <PageHeader
        image="shop"
        eyebrow="Shop"
        title={BOOK.title}
        standfirst={`${BOOK.pitch} ${BOOK.pages} pages, first produced in ${BOOK.firstProduced}.`}
      />

      {/* --- The book ------------------------------------------------------ */}
      <Section tone="chalk" size="lg">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <figure className="reveal mx-auto w-full max-w-sm">
            <SealFrame className="aspect-3/4 w-full">
              <BookScene title={BOOK.title} />
            </SealFrame>

          </figure>

          <div>
            <Prose>
              <ProseHeading>What the book does</ProseHeading>
              <p>
                It takes around forty-five natural remedies named in the Qur&apos;an and
                the Sunnah and gives each one a chapter: the verse, the hadith with its
                full citation, Ibn al-Qayyim&apos;s commentary from{" "}
                <em>At-Tibb an-Nabawiyy</em>, the composition, the traditional uses and
                the cautions.
              </p>
              <p>
                It is written for people who want to know <em>where a claim comes
                from</em>. That is why every chapter is footnoted, and why the Arabic is
                reproduced rather than paraphrased.
              </p>

              <ProseHeading>Inside</ProseHeading>
              <ul>
                {BOOK.chapterStructure.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Prose>

            <div className="mt-8 rounded-lg border border-chalk-dark bg-white p-5">
              <p className="text-sm text-charcoal-muted">Price and formats</p>
              <p className="mt-2 leading-relaxed text-charcoal">
                Printed in Ede in limited runs, so the price moves with the print
                cost. Message us for the current price and what is in stock — and say
                if you want several copies for a masjid or a school.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild variant="donate" size="lg">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Order on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Bulk enquiry</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-charcoal-muted">
                Card checkout arrives with the payment work; until then orders are taken
                on WhatsApp, which is how most people already reach us.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* --- Contents preview ---------------------------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker="Contents"
          title={`Around ${BOOK.remedies} remedies`}
          standfirst="A sample of what the book covers. The full table of contents is being typeset for this page."
        />

        <ul className="reveal mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {BOOK.remedySample.map((remedy) => (
            <li
              key={remedy}
              className="rounded-full border border-white/15 bg-ink-raised px-4 py-2 text-sm text-chalk/85"
            >
              {remedy}
            </li>
          ))}
          <li className="rounded-full border border-apricot/40 bg-apricot/10 px-4 py-2 text-sm text-apricot">
            and more
          </li>
        </ul>
      </Section>

      {/* --- Everything else you can buy or join ---------------------------- */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="Also from Assoutudeen"
          title="Honey, classes, and a question you can just ask"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Sprout,
              title: "Pure honey",
              body: "Sold by the litre, retail and wholesale, by the foundation's trading arm.",
              href: `https://${siteConfig.honey.hostname}`,
              cta: "Visit the honey shop",
              external: true,
            },
            {
              icon: GraduationCap,
              title: "Classes",
              body: "Seven recurring programmes at the Dawah Institute, free and open to all.",
              href: `https://${siteConfig.dawah.hostname}`,
              cta: "See the schedule",
              external: true,
            },
            {
              icon: MessageCircle,
              title: "A question",
              body: "About the book, an order, or a bulk supply for a masjid or a school.",
              href: "/contact",
              cta: "Contact us",
              external: false,
            },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="seal" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              {item.external ? (
                <a
                  href={item.href}
                  className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-oxblood underline-offset-4 hover:underline"
                >
                  {item.cta}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-oxblood underline-offset-4 hover:underline"
                >
                  {item.cta}
                </Link>
              )}
            </Card>
          ))}
        </div>

        <p className="mt-12 flex items-center justify-center gap-3 text-sm text-charcoal-muted">
          <BookOpenText aria-hidden="true" className="size-4 text-apricot" />
          Written by {BOOK.author}.
        </p>
      </Section>
    </>
  );
}

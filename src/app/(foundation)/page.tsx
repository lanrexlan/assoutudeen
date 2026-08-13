import Link from "next/link";
import {
  BookOpenText,
  GraduationCap,
  HandHeart,
  HeartPulse,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Medallion } from "@/components/ui/ornament";
import { Section, SectionHeading } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { Hero } from "@/components/site/hero";
import { StructureDiagram } from "@/components/site/structure-diagram";
import { getSiteContext } from "@/lib/site-context";
import { REGISTRATION } from "@/lib/organisation";
import { THREE_YEAR_TOTAL_KOBO, YEAR_TOTALS } from "@/lib/impact";
import { formatKobo } from "@/payload/fields/money";

/**
 * The foundation homepage. Order follows docs/03: hero, proof, what we do,
 * the empowerment fund, the book, the family of organisations, and the
 * newsletter. Sections that need supplied content (recent articles,
 * testimonials) arrive with that content rather than as empty shells.
 */
export default async function FoundationHomePage() {
  const { href } = await getSiteContext("foundation");

  const work = [
    {
      icon: HeartPulse,
      title: "Prophetic medicine",
      body: "Around forty-five remedies from the Qur'an and the Sunnah, each traced to its evidence and its classical commentary.",
      href: "/prophetic-medicine",
    },
    {
      icon: HandHeart,
      title: "The empowerment fund",
      body: "A standing monthly circle that meets medical and financial need. Impact reported by category, never by name.",
      href: "/our-work",
    },
    {
      icon: GraduationCap,
      title: "Dawah education",
      body: "Seven recurring classes taught in Ede — Tafsir, Hadith, Tawheed, Fiqh and more. Free and open.",
      href: "/our-work",
    },
    {
      icon: BookOpenText,
      title: "The book",
      body: "Endless Blessings From The Creator — 175 pages, referenced chapter by chapter.",
      href: "/shop",
    },
  ];

  return (
    <>
      <Hero donateHref={href("/donate")} workHref={href("/prophetic-medicine")} />

      {/* --- Proof bar: real, published numbers only -------------------- */}
      <section className="relative border-b border-sand-dark bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-sand-dark sm:grid-cols-4 sm:divide-x">
            {[
              {
                value: formatKobo(THREE_YEAR_TOTAL_KOBO),
                label: "Raised and accounted for, 2023–2025",
              },
              { value: "11", label: "Beneficiaries in 2023 alone" },
              { value: "7", label: "Recurring classes each month" },
              {
                value: REGISTRATION.incorporatedOnDisplay.slice(-4),
                label: "Registered with the CAC",
              },
            ].map((stat) => (
              <div key={stat.label} className="reveal px-2 py-8 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl text-olive sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-charcoal-muted sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* --- What we do -------------------------------------------------- */}
      <Section tone="sand" size="lg" ornament>
        <SectionHeading
          kicker="What we do"
          title="Four kinds of work, one intention"
          standfirst="To seek healing in what Allah has provided, and to carry the weight for those who cannot carry it alone."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {work.map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="arch" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle className="mt-1">{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              <Link
                href={href(item.href)}
                className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-olive underline-offset-4 hover:underline"
              >
                Read more
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- Transparency ------------------------------------------------ */}
      <Section tone="ink" size="lg" ornament>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <SectionHeading
              align="start"
              tone="dark"
              kicker="Accountability"
              title="We publish the shortfalls too"
              standfirst="A kidney transplant appeal in December 2023 needed ₦22,000,000. We raised ₦3,035,000. It is on the record exactly like that, because the record is the point."
            />
            <p className="mt-6 max-w-xl leading-relaxed text-sand/80">
              Anyone who wants the foundation&apos;s bank statements for the past
              calendar year can ask, and we will send them. Our constitution binds
              every naira to the objects it was registered for, and the accounts are
              audited and filed with the Corporate Affairs Commission each year.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="donate" size="lg">
                <Link href={href("/about/accountability")}>See the accounts</Link>
              </Button>
              <Button asChild variant="ghostLight" size="lg">
                <Link href={href("/donate")}>Give with confidence</Link>
              </Button>
            </div>
          </div>

          <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {YEAR_TOTALS.map((year) => (
              <li
                key={year.year}
                className="flex items-baseline justify-between gap-4 rounded-lg border border-white/12 bg-ink-raised p-5"
              >
                <span className="font-display text-xl text-white">{year.year}</span>
                <span className="text-right">
                  <span className="block font-display text-2xl text-amber">
                    {formatKobo(year.raisedKobo)}
                  </span>
                  <span className="text-xs text-sand/60">
                    {year.beneficiaries
                      ? `${year.beneficiaries} beneficiaries`
                      : "report in preparation"}
                  </span>
                </span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 rounded-lg border border-amber/40 bg-amber/10 p-5">
              <span className="font-display text-xl text-white">Total</span>
              <span className="font-display text-2xl text-amber">
                {formatKobo(THREE_YEAR_TOTAL_KOBO)}
              </span>
            </li>
          </ul>
        </div>
      </Section>

      {/* --- The empowerment fund ---------------------------------------- */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="The empowerment fund"
          title="A standing circle, not a public appeal"
          standfirst="Public appeals have stopped. What replaced them is steadier: a monthly contribution circle that meets need as it arises, and reports what it did by category."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: HandHeart,
              title: "Join the fund",
              body: "A monthly pledge, by card or by transfer. Give what is steady rather than what is dramatic.",
              cta: "Join the fund",
              href: "/empowerment/join",
              primary: true,
            },
            {
              icon: ShieldCheck,
              title: "Request assistance",
              body: "One confidential form. Health information is treated as the sensitive data it is, and nobody is named without separate written consent.",
              cta: "Request assistance",
              href: "/empowerment/request",
            },
            {
              icon: ScrollText,
              title: "See where it went",
              body: "Annual reports by category — how many children back in school, how many treatments met, what was left over.",
              cta: "Read the reports",
              href: "/about/accountability",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} className="reveal">
              <Medallion tone={item.primary ? "gold" : "outline"}>
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              <Button
                asChild
                variant={item.primary ? "primary" : "secondary"}
                className="mt-auto self-start"
              >
                <Link href={href(item.href)}>{item.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- Scripture --------------------------------------------------- */}
      <Section tone="sand" size="lg" ornament>
        <div className="mx-auto max-w-3xl text-center">
          <ArabicQuote
            className="reveal text-start"
            arabic="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
            translation="In the name of Allah, the Most Gracious, the Most Merciful."
            source="Qur'an, Al-Fātiḥah 1:1"
          />
          <p className="mt-5 text-sm text-charcoal-muted">
            The verse this section will carry —{" "}
            <Todo>At-Tawbah 9:105 in Arabic, copied verbatim from the source</Todo> —
            is left blank rather than retyped from memory. A mangled āyah costs more
            than an empty space.
          </p>
        </div>
      </Section>

      {/* --- Our family -------------------------------------------------- */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="Our family"
          title="One foundation, two arms"
          standfirst="The charity is the parent. The Dawah Institute teaches; the Honey Enterprise trades. Their books are kept apart, and the foundation answers for both."
        />
        <div className="reveal mt-12">
          <StructureDiagram />
        </div>
      </Section>

    </>
  );
}

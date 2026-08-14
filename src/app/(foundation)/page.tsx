import type { Metadata } from "next";
import Link from "next/link";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { CONTACT, FOUNDATION_NAME, siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";
import { THREE_YEAR_TOTAL_KOBO } from "@/lib/impact";

export const metadata: Metadata = {
  title: {
    default: siteConfig.foundation.name,
    template: `%s · ${siteConfig.foundation.shortName}`,
  },
  description:
    "An Islamic charity in Ede, Osun State, Nigeria. Empowerment fund, dawah and prophetic medicine — with published accounts that reconcile to the naira.",
};

/**
 * Homepage, following docs/03: hero, proof, what we do, the empowerment
 * programme, the book, the family of three sites, newsletter.
 *
 * Every figure is verified (CLAUDE.md, docs/11, src/lib/impact.ts). Nothing is
 * invented; anything not yet confirmed is a visible [TODO: …] marker.
 */
export default async function FoundationHomePage() {
  const { href } = await getSiteContext("foundation");

  const stats = [
    {
      value: formatNaira(THREE_YEAR_TOTAL_KOBO),
      label: "raised across 2023–2025, reported to the naira",
    },
    { value: "11", label: "beneficiaries supported in the 2023 report alone" },
    { value: "175", label: "pages of prophetic remedies in the book" },
    { value: "7", label: "weekly and monthly programmes at the Dawah Institute" },
  ];

  const pillars = [
    {
      title: "Monthly Empowerment Fund",
      body: "A standing contribution circle — any amount, every month. Orphan care, widow empowerment, medical relief and crisis support, reported openly by category.",
      href: href("/empowerment"),
      cta: "Read about the fund",
    },
    {
      title: "Dawah Institute",
      body: "Seven recurring classes in Ede — Tafsir, Hadith, Tawheed, Prophetic Medicine, the monthly Fiqh seminar, the empowerment lecture and Fataawah night.",
      href: href("/dawah"),
      cta: "Visit the institute",
    },
    {
      title: "Prophetic Medicine",
      body: "Endless Blessings From The Creator gathers roughly 45 remedies from the Qur'an and Sunnah into one 175-page reference.",
      href: href("/prophetic-medicine"),
      cta: "Explore the remedies",
    },
    {
      title: "Pure Honey",
      body: "Our own honey enterprise — pure honey, sold by the litre, retail and wholesale across Nigeria.",
      href: href("/honey"),
      cta: "Visit the honey farm",
    },
  ];

  return (
    <>
      {/* 1 — Hero */}
      <Section tone="primary">
        <p className="text-sm uppercase tracking-widest text-white/80">
          {siteConfig.foundation.shortName} · Ede, Osun State, Nigeria
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
          Healing by the Sunnah. Empowering the Ummah.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          {FOUNDATION_NAME} runs a monthly empowerment fund, teaches the deen,
          and publishes on prophetic medicine — with accounts that reconcile to
          the naira.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="donate" size="lg">
            <Link href={href("/donate")}>Donate</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="border-transparent">
            <Link href={href("/empowerment/join")}>Join the fund</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white">
            <Link href={href("/our-work")}>Our work</Link>
          </Button>
        </div>
      </Section>

      {/* 2 — Proof, in numbers */}
      <Section tone="white">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl text-olive">{stat.value}</dd>
              <dd className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <ArabicQuote
          arabic="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
          translation="In the name of Allah, the Most Gracious, the Most Merciful."
          source="Qur'an, Al-Fātiḥah 1:1"
        />
      </Section>

      {/* 3 — What we do */}
      <Section tone="white">
        <h2 className="font-display text-2xl sm:text-3xl">What we do</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="justify-between">
              <div>
                <CardTitle>{pillar.title}</CardTitle>
                <CardDescription className="mt-2">{pillar.body}</CardDescription>
              </div>
              <Button asChild variant="link" className="self-start px-0">
                <Link href={pillar.href}>{pillar.cta} →</Link>
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4 — The empowerment programme */}
      <Section tone="primary">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-white/80">
                Our flagship
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                The Monthly Empowerment Fund
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/90">
                Not one-off appeals — a standing circle. Each member gives any
                amount they find convenient, every month, and the fund supports
                orphans, widows, medical emergencies and crisis relief.
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/90">
                Impact is reported openly, by category, never by name.{" "}
                {formatNaira(THREE_YEAR_TOTAL_KOBO)} was raised and accounted
                for between 2023 and 2025.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="secondary" size="lg" className="border-transparent">
                  <Link href={href("/empowerment/join")}>Join the fund</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white">
                  <Link href={href("/empowerment/request")}>Request assistance</Link>
                </Button>
              </div>
            </div>

            <Card className="bg-white/5 border-white/15 text-white shadow-none">
              <CardTitle className="text-white">How it works</CardTitle>
              <ul className="mt-2 list-none space-y-3 text-sm leading-relaxed text-white/90">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="font-display text-amber text-lg leading-6">1</span>
                  <span>Choose any monthly amount — no minimum, no pressure to overburden yourself.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="font-display text-amber text-lg leading-6">2</span>
                  <span>Pay by card auto-debit or a simple manual transfer each month — both supported.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="font-display text-amber text-lg leading-6">3</span>
                  <span>Contributors are kept informed of every disbursement; reports reconcile to the naira.</span>
                </li>
              </ul>
              <Button asChild variant="link" className="mt-2 self-start px-0 text-white">
                <Link href={href("/empowerment/how-it-works")}>How it works in detail →</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 5 — The book */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
          <div className="rounded-lg border border-sand-dark bg-white p-6 shadow-sm shadow-sand-dark/25 sm:p-8">
            <p className="text-sm uppercase tracking-widest text-charcoal-muted">
              The book
            </p>
            <h2 className="mt-2 font-display text-2xl leading-snug sm:text-3xl">
              Endless Blessings From The Creator
            </h2>
            <p className="mt-3 text-sm text-charcoal-muted">
              By Imam Engr. Abd&apos;Waasi Tirmidhi A. (Abu Mubaashir) · 175 pages ·
              ~45 prophetic remedies
            </p>
            <p className="mt-3 text-base leading-relaxed text-charcoal">
              A practical reference to the remedies of the Qur&apos;an and Sunnah —
              honey, black seed, dates, olive and more — with the original
              guidance for each one.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href={href("/prophetic-medicine")}>Explore the remedies</Link>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl sm:text-3xl">
              Prophetic medicine, from the sources
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              Ten to fifteen remedies will be free to read online; the rest are
              behind a simple unlock. Every page quotes the Qur&apos;an and Sunnah
              verbatim — the Arabic kept exactly as it appears in the sources.
            </p>
            <Disclaimer className="mt-6" />
          </div>
        </div>
      </Section>

      {/* 6 — Our family */}
      <Section tone="white">
        <h2 className="font-display text-2xl sm:text-3xl">One foundation, three doors</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-muted">
          The foundation is the parent. The Dawah Institute is its education arm
          and the Honey Enterprise its commercial arm — both visibly part of the
          same organisation.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="justify-between">
            <div>
              <CardTitle>APMF</CardTitle>
              <CardDescription className="mt-2">
                The parent charity: the empowerment fund, publications and
                community support.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/")}>Foundation home →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Assoutudeen Dawah Institute</CardTitle>
              <CardDescription className="mt-2">
                Seven recurring classes taught by Imam Abd&apos;Waasi Tirmidhi and
                guest scholars.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/dawah")}>Visit ADI →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Assoutudeen Honey Enterprise</CardTitle>
              <CardDescription className="mt-2">
                Pure honey from our own farm, sold retail and wholesale.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/honey")}>Visit AHE →</Link>
            </Button>
          </Card>
        </div>
      </Section>

      {/* 7 — Newsletter */}
      <Section tone="primary">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl">Stay in touch</h2>
            <p className="mt-2 text-white/90">
              Occasional email about the empowerment fund, new classes, and new
              writing on prophetic medicine. Or message us on WhatsApp —{" "}
              <a
                href={`https://wa.me/${CONTACT.phoneE164}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:no-underline"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <div className="mt-6">
              <NewsletterForm source="homepage" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/** Naira without trailing zeros: ₦14,644,520 not ₦14,644,520.00. */
function formatNaira(kobo: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(kobo / 100);
}

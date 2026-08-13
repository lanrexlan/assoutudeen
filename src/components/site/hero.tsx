import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  ArchFrame,
  GiltRule,
  Kicker,
  OrnamentField,
  Starfield,
} from "@/components/ui/ornament";
import { BrandMark } from "@/components/site/brand-mark";
import { Todo } from "@/components/ui/todo";
import { REGISTRATION } from "@/lib/organisation";

/**
 * The foundation's hero.
 *
 * The composition borrows the depth and gold hairlines of a dark Islamic
 * reference design, and the arch-framed focal image of a lighter one — but it
 * uses the *geometry* rather than the costume: no mosque silhouette, no tiled
 * arabesque, no gold gradient text, all of which docs/05 rules out.
 *
 * The arch on the right currently frames a placeholder, because the hero
 * photograph docs/03 asks for (the founder teaching, or a distribution in
 * progress) has not been supplied. It is built to take a `next/image` the
 * moment one arrives.
 */
export function Hero({ donateHref, workHref }: { donateHref: string; workHref: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-sand">
      <OrnamentField tone="gold" />
      <Starfield />
      {/* Light spilling from the top of the arch. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[46rem] -translate-x-1/2 rounded-b-full bg-[radial-gradient(ellipse_at_top,rgba(217,164,65,0.18),transparent_65%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Kicker>Ede, Osun State · since {REGISTRATION.incorporatedOnDisplay.slice(-4)}</Kicker>

            <h1 className="mt-5 font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Healing by the Sunnah.
              <span className="block text-amber">Empowering the ummah.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand/85">
              A registered Islamic charity in Ede. We publish the remedies of the
              Qur&apos;an and the Sunnah with their evidence attached, we fund
              treatment for Muslims in difficulty, and we account for every naira
              in public.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="donate" size="lg">
                <Link href={donateHref}>Donate</Link>
              </Button>
              <Button asChild variant="ghostLight" size="lg">
                <Link href={workHref}>Explore prophetic medicine</Link>
              </Button>
            </div>

            {/* Proof, immediately under the fold-line: registration, not a slogan. */}
            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-sand/55">Registered charity</dt>
                <dd className="mt-0.5 font-medium text-white">{REGISTRATION.number}</dd>
              </div>
              <div>
                <dt className="text-sand/55">Incorporated</dt>
                <dd className="mt-0.5 font-medium text-white">
                  {REGISTRATION.incorporatedOnDisplay}
                </dd>
              </div>
              <div>
                <dt className="text-sand/55">Accounts</dt>
                <dd className="mt-0.5 font-medium text-white">Published every year</dd>
              </div>
            </dl>
          </div>

          {/* Focal arch */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <ArchFrame className="aspect-3/4 w-full shadow-elevated">
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 bg-[linear-gradient(180deg,#0f2f29_0%,#08201c_100%)] p-8 text-center">
                <OrnamentField tone="gold" className="opacity-70" />
                <Starfield />
                <BrandMark className="relative size-20 text-amber" title="Assoutudeen" />
                <p
                  dir="rtl"
                  lang="ar"
                  className="relative font-arabic text-3xl leading-[2] text-sand"
                >
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <GiltRule className="relative w-full" />
                <p className="relative text-sm text-sand/70">
                  <Todo className="border-amber/50 bg-amber/15 text-sand">
                    hero photograph — the founder teaching, or a distribution in
                    progress
                  </Todo>
                </p>
              </div>
            </ArchFrame>

            {/* Gold hairline echo behind the arch. */}
            <div
              aria-hidden="true"
              className="arch pointer-events-none absolute -inset-4 -z-10 border border-amber/20"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

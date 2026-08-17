import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SealFrame, Kicker, OrnamentField, Starfield } from "@/components/ui/ornament";
import { ApiaryScene } from "@/components/ui/illustration";
import { REGISTRATION } from "@/lib/organisation";

/**
 * The foundation's hero.
 *
 * The composition borrows the depth and accent hairlines of a dark Islamic
 * reference design, and the seal-framed focal image of a lighter one — but it
 * uses the *geometry* rather than the costume: no mosque silhouette, no tiled
 * arabesque, no accent gradient text, all of which docs/05 rules out.
 *
 * The seal frames the drawn apiary rather than a photograph. The homepage
 * photograph is the page's backdrop instead — see PageBackdrop — because a
 * picture inside the seal competes with the headline beside it, while the same
 * picture behind the whole page supports it.
 */
export function Hero({ donateHref, workHref }: { donateHref: string; workHref: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-chalk">
      <OrnamentField tone="accent" />
      <Starfield />
      {/* Light spilling from the top of the seal. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[46rem] -translate-x-1/2 rounded-b-full bg-[radial-gradient(ellipse_at_top,rgba(224,160,106,0.18),transparent_65%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Kicker tone="dark">Ede, Osun State · since {REGISTRATION.incorporatedOnDisplay.slice(-4)}</Kicker>

            <h1 className="mt-5 font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Healing by the Sunnah.
              <span className="block text-apricot">Empowering the ummah.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-chalk/85">
              A registered Islamic charity, based in Ede and working for Muslims
              wherever they are. We publish the remedies of the Qur&apos;an and the
              Sunnah with their evidence attached, we fund treatment for Muslims in
              difficulty, and we account for every naira in public.
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
                <dt className="text-chalk/55">Registered charity</dt>
                <dd className="mt-0.5 font-medium text-white">{REGISTRATION.number}</dd>
              </div>
              <div>
                <dt className="text-chalk/55">Incorporated</dt>
                <dd className="mt-0.5 font-medium text-white">
                  {REGISTRATION.incorporatedOnDisplay}
                </dd>
              </div>
              <div>
                <dt className="text-chalk/55">Accounts</dt>
                <dd className="mt-0.5 font-medium text-white">Published every year</dd>
              </div>
            </dl>
          </div>

          {/* Focal seal */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <SealFrame className="aspect-3/4 w-full shadow-elevated">
              <ApiaryScene title="Hives on a hillside at dusk" />
            </SealFrame>

            {/* Accent hairline echo behind the seal. */}
            <div
              aria-hidden="true"
              className="seal pointer-events-none absolute -inset-4 -z-10 border border-apricot/20"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

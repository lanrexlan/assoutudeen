import { foundationUrl } from "@/components/site/foundation-link";
import { FOUNDATION_NAME, siteConfig } from "@/lib/sites";

/**
 * APMF at the top, the two subsidiaries beneath it.
 *
 * Built from HTML and CSS rather than an image so it stays legible at any
 * width, works with a screen reader, and costs nothing to download. The
 * hierarchy is carried by structure (a nested list), not just by lines: the
 * parent is one card, the subsidiaries are children of it.
 */
export function StructureDiagram() {
  const dawahUrl = `https://${siteConfig.dawah.hostname}`;
  const honeyUrl = `https://${siteConfig.honey.hostname}`;

  return (
    <div className="rounded-lg border border-sand-dark bg-white p-4 sm:p-6">
      <ul className="list-none">
        {/* Parent */}
        <li>
          <div className="rounded-lg bg-olive p-5 text-white">
            <p className="text-xs uppercase tracking-widest text-white/75">
              Parent charity
            </p>
            <p className="mt-1 font-display text-xl sm:text-2xl">{FOUNDATION_NAME}</p>
            <p className="mt-2 text-sm text-white/90">
              The registered charity. It holds the donations, runs the empowerment
              fund, and owns both of the bodies below.
            </p>
            <p className="mt-3 text-sm">
              <a href={foundationUrl} className="underline underline-offset-4">
                assoutudeen.com
              </a>
            </p>
          </div>

          {/* Connector — decorative, hidden from screen readers, which get the
              nesting instead. */}
          <div aria-hidden="true" className="flex justify-center">
            <div className="h-6 w-px bg-olive/40" />
          </div>

          {/* Subsidiaries */}
          <ul className="grid list-none gap-4 sm:grid-cols-2">
            <li className="rounded-lg border-t-4 border-teal bg-sand p-5">
              <p className="text-xs uppercase tracking-widest text-charcoal-muted">
                Subsidiary · education
              </p>
              <p className="mt-1 font-display text-lg">{siteConfig.dawah.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">
                The teaching arm. Classes every Friday to Sunday evening — Tafsir,
                Hadith, Prophetic Medicine, Fiqh, Virtues of the Companions and
                Qur&apos;an and Modern Science — plus a monthly Fiqh seminar and a
                quarterly empowerment session. It does not hold donations of its own.
              </p>
              <p className="mt-3 text-sm">
                <a href={dawahUrl} className="text-teal underline underline-offset-4">
                  {siteConfig.dawah.hostname}
                </a>
              </p>
            </li>

            <li className="rounded-lg border-t-4 border-amber bg-sand p-5">
              <p className="text-xs uppercase tracking-widest text-charcoal-muted">
                Subsidiary · commercial
              </p>
              <p className="mt-1 font-display text-lg">{siteConfig.honey.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">
                The trading arm, selling honey by the litre, retail and wholesale. It is
                a business, not a charity, and its accounts are kept separate from the
                foundation&apos;s.
              </p>
              <p className="mt-3 text-sm">
                <a
                  href={honeyUrl}
                  className="text-amber-dark underline underline-offset-4"
                >
                  {siteConfig.honey.hostname}
                </a>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

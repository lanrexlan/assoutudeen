import { GraduationCap, Landmark, Sprout } from "lucide-react";
import { foundationUrl } from "@/components/site/foundation-link";
import { Medallion } from "@/components/ui/ornament";
import { FOUNDATION_NAME, siteConfig } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";

/**
 * APMF at the top, the two subsidiaries beneath it.
 *
 * Built from HTML and CSS rather than an image so it stays legible at any
 * width, works with a screen reader, and costs nothing to download. The
 * hierarchy is carried by structure — a nested list — as well as by the
 * connecting rules, so it survives with styles off.
 */
export function StructureDiagram() {
  const dawahUrl = `https://${siteConfig.dawah.hostname}`;
  const honeyUrl = `https://${siteConfig.honey.hostname}`;

  const arms = [
    {
      icon: GraduationCap,
      kicker: "Subsidiary · education",
      name: siteConfig.dawah.name,
      href: dawahUrl,
      host: siteConfig.dawah.hostname,
      accent: "border-t-teal",
      link: "text-teal",
      body: "The teaching arm. Seven recurring classes — Tafsir, Hadith, Tawheed, Prophetic Medicine, the monthly Fiqh seminar, the empowerment lecture and Fataawah night. It is not separately incorporated and holds no funds of its own.",
    },
    {
      icon: Sprout,
      kicker: "Subsidiary · commercial",
      name: siteConfig.honey.name,
      href: honeyUrl,
      host: siteConfig.honey.hostname,
      accent: "border-t-amber",
      link: "text-amber-dark",
      body: "The trading arm, selling pure honey by the litre to retail and wholesale customers. It is a business rather than a charity, and its books are kept separate from the foundation's.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <ul className="list-none">
        <li>
          {/* Parent */}
          <div className="relative overflow-hidden rounded-xl bg-olive p-6 text-white shadow-elevated sm:p-8">
            <div className="flex flex-wrap items-start gap-5">
              <Medallion>
                <Landmark aria-hidden="true" className="size-6" />
              </Medallion>
              <div className="min-w-56 flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-amber">
                  Parent charity
                </p>
                <p className="mt-1 font-display text-xl leading-tight sm:text-2xl">
                  {FOUNDATION_NAME}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
                  The registered charity. It receives the donations, runs the
                  empowerment fund, publishes the accounts, and answers for everything
                  done in the Assoutudeen name.
                </p>
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <a
                    href={foundationUrl}
                    className="inline-flex min-h-11 items-center underline decoration-amber decoration-2 underline-offset-4"
                  >
                    assoutudeen.com
                  </a>
                  <span className="text-white/60">{REGISTRATION.number}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Connector — decorative; screen readers get the nesting instead. */}
          <div aria-hidden="true" className="relative h-10">
            <span className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-sand-deep" />
            <span className="absolute left-1/2 top-1/2 hidden h-px w-1/2 max-w-md -translate-x-1/2 bg-sand-deep sm:block" />
            <span className="absolute left-1/4 top-1/2 hidden h-1/2 w-px bg-sand-deep sm:block" />
            <span className="absolute left-3/4 top-1/2 hidden h-1/2 w-px bg-sand-deep sm:block" />
          </div>

          {/* Subsidiaries */}
          <ul className="grid list-none gap-5 sm:grid-cols-2">
            {arms.map(({ icon: Icon, ...arm }) => (
              <li
                key={arm.name}
                className={`lift rounded-xl border border-sand-dark border-t-4 bg-white p-6 shadow-sm ${arm.accent}`}
              >
                <div className="flex items-center gap-3">
                  <Medallion tone="outline" className="size-11">
                    <Icon aria-hidden="true" className="size-5" />
                  </Medallion>
                  <p className="text-xs uppercase tracking-[0.15em] text-charcoal-muted">
                    {arm.kicker}
                  </p>
                </div>
                <p className="mt-4 font-display text-lg">{arm.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                  {arm.body}
                </p>
                <p className="mt-4 text-sm">
                  <a
                    href={arm.href}
                    className={`${arm.link} inline-flex min-h-11 items-center font-medium underline decoration-2 underline-offset-4`}
                  >
                    {arm.host}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

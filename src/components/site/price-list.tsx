import { Truck } from "lucide-react";
import {
  HONEY_PRICES,
  TIER_LABELS,
  TRANSPORT_NOTE,
  formatLitres,
  perLitreKobo,
  pricesForTier,
  type PriceTier,
} from "@/lib/honey-prices";
import { formatNaira } from "@/payload/fields/money";
import { cn } from "@/lib/utils";

/**
 * The published price list.
 *
 * A price list is the single thing a shop page cannot do without: a visitor who
 * has to ask what honey costs mostly does not ask. The per-litre column is
 * shown alongside because it is the argument for buying more — ₦10,000 for one
 * litre against ₦8,000 a litre from ten up is a case the table makes on its
 * own, without a word of sales copy.
 *
 * The transport caveat is part of the component rather than something each page
 * remembers to add, so a price can never appear anywhere without it.
 */

const TIER_ORDER: PriceTier[] = ["retail", "wholesale", "distributor"];

function Row({ litres, kobo }: { litres: number; kobo: number }) {
  const unit = perLitreKobo({ litres, kobo, tier: "retail" });

  return (
    <tr className="border-b border-chalk-dark last:border-0">
      <th
        scope="row"
        className="py-3 pe-4 text-start font-display text-lg font-normal text-charcoal"
      >
        {formatLitres(litres)}
      </th>
      <td className="py-3 pe-4 text-end font-semibold tabular-nums text-charcoal">
        {formatNaira(kobo)}
      </td>
      <td className="py-3 text-end text-sm tabular-nums text-charcoal-muted">
        {formatNaira(unit)}
        <span className="text-charcoal-faint">/L</span>
      </td>
    </tr>
  );
}

export function PriceList({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-8", className)}>
      {TIER_ORDER.map((tier) => {
        const { title, blurb } = TIER_LABELS[tier];
        return (
          <div key={tier} className="reveal">
            <h3 className="font-display text-xl text-charcoal">{title}</h3>
            <p className="mt-1 max-w-prose text-sm leading-relaxed text-charcoal-muted">
              {blurb}
            </p>

            {/* Narrow phones: the table scrolls rather than the page. */}
            <div className="mt-4 overflow-x-auto rounded-lg border border-chalk-dark bg-white px-5">
              <table className="w-full min-w-80 border-collapse text-start">
                <caption className="sr-only">
                  {title} — honey prices by volume, excluding transport
                </caption>
                <thead>
                  <tr className="border-b border-chalk-dark">
                    <th
                      scope="col"
                      className="py-3 pe-4 text-start text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-muted"
                    >
                      Volume
                    </th>
                    <th
                      scope="col"
                      className="py-3 pe-4 text-end text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-muted"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-end text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-muted"
                    >
                      Per litre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricesForTier(tier).map((price) => (
                    <Row key={price.litres} litres={price.litres} kobo={price.kobo} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <p className="flex max-w-prose gap-3 rounded-lg border border-apricot-dark bg-apricot/15 p-4 text-sm leading-relaxed text-charcoal">
        <Truck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        <span>{TRANSPORT_NOTE}</span>
      </p>
    </div>
  );
}

/** The three headline sizes, for pages that want a taste rather than the table. */
export function PriceHighlights({ className }: { className?: string }) {
  const headline = HONEY_PRICES.filter((price) =>
    [1, 5, 25].includes(price.litres),
  );

  /* Rows on a phone, cards from the small breakpoint up. Stacked cards spent
     most of a 390px screen on three numbers; side by side they read at a
     glance, but there is no width for that until the layout turns. */
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-3 sm:gap-4", className)}>
      {headline.map((price) => (
        <li
          key={price.litres}
          className="reveal flex items-baseline justify-between gap-4 rounded-lg border border-chalk-dark bg-white px-5 py-4 sm:block sm:py-5 sm:text-center"
        >
          <p className="font-display text-lg text-charcoal">
            {formatLitres(price.litres)}
          </p>
          <p className="text-end sm:mt-2 sm:text-center">
            {/* apricot-dark, not the honey site's plain apricot --site-primary:
                #E0A06A on white is about 2:1, which fails even the large-text
                rule (CLAUDE.md). A price is the one number on the page that
                everyone has to be able to read. */}
            <span className="block font-display text-xl font-semibold tabular-nums text-apricot-dark sm:text-2xl">
              {formatNaira(price.kobo)}
            </span>
            <span className="block text-xs tabular-nums text-charcoal-muted sm:mt-1 sm:text-sm">
              {formatNaira(perLitreKobo(price))} a litre
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

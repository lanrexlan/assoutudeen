/**
 * The Assoutudeen Honey Enterprise price list, in kobo.
 *
 * Supplied by the Enterprise. Every figure here is theirs — do not interpolate
 * a volume that is not on the list, and do not "tidy" a price: the 2.5 litre
 * and 5 litre rates are deliberately not on the same per-litre curve as the
 * rest, and inventing a smooth one would quote people the wrong number.
 *
 * Kobo as integers, per CLAUDE.md. Naira floats round a naira away somewhere
 * and nobody notices until a customer does.
 *
 * Prices EXCLUDE transport, which depends on distance from Ede and is quoted
 * with the order. That caveat travels with the table everywhere it is shown —
 * see TRANSPORT_NOTE.
 */

export type PriceTier = "retail" | "wholesale" | "distributor";

export type HoneyPrice = {
  /** Litres. A number, so the per-litre rate can be derived rather than typed. */
  litres: number;
  /** Price in kobo. Integer. */
  kobo: number;
  tier: PriceTier;
};

const naira = (amount: number): number => amount * 100;

export const HONEY_PRICES: HoneyPrice[] = [
  { litres: 1, kobo: naira(10_000), tier: "retail" },
  { litres: 2.5, kobo: naira(23_000), tier: "retail" },
  { litres: 5, kobo: naira(40_000), tier: "retail" },
  { litres: 10, kobo: naira(80_000), tier: "wholesale" },
  { litres: 20, kobo: naira(160_000), tier: "wholesale" },
  { litres: 25, kobo: naira(200_000), tier: "wholesale" },
  { litres: 50, kobo: naira(400_000), tier: "wholesale" },
  { litres: 100, kobo: naira(800_000), tier: "distributor" },
  { litres: 200, kobo: naira(1_600_000), tier: "distributor" },
  { litres: 300, kobo: naira(2_400_000), tier: "distributor" },
  { litres: 500, kobo: naira(4_000_000), tier: "distributor" },
  { litres: 1000, kobo: naira(8_000_000), tier: "distributor" },
];

/** Kobo per litre at a given size — the figure that shows bulk is worth it. */
export const perLitreKobo = (price: HoneyPrice): number =>
  Math.round(price.kobo / price.litres);

export const pricesForTier = (tier: PriceTier): HoneyPrice[] =>
  HONEY_PRICES.filter((price) => price.tier === tier);

/** "1 litre", "2.5 litres" — the fractional size must not read as "2.5 litre". */
export const formatLitres = (litres: number): string =>
  `${litres === 1 ? "1 litre" : `${litres} litres`}`;

export const TIER_LABELS: Record<PriceTier, { title: string; blurb: string }> = {
  retail: {
    title: "For the kitchen",
    blurb:
      "The sizes most households order. Five litres is also the smallest order that counts towards an ambassador's code.",
  },
  wholesale: {
    title: "For shops and resale",
    blurb:
      "From ten litres the rate settles at ₦8,000 a litre and stays there, however much you take.",
  },
  distributor: {
    title: "For distributors",
    blurb:
      "Drum quantities, same rate. Tell us how much you move and how often, and we will plan the run with you.",
  },
};

/** The two caveats the Enterprise attaches to every quote. */
export const TRANSPORT_NOTE =
  "All prices exclude transport. The fare depends on how far you are from Ede, and it is paid together with the order unless we agree otherwise.";

/** The volume at which the per-litre rate stops falling. */
export const BEST_RATE_FROM_LITRES = 10;

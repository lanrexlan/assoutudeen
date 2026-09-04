import { describe, expect, it } from "vitest";
import {
  BEST_RATE_FROM_LITRES,
  HONEY_PRICES,
  formatLitres,
  perLitreKobo,
  pricesForTier,
} from "@/lib/honey-prices";
import { formatNaira } from "@/payload/fields/money";

/**
 * These are the prices customers are quoted. A transcription slip here bills a
 * real person the wrong amount, so the list is checked against the figures the
 * Enterprise supplied rather than trusted to have been typed correctly.
 */

/** The price list exactly as it was given to us, in whole naira. */
const SUPPLIED: [litres: number, naira: number][] = [
  [1, 10_000],
  [2.5, 23_000],
  [5, 40_000],
  [10, 80_000],
  [20, 160_000],
  [25, 200_000],
  [50, 400_000],
  [100, 800_000],
  [200, 1_600_000],
  [300, 2_400_000],
  [500, 4_000_000],
  [1000, 8_000_000],
];

describe("honey prices", () => {
  it("matches the supplied list, to the naira", () => {
    expect(HONEY_PRICES).toHaveLength(SUPPLIED.length);

    for (const [litres, naira] of SUPPLIED) {
      const price = HONEY_PRICES.find((p) => p.litres === litres);
      expect(price, `no price for ${litres} litres`).toBeDefined();
      expect(price!.kobo).toBe(naira * 100);
    }
  });

  it("holds every price as an integer number of kobo", () => {
    for (const price of HONEY_PRICES) {
      expect(Number.isInteger(price.kobo)).toBe(true);
    }
  });

  it("never charges more per litre for buying more", () => {
    // The curve may flatten, but it must never turn upwards: a customer who
    // orders more must never pay a higher rate than one who orders less.
    const sorted = [...HONEY_PRICES].sort((a, b) => a.litres - b.litres);
    for (let i = 1; i < sorted.length; i += 1) {
      expect(perLitreKobo(sorted[i])).toBeLessThanOrEqual(
        perLitreKobo(sorted[i - 1]),
      );
    }
  });

  it("settles at a flat rate from the bulk threshold up", () => {
    const bulk = HONEY_PRICES.filter((p) => p.litres >= BEST_RATE_FROM_LITRES);
    const rates = new Set(bulk.map(perLitreKobo));

    expect(bulk.length).toBeGreaterThan(1);
    expect(rates.size).toBe(1);
    expect(formatNaira([...rates][0])).toBe("₦8,000");
  });

  it("sorts every price into exactly one tier", () => {
    const tiered = [
      ...pricesForTier("retail"),
      ...pricesForTier("wholesale"),
      ...pricesForTier("distributor"),
    ];
    expect(tiered).toHaveLength(HONEY_PRICES.length);
  });

  it("does not write a fractional volume as a singular litre", () => {
    expect(formatLitres(1)).toBe("1 litre");
    expect(formatLitres(2.5)).toBe("2.5 litres");
    expect(formatLitres(1000)).toBe("1000 litres");
  });
});

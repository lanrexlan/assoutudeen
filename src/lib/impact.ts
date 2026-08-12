/**
 * Verified fundraising totals, in kobo.
 *
 * These are the published figures from APMF's own annual reports (CLAUDE.md,
 * docs/01, docs/09). The three-year total is ₦14,644,520 and the year figures
 * add up to it exactly — a test asserts this, because the reconciliation is the
 * whole point of publishing them.
 *
 * Do not add a year here until there is a report to back it.
 */

export type YearTotal = {
  year: number;
  raisedKobo: number;
  /** Beneficiary count, where the report states one. */
  beneficiaries?: number;
  /** True once a full report page exists for the year. */
  reportPublished: boolean;
};

export const YEAR_TOTALS: YearTotal[] = [
  { year: 2023, raisedKobo: 532_350_000, beneficiaries: 11, reportPublished: true },
  { year: 2024, raisedKobo: 383_850_000, reportPublished: false },
  { year: 2025, raisedKobo: 548_252_000, reportPublished: false },
];

export const THREE_YEAR_TOTAL_KOBO = 1_464_452_000;

/** 2025 overheads, published rather than buried (CLAUDE.md). */
export const OVERHEADS_2025 = {
  operationalKobo: 41_082_000,
  gadgetsKobo: 27_500_000,
} as const;

export const totalOf = (years: YearTotal[]): number =>
  years.reduce((sum, year) => sum + year.raisedKobo, 0);

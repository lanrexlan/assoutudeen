/**
 * Verified fundraising totals, in kobo.
 *
 * These are the published figures from APMF's own annual reports. The headline
 * total is derived by adding them up rather than written down separately —
 * a hand-typed total is a figure that can silently disagree with its own
 * breakdown, which is exactly the failure a transparency page cannot afford.
 * A test asserts the reconciliation.
 *
 * Do not add a year here until there is a report to back it.
 */

export type YearTotal = {
  year: number;
  raisedKobo: number;
  /** True where a full report page exists at /impact/<year>. */
  hasReportPage: boolean;
};

export const YEAR_TOTALS: YearTotal[] = [
  { year: 2019, raisedKobo: 56_091_828, hasReportPage: false },
  { year: 2020, raisedKobo: 164_075_503, hasReportPage: false },
  { year: 2021, raisedKobo: 217_640_098, hasReportPage: false },
  { year: 2022, raisedKobo: 261_284_500, hasReportPage: false },
  { year: 2023, raisedKobo: 532_350_000, hasReportPage: true },
  { year: 2024, raisedKobo: 383_850_000, hasReportPage: true },
  { year: 2025, raisedKobo: 548_252_000, hasReportPage: true },
];

export const totalOf = (years: YearTotal[]): number =>
  years.reduce((sum, year) => sum + year.raisedKobo, 0);

/** Every year on record, added up. Never type this figure by hand. */
export const VERIFIED_TOTAL_KOBO = totalOf(YEAR_TOTALS);

export const FIRST_YEAR = YEAR_TOTALS[0].year;
export const LAST_YEAR = YEAR_TOTALS[YEAR_TOTALS.length - 1].year;
export const YEARS_COVERED = YEAR_TOTALS.length;

/** "2019 and 2025", for the sentence that follows the total. */
export const YEAR_RANGE = `${FIRST_YEAR} and ${LAST_YEAR}`;

/** 2025 overheads, published rather than buried (CLAUDE.md). */
export const OVERHEADS_2025 = {
  operationalKobo: 41_082_000,
  gadgetsKobo: 27_500_000,
} as const;

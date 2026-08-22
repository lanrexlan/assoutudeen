import { describe, expect, it } from "vitest";
import {
  VERIFIED_TOTAL_KOBO,
  YEAR_TOTALS,
  YEAR_RANGE,
  totalOf,
} from "@/lib/impact";
import { formatKobo } from "@/payload/fields/money";

/**
 * The published total and its breakdown must agree exactly. Everything else on
 * the accountability pages rests on that: a charity whose own figures do not
 * add up has nothing left to stand on.
 */

describe("impact figures", () => {
  it("reconciles to the naira", () => {
    expect(VERIFIED_TOTAL_KOBO).toBe(totalOf(YEAR_TOTALS));
  });

  it("adds up to the published seven-year figure", () => {
    // 560,918.28 + 1,640,755.03 + 2,176,400.98 + 2,612,845.00
    //   + 5,323,500 + 3,838,500 + 5,482,520
    expect(VERIFIED_TOTAL_KOBO).toBe(2_163_543_929);
    expect(formatKobo(VERIFIED_TOTAL_KOBO)).toBe("₦21,635,439.29");
  });

  it("holds every amount as an integer number of kobo", () => {
    // Floats would round a naira away somewhere and nobody would notice.
    for (const year of YEAR_TOTALS) {
      expect(Number.isInteger(year.raisedKobo)).toBe(true);
    }
    expect(Number.isInteger(VERIFIED_TOTAL_KOBO)).toBe(true);
  });

  it("runs in order, with no year repeated or missing", () => {
    const years = YEAR_TOTALS.map((y) => y.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(new Set(years).size).toBe(years.length);

    for (let i = 1; i < years.length; i += 1) {
      expect(years[i] - years[i - 1]).toBe(1);
    }
  });

  it("describes the range it actually covers", () => {
    expect(YEAR_RANGE).toBe("2019 and 2025");
  });

  it("only claims a report page where one exists", () => {
    // 2019-2022 are figures on record; the written reports are 2023 onward.
    const withPages = YEAR_TOTALS.filter((y) => y.hasReportPage).map((y) => y.year);
    expect(withPages).toEqual([2023, 2024, 2025]);
  });
});

import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Tests cover the three areas the brief names as needing real coverage: the
 * recurrence engine, Paystack webhook handling, and referral attribution.
 * Nothing else is unit-tested on purpose — pages are verified by building and
 * crawling them, which catches more than a snapshot ever would.
 *
 * `postcss: null` matters: these are pure Node tests that touch no CSS, and
 * Tailwind 4's PostCSS plugin cannot be loaded outside Next's own pipeline.
 * Without this, every run dies before a single test executes.
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  css: { postcss: { plugins: [] } },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});

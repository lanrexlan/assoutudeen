import { describe, expect, it } from "vitest";
import { shouldEmailNewsletterSignups } from "@/lib/notifications";

/**
 * Making a working notification optional must not be the thing that turns it
 * off. Every state that is not an explicit "no" has to keep sending — an admin
 * who never opens the panel should see no change at all.
 */

describe("newsletter notification setting", () => {
  it("sends when the global has never been saved", () => {
    // Payload returns field defaults for a table with no row.
    expect(shouldEmailNewsletterSignups({ newsletterSignups: true })).toBe(true);
    expect(shouldEmailNewsletterSignups({})).toBe(true);
  });

  it("sends when the global is missing entirely", () => {
    expect(shouldEmailNewsletterSignups(null)).toBe(true);
    expect(shouldEmailNewsletterSignups(undefined)).toBe(true);
  });

  it("sends when the value is null rather than a boolean", () => {
    // An older row, or a column added after the fact.
    expect(shouldEmailNewsletterSignups({ newsletterSignups: null })).toBe(true);
  });

  it("stops only on an explicit false", () => {
    expect(shouldEmailNewsletterSignups({ newsletterSignups: false })).toBe(false);
  });
});

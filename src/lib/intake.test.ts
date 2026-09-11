import { describe, expect, it } from "vitest";
import { stateOf, type IntakeRound } from "@/lib/intake";

/**
 * The round decides whether a family can ask the foundation for help, so the
 * boundaries have to be exactly right — and they are boundaries in Africa/Lagos
 * (UTC+1, no DST), not UTC. A day's drift either way either shuts the form
 * early or leaves it open past a deadline that has been published to everyone.
 */

const ROUND: IntakeRound = {
  label: "September 2026",
  opensOn: "2026-09-01",
  closesOn: "2026-09-30",
  decisionsBy: "2026-10-31",
};

/** A moment, given as Lagos wall-clock time. */
const lagos = (iso: string) => new Date(`${iso}+01:00`);

describe("intake rounds", () => {
  it("is closed with no round configured", () => {
    const state = stateOf(null);
    expect(state.status).toBe("none");
    expect(state.round).toBeNull();
  });

  it("opens at midnight in Ede on the opening day", () => {
    expect(stateOf(ROUND, lagos("2026-08-31T23:59:59")).status).toBe("upcoming");
    expect(stateOf(ROUND, lagos("2026-09-01T00:00:00")).status).toBe("open");
  });

  it("stays open through the last second of the deadline day", () => {
    expect(stateOf(ROUND, lagos("2026-09-30T23:59:59")).status).toBe("open");
    expect(stateOf(ROUND, lagos("2026-10-01T00:00:01")).status).toBe("closed");
  });

  it("does not close a day early for someone applying late at night", () => {
    // 23:30 in Ede on the deadline is 22:30 UTC the same day. Comparing in UTC
    // would be fine here, but on the opening day 00:30 Lagos is 23:30 UTC the
    // day BEFORE — which would have read as "upcoming" and hidden the form.
    expect(stateOf(ROUND, lagos("2026-09-01T00:30:00")).status).toBe("open");
    expect(stateOf(ROUND, lagos("2026-09-30T23:30:00")).status).toBe("open");
  });

  it("counts the days left inclusively", () => {
    expect(stateOf(ROUND, lagos("2026-09-30T09:00:00")).daysLeft).toBe(1);
    expect(stateOf(ROUND, lagos("2026-09-29T09:00:00")).daysLeft).toBe(2);
    expect(stateOf(ROUND, lagos("2026-09-11T09:00:00")).daysLeft).toBe(20);
  });

  it("reports no day count when the round is not running", () => {
    expect(stateOf(ROUND, lagos("2026-08-01T09:00:00")).daysLeft).toBeNull();
    expect(stateOf(ROUND, lagos("2026-11-01T09:00:00")).daysLeft).toBeNull();
  });

  it("handles a single-day round", () => {
    const oneDay: IntakeRound = { ...ROUND, opensOn: "2026-09-05", closesOn: "2026-09-05" };
    expect(stateOf(oneDay, lagos("2026-09-05T12:00:00")).status).toBe("open");
    expect(stateOf(oneDay, lagos("2026-09-06T00:00:01")).status).toBe("closed");
  });
});

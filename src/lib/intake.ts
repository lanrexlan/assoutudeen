/**
 * Requests for assistance are taken in rounds, not continuously.
 *
 * The fund is finite and every case is verified by hand, so an always-open form
 * collects more hope than the foundation can answer. Opening it for a stated
 * window — with a published deadline and a published decision date — means
 * every applicant knows where they stand, and nobody waits indefinitely on a
 * form that was never going to be read that month.
 *
 * The round is set in the admin panel, under Finance → "Requests: open or
 * closed". It used to be a constant here, which meant opening a round needed a
 * developer and a deployment; a round that opens on the first of the month
 * cannot wait for either.
 *
 * FALLBACK_ROUND below is only reached when the CMS cannot be read at all. It
 * is a safety net for an outage, not the place to configure anything.
 */

export type IntakeRound = {
  /** Shown as the round's name, e.g. "September 2026". */
  label: string;
  /** ISO date the form opens (Africa/Lagos). */
  opensOn: string;
  /** ISO date the form closes, end of day. */
  closesOn: string;
  /** ISO date applicants are told the outcome by. */
  decisionsBy: string;
  /** Roughly how many requests this round can carry. */
  places?: number;
};

/**
 * Used only if the CMS is unreachable.
 *
 * It errs towards OPEN rather than closed: a database outage should not
 * silently stop someone asking the foundation for help. The worst case is a
 * request arriving slightly outside a window, which a person can sort out; the
 * alternative is a family being told "closed" by a bug.
 */
const FALLBACK_ROUND: IntakeRound = {
  label: "September 2026",
  opensOn: "2026-09-01",
  closesOn: "2026-09-30",
  decisionsBy: "2026-10-31",
};

export type IntakeStatus = "open" | "upcoming" | "closed" | "none";

export type IntakeState = {
  status: IntakeStatus;
  round: IntakeRound | null;
  /** Whole days remaining until the deadline, when open. */
  daysLeft: number | null;
};

const LAGOS = "Africa/Lagos";

/** Midnight in Lagos on the given date, as a UTC instant. */
const startOfDayLagos = (iso: string): Date => new Date(`${iso}T00:00:00+01:00`);
/** The last instant of the given day in Lagos. */
const endOfDayLagos = (iso: string): Date => new Date(`${iso}T23:59:59+01:00`);

export const formatIntakeDate = (iso: string): string =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: LAGOS,
  }).format(new Date(`${iso}T12:00:00+01:00`));

/**
 * Payload stores dates as full timestamps; the round only ever means a day in
 * Ede. Take the Lagos calendar date, so a value saved at 23:30 UTC does not
 * come back as the day before.
 */
const toLagosDate = (value: unknown): string | null => {
  if (!value) return null;
  const date = new Date(value as string);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-CA", { timeZone: LAGOS }).format(date);
};

/** The round as configured in the admin panel, or null when none is running. */
export async function getCurrentRound(): Promise<IntakeRound | null> {
  try {
    /* Imported here rather than at the top of the file: the date logic below
       is pure, and pulling the whole Payload config in to test it is both slow
       and noisy. */
    const { getPayloadClient } = await import("@/lib/payload");
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: "intake-round" });

    if (!global?.accepting) return null;

    const opensOn = toLagosDate(global.opensOn);
    const closesOn = toLagosDate(global.closesOn);
    if (!opensOn || !closesOn) return null;

    return {
      label: global.label || "This round",
      opensOn,
      closesOn,
      /* Without a stated decision date, applicants are left waiting with no
         idea how long for. Fall back to the deadline rather than omitting it. */
      decisionsBy: toLagosDate(global.decisionsBy) ?? closesOn,
      places: global.places ?? undefined,
    };
  } catch {
    return FALLBACK_ROUND;
  }
}

/** Compute the state of a round at a given moment. Pure — used by the tests. */
export function stateOf(
  round: IntakeRound | null,
  now: Date = new Date(),
): IntakeState {
  if (!round) return { status: "none", round: null, daysLeft: null };

  const opens = startOfDayLagos(round.opensOn);
  const closes = endOfDayLagos(round.closesOn);

  if (now < opens) return { status: "upcoming", round, daysLeft: null };
  if (now > closes) return { status: "closed", round, daysLeft: null };

  const daysLeft = Math.max(
    0,
    Math.ceil((closes.getTime() - now.getTime()) / 86_400_000),
  );
  return { status: "open", round, daysLeft };
}

/**
 * Where the current round stands right now. Dates are compared in Africa/Lagos,
 * because "the 30th" means the 30th in Ede, not in UTC.
 */
export async function getIntakeState(now: Date = new Date()): Promise<IntakeState> {
  return stateOf(await getCurrentRound(), now);
}

/** True when the form should accept submissions. */
export async function isIntakeOpen(now?: Date): Promise<boolean> {
  return (await getIntakeState(now)).status === "open";
}

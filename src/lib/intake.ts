/**
 * Requests for assistance are taken in rounds, not continuously.
 *
 * The fund is finite and every case is verified by hand, so an always-open form
 * collects more hope than the foundation can answer. Opening it for a stated
 * window — with a published deadline and a published decision date — means
 * every applicant knows where they stand, and nobody waits indefinitely on a
 * form that was never going to be read that month.
 *
 * To open a round: set `current` with its dates and save. The form, the page
 * and the banner all follow from this one object.
 */

export type IntakeRound = {
  /** Shown as the round's name, e.g. "Q1 2027". */
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
 * The round currently published.
 *
 * Set to `null` when no round is scheduled — the page then says so plainly and
 * points people to WhatsApp for emergencies, rather than showing a form that
 * goes nowhere.
 */
export const CURRENT_ROUND: IntakeRound | null = {
  label: "The next round",
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
 * Where the current round stands right now. Dates are compared in Africa/Lagos,
 * because "the 30th" means the 30th in Ede, not in UTC.
 */
export function getIntakeState(now: Date = new Date()): IntakeState {
  const round = CURRENT_ROUND;
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

/** True when the form should accept submissions. */
export const isIntakeOpen = (now?: Date): boolean =>
  getIntakeState(now).status === "open";

/**
 * Contact-form subjects and the inbox each one routes to.
 *
 * `info@assoutudeen.com` is the only confirmed address (docs/01). The rest are
 * PROPOSED — they are marked as such and fall back to info@ until the mailboxes
 * actually exist, so nothing is ever sent into the void. See TODO-CONTENT.md.
 */

export const CONTACT_SUBJECTS = [
  "general",
  "consultation",
  "donation",
  "media",
  "distributor",
  "course",
  "assistance",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

type Route = {
  value: ContactSubject;
  label: string;
  /** Where it should go once the mailbox exists. */
  inbox: string;
  /** False until the mailbox is confirmed to exist. */
  confirmed: boolean;
  /** Short line shown under the dropdown to set expectations. */
  hint?: string;
};

export const CONTACT_ROUTES: Record<ContactSubject, Route> = {
  general: {
    value: "general",
    label: "General enquiry",
    inbox: "info@assoutudeen.com",
    confirmed: true,
  },
  consultation: {
    value: "consultation",
    label: "Health consultation",
    inbox: "consultation@assoutudeen.com",
    confirmed: false,
    hint: "For urgent medical problems, please see a doctor first.",
  },
  donation: {
    value: "donation",
    label: "Donation or Zakat",
    inbox: "donations@assoutudeen.com",
    confirmed: false,
    hint: "Questions about giving, Zakat eligibility, or a transfer you have made.",
  },
  media: {
    value: "media",
    label: "Media and press",
    inbox: "media@assoutudeen.com",
    confirmed: false,
  },
  distributor: {
    value: "distributor",
    label: "Honey wholesale or distribution",
    inbox: "sales@assoutudeen.com",
    confirmed: false,
  },
  course: {
    value: "course",
    label: "Classes at the Dawah Institute",
    inbox: "dawah@assoutudeen.com",
    confirmed: false,
  },
  assistance: {
    value: "assistance",
    label: "Request assistance (empowerment fund)",
    inbox: "info@assoutudeen.com",
    confirmed: true,
    hint: "Applications to the empowerment fund for help.",
  },
};

export const FALLBACK_INBOX = "info@assoutudeen.com";

/**
 * The address a submission is actually delivered to today. Unconfirmed
 * mailboxes fall back to info@ rather than bouncing.
 */
export const inboxFor = (subject: ContactSubject): string => {
  const route = CONTACT_ROUTES[subject];
  return route.confirmed ? route.inbox : FALLBACK_INBOX;
};

export const isContactSubject = (value: unknown): value is ContactSubject =>
  typeof value === "string" && CONTACT_SUBJECTS.includes(value as ContactSubject);

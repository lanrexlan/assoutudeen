/**
 * The foundation's published donation accounts.
 *
 * Both accounts are in the foundation's own name — check that the name on your
 * transfer screen matches exactly before sending anything.
 */

export type BankAccount = {
  label: string;
  accountName: string;
  accountNumber: string;
  bank: string;
  /** Present on the foreign-currency account only. */
  swift?: string;
  note: string;
};

export const ACCOUNT_NAME = "Assoutudeen Prophetic Medicine Foundation";

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    label: "Giving from Nigeria",
    accountName: ACCOUNT_NAME,
    accountNumber: "0010939336",
    bank: "Jaiz Bank",
    note: "Naira transfers from any Nigerian bank or app.",
  },
  {
    label: "Giving from abroad",
    accountName: ACCOUNT_NAME,
    accountNumber: "0011579597",
    bank: "Jaiz Bank",
    swift: "JAIZNGLAXXX",
    note: "For international transfers. Your bank will ask for the SWIFT code.",
  },
];

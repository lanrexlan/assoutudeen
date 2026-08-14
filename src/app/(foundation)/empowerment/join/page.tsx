import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Join the Fund",
  description:
    "Become a monthly contributor to the empowerment fund — any amount, card or manual transfer.",
};

/**
 * docs/11 Form 2 — the primary conversion. The live form (Paystack
 * subscription + manual pledge tracking) is a later session; until then the
 * founder's own flow — reply on WhatsApp with the amount you intend — is the
 * real path and is exactly what this page offers.
 */
export default function JoinFundPage() {
  return (
    <ComingSoon
      title="Join the Monthly Fund"
      description="Choose any monthly amount — ₦2,000, ₦5,000, ₦10,000, ₦25,000 or your own figure — and pay by card auto-debit or a simple monthly transfer."
      pending="the join form and Paystack subscription — wired in a later session"
      whatsappMessage="As-salaamu alaykum. I would like to join the Monthly Empowerment Fund. I intend to contribute ₦___ each month."
      backHref="/empowerment"
      backLabel="About the fund"
    />
  );
}

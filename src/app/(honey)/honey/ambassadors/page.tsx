import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Ambassadors",
  description:
    "The honey ambassador programme — referral codes, a public leaderboard and prize tiers.",
};

/** docs/09 ambassador system — referral codes, new-customer attribution, 5 L minimum, leaderboard. Later session. */
export default function AmbassadorsPage() {
  return (
    <ComingSoon
      title="Become an Ambassador"
      description="Share your referral code, earn when new customers order, and climb the public leaderboard — with CMS-configured prize tiers."
      pending="the ambassador programme — referral codes, attribution and the leaderboard are a later session"
      whatsappMessage="As-salaamu alaykum. I would like to become a honey ambassador."
      backHref="/honey"
    />
  );
}

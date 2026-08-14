import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Impact 2024",
  description: "The 2024 annual report: ₦3,838,500 raised, reported by category.",
};

/** The 2024 headline is verified (docs/11); the full report page is not built yet. */
export default function Impact2024Page() {
  return (
    <ComingSoon
      title="Impact 2024"
      description="₦3,838,500 raised — orphan support and education, public dawah outreach, emergency medical assistance and crisis support, reported by category, anonymously."
      pending="the full 2024 report page — the category breakdown is verified, the page is on the build list"
      whatsappMessage="As-salaamu alaykum. When will the 2024 impact report page be available?"
      backHref="/impact"
      backLabel="All reports"
    />
  );
}

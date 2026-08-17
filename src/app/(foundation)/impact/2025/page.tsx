import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Impact 2025",
  description:
    "The 2025 annual report: ₦5,482,520 raised, overheads published, reported by category.",
};

/** The 2025 headline is verified (docs/11); the full report page is not built yet. */
export default function Impact2025Page() {
  return (
    <ComingSoon
      title="Impact 2025"
      description="₦5,482,520 raised — empowerment and equipment, orphan support and education, medical relief, outreach, lectures — with the overheads published rather than buried."
      pending="the full 2025 report page — the category breakdown is verified, the page is on the build list"
      whatsappMessage="As-salaamu alaykum. When will the 2025 impact report page be available?"
      backHref="/impact"
      backLabel="All reports"
    />
  );
}

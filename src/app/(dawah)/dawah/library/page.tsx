import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Library",
  description: "Recorded lectures and notes from the Assoutudeen Dawah Institute.",
};

/** Recorded lectures and notes — a later session (CLAUDE.md, TODO #12 area). */
export default function LibraryPage() {
  return (
    <ComingSoon
      title="Library"
      description="Recorded lectures and study notes from the institute's classes — for those who cannot attend in person."
      pending="recordings and notes — being collected and prepared"
      whatsappMessage="As-salaamu alaykum. When will the lecture library be available?"
      backHref="/dawah"
      backLabel="Back to the institute"
    />
  );
}

import { Section } from "@/components/ui/section";
import { RemedyGridSkeleton } from "@/components/ui/skeleton";

/**
 * Shown while the library is fetched from the CMS.
 *
 * The page is server-rendered on demand, so on a slow connection there is a
 * real wait here. Placeholders in the site's own shapes make that wait look
 * like the page arriving rather than the page being broken.
 */
export default function LoadingRemedies() {
  return (
    <Section tone="chalk" size="lg">
      <RemedyGridSkeleton />
    </Section>
  );
}

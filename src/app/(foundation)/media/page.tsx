import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Media",
  description: "Photographs and videos from the foundation's programmes.",
};

/**
 * Gallery of real photographs (docs/05: photography is what sells this
 * project). Nothing is published until the photos exist and consent is
 * recorded — beneficiary privacy is the default.
 */
export default function MediaPage() {
  return (
    <ComingSoon
      title="Media"
      description="Photographs from empowerment distributions, classes and seminars — real people, with dignity and consent."
      pending="photographs — none supplied yet, and none will be published without recorded consent"
      whatsappMessage="As-salaamu alaykum. I would like to send photographs for the media page."
      backHref="/our-work"
      backLabel="Back to Our Work"
    />
  );
}

import type { Metadata } from "next";
import { FoundationHeader } from "@/components/site/foundation-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: {
    default: siteConfig.foundation.name,
    template: `%s · ${siteConfig.foundation.shortName}`,
  },
};

/** The main site. Served from the root of the app directory. */
export default function FoundationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-site="foundation" className="flex min-h-dvh flex-col bg-sand">
      <FoundationHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter site="foundation" />
      <WhatsAppFloat message={siteConfig.foundation.whatsappMessage} />
    </div>
  );
}

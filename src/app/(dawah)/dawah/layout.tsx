import type { Metadata } from "next";
import { DawahHeader } from "@/components/site/dawah-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: {
    default: siteConfig.dawah.name,
    template: `%s · ${siteConfig.dawah.shortName}`,
  },
};

/**
 * The education arm, on dawah.assoutudeen.com. The `/dawah` segment is an
 * internal rewrite target and is never visible in the address bar.
 */
export default function DawahLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-site="dawah" className="flex min-h-dvh flex-col bg-sand">
      <DawahHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter site="dawah" />
      <WhatsAppFloat message={siteConfig.dawah.whatsappMessage} />
    </div>
  );
}

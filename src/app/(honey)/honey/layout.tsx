import type { Metadata } from "next";
import { HoneyHeader } from "@/components/site/honey-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { siteConfig } from "@/lib/sites";

export const metadata: Metadata = {
  title: {
    default: siteConfig.honey.name,
    template: `%s · ${siteConfig.honey.shortName}`,
  },
};

/**
 * The commercial arm, on honey.assoutudeen.com. The `/honey` segment is an
 * internal rewrite target and is never visible in the address bar.
 */
export default function HoneyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-site="honey" className="flex min-h-dvh flex-col bg-sand">
      <HoneyHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter site="honey" />
      <WhatsAppFloat message={siteConfig.honey.whatsappMessage} />
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { HoneyHeader } from "@/components/site/honey-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/sites";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.honey.name,
    template: `%s · ${siteConfig.honey.shortName}`,
  },
  description:
    "Pure honey by the litre, retail and wholesale. Part of the Assoutudeen Prophetic Medicine Foundation.",
};

export const viewport: Viewport = {
  themeColor: "#D9A441",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout for farms.assoutudeen.com. Middleware rewrites that hostname to
 * the `/honey` segment inside this group; the prefix is never user-visible.
 */
export default function HoneyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" data-site="honey">
      <body className={`${fontVariables} flex min-h-dvh flex-col bg-sand antialiased`}>
        <HoneyHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter site="honey" />
        <WhatsAppFloat message={siteConfig.honey.whatsappMessage} />
      </body>
    </html>
  );
}

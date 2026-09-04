import type { Metadata, Viewport } from "next";
import { HoneyHeader } from "@/components/site/honey-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/sites";
import "../globals.css";

export const metadata: Metadata = siteMetadata("honey");

export const viewport: Viewport = {
  themeColor: "#E0A06A",
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
      <body className={`${fontVariables} flex min-h-dvh flex-col bg-chalk antialiased`}>
        <HoneyHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter site="honey" />
        <WhatsAppFloat message={siteConfig.honey.whatsappMessage} />
      </body>
    </html>
  );
}

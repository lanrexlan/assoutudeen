import type { Metadata, Viewport } from "next";
import { DawahHeader } from "@/components/site/dawah-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { DonationReminder } from "@/components/site/donation-reminder";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/sites";
import "../globals.css";

export const metadata: Metadata = siteMetadata("dawah");

export const viewport: Viewport = {
  themeColor: "#55614F",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout for dawah.assoutudeen.com. Middleware rewrites that hostname to
 * the `/dawah` segment inside this group; the prefix is never user-visible.
 */
export default function DawahLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" data-site="dawah">
      <body className={`${fontVariables} flex min-h-dvh flex-col bg-chalk antialiased`}>
        <DawahHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter site="dawah" />
        <DonationReminder />
        <WhatsAppFloat message={siteConfig.dawah.whatsappMessage} />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { FoundationHeader } from "@/components/site/foundation-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { DonationReminder } from "@/components/site/donation-reminder";
import { fontVariables } from "@/lib/fonts";
import { siteMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/sites";
import "../globals.css";

export const metadata: Metadata = siteMetadata("foundation");

export const viewport: Viewport = {
  themeColor: "#6B2233",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout for the MAIN site, served from `/`.
 *
 * Each of the three sites carries its own root layout (and the Payload admin
 * panel supplies a fourth) because Payload's admin renders its own document —
 * so there is deliberately no shared src/app/layout.tsx.
 */
export default function FoundationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" data-site="foundation">
      <body className={`${fontVariables} flex min-h-dvh flex-col bg-chalk antialiased`}>
        <FoundationHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter site="foundation" />
        <DonationReminder />
        <WhatsAppFloat message={siteConfig.foundation.whatsappMessage} />
      </body>
    </html>
  );
}

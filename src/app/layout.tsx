import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

/**
 * Shared shell for all three sites. Per-site chrome (header, footer, accent
 * colour) lives in the route-group layouts under (foundation), (dawah) and
 * (honey); only the document skeleton is here.
 */

export const metadata: Metadata = {
  // Each route group sets its own title template; the root only supplies a
  // fallback for anything rendered outside a group (404s, for instance).
  title: "Assoutudeen Prophetic Medicine Foundation",
  description:
    "Assoutudeen Prophetic Medicine Foundation — an Islamic charity in Ede, Osun State, Nigeria.",
};

export const viewport: Viewport = {
  themeColor: "#2F5D3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <body className={`${fontVariables} min-h-dvh antialiased`}>
        {children}
      </body>
    </html>
  );
}

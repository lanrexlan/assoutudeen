import { notFound } from "next/navigation";

/**
 * The site-styled 404.
 *
 * Next only serves `app/not-found.tsx` for unmatched URLs when there is a
 * single root layout. This app has three — one per site, plus Payload's — so an
 * unmatched URL would otherwise get Next's unstyled default page: no header, no
 * footer, no way back, and no sign of which site the visitor was even on. This
 * catch-all matches whatever is left over and hands it to the not-found file
 * beside it, which keeps the 404 status and gains the site's own chrome.
 */
export default function CatchAll() {
  notFound();
}

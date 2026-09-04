import { headers } from "next/headers";
import { ORIGINS, STATIC_ROUTES } from "@/lib/seo";
import { resolveSite } from "@/lib/sites";
import { remedySlugs } from "@/lib/remedies";
import { PROGRAMMES } from "@/lib/programmes";

/**
 * One sitemap, three sites.
 *
 * `/sitemap.xml` is excluded from the middleware matcher, so every hostname
 * lands here at the app root regardless of which site it belongs to. That is
 * exactly what we want: the handler reads the Host header itself and answers
 * with that site's own pages, at that site's own origin. A single file would
 * otherwise offer the foundation's URLs to a crawler asking the honey site,
 * and cross-host entries are ignored anyway.
 */

export const dynamic = "force-dynamic";

const escape = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const host = (await headers()).get("host");
  const site = resolveSite(host);
  const origin = ORIGINS[site];

  const paths = [...STATIC_ROUTES[site]];

  if (site === "foundation") {
    /* The remedies library is the main SEO asset, so its chapters have to be
       in here. A CMS that is unreachable must not take the sitemap down with
       it — the static routes are still worth serving. */
    try {
      for (const slug of await remedySlugs()) paths.push(`/remedies/${slug}`);
    } catch {
      // Fall through with the static routes alone.
    }
  }

  if (site === "dawah") {
    for (const programme of PROGRAMMES) {
      paths.push(`/programmes/${programme.slug}`);
    }
  }

  const now = new Date().toISOString();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) =>
      [
        "  <url>",
        `    <loc>${escape(`${origin}${path === "/" ? "" : path}`)}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        `    <priority>${path === "/" ? "1.0" : "0.7"}</priority>`,
        "  </url>",
      ].join("\n"),
    ),
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

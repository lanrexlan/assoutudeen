import { headers } from "next/headers";
import { ORIGINS, NOINDEX_PATHS } from "@/lib/seo";
import { resolveSite } from "@/lib/sites";

/**
 * Host-aware robots.txt, for the same reason as the sitemap: three domains,
 * one deployment, and each crawler should be pointed at its own site's map.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  const host = (await headers()).get("host");
  const origin = ORIGINS[resolveSite(host)];

  const body = [
    "User-agent: *",
    "Allow: /",
    ...NOINDEX_PATHS.map((path) => `Disallow: ${path}`),
    "Disallow: /api/",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

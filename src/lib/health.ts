import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  SITE_HEADER,
  SITE_OVERRIDE_HEADER,
  isSiteKey,
  normaliseHost,
  siteConfig,
} from "@/lib/sites";

/**
 * Shared `/health` handler. Re-exported by one route file per route group, so
 * the response proves which group actually rendered the request.
 */
export function healthHandler(renderedBy: keyof typeof siteConfig) {
  return async function GET() {
    const h = await headers();
    const resolved = h.get(SITE_HEADER);
    const site = isSiteKey(resolved) ? resolved : renderedBy;

    return NextResponse.json(
      {
        ok: true,
        /** Site resolved by middleware from the hostname or `?_site=`. */
        site,
        name: siteConfig[site].name,
        /** Route group that rendered this response. Should match `site`. */
        renderedBy,
        host: normaliseHost(h.get("host")),
        resolvedFrom: h.get(SITE_OVERRIDE_HEADER) === "1" ? "query" : "hostname",
        time: new Date().toISOString(),
      },
      { headers: { "cache-control": "no-store" } },
    );
  };
}

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
 * Which server-side configuration is present.
 *
 * Booleans only — never a value, never a prefix. The point is to answer "why
 * is the admin panel 500ing" from a browser, without turning a public endpoint
 * into a way to read the environment.
 */
function configured() {
  const set = (name: string) => Boolean(process.env[name]?.trim());

  return {
    /** Without this the admin panel and the CMS cannot start at all. */
    payloadSecret: set("PAYLOAD_SECRET"),
    database: set("DATABASE_URI"),
    /** Without these the forms still store everything; nobody is emailed. */
    email: set("RESEND_API_KEY"),
    /** Optional: uploads fall back to local disk. */
    cloudinary:
      set("CLOUDINARY_CLOUD_NAME") &&
      set("CLOUDINARY_API_KEY") &&
      set("CLOUDINARY_API_SECRET"),
  };
}

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
        configured: configured(),
        time: new Date().toISOString(),
      },
      { headers: { "cache-control": "no-store" } },
    );
  };
}

import { NextResponse, type NextRequest } from "next/server";
import {
  SITE_HEADER,
  SITE_OVERRIDE_HEADER,
  SITE_QUERY_PARAM,
  isSiteKey,
  resolveSite,
  siteConfig,
} from "@/lib/sites";

/**
 * Hostname -> route group routing.
 *
 *   assoutudeen.com        -> (foundation)   [MAIN SITE, served from the root]
 *   dawah.assoutudeen.com  -> (dawah)        [rewritten to /dawah/*]
 *   farms.assoutudeen.com  -> (honey)        [rewritten to /honey/*]
 *
 * Local development:
 *   localhost:3000         -> foundation
 *   dawah.localhost:3000   -> dawah
 *   farms.localhost:3000   -> honey
 *   ?_site=dawah           -> override, no /etc/hosts editing needed
 *
 * The internal prefixes never appear in the address bar; they exist only so
 * three sites can each own a `/` page in one app directory.
 */
export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const override = nextUrl.searchParams.get(SITE_QUERY_PARAM);
  const site = resolveSite(request.headers.get("host"), override);
  const { basePath } = siteConfig[site];

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(SITE_HEADER, site);
  if (isSiteKey(override)) requestHeaders.set(SITE_OVERRIDE_HEADER, "1");

  // The foundation owns the root, so nothing needs rewriting.
  // Subsidiaries are rewritten unless the prefix is already present (which
  // happens on internal navigations Next.js resolves against the rewritten URL).
  const needsRewrite =
    basePath !== "" &&
    nextUrl.pathname !== basePath &&
    !nextUrl.pathname.startsWith(`${basePath}/`);

  if (!needsRewrite) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = nextUrl.clone();
  url.pathname = `${basePath}${nextUrl.pathname === "/" ? "" : nextUrl.pathname}`;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    /**
     * Everything except:
     *  - /api            (route handlers read the Host header themselves)
     *  - /admin          (Payload CMS)
     *  - /_next          (build output and image optimisation)
     *  - files with an extension, and the well-known metadata files
     */
    "/((?!api/|admin|_next/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|.*\\.[\\w]+$).*)",
  ],
};

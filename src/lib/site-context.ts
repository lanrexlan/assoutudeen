import { headers } from "next/headers";
import {
  SITE_HEADER,
  SITE_OVERRIDE_HEADER,
  SITE_QUERY_PARAM,
  isSiteKey,
  siteConfig,
  type SiteKey,
} from "@/lib/sites";

export type SiteContext = {
  site: SiteKey;
  config: (typeof siteConfig)[SiteKey];
  /**
   * True when the site was chosen with `?_site=`. Links then carry the same
   * query so navigation stays on the site being tested.
   */
  isOverride: boolean;
  /** Build an href for the current site, preserving a `?_site=` override. */
  href: (path: string) => string;
};

/** Read the site resolved by middleware. Dynamic — it reads request headers. */
export async function getSiteContext(fallback?: SiteKey): Promise<SiteContext> {
  const h = await headers();
  const resolved = h.get(SITE_HEADER);
  const site: SiteKey = isSiteKey(resolved) ? resolved : (fallback ?? "foundation");
  const isOverride = h.get(SITE_OVERRIDE_HEADER) === "1";

  return {
    site,
    config: siteConfig[site],
    isOverride,
    href: (path: string) =>
      isOverride ? `${path}?${SITE_QUERY_PARAM}=${site}` : path,
  };
}

/**
 * The three front doors served by this one codebase.
 *
 * The foundation (APMF) is the MAIN site and lives at the root of the app
 * directory. The two subsidiaries are served from the `/dawah` and `/honey`
 * internal path prefixes, which `middleware.ts` rewrites to from their
 * hostnames. Those prefixes never appear in the address bar.
 */

export const SITES = ["foundation", "dawah", "honey"] as const;

export type SiteKey = (typeof SITES)[number];

/** Header set by middleware so server components can read the resolved site. */
export const SITE_HEADER = "x-assoutudeen-site";

/** Set to "1" when the site came from `?_site=` rather than the hostname. */
export const SITE_OVERRIDE_HEADER = "x-assoutudeen-site-override";

/** Query override for local testing without editing /etc/hosts: ?_site=dawah */
export const SITE_QUERY_PARAM = "_site";

export type SiteConfig = {
  key: SiteKey;
  /** Internal path prefix. Empty for the foundation, which owns the root. */
  basePath: "" | "/dawah" | "/honey";
  name: string;
  shortName: string;
  /** Public production hostname. */
  hostname: string;
  /** Every hostname that resolves to this site, including local dev hosts. */
  hostMatches: string[];
  nav: { label: string; href: string }[];
  /** Pre-filled WhatsApp message, per site. */
  whatsappMessage: string;
};

export const CONTACT = {
  /** Local format, as displayed. */
  phoneDisplay: "0816 188 2470",
  /** International format, for wa.me and tel: links. */
  phoneE164: "2348161882470",
  email: "info@assoutudeen.com",
  address:
    "Assoutudeen Street, Zone 5, Fiwasaye Community, Ede, Osun State, Nigeria",
  /** Africa/Lagos. */
  officeHours: "Monday to Friday, 8:00 – 17:00",
} as const;

export const FOUNDATION_NAME = "Assoutudeen Prophetic Medicine Foundation";

export const siteConfig: Record<SiteKey, SiteConfig> = {
  foundation: {
    key: "foundation",
    basePath: "",
    name: FOUNDATION_NAME,
    shortName: "APMF",
    hostname: "assoutudeen.com",
    hostMatches: ["assoutudeen.com", "www.assoutudeen.com", "localhost"],
    nav: [
      { label: "About", href: "/about" },
      { label: "Our Work", href: "/our-work" },
      { label: "Prophetic Medicine", href: "/prophetic-medicine" },
      { label: "Remedies", href: "/remedies" },
      { label: "Shop", href: "/shop" },
      { label: "Media", href: "/media" },
      { label: "Contact", href: "/contact" },
    ],
    whatsappMessage:
      "As-salaamu alaykum. I have a question about the Assoutudeen Prophetic Medicine Foundation.",
  },
  dawah: {
    key: "dawah",
    basePath: "/dawah",
    name: "Assoutudeen Dawah Institute",
    shortName: "ADI",
    hostname: "dawah.assoutudeen.com",
    hostMatches: ["dawah.assoutudeen.com", "dawah.localhost"],
    nav: [
      { label: "Programmes", href: "/programmes" },
      { label: "Schedule", href: "/schedule" },
      { label: "Teachers", href: "/teachers" },
      { label: "Library", href: "/library" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    whatsappMessage:
      "As-salaamu alaykum. I have a question about the Assoutudeen Dawah Institute classes.",
  },
  honey: {
    key: "honey",
    basePath: "/honey",
    name: "Assoutudeen Honey Enterprise",
    shortName: "AHE",
    hostname: "farms.assoutudeen.com",
    // `honey.` is kept as an accepted alias so older links keep working; it
    // should be 301'd to `farms.` at the DNS/host layer before launch.
    hostMatches: [
      "farms.assoutudeen.com",
      "honey.assoutudeen.com",
      "farms.localhost",
      "honey.localhost",
    ],
    nav: [
      { label: "Shop", href: "/shop" },
      { label: "Our Honey", href: "/our-honey" },
      { label: "Ambassadors", href: "/ambassadors" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    whatsappMessage:
      "As-salaamu alaykum. I would like to order honey from Assoutudeen Honey Enterprise.",
  },
};

/** Strip the port and lowercase, so `Dawah.localhost:3000` matches. */
export function normaliseHost(host: string | null | undefined): string {
  return (host ?? "").split(":")[0].trim().toLowerCase();
}

export function isSiteKey(value: string | null | undefined): value is SiteKey {
  return SITES.includes(value as SiteKey);
}

/**
 * Resolve a request to one of the three sites.
 *
 * Order: explicit `?_site=` override, then hostname, then the foundation —
 * which is the main site and therefore the default for anything unrecognised
 * (preview deployments, IP addresses, custom local hosts).
 */
export function resolveSite(
  host: string | null | undefined,
  override?: string | null,
): SiteKey {
  if (isSiteKey(override)) return override;

  const hostname = normaliseHost(host);
  for (const site of Object.values(siteConfig)) {
    if (site.hostMatches.includes(hostname)) return site.key;
  }
  return "foundation";
}

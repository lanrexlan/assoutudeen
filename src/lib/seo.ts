import type { Metadata } from "next";
import { siteConfig, type SiteKey } from "@/lib/sites";

/**
 * Everything a link to this site needs in order to look like something.
 *
 * The foundation's reach is WhatsApp and Facebook, not Google — a shared link
 * that renders as a bare grey URL is a donation that does not happen. So every
 * page carries an Open Graph title, description and image, and every site
 * declares its own canonical origin.
 *
 * `metadataBase` matters twice over here: without it Next cannot turn the
 * relative image paths below into the absolute URLs that scrapers require, and
 * the card silently comes out blank.
 */

export const ORIGINS: Record<SiteKey, string> = {
  foundation: "https://assoutudeen.com",
  dawah: "https://dawah.assoutudeen.com",
  honey: "https://farms.assoutudeen.com",
};

/** The picture that fronts each site when a link is shared. */
const SHARE_IMAGE: Record<SiteKey, string> = {
  foundation: "/hero/home.jpg",
  dawah: "/hero/dawah-home.jpg",
  honey: "/hero/honey-home.jpg",
};

const DESCRIPTION: Record<SiteKey, string> = {
  foundation:
    "A Nigerian Islamic charity: a standing empowerment fund, prophetic medicine from the Qur'an and Sunnah, and dawah — with every naira accounted for.",
  dawah:
    "Free classes in Tafsir, Hadith, Fiqh and prophetic medicine, taught between maghrib and isha in Ede, Osun State. Everyone is welcome, and every class is recorded.",
  honey:
    "Pure honey by the litre from the Assoutudeen Honey Enterprise, delivered across Nigeria. The commercial arm of the Assoutudeen Prophetic Medicine Foundation.",
};

/**
 * The metadata block for a site's root layout.
 *
 * Per-page `title` and `description` still override these; what this supplies
 * is the floor, so that no page can be shared as a blank card.
 */
export function siteMetadata(site: SiteKey): Metadata {
  const config = siteConfig[site];
  const origin = ORIGINS[site];
  const description = DESCRIPTION[site];

  return {
    metadataBase: new URL(origin),
    title: {
      default: config.name,
      template: `%s · ${config.shortName}`,
    },
    description,
    applicationName: config.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: config.name,
      title: config.name,
      description,
      url: origin,
      locale: "en_NG",
      images: [
        {
          url: SHARE_IMAGE[site],
          width: 2400,
          height: 1600,
          alt: config.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.name,
      description,
      images: [SHARE_IMAGE[site]],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

/**
 * Static routes per site, for the sitemap.
 *
 * Paths are as a visitor types them — the `/dawah` and `/honey` internal
 * prefixes belong to the rewrite, not to the address bar, so they are absent
 * here on purpose.
 */
export const STATIC_ROUTES: Record<SiteKey, string[]> = {
  foundation: [
    "/",
    "/about",
    "/about/founder",
    "/about/structure",
    "/about/accountability",
    "/our-work",
    "/empowerment",
    "/empowerment/how-it-works",
    "/empowerment/join",
    "/empowerment/request",
    "/impact",
    "/impact/2023",
    "/impact/2024",
    "/impact/2025",
    "/prophetic-medicine",
    "/remedies",
    "/shop",
    "/media",
    "/donate",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/delivery",
    "/legal/returns",
  ],
  dawah: [
    "/",
    "/programmes",
    "/schedule",
    "/teachers",
    "/library",
    "/about",
    "/contact",
  ],
  honey: ["/", "/our-honey", "/shop", "/ambassadors", "/about", "/contact"],
};

/** Pages that should never be indexed: they carry nothing a searcher wants. */
export const NOINDEX_PATHS = ["/health", "/admin"];

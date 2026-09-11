import { ORIGINS } from "@/lib/seo";
import { CONTACT, FOUNDATION_NAME, siteConfig } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";
import { BOOK } from "@/lib/book";
import { FOUNDER } from "@/lib/founder";

/**
 * Structured data — the machine-readable version of what each page says.
 *
 * This is what lets Google show a result as something other than a blue link:
 * the charity's address and phone in a knowledge panel, a class as an event, a
 * remedy chapter as an article. It changes nothing a visitor sees.
 *
 * Two rules hold everywhere in this file:
 *
 *  - Only claims the site already makes in words. Structured data that
 *    disagrees with the page is a manual-action risk, and inventing a rating
 *    or a review would be a lie told to a machine.
 *  - No medical schema on the honey or remedy pages. `MedicalWebPage` and
 *    friends assert a health claim, which is exactly what NAFDAC forbids the
 *    commercial side from making. Remedies are Articles: scholarship, not
 *    treatment.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      /* Angle brackets escaped so a stray `</script>` in any CMS text cannot
         close this tag early. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Assoutudeen Street, Zone 5, Fiwasaye Community",
  addressLocality: "Ede",
  addressRegion: "Osun State",
  addressCountry: "NG",
};

/** The charity itself. Rendered on every foundation page. */
export function FoundationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "NGO",
        "@id": `${ORIGINS.foundation}/#organisation`,
        name: FOUNDATION_NAME,
        alternateName: "APMF",
        url: ORIGINS.foundation,
        logo: `${ORIGINS.foundation}/brand/apmf_horizontal_color.png`,
        email: CONTACT.email,
        telephone: `+${CONTACT.phoneE164}`,
        address: postalAddress,
        foundingDate: REGISTRATION.incorporatedOn,
        /* The CAC number, which is the checkable fact that separates a
           registered charity from a page asking for money. */
        identifier: REGISTRATION.number,
        /* No `nonprofitStatus`: schema.org's vocabulary for it is US and Dutch
           tax categories (501c3, ANBI). A Nigerian body of incorporated
           trustees is neither, and asserting one would be a claim the site
           does not make. The CAC number above is the real credential. */
        areaServed: { "@type": "Country", name: "Nigeria" },
        founder: { "@type": "Person", name: FOUNDER.name },
        subOrganization: [
          {
            "@type": "EducationalOrganization",
            name: siteConfig.dawah.name,
            url: ORIGINS.dawah,
          },
          {
            "@type": "Organization",
            name: siteConfig.honey.name,
            url: ORIGINS.honey,
          },
        ],
      }}
    />
  );
}

/** The teaching arm. */
export function DawahSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${ORIGINS.dawah}/#organisation`,
        name: siteConfig.dawah.name,
        alternateName: "ADI",
        url: ORIGINS.dawah,
        email: CONTACT.email,
        telephone: `+${CONTACT.phoneE164}`,
        address: postalAddress,
        parentOrganization: {
          "@type": "NGO",
          name: FOUNDATION_NAME,
          url: ORIGINS.foundation,
        },
      }}
    />
  );
}

/** The trading arm. No product or offer schema: prices exclude transport and
 *  are quoted per order, and an offer that disagrees with the page is worse
 *  than no offer at all. */
export function HoneySchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${ORIGINS.honey}/#organisation`,
        name: siteConfig.honey.name,
        alternateName: "AHE",
        url: ORIGINS.honey,
        email: CONTACT.email,
        telephone: `+${CONTACT.phoneE164}`,
        address: postalAddress,
        parentOrganization: {
          "@type": "NGO",
          name: FOUNDATION_NAME,
          url: ORIGINS.foundation,
        },
      }}
    />
  );
}

/**
 * A remedy chapter, as an article.
 *
 * Article, not MedicalWebPage: these pages quote the Qur'an, the Sunnah and
 * Ibn al-Qayyim. They are scholarship about what the sources say, and they do
 * not claim to treat or cure anything.
 */
export function RemedySchema({
  name,
  description,
  slug,
  updatedAt,
}: {
  name: string;
  description: string;
  slug: string;
  updatedAt?: string;
}) {
  const url = `${ORIGINS.foundation}/remedies/${slug}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: name,
        description,
        url,
        mainEntityOfPage: url,
        isPartOf: { "@type": "Book", name: BOOK.title },
        author: { "@type": "Person", name: FOUNDER.name },
        publisher: {
          "@type": "NGO",
          name: FOUNDATION_NAME,
          url: ORIGINS.foundation,
        },
        inLanguage: "en-NG",
        ...(updatedAt ? { dateModified: updatedAt } : {}),
      }}
    />
  );
}

/**
 * Breadcrumbs, so a result shows "Home › Remedies › Black seed" rather than a
 * bare URL. Pass the trail as it appears on the page.
 */
export function BreadcrumbSchema({
  site = "foundation",
  trail,
}: {
  site?: keyof typeof ORIGINS;
  trail: { name: string; path: string }[];
}) {
  const origin = ORIGINS[site];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((step, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: step.name,
          item: `${origin}${step.path === "/" ? "" : step.path}`,
        })),
      }}
    />
  );
}

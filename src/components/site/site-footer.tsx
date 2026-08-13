import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { OrnamentField, Starfield } from "@/components/ui/ornament";
import { BrandMark } from "@/components/site/brand-mark";
import { FoundationLink, foundationUrl } from "@/components/site/foundation-link";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Todo } from "@/components/ui/todo";
import { CONTACT, FOUNDATION_NAME, siteConfig, type SiteKey } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";
import { getSiteContext } from "@/lib/site-context";

/** Legal pages, published once on the foundation domain. */
const LEGAL_LINKS = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Delivery", href: "/legal/delivery" },
  { label: "Returns", href: "/legal/returns" },
];

/**
 * Footers are the deepest surface on all three sites — the one piece of chrome
 * the subsidiaries share with the foundation, which is the point: it reads as
 * one organisation.
 *
 * Four columns (docs/02): about with the registration number, quick links,
 * contact, and the newsletter.
 */
export async function SiteFooter({ site }: { site: SiteKey }) {
  const { href } = await getSiteContext(site);
  const config = siteConfig[site];
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-sand/80">
      <OrnamentField tone="gold" className="opacity-40" />
      <Starfield />
      {/* Gold hairline along the top edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/60 to-transparent"
      />

      <Container className="relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 1 — who we are */}
          <div>
            <div className="flex items-center gap-3 text-white">
              <BrandMark className="size-10 text-amber" title={config.name} />
              <span className="font-display text-lg leading-tight">
                {config.shortName}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              {site === "foundation"
                ? "An Islamic charity in Ede, Osun State. Prophetic medicine, a monthly empowerment fund, and free classes — with the accounts published."
                : `Part of ${FOUNDATION_NAME}.`}
            </p>
            {/* The registration belongs to the foundation. On the subsidiary
                sites it is labelled as the parent's, never as their own. */}
            <dl className="mt-5 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="text-sand/55">
                  {site === "foundation" ? "CAC" : "Parent charity CAC"}
                </dt>
                <dd className="font-medium text-sand">{REGISTRATION.number}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-sand/55">Registered</dt>
                <dd>{REGISTRATION.incorporatedOnDisplay}</dd>
              </div>
            </dl>
          </div>

          {/* 2 — quick links */}
          <nav aria-label="Footer">
            <h2 className="font-display text-base text-white">Explore</h2>
            <span aria-hidden="true" className="mt-2 block h-px w-10 bg-amber" />
            <ul className="mt-3">
              {config.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="flex min-h-11 items-center text-sm underline-offset-4 hover:text-amber hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — contact */}
          <div>
            <h2 className="font-display text-base text-white">Find us</h2>
            <span aria-hidden="true" className="mt-2 block h-px w-10 bg-amber" />
            <address className="mt-3 space-y-3 text-sm not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber" />
                <span>{CONTACT.address}</span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber" />
                <a
                  href={`tel:+${CONTACT.phoneE164}`}
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:text-amber hover:underline"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:text-amber hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
            <p className="mt-3 text-sm text-sand/55">
              Office hours: <Todo className="border-white/30 bg-white/10 text-sand">office hours</Todo>
            </p>
          </div>

          {/* 4 — newsletter */}
          <div>
            <h2 className="font-display text-base text-white">Stay connected</h2>
            <span aria-hidden="true" className="mt-2 block h-px w-10 bg-amber" />
            <p className="mt-3 text-sm">
              Occasional email — the empowerment fund, new classes, new writing.
            </p>
            <NewsletterForm source={`footer-${site}`} className="mt-4" compact />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  {site === "foundation" ? (
                    <Link
                      href={href(item.href)}
                      className="flex min-h-11 items-center text-sm text-sand/70 underline-offset-4 hover:text-amber hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={`${foundationUrl}${item.href}`}
                      className="flex min-h-11 items-center text-sm text-sand/70 underline-offset-4 hover:text-amber hover:underline"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {site === "foundation" ? null : <FoundationLink className="text-sand/70" />}
          </div>
          <p className="mt-3 text-sm text-sand/50">
            © {year} {config.name}.{" "}
            {site === "foundation"
              ? `Registered in Nigeria as ${REGISTRATION.registeredName}, ${REGISTRATION.number}.`
              : `An arm of ${FOUNDATION_NAME}, registered in Nigeria as ${REGISTRATION.registeredName}, ${REGISTRATION.number}.`}
          </p>
        </div>
      </Container>
    </footer>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FoundationLink, foundationUrl } from "@/components/site/foundation-link";
import { Todo } from "@/components/ui/todo";
import { CONTACT, siteConfig, type SiteKey } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

/** Legal pages, published once on the foundation domain. */
const LEGAL_LINKS = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Delivery", href: "/legal/delivery" },
  { label: "Returns", href: "/legal/returns" },
];

/**
 * Footers are teal on all three sites (docs/05) — the one piece of chrome the
 * subsidiaries share with the foundation, which is the point: it reads as one
 * organisation.
 */
export async function SiteFooter({ site }: { site: SiteKey }) {
  const { href } = await getSiteContext(site);
  const config = siteConfig[site];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-teal text-white/90">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              {config.name}
            </p>
            <address className="mt-3 space-y-1 text-sm not-italic">
              <p>{CONTACT.address}</p>
              <p>
                <a
                  href={`tel:+${CONTACT.phoneE164}`}
                  className="underline-offset-4 hover:underline"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-4">
              {config.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="flex min-h-11 items-center text-sm underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 text-sm">
          {site === "foundation" ? null : <FoundationLink />}

          {/* Legal pages live on the foundation domain; the subsidiaries link
              across to them rather than keeping their own copies. */}
          <ul className="flex flex-wrap gap-x-6">
            {LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                {site === "foundation" ? (
                  <Link
                    href={href(item.href)}
                    className="flex min-h-11 items-center text-white/80 underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`${foundationUrl}${item.href}`}
                    className="flex min-h-11 items-center text-white/80 underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-2 text-white/70">
            © {year} {config.name}. All rights reserved. CAC{" "}
            <Todo className="border-white/40 bg-white/10 text-white/90">
              registration number
            </Todo>
          </p>
        </div>
      </Container>
    </footer>
  );
}

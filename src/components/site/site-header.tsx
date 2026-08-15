import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BrandLockup, BrandMark } from "@/components/site/brand-mark";
import { MobileNav } from "@/components/site/mobile-nav";
import { FoundationLink } from "@/components/site/foundation-link";
import { CONTACT, siteConfig, type SiteKey } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";
import { cn } from "@/lib/utils";

/**
 * One header, three sites.
 *
 * Structure, top to bottom:
 *  1. a utility strip — phone and email, plus the "part of" link on the two
 *     subsidiaries, so the hierarchy is stated before anything else;
 *  2. the sticky bar — mark, wordmark, nav, and the one action that must never
 *     be hidden (Donate on the foundation, the basket on the honey site).
 *
 * The action sits outside the hamburger at every breakpoint, by design.
 */
export async function SiteHeader({
  site,
  action,
}: {
  site: SiteKey;
  /** The always-visible action, rendered to the right of the nav. */
  action?: React.ReactNode;
}) {
  const { href } = await getSiteContext(site);
  const config = siteConfig[site];
  const items = config.nav.map((item) => ({ ...item, href: href(item.href) }));
  const isSubsidiary = site !== "foundation";

  return (
    <header className="relative z-50">
      {/* Utility strip */}
      <div className="border-b border-white/10 bg-ink text-sand/75">
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 py-1 text-sm">
            <a
              href={`tel:+${CONTACT.phoneE164}`}
              className="flex min-h-11 items-center gap-2 hover:text-amber"
            >
              <Phone aria-hidden="true" className="size-3.5 text-amber" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden min-h-11 items-center gap-2 hover:text-amber sm:flex"
            >
              <Mail aria-hidden="true" className="size-3.5 text-amber" />
              {CONTACT.email}
            </a>
            {isSubsidiary ? (
              <FoundationLink className="ms-auto text-sand/75 hover:text-amber" />
            ) : (
              <p className="ms-auto hidden min-h-11 items-center text-sand/60 lg:flex">
                Ede, Osun State · Nigeria
              </p>
            )}
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "sticky top-0 border-b border-white/10 shadow-soft",
          "bg-ink/95 text-white backdrop-blur supports-[backdrop-filter]:bg-ink/80",
        )}
      >
        <Container>
          <div className="relative flex min-h-18 items-center gap-4 py-2">
            <Link href={href("/")} className="flex min-h-11 items-center gap-3">
              {site === "foundation" ? (
                // The full lockup, reversed for the ink bar.
                <BrandLockup tone="reversed" className="gap-3" />
              ) : (
                <>
                  <BrandMark tone="reversed" className="size-11 shrink-0" />
                  <span className="leading-none">
                    <span className="block font-brand text-xl font-extrabold uppercase tracking-[0.06em] text-white">
                      {config.shortName}
                    </span>
                    <span className="mt-1.5 block font-brand text-[0.62rem] font-medium leading-tight tracking-[0.04em] text-sand/75">
                      {site === "dawah"
                        ? "Assoutudeen Dawah Institute"
                        : "Assoutudeen Honey Enterprise"}
                    </span>
                  </span>
                </>
              )}
            </Link>

            <nav aria-label="Site" className="ms-auto hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex min-h-11 items-center rounded-full px-3.5 text-sm text-sand/85",
                        "transition-colors hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={cn("flex items-center gap-2", "ms-auto lg:ms-0")}>
              {action}
              <MobileNav
                items={items}
                className="lg:hidden"
                panelClassName="border-white/10 bg-ink text-white"
              />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

/** The foundation's Donate button — amber, always visible, never in the menu. */
export function DonateAction({ href }: { href: string }) {
  return (
    <Button asChild variant="donate" className="shrink-0">
      <Link href={href}>Donate</Link>
    </Button>
  );
}

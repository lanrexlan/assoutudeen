import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/site/mobile-nav";
import { FoundationLink } from "@/components/site/foundation-link";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

export async function DawahHeader() {
  const { href } = await getSiteContext("dawah");
  const { nav, name, shortName } = siteConfig.dawah;
  const items = nav.map((item) => ({ ...item, href: href(item.href) }));

  return (
    <header className="relative bg-teal text-white">
      {/* Parent-charity link sits above the nav, visible on every page. */}
      <div className="border-b border-white/15 bg-teal-dark">
        <Container>
          <FoundationLink className="text-white/90" />
        </Container>
      </div>

      <Container>
        <div className="flex min-h-16 items-center gap-3">
          <Link
            href={href("/")}
            className="flex min-h-11 items-center font-display text-lg font-semibold leading-tight"
          >
            <span className="sm:hidden">{shortName}</span>
            <span className="hidden sm:inline">{name}</span>
          </Link>

          <nav aria-label="Site" className="ms-auto hidden md:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center rounded-md px-3 text-sm hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ms-auto md:hidden">
            <MobileNav
              items={items}
              panelClassName="border-white/15 bg-teal text-white"
            />
          </div>
        </div>
      </Container>
    </header>
  );
}

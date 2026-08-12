import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/site/mobile-nav";
import { FoundationLink } from "@/components/site/foundation-link";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

export async function HoneyHeader() {
  const { href } = await getSiteContext("honey");
  const { nav, name, shortName } = siteConfig.honey;
  const items = nav.map((item) => ({ ...item, href: href(item.href) }));

  return (
    <header className="relative bg-amber text-charcoal">
      <div className="border-b border-charcoal/15 bg-charcoal text-white">
        <Container>
          <FoundationLink />
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
                    className="flex min-h-11 items-center rounded-md px-3 text-sm hover:bg-charcoal/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cart stays visible at every breakpoint, like the Donate button on
              the foundation site. Item count wires up with the cart in a later
              session. */}
          <Link
            href={href("/cart")}
            aria-label="Basket"
            className="ms-auto flex size-11 items-center justify-center rounded-md hover:bg-charcoal/10 md:ms-0"
          >
            <ShoppingBag className="size-6" aria-hidden="true" />
          </Link>

          <MobileNav
            items={items}
            panelClassName="border-charcoal/20 bg-amber text-charcoal"
          />
        </div>
      </Container>
    </header>
  );
}

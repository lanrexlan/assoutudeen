import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/site/mobile-nav";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

export async function FoundationHeader() {
  const { href } = await getSiteContext("foundation");
  const { nav, name, shortName } = siteConfig.foundation;
  const items = nav.map((item) => ({ ...item, href: href(item.href) }));

  return (
    <header className="relative bg-olive text-white">
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

          {/* Always visible, on every breakpoint, never inside the hamburger. */}
          <Button asChild variant="donate" className="ms-auto md:ms-0">
            <Link href={href("/donate")}>Donate</Link>
          </Button>

          <MobileNav items={items} />
        </div>
      </Container>
    </header>
  );
}

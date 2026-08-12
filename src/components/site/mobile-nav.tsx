"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  items: { label: string; href: string }[];
  /** Background/border classes for the drop-down panel, per site. */
  panelClassName?: string;
  /** Rendered inside the open panel, below the links. */
  children?: React.ReactNode;
};

/**
 * Hamburger disclosure for small screens. Deliberately not a modal library:
 * a details-style panel keeps the JavaScript budget near zero. The Donate
 * button is NOT in here — it lives permanently in the header bar.
 */
export function MobileNav({
  items,
  panelClassName,
  children,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-md text-current"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Menu className="size-6" aria-hidden="true" />
        )}
      </button>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full z-40 border-t shadow-lg",
          panelClassName ?? "border-white/15 bg-olive text-white",
        )}
      >
        <nav aria-label="Site" className="px-4 py-2">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-11 items-center py-1 text-base",
                    "border-b border-white/10 last:border-0",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {children ? <div className="py-3">{children}</div> : null}
        </nav>
      </div>
    </div>
  );
}

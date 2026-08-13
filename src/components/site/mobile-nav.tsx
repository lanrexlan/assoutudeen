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
  className?: string;
  /** Rendered inside the open panel, below the links. */
  children?: React.ReactNode;
};

/**
 * Hamburger disclosure for small screens. Deliberately not a modal library:
 * a simple disclosure keeps the JavaScript budget near zero. The site's
 * primary action is NOT in here — it lives permanently in the header bar.
 */
export function MobileNav({
  items,
  panelClassName,
  className,
  children,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-full border border-white/25 text-current transition-colors hover:border-amber hover:bg-white/10"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full z-40 border-t shadow-elevated",
          panelClassName ?? "border-white/10 bg-ink text-white",
        )}
      >
        <nav aria-label="Site" className="px-4 py-2">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center border-b border-white/10 text-base last:border-0"
                >
                  <span
                    aria-hidden="true"
                    className="me-3 size-1.5 rotate-45 bg-amber"
                  />
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

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteContext } from "@/lib/site-context";

export async function HoneyHeader() {
  const { href } = await getSiteContext("honey");
  return (
    <SiteHeader
      site="honey"
      action={
        // Stays visible at every breakpoint, like Donate on the foundation.
        // The item count wires up with the cart in session 11.
        <Link
          href={href("/cart")}
          aria-label="Basket"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-amber transition-colors hover:border-amber hover:bg-white/10"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
        </Link>
      }
    />
  );
}

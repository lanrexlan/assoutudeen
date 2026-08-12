import { FOUNDATION_NAME } from "@/lib/sites";
import { cn } from "@/lib/utils";

/**
 * Absolute URL of the main site. The subsidiaries are on different hostnames,
 * so this is a real cross-origin link, not a Next.js route.
 */
export const foundationUrl =
  process.env.NEXT_PUBLIC_FOUNDATION_URL ?? "https://assoutudeen.com";

/**
 * Persistent "part of" link shown on both subsidiary sites — required, and
 * required to be visible (docs/09, "Hierarchy — get this right").
 */
export function FoundationLink({ className }: { className?: string }) {
  return (
    <a
      href={foundationUrl}
      className={cn(
        "flex min-h-11 items-center text-sm underline-offset-4 hover:underline",
        className,
      )}
    >
      <span aria-hidden="true" className="me-1">
        ←
      </span>
      Part of {FOUNDATION_NAME}
    </a>
  );
}

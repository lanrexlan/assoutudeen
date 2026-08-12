import { cn } from "@/lib/utils";

/**
 * A fact nobody has supplied yet.
 *
 * Renders visibly — `[TODO: CAC number]` — so a missing value can never be
 * mistaken for a real one, and so it is obvious in review before launch.
 * Every item here has a matching entry in TODO-CONTENT.md.
 *
 * Never replace one of these with a plausible guess. Nigerian registration
 * numbers, trustee names, prices and dates are checkable facts; inventing one
 * is worse than showing a gap.
 */
export function Todo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <mark
      data-todo
      className={cn(
        "rounded-sm border border-dashed border-amber-dark bg-amber/15 px-1.5 py-0.5 text-[0.9em] font-medium text-charcoal",
        className,
      )}
    >
      [TODO: {children}]
    </mark>
  );
}

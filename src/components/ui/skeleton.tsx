import { cn } from "@/lib/utils";

/**
 * Placeholders for content still being fetched.
 *
 * In the site's own shapes rather than grey rectangles: a card-shaped
 * placeholder is the seal, because that is what will appear in its place. A
 * generic grey block would announce that something generic is loading.
 *
 * The shimmer is a slow, low-contrast sweep and it stops entirely under
 * prefers-reduced-motion — a loading state should not be the most animated
 * thing on a page built for calm.
 */

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("skeleton block", className)} />;
}

/** A stand-in for one remedy card, matching the real card's proportions. */
export function RemedyCardSkeleton() {
  return (
    <div className="seal bg-chalk-dark p-px">
      <div className="seal flex h-full flex-col gap-4 bg-white p-5 sm:p-6">
        <Skeleton className="size-11 rounded-full" />
        <Skeleton className="h-5 w-3/5 rounded" />
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-4/5 rounded" />
        <Skeleton className="mt-auto h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}

/** A grid of them, for the library while it loads. */
export function RemedyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading the remedies library"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }, (_, i) => (
        <RemedyCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

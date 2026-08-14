import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIES, TESTIMONY_DISCLAIMER, type Testimony } from "@/lib/testimonies";

/**
 * Anonymous accounts from the foundation's archive.
 *
 * Every card carries its attribution by category and its year, and the section
 * carries the disclaimer — not in small print at the bottom of the page, but
 * directly under the heading, where it is read.
 */

function TestimonyCard({ testimony }: { testimony: Testimony }) {
  return (
    <figure
      className={cn(
        "lift flex break-inside-avoid flex-col gap-4 rounded-xl border border-sand-dark bg-white p-6 shadow-sm",
        "mb-6",
      )}
    >
      <Quote aria-hidden="true" className="size-6 shrink-0 text-amber" />
      <blockquote className="text-[0.975rem] leading-relaxed text-charcoal">
        {testimony.quote}
      </blockquote>
      <figcaption className="mt-auto border-t border-sand-dark pt-4 text-sm">
        <span className="font-medium text-charcoal">{testimony.attribution}</span>
        <span className="text-charcoal-muted">
          {" "}
          · {testimony.topic} · {testimony.year}
        </span>
        {testimony.partial ? (
          <span className="mt-2 block text-xs text-charcoal-muted">
            Reported as a partial improvement, and published that way.
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function TestimonyWall({
  limit,
  className,
}: {
  /** Show only the first N. Omit for all of them. */
  limit?: number;
  className?: string;
}) {
  const items = limit ? TESTIMONIES.slice(0, limit) : TESTIMONIES;

  return (
    <div className={className}>
      {/* Masonry-ish columns so quotes of different lengths sit well together. */}
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {items.map((testimony) => (
          <TestimonyCard key={testimony.id} testimony={testimony} />
        ))}
      </div>
    </div>
  );
}

export function TestimonyDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "mx-auto max-w-3xl rounded-lg border border-sand-dark bg-sand p-4 text-sm leading-relaxed text-charcoal-muted",
        className,
      )}
    >
      {TESTIMONY_DISCLAIMER}
    </p>
  );
}

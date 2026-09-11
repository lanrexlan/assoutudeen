import { cn } from "@/lib/utils";

/**
 * A second family of ornaments, for rhythm rather than texture.
 *
 * `ornament.tsx` gives the page its surfaces — the seal, the medallion, the
 * geometric field. What was missing was everything that happens BETWEEN
 * surfaces: the page ran as one unbroken column of chalk, and a reader had no
 * edges to rest on.
 *
 * These are the edges. All of them are inline SVG as data URIs or pure CSS —
 * no extra requests, nothing to load on a phone over patchy data, and nothing
 * that moves.
 *
 * The vocabulary is the same throughout: the eight-point khatim star and the
 * interlace that generates it. Not mosque silhouettes, not tiled arabesque
 * wallpaper, not gold (docs/05, CLAUDE.md).
 */

type Tone = "light" | "dark" | "accent";

/* Raw hex. The SVG is encoded once, whole, by encodeURIComponent — a
   pre-encoded "%23" would become "%2523" and the stroke would be invalid. */
const STROKE: Record<Tone, string> = {
  light: "#6B2233",
  dark: "#F4F1EC",
  accent: "#E0A06A",
};

/* ---------------------------------------------------------------------------
   Zellij band — the tessellated strip that sits on a section's edge.
--------------------------------------------------------------------------- */

const zellijStrip = (stroke: string, opacity: number) => {
  /* One repeating cell of interlaced eight-point stars, drawn as hairlines.
     A band, not a field: it is 40px tall and marks a boundary, which is what
     zellij does above a doorway rather than across a whole wall. */
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40">
    <g fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1">
      <path d="M0 20 L20 0 L40 20 L20 40 Z"/>
      <path d="M40 20 L60 0 L80 20 L60 40 Z"/>
      <path d="M20 10 L30 20 L20 30 L10 20 Z"/>
      <path d="M60 10 L70 20 L60 30 L50 20 Z"/>
      <path d="M0 0 L10 10 M80 0 L70 10 M0 40 L10 30 M80 40 L70 30"/>
      <path d="M40 0 L30 10 M40 0 L50 10 M40 40 L30 30 M40 40 L50 30"/>
    </g>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

/**
 * A tessellated band across the full width, fading at both ends.
 *
 * Use it on the seam between two sections. `edge` says which way it fades, so
 * a band at the top of a section fades upward into the section above it.
 */
export function ZellijBand({
  tone = "accent",
  edge = "top",
  className,
}: {
  tone?: Tone;
  edge?: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "zellij-band",
        edge === "top" ? "top-0" : "bottom-0",
        edge === "bottom" && "zellij-band-flip",
        className,
      )}
      style={
        {
          "--zellij-image": zellijStrip(STROKE[tone], tone === "accent" ? 0.5 : 0.28),
        } as React.CSSProperties
      }
    />
  );
}

/* ---------------------------------------------------------------------------
   Corner flourishes — the quarter-star that marks a panel's corners.
--------------------------------------------------------------------------- */

/**
 * Four corner brackets drawn from the star's geometry.
 *
 * Put it on a panel that needs to read as *framed* without the weight of the
 * full seal — a pull-quote, a highlighted statistic, a card that matters more
 * than the ones beside it.
 */
export function CornerMarks({
  tone = "accent",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const colour =
    tone === "accent"
      ? "text-apricot"
      : tone === "dark"
        ? "text-chalk/40"
        : "text-oxblood/30";

  const Corner = ({ style }: { style: string }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("absolute size-5", colour, style)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M1 8 V4 a3 3 0 0 1 3-3 h4" />
      <path d="M5 9 L9 5" />
    </svg>
  );

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <Corner style="left-2 top-2" />
      <Corner style="right-2 top-2 rotate-90" />
      <Corner style="bottom-2 right-2 rotate-180" />
      <Corner style="bottom-2 left-2 -rotate-90" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Lantern rule — a richer divider than the hairline star.
--------------------------------------------------------------------------- */

/**
 * A divider with a hanging lozenge at the centre and a star inside it.
 *
 * `RuleMark` is the quiet one; this is for the top of a major section, where
 * the page needs a breath before it starts again.
 */
export function LanternRule({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const line = tone === "dark" ? "via-chalk/35" : "via-apricot";
  const glyph = tone === "dark" ? "text-apricot" : "text-apricot-dark";

  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-4", className)}
    >
      <span className={cn("h-px w-16 bg-gradient-to-r from-transparent sm:w-28", line)} />
      <svg viewBox="0 0 32 32" className={cn("size-7 shrink-0", glyph)} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        {/* Lozenge, then the khatim star held inside it. */}
        <path d="M16 2 L30 16 L16 30 L2 16 Z" />
        <path d="M16 8 L21 13 H24 v3 l2 0 -2 2 v3 h-3 l-5 5 -5-5 H8 v-3 l-2-2 2 0 v-3 h3 Z" strokeOpacity="0.7" />
      </svg>
      <span className={cn("h-px w-16 bg-gradient-to-l from-transparent sm:w-28", line)} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Arch niche — a radial glow shaped by the star, for dark grounds.
--------------------------------------------------------------------------- */

/**
 * A soft radial bloom behind a dark section's heading.
 *
 * This is the one place the site allows itself something atmospheric. It is
 * light, not architecture: no arch outline, no silhouette, nothing that reads
 * as a mosque in costume.
 */
export function Bloom({
  className,
  tone = "accent",
}: {
  className?: string;
  tone?: "accent" | "primary";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2",
        className,
      )}
      style={{
        background:
          tone === "accent"
            ? "radial-gradient(ellipse at top, rgb(224 160 106 / 0.18), transparent 68%)"
            : "radial-gradient(ellipse at top, rgb(107 34 51 / 0.28), transparent 68%)",
      }}
    />
  );
}

/* ---------------------------------------------------------------------------
   Numerals — for ordered lists that deserve better than bullets.
--------------------------------------------------------------------------- */

/** A number inside a small seal. For steps, ranks and ordered explanations. */
export function SealNumber({
  value,
  tone = "light",
  className,
}: {
  value: number | string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "seal seal-sm inline-flex size-9 shrink-0 items-center justify-center p-px",
        tone === "dark" ? "bg-apricot/40" : "bg-oxblood/20",
        className,
      )}
    >
      <span
        className={cn(
          "seal seal-sm flex size-full items-center justify-center font-display text-sm font-semibold",
          tone === "dark" ? "bg-ink text-apricot" : "bg-chalk text-primary-ink",
        )}
      >
        {value}
      </span>
    </span>
  );
}

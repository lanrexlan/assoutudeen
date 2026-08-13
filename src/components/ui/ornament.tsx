import { cn } from "@/lib/utils";

/**
 * Islamic geometry, used as ornament rather than wallpaper.
 *
 * docs/05 forbids tiled arabesque wallpaper and mosque-silhouette backgrounds,
 * and it is right to: they read as costume. What is used here instead is the
 * underlying *geometry* — the eight-point khatim star and the interlaced grid
 * that generates it — drawn as hairlines, always masked so it fades out, and
 * always behind a contained surface.
 *
 * Everything is inline SVG encoded as a data URI: no extra requests, which
 * matters on a mid-range Android over patchy data.
 */

/** Eight-point star grid, drawn in a given stroke colour. */
const geometricTile = (stroke: string, opacity: number) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="168" height="168" viewBox="0 0 168 168">
    <g fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1">
      <path d="M84 6 L110 32 L146 32 L146 68 L162 84 L146 100 L146 136 L110 136 L84 162 L58 136 L22 136 L22 100 L6 84 L22 68 L22 32 L58 32 Z"/>
      <path d="M84 28 L118 62 L118 106 L84 140 L50 106 L50 62 Z"/>
      <path d="M6 84 L50 62 M162 84 L118 62 M6 84 L50 106 M162 84 L118 106"/>
      <path d="M84 6 L84 28 M84 162 L84 140"/>
      <circle cx="84" cy="84" r="20"/>
    </g>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

/**
 * Contained geometric field for dark surfaces. Sits inside a `relative`
 * parent, behind its content.
 */
export function OrnamentField({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "light" | "dark";
}) {
  const stroke =
    tone === "gold" ? "%23D9A441" : tone === "light" ? "%23FFFFFF" : "%232F5D3A";
  const opacity = tone === "dark" ? 0.16 : 0.22;

  return (
    <div
      aria-hidden="true"
      className={cn("ornament-field", className)}
      style={{ "--ornament-image": geometricTile(stroke, opacity) } as React.CSSProperties}
    />
  );
}

/** Static starfield. Nothing animates — no twinkle, no parallax. */
export function Starfield({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("starfield", className)} />;
}

/**
 * Section divider: a gold hairline with an eight-point star at its centre.
 * The Muezzin medallion idea, reduced to a single stroke weight.
 */
export function GiltRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("gilt-rule", className)}>
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0 text-amber"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M12 1.5 15 6 21 6 21 12 22.5 12 21 13.5 21 18 15 18 12 22.5 9 18 3 18 3 13.5 1.5 12 3 12 3 6 9 6 Z" />
      </svg>
    </div>
  );
}

/**
 * Mihrab arch frame. The signature shape: a pointed-shouldered arch with a
 * gold hairline inside it, wrapping an image or an illustration.
 */
export function ArchFrame({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "arch relative overflow-hidden border border-amber/45 bg-ink-raised p-1.5",
        className,
      )}
    >
      <div className={cn("arch relative h-full w-full overflow-hidden", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

/**
 * Round gold medallion holding an icon. Used for the "what we do" quartet and
 * the pillars row — the device both reference sites lean on.
 */
export function Medallion({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex size-14 shrink-0 items-center justify-center rounded-full",
        tone === "gold"
          ? "bg-amber text-charcoal shadow-gilt"
          : "border border-amber/50 bg-transparent text-amber",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * A short gold kicker above a heading. Small caps, wide tracking, with a rule.
 */
export function Kicker({
  children,
  className,
  align = "start",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-amber/70" />
      {children}
      {align === "center" ? (
        <span aria-hidden="true" className="h-px w-6 bg-amber/70" />
      ) : null}
    </p>
  );
}

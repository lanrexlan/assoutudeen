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

export function OrnamentField({
  className,
  tone = "accent",
}: {
  className?: string;
  tone?: "accent" | "light" | "dark";
}) {
  const stroke =
    tone === "accent" ? "%23E0A06A" : tone === "light" ? "%23FFFFFF" : "%236B2233";
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

/** The eight-point khatim star, the site's repeating glyph. */
export function StarGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <path d="M12 1.8 15 5.7h4.9v4.9L22.8 12l-2.9 1.4v4.9H15L12 22.2 9 18.3H4.1v-4.9L1.2 12l2.9-1.4V5.7H9Z" />
    </svg>
  );
}

/** Section divider: an apricot hairline with the star at its centre. */
export function RuleMark({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("rule-mark", className)}>
      <StarGlyph className="size-4 shrink-0 text-apricot" />
    </div>
  );
}

/**
 * The seal frame. The signature shape: an eight-sided cut-corner frame with an
 * apricot hairline inside it, wrapping an image or an illustration.
 *
 * clip-path clips the border away, so the hairline is the outer element and the
 * content sits in a second, inset seal.
 */
export function SealFrame({
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
      className={cn("seal relative overflow-hidden bg-apricot/45 p-px", className)}
    >
      <div className="seal relative h-full w-full overflow-hidden bg-ink-raised p-1.5">
        <div
          className={cn("seal relative h-full w-full overflow-hidden", innerClassName)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Seal-shaped medallion holding an icon. */
export function Medallion({
  children,
  className,
  tone = "accent",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "outline" | "soft";
}) {
  return (
    <span
      className={cn(
        "seal seal-sm inline-flex size-14 shrink-0 items-center justify-center",
        tone === "accent" && "bg-apricot text-charcoal shadow-accent",
        tone === "outline" && "border border-apricot/50 bg-transparent text-apricot",
        tone === "soft" && "bg-apricot/15 text-apricot-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The kicker above a heading: an icon and a label.
 *
 * It used to be `— label —`, flanked by rules. Two dashes around a word read as
 * a typewriter fallback rather than a decision, so the rules are gone and the
 * star glyph — or a section-specific icon — carries it instead.
 */
export function Kicker({
  children,
  className,
  align = "start",
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center";
  /** Optional section-specific icon. Defaults to the khatim star. */
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-apricot-dark",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span className="seal inline-flex size-7 items-center justify-center bg-apricot/18 text-apricot-dark [--c:0.4375rem]">
        {Icon ? (
          <Icon aria-hidden className="size-3.5" />
        ) : (
          <StarGlyph className="size-3.5" />
        )}
      </span>
      {children}
    </p>
  );
}

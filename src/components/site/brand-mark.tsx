import { cn } from "@/lib/utils";

/**
 * The APMF emblem — a protective roof over a growing medicinal plant, held in
 * two cupped hands.
 *
 * The supplied logo files set the wordmark in live Montserrat text, which does
 * not survive being loaded through an `<img>` tag. So the emblem is inlined
 * here as paths (no text at all) and the wordmark is set alongside it in real
 * HTML using the brand font — which is sharper, costs no extra request, and
 * lets the mark take the right colours on each background.
 *
 * The full asset package stays in `public/brand/` for press and print use.
 *
 * Brand colours, from APMF_brand_guide.md:
 *   Evergreen #0B5D3B   Emerald #18A45B
 * On dark surfaces the approved reversed treatment is used instead: the
 * structure in white, the plant in emerald.
 */

type Tone = "colour" | "reversed" | "mono";

const PALETTE: Record<Tone, { structure: string; plant: string; vein: string }> = {
  colour: { structure: "#0B5D3B", plant: "#18A45B", vein: "#FFFFFF" },
  // White roof and hands, emerald plant — for ink and photography.
  reversed: { structure: "#FFFFFF", plant: "#18A45B", vein: "#0B5D3B" },
  // Single-ink, takes the surrounding text colour.
  mono: { structure: "currentColor", plant: "currentColor", vein: "transparent" },
};

export function BrandMark({
  className,
  tone = "colour",
  title = "Assoutudeen Prophetic Medicine Foundation",
}: {
  className?: string;
  tone?: Tone;
  title?: string;
}) {
  const { structure, plant, vein } = PALETTE[tone];

  return (
    <svg
      viewBox="0 0 800 560"
      role="img"
      aria-label={title}
      className={cn("size-10", className)}
    >
      {/* Roof and chimney */}
      <g fill="none" stroke={structure} strokeLinejoin="miter">
        <path d="M108 244 L400 28 L692 244" strokeWidth="32" strokeLinecap="square" />
        <path d="M568 142 V216 H614 V170 H578" strokeWidth="28" />
      </g>

      {/* Cupped hands */}
      <g fill="none" stroke={structure} strokeWidth="30" strokeLinecap="round">
        <path d="M206 232 C145 289 143 382 194 438 C229 477 278 498 337 509" />
        <path d="M594 232 C655 289 657 382 606 438 C571 477 522 498 463 509" />
      </g>

      {/* Stem and branches */}
      <g fill="none" stroke={plant} strokeLinecap="round">
        <path d="M400 508 V161" strokeWidth="18" />
        <path d="M400 383 C355 345 320 322 277 316" strokeWidth="14" />
        <path d="M400 383 C445 345 480 322 523 316" strokeWidth="14" />
        <path d="M400 485 C348 441 307 422 251 416" strokeWidth="14" />
        <path d="M400 485 C452 441 493 422 549 416" strokeWidth="14" />
      </g>

      {/* Leaves */}
      <g fill={plant}>
        <path d="M400 95 C353 144 353 211 400 260 C447 211 447 144 400 95 Z" />
        <path d="M382 306 C329 266 278 281 254 325 C298 356 346 353 382 306 Z" />
        <path d="M418 306 C471 266 522 281 546 325 C502 356 454 353 418 306 Z" />
        <path d="M371 447 C307 397 256 407 222 451 C277 483 331 480 371 447 Z" />
        <path d="M429 447 C493 397 544 407 578 451 C523 483 469 480 429 447 Z" />
      </g>

      {/* Leaf veins */}
      <g fill="none" stroke={vein} strokeLinecap="round">
        <path d="M400 245 V137" strokeWidth="10" />
        <path d="M365 327 C335 307 312 300 286 300" strokeWidth="9" />
        <path d="M435 327 C465 307 488 300 514 300" strokeWidth="9" />
        <path d="M353 460 C317 437 288 429 254 429" strokeWidth="9" />
        <path d="M447 460 C483 437 512 429 546 429" strokeWidth="9" />
      </g>
    </svg>
  );
}

/**
 * The full lockup: emblem, APMF, and the descriptor beneath it — the horizontal
 * arrangement the brand guide specifies for website headers.
 */
export function BrandLockup({
  className,
  tone = "colour",
  descriptor = true,
}: {
  className?: string;
  tone?: Tone;
  /** Hide the descriptor line in very tight spaces. */
  descriptor?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandMark tone={tone} className="size-11 shrink-0" />
      <span className="leading-none">
        <span
          className={cn(
            "block font-brand text-xl font-extrabold uppercase tracking-[0.06em]",
            tone === "reversed" ? "text-white" : "text-olive",
          )}
        >
          APMF
        </span>
        {descriptor ? (
          <span
            className={cn(
              "mt-1.5 block font-brand text-[0.62rem] font-medium leading-tight tracking-[0.04em]",
              tone === "reversed" ? "text-sand/75" : "text-charcoal-muted",
            )}
          >
            Assoutudeen Prophetic Medicine Foundation
          </span>
        ) : null}
      </span>
    </span>
  );
}

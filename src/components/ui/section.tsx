import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Kicker, OrnamentField, Starfield } from "@/components/ui/ornament";
import { Bloom, ZellijBand } from "@/components/ui/flourish";

type SectionProps = React.ComponentProps<"section"> & {
  /**
   * Background treatment.
   *  chalk     the default page ground
   *  white    a raised, quieter band
   *  primary  the site accent
   *  ink      the deepest surface, with starfield and geometry
   */
  tone?: "chalk" | "white" | "primary" | "ink";
  width?: React.ComponentProps<typeof Container>["width"];
  contained?: boolean;
  /** Add the contained geometric ornament behind the content. */
  ornament?: boolean;
  /**
   * A tessellated band on the section's own edge, marking the seam with the
   * section before or after it. This is what stops a page reading as one
   * undifferentiated column.
   */
  band?: "top" | "bottom" | "both";
  /** Soft radial bloom behind the heading. Dark tones only. */
  bloom?: boolean;
  size?: "sm" | "md" | "lg";
};

const tones = {
  chalk: "bg-chalk text-charcoal",
  white: "bg-white text-charcoal",
  primary: "bg-primary text-on-primary",
  ink: "bg-ink text-chalk",
} as const;

/*
 * Vertical rhythm, phone first.
 *
 * These used to start at the desktop figure and stay there: 80px of padding
 * top and bottom on a 390px screen, for every section on the page. It made
 * the honey shop eight and a half screens tall and the foundation homepage
 * nearly fourteen — on the mid-range Android over patchy data that this site
 * is supposed to be built for. A phone screen is 844px; spending a fifth of
 * one on whitespace above a heading is a decision, and it was the wrong one.
 *
 * The desktop values are unchanged. Only the small end has come down.
 */
const sizes = {
  sm: "py-8 sm:py-12",
  md: "py-11 sm:py-20",
  lg: "py-14 sm:py-28",
} as const;

export function Section({
  className,
  tone = "chalk",
  width = "default",
  contained = true,
  ornament = false,
  band,
  bloom = false,
  size = "md",
  children,
  ...props
}: SectionProps) {
  const dark = tone === "ink" || tone === "primary";

  return (
    <section
      className={cn("relative overflow-hidden", tones[tone], sizes[size], className)}
      {...props}
    >
      {ornament ? (
        <>
          <OrnamentField tone={dark ? "accent" : "dark"} />
          {tone === "ink" ? <Starfield /> : null}
        </>
      ) : null}
      {bloom && dark ? <Bloom tone={tone === "primary" ? "primary" : "accent"} /> : null}
      {band === "top" || band === "both" ? (
        <ZellijBand tone={dark ? "accent" : "light"} edge="top" />
      ) : null}
      {band === "bottom" || band === "both" ? (
        <ZellijBand tone={dark ? "accent" : "light"} edge="bottom" />
      ) : null}
      <div className="relative">
        {contained ? <Container width={width}>{children}</Container> : children}
      </div>
    </section>
  );
}

/**
 * Centred section heading: kicker, title, standfirst, accent rule. This is the
 * rhythm that repeats down every page.
 */
export function SectionHeading({
  kicker,
  title,
  standfirst,
  align = "center",
  tone = "light",
  className,
}: {
  kicker?: string;
  title: string;
  standfirst?: string;
  align?: "start" | "center";
  /** `light` for chalk and white bands, `dark` for ink and primary. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? (
        <Kicker align={align} tone={tone}>
          {kicker}
        </Kicker>
      ) : null}
      <h2
        className={cn(
          "mt-4 font-display text-3xl leading-tight sm:text-4xl",
          tone === "dark" ? "text-white" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {standfirst ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-chalk/80" : "text-charcoal-muted",
          )}
        >
          {standfirst}
        </p>
      ) : null}
    </div>
  );
}

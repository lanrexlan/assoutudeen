import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Kicker, OrnamentField, Starfield } from "@/components/ui/ornament";

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
  size?: "sm" | "md" | "lg";
};

const tones = {
  chalk: "bg-chalk text-charcoal",
  white: "bg-white text-charcoal",
  primary: "bg-primary text-on-primary",
  ink: "bg-ink text-chalk",
} as const;

const sizes = {
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-20",
  lg: "py-20 sm:py-28",
} as const;

export function Section({
  className,
  tone = "chalk",
  width = "default",
  contained = true,
  ornament = false,
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
      {kicker ? <Kicker align={align}>{kicker}</Kicker> : null}
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

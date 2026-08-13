import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  /**
   * `plain` — white card on sand
   * `arch`  — arch-topped card, the signature treatment for feature cards
   * `ink`   — for dark bands
   */
  variant?: "plain" | "arch" | "ink";
};

export function Card({ className, variant = "plain", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "lift relative flex flex-col gap-4 p-6 text-charcoal",
        variant === "plain" &&
          "rounded-lg border border-sand-dark bg-white shadow-sm",
        variant === "arch" &&
          "rounded-b-lg rounded-t-[3rem] border border-sand-dark bg-white pt-8 text-center shadow-sm",
        variant === "ink" &&
          "rounded-lg border border-white/12 bg-ink-raised text-sand shadow-elevated",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-display text-lg leading-snug", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-charcoal-muted [.bg-ink-raised_&]:text-sand/75",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-sm leading-relaxed", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-auto flex items-center gap-3 pt-2", className)} {...props} />
  );
}

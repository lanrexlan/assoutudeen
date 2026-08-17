import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  /**
   * `plain` — white card on chalk
   * `seal`  — seal-topped card, the signature treatment for feature cards
   * `ink`   — for dark bands
   */
  variant?: "plain" | "seal" | "ink";
};

export function Card({
  className,
  variant = "plain",
  children,
  ...props
}: CardProps) {
  /* The seal is a clip-path, and clip-path cuts a border away at the
     diagonals. So the hairline is a 1px parent behind the white face. */
  if (variant === "seal") {
    return (
      <div
        data-slot="card"
        className={cn("lift seal relative bg-chalk-dark p-px shadow-sm", className)}
        {...props}
      >
        <div className="seal flex h-full flex-col gap-4 bg-white p-6 text-center text-charcoal">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="card"
      className={cn(
        "lift relative flex flex-col gap-4 p-6 text-charcoal",
        variant === "plain" &&
          "rounded-lg border border-chalk-dark bg-white shadow-sm",
        variant === "ink" &&
          "rounded-lg border border-white/12 bg-ink-raised text-chalk shadow-elevated",
        className,
      )}
      {...props}
    >
      {children}
    </div>
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
        "text-sm leading-relaxed text-charcoal-muted [.bg-ink-raised_&]:text-chalk/75",
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

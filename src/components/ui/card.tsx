import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-sand-dark/70 bg-white p-5 text-charcoal shadow-sm shadow-sand-dark/25",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-snug", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-charcoal-muted", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("text-sm", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-3 pt-1", className)} {...props} />
  );
}

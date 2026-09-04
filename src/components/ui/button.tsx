import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Every size meets the 44px minimum tap target.
 *
 * `donate` is the apricot call to action with charcoal text — the only
 * accessible way to use apricot, and the one button that must be recognisable
 * across all three sites.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary shadow-soft hover:bg-primary-hover hover:shadow-elevated",
        secondary:
          "border border-chalk-deep bg-white text-charcoal hover:border-charcoal-faint hover:bg-chalk",
        outline:
          "border border-current bg-transparent text-primary-ink hover:bg-primary hover:text-on-primary",
        /** For dark surfaces: a hairline that fills on hover. */
        ghostLight:
          "border border-white/30 bg-white/5 text-white hover:border-apricot hover:bg-white/10",
        ghost: "text-charcoal hover:bg-chalk-dark/60",
        donate:
          "bg-apricot text-charcoal shadow-accent hover:bg-apricot-dark hover:text-white",
        link: "text-primary-ink underline underline-offset-4 hover:no-underline",
      },
      size: {
        sm: "min-h-11 px-4 py-2",
        md: "min-h-11 px-5 py-2.5",
        lg: "min-h-12 px-7 py-3 text-base",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the single child element (a Link, for example). */
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };

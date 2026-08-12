import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Every size meets the 44px minimum tap target. `donate` is the amber call to
 * action with charcoal text — the only accessible way to use amber.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-hover",
        secondary:
          "bg-white text-charcoal border border-sand-dark hover:bg-sand",
        outline:
          "border border-current bg-transparent text-primary hover:bg-primary hover:text-on-primary",
        ghost: "text-charcoal hover:bg-sand-dark/60",
        donate: "bg-amber text-charcoal font-semibold hover:bg-amber-dark",
        link: "text-primary underline underline-offset-4 hover:no-underline",
      },
      size: {
        sm: "min-h-11 px-3 py-2",
        md: "min-h-11 px-4 py-2.5",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "size-11",
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

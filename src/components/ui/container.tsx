import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** `wide` for full-bleed sections, `prose` for long-form reading measure. */
  width?: "default" | "wide" | "prose";
};

const widths = {
  default: "max-w-6xl",
  wide: "max-w-screen-2xl",
  prose: "max-w-2xl",
} as const;

export function Container({
  className,
  width = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6", widths[width], className)}
      {...props}
    />
  );
}

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Background treatment. `sand` is the default page ground. */
  tone?: "sand" | "white" | "primary";
  width?: React.ComponentProps<typeof Container>["width"];
  /** Set false to lay out the children yourself without a Container. */
  contained?: boolean;
};

const tones = {
  sand: "bg-sand text-charcoal",
  white: "bg-white text-charcoal",
  primary: "bg-primary text-on-primary",
} as const;

export function Section({
  className,
  tone = "sand",
  width = "default",
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-10 sm:py-14", tones[tone], className)}
      {...props}
    >
      {contained ? <Container width={width}>{children}</Container> : children}
    </section>
  );
}

import { cn } from "@/lib/utils";

/**
 * Long-form reading. Tailwind's typography plugin is deliberately not used —
 * these are the only rules the content pages need, and the homepage budget is
 * under 1 MB.
 */
export function Prose({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-2xl text-base leading-relaxed text-charcoal",
        "[&_p]:mb-4",
        "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-xl",
        "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ps-6 [&_ul]:space-y-2",
        "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:space-y-2",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold",
        className,
      )}
      {...props}
    />
  );
}

/** Page heading block: eyebrow, title, standfirst. */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
}: {
  eyebrow?: string;
  title: string;
  standfirst?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-widest text-white/80">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
      {standfirst ? (
        <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
          {standfirst}
        </p>
      ) : null}
    </div>
  );
}

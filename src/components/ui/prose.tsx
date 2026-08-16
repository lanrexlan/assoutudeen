import { cn } from "@/lib/utils";
import { Kicker, OrnamentField, Starfield } from "@/components/ui/ornament";
import { Container } from "@/components/ui/container";

/**
 * Long-form reading. Tailwind's typography plugin is deliberately not used —
 * these are the only rules the content pages need, and the homepage budget is
 * under 1 MB.
 */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-2xl text-[1.0625rem] leading-[1.75] text-charcoal",
        "[&_p]:mb-5",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-charcoal",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-xl",
        "[&_ul]:mb-5 [&_ul]:space-y-3 [&_ul]:ps-1",
        // List markers are the khatim star, drawn as a masked icon rather than
        // a bullet or a dash.
        "[&_ul>li]:relative [&_ul>li]:ps-8",
        "[&_ul>li]:before:absolute [&_ul>li]:before:start-0 [&_ul>li]:before:top-[0.35em]",
        "[&_ul>li]:before:size-4 [&_ul>li]:before:bg-apricot [&_ul>li]:before:content-['']",
        "[&_ul>li]:before:[mask-image:var(--star-mask)] [&_ul>li]:before:[mask-size:contain]",
        "[&_ul>li]:before:[mask-repeat:no-repeat] [&_ul>li]:before:[mask-position:center]",
        "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:space-y-2.5",
        "[&_ol>li]:ps-1 [&_ol]:marker:font-display [&_ol]:marker:text-primary",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-apricot [&_a]:decoration-2 hover:[&_a]:decoration-primary",
        "[&_strong]:font-semibold [&_strong]:text-charcoal",
        "[&_em]:italic",
        className,
      )}
      {...props}
    />
  );
}

/**
 * The page hero used by every interior page: deep ink ground, contained
 * geometry, kicker, display title, standfirst, accent rule.
 */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
  children,
}: {
  eyebrow?: string;
  title: string;
  standfirst?: string;
  /** Optional actions or metadata beneath the standfirst. */
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-chalk sm:py-20">
      <OrnamentField tone="accent" />
      <Starfield />
      {/* A single seal of light behind the title, echoing the mihrab. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-b-[50%] bg-[radial-gradient(ellipse_at_top,rgba(224,160,106,0.16),transparent_70%)]"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow ? <Kicker>{eyebrow}</Kicker> : null}
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-white sm:text-5xl">
            {title}
          </h1>
          {standfirst ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-chalk/85">
              {standfirst}
            </p>
          ) : null}
          <span aria-hidden="true" className="mt-7 block h-0.5 w-16 rounded-full bg-apricot" />
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}

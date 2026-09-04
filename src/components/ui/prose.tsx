import { cn } from "@/lib/utils";
import {
  Kicker,
  OrnamentField,
  Starfield,
  StarGlyph,
  iconForKicker,
} from "@/components/ui/ornament";
import { Container } from "@/components/ui/container";
import { HeroImage, findHeroFile } from "@/components/ui/hero-image";
import type { HeroKey } from "@/lib/imagery";

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
        "[&_ol>li]:ps-1 [&_ol]:marker:font-display [&_ol]:marker:text-primary-ink",
        "[&_a]:font-medium [&_a]:text-primary-ink [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-apricot [&_a]:decoration-2 hover:[&_a]:decoration-primary",
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
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  standfirst?: string;
  /**
   * Hero photograph slot. The picture renders only if a file for it exists in
   * public/hero — otherwise the header keeps its ink ground and geometry, so a
   * page never waits on a photograph to look finished.
   */
  image?: HeroKey;
  /** Optional actions or metadata beneath the standfirst. */
  children?: React.ReactNode;
}) {
  const photo = image ? findHeroFile(image) : null;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-ink text-chalk",
        photo ? "py-24 sm:py-32" : "py-16 sm:py-20",
      )}
    >
      {image ? <HeroImage image={image} /> : null}
      {/* Geometry belongs to the plain header; over a photograph it is noise. */}
      {photo ? null : (
        <>
          <OrnamentField tone="accent" />
          <Starfield />
        </>
      )}
      {photo ? null : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-b-[50%] bg-[radial-gradient(ellipse_at_top,rgba(224,160,106,0.16),transparent_70%)]"
        />
      )}
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow ? <Kicker tone="dark">{eyebrow}</Kicker> : null}
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

/**
 * A heading inside long-form copy, with an icon chosen from its own words.
 *
 * Prose headings were the last bare text on the site: the kickers above each
 * band had icons, the cards had icons, and then a page of running copy broke
 * into six identical-looking subheadings. The icon is picked the same way the
 * kickers pick theirs — from the heading's own words — so nothing has to be
 * chosen by hand for every page, and an unmatched heading simply renders
 * without one rather than falling back to something arbitrary.
 */
export function ProseHeading({
  children,
  icon: Icon,
  className,
}: {
  children: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  className?: string;
}) {
  const Resolved = Icon ?? iconForKicker(children);

  return (
    <h2 className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="seal inline-flex size-8 shrink-0 items-center justify-center bg-apricot/18 text-apricot-dark [--c:0.5rem]"
      >
        {/* The star is the fallback, so a heading added later is never bare. */}
        {Resolved ? <Resolved className="size-4" /> : <StarGlyph className="size-4" />}
      </span>
      {children}
    </h2>
  );
}

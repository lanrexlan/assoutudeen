import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { HERO_IMAGES, type HeroKey, type HeroSlot } from "@/lib/imagery";

/**
 * The hero photograph for a page, if one has been supplied.
 *
 * `public/hero/<slot>.<ext>` is looked up on the server at render time. When the
 * file is there it is rendered behind the page header, dimmed enough that white
 * text keeps its contrast; when it is not, this returns null and the header
 * falls back to the ink ground and its geometry. That means photographs can be
 * added one at a time without touching a single page.
 */

const EXTENSIONS = ["jpg", "jpeg", "webp", "avif", "png"];

export function findHeroFile(key: HeroKey): string | null {
  const { slot } = HERO_IMAGES[key];
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "hero", `${slot}.${ext}`);
    if (fs.existsSync(file)) return `/hero/${slot}.${ext}`;
  }
  return null;
}

export function HeroImage({ image }: { image: HeroKey }) {
  const src = findHeroFile(image);
  if (!src) return null;

  const meta: HeroSlot = HERO_IMAGES[image];

  return (
    <>
      <Image
        src={src}
        alt={meta.alt}
        fill
        priority
        sizes="100vw"
        /* A landscape photograph in a tall phone-sized box crops to a narrow
           vertical strip. Favouring the upper-middle keeps the subject of these
           pictures — hands, a book, a jar — inside that strip instead of
           slicing between them. */
        className="object-cover object-[50%_35%] sm:object-center"
      />
      {/* Two layers: a flat wash so the whole frame darkens, and a gradient
          weighted towards the text. Together they hold white text above 4.5:1
          on any photograph likely to be used here.

          The gradient runs DOWNWARDS on a phone and ACROSS on a wider screen.
          A sideways gradient on a 390px viewport puts its dark end over the
          entire width, which hid the photograph completely — the picture was
          there, paid for and loading, and nobody could see it. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/45 sm:bg-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink/40 sm:bg-gradient-to-r sm:from-ink sm:via-ink/75 sm:to-ink/25"
      />
      {meta.credit ? (
        <p className="absolute bottom-2 end-3 z-10 text-[0.625rem] text-chalk/50">
          Photograph:{" "}
          {meta.credit.url ? (
            <a href={meta.credit.url} className="underline underline-offset-2">
              {meta.credit.name}
            </a>
          ) : (
            meta.credit.name
          )}
        </p>
      ) : null}
    </>
  );
}

/**
 * A photograph in a frame, with drawn artwork behind it until one arrives.
 *
 * Used inside SealFrame on the homepages, where the picture is the subject
 * rather than a background — so it is not dimmed and carries no scrim.
 */
export function SlotImage({
  image,
  fallback,
  className = "object-cover",
}: {
  image: HeroKey;
  fallback: React.ReactNode;
  /** `object-contain` where the whole picture matters, such as a book cover. */
  className?: string;
}) {
  const src = findHeroFile(image);
  if (!src) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={HERO_IMAGES[image].alt}
      fill
      priority
      sizes="(min-width: 1024px) 40vw, 90vw"
      className={className}
    />
  );
}

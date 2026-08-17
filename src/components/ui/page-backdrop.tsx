import Image from "next/image";
import type { HeroKey } from "@/lib/imagery";
import { findHeroFile } from "@/components/ui/hero-image";

/**
 * A photograph behind a whole page, rather than behind one band.
 *
 * It is fixed, so the page scrolls over it, and it is heavily washed out: the
 * point is a presence you notice at the edge of attention, not a picture
 * competing with the text. The page's own sections sit on top and most of them
 * are opaque, so the backdrop reads through the translucent bands only.
 *
 * `aria-hidden` throughout — it carries no information, so a screen reader has
 * nothing to gain from it, and the alt text would only be noise.
 */
export function PageBackdrop({ image }: { image: HeroKey }) {
  const src = findHeroFile(image);
  if (!src) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      {/* A chalk wash over it, so text contrast is unaffected wherever a
          translucent section lets the photograph through. */}
      <div className="absolute inset-0 bg-chalk/55" />
    </div>
  );
}

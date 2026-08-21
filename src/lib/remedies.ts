import { getPayloadClient } from "@/lib/payload";
import type { Remedy } from "@/payload-types";

/**
 * Reading the remedies library.
 *
 * Every query here is wrapped. A public page must not 500 because the database
 * is briefly unreachable or because nobody has written a chapter yet — the
 * library simply renders as empty, and the rest of the page stands. The
 * foundation's credibility rests on the site being up and honest, not on this
 * section always having something in it.
 */

export type RemedyCard = Pick<
  Remedy,
  "id" | "name" | "slug" | "arabicName" | "transliteration" | "isFree" | "bookChapterRef"
>;

const CARD_FIELDS = [
  "id",
  "name",
  "slug",
  "arabicName",
  "transliteration",
  "isFree",
  "bookChapterRef",
] as const;

/** Every remedy, for the index. Free ones first, then alphabetical. */
export async function listRemedies(search?: string): Promise<RemedyCard[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "remedies",
      limit: 200,
      sort: "name",
      depth: 0,
      select: Object.fromEntries(CARD_FIELDS.map((f) => [f, true])),
      ...(search
        ? {
            where: {
              or: [
                { name: { like: search } },
                { transliteration: { like: search } },
                { arabicName: { like: search } },
              ],
            },
          }
        : {}),
    });

    return (docs as RemedyCard[]).sort((a, b) => {
      /* Free chapters lead: they are what a first-time reader should meet, and
         a wall of locked entries is a poor welcome. */
      if (Boolean(a.isFree) !== Boolean(b.isFree)) return a.isFree ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error("[remedies] Could not list remedies:", error);
    return [];
  }
}

/** One chapter, by slug. Null when it does not exist or cannot be read. */
export async function getRemedy(slug: string): Promise<Remedy | null> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "remedies",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    return (docs[0] as Remedy) ?? null;
  } catch (error) {
    console.error(`[remedies] Could not read "${slug}":`, error);
    return null;
  }
}

/** Slugs for generateStaticParams. An empty list is a valid answer. */
export async function remedySlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "remedies",
      limit: 200,
      depth: 0,
      select: { slug: true },
    });
    return docs.map((doc) => doc.slug).filter(Boolean) as string[];
  } catch {
    return [];
  }
}

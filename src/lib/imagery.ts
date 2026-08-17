/**
 * Hero photography, one slot per page.
 *
 * Each page names a slot. If a file with that name exists under
 * `public/hero/`, it becomes the page's hero image; if it does not, the page
 * falls back to the drawn artwork and nothing looks broken. So photographs can
 * be dropped in one at a time, in any order, with no code change.
 *
 * WHAT TO PUT IN EACH SLOT
 * ------------------------
 * `search` is the query to run on Unsplash (or any stock library, or the
 * foundation's own camera roll — its own photographs are always better). Save
 * the result as `public/hero/<slot>.jpg`, at least 2000px wide, and fill in
 * `credit` so the attribution renders under the hero.
 *
 * Three rules for choosing one:
 *  1. No identifiable faces of people who have not consented — and never a
 *     stranger's face standing in for a beneficiary.
 *  2. Nothing that reads as costume: no mosque silhouettes at sunset, no
 *     lantern-and-crescent stock Islam.
 *  3. Landscape, and busy at the edges rather than the centre, because text
 *     sits over the middle of it.
 */

export type HeroSlot = {
  /** File base name under public/hero/. */
  slot: string;
  /** Required. Describes the photograph, not the page. */
  alt: string;
  /** Suggested stock search, for whoever sources the picture. */
  search: string;
  /** Fill in when a photograph is added, if its licence asks for credit. */
  credit?: { name: string; url?: string };
};

export const HERO_IMAGES = {
  home: {
    slot: "home",
    alt: "Hands cupped together in the light",
    search: "cupped hands light minimal — or open hands giving, no faces",
  },
  about: {
    slot: "about",
    alt: "An open Qur'an on a wooden reading stand",
    search: "open quran rehal wooden book stand daylight",
  },
  founder: {
    slot: "founder",
    alt: "A desk with books, a notebook and a pen",
    search: "scholar desk books notebook pen warm daylight no people",
  },
  structure: {
    slot: "structure",
    alt: "Interlocking geometric tilework",
    search: "islamic geometric tile pattern muted plaster",
  },
  accountability: {
    slot: "accountability",
    alt: "A ledger open on a desk beside a calculator",
    search: "ledger notebook accounts desk calculator overhead",
  },
  ourWork: {
    slot: "our-work",
    alt: "A market street at midday",
    search: "nigerian market street traders daylight documentary",
  },
  empowerment: {
    slot: "empowerment",
    alt: "A tailor's workshop with a sewing machine",
    search: "small business workshop sewing machine tailor africa",
  },
  donate: {
    slot: "donate",
    alt: "A hand placing a note into a box",
    search: "giving donation hands box charity no faces",
  },
  propheticMedicine: {
    slot: "prophetic-medicine",
    alt: "Black seed, honey and dates on a dark surface",
    search: "black seed nigella honey dates still life dark background",
  },
  shop: {
    slot: "shop",
    alt: "A stack of books on a plain surface",
    search: "stacked books minimal still life warm light",
  },
  media: {
    slot: "media",
    alt: "A microphone in a quiet room",
    search: "microphone lecture recording setup warm minimal",
  },
  contact: {
    slot: "contact",
    alt: "A street in Ede, Osun State",
    search: "ede osun nigeria street town daylight",
  },
  // Dawah Institute
  dawahHome: {
    slot: "dawah-home",
    alt: "A circle of students seated for a lesson",
    search: "study circle seated learning from behind, no faces",
  },
  programmes: {
    slot: "programmes",
    alt: "Notebooks and pens laid out before a class",
    search: "notebooks pens class desk overhead warm",
  },
  schedule: {
    slot: "schedule",
    alt: "Evening sky just after sunset",
    search: "dusk sky after sunset minimal gradient",
  },
  teachers: {
    slot: "teachers",
    alt: "An open book held in two hands",
    search: "hands holding open book reading no face",
  },
  library: {
    slot: "library",
    alt: "Shelves of books seen end-on",
    search: "library shelves books rows warm",
  },
  // Honey Enterprise
  honeyHome: {
    slot: "honey-home",
    alt: "Honey being poured from a dipper",
    search: "honey pouring dipper jar macro warm",
  },
  ourHoney: {
    slot: "our-honey",
    alt: "Beehives standing in a field",
    search: "beehives apiary field africa daylight",
  },
  ambassadors: {
    slot: "ambassadors",
    alt: "Jars of honey lined up on a shelf",
    search: "honey jars row shelf natural light",
  },
} as const satisfies Record<string, HeroSlot>;

export type HeroKey = keyof typeof HERO_IMAGES;

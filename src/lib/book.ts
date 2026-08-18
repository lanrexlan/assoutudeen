/**
 * The book. One source of truth so the title is never spelled two ways.
 */
export const BOOK = {
  title: "Treasure of the Prophetic Medicine",
  author: "Imam Engr. Abd'Wasiu Tirmidhi Adeniyi (Abu Mubaashir)",
  pages: 175,
  remedies: 45,
  firstProduced: "August 2023",
  /** Money is kobo as an integer, everywhere. ₦5,000 for the printed copy. */
  priceKobo: 500_000,
  pitch:
    "Around forty-five natural remedies from the Qur'an and the Sunnah, each traced to its evidence and explained.",
  /** How each chapter is built — the structure that makes the book worth reading. */
  chapterStructure: [
    "The Qur'anic verse, where one applies, in Arabic with translation and reference",
    "The hadith evidence, in Arabic with translation and full source citation",
    "Ibn al-Qayyim's commentary from At-Tibb an-Nabawiyy",
    "Nutritional composition",
    "Traditional uses",
    "Precautions, and footnoted references",
  ],
  /** A sample of the remedies covered, for the contents preview. */
  remedySample: [
    "Olive oil",
    "Black seed",
    "Honey",
    "Zamzam",
    "Dates",
    "Talbīna",
    "Garlic",
    "Vinegar",
    "Ginger",
    "Aloe vera",
    "Pomegranate",
    "Figs",
    "Miswāk",
    "Sidr",
    "Henna",
    "Fenugreek",
    "Barley",
    "Milk",
    "Kohl (ithmid)",
    "Senna",
  ],
} as const;

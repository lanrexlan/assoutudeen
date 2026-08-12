import type { CollectionConfig } from "payload";
import { adminOrEditor, anyone } from "@/payload/access/roles";
import { slugField } from "@/payload/fields/slug";

/**
 * One chapter of *Endless Blessings From The Creator* per document.
 *
 * These are EDUCATIONAL pages. They may quote Qur'an, hadith and Ibn al-Qayyim
 * freely — and they must never be merged with, or linked as a claim about, a
 * honey product page (NAFDAC). Every rendered remedy carries the standard
 * disclaimer.
 */
export const Remedies: CollectionConfig = {
  slug: "remedies",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "arabicName", "isFree", "bookChapterRef"],
    group: "Foundation",
  },
  access: { read: anyone, create: adminOrEditor, update: adminOrEditor, delete: adminOrEditor },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "34%" } },
        {
          name: "arabicName",
          type: "text",
          admin: {
            width: "33%",
            description: "Arabic, with diacritics as in the book.",
          },
        },
        {
          name: "transliteration",
          type: "text",
          admin: { width: "33%", placeholder: "ḥabbat as-sawdāʾ" },
        },
      ],
    },
    slugField("name"),
    {
      name: "quranVerse",
      type: "group",
      label: "Qur'an verse",
      fields: [
        { name: "arabic", type: "textarea" },
        { name: "translation", type: "textarea" },
        { name: "reference", type: "text" },
      ],
    },
    {
      name: "hadiths",
      type: "array",
      admin: {
        description:
          "Full citation on every hadith. Never publish one without its source.",
      },
      fields: [
        {
          name: "arabic",
          type: "textarea",
          required: true,
          admin: { description: "Verbatim from the source. Diacritics preserved." },
        },
        { name: "translation", type: "textarea", required: true },
        {
          name: "source",
          type: "text",
          required: true,
          admin: { placeholder: "Sahih al-Bukhari 5688" },
        },
        {
          name: "gradingNote",
          type: "text",
          admin: { description: "Grading and who graded it, where the book gives one." },
        },
      ],
    },
    {
      name: "ibnQayyimCommentary",
      type: "richText",
      label: "Ibn al-Qayyim commentary",
      admin: { description: "From At-Tibb an-Nabawiyy, as quoted in the book." },
    },
    { name: "composition", type: "richText" },
    { name: "traditionalUses", type: "richText" },
    {
      name: "precautions",
      type: "richText",
      admin: {
        description:
          "Cautions and contraindications. This page is not medical advice and makes no claim to cure.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "isFree",
          type: "checkbox",
          defaultValue: false,
          admin: {
            width: "50%",
            description: "10–15 chapters are free; the rest sell the book.",
          },
        },
        {
          name: "bookChapterRef",
          type: "text",
          admin: { width: "50%", placeholder: "Chapter 12, p. 63" },
        },
      ],
    },
    {
      name: "relatedProduct",
      type: "relationship",
      relationTo: "products",
      admin: {
        description:
          "Optional cross-reference. The product page itself must carry no health claim.",
      },
    },
    { name: "featuredImage", type: "upload", relationTo: "media" },
  ],
};

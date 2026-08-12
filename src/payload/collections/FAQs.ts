import type { CollectionConfig } from "payload";
import { adminOrEditor, publishedOrAuthenticated } from "@/payload/access/roles";
import { statusField } from "@/payload/fields/status";

/** Feeds the FAQPage JSON-LD in session 8. */
export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "site", "order"],
    group: "Content",
  },
  access: {
    read: publishedOrAuthenticated,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "richText", required: true },
    {
      name: "site",
      type: "select",
      required: true,
      defaultValue: "foundation",
      index: true,
      options: [
        { label: "Foundation", value: "foundation" },
        { label: "Dawah Institute", value: "dawah" },
        { label: "Honey Enterprise", value: "honey" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
    statusField(),
  ],
};

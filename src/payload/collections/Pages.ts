import type { CollectionConfig } from "payload";
import { adminOrEditor, publishedOrAuthenticated } from "@/payload/access/roles";
import { slugField } from "@/payload/fields/slug";
import { statusField } from "@/payload/fields/status";

/** Editable static pages (About, Accountability, policies, and so on). */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "site", "status"],
    group: "Content",
  },
  access: {
    read: publishedOrAuthenticated,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    statusField(),
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
    { name: "body", type: "richText", required: true },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text", maxLength: 70 },
        { name: "metaDescription", type: "textarea", maxLength: 180 },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
  ],
};

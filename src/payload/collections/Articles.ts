import type { CollectionConfig } from "payload";
import { adminOrEditor, publishedOrAuthenticated } from "@/payload/access/roles";
import { slugField } from "@/payload/fields/slug";
import { statusField } from "@/payload/fields/status";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
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
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", description: "Stored UTC, displayed Africa/Lagos." },
    },
    {
      name: "site",
      type: "select",
      defaultValue: "foundation",
      options: [
        { label: "Foundation", value: "foundation" },
        { label: "Dawah Institute", value: "dawah" },
        { label: "Honey Enterprise", value: "honey" },
      ],
      admin: { position: "sidebar", description: "Which of the three sites publishes this." },
    },
    { name: "excerpt", type: "textarea", maxLength: 300 },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "author", type: "relationship", relationTo: "team-members" },
    { name: "body", type: "richText", required: true },
    {
      name: "relatedRemedies",
      type: "relationship",
      relationTo: "remedies",
      hasMany: true,
    },
  ],
};

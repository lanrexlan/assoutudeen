import type { CollectionConfig } from "payload";
import { adminOrEditor, anyone } from "@/payload/access/roles";
import { slugField } from "@/payload/fields/slug";

export const Teachers: CollectionConfig = {
  slug: "teachers",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "honorific"],
    group: "Dawah Institute",
  },
  access: { read: anyone, create: adminOrEditor, update: adminOrEditor, delete: adminOrEditor },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Spelled exactly as in docs/01. Do not normalise the apostrophes." },
    },
    slugField("name"),
    {
      name: "honorific",
      type: "text",
      admin: { placeholder: "Imam Engr. / Shaykh" },
    },
    { name: "bio", type: "richText" },
    {
      name: "credentials",
      type: "array",
      fields: [{ name: "credential", type: "text", required: true }],
    },
    { name: "photo", type: "upload", relationTo: "media" },
  ],
};

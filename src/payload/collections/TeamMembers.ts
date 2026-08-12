import type { CollectionConfig } from "payload";
import { adminOrEditor, anyone } from "@/payload/access/roles";
import { slugField } from "@/payload/fields/slug";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    group: "Foundation",
  },
  access: { read: anyone, create: adminOrEditor, update: adminOrEditor, delete: adminOrEditor },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    {
      type: "row",
      fields: [
        {
          name: "honorific",
          type: "text",
          admin: { width: "50%", placeholder: "Imam Engr." },
        },
        {
          name: "role",
          type: "text",
          required: true,
          admin: { width: "50%", placeholder: "Founder and Chief Instructor" },
        },
      ],
    },
    { name: "bio", type: "richText" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};

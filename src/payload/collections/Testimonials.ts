import type { CollectionConfig } from "payload";
import { adminOrEditor, publishedOrAuthenticated } from "@/payload/access/roles";
import { statusField } from "@/payload/fields/status";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "attribution",
    defaultColumns: ["attribution", "site", "status"],
    group: "Content",
  },
  access: {
    read: publishedOrAuthenticated,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    {
      name: "attribution",
      type: "text",
      required: true,
      admin: {
        description:
          'How the person is credited. Use a category ("A student, Ede") unless consent to be named is recorded.',
      },
    },
    {
      name: "consentRecorded",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Written consent to publish this quote is on file." },
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
      admin: { position: "sidebar" },
    },
    statusField(),
  ],
};

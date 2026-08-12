import type { CollectionConfig } from "payload";
import { adminOrEditor, adminOrShopManager, anyone } from "@/payload/access/roles";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: anyone,
    create: ({ req }) => adminOrEditor({ req }) || adminOrShopManager({ req }),
    update: ({ req }) => adminOrEditor({ req }) || adminOrShopManager({ req }),
    delete: adminOrEditor,
  },
  upload: {
    // Cloudinary stores the file; Payload keeps the record. Sizes are named so
    // next/image can request the right one on a mid-range Android.
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "hero", width: 1600 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe the image for screen readers. Required — WCAG 2.1 AA.",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: { description: "Photographer or source, if attribution is owed." },
    },
    {
      name: "consentRecorded",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Tick ONLY if separate written consent to publish this person's image is on file (NDPA 2023). Beneficiary photos may not be published without it.",
      },
    },
  ],
};

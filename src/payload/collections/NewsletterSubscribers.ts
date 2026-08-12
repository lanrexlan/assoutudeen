import type { CollectionConfig } from "payload";
import { adminOnly, adminOrEditor } from "@/payload/access/roles";

/**
 * Personal data under NDPA 2023: consent is explicit, recorded with a
 * timestamp, and never pre-ticked on the form.
 */
export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "status", "subscribedAt"],
    group: "Administration",
  },
  access: {
    read: adminOrEditor,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "name", type: "text" },
    {
      name: "consent",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: {
        description:
          "Explicit opt-in. The public form ships unticked — never pre-tick it.",
      },
    },
    {
      name: "consentTimestamp",
      type: "date",
      admin: { description: "When consent was given. Stored UTC." },
    },
    {
      name: "source",
      type: "text",
      admin: { description: "Which page or campaign the subscriber came from." },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "subscribed",
      options: [
        { label: "Subscribed", value: "subscribed" },
        { label: "Unsubscribed", value: "unsubscribed" },
        { label: "Bounced", value: "bounced" },
      ],
    },
    { name: "subscribedAt", type: "date" },
  ],
};

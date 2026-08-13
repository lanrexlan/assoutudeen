import type { CollectionConfig } from "payload";
import { adminOnly } from "@/payload/access/roles";
import { koboField } from "@/payload/fields/money";

/**
 * Monthly Empowerment Fund pledges.
 *
 * Admin only — donor contact details and amounts. Created by the public form
 * via the server action; a Paystack subscription is attached in session 5, and
 * manual monthly transfers are supported from the start because many Nigerian
 * donors will not use a card.
 */
export const Pledges: CollectionConfig = {
  slug: "pledges",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "amountKobo", "method", "status", "createdAt"],
    group: "Finance",
  },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    koboField({
      name: "amountKobo",
      label: "Monthly amount",
      required: true,
      admin: { description: "Pledged amount per month, in kobo." },
    }),
    {
      name: "method",
      type: "select",
      required: true,
      defaultValue: "transfer",
      options: [
        { label: "Card (Paystack subscription)", value: "card" },
        { label: "Manual monthly transfer", value: "transfer" },
      ],
    },
    {
      name: "purpose",
      type: "select",
      required: true,
      defaultValue: "empowerment",
      options: [
        { label: "Empowerment Fund", value: "empowerment" },
        { label: "Zakat (separate fund)", value: "zakat" },
        { label: "Sadaqah jāriyah", value: "sadaqah" },
      ],
    },
    { name: "message", type: "textarea" },
    {
      name: "consent",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: { description: "Consent to be contacted about the pledge. Unticked on the form." },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Active", value: "active" },
        { label: "Lapsed", value: "lapsed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};

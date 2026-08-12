import type { CollectionConfig } from "payload";
import { adminOrEditor, anyone } from "@/payload/access/roles";
import { koboField } from "@/payload/fields/money";
import { slugField } from "@/payload/fields/slug";

/**
 * Historical public appeals.
 *
 * APMF has STOPPED running public appeals (docs/11) — the model is now the
 * Monthly Empowerment Fund. This collection exists to render the 2023 record
 * honestly, including the shortfalls. Do not build new per-beneficiary
 * progress bars on the live site from it.
 *
 * A beneficiary's real name is only ever published where recorded consent
 * exists; `isAnonymous` plus `anonymousLabel` is the default (NDPA 2023).
 */
export const Appeals: CollectionConfig = {
  slug: "appeals",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "openedDate"],
    group: "Foundation",
    description:
      "Historical record of the 2023 appeals. New assistance is handled by the Empowerment Fund.",
  },
  access: { read: anyone, create: adminOrEditor, update: adminOrEditor, delete: adminOrEditor },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      type: "row",
      fields: [
        {
          name: "isAnonymous",
          type: "checkbox",
          defaultValue: true,
          admin: {
            width: "50%",
            description:
              "Default. Untick only with recorded written consent to publish the name.",
          },
        },
        {
          name: "category",
          type: "select",
          required: true,
          options: [
            { label: "Medical", value: "medical" },
            { label: "Financial", value: "financial" },
            { label: "Shelter", value: "shelter" },
            { label: "Project", value: "project" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "beneficiaryName",
      type: "text",
      admin: {
        condition: (data) => !data?.isAnonymous,
        description: "Only with consent on file.",
      },
    },
    {
      name: "anonymousLabel",
      type: "text",
      admin: {
        condition: (data) => Boolean(data?.isAnonymous),
        description: 'Category description shown instead of a name, e.g. "A revert sister".',
      },
    },
    { name: "needDescription", type: "richText", required: true },
    {
      name: "hospital",
      type: "text",
      admin: { condition: (data) => data?.category === "medical" },
    },
    {
      type: "row",
      fields: [
        koboField({
          name: "targetAmountKobo",
          label: "Target amount",
          admin: { width: "50%" },
        }),
        koboField({
          name: "raisedAmountKobo",
          label: "Raised amount",
          defaultValue: 0,
          admin: {
            width: "50%",
            description:
              "Kobo. Incremented only by the verified Paystack webhook — never edited to flatter a shortfall.",
          },
        }),
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "closed",
          options: [
            { label: "Active", value: "active" },
            { label: "Closed", value: "closed" },
            { label: "Partially met", value: "partially-met" },
          ],
          admin: { width: "34%" },
        },
        {
          name: "openedDate",
          type: "date",
          required: true,
          admin: { width: "33%", date: { pickerAppearance: "dayOnly" } },
        },
        {
          name: "closedDate",
          type: "date",
          admin: { width: "33%", date: { pickerAppearance: "dayOnly" } },
        },
      ],
    },
    {
      name: "photos",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: {
        description:
          "Only images with recorded consent. Check the consent flag on each item.",
      },
    },
    {
      name: "updates",
      type: "array",
      labels: { singular: "Update", plural: "Updates" },
      fields: [
        { name: "date", type: "date", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "richText", required: true },
      ],
    },
    { name: "closingReport", type: "richText" },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};

import type { CollectionConfig } from "payload";
import { adminOrEditor, anyone } from "@/payload/access/roles";
import { koboField } from "@/payload/fields/money";

/**
 * The accountability report for a fiscal year. Category totals must reconcile
 * exactly to `totalRaisedKobo` — a hook checks this and refuses to save a
 * report that does not add up.
 */
export const AnnualReports: CollectionConfig = {
  slug: "annual-reports",
  admin: {
    useAsTitle: "fiscalYear",
    defaultColumns: ["fiscalYear", "totalRaisedKobo", "beneficiaryCount"],
    group: "Foundation",
  },
  access: { read: anyone, create: adminOrEditor, update: adminOrEditor, delete: adminOrEditor },
  fields: [
    {
      name: "fiscalYear",
      type: "number",
      required: true,
      unique: true,
      index: true,
      min: 2000,
      max: 2100,
      admin: { description: "e.g. 2023. One report per year." },
    },
    { name: "introduction", type: "richText" },
    {
      name: "quranVerse",
      type: "group",
      label: "Qur'an verse",
      admin: {
        description:
          "Copy the Arabic verbatim from the source, diacritics intact. Never retype it.",
      },
      fields: [
        { name: "arabic", type: "textarea" },
        { name: "translation", type: "textarea" },
        {
          name: "reference",
          type: "text",
          admin: { placeholder: "Qur'an, At-Tawbah 9:105" },
        },
      ],
    },
    {
      name: "beneficiaries",
      type: "array",
      admin: {
        description:
          "Names appear here only where consent is recorded; otherwise use a category description.",
      },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "date", type: "date", required: true },
        { name: "need", type: "textarea", required: true },
        { name: "hospital", type: "text" },
        koboField({ name: "raisedKobo", label: "Raised" }),
        koboField({ name: "targetKobo", label: "Target" }),
      ],
    },
    {
      name: "surplusAssistances",
      type: "array",
      label: "Assistances from surplus funds",
      fields: [
        { name: "description", type: "text", required: true },
        koboField({ name: "amountKobo", label: "Amount" }),
      ],
    },
    {
      type: "row",
      fields: [
        koboField({
          name: "totalRaisedKobo",
          label: "Total raised",
          required: true,
          admin: { width: "50%" },
        }),
        {
          name: "beneficiaryCount",
          type: "number",
          required: true,
          min: 0,
          admin: { width: "50%" },
        },
      ],
    },
    { name: "closingNote", type: "richText" },
    {
      name: "pdfUpload",
      type: "upload",
      relationTo: "media",
      admin: { description: "The signed report as published, if there is one." },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        const beneficiaries = (data.beneficiaries ?? []) as {
          raisedKobo?: number | null;
        }[];
        const surplus = (data.surplusAssistances ?? []) as {
          amountKobo?: number | null;
        }[];

        const sum =
          beneficiaries.reduce((t, b) => t + (b.raisedKobo ?? 0), 0) +
          surplus.reduce((t, s) => t + (s.amountKobo ?? 0), 0);

        // Transparency is the value proposition: the parts must equal the whole.
        if (typeof data.totalRaisedKobo === "number" && sum !== data.totalRaisedKobo) {
          throw new Error(
            `Report does not reconcile: line items total ${sum} kobo but totalRaisedKobo is ${data.totalRaisedKobo} kobo.`,
          );
        }
        return data;
      },
    ],
  },
};

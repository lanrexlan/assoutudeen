import type { CollectionConfig } from "payload";
import { adminOnly } from "@/payload/access/roles";
import { koboField } from "@/payload/fields/money";

/**
 * Requests for help from the Monthly Empowerment Fund.
 *
 * These carry HEALTH DATA — a special category under the NDPA 2023 — so they
 * are admin-only, and not visible to editors or shop managers at all.
 *
 * Two consents are recorded separately, because they are separate things:
 * consent to have the request processed at all, and consent to be named
 * publicly if the case is ever written about. The second is off by default and
 * publishing anything identifiable without it is not permitted.
 */
export const AssistanceRequests: CollectionConfig = {
  slug: "assistance-requests",
  labels: { singular: "Assistance request", plural: "Assistance requests" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "createdAt"],
    group: "Finance",
    description: "Contains health data. Handle under the NDPA 2023.",
  },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [
    { name: "name", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", required: true, admin: { width: "50%" } },
        { name: "whatsapp", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "email", type: "email" },
    {
      type: "row",
      fields: [
        { name: "state", type: "text", admin: { width: "50%" } },
        { name: "lga", type: "text", label: "LGA", admin: { width: "50%" } },
      ],
    },
    {
      name: "category",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Medical", value: "medical" },
        { label: "Financial", value: "financial" },
        { label: "Shelter", value: "shelter" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "need",
      type: "textarea",
      required: true,
      admin: { description: "In the applicant's own words." },
    },
    {
      name: "hospital",
      type: "text",
      admin: { condition: (data) => data?.category === "medical" },
    },
    koboField({ name: "amountRequestedKobo", label: "Amount requested" }),
    {
      type: "row",
      fields: [
        { name: "refereeName", type: "text", admin: { width: "50%" } },
        { name: "refereePhone", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "documents",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: { description: "Hospital bill, diagnosis or similar, if supplied." },
    },
    {
      name: "consentToProcess",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: {
        description:
          "Consent to the foundation storing and verifying these details. Required, and unticked on the form.",
      },
    },
    {
      name: "consentToBeNamed",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "SEPARATE consent to be named or photographed publicly. Off by default — nothing identifiable is published without it.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Verifying", value: "verifying" },
        { label: "Approved", value: "approved" },
        { label: "Assisted", value: "assisted" },
        { label: "Declined", value: "declined" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "internalNotes",
      type: "textarea",
      admin: { position: "sidebar", description: "Verification notes. Never published." },
    },
  ],
};

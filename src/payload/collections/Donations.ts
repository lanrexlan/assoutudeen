import type { CollectionConfig } from "payload";
import { adminOnly } from "@/payload/access/roles";
import { koboField } from "@/payload/fields/money";

/**
 * The donation ledger. ADMIN ONLY — editors and shop managers must never see
 * donor names, emails or amounts (NDPA 2023, docs/06).
 *
 * ZAKAT IS A SEPARATE FUND. It is recorded here with `purpose: "zakat"` and
 * must always be queried as its own ledger:
 *
 *   payload.find({ collection: "donations",
 *                  where: { purpose: { equals: "zakat" } } })
 *
 * Never sum across purposes to produce a "total donations" figure that mixes
 * zakat with sadaqah or general giving, and never spend from it outside the
 * eight Qur'anic categories.
 *
 * Rows are created by the verified Paystack webhook, not by the browser
 * callback, and the webhook is idempotent on `paystackRef`.
 */
export const Donations: CollectionConfig = {
  slug: "donations",
  admin: {
    useAsTitle: "reference",
    defaultColumns: ["reference", "purpose", "amountKobo", "status", "createdAt"],
    group: "Finance",
    description:
      "Zakat is a separate fund — filter by purpose before reporting any total.",
  },
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  indexes: [{ fields: ["purpose", "status"] }],
  fields: [
    {
      name: "reference",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Our internal reference." },
    },
    koboField({ name: "amountKobo", label: "Amount", required: true }),
    {
      name: "purpose",
      type: "select",
      required: true,
      index: true,
      options: [
        { label: "Appeal", value: "appeal" },
        { label: "Zakat (separate fund)", value: "zakat" },
        { label: "Sadaqah", value: "sadaqah" },
        { label: "General", value: "general" },
        { label: "Dawah scholarship", value: "dawah-scholarship" },
      ],
      admin: {
        description:
          "Zakat is ring-fenced: it has its own ledger and its own eligibility rules.",
      },
    },
    {
      name: "appealRef",
      type: "relationship",
      relationTo: "appeals",
      admin: { condition: (data) => data?.purpose === "appeal" },
    },
    {
      type: "row",
      fields: [
        { name: "donorName", type: "text", admin: { width: "50%" } },
        { name: "donorEmail", type: "email", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "isRecurring",
          type: "checkbox",
          defaultValue: false,
          admin: { width: "50%", description: "Paystack subscription or standing transfer." },
        },
        {
          name: "isAnonymous",
          type: "checkbox",
          defaultValue: false,
          admin: { width: "50%", description: "Donor asked not to be named publicly." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "pending",
          index: true,
          options: [
            { label: "Pending", value: "pending" },
            { label: "Paid (webhook verified)", value: "paid" },
            { label: "Awaiting transfer confirmation", value: "awaiting-transfer" },
            { label: "Failed", value: "failed" },
            { label: "Refunded", value: "refunded" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "paystackRef",
          type: "text",
          unique: true,
          index: true,
          admin: {
            width: "50%",
            description:
              "Paystack transaction reference. Unique — this is what makes the webhook idempotent.",
          },
        },
      ],
    },
    {
      name: "channel",
      type: "select",
      defaultValue: "paystack",
      options: [
        { label: "Paystack", value: "paystack" },
        { label: "Bank transfer", value: "bank-transfer" },
      ],
    },
  ],
};

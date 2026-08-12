import type { CollectionConfig } from "payload";
import { adminOnly, adminOrShopManager } from "@/payload/access/roles";
import { koboField } from "@/payload/fields/money";

/**
 * Honey orders. Customer data and money — visible to admins and shop managers
 * only, never to editors.
 *
 * Referral attribution rules (session 12, docs/09) that this shape has to
 * support: only customers with no prior confirmed purchase count
 * (`isNewCustomer`), one code per customer with the FIRST confirmed code
 * winning, a 5-litre minimum qualifying order, and only paid + confirmed
 * orders counting towards the leaderboard.
 */
export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "reference",
    defaultColumns: ["reference", "totalKobo", "status", "referralCode", "createdAt"],
    group: "Finance",
  },
  access: {
    read: adminOrShopManager,
    create: adminOrShopManager,
    update: adminOrShopManager,
    delete: adminOnly,
  },
  indexes: [{ fields: ["referralCode", "status"] }],
  fields: [
    {
      name: "reference",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        { name: "quantity", type: "number", required: true, min: 1 },
        {
          name: "litres",
          type: "number",
          required: true,
          min: 0,
          admin: { description: "Total litres for this line. Drives the 5 L minimum." },
        },
        koboField({
          name: "unitPriceKobo",
          label: "Unit price",
          required: true,
          admin: { description: "Price at the time of ordering, in kobo." },
        }),
      ],
    },
    {
      name: "customer",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "phone", type: "text", required: true, index: true },
        { name: "email", type: "email" },
        { name: "address", type: "textarea" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "isNewCustomer",
          type: "checkbox",
          defaultValue: false,
          admin: {
            width: "50%",
            description:
              "No prior confirmed purchase. Set by the attribution logic, not by hand.",
          },
        },
        {
          name: "referralCode",
          type: "text",
          index: true,
          admin: {
            width: "50%",
            description: "First confirmed code wins; it is never reassigned afterwards.",
          },
        },
      ],
    },
    koboField({ name: "totalKobo", label: "Order total", required: true }),
    {
      type: "row",
      fields: [
        {
          name: "deliveryZone",
          type: "text",
          admin: { width: "50%", description: "Zones and rates still to be confirmed." },
        },
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
            { label: "Confirmed", value: "confirmed" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Refunded", value: "refunded" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "paystackRef",
      type: "text",
      unique: true,
      index: true,
      admin: { description: "Unique — makes the payment webhook idempotent." },
    },
  ],
};

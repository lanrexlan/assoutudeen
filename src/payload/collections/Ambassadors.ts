import type { CollectionConfig } from "payload";
import {
  adminOrShopManager,
  adminOrShopManagerField,
  anyone,
} from "@/payload/access/roles";
import { slugify } from "@/payload/fields/slug";

/**
 * Referral codes for the honey contest. The leaderboard is public, so name and
 * code are readable; phone and email are not (see field-level access below).
 */
export const Ambassadors: CollectionConfig = {
  slug: "ambassadors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "code", "status", "registeredAt"],
    group: "Honey Enterprise",
  },
  access: {
    read: anyone,
    create: adminOrShopManager,
    update: adminOrShopManager,
    delete: adminOrShopManager,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "phone",
      type: "text",
      required: true,
      access: { read: adminOrShopManagerField },
      admin: { description: "Not published on the leaderboard." },
    },
    {
      name: "email",
      type: "email",
      access: { read: adminOrShopManagerField },
    },
    {
      name: "code",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { placeholder: "HONEY-KEMI" },
      hooks: {
        beforeValidate: [
          ({ value }) =>
            typeof value === "string" ? slugify(value).toUpperCase() : value,
        ],
      },
    },
    { name: "registeredAt", type: "date", required: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      index: true,
      options: [
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
        { label: "Retired", value: "retired" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
      access: { read: adminOrShopManagerField },
    },
  ],
};

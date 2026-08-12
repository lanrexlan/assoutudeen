import type { CollectionConfig } from "payload";
import { ROLES, adminFieldOnly, adminOnly, isAdmin } from "@/payload/access/roles";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Administration",
  },
  access: {
    // Only admins manage accounts; everyone may read and update themselves.
    create: adminOnly,
    delete: adminOnly,
    read: ({ req }) =>
      isAdmin(req.user) ? true : { id: { equals: req.user?.id ?? "" } },
    update: ({ req }) =>
      isAdmin(req.user) ? true : { id: { equals: req.user?.id ?? "" } },
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Shop manager", value: "shop-manager" },
      ],
      // Nobody promotes themselves.
      access: { create: adminFieldOnly, update: adminFieldOnly },
      admin: {
        description:
          "Editors cannot see donations or orders. Shop managers handle the honey shop only.",
      },
    },
  ],
};

export const ROLE_VALUES = ROLES;

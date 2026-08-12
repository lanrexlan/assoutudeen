import type { SelectField } from "payload";

/** Draft/published switch, read by the `publishedOrAuthenticated` access rule. */
export const statusField = (): SelectField => ({
  name: "status",
  type: "select",
  required: true,
  defaultValue: "draft",
  index: true,
  options: [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
  ],
  admin: { position: "sidebar" },
});

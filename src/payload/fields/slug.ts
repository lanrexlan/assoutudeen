import type { TextField } from "payload";

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** URL slug, derived from another field when left blank. */
export const slugField = (from = "title"): TextField => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "URL segment. Generated from the title if left blank.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === "string" && value.length > 0) return slugify(value);
        const source = (data as Record<string, unknown> | undefined)?.[from];
        return typeof source === "string" ? slugify(source) : value;
      },
    ],
  },
});

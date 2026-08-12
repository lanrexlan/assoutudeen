import type { CollectionConfig } from "payload";
import { adminOrShopManager, anyone } from "@/payload/access/roles";
import { koboField } from "@/payload/fields/money";
import { slugField } from "@/payload/fields/slug";

/**
 * Honey is a FOOD product. Nothing on a product page may claim to treat,
 * prevent or cure any disease (NAFDAC). Health and prophetic-medicine content
 * belongs in Remedies and Articles, which are educational and separate.
 */
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "volumeLitres", "retailPriceKobo", "inStock"],
    group: "Honey Enterprise",
    description: "No health claims on product content — educational pages only.",
  },
  access: {
    read: anyone,
    create: adminOrShopManager,
    update: adminOrShopManager,
    delete: adminOrShopManager,
  },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    {
      name: "description",
      type: "richText",
      admin: {
        description:
          "Describe the honey — source, colour, taste, pack. No claim that it treats, prevents or cures anything.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "volumeLitres",
          type: "number",
          required: true,
          min: 0,
          admin: { width: "50%", description: "Honey is sold by volume, in litres." },
        },
        {
          name: "packSize",
          type: "text",
          admin: { width: "50%", placeholder: "1 L jar, 5 L keg" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        koboField({
          name: "retailPriceKobo",
          label: "Retail price",
          required: true,
          admin: { width: "50%" },
        }),
        koboField({
          name: "wholesalePriceKobo",
          label: "Wholesale price",
          admin: { width: "50%" },
        }),
      ],
    },
    {
      name: "minWholesaleLitres",
      type: "number",
      min: 0,
      defaultValue: 5,
      admin: {
        description:
          "Litres needed for wholesale pricing. Also the qualifying minimum for ambassador referrals.",
      },
    },
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "nafdacNumber",
      type: "text",
      admin: { description: "NAFDAC registration number, where one is held." },
    },
    {
      name: "inStock",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
  ],
};

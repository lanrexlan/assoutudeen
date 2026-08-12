import type { NumberField } from "payload";

/**
 * Money is always an integer number of kobo. Never a float, never naira.
 * ₦1,690,000 is stored as 169000000.
 */
export const koboField = (
  overrides: Partial<NumberField> & { name: string },
): NumberField => {
  const { name, label, admin, ...rest } = overrides;

  return {
    name,
    type: "number",
    label,
    min: 0,
    ...rest,
    admin: {
      step: 100,
      ...admin,
      description:
        admin?.description ??
        "Amount in kobo (integer). ₦1,000 = 100000 kobo.",
    },
    validate: (value: number | null | undefined) => {
      if (value === null || value === undefined) return true;
      if (!Number.isInteger(value)) return "Amount must be a whole number of kobo.";
      if (value < 0) return "Amount cannot be negative.";
      return true;
    },
  } as NumberField;
};

/** Format kobo for display: 169000000 -> "₦1,690,000.00". */
export const formatKobo = (kobo: number): string =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(kobo / 100);

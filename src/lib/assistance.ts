/**
 * Applicant categories for the empowerment fund's Request Assistance form.
 * Shared by the form component and the validating server action so the two
 * can never drift apart.
 */

export const ASSISTANCE_CATEGORIES = [
  "widow",
  "orphan",
  "vulnerable",
  "less-privileged",
  "medical",
  "crisis",
  "other",
] as const;

export type AssistanceCategory = (typeof ASSISTANCE_CATEGORIES)[number];

export const ASSISTANCE_CATEGORY_LABELS: Record<AssistanceCategory, string> = {
  widow: "Widow",
  orphan: "Orphan",
  vulnerable: "Vulnerable",
  "less-privileged": "Less privileged",
  medical: "Medical emergency",
  crisis: "Crisis support",
  other: "Other",
};

export const isAssistanceCategory = (value: unknown): value is AssistanceCategory =>
  typeof value === "string" &&
  ASSISTANCE_CATEGORIES.includes(value as AssistanceCategory);

export const labelCategories = (categories: string[]): string =>
  categories
    .map((category) => ASSISTANCE_CATEGORY_LABELS[category as AssistanceCategory] ?? category)
    .join(", ");

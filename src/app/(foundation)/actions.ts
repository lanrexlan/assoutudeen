"use server";

import { z } from "zod";
import { getPayloadClient } from "@/lib/payload";
import {
  CONTACT_SUBJECTS,
  inboxFor,
  type ContactSubject,
} from "@/lib/contact-routing";
import {
  ASSISTANCE_CATEGORIES,
  isAssistanceCategory,
  labelCategories,
} from "@/lib/assistance";

/**
 * Server Actions for the foundation's two public forms.
 *
 * Both store to Payload first. Transactional email (Resend) lands in session 5;
 * until then nothing is lost — submissions sit in the admin panel.
 *
 * Consent is required and ships unticked on both forms (NDPA 2023).
 */

export type FormState = {
  ok: boolean;
  message: string;
  /** Field-level errors, keyed by field name. */
  errors?: Record<string, string>;
};

const trimmed = z.string().trim();

const contactSchema = z.object({
  name: trimmed.min(2, "Please give your name.").max(120),
  email: trimmed.email("That email address does not look right."),
  phone: trimmed.max(40).optional().or(z.literal("")),
  topic: z.enum(CONTACT_SUBJECTS),
  subjectLine: trimmed.min(3, "Please add a subject.").max(160),
  message: trimmed.min(10, "Please write a little more.").max(4000),
  consent: z.literal("on", { message: "Please tick the box so we may reply to you." }),
  // Honeypot: bots fill hidden fields, people do not. Accepted by the schema so
  // that a hit is handled silently below rather than shown as a form error.
  website: z.string().optional(),
});

const newsletterSchema = z.object({
  email: trimmed.email("That email address does not look right."),
  name: trimmed.max(120).optional().or(z.literal("")),
  source: trimmed.max(120).optional().or(z.literal("")),
  consent: z.literal("on", { message: "Please tick the box to subscribe." }),
  website: z.string().optional(),
});

const fieldErrors = (error: z.ZodError): Record<string, string> =>
  Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message]),
  );

/**
 * docs/11 Form 1 — Request Assistance. Required fields confirmed by the
 * founder: phone, local government, state of origin, someone to vouch for,
 * and the applicant category (widow, orphan, vulnerable, less privileged,
 * and others). Consent is unticked by default on the form (NDPA 2023).
 */
const urgency = ["emergency", "urgent", "ongoing"] as const;

export type Urgency = (typeof urgency)[number];

export const URGENCY_LABELS: Record<Urgency, string> = {
  emergency: "Emergency (within days)",
  urgent: "Urgent (within a month)",
  ongoing: "Ongoing need",
};

const assistanceSchema = z
  .object({
    fullName: trimmed.min(2, "Please give your full name.").max(120),
    phone: trimmed
      .min(7, "Please give a phone number we can reach you on.")
      .max(40),
    whatsapp: trimmed.max(40).optional().or(z.literal("")),
    localGovernment: trimmed.min(2, "Please give your local government.").max(120),
    stateOfOrigin: trimmed.min(2, "Please give your state of origin.").max(120),
    categories: z
      .array(z.enum(ASSISTANCE_CATEGORIES))
      .min(1, "Choose at least one category."),
    otherCategory: trimmed.max(200).optional().or(z.literal("")),
    referenceName: trimmed
      .min(2, "Please name someone who can vouch for you.")
      .max(120),
    referencePhone: trimmed.min(7, "Please give their phone number.").max(40),
    referenceRelationship: trimmed
      .min(2, "How do you know them?")
      .max(120),
    need: trimmed
      .min(20, "Please tell us a little more about your situation.")
      .max(4000),
    urgency: z.enum(urgency),
    itemNeeded: trimmed
      .min(2, "What do you need? A figure or an item both work.")
      .max(200),
    helpedBefore: z.enum(["yes", "no"]),
    confirmTrue: z.literal("on", {
      message: "Please confirm the information you have given is true.",
    }),
    consent: z.literal("on", {
      message: "Please consent to us storing your information.",
    }),
    contactReferee: z.literal("on", {
      message: "Please agree that we may contact your referee.",
    }),
    // Genuinely optional (NDPA): public sharing of the story, name or not.
    shareAnonymous: z.literal("on").optional().or(z.literal("")),
    shareNamed: z.literal("on").optional().or(z.literal("")),
    // Honeypot, handled like the contact form's.
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.categories.includes("other") && !data.otherCategory) {
      ctx.addIssue({
        code: "custom",
        path: ["otherCategory"],
        message: "Please tell us which category fits.",
      });
    }
  });

export async function submitContactForm(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const data = parsed.data;

  // Silently accept honeypot hits so bots learn nothing.
  if (data.website) return { ok: true, message: "Thank you — your message has been sent." };

  const payload = await getPayloadClient();

  await payload.create({
    collection: "contact-messages",
    overrideAccess: true,
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      topic: data.topic as ContactSubject,
      subjectLine: data.subjectLine,
      message: data.message,
      routedTo: inboxFor(data.topic),
      consent: true,
      status: "new",
    },
  });

  return {
    ok: true,
    message:
      "Thank you — your message has been received. We usually reply within two working days; WhatsApp is faster if it is urgent.",
  };
}

export async function submitAssistanceRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = assistanceSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    localGovernment: formData.get("localGovernment"),
    stateOfOrigin: formData.get("stateOfOrigin"),
    categories: formData.getAll("categories"),
    otherCategory: formData.get("otherCategory"),
    referenceName: formData.get("referenceName"),
    referencePhone: formData.get("referencePhone"),
    referenceRelationship: formData.get("referenceRelationship"),
    need: formData.get("need"),
    urgency: formData.get("urgency"),
    itemNeeded: formData.get("itemNeeded"),
    helpedBefore: formData.get("helpedBefore"),
    confirmTrue: formData.get("confirmTrue"),
    consent: formData.get("consent"),
    contactReferee: formData.get("contactReferee"),
    shareAnonymous: formData.get("shareAnonymous"),
    shareNamed: formData.get("shareNamed"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const data = parsed.data;

  // Silently accept honeypot hits so bots learn nothing.
  if (data.website) {
    return {
      ok: true,
      message: "We have received your request. Someone will contact you shortly.",
    };
  }

  const categories = data.categories.filter(isAssistanceCategory);
  const line = (label: string, value: string) => `${label}: ${value}`;

  const message = [
    line("Full name", data.fullName),
    line("Phone", data.phone),
    line("WhatsApp", data.whatsapp || "(same as phone)"),
    line("Local government", data.localGovernment),
    line("State of origin", data.stateOfOrigin),
    line("Category", labelCategories(categories)),
    ...(data.otherCategory ? [line("Other category", data.otherCategory)] : []),
    line("Urgency", URGENCY_LABELS[data.urgency]),
    line("Amount or item needed", data.itemNeeded),
    line("Received help before", data.helpedBefore === "yes" ? "Yes" : "No"),
    "",
    line("Situation", data.need),
    "",
    line("Referee", data.referenceName),
    line("Referee phone", data.referencePhone),
    line("Referee relationship", data.referenceRelationship),
    line("Share anonymously", data.shareAnonymous === "on" ? "Yes" : "No"),
    line("Share with name", data.shareNamed === "on" ? "Yes" : "No"),
  ].join("\n");

  const payload = await getPayloadClient();

  await payload.create({
    collection: "contact-messages",
    overrideAccess: true,
    data: {
      name: data.fullName,
      phone: data.phone,
      topic: "assistance" as ContactSubject,
      subjectLine: `Assistance request — ${labelCategories(categories)}`,
      message,
      routedTo: inboxFor("assistance"),
      consent: true,
      status: "new",
    },
  });

  return {
    ok: true,
    message:
      "We have received your request. Someone will contact you within a few days — if your situation is an emergency, call 08161882470.",
  };
}

export async function subscribeToNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  if (data.website) return { ok: true, message: "Thank you for subscribing." };

  const payload = await getPayloadClient();
  const email = data.email.toLowerCase();

  const existing = await payload.find({
    collection: "newsletter-subscribers",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  const now = new Date().toISOString();

  if (existing.docs[0]) {
    // Re-subscribing after unsubscribing is allowed; consent is re-recorded.
    await payload.update({
      collection: "newsletter-subscribers",
      id: existing.docs[0].id,
      overrideAccess: true,
      data: {
        status: "subscribed",
        consent: true,
        consentTimestamp: now,
        name: data.name || existing.docs[0].name,
      },
    });
  } else {
    await payload.create({
      collection: "newsletter-subscribers",
      overrideAccess: true,
      data: {
        email,
        name: data.name || undefined,
        consent: true,
        consentTimestamp: now,
        subscribedAt: now,
        source: data.source || undefined,
        status: "subscribed",
      },
    });
  }

  return { ok: true, message: "Thank you — you are subscribed. You can unsubscribe any time." };
}

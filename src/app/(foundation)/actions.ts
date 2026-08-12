"use server";

import { z } from "zod";
import { getPayloadClient } from "@/lib/payload";
import {
  CONTACT_SUBJECTS,
  inboxFor,
  type ContactSubject,
} from "@/lib/contact-routing";

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

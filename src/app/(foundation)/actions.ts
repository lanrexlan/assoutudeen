"use server";

import { z } from "zod";
import { getPayloadClient } from "@/lib/payload";
import { isIntakeOpen } from "@/lib/intake";
import {
  CONTACT_SUBJECTS,
  inboxFor,
  type ContactSubject,
} from "@/lib/contact-routing";
import { FALLBACK_INBOX, sendMailQuietly } from "@/lib/email";
import { CONTACT } from "@/lib/sites";
import { formatNaira } from "@/payload/fields/money";
import { newsletterNotificationsOn } from "@/lib/notifications";

/**
 * Server Actions for the foundation's two public forms.
 *
 * Every submission is stored in Payload first and notified by email second. If
 * the email fails — no key, unverified domain, Resend down — the submission is
 * still safe and the visitor still sees a thank-you. Storage is the record;
 * email is only how we find out about it quickly.
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

  await sendMailQuietly({
    to: inboxFor(data.topic) || FALLBACK_INBOX,
    replyTo: data.email,
    subject: `[${data.topic}] ${data.subjectLine}`,
    text: [
      `A message came through the website.`,
      ``,
      `From:    ${data.name} <${data.email}>`,
      data.phone ? `Phone:   ${data.phone}` : null,
      `Topic:   ${data.topic}`,
      `Subject: ${data.subjectLine}`,
      ``,
      data.message,
      ``,
      `— Reply to this email and it goes straight back to them.`,
    ]
      .filter((line) => line !== null)
      .join("\n"),
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

  /* Short by design. A subscriber list lives in the admin panel; this is only
     so that growth is visible without anyone remembering to go and look.

     Optional, unlike the other three: a signup is not a person waiting for a
     reply, and after launch these arrive in numbers. Settings → "Email
     notifications" turns it off without stopping anyone subscribing. */
  if (await newsletterNotificationsOn()) {
    await sendMailQuietly({
      to: FALLBACK_INBOX,
      replyTo: email,
      subject: existing.docs[0]
        ? `Newsletter: ${email} has re-subscribed`
        : `Newsletter: ${email} subscribed`,
      text: [
        existing.docs[0]
          ? `Someone who had unsubscribed has signed up again.`
          : `A new subscriber signed up through the website.`,
        ``,
        `Email: ${email}`,
        data.name ? `Name:  ${data.name}` : null,
        data.source ? `Page:  ${data.source}` : null,
        ``,
        `Consent was recorded at ${now}.`,
        `The full list is in the admin panel under Newsletter subscribers.`,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
  }

  return { ok: true, message: "Thank you — you are subscribed. You can unsubscribe any time." };
}

/* ---------------------------------------------------------------------------
   The Monthly Empowerment Fund: joining it, and asking it for help.
--------------------------------------------------------------------------- */

const nairaToKobo = (naira: number) => Math.round(naira * 100);

const pledgeSchema = z.object({
  name: trimmed.min(2, "Please give your name.").max(120),
  email: trimmed.email("That email address does not look right."),
  phone: trimmed.max(40).optional().or(z.literal("")),
  amount: z.coerce
    .number({ message: "Please choose or enter an amount." })
    .int("Please give a whole number of naira.")
    .min(100, "The smallest pledge we can process is ₦100."),
  method: z.enum(["card", "transfer"]),
  purpose: z.enum(["empowerment", "zakat", "sadaqah"]),
  message: trimmed.max(2000).optional().or(z.literal("")),
  consent: z.literal("on", { message: "Please tick the box so we may contact you." }),
  website: z.string().optional(),
});

export async function joinTheFund(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = pledgeSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  if (data.website) return { ok: true, message: "Thank you — your pledge is recorded." };

  const payload = await getPayloadClient();
  await payload.create({
    collection: "pledges",
    overrideAccess: true,
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      amountKobo: nairaToKobo(data.amount),
      method: data.method,
      purpose: data.purpose,
      message: data.message || undefined,
      consent: true,
      status: "new",
    },
  });

  /*
   * The Empowerment Fund is the reason this site exists, and a pledge sitting
   * unread in the admin panel is a supporter nobody called back. So this one
   * carries the detail needed to act on it without opening anything.
   *
   * Two things are called out deliberately:
   *
   *  - ZAKAT. It is a separate fund with its own ledger and may never be
   *    pooled with general donations (CLAUDE.md). Whoever reads this email is
   *    the person who decides where the money is recorded, so the subject line
   *    says it rather than hiding it in a field.
   *  - A transfer pledge needs a human to send bank details. Card does not.
   *    The subject says which, because one of them is an errand.
   */
  const isZakat = data.purpose === "zakat";
  const needsBankDetails = data.method === "transfer";

  await sendMailQuietly({
    to: FALLBACK_INBOX,
    replyTo: data.email,
    subject: [
      isZakat ? "[ZAKAT]" : `[${data.purpose}]`,
      `${formatNaira(nairaToKobo(data.amount))} pledge from ${data.name}`,
      needsBankDetails ? "— send bank details" : "— by card",
    ].join(" "),
    text: [
      `Someone has pledged to the ${isZakat ? "Zakat fund" : "Monthly Empowerment Fund"}.`,
      ``,
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      data.phone ? `Phone:   ${data.phone}` : null,
      `Amount:  ${formatNaira(nairaToKobo(data.amount))} a month`,
      `Purpose: ${data.purpose}`,
      `Method:  ${data.method === "transfer" ? "manual bank transfer" : "card"}`,
      ``,
      data.message ? `They wrote:\n${data.message}\n` : null,
      needsBankDetails
        ? `NEXT STEP: they are paying by transfer, so someone needs to send them\nthe account details and confirm the first payment.`
        : `NEXT STEP: they chose card. Card subscriptions are not live yet, so they\nstill need to be contacted and set up by hand.`,
      isZakat
        ? `\nThis is ZAKAT. It belongs in the Zakat ledger and must not be pooled\nwith general donations.`
        : null,
      ``,
      `— Reply to this email and it goes straight back to them.`,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  return {
    ok: true,
    message:
      "Thank you. Your pledge is recorded and someone will be in touch to set it up — usually within two working days.",
  };
}

const assistanceSchema = z.object({
  name: trimmed.min(2, "Please give your name.").max(120),
  phone: trimmed.min(7, "We need a phone number to reach you on.").max(40),
  whatsapp: trimmed.min(7, "Please give a WhatsApp number — it is how we will reach you.").max(40),
  email: trimmed.email("That email address does not look right.").optional().or(z.literal("")),
  state: trimmed.min(2, "Please give your state of origin.").max(80),
  lga: trimmed.min(2, "Please give your local government area.").max(80),
  category: z.enum(["medical", "financial", "shelter", "other"]),
  /** Checkbox group; a single value arrives as a string. */
  circumstances: z.union([z.string(), z.array(z.string())]).optional(),
  need: trimmed.min(20, "Please tell us a little more about the situation.").max(4000),
  hospital: trimmed.max(160).optional().or(z.literal("")),
  amount: z.coerce.number().int().min(0).optional(),
  refereeName: trimmed.min(2, "Please give the name of someone who can vouch for you.").max(120),
  refereePhone: trimmed.min(7, "We need a phone number for your referee.").max(40),
  consentToProcess: z.literal("on", {
    message: "We cannot look into a request without your permission to hold these details.",
  }),
  /** Separate and optional — being helped is never conditional on this. */
  consentToBeNamed: z.literal("on").optional(),
  website: z.string().optional(),
});

export async function requestAssistance(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Requests are taken in rounds. The form is not rendered when the round is
  // shut, but the action checks too — a direct POST must not slip through and
  // land in a queue nobody is reading.
  if (!(await isIntakeOpen())) {
    return {
      ok: false,
      message:
        "Requests are closed at the moment. The next round is published on this page — and if the need is urgent, please message us on WhatsApp instead.",
    };
  }

  // A checkbox group can appear many times, so it is read before flattening.
  const circumstances = formData.getAll("circumstances").map(String);
  const parsed = assistanceSchema.safeParse({
    ...Object.fromEntries(formData),
    circumstances,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  if (data.website) return { ok: true, message: "Thank you — your request has been received." };

  const payload = await getPayloadClient();
  await payload.create({
    collection: "assistance-requests",
    overrideAccess: true,
    data: {
      name: data.name,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email || undefined,
      state: data.state,
      lga: data.lga,
      category: data.category,
      circumstances: circumstances as never,
      need: data.need,
      hospital: data.hospital || undefined,
      amountRequestedKobo: data.amount ? nairaToKobo(data.amount) : undefined,
      refereeName: data.refereeName,
      refereePhone: data.refereePhone,
      consentToProcess: true,
      consentToBeNamed: data.consentToBeNamed === "on",
      status: "new",
    },
  });

  /* Deliberately no details. An assistance request holds someone's medical and
     financial circumstances, and email is not a safe place to keep those. The
     notification says only that one has arrived; it is read in the admin panel,
     behind a login, by the people permitted to see it. */
  await sendMailQuietly({
    to: FALLBACK_INBOX,
    subject: "A new assistance request is waiting",
    text: [
      `Someone has submitted a request for assistance through the website.`,
      ``,
      `The details are not included in this email on purpose — they are health`,
      `and financial data. Open the admin panel to read the request and reply.`,
      ``,
      `If it is urgent, the applicant can also be reached on WhatsApp:`,
      `${CONTACT.phoneDisplay}`,
    ].join("\n"),
  });

  return {
    ok: true,
    message:
      "Your request has been received. Someone will contact you on the number you gave to talk it through. Nothing you have told us is published, and nothing will be without your separate written permission.",
  };
}

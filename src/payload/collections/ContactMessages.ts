import type { CollectionConfig } from "payload";
import { adminOnly, adminOrEditor } from "@/payload/access/roles";
import { CONTACT_ROUTES, CONTACT_SUBJECTS } from "@/lib/contact-routing";

/**
 * Every contact-form submission is stored before anything is emailed, so a
 * message is never lost to a mail failure or a mailbox that does not exist yet.
 * Resend delivery is wired up in session 5; `routedTo` already records where
 * each one is meant to go.
 *
 * Personal data — readable by admins and editors, writable only by the server
 * action (which uses `overrideAccess`).
 */
export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  admin: {
    useAsTitle: "subjectLine",
    defaultColumns: ["subjectLine", "topic", "routedTo", "status", "createdAt"],
    group: "Administration",
  },
  access: {
    read: adminOrEditor,
    create: adminOnly,
    update: adminOrEditor,
    delete: adminOnly,
  },
  fields: [
    { name: "name", type: "text", required: true },
    // Optional because the phone-first assistance form has no email field;
    // the general contact form still requires it via its Zod schema.
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    {
      name: "topic",
      type: "select",
      required: true,
      index: true,
      options: CONTACT_SUBJECTS.map((value) => ({
        label: CONTACT_ROUTES[value].label,
        value,
      })),
    },
    { name: "subjectLine", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    {
      name: "routedTo",
      type: "text",
      admin: { description: "Inbox this submission is addressed to." },
    },
    {
      name: "consent",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: { description: "Consent to be replied to. Unticked by default on the form." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Answered", value: "answered" },
        { label: "Spam", value: "spam" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};

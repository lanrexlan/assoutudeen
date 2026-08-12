import type { CollectionConfig } from "payload";
import { adminOrEditor, anyone } from "@/payload/access/roles";
import { slugField } from "@/payload/fields/slug";

/**
 * A class is stored as a RULE, never as a list of dates — that is what stops
 * the schedule going stale. Occurrences are computed in `lib/recurrence`
 * (session 9) from `recurrenceRule`.
 *
 * Edge case to preserve: the Tawheed class is the 2nd Sunday EXCEPT when the
 * 2nd Sunday is also the last Sunday of the month, when it does not run.
 * RRULE alone cannot express that, so `recurrenceException` names it.
 */
export const Programmes: CollectionConfig = {
  slug: "programmes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "teacher", "recurrenceRule", "isFree"],
    group: "Dawah Institute",
  },
  access: { read: anyone, create: adminOrEditor, update: adminOrEditor, delete: adminOrEditor },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "teacher", type: "relationship", relationTo: "teachers" },
    { name: "description", type: "richText" },
    {
      name: "recurrenceRule",
      type: "text",
      required: true,
      admin: {
        description:
          "RRULE string, e.g. FREQ=MONTHLY;BYDAY=-1MO for the last Monday of the month. Times are Africa/Lagos.",
        placeholder: "FREQ=MONTHLY;BYDAY=2SU",
      },
    },
    {
      name: "recurrenceException",
      type: "select",
      options: [
        { label: "None", value: "none" },
        {
          label: "Skip when the 2nd Sunday is also the last Sunday",
          value: "skip-second-sunday-when-last",
        },
      ],
      defaultValue: "none",
      admin: { description: "Handled explicitly by the recurrence engine." },
    },
    {
      type: "row",
      fields: [
        {
          name: "startTime",
          type: "text",
          admin: {
            width: "50%",
            placeholder: "18:30",
            description: "24-hour local time (Africa/Lagos). Unconfirmed for most classes.",
          },
        },
        {
          name: "durationMinutes",
          type: "number",
          min: 0,
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "venue", type: "text", admin: { width: "50%" } },
        {
          name: "platform",
          type: "text",
          admin: { width: "50%", placeholder: "WhatsApp, Zoom, in person" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "language",
          type: "select",
          admin: { width: "50%" },
          options: [
            { label: "Yoruba", value: "yoruba" },
            { label: "English", value: "english" },
            { label: "Arabic", value: "arabic" },
            { label: "Mixed", value: "mixed" },
          ],
        },
        {
          name: "isFree",
          type: "checkbox",
          defaultValue: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "recordings",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "recordedOn", type: "date" },
        { name: "audio", type: "upload", relationTo: "media" },
        {
          name: "externalUrl",
          type: "text",
          admin: { description: "YouTube or podcast link, if not hosted here." },
        },
        { name: "durationMinutes", type: "number", min: 0 },
      ],
    },
  ],
};

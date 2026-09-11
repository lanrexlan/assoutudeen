import type { GlobalConfig } from "payload";
import { adminOnly, anyone } from "@/payload/access/roles";

/**
 * When the Request Assistance form is open.
 *
 * This used to be a constant in the code, which meant opening a round needed a
 * developer and a deployment — and a round that opens on the first of the month
 * cannot wait for either. It lives here so the foundation opens and closes its
 * own intake from the admin panel.
 *
 * The form follows this, and so does the server action behind it: a request
 * submitted after the deadline is refused by the server, not merely hidden by
 * the page. See src/lib/intake.ts.
 */
export const IntakeRound: GlobalConfig = {
  slug: "intake-round",
  label: "Requests: open or closed",
  admin: {
    group: "Finance",
    description:
      "Controls the Request Assistance form. Turn 'Accepting requests' off and the page says requests are closed and points people to WhatsApp instead.",
  },
  /* Read by the public site, changed only by administrators — this decides
     whether the foundation is taking applications at all. */
  access: { read: anyone, update: adminOnly },
  fields: [
    {
      name: "accepting",
      type: "checkbox",
      label: "Accepting requests",
      defaultValue: false,
      admin: {
        description:
          "Off means no round is running: the page says so plainly and gives the WhatsApp number for emergencies. The dates below are ignored while this is off.",
      },
    },
    {
      name: "label",
      type: "text",
      label: "Round name",
      defaultValue: "September 2026",
      admin: {
        description:
          "Shown to applicants, e.g. 'September 2026' or 'Q4 2026'. Avoid 'the next round' while a round is actually open — it reads as though it has not started.",
        condition: (data) => Boolean(data?.accepting),
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "opensOn",
          type: "date",
          label: "Opens",
          admin: {
            width: "33%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
            description: "First day requests are accepted.",
            condition: (data) => Boolean(data?.accepting),
          },
        },
        {
          name: "closesOn",
          type: "date",
          label: "Deadline",
          admin: {
            width: "33%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
            description: "Last day, inclusive. The form closes at midnight in Ede.",
            condition: (data) => Boolean(data?.accepting),
          },
        },
        {
          name: "decisionsBy",
          type: "date",
          label: "Applicants hear by",
          admin: {
            width: "33%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
            description:
              "Published to applicants, so nobody is left wondering. Keep it.",
            condition: (data) => Boolean(data?.accepting),
          },
        },
      ],
    },
    {
      name: "places",
      type: "number",
      label: "Places this round (optional)",
      min: 1,
      admin: {
        description:
          "Roughly how many requests this round can carry. Left blank, no number is published.",
        condition: (data) => Boolean(data?.accepting),
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        /* A round whose deadline precedes its opening date can never be open,
           and the page would silently show nothing. Better to refuse the save
           and say why. */
        if (!data?.accepting) return data;

        const { opensOn, closesOn, decisionsBy } = data;
        if (!opensOn || !closesOn) {
          throw new Error(
            "An open round needs both an opening date and a deadline.",
          );
        }
        if (new Date(closesOn) < new Date(opensOn)) {
          throw new Error("The deadline cannot fall before the opening date.");
        }
        if (decisionsBy && new Date(decisionsBy) < new Date(closesOn)) {
          throw new Error(
            "Applicants cannot hear the outcome before the deadline has passed.",
          );
        }
        return data;
      },
    ],
  },
};

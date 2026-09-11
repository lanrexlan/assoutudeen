import type { GlobalConfig } from "payload";
import { adminOnly, anyone } from "@/payload/access/roles";

/**
 * Which submissions send an email, and which are read in the panel.
 *
 * Only the noisy one is optional. Contact messages, pledges and assistance
 * requests always notify: each is a person waiting for a reply, and a missed
 * one costs something real. A newsletter signup costs nothing to notice late —
 * the list is right here in the panel — so once the site is announced and
 * signups arrive in numbers, this is the switch that stops the inbox filling.
 */
export const Notifications: GlobalConfig = {
  slug: "notifications",
  label: "Email notifications",
  admin: {
    group: "Settings",
    description:
      "Contact messages, pledges and assistance requests always send an email. Newsletter signups are optional.",
  },
  access: { read: anyone, update: adminOnly },
  fields: [
    {
      name: "newsletterSignups",
      type: "checkbox",
      label: "Email me when someone subscribes to the newsletter",
      /* On, so that turning this into a setting changes nothing by itself.
         It also means an unsaved global behaves exactly as before. */
      defaultValue: true,
      admin: {
        description:
          "Turn this off if signups become noise after launch. Subscribers are still recorded either way — the full list is under Newsletter subscribers, and nothing is lost by not being emailed.",
      },
    },
  ],
};

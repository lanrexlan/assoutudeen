import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = {
  title: "Schedule",
  description: "The recurring schedule of the Assoutudeen Dawah Institute, with an .ics feed.",
};

/**
 * The recurrence engine (CLAUDE.md feature #2) computes occurrences from
 * RRULE-style rules. Times and venues are unconfirmed, so the schedule and
 * its .ics feed are not published yet.
 */
export default function SchedulePage() {
  return (
    <ComingSoon
      title="The Schedule"
      description="Every class is stored as a recurrence rule, and the schedule is computed from it — with a calendar feed you can subscribe to."
      pending="class times, venues and language — once confirmed, the schedule and .ics feed go live"
      whatsappMessage="As-salaamu alaykum. What time are the classes at the Dawah Institute?"
      backHref="/dawah/programmes"
      backLabel="See the programmes"
    />
  );
}

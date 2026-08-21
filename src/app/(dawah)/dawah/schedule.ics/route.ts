import { EMPOWERMENT_PROGRAMME, TEACHING_WINDOW } from "@/lib/programmes";
import { nextEmpowerment, upcomingTimetable } from "@/lib/schedule";
import { toISO, formatDate, type PlainDate } from "@/lib/recurrence";
import { CONTACT, siteConfig } from "@/lib/sites";

/**
 * The teaching timetable as a calendar feed.
 *
 * Subscribing beats a page: the classes appear in someone's own calendar, on
 * their phone, without them having to remember to come back and look.
 *
 * Two decisions worth knowing about:
 *
 *  - Classes run "between maghrib and isha", which is not a clock time and
 *    moves through the year. Rather than invent 18:30 and be wrong for most of
 *    the year, each class is published as an ALL-DAY event whose description
 *    says when it actually starts. A wrong time in someone's calendar is worse
 *    than no time.
 *  - The alternating Saturday pair are omitted while unresolved, for the same
 *    reason the page will not name their dates: a confident wrong entry sends
 *    someone to a locked masjid.
 */

export const dynamic = "force-dynamic";

const CRLF = "\r\n";

/** Fold long lines at 75 octets, as iCalendar requires. */
function fold(line: string): string {
  if (line.length <= 75) return line;
  const parts = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 74) {
    parts.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  if (rest) parts.push(` ${rest}`);
  return parts.join(CRLF);
}

const escape = (value: string): string =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

const stamp = (d: PlainDate): string => toISO(d).replace(/-/g, "");

/** All-day VEVENT. DTEND is exclusive, so it is the following day. */
function event({
  uid,
  date,
  summary,
  description,
}: {
  uid: string;
  date: PlainDate;
  summary: string;
  description: string;
}): string[] {
  const end = new Date(Date.UTC(date.year, date.month - 1, date.day + 1));
  const endStamp = `${end.getUTCFullYear()}${String(end.getUTCMonth() + 1).padStart(2, "0")}${String(end.getUTCDate()).padStart(2, "0")}`;

  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp(date)}T000000Z`,
    `DTSTART;VALUE=DATE:${stamp(date)}`,
    `DTEND;VALUE=DATE:${endStamp}`,
    `SUMMARY:${escape(summary)}`,
    `DESCRIPTION:${escape(description)}`,
    `LOCATION:${escape(CONTACT.address)}`,
    "END:VEVENT",
  ];
}

export async function GET() {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Assoutudeen Dawah Institute//Timetable//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escape(siteConfig.dawah.name)}`,
    "X-WR-TIMEZONE:Africa/Lagos",
  ];

  /* A term's worth of each class: enough to be useful, small enough to stay
     well inside a sensible response size. */
  for (const { programme, dates, unresolved } of upcomingTimetable(12)) {
    if (unresolved) continue;

    for (const date of dates) {
      lines.push(
        ...event({
          uid: `${programme.slug}-${toISO(date)}@assoutudeen.com`,
          date,
          summary: programme.title,
          description: `${programme.description}\n\n${TEACHING_WINDOW}. Taught by ${programme.teacher}.\n\nAsk on WhatsApp: ${CONTACT.phoneDisplay}`,
        }),
      );
    }
  }

  const empowerment = nextEmpowerment();
  if (empowerment) {
    lines.push(
      ...event({
        uid: `empowerment-${toISO(empowerment)}@assoutudeen.com`,
        date: empowerment,
        summary: EMPOWERMENT_PROGRAMME.title,
        description: `${EMPOWERMENT_PROGRAMME.description}\n\n${EMPOWERMENT_PROGRAMME.time}. ${formatDate(empowerment)}.`,
      }),
    );
  }

  lines.push("END:VCALENDAR");

  return new Response(lines.map(fold).join(CRLF) + CRLF, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": 'attachment; filename="assoutudeen-classes.ics"',
      /* An hour is plenty: the timetable changes rarely, and a subscribed
         calendar re-fetches on its own schedule anyway. */
      "cache-control": "public, max-age=3600",
    },
  });
}

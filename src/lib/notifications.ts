/**
 * Which optional notifications are switched on.
 *
 * Set in the admin panel under Settings → "Email notifications". Only the
 * newsletter is optional; everything else is somebody waiting for a reply.
 */

type NotificationsGlobal = {
  newsletterSignups?: boolean | null;
};

/**
 * Pure, so the awkward cases are testable.
 *
 * Note the difference from the intake switch, where an unsaved global had to be
 * told apart from a deliberate "off": here the field defaults to true, so an
 * unsaved global already reads as on. That is the behaviour we want — turning
 * this into a setting must not silently stop notifications that were working.
 */
export function shouldEmailNewsletterSignups(
  global: NotificationsGlobal | null | undefined,
): boolean {
  return global?.newsletterSignups !== false;
}

/** Reads the setting, erring towards sending if the CMS cannot be read. */
export async function newsletterNotificationsOn(): Promise<boolean> {
  try {
    const { getPayloadClient } = await import("@/lib/payload");
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: "notifications" });
    return shouldEmailNewsletterSignups(global as NotificationsGlobal);
  } catch {
    /* An unreadable setting should not silently swallow notifications. The
       cost of being wrong this way is one email too many. */
    return true;
  }
}

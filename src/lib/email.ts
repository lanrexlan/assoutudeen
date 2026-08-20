/**
 * Transactional email, through Resend.
 *
 * Two rules govern everything here:
 *
 *  1. **Email is never allowed to fail a submission.** The form's job is to
 *     record what someone told us; notifying us is a convenience on top. If
 *     Resend is down, or the key is missing, or the domain is not verified, the
 *     message is still safe in the database and the visitor still sees a
 *     thank-you. Every send is wrapped and every failure is logged, not thrown.
 *
 *  2. **Health data does not travel by email.** An assistance request contains
 *     someone's medical and financial circumstances (NDPA 2023). The
 *     notification says a request has arrived and nothing else; the details are
 *     read in the admin panel, behind a login, by the people allowed to see
 *     them.
 *
 * With no RESEND_API_KEY set, this is a no-op that logs — so local development
 * and preview deployments never send real mail by accident.
 */

const API = "https://api.resend.com/emails";

/** Who mail appears to come from. Must be on a domain verified in Resend. */
const FROM = process.env.RESEND_FROM ?? "Assoutudeen <noreply@assoutudeen.com>";

/** Where notifications go when a topic has no inbox of its own. */
const FALLBACK_INBOX = process.env.NOTIFY_EMAIL ?? "info@assoutudeen.com";

export type Mail = {
  to: string;
  subject: string;
  /** Plain text only. No tracking pixels, no images, no HTML email templates. */
  text: string;
  /** So hitting reply in the inbox answers the person who wrote in. */
  replyTo?: string;
};

export const emailConfigured = (): boolean => Boolean(process.env.RESEND_API_KEY);

export async function sendMail(mail: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.info(
      `[email] RESEND_API_KEY is not set — not sending "${mail.subject}" to ${mail.to}. The submission is stored either way.`,
    );
    return false;
  }

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [mail.to || FALLBACK_INBOX],
        subject: mail.subject,
        text: mail.text,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
    });

    if (!response.ok) {
      console.error(
        `[email] Resend refused "${mail.subject}": ${response.status} ${await response
          .text()
          .catch(() => "")}`,
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[email] Could not reach Resend for "${mail.subject}":`, error);
    return false;
  }
}

/** Send without ever letting a failure reach the caller. */
export async function sendMailQuietly(mail: Mail): Promise<void> {
  try {
    await sendMail(mail);
  } catch (error) {
    console.error("[email] Unexpected failure:", error);
  }
}

export { FALLBACK_INBOX };

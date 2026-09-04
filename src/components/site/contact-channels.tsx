import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CONTACT } from "@/lib/sites";

/**
 * Call, WhatsApp and email, as three cards.
 *
 * All three sites need the same block with a different pre-filled WhatsApp
 * message, so it lives here rather than being copied into six pages.
 */
export function ContactChannels({
  whatsappMessage,
  emailSubject,
}: {
  whatsappMessage: string;
  emailSubject?: string;
}) {
  const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;
  const mailHref = emailSubject
    ? `mailto:${CONTACT.email}?subject=${encodeURIComponent(emailSubject)}`
    : `mailto:${CONTACT.email}`;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardTitle>Call</CardTitle>
        <CardDescription>Tap to dial from your phone.</CardDescription>
        <a
          href={`tel:+${CONTACT.phoneE164}`}
          className="mt-auto flex min-h-11 items-center text-lg font-semibold text-primary-ink underline underline-offset-4"
        >
          {CONTACT.phoneDisplay}
        </a>
      </Card>

      <Card>
        <CardTitle>WhatsApp</CardTitle>
        <CardDescription>
          The fastest way to reach us, and how most people do.
        </CardDescription>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex min-h-11 items-center text-lg font-semibold text-primary-ink underline underline-offset-4"
        >
          Start a chat
        </a>
      </Card>

      <Card>
        <CardTitle>Email</CardTitle>
        <CardDescription>For anything that needs a written record.</CardDescription>
        <a
          href={mailHref}
          className="mt-auto flex min-h-11 items-center break-all text-lg font-semibold text-primary-ink underline underline-offset-4"
        >
          {CONTACT.email}
        </a>
      </Card>
    </div>
  );
}

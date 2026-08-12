import { CONTACT } from "@/lib/sites";
import { cn } from "@/lib/utils";

type WhatsAppFloatProps = {
  /**
   * Pre-filled message. Pass something page-specific — "I'd like to ask about
   * the Tafsir class", "I've transferred for order #123" — so the conversation
   * starts with context instead of "Hi".
   */
  message: string;
  label?: string;
  className?: string;
};

/**
 * Fixed WhatsApp deep link. A plain anchor, no client JavaScript: WhatsApp is
 * how this audience actually gets in touch, so it must work on a slow phone.
 */
export function WhatsAppFloat({
  message,
  label = "Chat with us on WhatsApp",
  className,
}: WhatsAppFloatProps) {
  const href = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={cn(
        "fixed bottom-4 end-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105",
        className,
      )}
    >
      {/* Inline SVG so the icon costs no extra request. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        className="size-7"
      >
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.77 1.17 2.96c.14.19 2.02 3.08 4.89 4.32.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.36 9.36 0 0 1-1.44-5A9.44 9.44 0 0 1 12.06 2.6a9.38 9.38 0 0 1 6.67 2.77 9.35 9.35 0 0 1 2.76 6.66c0 5.18-4.24 9.47-9.44 9.47zM19.9 4.06A11.1 11.1 0 0 0 12.05.8C5.9.8.9 5.79.9 11.93c0 1.96.51 3.88 1.49 5.57L.8 23.2l5.84-1.53a11.15 11.15 0 0 0 5.41 1.38h.01c6.15 0 11.15-5 11.15-11.14a11.06 11.06 0 0 0-3.3-7.85z" />
      </svg>
      <span className="sr-only">{label}</span>
    </a>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { CONTACT } from "@/lib/sites";

/**
 * Honest placeholder for a page the project plan still has to build.
 *
 * Nothing here pretends the content exists: the gap is shown as a visible
 * [TODO: …] marker (see TODO-CONTENT.md), and the visitor is given the two
 * things that actually work today — WhatsApp and the rest of the site.
 */
export function ComingSoon({
  title,
  description,
  pending,
  whatsappMessage,
  backHref,
  backLabel = "Back to the homepage",
}: {
  title: string;
  description: React.ReactNode;
  /** The missing fact or feature, rendered inside the [TODO: …] marker. */
  pending: React.ReactNode;
  /** Page-specific WhatsApp message, so the chat starts with context. */
  whatsappMessage: string;
  backHref: string;
  backLabel?: string;
}) {
  const whatsappUrl = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <>
      <Section tone="primary">
        <p className="text-sm uppercase tracking-widest text-on-primary/80">
          Under construction
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
          {description}
        </p>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-charcoal">
            This page is on our build list, and it is not ready yet.{" "}
            <Todo>{pending}</Todo>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us on WhatsApp
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={backHref}>{backLabel}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

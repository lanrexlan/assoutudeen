"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { CONTACT } from "@/lib/sites";

/**
 * What a visitor sees when something on the server throws.
 *
 * Without a boundary Next shows a bare white "Application error: a server-side
 * exception has occurred" with a digest and nothing else — no way back, no way
 * to reach anybody, and nothing to tell someone trying to donate that the
 * foundation still exists. This gives them the phone number, which works even
 * when the site does not.
 */
export function ErrorScreen({
  reset,
  home = "/",
  homeLabel = "Back to the homepage",
}: {
  reset: () => void;
  home?: string;
  homeLabel?: string;
}) {
  return (
    <Section width="prose" className="min-h-dvh">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-3 text-charcoal-muted">
        This page failed to load. It is our fault, not yours, and it is usually
        temporary — try again in a moment.
      </p>
      <p className="mt-3 text-charcoal-muted">
        If you were in the middle of donating or ordering, nothing was taken.
        Reach us on WhatsApp at{" "}
        <a
          href={`https://wa.me/${CONTACT.phoneE164}`}
          className="underline underline-offset-2"
        >
          {CONTACT.phoneDisplay}
        </a>{" "}
        and we will help directly.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="secondary">
          <Link href={home}>{homeLabel}</Link>
        </Button>
      </div>
    </Section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

/** See the note in the dawah not-found: every site needs its own. */
export default function NotFound() {
  return (
    <Section width="prose" className="min-h-dvh">
      <h1 className="font-display text-3xl">Page not found</h1>
      <p className="mt-3 text-charcoal-muted">
        That page does not exist, or has moved. If you came here to order, the
        shop page has everything you need.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Back to the honey</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/shop">Order honey</Link>
        </Button>
      </div>
    </Section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section width="prose" className="min-h-dvh">
      <h1 className="font-display text-3xl">Page not found</h1>
      <p className="mt-3 text-charcoal-muted">
        That page does not exist, or has moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to the homepage</Link>
      </Button>
    </Section>
  );
}

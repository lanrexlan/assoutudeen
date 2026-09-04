import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

/**
 * Each site needs its own, or a mistyped URL on dawah.assoutudeen.com falls
 * through to Next's unstyled default page — no header, no footer, no way back.
 */
export default function NotFound() {
  return (
    <Section width="prose" className="min-h-dvh">
      <h1 className="font-display text-3xl">Page not found</h1>
      <p className="mt-3 text-charcoal-muted">
        That page does not exist, or has moved. The timetable and the library are
        the two most-asked-for pages.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Back to the Institute</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/schedule">The teaching week</Link>
        </Button>
      </div>
    </Section>
  );
}

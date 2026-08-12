import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

/** Placeholder homepage for the Dawah Institute. Built out in sessions 9–10. */
export default async function DawahHomePage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <Section tone="primary">
        <p className="text-sm uppercase tracking-widest text-white/80">
          {siteConfig.dawah.shortName}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight sm:text-5xl">
          {siteConfig.dawah.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
          Seven recurring classes — Tafsir, Hadith, Tawheed, Prophetic Medicine,
          the monthly Fiqh seminar, the empowerment lecture and Fataawah night.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/schedule")}>See the schedule</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>Programmes</CardTitle>
            <CardDescription>
              Each class is stored as a recurrence rule, so the schedule never
              goes stale.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>
              Imam Engr. Abd&apos;Waasi Tirmidhi A. (Abu Mubaashir) and Shaykh
              Yaaqub Muhibullah Abd&apos;hammed Olore.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Library</CardTitle>
            <CardDescription>
              Recorded lectures and notes. Added in session 10.
            </CardDescription>
          </Card>
        </div>

        <p className="mt-8 text-sm text-charcoal-muted">
          Scaffold placeholder. Class times, venue and language are still
          unconfirmed — see <code>TODO-CONTENT.md</code>.
        </p>
      </Section>
    </>
  );
}

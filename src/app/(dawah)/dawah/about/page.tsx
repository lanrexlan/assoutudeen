import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { foundationUrl } from "@/components/site/foundation-link";
import { getSiteContext } from "@/lib/site-context";

import { DAWAH_CLASSES, MONTHLY_FIQH_SEMINAR } from "@/lib/dawah-schedule";

export const metadata: Metadata = {
  title: "About the Institute",
  description:
    "The Assoutudeen Dawah Institute is the education arm of the Assoutudeen Prophetic Medicine Foundation — recurring classes taught in Ede, Friday to Sunday.",
};

/** The confirmed programmes, from lib/dawah-schedule.ts. */
const PROGRAMMES = [
  ...DAWAH_CLASSES.map((session) => session.title),
  MONTHLY_FIQH_SEMINAR.title,
];

export default async function AboutPage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The institute"
          title="About the Institute"
          standfirst="The education arm of the Assoutudeen Prophetic Medicine Foundation — recurring classes every Friday to Sunday, free and open."
        />
      </Section>

      <Section>
        <Prose>
          <h2>What the Institute is</h2>
          <p>
            The Assoutudeen Dawah Institute is where the foundation teaches. It
            runs classes every Friday to Sunday in Ede, Osun State — between
            Maghrib and Isha — led by the foundation&apos;s founder and chief
            instructor, Imam Engr. Abd&apos;Waasi Tirmidhi A. (Abu Mubaashir),
            with guest scholars. The classes are free and open to the community.
          </p>

          <h2>The programmes</h2>
          <ul>
            {PROGRAMMES.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p>
            On top of the weekly classes, a special Fiqh seminar on business
            transactions and interpersonal relations runs every last Sunday of
            the month, and an empowerment session every last Saturday of the
            quarter. <Todo>venue or platform — unconfirmed</Todo>
          </p>

          <h2>Teachers</h2>
          <p>
            The chief instructor is Imam Engr. Abd&apos;Waasi Tirmidhi A. (Abu
            Mubaashir), author of <i>Endless Blessings From The Creator</i>. The
            monthly Fiqh seminar is taught by Dr Yaaqub Muhibullah
            Abd&apos;hammed Olore (Mufti li Mahad). See the{" "}
            <Link href={href("/teachers")} className="underline underline-offset-4">
              teachers page
            </Link>{" "}
            for more.
          </p>

          <h2>Part of the foundation</h2>
          <p>
            The Institute is one of two arms of the Assoutudeen Prophetic
            Medicine Foundation — the education arm, alongside the foundation&apos;s
            commercial arm, the Assoutudeen Honey Enterprise. The foundation is
            the parent charity: the monthly empowerment fund, publications and
            community support all live there.{" "}
            <a
              href={foundationUrl}
              className="underline underline-offset-4"
            >
              Visit the foundation →
            </a>
          </p>
        </Prose>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-2xl">Explore the Institute</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="justify-between">
            <div>
              <CardTitle>Programmes</CardTitle>
              <CardDescription className="mt-2">
                The Friday-to-Sunday classes, what each one covers, and who
                teaches it.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/programmes")}>See the programmes →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Teachers</CardTitle>
              <CardDescription className="mt-2">
                The founder and chief instructor, and the guest scholar of the
                monthly Fiqh seminar.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/teachers")}>Meet the teachers →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Schedule</CardTitle>
              <CardDescription className="mt-2">
                Each class is stored as a recurrence rule, so the schedule is
                computed, never hand-maintained.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/schedule")}>See the schedule →</Link>
            </Button>
          </Card>
        </div>
      </Section>
    </>
  );
}

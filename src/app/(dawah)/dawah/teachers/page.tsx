import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SealFrame } from "@/components/ui/ornament";
import { TurbanBust } from "@/components/ui/illustration";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { TEACHERS, programmesFor } from "@/lib/teachers";
import { FOUNDATION_NAME } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Teachers",
  description:
    "Who teaches at the Assoutudeen Dawah Institute: Imam Engr. Abd'Wasiu Tirmidhi Adeniyi and Shaykh (Dr) Yaaqub Muhibullah Abd'hammed Olore.",
};

export default async function TeachersPage() {
  const { href } = await getSiteContext("dawah");

  return (
    <>
      <PageHeader
        eyebrow="Teachers"
        title="Who teaches here"
        standfirst="Two teachers, both named on the timetable, so you know who you are learning from before you come."
      />

      {TEACHERS.map((teacher, index) => {
        const classes = programmesFor(teacher);
        return (
          <Section
            key={teacher.slug}
            tone={index % 2 === 0 ? "chalk" : "white"}
            size="lg"
            id={teacher.slug}
          >
            <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:items-start">
              <figure className="reveal mx-auto w-full max-w-xs">
                <SealFrame className="aspect-3/4 w-full">
                  <TurbanBust />
                </SealFrame>
                <figcaption className="mt-3 text-center text-xs text-charcoal-muted">
                  Drawn, not photographed — a figure without features, standing in
                  until a portrait is supplied.
                </figcaption>
              </figure>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-apricot-dark">
                  {teacher.title}
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal">
                  {teacher.name}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-charcoal-muted">
                  {teacher.summary}
                </p>

                <Prose className="mt-6 max-w-none">
                  {teacher.detail.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </Prose>

                {classes.length ? (
                  <div className="mt-8">
                    <p className="text-sm font-semibold text-charcoal">
                      Classes taken
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2.5">
                      {classes.map((programme) => (
                        <li key={programme.slug}>
                          <Link
                            href={href(`/programmes/${programme.slug}`)}
                            className="inline-flex min-h-11 items-center rounded-full border border-chalk-deep bg-white px-4 text-sm text-charcoal hover:border-primary hover:text-primary"
                          >
                            {programme.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </Section>
        );
      })}

      <Section tone="ink" size="md" ornament>
        <SectionHeading
          tone="dark"
          kicker="One organisation"
          title="The Institute is the teaching arm"
          standfirst={`It sits under ${FOUNDATION_NAME}, which also runs the empowerment fund and publishes the accounts.`}
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="donate" size="lg">
            <Link href={href("/programmes")}>See what they teach</Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/library")}>Listen first</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

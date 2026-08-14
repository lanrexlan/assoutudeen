import type { Metadata } from "next";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";

export const metadata: Metadata = {
  title: "Teachers",
  description:
    "Imam Engr. Abd'Waasi Tirmidhi A. (Abu Mubaashir) and Shaykh Yaaqub Muhibullah Abd'hammed Olore — the teachers of the Assoutudeen Dawah Institute.",
};

/**
 * The two verified teachers (CLAUDE.md). Full biographies are unconfirmed and
 * shown as placeholders — see TODO-CONTENT.md #26.
 */
export default function TeachersPage() {
  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The institute"
          title="Teachers"
          standfirst="Two scholars, and the classes they lead."
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardTitle>
              Imam Engr. Abd&apos;Waasi Tirmidhi A. (Abu Mubaashir)
            </CardTitle>
            <CardDescription className="mt-2">
              Founder, author and chief instructor. Author of{" "}
              <i>Endless Blessings From The Creator</i> and lead teacher of the
              institute&apos;s programmes.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>
              Shaykh Yaaqub Muhibullah Abd&apos;hammed Olore
            </CardTitle>
            <CardDescription className="mt-2">
              Guest scholar of the monthly Fiqh seminar.
            </CardDescription>
          </Card>
        </div>

        <Prose className="mt-12">
          <h2>Biographies</h2>
          <p>
            <Todo>
              full biographies — Islamic education, teachers, qualifications and
              a portrait photograph
            </Todo>
          </p>
        </Prose>
      </Section>
    </>
  );
}

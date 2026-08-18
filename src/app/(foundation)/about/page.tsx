import type { Metadata } from "next";
import Link from "next/link";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { CONTACT } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";
import { VERSES } from "@/lib/verses";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Assoutudeen Prophetic Medicine Foundation — an Islamic charity in Ede, Osun State, working in prophetic medicine, empowerment and dawah.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        image="about"
          eyebrow="About"
          title="Who we are"
          standfirst="An Islamic charity registered in Ede, Osun State, working wherever a Muslim needs it — where healing by the Sunnah meets practical help for people in difficulty."
        />

      <Section>
        <Prose>
          <ProseHeading>What we do</ProseHeading>
          <p>
            Assoutudeen Prophetic Medicine Foundation works in three connected ways.
            We teach and publish on prophetic medicine — the remedies of the Qur&apos;an
            and the Sunnah, traced to their evidence. We run a monthly empowerment fund
            that helps Muslims in medical or financial difficulty. And through the
            Assoutudeen Dawah Institute we teach seven classes from Friday to Sunday, free and open.
          </p>
          <p>
            The foundation keeps its office on Assoutudeen Street, Ede, because
            that is where its people are — not because that is where its work
            stops. Assistance is for Muslims in need, and where someone lives has
            never been the test. Requests reach us from across Nigeria and from
            outside it, and so do donations.
          </p>

          <ProseHeading>The problem we exist to answer</ProseHeading>
          <p>
            Two things happen constantly around us. A family faces a hospital bill they
            cannot pay, and there is no system that will catch them. And a great deal of
            what is sold as &ldquo;Islamic medicine&rdquo; is unreferenced, unverifiable,
            and sometimes dangerous. We answer both: money raised and accounted for to
            the naira, and remedies published with their chain of evidence attached.
          </p>

          <ProseHeading>How we work</ProseHeading>
          <ul>
            <li>
              <strong>We publish what we raise.</strong> Every year, by category and to
              the naira. The accounts are audited and filed with the Corporate Affairs
              Commission, and the totals we publish are the totals we filed.
            </li>
            <li>
              <strong>We name nobody without consent.</strong> People come to us at their
              lowest. Impact is reported by category — &ldquo;four children in secondary
              school&rdquo;, &ldquo;a revert sister&rdquo; — unless someone has given
              separate written permission to be named.
            </li>
            <li>
              <strong>We do not tell anyone to stop their treatment.</strong> Prophetic
              medicine sits alongside the care of a qualified doctor, never in place
              of it.
            </li>
            <li>
              <strong>Zakat is kept separate.</strong> It has its own ledger and its own
              eligibility rules, and it is never spent on running costs.
            </li>
          </ul>

          <ProseHeading>Our values, and where they come from</ProseHeading>
        </Prose>

        <ArabicQuote className="mt-4 max-w-2xl" {...VERSES.baqarah177} />

        <Prose className="mt-8">
          <ProseHeading>Founded</ProseHeading>
          <p>
            The foundation was incorporated on{" "}
            <strong>{REGISTRATION.incorporatedOnDisplay}</strong> by the Corporate
            Affairs Commission as {REGISTRATION.registeredName}, registration{" "}
            <strong>{REGISTRATION.number}</strong>. Its registered office is{" "}
            {REGISTRATION.registeredOffice}. The trustees, the constitution and the
            annual accounts are on the{" "}
            <Link href="/about/accountability">accountability page</Link>.
          </p>
          <p>
            Our office is at {CONTACT.address}. You can reach us on{" "}
            <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a> or at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </Prose>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-2xl">More about the foundation</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardTitle>
              <Link href="/about/founder" className="underline-offset-4 hover:underline">
                The founder
              </Link>
            </CardTitle>
            <CardDescription>
              Imam Engr. Abd&apos;Waasi Tirmidhi A. (Abu Mubaashir) — who he is, what he
              has studied, and what he has written.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>
              <Link href="/about/structure" className="underline-offset-4 hover:underline">
                Our structure
              </Link>
            </CardTitle>
            <CardDescription>
              How the foundation, the Dawah Institute and the Honey Enterprise relate to
              one another.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>
              <Link
                href="/about/accountability"
                className="underline-offset-4 hover:underline"
              >
                Accountability
              </Link>
            </CardTitle>
            <CardDescription>
              Registration, trustees, annual reports, how money is spent, and who to ask
              about it.
            </CardDescription>
          </Card>
        </div>
      </Section>
    </>
  );
}

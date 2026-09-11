import type { Metadata } from "next";
import Link from "next/link";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { LanternRule, SealNumber } from "@/components/ui/flourish";
import { CONTACT } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";
import { VERSES } from "@/lib/verses";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Assoutudeen Prophetic Medicine Foundation — an Islamic charity in Ede, Osun State, working in prophetic medicine, empowerment and dawah.",
};

/** The four commitments, each one a cost the foundation accepts. */
const RULES = [
  {
    title: "We publish what we raise",
    body: "Every year, by category and to the naira. The accounts are audited and filed with the Corporate Affairs Commission, and the totals we publish are the totals we filed.",
  },
  {
    title: "We name nobody without consent",
    body: "People come to us at their lowest. Impact is reported by category — \u201cfour children in secondary school\u201d, \u201ca revert sister\u201d — unless someone has given separate written permission to be named.",
  },
  {
    title: "We never tell anyone to stop treatment",
    body: "Prophetic medicine sits alongside the care of a qualified doctor, never in place of it.",
  },
  {
    title: "Zakat is kept separate",
    body: "It has its own ledger and its own eligibility rules, and it is never spent on running costs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        image="about"
          eyebrow="About"
          title="Who we are"
          standfirst="An Islamic charity registered in Ede, Osun State, working wherever a Muslim needs it — where healing by the Sunnah meets practical help for people in difficulty."
        />

      <Section tone="white" band="top">
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

        </Prose>
      </Section>

      {/* --- The four rules, given the weight they deserve ------------------ */}
      <Section tone="chalk" size="lg" band="top" ornament>
        <SectionHeading
          kicker="How we work"
          title="Four rules we do not bend"
          standfirst="Each of these is a decision that costs us something. That is rather the point of writing them down."
        />

        <ol className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {RULES.map((rule, index) => (
            <li
              key={rule.title}
              className="reveal flex gap-4 rounded-lg border border-chalk-dark bg-white p-6 shadow-sm"
            >
              <SealNumber value={index + 1} />
              <div>
                <p className="font-display text-lg text-charcoal">{rule.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-muted">
                  {rule.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* --- The verse the values come from, on the deep ground ------------- */}
      <Section tone="ink" size="lg" band="top" bloom ornament>
        <SectionHeading
          tone="dark"
          kicker="Our values"
          title="Where they come from"
          standfirst="Not a mission statement. The passage the foundation was built to answer."
        />
        <ArabicQuote className="mx-auto mt-10 max-w-2xl" tone="dark" {...VERSES.baqarah177} />
      </Section>

      <Section tone="white" band="top">
        <LanternRule className="mb-10" />
        <Prose>
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

      <Section tone="chalk" size="lg" band="top">
        <SectionHeading kicker="Go deeper" title="More about the foundation" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Card variant="seal">
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
          <Card variant="seal">
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
          <Card variant="seal">
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

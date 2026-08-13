import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, CreditCard, HeartHandshake, Repeat, Shield } from "lucide-react";
import { ArabicQuote } from "@/components/ui/arabic-quote";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { CONTACT } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";
import { VERSES } from "@/lib/verses";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give to the Monthly Empowerment Fund, to zakat, or to the foundation's general work. Registered charity CAC/IT/NO 139886.",
};

/** Suggested amounts, in naira. Kobo conversion happens at checkout. */
const AMOUNTS = [1_000, 5_000, 25_000, 100_000];

const PURPOSES = [
  {
    icon: HeartHandshake,
    title: "Empowerment Fund",
    body: "The monthly circle that meets medical and financial need. If you are unsure where to give, give here.",
  },
  {
    icon: Shield,
    title: "Zakat",
    body: "Held as a separate fund and given only to recipients eligible under the eight Qur'anic categories. Never spent on running costs.",
  },
  {
    icon: Repeat,
    title: "Sadaqah jāriyah",
    body: "Continuing charity — the work that keeps giving after the gift is made.",
  },
];

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to make a donation — please send the account details.",
)}`;

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Give to the fund"
        standfirst="Steady monthly giving is what lets us answer a case in the week it arrives. One-off gifts matter just as much when something large lands."
      />

      {/* --- Amounts ------------------------------------------------------- */}
      <Section tone="sand" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              align="start"
              kicker="Choose an amount"
              title="What would you like to give?"
              standfirst="Card payment runs through Paystack. We never see or store your card details."
            />

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AMOUNTS.map((amount) => (
                <li key={amount}>
                  <span className="flex min-h-16 items-center justify-center rounded-lg border border-sand-dark bg-white font-display text-lg shadow-sm">
                    ₦{amount.toLocaleString("en-NG")}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-amber/40 bg-amber/10 p-5 text-sm leading-relaxed text-charcoal">
              <p className="font-semibold">Card checkout is not live yet.</p>
              <p className="mt-1 text-charcoal-muted">
                Paystack is being wired up with a signed, verified webhook, because a
                donation should only be recorded once the bank has actually confirmed
                it. Until that is finished, give by transfer or on WhatsApp and we will
                confirm receipt personally.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="donate">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Give on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/empowerment/join">Set up a monthly pledge</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="reveal">
              <div className="flex items-center gap-3">
                <Medallion tone="soft" className="size-11">
                  <Banknote aria-hidden="true" className="size-5" />
                </Medallion>
                <CardTitle>By bank transfer</CardTitle>
              </div>
              <CardDescription>
                Bank: <Todo>bank for public donations</Todo>
                <br />
                Account name: <Todo>account name exactly as held</Todo>
                <br />
                Account number: <Todo>account number, verified before publishing</Todo>
              </CardDescription>
              <p className="rounded-md border border-sand-dark bg-sand p-3 text-sm text-charcoal-muted">
                We will not print an account number that has not been confirmed to us in
                writing — one wrong digit on a public page sends your money to a
                stranger. Ask on WhatsApp and we will send the details directly.
              </p>
            </Card>

            <Card className="reveal">
              <div className="flex items-center gap-3">
                <Medallion tone="soft" className="size-11">
                  <CreditCard aria-hidden="true" className="size-5" />
                </Medallion>
                <CardTitle>Where your money goes</CardTitle>
              </div>
              <CardDescription>
                To the purpose you chose. Where we can, we pay the hospital or the
                supplier directly. The accounts are audited each year and filed with the
                Corporate Affairs Commission under {REGISTRATION.number}.
              </CardDescription>
              <Link
                href="/about/accountability"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-olive underline-offset-4 hover:underline"
              >
                Read the accounts
              </Link>
            </Card>
          </div>
        </div>
      </Section>

      {/* --- Purposes ------------------------------------------------------- */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="What you can give to"
          title="Three funds, kept apart"
          standfirst="Zakat in particular is never pooled with anything else — it has its own ledger and its own eligibility rules."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PURPOSES.map(({ icon: Icon, ...purpose }) => (
            <Card key={purpose.title} variant="arch" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{purpose.title}</CardTitle>
              <CardDescription>{purpose.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* --- Verse ---------------------------------------------------------- */}
      <Section tone="ink" size="lg" ornament>
        <div className="mx-auto max-w-3xl">
          <ArabicQuote tone="dark" className="reveal" {...VERSES.baqarah274} />
        </div>
      </Section>

      <Section tone="sand" size="md">
        <Prose className="mx-auto">
          <h2>A note on receipts</h2>
          <p>
            Every gift is recorded against a reference. Email receipts go out
            automatically once the payment work is finished; until then, ask and we will
            send you written confirmation.
          </p>
          <p>
            Questions about money should reach a person, not an inbox — see the{" "}
            <Link href="/about/accountability">accountability page</Link>.
          </p>
        </Prose>
      </Section>
    </>
  );
}

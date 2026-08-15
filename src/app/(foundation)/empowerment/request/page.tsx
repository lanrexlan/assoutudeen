import type { Metadata } from "next";
import Link from "next/link";
import { EyeOff, Lock, MessageCircle, Phone } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { AssistanceForm } from "@/components/site/assistance-form";
import { IntakeNotice } from "@/components/site/intake-notice";
import { formatIntakeDate, getIntakeState } from "@/lib/intake";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Request assistance",
  description:
    "Ask the Assoutudeen Monthly Empowerment Fund for help with a medical or financial need. Confidential, and nobody is named without their written consent.",
};

const whatsappHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to ask the foundation for assistance.",
)}`;

export default function RequestAssistancePage() {
  const { status, round } = getIntakeState();
  const open = status === "open";

  return (
    <>
      <PageHeader
        eyebrow="Empowerment fund"
        title="Request assistance"
        standfirst={
          open && round
            ? `Requests are open until ${formatIntakeDate(round.closesOn)}. One form, read by a person, answered by a person.`
            : "The fund takes requests in rounds, a few times a year. One form, read by a person, answered by a person."
        }
      />

      <Section tone="sand" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <IntakeNotice />
            {open ? (
              <div className="rounded-xl border border-sand-dark bg-white p-6 shadow-sm sm:p-8">
                <AssistanceForm />
              </div>
            ) : null}
          </div>

          <aside className="space-y-5">
            {[
              {
                icon: EyeOff,
                title: "You will not be put on display",
                body: "We report our work by category — 'a revert sister', 'four children back in school'. Your name, photograph and story stay private unless you separately agree, in writing, that they need not.",
              },
              {
                icon: Lock,
                title: "Who can see this",
                body: "Requests are stored where only the foundation's administrators can open them. Editors and shop staff cannot see them at all.",
              },
              {
                icon: Phone,
                title: "What happens next",
                body: "Someone calls you to talk it through, asks for a bill or a diagnosis if there is one, and speaks to your referee. Where we can, we pay the hospital directly.",
              },
            ].map(({ icon: Icon, ...item }) => (
              <Card key={item.title} className="reveal gap-3 p-5">
                <div className="flex items-center gap-3">
                  <Medallion tone="soft" className="size-11">
                    <Icon aria-hidden="true" className="size-5" />
                  </Medallion>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </div>
                <CardDescription>{item.body}</CardDescription>
              </Card>
            ))}

            <Card className="gap-3 border-olive/25 p-5">
              <div className="flex items-center gap-3">
                <Medallion className="size-11">
                  <MessageCircle aria-hidden="true" className="size-5" />
                </Medallion>
                <CardTitle className="text-base">Would rather talk?</CardTitle>
              </div>
              <CardDescription>
                Forms are not for everyone, and urgency does not wait. Message us and a
                person will answer.
              </CardDescription>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-semibold text-olive underline decoration-amber decoration-2 underline-offset-4"
              >
                Message on WhatsApp
              </a>
            </Card>

            <p className="text-sm leading-relaxed text-charcoal-muted">
              How a case is checked and paid is set out on{" "}
              <Link
                href="/our-work"
                className="font-medium text-olive underline decoration-amber decoration-2 underline-offset-4"
              >
                our work
              </Link>
              .
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}

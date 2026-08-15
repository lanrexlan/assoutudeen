import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Coins, Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SealFrame, Medallion } from "@/components/ui/ornament";
import { GivingScene } from "@/components/ui/illustration";
import { PageHeader } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { PledgeForm } from "@/components/site/pledge-form";

export const metadata: Metadata = {
  title: "Join the Empowerment Fund",
  description:
    "Pledge a monthly contribution to the Assoutudeen Monthly Empowerment Fund, by card or by standing transfer.",
};

export default function JoinFundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Empowerment fund"
        title="Join the fund"
        standfirst="A monthly contribution — whatever is steady for you. It is the reason we can answer a case in the week it arrives instead of opening an appeal and hoping."
      />

      <Section tone="chalk" size="lg">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-chalk-dark bg-white p-6 shadow-sm sm:p-8">
            <PledgeForm />
          </div>

          <aside className="space-y-5">
            <SealFrame className="aspect-square w-full max-w-xs">
              <GivingScene />
            </SealFrame>

            {[
              {
                icon: CalendarClock,
                title: "Monthly, not dramatic",
                body: "₦2,500 every month is worth more to a family in Ede than ₦25,000 once, because we can plan around it.",
              },
              {
                icon: Users,
                title: "You are joining a circle",
                body: "Contributors, not donors at arm's length. The empowerment lecture on the last Monday of the month is open to you.",
              },
              {
                icon: Coins,
                title: "Cancel whenever",
                body: "A pledge is a promise, not a contract. Tell us and it stops, with no awkwardness.",
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

            <p className="text-sm leading-relaxed text-charcoal-muted">
              Looking for a one-off gift instead?{" "}
              <Link
                href="/donate"
                className="font-medium text-oxblood underline decoration-apricot decoration-2 underline-offset-4"
              >
                Donate once
              </Link>
              . Need help rather than wanting to give?{" "}
              <Link
                href="/empowerment/request"
                className="font-medium text-oxblood underline decoration-apricot decoration-2 underline-offset-4"
              >
                Request assistance
              </Link>
              .
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}

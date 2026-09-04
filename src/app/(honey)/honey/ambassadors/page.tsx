import type { Metadata } from "next";
import Link from "next/link";
import { Award, Share2, Trophy, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Medallion } from "@/components/ui/ornament";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Ambassadors",
  description:
    "Share a referral code for Assoutudeen honey: how attribution works, what counts as a qualifying order, and how the leaderboard and prize tiers are decided.",
};

const joinHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "Hello. I would like to become an Assoutudeen honey ambassador.",
)}`;

const STEPS = [
  {
    icon: UserPlus,
    title: "Ask for a code",
    body: "Message us and we issue you a code of your own. There is no fee to join and no stock to buy up front.",
  },
  {
    icon: Share2,
    title: "Share it",
    body: "Give it to people who are not already buying from us. They quote it when they order.",
  },
  {
    icon: Award,
    title: "Qualifying orders count",
    body: "An order of five litres or more — ₦40,000 and up — from someone new to us is credited to your code.",
  },
  {
    icon: Trophy,
    title: "The leaderboard settles it",
    body: "Totals are published and updated automatically, so nobody has to take our word for their position.",
  },
];

const RULES = [
  {
    rule: "New customers only",
    detail:
      "A code counts when the buyer has not bought from us before. Referring someone who already orders from us moves no honey — it only moves the credit.",
  },
  {
    rule: "First code wins",
    detail:
      "If a buyer is given two codes, the first one recorded against them takes the credit. It stays with that ambassador for the orders that follow.",
  },
  {
    rule: "Five litres minimum",
    detail:
      "The qualifying order is five litres or more. Below that the margin does not carry a referral, and we would rather say so than quietly not pay.",
  },
  {
    rule: "Paid orders only",
    detail:
      "An order counts once it is paid for and dispatched. Cancelled and refunded orders come back off the total.",
  },
  {
    rule: "Tiers are published",
    detail:
      "Prize tiers and what they take are set in advance and shown on the leaderboard. They are not adjusted after the fact to suit a result.",
  },
];

export default async function AmbassadorsPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <PageHeader
        image="ambassadors"
        eyebrow="Ambassadors"
        title="Share a code, earn on it"
        standfirst="A referral programme with the rules written down before anyone competes — including the ones that decide against you."
      />

      <Section tone="chalk" size="lg" ornament>
        <SectionHeading
          kicker="How it works"
          title="Four steps, no fee"
          standfirst="You do not buy stock, hold inventory or pay to join. You share a code and the orders it brings are credited to you."
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, body }, index) => (
            <li
              key={title}
              className="reveal flex flex-col gap-3 rounded-lg border border-chalk-dark bg-white p-6"
            >
              <Medallion>
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-apricot-dark">
                Step {index + 1}
              </p>
              <p className="font-display text-lg text-charcoal">{title}</p>
              <p className="text-sm leading-relaxed text-charcoal-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* --- The rules ------------------------------------------------------ */}
      <Section tone="white" size="lg">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              align="start"
              kicker="The rules"
              title="Written down first"
              standfirst="Referral schemes go wrong when the rules are decided after the orders come in. These are fixed, and they are the same for everyone."
            />
            <Prose className="mt-6">
              <p>
                The leaderboard is generated from the orders themselves rather than
                compiled by hand, so a position is a consequence of the ledger and not
                of who asked. Where a code conflict has to be resolved, the rule below
                decides it, not a judgement call.
              </p>
            </Prose>
          </div>

          <ul className="space-y-4">
            {RULES.map((entry) => (
              <li
                key={entry.rule}
                className="reveal rounded-lg border border-chalk-dark bg-chalk p-5"
              >
                <p className="font-display text-lg text-charcoal">{entry.rule}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-muted">
                  {entry.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* --- The leaderboard ------------------------------------------------ */}
      <Section tone="ink" size="lg" ornament>
        <SectionHeading
          tone="dark"
          kicker="Leaderboard"
          title="Published as soon as there is something to publish"
          standfirst="The board goes live with the first season of the programme. Until real orders have been attributed there is nothing to show, and an invented table would be worse than an empty page."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="donate" size="lg">
            <a href={joinHref} target="_blank" rel="noopener noreferrer">
              Ask for a code
            </a>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/shop")}>See what buyers get</Link>
          </Button>
        </div>
      </Section>

      <Section tone="chalk" size="md">
        <Disclaimer className="mx-auto max-w-3xl" title="What an ambassador may say">
          Ambassadors sell a food product. Nothing in the programme permits telling a
          buyer that honey treats, prevents or cures a disease — and a code will be
          withdrawn from anyone who does.
        </Disclaimer>
      </Section>
    </>
  );
}

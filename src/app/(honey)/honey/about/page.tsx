import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/ui/disclaimer";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { foundationUrl } from "@/components/site/foundation-link";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "About the Enterprise",
  description:
    "The Assoutudeen Honey Enterprise is the commercial arm of the Assoutudeen Prophetic Medicine Foundation — pure honey from our own farm.",
};

export default async function AboutPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The enterprise"
          title="About the Enterprise"
          standfirst="The commercial arm of the Assoutudeen Prophetic Medicine Foundation — pure honey, from our own farm."
        />
      </Section>

      <Section>
        <Prose>
          <h2>What the Enterprise is</h2>
          <p>
            Assoutudeen Honey Enterprise is the foundation&apos;s commercial arm.
            Where the Dawah Institute is the education arm, the honey enterprise
            is the business — pure honey from our own farm, sold by the litre,
            retail and wholesale, delivered across Nigeria.
          </p>

          <h2>What we sell</h2>
          <p>
            Pure honey in litre sizes, for homes, shops and resellers. Nothing
            is added, and nothing is claimed beyond what it is.{" "}
            <Todo>
              pack sizes, prices and delivery zones — the price list is
              unconfirmed
            </Todo>
          </p>

          <h2>Ambassadors</h2>
          <p>
            Our ambassador programme rewards referrals: a referral code, credited
            when a new customer&apos;s first qualifying order is placed, with a
            public leaderboard and prize tiers. See the{" "}
            <Link href={href("/ambassadors")} className="underline underline-offset-4">
              ambassadors page
            </Link>{" "}
            for how it works.
          </p>

          <h2>Part of the foundation</h2>
          <p>
            The Enterprise sits visibly under the Assoutudeen Prophetic Medicine
            Foundation — the parent charity — alongside the Dawah Institute.{" "}
            <a href={foundationUrl} className="underline underline-offset-4">
              Visit the foundation →
            </a>
          </p>

          <h2>Honey is food, not medicine</h2>
          <p>
            We sell honey as a food product. Nothing on this site claims it
            treats, prevents or cures any disease — and nothing on the product
            pages ever will.
          </p>
        </Prose>

        <Disclaimer className="mt-8" />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="justify-between">
            <div>
              <CardTitle>Shop honey</CardTitle>
              <CardDescription className="mt-2">
                Retail and wholesale, by the litre.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/shop")}>Shop honey →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Our honey</CardTitle>
              <CardDescription className="mt-2">
                Where it comes from and how to tell real honey from fake.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/our-honey")}>Read about our honey →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Become an ambassador</CardTitle>
              <CardDescription className="mt-2">
                Referral codes, a live leaderboard and prize tiers.
              </CardDescription>
            </div>
            <Button asChild variant="link" className="self-start px-0">
              <Link href={href("/ambassadors")}>See the programme →</Link>
            </Button>
          </Card>
        </div>
      </Section>
    </>
  );
}

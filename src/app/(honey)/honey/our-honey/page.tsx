import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/ui/disclaimer";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "Our Honey",
  description:
    "Pure honey from the Assoutudeen Honey Enterprise — where it comes from, how it is sold, and how to tell real honey from fake.",
};

/** Educational food-product page: no health claims (NAFDAC rule). */
export default async function OurHoneyPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="The enterprise"
          title="Our honey"
          standfirst="Pure honey from our own farm, sold by the litre — and what makes honey worth trusting."
        />
      </Section>

      <Section>
        <Prose>
          <h2>What we sell</h2>
          <p>
            Pure honey, in litre sizes, retail and wholesale, delivered across
            Nigeria.{" "}
            <Todo>
              pack sizes, prices and delivery zones — the price list is
              unconfirmed
            </Todo>
          </p>

          <h2>How to tell real honey from fake</h2>
          <p>
            <Todo>
              the full guide — sourced notes on testing and choosing honey
            </Todo>
          </p>

          <h2>Honey is food, not medicine</h2>
          <p>
            We sell honey as a food product. Nothing on this site claims it
            treats, prevents or cures any disease — and nothing on the product
            pages ever will.
          </p>
        </Prose>

        <Disclaimer className="mt-8" />

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={href("/shop")}>Shop honey</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/")}>Back to the enterprise</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

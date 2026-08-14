import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { CONTACT } from "@/lib/sites";
import { getSiteContext } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The foundation's shop is the honey enterprise: pure honey, sold by the litre, retail and wholesale.",
};

/**
 * The foundation itself sells nothing; the shop belongs to the Honey
 * Enterprise. This page keeps the foundation nav honest and sends visitors
 * where the product actually is.
 */
export default async function ShopPage() {
  const { href } = await getSiteContext("foundation");

  return (
    <>
      <Section tone="primary">
        <PageHeader
          eyebrow="Shop"
          title="The honey shop"
          standfirst="Everything the foundation sells comes from our own farm — pure honey, by the litre."
        />
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="justify-between">
            <div>
              <CardTitle>Assoutudeen Honey Enterprise</CardTitle>
              <CardDescription>
                Pure honey, retail and wholesale, delivered across Nigeria. The
                shop lives on the enterprise&apos;s own site.
              </CardDescription>
            </div>
            <Button asChild variant="primary">
              <Link href={href("/honey")}>Visit the honey farm →</Link>
            </Button>
          </Card>
          <Card className="justify-between">
            <div>
              <CardTitle>Order today</CardTitle>
              <CardDescription>
                Until the online shop is built, orders are taken on WhatsApp.
              </CardDescription>
            </div>
            <Button asChild variant="secondary">
              <a
                href={`https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
                  "As-salaamu alaykum. I would like to order honey from Assoutudeen Honey Enterprise.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on WhatsApp
              </a>
            </Button>
          </Card>
        </div>

        <Prose className="mt-12">
          <h2>Prices and sizes</h2>
          <p>
            <Todo>honey price list, pack sizes and delivery zones</Todo>
          </p>
          <p>
            Honey is sold as a food product. Nothing on any product page claims
            it treats, prevents or cures disease.
          </p>
        </Prose>
      </Section>
    </>
  );
}

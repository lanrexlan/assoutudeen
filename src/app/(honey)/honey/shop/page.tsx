import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Package, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/ui/disclaimer";
import { SealFrame, Medallion } from "@/components/ui/ornament";
import { ApiaryScene } from "@/components/ui/illustration";
import { PageHeader, Prose, ProseHeading } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { PriceList } from "@/components/site/price-list";
import { getSiteContext } from "@/lib/site-context";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Honey prices by the litre from the Assoutudeen Honey Enterprise, from ₦10,000 for one litre to drum quantities at ₦8,000 a litre. Retail and wholesale, delivered across Nigeria.",
};

const orderHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to order honey.\nLitres: \nTown: \nDelivery or collection: ",
)}`;


export default async function HoneyShopPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <PageHeader
        image="honeyHome"
        eyebrow="Shop"
        title="Buy by the litre"
        standfirst="Retail and wholesale, delivered across Nigeria. Prices are published below — tell us the litres and your town and we will add the transport fare, in writing, before you pay anything."
      />

      <Section tone="chalk" size="lg" ornament>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <SectionHeading
              align="start"
              kicker="Price list"
              title="One honey, priced by the litre"
              standfirst="There is no product range to choose between — there is honey, and there is how much of it you need. From ten litres up, the rate is the same however large the order."
            />

            <PriceList className="mt-8" />
          </div>

          <figure className="reveal mx-auto w-full max-w-sm lg:sticky lg:top-24">
            <SealFrame className="aspect-3/4 w-full">
              <ApiaryScene />
            </SealFrame>
          </figure>
        </div>
      </Section>

      {/* --- Price and ordering -------------------------------------------- */}
      <Section tone="white" size="lg">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Prose>
            <ProseHeading>What transport costs</ProseHeading>
            <p>
              The prices above are for the honey alone. Delivery is quoted separately
              because it genuinely differs: a jar going across Ede and a drum going to
              Kano are not the same journey, and building an average into the price
              would overcharge everyone near us to subsidise everyone far away.
            </p>
            <p>
              Tell us your town when you order and you will have the fare before you
              pay anything. It is paid together with the order unless we agree
              otherwise. Collection from Ede is free.
            </p>

            <ProseHeading>How to order today</ProseHeading>
            <ul>
              <li>Message us on WhatsApp with the litres you want and your town.</li>
              <li>
                We confirm the total — honey plus transport — before anything is paid.
              </li>
              <li>
                Pay by bank transfer to the Honey Enterprise account we send you, and we
                dispatch once the transfer lands.
              </li>
            </ul>
            <p>
              Card checkout and a basket arrive with the payment work. Until a payment is
              verified by a signed webhook, no page here will pretend to have taken your
              money.
            </p>
          </Prose>

          <div className="space-y-4">
            {[
              {
                icon: MessageCircle,
                title: "Order on WhatsApp",
                body: "The fastest route, and how nearly every order reaches us. Send the litres and your town.",
              },
              {
                icon: Wallet,
                title: "Pay by transfer",
                body: "Bank details come with your total. Nothing is dispatched before the transfer clears.",
              },
              {
                icon: Truck,
                title: "Delivered nationwide",
                body: "Osun and the south-west first, then the rest of Nigeria by courier.",
              },
              {
                icon: Package,
                title: "Collect in Ede",
                body: `Free collection from ${CONTACT.address}. Call first so your order is waiting.`,
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-lg border border-chalk-dark bg-chalk p-5"
              >
                <Medallion tone="soft" className="size-11 shrink-0">
                  <Icon aria-hidden="true" className="size-5" />
                </Medallion>
                <div>
                  <p className="font-display text-lg text-charcoal">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
                    {body}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="donate" size="lg">
                <a href={orderHref} target="_blank" rel="noopener noreferrer">
                  Order on WhatsApp
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={href("/contact")}>Ask about wholesale</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="chalk" size="lg">
        <SectionHeading
          kicker="Before you buy"
          title="Two things worth reading first"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "How to tell real honey",
              body: "Nigeria has an adulteration problem. Here is what actually distinguishes honey from syrup, and which of the popular home tests prove nothing.",
              cta: "Read about our honey",
              to: "/our-honey",
            },
            {
              title: "Earn on what you refer",
              body: "Share a code, and qualifying orders from new customers count towards the leaderboard and the prize tiers.",
              cta: "Become an ambassador",
              to: "/ambassadors",
            },
          ].map((item) => (
            <Card key={item.title} variant="seal" className="reveal">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              <Link
                href={href(item.to)}
                className="mt-auto inline-flex min-h-11 items-center justify-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {item.cta}
              </Link>
            </Card>
          ))}
        </div>

        <Disclaimer className="mx-auto mt-12 max-w-3xl">
          Assoutudeen Honey Enterprise sells honey as a food product. Nothing on this
          page claims that honey treats, prevents or cures any disease.
        </Disclaimer>
      </Section>
    </>
  );
}

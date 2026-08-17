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
import { getSiteContext } from "@/lib/site-context";
import { CONTACT } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Buy pure honey by the litre from the Assoutudeen Honey Enterprise — retail and wholesale, delivered across Nigeria. Orders are taken on WhatsApp.",
};

const orderHref = `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
  "As-salaamu alaykum. I would like to order honey. Litres needed: ___. Town: ___.",
)}`;

/** What can be ordered. Volumes are the units we sell in; prices are quoted. */
const SIZES = [
  {
    volume: "1 litre",
    who: "A household",
    body: "The usual first order. Enough to keep in the kitchen and see whether you want more.",
  },
  {
    volume: "5 litres",
    who: "Bulk and resale",
    body: "The wholesale minimum, and the smallest order that qualifies for an ambassador's code.",
  },
  {
    volume: "10 litres and above",
    who: "Shops, masjids, distributors",
    body: "Priced by volume. Tell us how much you move and how often, and we will quote for the run.",
  },
];

export default async function HoneyShopPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <PageHeader
        image="honeyHome"
        eyebrow="Shop"
        title="Buy by the litre"
        standfirst="Retail and wholesale, delivered across Nigeria. Tell us the litres and your town, and you will have a price the same day."
      />

      <Section tone="chalk" size="lg" ornament>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <SectionHeading
              align="start"
              kicker="What we sell"
              title="One honey, three ways to buy it"
              standfirst="There is no product range to choose between — there is honey, and there is how much of it you need."
            />

            <div className="mt-8 space-y-4">
              {SIZES.map((size) => (
                <div
                  key={size.volume}
                  className="reveal flex flex-col gap-1 rounded-lg border border-chalk-dark bg-white p-5 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <p className="font-display text-xl text-charcoal sm:w-44 sm:shrink-0">
                    {size.volume}
                  </p>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-apricot-dark">
                      {size.who}
                    </p>
                    <p className="mt-1 text-charcoal-muted">{size.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <figure className="reveal mx-auto w-full max-w-sm">
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
            <ProseHeading>Why there is no price list</ProseHeading>
            <p>
              Honey is harvested in seasons and sold by weight, and delivery across
              Nigeria costs very different amounts depending on where you are. A fixed
              number on a page would be wrong for half the people reading it, so we
              quote instead: message us with the litres you want and your town, and you
              will have the figure the same day, in writing.
            </p>
            <p>
              Wholesale is priced by volume from five litres up. If you are reselling,
              say so — the rate is different and it is worth the conversation.
            </p>

            <ProseHeading>How to order today</ProseHeading>
            <ul>
              <li>Message us on WhatsApp with the litres and your town.</li>
              <li>We confirm the price, including delivery, before anything is paid.</li>
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
                body: "The fastest route, and how nearly every order reaches us.",
              },
              {
                icon: Wallet,
                title: "Pay by transfer",
                body: "Bank details are sent with your quote. Nothing is dispatched before the transfer clears.",
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
                  Get a price
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

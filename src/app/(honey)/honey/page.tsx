import Link from "next/link";
import { Award, Droplets, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Disclaimer } from "@/components/ui/disclaimer";
import {
  GiltRule,
  Kicker,
  Medallion,
  OrnamentField,
  Starfield,
} from "@/components/ui/ornament";
import { Section, SectionHeading } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";
import { getSiteContext } from "@/lib/site-context";

/**
 * The Honey Enterprise front door.
 *
 * Honey is a food product here, not a medicine: nothing on this page claims to
 * treat, prevent or cure anything (NAFDAC). The Qur'anic framing of honey
 * belongs on the educational pages, not on the buy button.
 */
export default async function HoneyHomePage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-sand">
        <OrnamentField tone="gold" />
        <Starfield />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-b-full bg-[radial-gradient(ellipse_at_top,rgba(217,164,65,0.22),transparent_65%)]"
        />
        <Container className="relative py-16 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Kicker align="center">Assoutudeen Honey Enterprise</Kicker>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-white sm:text-5xl">
              Pure honey, sold by the litre
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sand/85">
              Retail and wholesale, delivered across Nigeria. The trading arm of the
              Assoutudeen Prophetic Medicine Foundation.
            </p>
            <GiltRule className="mt-8" />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="donate" size="lg">
                <Link href={href("/shop")}>Shop honey</Link>
              </Button>
              <Button asChild variant="ghostLight" size="lg">
                <Link href={href("/ambassadors")}>Become an ambassador</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="sand" size="lg" ornament>
        <SectionHeading
          kicker="Why buy from us"
          title="Honey you can actually trace"
          standfirst="Nigeria has a fake honey problem. Our answer is to tell you where ours comes from and how to test what you are given — including honey you did not buy from us."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Droplets,
              title: "Our honey",
              body: "Where it is harvested, how it is handled, and how to tell real honey from adulterated syrup.",
              href: "/our-honey",
            },
            {
              icon: Award,
              title: "Ambassadors",
              body: "Share your code, earn on qualifying orders, and watch a leaderboard that updates itself.",
              href: "/ambassadors",
            },
            {
              icon: Truck,
              title: "Wholesale",
              body: "Volume pricing from a five-litre minimum, for resellers, shops and masjids.",
              href: "/shop",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Card key={item.title} variant="arch" className="reveal items-center">
              <Medallion className="mx-auto">
                <Icon aria-hidden="true" className="size-6" />
              </Medallion>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.body}</CardDescription>
              <Link
                href={href(item.href)}
                className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-amber-dark underline-offset-4 hover:underline"
              >
                Read more
              </Link>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-charcoal-muted">
          <Todo>price list per litre and per pack size, and delivery zones and rates</Todo>
        </p>
      </Section>

      <Section tone="white" size="md">
        <Disclaimer className="mx-auto max-w-3xl">
          Assoutudeen Honey Enterprise sells honey as a food product. Nothing on this
          site claims that honey treats, prevents or cures any disease.
        </Disclaimer>
      </Section>
    </>
  );
}

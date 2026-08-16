import type { Metadata } from "next";
import Link from "next/link";
import { Beaker, Droplets, FlaskConical, ThermometerSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Medallion, SealFrame } from "@/components/ui/ornament";
import { ApiaryScene } from "@/components/ui/illustration";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteContext } from "@/lib/site-context";
import { FOUNDER } from "@/lib/founder";

export const metadata: Metadata = {
  title: "Our honey",
  description:
    "Where Assoutudeen honey comes from, how it is handled, and an honest account of which home tests for fake honey actually prove anything.",
};

/** The popular home tests, and what each one is really worth. */
const HOME_TESTS = [
  {
    icon: Droplets,
    name: "The water test",
    claim: "Real honey sinks in a glass of water and does not dissolve; fake honey clouds it.",
    truth:
      "It shows density and water content, nothing more. Thick syrup behaves the same way, and genuine honey with a higher moisture content can fail it.",
  },
  {
    icon: ThermometerSun,
    name: "The thumb test",
    claim: "A drop of real honey stays put on your thumb instead of spreading.",
    truth:
      "Again, viscosity. It tells you the honey is thick. Thickness can be bought at any market.",
  },
  {
    icon: FlaskConical,
    name: "The flame test",
    claim: "A wick dipped in real honey lights; adulterated honey will not burn.",
    truth:
      "This is about moisture, and it is unreliable in both directions. It is also the easiest way to burn yourself proving nothing.",
  },
  {
    icon: Beaker,
    name: "Laboratory analysis",
    claim: "Sugar-profile and isotope testing distinguish honey from added syrup.",
    truth:
      "This is the one that actually answers the question. It costs money and takes time, which is why sellers prefer the kitchen tests.",
  },
];

export default async function OurHoneyPage() {
  const { href } = await getSiteContext("honey");

  return (
    <>
      <PageHeader
        eyebrow="Our honey"
        title="Where it comes from"
        standfirst="Nigeria has a fake honey problem, and no amount of insisting fixes it. What helps is telling you where ours comes from and being honest about how little the popular tests prove."
      />

      <Section tone="chalk" size="lg" ornament>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <Prose>
            <h2>Kept, not just traded</h2>
            <p>
              The Honey Enterprise began with the founder&apos;s own hives.{" "}
              {FOUNDER.name} keeps bees, and the enterprise grew out of that rather than
              out of a decision to enter a market. It still buys from beekeepers as well
              as harvesting its own — and if you want to know where a particular batch
              came from, ask. We will tell you, and we would rather you asked than
              assumed.
            </p>

            <h2>How it is handled</h2>
            <ul>
              <li>
                <strong>Nothing added.</strong> No syrup, no glucose, no water. Honey is
                sold as honey.
              </li>
              <li>
                <strong>Strained, not stripped.</strong> Coarse straining removes wax and
                debris. It is not filtered to the point where the pollen is gone.
              </li>
              <li>
                <strong>Not heated to clarity.</strong> Heat makes honey look prettier on
                a shelf. It is done for the seller, not the buyer.
              </li>
              <li>
                <strong>It will crystallise.</strong> Granulation is normal, and is
                closer to a sign of real honey than a fault. Stand the jar in warm water
                and it loosens.
              </li>
            </ul>

            <h2>What we will not claim</h2>
            <p>
              Honey is a food. This page says nothing about what it treats or prevents,
              because a product page making a health claim is both against NAFDAC rules
              and beneath the foundation. What the Qur&apos;an and the Sunnah say about
              honey is taught properly, with its evidence, on the foundation&apos;s
              prophetic medicine pages — not next to a buy button.
            </p>
          </Prose>

          <figure className="reveal mx-auto w-full max-w-sm">
            <SealFrame className="aspect-3/4 w-full">
              <ApiaryScene />
            </SealFrame>
            <figcaption className="mt-3 text-center text-xs text-charcoal-muted">
              Drawn for this site. Photographs of the hives replace it as they are taken.
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* --- The tests ------------------------------------------------------ */}
      <Section tone="white" size="lg">
        <SectionHeading
          kicker="Judge for yourself"
          title="The home tests, honestly"
          standfirst="Every honey seller in Nigeria will invite you to do one of these. Here is what each one actually measures — including when it fails us."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {HOME_TESTS.map(({ icon: Icon, name, claim, truth }) => (
            <div
              key={name}
              className="reveal flex gap-4 rounded-lg border border-chalk-dark bg-chalk p-6"
            >
              <Medallion tone="soft" className="size-11 shrink-0">
                <Icon aria-hidden="true" className="size-5" />
              </Medallion>
              <div>
                <p className="font-display text-lg text-charcoal">{name}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                  <span className="font-semibold text-charcoal">The claim: </span>
                  {claim}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                  <span className="font-semibold text-charcoal">What it shows: </span>
                  {truth}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-charcoal-muted">
          Use them on honey you did not buy from us, too. A seller who is confident
          about their honey has no reason to mind.
        </p>
      </Section>

      <Section tone="ink" size="md" ornament>
        <SectionHeading
          tone="dark"
          kicker="Where the money goes"
          title="Trading arm, charitable owner"
          standfirst="The enterprise is owned by the foundation. What it earns supports the foundation's work rather than a shareholder."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="donate" size="lg">
            <Link href={href("/shop")}>Get a price</Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href={href("/about")}>How the enterprise works</Link>
          </Button>
        </div>
      </Section>

      <Section tone="chalk" size="md">
        <Disclaimer className="mx-auto max-w-3xl">
          Assoutudeen Honey Enterprise sells honey as a food product. Nothing on this
          page claims that honey treats, prevents or cures any disease.
        </Disclaimer>
      </Section>
    </>
  );
}

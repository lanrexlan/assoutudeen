import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { StructureDiagram } from "@/components/site/structure-diagram";
import { siteConfig } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";

export const metadata: Metadata = {
  title: "Our structure",
  description:
    "How the Assoutudeen Prophetic Medicine Foundation, the Assoutudeen Dawah Institute and the Assoutudeen Honey Enterprise relate to one another.",
};

export default function StructurePage() {
  return (
    <>
      <PageHeader
        image="structure"
          eyebrow="About"
          title="Our structure"
          standfirst="One charity, two arms. The foundation is the parent; the Dawah Institute and the Honey Enterprise sit beneath it."
        />

      <Section>
        <StructureDiagram />

        <Prose className="mt-10">
          <h2>Assoutudeen Prophetic Medicine Foundation</h2>
          <p>
            The parent body and the registered charity. It receives donations, runs the
            monthly empowerment fund, publishes the annual accounts, and holds
            responsibility for everything done in the Assoutudeen name. Registered with
            the Corporate Affairs Commission as Incorporated Trustees on{" "}
            {REGISTRATION.incorporatedOnDisplay} under{" "}
            <strong>{REGISTRATION.number}</strong>.
          </p>

          <h2>Assoutudeen Dawah Institute</h2>
          <p>
            The education arm. It teaches seven classes across Friday, Saturday and
            Sunday evenings — Tafsir on Fridays; Hadith and Prophetic Medicine on
            alternating Saturdays; Fiqh, Virtues of the Companions, and Qur&apos;an and
            Modern Science on Sundays; and a monthly seminar on business transactions
            and interpersonal relations taught by Shaykh (Dr) Yaaqub Muhibullah
            Abd&apos;hammed Olore. The Institute is not separately incorporated and holds
            no funds of its own; it operates under the foundation.
          </p>

          <h2>Assoutudeen Honey Enterprise</h2>
          <p>
            The commercial arm, selling pure honey by the litre to retail and wholesale
            customers. It is a business rather than a charity, and its books are kept
            separate from the foundation&apos;s — a charity&apos;s money and a
            company&apos;s money should never be difficult to tell apart.
          </p>
          <p>
            The Honey Enterprise trades under the foundation&apos;s name and its books
            are kept separately from the charity&apos;s, so a donation and a honey
            order never sit in the same ledger. Where trading income supports the
            foundation&apos;s charitable work it is recorded as income in the annual
            accounts, alongside donations, and audited with them.
          </p>
          <p>
            We would rather state that plainly than leave it vague. Ambiguity about
            where charity money goes invites exactly the suspicion that transparency is
            meant to prevent.
          </p>
        </Prose>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg">
            <a href={`https://${siteConfig.dawah.hostname}`}>
              Visit the Dawah Institute
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={`https://${siteConfig.honey.hostname}`}>
              Visit the Honey Enterprise
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}

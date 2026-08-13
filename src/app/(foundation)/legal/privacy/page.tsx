import type { Metadata } from "next";
import { LegalShell } from "@/components/site/legal-shell";
import { Todo } from "@/components/ui/todo";
import { CONTACT, FOUNDATION_NAME } from "@/lib/sites";
import { REGISTRATION } from "@/lib/organisation";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How the Assoutudeen Prophetic Medicine Foundation collects, uses and protects personal data under the Nigeria Data Protection Act 2023.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy policy"
      standfirst="What we collect, why, how long we keep it, and what you can ask us to do about it."
    >
      <h2>Who we are</h2>
      <p>
        {FOUNDATION_NAME}, {CONTACT.address}. Registered with the Corporate Affairs
        Commission as Incorporated Trustees under {REGISTRATION.number}, incorporated
        on {REGISTRATION.incorporatedOnDisplay}.
        You can reach us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or on{" "}
        <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>.
      </p>
      <p>
        Our data protection contact is <Todo>named person responsible for data protection, with a direct email</Todo>.
        Whether we are required to register as a data controller of major importance with
        the Nigeria Data Protection Commission, and whether we must appoint a Data
        Protection Officer, depends on the volume of data we process:{" "}
        <Todo>confirm current NDPC thresholds and whether APMF meets them</Todo>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>When you contact us</strong> — your name, email, phone number if you
          give one, and what you write to us.
        </li>
        <li>
          <strong>When you subscribe to email</strong> — your email address, your name if
          you give one, and a record of when you consented.
        </li>
        <li>
          <strong>When you donate</strong> — your name, email and the amount. Card details
          go directly to Paystack and never reach our servers; we never see or store them.
        </li>
        <li>
          <strong>When you ask for assistance</strong> — the details of your situation,
          which may include health information about you or your family, and any documents
          you upload. This is sensitive personal data and we treat it as such.
        </li>
        <li>
          <strong>When you buy honey or a book</strong> — your delivery address and phone
          number.
        </li>
      </ul>

      <h2>Why we may use it, and on what basis</h2>
      <p>
        <Todo>
          legal basis table — consent, contract, legitimate interest or legal obligation,
          set against each category above. Confirm with a lawyer
        </Todo>
      </p>
      <p>
        We ask for consent with an unticked box, every time. We never pre-tick a consent
        checkbox, and declining does not stop you from using the site.
      </p>

      <h2>Publishing your story</h2>
      <p>
        Applying for assistance is not permission to be written about. We report our
        impact by category — &ldquo;four children in secondary school&rdquo;, &ldquo;a
        revert sister&rdquo; — and we will not publish your name, your photograph or your
        story unless you have given separate, explicit, written consent for that
        specifically. We keep a record of that consent, and you can withdraw it.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Only the services that make the site work: <Todo>confirm the final list</Todo> —
        currently our hosting provider (Vercel), our database provider (Neon), our media
        host (Cloudinary), our payment processor (Paystack), and our email provider
        (Resend). We do not sell personal data, and we do not share it with anyone else
        unless the law requires it.
      </p>
      <p>
        <Todo>data processing agreements signed with each processor</Todo>
      </p>

      <h2>How long we keep it</h2>
      <p>
        <Todo>
          retention periods for each category — contact messages, subscribers, donation
          records, assistance applications, consent records
        </Todo>
      </p>

      <h2>How we protect it</h2>
      <p>
        The site is served over HTTPS. The database is encrypted at rest, access to the
        admin panel is restricted by role, and staff accounts only see what their role
        requires — editors, for example, cannot see donation or order records at all.
      </p>
      <p>
        <Todo>backup schedule and data breach response plan</Todo>
      </p>

      <h2>Your rights</h2>
      <p>
        Under the Nigeria Data Protection Act 2023 you can ask us for a copy of your data,
        ask us to correct it, ask us to delete it, object to how we are using it, or
        withdraw consent you have given. Write to{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will respond within{" "}
        <Todo>response window — 30 days is the usual commitment</Todo>. If you are not
        satisfied, you can complain to the Nigeria Data Protection Commission.
      </p>

      <h2>Cookies</h2>
      <p>
        <Todo>
          confirm whether analytics will be used. If yes, a cookie banner with a genuine
          decline option is required before it loads
        </Todo>
      </p>
    </LegalShell>
  );
}

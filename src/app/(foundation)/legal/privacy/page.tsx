import type { Metadata } from "next";
import { LegalShell } from "@/components/site/legal-shell";
import { ProseHeading } from "@/components/ui/prose";
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
      <ProseHeading>Who we are</ProseHeading>
      <p>
        {FOUNDATION_NAME}, {CONTACT.address}. Registered with the Corporate Affairs
        Commission under {REGISTRATION.number}, incorporated on{" "}
        {REGISTRATION.incorporatedOnDisplay}.
        You can reach us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or on{" "}
        <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>.
      </p>
      <p>
        Data protection questions reach us at{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, marked for the
        Secretary, who is responsible for personal data at the foundation. Whether we
        meet the threshold to register with the Nigeria Data Protection Commission as a
        data controller of major importance is assessed each year against the volume of
        data we hold; we will say so here if and when we do.
      </p>

      <ProseHeading>What we collect</ProseHeading>
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

      <ProseHeading>Why we may use it, and on what basis</ProseHeading>
      <ul>
        <li>
          <strong>Consent</strong> — email updates, and any publication of your name,
          photograph or story. You may withdraw it at any time.
        </li>
        <li>
          <strong>Contract</strong> — fulfilling an order for a book or for honey.
        </li>
        <li>
          <strong>Legitimate interest</strong> — replying to a message you sent us, and
          keeping our own records of what we did and why.
        </li>
        <li>
          <strong>Legal obligation</strong> — the financial records we must keep and
          file with the Corporate Affairs Commission.
        </li>
      </ul>
      <p>
        We ask for consent with an unticked box, every time. We never pre-tick a consent
        checkbox, and declining does not stop you from using the site.
      </p>

      <ProseHeading>Publishing your story</ProseHeading>
      <p>
        Applying for assistance is not permission to be written about. We report our
        impact by category — &ldquo;four children in secondary school&rdquo;, &ldquo;a
        revert sister&rdquo; — and we will not publish your name, your photograph or your
        story unless you have given separate, explicit, written consent for that
        specifically. We keep a record of that consent, and you can withdraw it.
      </p>

      <ProseHeading>Who we share it with</ProseHeading>
      <p>
        Only the services that make the site work: our hosting provider (Vercel), our
        database provider (Neon), our media host (Cloudinary), our payment processor
        (Paystack) and our email provider (Resend). Each is engaged under its standard
        data processing terms. We do not sell personal data, and we do not share it
        with anyone else unless the law requires it.
      </p>

      <ProseHeading>How long we keep it</ProseHeading>
      <ul>
        <li>Messages you send us — two years, then deleted.</li>
        <li>Email subscribers — until you unsubscribe, and one year after that.</li>
        <li>
          Donation and order records — six years, because charity and tax records must
          be kept.
        </li>
        <li>
          Requests for assistance — two years after the case closes, so that a repeat
          request has context; the supporting documents are deleted as soon as the case
          is decided.
        </li>
        <li>Consent records — for as long as we rely on the consent, and three years after.</li>
      </ul>

      <ProseHeading>How we protect it</ProseHeading>
      <p>
        The site is served over HTTPS. The database is encrypted at rest, access to the
        admin panel is restricted by role, and staff accounts only see what their role
        requires — editors, for example, cannot see donation or order records at all.
      </p>
      <p>
        The database is backed up daily by our provider. If personal data were ever
        exposed, we would tell the Nigeria Data Protection Commission within 72 hours
        of becoming aware, and tell anyone materially affected directly.
      </p>

      <ProseHeading>Your rights</ProseHeading>
      <p>
        Under the Nigeria Data Protection Act 2023 you can ask us for a copy of your data,
        ask us to correct it, ask us to delete it, object to how we are using it, or
        withdraw consent you have given. Write to{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will respond
        within 30 days. If you are not satisfied, you can complain to the Nigeria Data
        Protection Commission.
      </p>

      <ProseHeading>Cookies</ProseHeading>
      <p>
        This site sets no analytics or advertising cookies, and embeds no third-party
        players — which is why the lecture recordings link out to Facebook rather than
        playing here. If we ever add analytics, a banner with a genuine decline option
        will appear before anything loads.
      </p>
    </LegalShell>
  );
}

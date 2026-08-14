"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type FormState } from "@/app/(foundation)/actions";
import { Button } from "@/components/ui/button";
import {
  CONTACT_ROUTES,
  CONTACT_SUBJECTS,
  type ContactSubject,
} from "@/lib/contact-routing";

const initialState: FormState = { ok: false, message: "" };

const inputClass =
  "min-h-11 w-full rounded-md border border-sand-dark bg-white px-3 text-charcoal placeholder:text-charcoal-muted";

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-charcoal">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-sm text-charcoal-muted">{hint}</span> : null}
      {error ? (
        <span className="mt-1 block text-sm font-medium text-olive-dark">{error}</span>
      ) : null}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

/**
 * Contact form with a subject dropdown. The chosen subject decides which inbox
 * the message is addressed to — see lib/contact-routing.ts. Submissions are
 * stored in the CMS immediately, so nothing depends on email working.
 */
export function ContactForm({
  privacyHref = "/legal/privacy",
}: {
  /** Where the consent line links. Subdomains point at the foundation's copy. */
  privacyHref?: string;
}) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const [topic, setTopic] = useState<ContactSubject>("general");

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-lg border border-sand-dark bg-white p-6 text-charcoal"
      >
        <p className="font-display text-xl">Message received</p>
        <p className="mt-2 text-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        defaultValue=""
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={state.errors?.name}>
          <input name="name" required autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Email address" error={state.errors?.email}>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone or WhatsApp (optional)" error={state.errors?.phone}>
          <input name="phone" autoComplete="tel" inputMode="tel" className={inputClass} />
        </Field>
        <Field
          label="What is it about?"
          error={state.errors?.topic}
          hint={CONTACT_ROUTES[topic].hint}
        >
          <select
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value as ContactSubject)}
            className={inputClass}
          >
            {CONTACT_SUBJECTS.map((value) => (
              <option key={value} value={value}>
                {CONTACT_ROUTES[value].label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Subject" error={state.errors?.subjectLine}>
        <input name="subjectLine" required className={inputClass} />
      </Field>

      <Field label="Message" error={state.errors?.message}>
        <textarea
          name="message"
          required
          rows={6}
          className={`${inputClass} min-h-32 py-2`}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-charcoal">
        <input
          type="checkbox"
          name="consent"
          value="on"
          className="mt-0.5 size-5 shrink-0 rounded border-sand-dark"
        />
        <span>
          I agree that Assoutudeen Prophetic Medicine Foundation may store this message
          and contact me about it. See the{" "}
          <a href={privacyHref} className="underline underline-offset-4">
            privacy policy
          </a>
          .
        </span>
      </label>
      {state.errors?.consent ? (
        <p className="text-sm font-medium text-olive-dark">{state.errors.consent}</p>
      ) : null}

      {state.message && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-olive-dark">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />

      <p className="text-sm text-charcoal-muted">
        Please do not send medical records or bank details through this form.
      </p>
    </form>
  );
}

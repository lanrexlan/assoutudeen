"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter, type FormState } from "@/app/(foundation)/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: FormState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="donate" disabled={pending} className="sm:w-auto">
      {pending ? "Subscribing…" : "Subscribe"}
    </Button>
  );
}

/**
 * Email capture. Consent is a separate, unticked checkbox — never bundled into
 * the act of typing an address (NDPA 2023).
 */
export function NewsletterForm({
  source,
  className,
}: {
  /** Which page the signup came from, stored with the subscriber. */
  source?: string;
  className?: string;
}) {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);

  if (state.ok) {
    return (
      <p
        role="status"
        className={cn("rounded-md bg-white/10 p-4 text-sm text-white", className)}
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-3", className)} noValidate>
      <input type="hidden" name="source" value={source ?? ""} />
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        defaultValue=""
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(state.errors?.email)}
            className="min-h-11 w-full rounded-md border border-white/25 bg-white px-3 text-charcoal placeholder:text-charcoal-muted"
          />
        </label>
        <SubmitButton />
      </div>

      {state.errors?.email ? (
        <p className="text-sm text-white">{state.errors.email}</p>
      ) : null}

      <label className="flex items-start gap-3 text-sm text-white/90">
        <input
          type="checkbox"
          name="consent"
          value="on"
          // Deliberately NOT defaultChecked.
          className="mt-0.5 size-5 shrink-0 rounded border-white/40"
        />
        <span>
          I agree to receive occasional email from Assoutudeen Prophetic Medicine
          Foundation. You can unsubscribe at any time.
        </span>
      </label>

      {state.errors?.consent ? (
        <p className="text-sm text-white">{state.errors.consent}</p>
      ) : null}
      {state.message && !state.ok ? (
        <p role="alert" className="text-sm text-white">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { joinTheFund, type FormState } from "@/app/(foundation)/actions";
import { Button } from "@/components/ui/button";
import {
  Consent,
  Field,
  FormSuccess,
  Honeypot,
  inputClass,
} from "@/components/site/form-fields";
import { cn } from "@/lib/utils";

const initialState: FormState = { ok: false, message: "" };

/** Suggested monthly amounts, in naira. */
const AMOUNTS = [1_000, 2_500, 5_000, 10_000, 25_000];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="donate" size="lg" disabled={pending}>
      {pending ? "Recording…" : "Join the fund"}
    </Button>
  );
}

export function PledgeForm() {
  const [state, formAction] = useActionState(joinTheFund, initialState);
  const [amount, setAmount] = useState<number | "custom">(5_000);

  if (state.ok) {
    return <FormSuccess title="Jazākallāhu khayran" message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <Honeypot />

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-charcoal">
          How much each month?
        </legend>
        <div className="flex flex-wrap gap-2">
          {AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              aria-pressed={amount === value}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
                amount === value
                  ? "border-olive bg-olive text-white"
                  : "border-sand-dark bg-white text-charcoal hover:border-olive",
              )}
            >
              ₦{value.toLocaleString("en-NG")}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount("custom")}
            aria-pressed={amount === "custom"}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
              amount === "custom"
                ? "border-olive bg-olive text-white"
                : "border-sand-dark bg-white text-charcoal hover:border-olive",
            )}
          >
            Another amount
          </button>
        </div>

        {amount === "custom" ? (
          <div className="mt-3">
            <Field label="Amount in naira" error={state.errors?.amount}>
              <input
                name="amount"
                type="number"
                inputMode="numeric"
                min={100}
                step={100}
                defaultValue={5000}
                className={inputClass}
              />
            </Field>
          </div>
        ) : (
          <input type="hidden" name="amount" value={amount} />
        )}
        {amount !== "custom" && state.errors?.amount ? (
          <p className="mt-2 text-sm font-medium text-olive-dark">{state.errors.amount}</p>
        ) : null}
      </fieldset>

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
        <Field label="Phone or WhatsApp" optional error={state.errors?.phone}>
          <input name="phone" autoComplete="tel" inputMode="tel" className={inputClass} />
        </Field>
        <Field
          label="How would you like to give?"
          error={state.errors?.method}
          hint="Card sets up a Paystack subscription. Transfer means we send you the details and you send it each month."
        >
          <select name="method" defaultValue="transfer" className={inputClass}>
            <option value="transfer">Monthly bank transfer</option>
            <option value="card">Card, automatically each month</option>
          </select>
        </Field>
      </div>

      <Field label="Which fund?" error={state.errors?.purpose}>
        <select name="purpose" defaultValue="empowerment" className={inputClass}>
          <option value="empowerment">Empowerment Fund</option>
          <option value="zakat">Zakat (kept as a separate fund)</option>
          <option value="sadaqah">Sadaqah jāriyah</option>
        </select>
      </Field>

      <Field label="Anything you would like to say" optional error={state.errors?.message}>
        <textarea name="message" rows={3} className={`${inputClass} min-h-24 py-2`} />
      </Field>

      <Consent name="consent" error={state.errors?.consent}>
        I agree that the foundation may store these details and contact me about my
        pledge. See the{" "}
        <a href="/legal/privacy" className="underline underline-offset-4">
          privacy policy
        </a>
        .
      </Consent>

      {state.message && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-olive-dark">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

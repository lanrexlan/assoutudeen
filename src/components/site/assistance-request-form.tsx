"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitAssistanceRequest,
  URGENCY_LABELS,
  type FormState,
} from "@/app/(foundation)/actions";
import { Button } from "@/components/ui/button";
import {
  ASSISTANCE_CATEGORIES,
  ASSISTANCE_CATEGORY_LABELS,
  type AssistanceCategory,
} from "@/lib/assistance";
import { CONTACT } from "@/lib/sites";

const initialState: FormState = { ok: false, message: "" };

const inputClass =
  "min-h-11 w-full rounded-md border border-sand-dark bg-white px-3 text-charcoal placeholder:text-charcoal-muted";

function Field({
  label,
  error,
  hint,
  children,
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

function ConsentCheckbox({
  name,
  required = false,
  children,
  error,
}: {
  name: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-charcoal">
      <input
        type="checkbox"
        name={name}
        value="on"
        required={required}
        className="mt-0.5 size-5 shrink-0 rounded border-sand-dark"
      />
      <span>{children}</span>
      {error ? (
        <span className="text-sm font-medium text-olive-dark">{error}</span>
      ) : null}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Submit my request"}
    </Button>
  );
}

/**
 * docs/11 Form 1 — intake for people in distress. Required fields (confirmed):
 * phone, local government, state of origin, someone to vouch for, and the
 * applicant category. Consent boxes all start unticked (NDPA 2023).
 *
 * Submissions are stored in the CMS immediately; a dedicated AssistanceRequest
 * collection and admin workflow are a later session.
 */
export function AssistanceRequestForm() {
  const [state, formAction] = useActionState(submitAssistanceRequest, initialState);
  const [selected, setSelected] = useState<AssistanceCategory[]>([]);

  const toggle = (category: AssistanceCategory) => {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-lg border border-sand-dark bg-white p-6 text-charcoal"
      >
        <p className="font-display text-xl">Request received</p>
        <p className="mt-2 text-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        defaultValue=""
      />

      <p className="rounded-md bg-amber/15 p-3 text-sm leading-relaxed text-charcoal">
        If your situation is an emergency, go to a hospital or call{" "}
        <a href={`tel:+${CONTACT.phoneE164}`} className="font-semibold underline underline-offset-4">
          {CONTACT.phoneDisplay}
        </a>{" "}
        now — do not wait for this form.
      </p>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg">About you</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" error={state.errors?.fullName}>
            <input name="fullName" required autoComplete="name" className={inputClass} />
          </Field>
          <Field
            label="Phone number"
            error={state.errors?.phone}
            hint="We will call or message this number."
          >
            <input
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="WhatsApp number"
            error={state.errors?.whatsapp}
            hint="Leave blank if it is the same as your phone number."
          >
            <input name="whatsapp" inputMode="tel" className={inputClass} />
          </Field>
          <Field label="Local government" error={state.errors?.localGovernment}>
            <input name="localGovernment" required className={inputClass} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="State of origin" error={state.errors?.stateOfOrigin}>
            <input name="stateOfOrigin" required className={inputClass} />
          </Field>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-charcoal">
            Which of these best describes you?
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {ASSISTANCE_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-3 text-sm text-charcoal">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={selected.includes(category)}
                  onChange={() => toggle(category)}
                  className="size-5 shrink-0 rounded border-sand-dark"
                />
                {ASSISTANCE_CATEGORY_LABELS[category]}
              </label>
            ))}
          </div>
          {state.errors?.categories ? (
            <p className="mt-1 text-sm font-medium text-olive-dark">
              {state.errors.categories}
            </p>
          ) : null}

          {selected.includes("other") ? (
            <Field label="Please describe" error={state.errors?.otherCategory}>
              <input name="otherCategory" className={inputClass} />
            </Field>
          ) : null}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg">Your need</legend>
        <Field
          label="Describe your situation"
          error={state.errors?.need}
          hint="What happened, and what do you need help with? No need for medical records here."
        >
          <textarea
            name="need"
            required
            rows={5}
            className={`${inputClass} min-h-28 py-2`}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-1 text-sm font-medium text-charcoal">How urgent?</legend>
            <div className="space-y-2">
              {Object.entries(URGENCY_LABELS).map(([value, label]) => (
                <label key={value} className="flex items-center gap-3 text-sm text-charcoal">
                  <input
                    type="radio"
                    name="urgency"
                    value={value}
                    required
                    className="size-5 shrink-0"
                  />
                  {label}
                </label>
              ))}
            </div>
            {state.errors?.urgency ? (
              <p className="mt-1 text-sm font-medium text-olive-dark">{state.errors.urgency}</p>
            ) : null}
          </fieldset>

          <div className="space-y-4">
            <Field
              label="Amount or item needed"
              error={state.errors?.itemNeeded}
              hint="A figure or an item — “a sewing machine” is as good as ₦25,000."
            >
              <input name="itemNeeded" required className={inputClass} />
            </Field>
            <fieldset>
              <legend className="mb-1 text-sm font-medium text-charcoal">
                Have you received help from the foundation before?
              </legend>
              <div className="flex gap-6">
                {["yes", "no"].map((value) => (
                  <label key={value} className="flex items-center gap-2 text-sm text-charcoal">
                    <input
                      type="radio"
                      name="helpedBefore"
                      value={value}
                      required
                      className="size-5 shrink-0"
                    />
                    {value === "yes" ? "Yes" : "No"}
                  </label>
                ))}
              </div>
              {state.errors?.helpedBefore ? (
                <p className="mt-1 text-sm font-medium text-olive-dark">
                  {state.errors.helpedBefore}
                </p>
              ) : null}
            </fieldset>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg">Someone to vouch for you</legend>
        <p className="text-sm leading-relaxed text-charcoal-muted">
          An imam, community leader or someone who knows you — we may contact them
          to verify your situation.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Their name" error={state.errors?.referenceName}>
            <input name="referenceName" required className={inputClass} />
          </Field>
          <Field label="Their phone number" error={state.errors?.referencePhone}>
            <input name="referencePhone" required inputMode="tel" className={inputClass} />
          </Field>
          <Field label="How you know them" error={state.errors?.referenceRelationship}>
            <input name="referenceRelationship" required className={inputClass} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-3 rounded-md bg-sand p-4">
        <legend className="font-display text-lg">Consent</legend>
        <p className="text-sm leading-relaxed text-charcoal-muted">
          Everything starts unticked. Nothing is assumed.
        </p>
        <ConsentCheckbox name="confirmTrue" required error={state.errors?.confirmTrue}>
          I confirm the information I have given is true.
        </ConsentCheckbox>
        <ConsentCheckbox name="consent" required error={state.errors?.consent}>
          I consent to the foundation storing my information to assess this request.
        </ConsentCheckbox>
        <ConsentCheckbox name="contactReferee" required error={state.errors?.contactReferee}>
          I agree the foundation may contact my referee to verify.
        </ConsentCheckbox>
        <ConsentCheckbox name="shareAnonymous">
          I am willing for my story to be shared anonymously (no name, no photo) to
          encourage donors.
        </ConsentCheckbox>
        <ConsentCheckbox name="shareNamed">
          I am willing for my story to be shared publicly with my name.
        </ConsentCheckbox>
      </fieldset>

      {state.message && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-olive-dark">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton />
        <span className="text-sm text-charcoal-muted">
          Prefer to talk?{" "}
          <a
            href={`https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(
              "As-salaamu alaykum. I would like to request assistance from the foundation. My situation:",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-4"
          >
            Message us on WhatsApp
          </a>
        </span>
      </div>
    </form>
  );
}

"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { requestAssistance, type FormState } from "@/app/(foundation)/actions";
import { Button } from "@/components/ui/button";
import {
  Consent,
  Field,
  FormSuccess,
  Honeypot,
  inputClass,
} from "@/components/site/form-fields";

const initialState: FormState = { ok: false, message: "" };

const CATEGORIES = [
  { value: "medical", label: "Medical — treatment, surgery, medication" },
  { value: "financial", label: "Financial — trade, tools, school fees" },
  { value: "shelter", label: "Shelter or clothing" },
  { value: "other", label: "Something else" },
];

/**
 * How applicants describe their own situation. Tick as many as apply — this is
 * what lets the foundation report its work by category without ever naming
 * anybody.
 */
const CIRCUMSTANCES = [
  { value: "widow", label: "Widow" },
  { value: "widower", label: "Widower" },
  { value: "orphan", label: "Orphan" },
  { value: "elderly", label: "Elderly" },
  { value: "disability", label: "Living with a disability" },
  { value: "chronically-ill", label: "Chronically ill" },
  { value: "revert", label: "Revert to Islam" },
  { value: "student", label: "Student" },
  { value: "unemployed", label: "Out of work" },
  { value: "displaced", label: "Displaced" },
  { value: "sole-carer", label: "Caring for dependants alone" },
  { value: "other", label: "Other" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send the request"}
    </Button>
  );
}

/**
 * Request for assistance.
 *
 * Health data is a special category under the NDPA 2023, so: the request is
 * stored where only administrators can read it, the two consents are asked
 * separately, and consent to be named is optional — help is never conditional
 * on agreeing to be written about.
 */
export function AssistanceForm() {
  const [state, formAction] = useActionState(requestAssistance, initialState);
  const [category, setCategory] = useState("medical");

  if (state.ok) {
    return <FormSuccess title="We have your request" message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <Honeypot />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={state.errors?.name}>
          <input name="name" required autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Phone number" error={state.errors?.phone}>
          <input
            name="phone"
            required
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="WhatsApp number" error={state.errors?.whatsapp}>
          <input name="whatsapp" required inputMode="tel" className={inputClass} />
        </Field>
        <Field label="Email address" optional error={state.errors?.email}>
          <input type="email" name="email" className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="State of origin" error={state.errors?.state}>
          <input name="state" required className={inputClass} />
        </Field>
        <Field label="Local government area" error={state.errors?.lga}>
          <input name="lga" required className={inputClass} />
        </Field>
      </div>

      <Field label="What kind of help is needed?" error={state.errors?.category}>
        <select
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={inputClass}
        >
          {CATEGORIES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>

      {category === "medical" ? (
        <Field label="Hospital or clinic" optional error={state.errors?.hospital}>
          <input name="hospital" className={inputClass} />
        </Field>
      ) : null}

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-charcoal">
          Does any of this describe your situation?
        </legend>
        <p className="mb-3 text-sm text-charcoal-muted">
          Tick as many as apply, or none. It helps us report what the fund does
          without ever naming anyone.
        </p>
        <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
          {CIRCUMSTANCES.map((item) => (
            <label
              key={item.value}
              className="flex min-h-11 items-center gap-3 text-sm text-charcoal"
            >
              <input
                type="checkbox"
                name="circumstances"
                value={item.value}
                className="size-5 shrink-0 rounded border-chalk-dark accent-oxblood"
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        label="Tell us what is happening"
        error={state.errors?.need}
        hint="In your own words. There is no need to write formally."
      >
        <textarea
          name="need"
          required
          rows={6}
          className={`${inputClass} min-h-32 py-2`}
        />
      </Field>

      <Field
        label="Amount needed, in naira"
        optional
        error={state.errors?.amount}
        hint="An estimate is fine. Leave it blank if you do not know."
      >
        <input name="amount" type="number" inputMode="numeric" min={0} className={inputClass} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Someone who can vouch for you"
          error={state.errors?.refereeName}
          hint="An imam, a doctor, a teacher or a community leader who knows your situation."
        >
          <input name="refereeName" required className={inputClass} />
        </Field>
        <Field label="Their phone number" error={state.errors?.refereePhone}>
          <input name="refereePhone" required inputMode="tel" className={inputClass} />
        </Field>
      </div>

      <p className="rounded-lg border border-chalk-dark bg-chalk p-4 text-sm leading-relaxed text-charcoal-muted">
        Hospital bills, a diagnosis or similar documents help us verify a case quickly.
        Please do not attach them here — someone will ask for them on WhatsApp once we
        have read your request, so they never sit on a public form.
      </p>

      <Consent name="consentToProcess" error={state.errors?.consentToProcess}>
        I agree that the foundation may store these details, including health
        information, and contact me and my referee to verify the request.
      </Consent>

      <Consent name="consentToBeNamed" error={state.errors?.consentToBeNamed}>
        <strong className="font-semibold">Separately, and only if you wish:</strong> I
        agree that my name, photograph or story may be published. You do not have to
        agree to this, and it makes no difference to whether you are helped — we report
        by category and name nobody by default.
      </Consent>

      {state.message && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-oxblood-dark">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

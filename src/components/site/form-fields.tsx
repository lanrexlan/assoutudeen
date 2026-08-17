"use client";

import { cn } from "@/lib/utils";

/** Shared field chrome for the public forms. */

export const inputClass =
  "min-h-11 w-full rounded-lg border border-chalk-dark bg-white px-3.5 text-charcoal transition-colors placeholder:text-charcoal-faint focus:border-oxblood";

export function Field({
  label,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium text-charcoal">
        {label}
        {optional ? (
          <span className="text-xs font-normal text-charcoal-faint">optional</span>
        ) : null}
      </span>
      {children}
      {hint ? (
        <span className="mt-1.5 block text-sm text-charcoal-muted">{hint}</span>
      ) : null}
      {error ? (
        <span className="mt-1.5 block text-sm font-medium text-oxblood-dark">{error}</span>
      ) : null}
    </label>
  );
}

/** Consent checkbox. Never `defaultChecked` — NDPA 2023. */
export function Consent({
  name,
  error,
  children,
  className,
}: {
  name: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-chalk-dark bg-white p-4", className)}>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
        <input
          type="checkbox"
          name={name}
          value="on"
          className="mt-0.5 size-6 shrink-0 rounded border-chalk-dark accent-oxblood"
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p className="mt-2 text-sm font-medium text-oxblood-dark">{error}</p>
      ) : null}
    </div>
  );
}

/** Hidden honeypot. Bots fill it; people never see it. */
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
      defaultValue=""
    />
  );
}

export function FormSuccess({ title, message }: { title: string; message: string }) {
  return (
    <div
      role="status"
      className="rounded-xl border border-oxblood/30 bg-white p-6 text-charcoal shadow-sm"
    >
      <p className="font-display text-xl">{title}</p>
      <p className="mt-2 leading-relaxed">{message}</p>
    </div>
  );
}

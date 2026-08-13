import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { Todo } from "@/components/ui/todo";

/**
 * Shared frame for the four legal pages.
 *
 * These are SHELLS. The structure and the obligations are taken from docs/06,
 * but the specifics — retention periods, refund windows, delivery rates, the
 * named data-protection contact — are decisions for the foundation and, where
 * money or liability is involved, for a lawyer. Every gap is marked.
 */
export function LegalShell({
  title,
  standfirst,
  children,
}: {
  title: string;
  standfirst: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} standfirst={standfirst} />

      <Section>
        <div className="max-w-2xl rounded-md border border-sand-dark bg-white p-4 text-sm leading-relaxed text-charcoal">
          <p className="font-semibold">This page is a draft.</p>
          <p className="mt-1 text-charcoal-muted">
            It sets out the structure and the obligations that apply. The marked gaps must
            be filled, and this text reviewed by a lawyer, before the site takes a single
            payment or publishes anything binding.
          </p>
          <p className="mt-2 text-charcoal-muted">
            Last reviewed: <Todo>date this policy was last reviewed</Todo>
          </p>
        </div>

        <Prose className="mt-8">{children}</Prose>
      </Section>
    </>
  );
}

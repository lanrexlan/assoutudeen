import { PageHeader, Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";

/**
 * Shared frame for the four legal pages.
 *
 * The structure and the obligations are taken from docs/06. Each page states
 * only what the foundation can actually stand behind — retention periods,
 * refund windows and delivery terms it already follows.
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
        <Prose>{children}</Prose>
      </Section>
    </>
  );
}

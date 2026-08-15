import { cn } from "@/lib/utils";

const DEFAULT_TEXT =
  "This page is educational and quotes the Qur'an, the Sunnah and classical scholarship. It is not medical advice, and nothing here claims to treat, prevent or cure any disease. Speak to a qualified doctor about any health condition.";

type DisclaimerProps = {
  /** Override for context-specific wording; the default is the standard one. */
  children?: React.ReactNode;
  title?: string;
  className?: string;
};

/**
 * Required on every remedy page (NAFDAC: honey is a food, not a medicine, and
 * product pages may make no health claim at all).
 */
export function Disclaimer({
  children,
  title = "Please note",
  className,
}: DisclaimerProps) {
  return (
    <aside
      role="note"
      className={cn(
        "rounded-md border border-chalk-dark bg-chalk p-4 text-sm leading-relaxed text-charcoal-muted",
        className,
      )}
    >
      <p className="mb-1 font-semibold text-charcoal">{title}</p>
      <p>{children ?? DEFAULT_TEXT}</p>
    </aside>
  );
}

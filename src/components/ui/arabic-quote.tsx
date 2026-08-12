import { cn } from "@/lib/utils";

type ArabicQuoteProps = {
  /**
   * Arabic text, copied verbatim from the source. Diacritics must be preserved
   * exactly — never retype or "tidy" an āyah.
   */
  arabic: string;
  /** English rendering of the meaning. */
  translation: string;
  /** Full citation, e.g. "Qur'an, At-Tawbah 9:105" or "Sahih al-Bukhari 5688". */
  source: string;
  className?: string;
};

export function ArabicQuote({
  arabic,
  translation,
  source,
  className,
}: ArabicQuoteProps) {
  return (
    <figure
      className={cn(
        "rounded-lg border-s-4 border-primary bg-white p-5 sm:p-6",
        className,
      )}
    >
      <p
        dir="rtl"
        lang="ar"
        className="font-arabic text-2xl leading-[2.2] text-charcoal sm:text-3xl"
      >
        {arabic}
      </p>
      <blockquote className="mt-4 text-base leading-relaxed text-charcoal">
        {translation}
      </blockquote>
      <figcaption className="mt-3 text-sm text-charcoal-muted">
        <cite className="not-italic">{source}</cite>
      </figcaption>
    </figure>
  );
}

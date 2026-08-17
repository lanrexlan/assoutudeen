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
  /** `light` on chalk and white grounds, `dark` on ink. */
  tone?: "light" | "dark";
};

export function ArabicQuote({
  arabic,
  translation,
  source,
  className,
  tone = "light",
}: ArabicQuoteProps) {
  const dark = tone === "dark";

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl p-6 sm:p-8",
        dark
          ? "border border-white/12 bg-ink-raised"
          : "border border-chalk-dark bg-white shadow-sm",
        className,
      )}
    >
      {/* Gold rule down the leading edge — the frame of a manuscript page. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-apricot/20 via-apricot to-apricot/20"
      />

      <p
        dir="rtl"
        lang="ar"
        className={cn(
          "font-arabic text-2xl leading-[2.1] sm:text-3xl sm:leading-[2.2]",
          dark ? "text-chalk" : "text-charcoal",
        )}
      >
        {arabic}
      </p>

      <span
        aria-hidden="true"
        className={cn(
          "my-5 block h-px w-full",
          dark ? "bg-white/12" : "bg-chalk-dark",
        )}
      />

      <blockquote
        className={cn(
          "text-base leading-relaxed",
          dark ? "text-chalk/85" : "text-charcoal",
        )}
      >
        {translation}
      </blockquote>
      <figcaption
        className={cn(
          "mt-3 text-sm",
          dark ? "text-apricot/90" : "text-charcoal-muted",
        )}
      >
        <cite className="not-italic">{source}</cite>
      </figcaption>
    </figure>
  );
}

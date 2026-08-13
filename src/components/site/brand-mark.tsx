import { cn } from "@/lib/utils";

/**
 * Interim brand mark: an eight-point khatim star set inside a mihrab arch,
 * drawn in one stroke weight.
 *
 * This is geometry, not a logo — no real logo file has been supplied yet (see
 * TODO-CONTENT.md). It is built so that swapping in the real mark is a
 * one-component change, and so that until then the header does not look
 * unfinished.
 */
export function BrandMark({
  className,
  title = "Assoutudeen",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 44"
      role="img"
      aria-label={title}
      className={cn("size-9", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      {/* Arch */}
      <path d="M20 1.5c10 0 18.5 8 18.5 18v23H1.5v-23c0-10 8.5-18 18.5-18Z" opacity="0.6" />
      {/* Khatim star */}
      <path d="M20 11l4.6 4.6h6.5v6.5L35.7 27 31.1 31.6v6.5h-6.5L20 42.7l-4.6-4.6H8.9v-6.5L4.3 27l4.6-4.6v-6.5h6.5L20 11Z" />
      <circle cx="20" cy="27" r="4.5" />
    </svg>
  );
}

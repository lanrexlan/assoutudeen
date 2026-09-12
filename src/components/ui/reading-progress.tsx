"use client";

import { useEffect, useState } from "react";

/**
 * A hairline showing how far through a long page the reader is.
 *
 * Only worth having where the page is genuinely long — a remedy chapter, an
 * annual report. On a short page it is noise, so it hides itself when there is
 * less than a screen and a half to scroll.
 *
 * Deliberately 2px, apricot, at the very top: it is a piece of information,
 * not an effect. It respects prefers-reduced-motion by not transitioning.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [worthShowing, setWorthShowing] = useState(false);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;

      /* Under half a screen of overflow, a progress bar tells the reader
         nothing they cannot already see. */
      setWorthShowing(scrollable > window.innerHeight * 0.5);
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!worthShowing) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 print:hidden"
    >
      <div
        className="h-full origin-left bg-apricot"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

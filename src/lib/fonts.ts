import { Fraunces, Inter, Noto_Naskh_Arabic } from "next/font/google";

/**
 * next/font downloads and self-hosts these at build time — no request ever
 * leaves the visitor's browser for Google. Subsets are kept minimal because
 * the audience is on mid-range Android over patchy data.
 */

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-fraunces",
});

/** Qur'an and hadith only. Diacritics must survive verbatim. */
export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-noto-naskh-arabic",
});

export const fontVariables = [
  inter.variable,
  fraunces.variable,
  notoNaskhArabic.variable,
].join(" ");

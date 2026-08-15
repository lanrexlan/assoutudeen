import {
  Fraunces,
  Inter,
  Montserrat,
  Noto_Naskh_Arabic,
} from "next/font/google";

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

/**
 * The brand font. APMF_brand_guide.md specifies Montserrat ExtraBold for the
 * wordmark, so the logo lockup is set in it — and only it, to keep the payload
 * small.
 */
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "800"],
  variable: "--font-montserrat",
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
  montserrat.variable,
  notoNaskhArabic.variable,
].join(" ");

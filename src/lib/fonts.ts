import {
  Manrope,
  Montserrat,
  Noto_Naskh_Arabic,
  Petrona,
} from "next/font/google";

/**
 * next/font downloads and self-hosts these at build time — no request ever
 * leaves the visitor's browser for Google. Subsets are kept minimal because
 * the audience is on mid-range Android over patchy data.
 */

/** Body. Manrope rather than Inter: same legibility at 15px on a cheap
 *  Android screen, without the look of every other site. */
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

/** Headings. Petrona is a warm, slightly narrow text serif that holds its
 *  colour against oxblood — where a didone would shatter at small sizes. */
export const petrona = Petrona({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-petrona",
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
  manrope.variable,
  petrona.variable,
  montserrat.variable,
  notoNaskhArabic.variable,
].join(" ");

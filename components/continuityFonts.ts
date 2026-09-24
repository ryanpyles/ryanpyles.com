import { Fraunces, Manrope } from "next/font/google";

/**
 * Fraunces + Manrope are used only by the Continuity Atlas prototype, which
 * renders on the /projects/[slug] case-study route. Declaring them here (not in
 * the global lib/fonts.ts) keeps them out of the every-page font preload; they
 * load only on the route that applies `continuityFontVars`.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--f-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--f-manrope",
});

export const continuityFontVars = `${fraunces.variable} ${manrope.variable}`;

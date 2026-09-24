import {
  Cormorant_Garamond,
  EB_Garamond,
  Inter,
  IBM_Plex_Mono,
} from "next/font/google";

/**
 * Self-hosted through next/font.
 *
 * These were six families requested from fonts.googleapis.com by a <link>
 * in the document head, which costs a third-party connection and a
 * stylesheet round trip before any text can paint. next/font downloads the
 * files at build time and serves them from the same origin, so the only
 * cost left is the font files themselves.
 *
 * Weights mirror what the old request asked for exactly — nothing added,
 * nothing dropped.
 */

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--f-cormorant",
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--f-eb-garamond",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--f-inter",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--f-plex-mono",
});

/* Fraunces and Manrope are used only by the Continuity Atlas prototype, so
   they are declared in components/continuityFonts.ts and applied on that
   component's root — kept out of this global set to avoid preloading them on
   every page. */
export const fontVariables = [
  cormorant.variable,
  ebGaramond.variable,
  inter.variable,
  plexMono.variable,
].join(" ");

/**
 * Locale punctuation and numerals — the editorial layer. Quotation marks,
 * spacing, and digit systems are conventions the browser will not apply for
 * you. These are small, deterministic, locale-keyed rules; the policy layer
 * exposes them so a component can quote or number correctly per audience.
 */

import { resolveFromChain } from "./locale";

interface QuotePair {
  open: string;
  close: string;
  /** Non-breaking space inside the marks (French convention). */
  pad?: boolean;
}

const NBSP = " ";

/** Primary quotation marks by locale, most-specific-first keys. */
const QUOTES: Record<string, QuotePair> = {
  "fr": { open: "«", close: "»", pad: true },
  "fr-CH": { open: "«", close: "»" },
  "de": { open: "„", close: "“" },
  "de-CH": { open: "«", close: "»" },
  "he": { open: "״", close: "״" },
  "ja": { open: "「", close: "」" },
  "zh": { open: "「", close: "」" },
  "zh-Hans": { open: "“", close: "”" },
  "ru": { open: "«", close: "»" },
  "es": { open: "«", close: "»" },
  "default": { open: "“", close: "”" },
};

/** Numeral systems available as a locale policy. */
export type NumeralSystem = "latin" | "native" | "locale-default";

/** Intl numbering-system id per locale for the "native" policy. */
const NATIVE_NUMBERS: Record<string, string> = {
  "ar": "arab",
  "fa": "arabext",
  "ur": "arabext",
  "hi": "deva",
  "mr": "deva",
  "bn": "beng",
  "default": "latn",
};

/** Wrap text in the locale's quotation marks, with French interior spacing. */
export function quote(text: string, locale: string): string {
  const q = resolveFromChain(locale, QUOTES, QUOTES.default);
  const inner = q.pad ? `${NBSP}${text}${NBSP}` : text;
  return `${q.open}${inner}${q.close}`;
}

/** Format a number for a locale, honoring a numeral-system policy. */
export function formatNumber(
  value: number,
  locale: string,
  system: NumeralSystem = "locale-default"
): string {
  try {
    if (system === "latin") {
      return new Intl.NumberFormat(`${locale}-u-nu-latn`).format(value);
    }
    if (system === "native") {
      const nu = resolveFromChain<string>(locale, NATIVE_NUMBERS, "latn");
      return new Intl.NumberFormat(`${locale}-u-nu-${nu}`).format(value);
    }
    return new Intl.NumberFormat(locale).format(value);
  } catch {
    return String(value);
  }
}

/** The dash a locale uses for ranges (em vs en with spacing varies by style). */
export function formatRange(a: number | string, b: number | string): string {
  return `${a}–${b}`; // en dash
}

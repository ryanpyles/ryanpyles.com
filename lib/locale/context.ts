/**
 * Locale-Aware Product System — locale as application state.
 *
 * Translation changes words; localization can change the product. Instead of
 * using locale only for string lookup, the system resolves a structured
 * LocaleContext that typography, layout, forms, formatting, and validation
 * all read from. This module resolves that context and its fallback chain.
 */

export interface LocaleContext {
  locale: string;
  language: string;
  script: string;
  region?: string;
  direction: "ltr" | "rtl";
  numberingSystem: string;
  calendar: string;
  currency?: string;
  measurementSystem: "metric" | "us";
  /** 1 = Monday … 7 = Sunday (ISO weekday of the first column). */
  weekStart: number;
}

const RTL_LANGUAGES = new Set(["ar", "he", "iw", "fa", "ur", "ps", "dv", "ckb", "yi"]);

/** Currency by region — language never implies currency on its own. */
const REGION_CURRENCY: Record<string, string> = {
  US: "USD", CA: "CAD", GB: "GBP", IE: "EUR", DE: "EUR", FR: "EUR",
  ES: "EUR", IT: "EUR", CH: "CHF", JP: "JPY", CN: "CNY", TW: "TWD",
  SA: "SAR", AE: "AED", IL: "ILS", IN: "INR", BR: "BRL", MX: "MXN",
  AU: "AUD", SE: "SEK", NO: "NOK",
};

/** Regions on US customary units; everything else resolves to metric. */
const US_UNITS = new Set(["US", "LR", "MM"]);

/** Regions whose calendar week starts on Sunday. */
const SUNDAY_START = new Set(["US", "CA", "JP", "IL", "SA", "AE", "BR", "MX", "IN", "TW", "CN", "KR"]);

/** Native numbering systems where a product may opt into them. */
const NATIVE_NUMBERS: Record<string, string> = {
  ar: "arab", fa: "arabext", ur: "arabext", hi: "deva", bn: "beng",
};

interface ResolveOptions {
  /** Use native numerals for scripts that have them (default latin). */
  numerals?: "latin" | "native";
}

/** Resolve a BCP-47 tag into a full LocaleContext. */
export function resolveLocale(tag: string, opts: ResolveOptions = {}): LocaleContext {
  let language = tag.split("-")[0].toLowerCase();
  let script = "";
  let region: string | undefined;

  try {
    const loc = new Intl.Locale(tag);
    const max = typeof loc.maximize === "function" ? loc.maximize() : loc;
    language = (max.language ?? language).toLowerCase();
    script = max.script ?? "";
    region = max.region;
  } catch {
    // Fall back to manual parsing for environments without Intl.Locale.
    const parts = tag.replace(/_/g, "-").split("-");
    for (const p of parts.slice(1)) {
      if (/^[A-Za-z]{4}$/.test(p)) script = p[0].toUpperCase() + p.slice(1).toLowerCase();
      else if (/^[A-Za-z]{2}$/.test(p)) region = p.toUpperCase();
    }
  }

  const direction = RTL_LANGUAGES.has(language) ? "rtl" : "ltr";
  const numberingSystem =
    opts.numerals === "native" ? NATIVE_NUMBERS[language] ?? "latn" : "latn";

  return {
    locale: tag,
    language,
    script: script || "Latn",
    region,
    direction,
    numberingSystem,
    calendar: "gregory",
    currency: region ? REGION_CURRENCY[region] : undefined,
    measurementSystem: region && US_UNITS.has(region) ? "us" : "metric",
    weekStart: region && SUNDAY_START.has(region) ? 7 : 1,
  };
}

/** CLDR-style fallback chain: fr-CA → fr → default. */
export function localeFallbacks(tag: string): string[] {
  const parts = tag.replace(/_/g, "-").split("-").filter(Boolean);
  const chain: string[] = [];
  for (let i = parts.length; i >= 1; i--) chain.push(parts.slice(0, i).join("-"));
  chain.push("default");
  return chain.filter((v, i) => chain.indexOf(v) === i);
}

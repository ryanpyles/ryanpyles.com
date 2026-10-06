/**
 * Locale resolution. `es` is rarely enough: punctuation, quotation marks,
 * numerals, and editorial conventions turn on the region and script subtags.
 * This builds the CLDR-style fallback chain (zh-Hant-TW → zh-Hant → zh →
 * default) so a lookup can walk from most to least specific, and derives
 * writing direction from the language rather than guessing from the script
 * alone.
 */

import type { ScriptName } from "./scripts";

export interface ParsedLocale {
  /** The tag as given, normalized (e.g. "zh-hant-tw" → "zh-Hant-TW"). */
  tag: string;
  language: string;
  script?: string;
  region?: string;
}

/** Languages written right-to-left, by ISO-639 code (incl. legacy "iw"). */
const RTL_LANGUAGES: ReadonlySet<string> = new Set([
  "ar",
  "he",
  "iw",
  "fa",
  "ur",
  "ps",
  "dv",
  "ckb",
  "yi",
]);

/** Parse a BCP-47 tag into language / script / region, best-effort. */
export function parseLocale(tag: string): ParsedLocale {
  const parts = tag.replace(/_/g, "-").split("-").filter(Boolean);
  const language = (parts[0] ?? "en").toLowerCase();
  let script: string | undefined;
  let region: string | undefined;
  for (const part of parts.slice(1)) {
    if (/^[A-Za-z]{4}$/.test(part)) {
      // Script subtag → Titlecase (Hant, Latn).
      script = part[0].toUpperCase() + part.slice(1).toLowerCase();
    } else if (/^[A-Za-z]{2}$/.test(part) || /^\d{3}$/.test(part)) {
      region = part.toUpperCase();
    }
  }
  const tagParts = [language, script, region].filter(Boolean) as string[];
  return { tag: tagParts.join("-"), language, script, region };
}

/**
 * Most-specific-first fallback chain, always ending in "default":
 *   zh-Hant-TW → zh-Hant → zh → default
 *   pt-BR      → pt      → default
 */
export function fallbackChain(tag: string): string[] {
  const { language, script, region } = parseLocale(tag);
  const chain: string[] = [];
  if (language && script && region)
    chain.push(`${language}-${script}-${region}`);
  if (language && script) chain.push(`${language}-${script}`);
  if (language && region) chain.push(`${language}-${region}`);
  chain.push(language);
  chain.push("default");
  // De-duplicate while preserving order.
  return chain.filter((v, i) => chain.indexOf(v) === i);
}

/** Direction for a locale, from its language (script is a fallback signal). */
export function directionFor(
  tag: string,
  dominant?: ScriptName
): "ltr" | "rtl" {
  const { language } = parseLocale(tag);
  if (RTL_LANGUAGES.has(language)) return "rtl";
  if (dominant === "Hebrew" || dominant === "Arabic") return "rtl";
  return "ltr";
}

/** Resolve a value from a locale-keyed table using the fallback chain. */
export function resolveFromChain<T>(
  tag: string,
  table: Partial<Record<string, T>>,
  fallback: T
): T {
  for (const key of fallbackChain(tag)) {
    const hit = table[key];
    if (hit !== undefined) return hit;
  }
  return fallback;
}

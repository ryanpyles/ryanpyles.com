/**
 * Locale registry for the per-locale landing pages.
 *
 * English is the canonical site and lives at the root (/about, /books, …).
 * The other locales get their own landing page at /<lang> with content written
 * for that audience. Each is a cultural variant, not a translation.
 *
 * "skandi" (Scandimix) is a deliberate experimental locale — a personal
 * Scandinavian hybrid — so it is routeable and in the switcher, but excluded
 * from hreflang/og:locale (it is not a standard BCP-47 language).
 */
export const locales = [
  "en",
  "fr",
  "es",
  "de",
  "it",
  "pt",
  "ja",
  "zh",
  "he",
  "skandi",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Locales that have their own landing route under /<lang>. */
export const landingLocales = locales.filter((l) => l !== defaultLocale);

/** Switcher display labels (each in its own script). */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ja: "日本語",
  zh: "繁中",
  he: "עברית",
  skandi: "SKANDI",
};

/**
 * hreflang value per locale. Uses precise tags where the segment is loose
 * (Traditional Chinese, Brazilian Portuguese). `null` = not a valid hreflang
 * locale (Scandimix), excluded from alternates.
 */
export const hreflangTag: Record<Locale, string | null> = {
  en: "en",
  fr: "fr",
  es: "es",
  de: "de",
  it: "it",
  pt: "pt-BR",
  ja: "ja",
  zh: "zh-Hant",
  he: "he",
  skandi: null,
};

/** og:locale (BCP-47 with region). `null` where none applies. */
export const localeTags: Record<Locale, string | null> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  de: "de_DE",
  it: "it_IT",
  pt: "pt_BR",
  ja: "ja_JP",
  zh: "zh_TW",
  he: "he_IL",
  skandi: null,
};

/** Writing direction. Only Hebrew is RTL. */
export function localeDir(locale: Locale): "ltr" | "rtl" {
  return locale === "he" ? "rtl" : "ltr";
}

export const siteUrl = "https://ryanpyles.com";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Landing URL path for a locale ("/" for English, "/es" otherwise). */
export function landingPath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

/**
 * hreflang alternates for the landing surface — every standard-locale landing
 * plus an x-default pointing at English. Scandimix is excluded (no valid tag).
 */
export function landingLanguageAlternates(): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const tag = hreflangTag[locale];
    if (tag) languages[tag] = `${siteUrl}${landingPath(locale)}`;
  }
  languages["x-default"] = `${siteUrl}/`;
  return languages;
}

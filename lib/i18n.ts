/**
 * Locale registry for the per-locale landing pages.
 *
 * English is the canonical site and lives at the root (/about, /books, …).
 * The other locales get their own landing page at /<lang> with content written
 * for that audience; those landings link into the shared English depth. This
 * keeps every existing URL intact and avoids advertising machine-translated
 * pages — each locale surface is genuinely its own content.
 */
export const locales = ["en", "es", "fr", "de", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Locales that have their own landing route under /<lang>. */
export const landingLocales = locales.filter((l) => l !== defaultLocale);

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
};

/** BCP-47 tag for html lang / og:locale. */
export const localeTags: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  ja: "ja_JP",
};

export const siteUrl = "https://ryanpyles.com";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Landing URL path for a locale ("/" for English, "/es" otherwise). */
export function landingPath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

/**
 * hreflang alternates for the landing surface — every locale's landing plus
 * an x-default pointing at English. Used in each landing's metadata.
 */
export function landingLanguageAlternates(): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${siteUrl}${landingPath(locale)}`;
  }
  languages["x-default"] = `${siteUrl}/`;
  return languages;
}

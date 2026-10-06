/**
 * Locale-Aware Product System — public surface.
 *
 *   const locale = createLocaleSystem({ defaultLocale: "en-US", supportedLocales: [...] });
 *   const ctx = locale.resolve("he-IL");
 *
 * The resolved context feeds typography (via Polytype), layout direction,
 * forms, and formatting. Translation changes words; this lets locale change
 * the product.
 */

import {
  resolveLocale,
  localeFallbacks,
  type LocaleContext,
} from "./context";
import {
  formatDate,
  formatNumber,
  formatCurrency,
  formatTemperature,
  formatDistance,
  sortLocale,
} from "./formats";

export interface LocaleSystemConfig {
  defaultLocale?: string;
  supportedLocales?: string[];
}

export class LocaleSystem {
  readonly defaultLocale: string;
  readonly supportedLocales: string[];

  constructor(config: LocaleSystemConfig = {}) {
    this.defaultLocale = config.defaultLocale ?? "en-US";
    this.supportedLocales = config.supportedLocales ?? [this.defaultLocale];
  }

  resolve(tag?: string): LocaleContext {
    return resolveLocale(tag ?? this.defaultLocale);
  }

  fallbacks(tag: string): string[] {
    return localeFallbacks(tag);
  }
}

export function createLocaleSystem(config: LocaleSystemConfig = {}): LocaleSystem {
  return new LocaleSystem(config);
}

export { resolveLocale, localeFallbacks };
export { formatDate, formatNumber, formatCurrency, formatTemperature, formatDistance, sortLocale };
export { addressSchema, ADDRESS_COUNTRIES, formatName, familyNameFirst } from "./forms";
export { MIRROR, DO_NOT_MIRROR, LOGICAL_PROPERTY_MAP, lintPhysicalProperties } from "./mirror";

export type { LocaleContext } from "./context";
export type { AddressField, PersonName } from "./forms";
export type { LintFinding } from "./mirror";

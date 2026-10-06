/**
 * Formatting — dates, numbers, currency, and units resolved through the
 * platform's Intl layer rather than hand-rolled. A bare "10/11/2026" is
 * ambiguous; "1,234.56" versus "1.234,56" is a locale decision; CAD is not
 * implied by English. These wrappers keep the underlying value normalized and
 * let presentation adapt.
 */

import type { LocaleContext } from "./context";

function nu(ctx: LocaleContext): string {
  return ctx.numberingSystem && ctx.numberingSystem !== "latn"
    ? `-u-nu-${ctx.numberingSystem}`
    : "";
}

export function formatDate(
  date: Date,
  ctx: LocaleContext,
  style: "long" | "medium" | "short" = "long"
): string {
  try {
    return new Intl.DateTimeFormat(`${ctx.locale}${nu(ctx)}`, { dateStyle: style }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function formatNumber(value: number, ctx: LocaleContext): string {
  try {
    return new Intl.NumberFormat(`${ctx.locale}${nu(ctx)}`).format(value);
  } catch {
    return String(value);
  }
}

export function formatCurrency(amount: number, ctx: LocaleContext, currency?: string): string {
  const cur = currency ?? ctx.currency ?? "USD";
  try {
    return new Intl.NumberFormat(`${ctx.locale}${nu(ctx)}`, {
      style: "currency",
      currency: cur,
    }).format(amount);
  } catch {
    return `${cur} ${amount}`;
  }
}

/** Temperature and distance, chosen by the context's measurement system. */
export function formatTemperature(celsius: number, ctx: LocaleContext): string {
  const us = ctx.measurementSystem === "us";
  const value = us ? celsius * 1.8 + 32 : celsius;
  const unit = us ? "fahrenheit" : "celsius";
  try {
    return new Intl.NumberFormat(ctx.locale, {
      style: "unit",
      unit,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${Math.round(value)}°${us ? "F" : "C"}`;
  }
}

export function formatDistance(km: number, ctx: LocaleContext): string {
  const us = ctx.measurementSystem === "us";
  const value = us ? km * 0.621371 : km;
  const unit = us ? "mile" : "kilometer";
  try {
    return new Intl.NumberFormat(ctx.locale, {
      style: "unit",
      unit,
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return `${value.toFixed(1)} ${us ? "mi" : "km"}`;
  }
}

/** Locale-aware collation — list ordering that English Unicode order gets wrong. */
export function sortLocale(items: string[], ctx: LocaleContext): string[] {
  try {
    const c = new Intl.Collator(ctx.locale);
    return [...items].sort((a, b) => c.compare(a, b));
  } catch {
    return [...items].sort();
  }
}

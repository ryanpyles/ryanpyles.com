/**
 * Polytype — a locale-aware typography engine for multilingual interfaces.
 *
 * It sits ABOVE the browser's text shaping (HarfBuzz, Unicode bidi, font
 * rasterization) and makes the product and design decisions the browser does
 * not: which font stack a script should use, how much leading a script needs,
 * whether a label will overflow once it is translated, and what happens at a
 * line boundary. The core is deterministic and inspectable — no model.
 *
 *   const type = new Polytype({ defaultLocale: "en-US" });
 *   const policy = type.resolve({ locale: "ar-SA", contentType: "navigation" });
 */

import { auditCoverage, type CoverageReport, type FontProfile } from "./fonts";
import { fallbackChain } from "./locale";
import {
  measureTranslationRisk,
  type MeasureOptions,
  type RiskReport,
} from "./expansion";
import { pseudoLocalize, type PseudoOptions } from "./pseudo";
import {
  detectScripts,
  dominantScript,
  type ScriptName,
  type ScriptRun,
} from "./scripts";
import {
  resolvePolicy,
  type TypographyContext,
  type TypographyPolicy,
} from "./policy";

export interface PolytypeConfig {
  defaultLocale?: string;
  /** Override the declared coverage profiles used by the audit. */
  profiles?: FontProfile[];
  /** Primary face the coverage audit measures against. */
  primaryFont?: string;
}

export class Polytype {
  private readonly defaultLocale: string;
  private readonly profiles?: FontProfile[];
  private readonly primaryFont: string;

  constructor(config: PolytypeConfig = {}) {
    this.defaultLocale = config.defaultLocale ?? "en-US";
    this.profiles = config.profiles;
    this.primaryFont = config.primaryFont ?? "Manrope";
  }

  /** Resolve a typographic policy for a context. */
  resolve(ctx: Partial<TypographyContext> & { locale?: string }): TypographyPolicy {
    return resolvePolicy({
      locale: ctx.locale ?? this.defaultLocale,
      contentType: ctx.contentType,
      density: ctx.density,
      sample: ctx.sample,
    });
  }

  /** Script runs in a string. */
  scripts(text: string): ScriptRun[] {
    return detectScripts(text);
  }

  /** Per-script character counts in a string. */
  scriptCounts(text: string): Partial<Record<ScriptName, number>> {
    const counts: Partial<Record<ScriptName, number>> = {};
    for (const run of detectScripts(text)) {
      const n = [...run.text].length;
      counts[run.script] = (counts[run.script] ?? 0) + n;
    }
    return counts;
  }

  /** Audit a string's scripts against the configured primary face. */
  audit(text: string): CoverageReport {
    return auditCoverage(this.scriptCounts(text), this.primaryFont, this.profiles);
  }

  /** The CLDR-style fallback chain for a locale. */
  fallbacks(locale: string): string[] {
    return fallbackChain(locale);
  }

  /** Forecast which translations overflow a width budget. */
  forecast(
    translations: Record<string, string>,
    opts: MeasureOptions
  ): RiskReport {
    return measureTranslationRisk(translations, opts);
  }

  /** Pseudo-localize a string to expose layout assumptions. */
  pseudo(text: string, opts?: PseudoOptions): string {
    return pseudoLocalize(text, opts);
  }
}

export { detectScripts, dominantScript };
export { resolvePolicy };
export { measureTranslationRisk, estimateWidth } from "./expansion";
export { auditCoverage } from "./fonts";
export { pseudoLocalize } from "./pseudo";
export { quote, formatNumber, formatRange } from "./punctuation";
export { fallbackChain, parseLocale, directionFor } from "./locale";

export type {
  ScriptName,
  ScriptRun,
} from "./scripts";
export type {
  TypographyContext,
  TypographyPolicy,
  ContentType,
  Density,
} from "./policy";
export type { CoverageReport, CoverageRow, FontProfile } from "./fonts";
export type { RiskReport, RiskRow, RiskLevel, MeasureOptions } from "./expansion";
export type { NumeralSystem } from "./punctuation";
export type { PseudoOptions } from "./pseudo";

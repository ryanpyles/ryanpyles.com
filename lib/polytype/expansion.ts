/**
 * Expansion forecasting — the layer that turns language into a frontend
 * constraint. The same label is "Save" in English and "Enregistrer" in
 * French; a fixed-width button that fits one clips the other. Given a width
 * budget and a set of translations, the engine forecasts which ones overflow
 * BEFORE anyone opens the app in that language.
 *
 * Widths are estimated from per-script average advance widths (as a fraction
 * of the font size) so the core runs without a DOM. In the browser, callers
 * can pass a real measuring function (canvas measureText) for exact pixels.
 */

import { detectScripts, type ScriptName } from "./scripts";

/** Mean glyph advance as a fraction of font size, per script. Rough but
 *  stable: Latin ~0.52em, CJK is full-width (~1em), Arabic connects tighter. */
const ADVANCE_EM: Record<ScriptName, number> = {
  Latin: 0.52,
  Cyrillic: 0.56,
  Greek: 0.54,
  Hebrew: 0.5,
  Arabic: 0.48,
  Devanagari: 0.6,
  Han: 1.0,
  Kana: 1.0,
  Hangul: 1.0,
  Thai: 0.55,
  Common: 0.4,
};

/** Estimate rendered width (px) of a string at a font size, no DOM needed. */
export function estimateWidth(text: string, fontSizePx = 16): number {
  let em = 0;
  for (const run of detectScripts(text)) {
    const chars = [...run.text].length;
    em += chars * ADVANCE_EM[run.script];
  }
  return Math.round(em * fontSizePx);
}

export type RiskLevel = "pass" | "warn" | "fail";

export interface RiskRow {
  locale: string;
  text: string;
  width: number;
  level: RiskLevel;
}

export interface RiskReport {
  budget: number;
  rows: RiskRow[];
  recommendation: string;
}

export interface MeasureOptions {
  /** Width budget in px (the component's available inline size). */
  budget: number;
  fontSizePx?: number;
  /** Exact measurer (e.g. canvas); falls back to the script estimate. */
  measure?: (text: string) => number;
  /** Fraction over budget still allowed as a warning (default 0 → strict). */
  warnBand?: number;
}

function level(width: number, budget: number, warnBand: number): RiskLevel {
  if (width <= budget) return "pass";
  if (width <= budget * (1 + warnBand)) return "warn";
  return "fail";
}

/**
 * Forecast overflow across a translation set. `translations` maps locale →
 * string; the result ranks each by rendered width against the budget and
 * suggests a component strategy when anything fails.
 */
export function measureTranslationRisk(
  translations: Record<string, string>,
  opts: MeasureOptions
): RiskReport {
  const { budget, fontSizePx = 16, measure, warnBand = 0.12 } = opts;
  const widthOf = measure ?? ((t: string) => estimateWidth(t, fontSizePx));

  const rows: RiskRow[] = Object.entries(translations).map(
    ([locale, text]) => {
      const width = Math.round(widthOf(text));
      return { locale, text, width, level: level(width, budget, warnBand) };
    }
  );
  rows.sort((a, b) => b.width - a.width);

  const widest = rows[0];
  const anyFail = rows.some((r) => r.level !== "pass");
  const recommendation = anyFail
    ? `Allow intrinsic width; set a minimum of ${Math.ceil(
        (widest?.width ?? budget) + 24
      )}px and inline padding ≥ 16px, or approve a shorter translation for ${
        rows.find((r) => r.level === "fail")?.locale ?? "the failing locale"
      }.`
    : "Fits every locale at this budget — a fixed width is safe here.";

  return { budget, rows, recommendation };
}

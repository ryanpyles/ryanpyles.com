/**
 * The policy layer — the engine's core decision. Given a TypographyContext
 * (what is being set, in what language, at what density) it returns a
 * TypographyPolicy: the concrete typographic values a component should use.
 * Instead of a component hardcoding `font-size: 16px; line-height: 1.5`, it
 * asks the engine and gets values correct for the script and content type.
 *
 * Everything here is deterministic and inspectable — no model, no network.
 */

import { DEFAULT_FONT_MAP } from "./fonts";
import { directionFor } from "./locale";
import { dominantScript, type ScriptName } from "./scripts";

export type ContentType =
  | "body"
  | "heading"
  | "label"
  | "navigation"
  | "data";

export type Density = "compact" | "normal" | "expanded";

export interface TypographyContext {
  locale: string;
  contentType?: ContentType;
  density?: Density;
  /** The text itself, when known — lets the engine read actual script usage
   *  rather than trust the locale. Optional for pure context resolution. */
  sample?: string;
}

export interface TypographyPolicy {
  script: ScriptName;
  direction: "ltr" | "rtl";
  fontFamily: string[];
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: "start" | "end" | "center";
  hyphenation: boolean;
  /** Max comfortable line length in `ch`; 0 means "no measure cap". */
  maxLineLength: number;
  overflowStrategy: "wrap" | "truncate" | "expand";
  lineBreak: "auto" | "strict" | "normal";
}

/** Line-height by script — equal numbers do not read as equal rhythm across
 *  scripts, so taller scripts get more leading. These are the engine's
 *  defaults, the thing a script-aware design token would encode. */
const LEADING: Record<ScriptName, number> = {
  Latin: 1.5,
  Cyrillic: 1.5,
  Greek: 1.5,
  Hebrew: 1.6,
  Arabic: 1.75,
  Devanagari: 1.7,
  Han: 1.7,
  Kana: 1.7,
  Hangul: 1.6,
  Thai: 1.75,
  Common: 1.5,
};

/** Base size (px) by content type, before density scaling. */
const BASE_SIZE: Record<ContentType, number> = {
  body: 16,
  heading: 32,
  label: 13,
  navigation: 15,
  data: 14,
};

const DENSITY_SCALE: Record<Density, number> = {
  compact: 0.95,
  normal: 1,
  expanded: 1.06,
};

export function resolvePolicy(ctx: TypographyContext): TypographyPolicy {
  const contentType = ctx.contentType ?? "body";
  const density = ctx.density ?? "normal";
  const script = ctx.sample ? dominantScript(ctx.sample) : "Latin";
  const direction = directionFor(ctx.locale, script);

  const size = Math.round(BASE_SIZE[contentType] * DENSITY_SCALE[density]);

  // Leading lifts a touch for long-form body, tightens for display headings.
  const baseLeading = LEADING[script];
  const rawLeading =
    contentType === "heading"
      ? Math.max(1.1, baseLeading - 0.4)
      : contentType === "body"
      ? baseLeading
      : baseLeading - 0.2;
  const lineHeight = Math.round(rawLeading * 100) / 100;

  // Only Latin-family display type takes negative tracking; non-Latin scripts
  // are harmed by it, so they stay at zero.
  const latinish = script === "Latin" || script === "Cyrillic" || script === "Greek";
  const letterSpacing =
    contentType === "heading" && latinish ? -0.015 : 0;

  // Hyphenation belongs in long-form text, never in UI chrome, and never in
  // scripts that do not hyphenate.
  const hyphenation = contentType === "body" && latinish;

  // Chrome expands to fit its text; data cells truncate; prose wraps.
  const overflowStrategy: TypographyPolicy["overflowStrategy"] =
    contentType === "label" || contentType === "navigation"
      ? "expand"
      : contentType === "data"
      ? "truncate"
      : "wrap";

  // CJK must honor prohibited line-start/end characters; Latin breaks on
  // spaces as usual.
  const lineBreak: TypographyPolicy["lineBreak"] =
    script === "Han" || script === "Kana" ? "strict" : "auto";

  const maxLineLength =
    contentType === "body" ? 66 : contentType === "heading" ? 26 : 0;

  return {
    script,
    direction,
    fontFamily: DEFAULT_FONT_MAP[script],
    fontSize: size,
    lineHeight,
    letterSpacing,
    textAlign: "start",
    hyphenation,
    maxLineLength,
    overflowStrategy,
    lineBreak,
  };
}

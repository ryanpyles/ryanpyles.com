/**
 * Script analysis — the layer that inspects actual character usage rather
 * than trusting the locale. A single string can mix Latin, Hebrew, numerals,
 * and code at once; the engine needs to see that to make font and direction
 * decisions. Detection is by Unicode block, which is deterministic and needs
 * no data download. It sits ABOVE the browser's text shaping — we are not
 * reimplementing HarfBuzz, only classifying runs so the policy layer can act.
 */

export type ScriptName =
  | "Latin"
  | "Cyrillic"
  | "Greek"
  | "Hebrew"
  | "Arabic"
  | "Devanagari"
  | "Han"
  | "Kana"
  | "Hangul"
  | "Thai"
  | "Common";

/** The scripts the detector names, excluding the Common catch-all. */
export const NAMED_SCRIPTS: ScriptName[] = [
  "Latin",
  "Cyrillic",
  "Greek",
  "Hebrew",
  "Arabic",
  "Devanagari",
  "Han",
  "Kana",
  "Hangul",
  "Thai",
];

/** Scripts written right-to-left. */
export const RTL_SCRIPTS: ReadonlySet<ScriptName> = new Set<ScriptName>([
  "Hebrew",
  "Arabic",
]);

export interface ScriptRun {
  script: ScriptName;
  /** [start, end) as string (UTF-16) indices, so `text.slice(...)` matches. */
  range: [number, number];
  text: string;
}

/** Classify a single Unicode code point into a script block. */
export function classifyCodePoint(cp: number): ScriptName {
  // Han — checked first because the ideographic ranges are large and distinct.
  if (
    (cp >= 0x4e00 && cp <= 0x9fff) ||
    (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0x20000 && cp <= 0x2a6df)
  )
    return "Han";
  // Japanese kana (hiragana + katakana + phonetic extensions).
  if ((cp >= 0x3040 && cp <= 0x30ff) || (cp >= 0x31f0 && cp <= 0x31ff))
    return "Kana";
  // Hangul (syllables, jamo, compatibility jamo).
  if (
    (cp >= 0xac00 && cp <= 0xd7af) ||
    (cp >= 0x1100 && cp <= 0x11ff) ||
    (cp >= 0x3130 && cp <= 0x318f)
  )
    return "Hangul";
  if (cp >= 0x0590 && cp <= 0x05ff) return "Hebrew";
  if (
    (cp >= 0x0600 && cp <= 0x06ff) ||
    (cp >= 0x0750 && cp <= 0x077f) ||
    (cp >= 0x08a0 && cp <= 0x08ff) ||
    (cp >= 0xfb50 && cp <= 0xfdff) ||
    (cp >= 0xfe70 && cp <= 0xfeff)
  )
    return "Arabic";
  if (cp >= 0x0900 && cp <= 0x097f) return "Devanagari";
  if (cp >= 0x0e00 && cp <= 0x0e7f) return "Thai";
  if (cp >= 0x0400 && cp <= 0x04ff) return "Cyrillic";
  if (cp >= 0x0370 && cp <= 0x03ff) return "Greek";
  // Latin: ASCII letters, Latin-1 letters, Extended-A/B, and the Extended
  // Additional block (U+1E00–U+1EFF) that Vietnamese diacritics live in.
  if (
    (cp >= 0x41 && cp <= 0x5a) ||
    (cp >= 0x61 && cp <= 0x7a) ||
    (cp >= 0x00c0 && cp <= 0x024f) ||
    (cp >= 0x1e00 && cp <= 0x1eff)
  )
    return "Latin";
  // Everything else — digits, whitespace, punctuation, symbols, emoji.
  return "Common";
}

/**
 * Break a string into maximal same-script runs. Code points above the BMP
 * (e.g. CJK Extension B) are iterated correctly, and the returned ranges are
 * UTF-16 indices so they line up with `String.prototype.slice`.
 */
export function detectScripts(input: string): ScriptRun[] {
  const runs: ScriptRun[] = [];
  let i = 0;
  while (i < input.length) {
    const cp = input.codePointAt(i)!;
    const width = cp > 0xffff ? 2 : 1;
    const script = classifyCodePoint(cp);
    const last = runs[runs.length - 1];
    if (last && last.script === script) {
      last.range[1] = i + width;
      last.text = input.slice(last.range[0], last.range[1]);
    } else {
      runs.push({ script, range: [i, i + width], text: input.slice(i, i + width) });
    }
    i += width;
  }
  return runs;
}

/**
 * The script that should drive the policy for a string — the most-used named
 * script, ignoring Common (digits and punctuation never decide a font). Ties
 * resolve to the first run, and an all-Common string falls back to Latin.
 */
export function dominantScript(input: string): ScriptName {
  const counts = new Map<ScriptName, number>();
  for (const run of detectScripts(input)) {
    if (run.script === "Common") continue;
    const len = [...run.text].length;
    counts.set(run.script, (counts.get(run.script) ?? 0) + len);
  }
  let best: ScriptName | null = null;
  let bestN = 0;
  for (const [script, n] of counts) {
    if (n > bestN) {
      best = script;
      bestN = n;
    }
  }
  return best ?? "Latin";
}

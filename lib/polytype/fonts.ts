/**
 * Font intelligence. Rather than one global font, stacks are declared per
 * script, and each candidate face carries a declared coverage profile. The
 * engine checks the scripts a string actually uses (from the detector)
 * against those profiles, picks the stack for the dominant script, and
 * reports which fallbacks a mixed-script string will trigger.
 *
 * Coverage here is DECLARED configuration, not read from the font binary —
 * the engine tells you what your configured stacks claim to cover and where
 * they will hand off, which is the decision a design system actually owns.
 */

import type { ScriptName } from "./scripts";

/** Default font stacks by script. Real family names with graceful fallbacks;
 *  the browser substitutes whatever the viewer has installed. */
export const DEFAULT_FONT_MAP: Record<ScriptName, string[]> = {
  Latin: ["Manrope", "Inter", "system-ui", "sans-serif"],
  Cyrillic: ["Manrope", "Inter", "system-ui", "sans-serif"],
  Greek: ["Manrope", "Inter", "system-ui", "sans-serif"],
  Hebrew: ["Noto Sans Hebrew", "Arial Hebrew", "David", "sans-serif"],
  Arabic: ["Noto Sans Arabic", "Geeza Pro", "Tahoma", "sans-serif"],
  Devanagari: ["Noto Sans Devanagari", "Nirmala UI", "sans-serif"],
  Han: ["Noto Sans CJK SC", "PingFang SC", "Microsoft YaHei", "sans-serif"],
  Kana: ["Noto Sans CJK JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", "sans-serif"],
  Hangul: ["Noto Sans CJK KR", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
  Thai: ["Noto Sans Thai", "Thonburi", "sans-serif"],
  Common: ["Manrope", "Inter", "system-ui", "sans-serif"],
};

/** A face and the scripts its configured coverage claims. */
export interface FontProfile {
  name: string;
  covers: ScriptName[];
}

/**
 * Declared coverage for the faces the default stacks reach for. A real
 * project would generate these from its font subsets; here they encode the
 * realistic truth that a Latin UI face does not cover Hebrew or CJK.
 */
export const DEFAULT_PROFILES: FontProfile[] = [
  { name: "Manrope", covers: ["Latin", "Cyrillic", "Greek", "Common"] },
  { name: "Noto Sans Hebrew", covers: ["Hebrew", "Common"] },
  { name: "Noto Sans Arabic", covers: ["Arabic", "Common"] },
  { name: "Noto Sans Devanagari", covers: ["Devanagari", "Common"] },
  { name: "Noto Sans CJK SC", covers: ["Han", "Common"] },
  { name: "Noto Sans CJK JP", covers: ["Han", "Kana", "Common"] },
  { name: "Noto Sans CJK KR", covers: ["Hangul", "Han", "Common"] },
  { name: "Noto Sans Thai", covers: ["Thai", "Common"] },
];

export interface CoverageRow {
  script: ScriptName;
  /** Characters of this script in the sample. */
  count: number;
  /** Did the primary face cover it? */
  coveredByPrimary: boolean;
  /** Face that will actually render it. */
  resolvedFace: string;
}

export interface CoverageReport {
  primary: string;
  rows: CoverageRow[];
  /** Fallbacks the sample forces, as "Script → Face". */
  fallbacks: string[];
}

/**
 * Audit a sample against a primary face: which scripts it carries, whether
 * the primary covers each, and which face each falls back to. This is what
 * turns typography into something testable.
 */
export function auditCoverage(
  scriptCounts: Partial<Record<ScriptName, number>>,
  primary = "Manrope",
  profiles: FontProfile[] = DEFAULT_PROFILES
): CoverageReport {
  const byName = new Map(profiles.map((p) => [p.name, p]));
  const primaryProfile = byName.get(primary);
  const rows: CoverageRow[] = [];
  const fallbacks: string[] = [];

  for (const [script, count] of Object.entries(scriptCounts) as [
    ScriptName,
    number
  ][]) {
    if (!count) continue;
    const coveredByPrimary = primaryProfile?.covers.includes(script) ?? false;
    let resolvedFace = primary;
    if (!coveredByPrimary) {
      const fallback = profiles.find(
        (p) => p.name !== primary && p.covers.includes(script)
      );
      resolvedFace = fallback?.name ?? "(none — tofu)";
      fallbacks.push(`${script} → ${resolvedFace}`);
    }
    rows.push({ script, count, coveredByPrimary, resolvedFace });
  }

  rows.sort((a, b) => b.count - a.count);
  return { primary, rows, fallbacks };
}

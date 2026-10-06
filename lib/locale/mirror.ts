/**
 * RTL is not just `direction: rtl`. Layout uses logical properties
 * (margin-inline-start, inset-inline-end) so components mirror from the
 * document direction outward — and not everything should mirror. This encodes
 * the mirroring policy and the physical-property lint the system runs.
 */

export const MIRROR: string[] = [
  "Directional arrows (←/→)",
  "Navigation chevrons",
  "Progress & stepper direction",
  "Drawer / sidebar placement",
  "Back / forward controls",
];

export const DO_NOT_MIRROR: string[] = [
  "Play / media controls",
  "Brand marks & logos",
  "Clock faces",
  "Most charts & graphs",
  "Checkmarks",
];

export interface LintFinding {
  physical: string;
  logical: string;
}

/** Physical CSS properties that break RTL, with their logical replacements. */
export const LOGICAL_PROPERTY_MAP: LintFinding[] = [
  { physical: "margin-left", logical: "margin-inline-start" },
  { physical: "margin-right", logical: "margin-inline-end" },
  { physical: "padding-left", logical: "padding-inline-start" },
  { physical: "padding-right", logical: "padding-inline-end" },
  { physical: "left: 0", logical: "inset-inline-start: 0" },
  { physical: "right: 0", logical: "inset-inline-end: 0" },
  { physical: "text-align: left", logical: "text-align: start" },
  { physical: "border-left", logical: "border-inline-start" },
];

/** Scan a CSS snippet for physical-direction assumptions. */
export function lintPhysicalProperties(css: string): LintFinding[] {
  return LOGICAL_PROPERTY_MAP.filter((f) =>
    new RegExp(f.physical.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).test(css)
  );
}

/**
 * FORMÆTRIX Publish Architecture — the canonical document model.
 *
 * The premise: a manuscript is source material, not a Word file. Content has
 * one source; presentation has many outputs. Prose is stored as semantic
 * nodes — a scene break is a scene break, a chapter title is a chapter title —
 * and each renderer decides how that node should look. Change the text once
 * and every edition regenerates; change the trim size and the manuscript is
 * untouched.
 *
 * This module is the model and the renderers' shared helpers. It is small and
 * deterministic on purpose — the demo drives it directly.
 */

/** An inline run: plain text, a language span, or a footnote reference. */
export interface Run {
  text?: string;
  /** BCP-47 tag for a foreign-language span (selects font + direction). */
  lang?: string;
  /** Points at a footnote node's id. */
  noteRef?: string;
}

export type Block =
  | { type: "paragraph"; style?: "opening" | "normal"; runs: Run[] }
  | { type: "sceneBreak" }
  | { type: "epigraph"; runs: Run[]; attribution?: string }
  | { type: "transcript"; lines: { speaker: string; text: string }[] };

export interface Chapter {
  type: "chapter";
  id: string;
  number: number;
  title: string;
  content: Block[];
  footnotes?: { id: string; runs: Run[] }[];
}

export interface Book {
  title: string;
  author: string;
  language: string;
  chapters: Chapter[];
}

/** How a chapter number is displayed per edition. */
export type Numeral = "word" | "roman" | "arabic" | "none";

export interface Edition {
  key: string;
  label: string;
  trim: string;
  /** Multiplier on the base type scale. */
  typeScale: number;
  /** Comfortable measure in `ch`. */
  measure: number;
  numeral: Numeral;
  /** Web excerpt stops after the first scene break. */
  excerpt?: boolean;
  renderer: "print" | "epub" | "web";
}

export const EDITIONS: Edition[] = [
  {
    key: "paperback",
    label: "Paperback",
    trim: "6 × 9 in",
    typeScale: 1,
    measure: 62,
    numeral: "word",
    renderer: "print",
  },
  {
    key: "large-print",
    label: "Large Print",
    trim: "7 × 10 in",
    typeScale: 1.35,
    measure: 46,
    numeral: "word",
    renderer: "print",
  },
  {
    key: "web",
    label: "Web excerpt",
    trim: "fluid",
    typeScale: 1,
    measure: 68,
    numeral: "roman",
    excerpt: true,
    renderer: "web",
  },
];

/* ── Number rendering ──────────────────────────────────────────────────── */
const ONES = [
  "ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT",
  "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN",
  "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN",
];
const TENS = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY"];

export function numberToWords(n: number): string {
  if (n < 20) return ONES[n] ?? String(n);
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o === 0 ? TENS[t] : `${TENS[t]}-${ONES[o]}`;
}

export function romanize(n: number): string {
  const table: [number, string][] = [
    [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let rest = n;
  for (const [v, sym] of table) {
    while (rest >= v) {
      out += sym;
      rest -= v;
    }
  }
  return out;
}

export function chapterNumeral(n: number, numeral: Numeral): string {
  switch (numeral) {
    case "word":
      return `CHAPTER ${numberToWords(n)}`;
    case "roman":
      return romanize(n);
    case "arabic":
      return String(n);
    case "none":
      return "";
  }
}

/* ── Text extraction ───────────────────────────────────────────────────── */
export function runText(runs: Run[]): string {
  return runs.map((r) => r.text ?? "").join("");
}

/** Flatten a chapter's prose to plain text — used for word count / coverage. */
export function chapterText(ch: Chapter): string {
  const parts: string[] = [ch.title];
  for (const b of ch.content) {
    if (b.type === "paragraph" || b.type === "epigraph") parts.push(runText(b.runs));
    if (b.type === "transcript") parts.push(b.lines.map((l) => l.text).join(" "));
  }
  for (const f of ch.footnotes ?? []) parts.push(runText(f.runs));
  return parts.join(" ");
}

export function bookText(book: Book): string {
  return book.chapters.map(chapterText).join(" ");
}

export function wordCount(text: string): number {
  // Count CJK characters individually; split the rest on whitespace.
  const cjk = (text.match(/[㐀-鿿]/g) ?? []).length;
  const words = text
    .replace(/[㐀-鿿]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return cjk + words;
}

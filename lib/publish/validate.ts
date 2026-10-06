/**
 * Build validation + receipt. Before generating any edition, the publication
 * is checked: chapters detected, IDs unique, footnote references resolve, and
 * font coverage is complete for every script the manuscript actually uses.
 * A publishing workflow becomes testable — it can fail loudly instead of
 * producing a subtly broken book.
 *
 * Font coverage reuses Polytype (the shared typography layer) so the same
 * engine that forecasts UI overflow also audits print font coverage.
 */

import { Polytype, type FontProfile } from "@/lib/polytype";
import {
  bookText,
  runText,
  wordCount,
  type Book,
  type Run,
} from "./model";

/** The publishing font stack's declared coverage. */
const PUBLISHING_PROFILES: FontProfile[] = [
  { name: "TeX Gyre Pagella", covers: ["Latin", "Cyrillic", "Greek", "Common"] },
  { name: "Noto Serif Hebrew", covers: ["Hebrew", "Common"] },
  { name: "Noto Naskh Arabic", covers: ["Arabic", "Common"] },
  { name: "Noto Serif CJK", covers: ["Han", "Kana", "Hangul", "Common"] },
];

const typeEngine = new Polytype({
  primaryFont: "TeX Gyre Pagella",
  profiles: PUBLISHING_PROFILES,
});

export type CheckStatus = "pass" | "warn" | "info" | "error";

export interface Check {
  status: CheckStatus;
  label: string;
  detail: string;
}

export interface BuildReport {
  checks: Check[];
  errors: number;
  warnings: number;
  fonts: string[];
  pages: number;
  words: number;
}

function collectNoteRefs(runs: Run[]): string[] {
  return runs.filter((r) => r.noteRef).map((r) => r.noteRef!) ;
}

/** Validate the book and produce the data a build receipt would carry. */
export function validateBook(book: Book): BuildReport {
  const checks: Check[] = [];

  // Chapters detected.
  checks.push({
    status: "pass",
    label: "Chapters detected",
    detail: `${book.chapters.length} chapters parsed from canonical source`,
  });

  // IDs unique.
  const ids = book.chapters.map((c) => c.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  checks.push(
    dupes.length === 0
      ? { status: "pass", label: "Chapter IDs unique", detail: ids.join(", ") }
      : {
          status: "error",
          label: "Chapter IDs unique",
          detail: `Duplicate id: ${dupes.join(", ")}`,
        }
  );

  // Footnote references resolve (every ref has a note; every note is used).
  const refs = new Set<string>();
  for (const ch of book.chapters) {
    for (const b of ch.content) {
      if (b.type === "paragraph" || b.type === "epigraph")
        collectNoteRefs(b.runs).forEach((r) => refs.add(r));
    }
  }
  const noteIds = new Set(
    book.chapters.flatMap((c) => (c.footnotes ?? []).map((f) => f.id))
  );
  const unresolved = [...refs].filter((r) => !noteIds.has(r));
  const orphan = [...noteIds].filter((id) => !refs.has(id));
  checks.push(
    unresolved.length === 0 && orphan.length === 0
      ? {
          status: "pass",
          label: "Footnote references resolve",
          detail: `${refs.size} reference${refs.size === 1 ? "" : "s"}, all matched`,
        }
      : {
          status: "error",
          label: "Footnote references resolve",
          detail: unresolved.length
            ? `Reference ${unresolved.join(", ")} has no note`
            : `Note ${orphan.join(", ")} is never referenced`,
        }
  );

  // Font coverage across every script the manuscript uses.
  const audit = typeEngine.audit(bookText(book));
  const fonts = [audit.primary, ...audit.rows.map((r) => r.resolvedFace)];
  const uniqueFonts = [...new Set(fonts)].filter((f) => !f.startsWith("("));
  const missing = audit.rows.filter((r) => r.resolvedFace.startsWith("("));
  if (missing.length) {
    checks.push({
      status: "error",
      label: "Font coverage complete",
      detail: `No face covers ${missing.map((m) => m.script).join(", ")}`,
    });
  } else if (audit.fallbacks.length) {
    checks.push({
      status: "info",
      label: "Font coverage complete",
      detail: `Fallbacks engaged: ${audit.fallbacks.join("; ")}`,
    });
  } else {
    checks.push({
      status: "pass",
      label: "Font coverage complete",
      detail: `${audit.primary} covers every script`,
    });
  }

  const words = wordCount(bookText(book));
  const errors = checks.filter((c) => c.status === "error").length;
  const warnings = checks.filter((c) => c.status === "warn").length;

  return {
    checks,
    errors,
    warnings,
    fonts: uniqueFonts,
    // ~260 words to a typeset page is a standard trade-fiction estimate.
    pages: Math.max(1, Math.round(words / 260)),
    words,
  };
}

export { runText };

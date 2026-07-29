import { fieldNotes } from "./index";
import type { FieldNote } from "./types";

/** Estimated reading time in whole minutes (excerpt + body, ~200 wpm). */
export function readingMinutes(note: FieldNote): number {
  const text = `${note.excerpt} ${note.body ?? ""}`;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Other notes connected to this one, ranked: a shared related-work reference
 * counts double, the same category counts once. Real links only — returns [] if
 * nothing genuinely connects.
 */
export function relatedNotes(slug: string, limit = 3): FieldNote[] {
  const note = fieldNotes.find((n) => n.slug === slug);
  if (!note) return [];
  const refs = new Set(note.relatedWork ?? []);

  return fieldNotes
    .filter((n) => n.slug !== slug)
    .map((n) => {
      let score = n.category === note.category ? 1 : 0;
      for (const w of n.relatedWork ?? []) if (refs.has(w)) score += 2;
      return { note: n, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.note.date < b.note.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.note);
}

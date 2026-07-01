/**
 * System lineage — how each novel connects to the wider practice.
 *
 * `threads` are thematic tags drawn from each book's own description.
 * `noteSlugs`, `companionSlugs`, and `systems` link only to destinations that
 * actually exist (field notes, other books, project case studies), so every
 * connection is real and navigable. Books without an entry render nothing.
 */

export interface LineageSystem {
  slug: string; // /projects/[slug]
  label: string;
}

export interface BookLineage {
  threads: string[];
  noteSlugs?: string[]; // /field-notes/[slug]
  companionSlugs?: string[]; // /books/[slug]
  systems?: LineageSystem[];
}

export const bookLineage: Record<string, BookLineage> = {
  "feast-of-the-broadcast-saints": {
    threads: ["Attention economy", "Platform capitalism", "Bodily autonomy", "Being watched"],
    companionSlugs: ["terms-of-unbeing", "quiet-metrics"],
  },

  "what-survives-is-proof": {
    threads: ["Grief as investigation", "Evidence & memory", "A hidden life"],
    companionSlugs: ["summer-of-the-glass-bees"],
  },

  "declensions-of-dark-water": {
    threads: ["Language as law", "Grammar & consequence", "Silence & restraint", "Folk horror"],
    noteSlugs: ["gluggavedur-and-the-cruelty-of-windows"],
    companionSlugs: ["babel-threshold"],
  },

  "terms-of-unbeing": {
    threads: ["Identity as contract", "Memory as commodity", "Systems of control", "Legal fiction"],
    companionSlugs: ["feast-of-the-broadcast-saints", "liminal-617"],
  },

  "summer-of-the-glass-bees": {
    threads: ["Memory & forgetting", "Grief, softened", "The archive", "Quiet horror"],
    companionSlugs: ["what-survives-is-proof"],
  },

  "quiet-metrics": {
    threads: ["Recognition & control", "Precision as intimacy", "Coercion", "Restraint"],
    noteSlugs: ["why-restraint-only-works-when-something-underneath-is-unstable"],
    companionSlugs: ["feast-of-the-broadcast-saints", "terms-of-unbeing"],
  },

  "liminal-617": {
    threads: ["Consent & systems", "Recursive form", "Experimental typesetting", "Care"],
    companionSlugs: ["terms-of-unbeing"],
    systems: [{ slug: "continuity-atlas", label: "Continuity Atlas" }],
  },

  "babel-threshold": {
    threads: ["Language & translation", "Palimpsest", "Form as meaning"],
    noteSlugs: [
      "lualatex-as-a-nervous-system",
      "a-chapter-outline-is-a-software-diagram-with-ghosts",
    ],
    companionSlugs: ["declensions-of-dark-water"],
  },
};

export function getBookLineage(slug: string): BookLineage | undefined {
  return bookLineage[slug];
}

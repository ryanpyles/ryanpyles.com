/**
 * Maps relatedWork label strings to their canonical internal or external URLs.
 * Used in FieldNoteCard and field-notes/[slug] — extend here as new content is added.
 */
export const RELATED_HREFS: Record<string, string> = {
  "Language Research": "/about#languages",
  "Continuity Atlas": "/projects/continuity-atlas",
  "FORMÆTRIX": "https://www.formaetrix.com",
  // Books — published
  "Feast of the Broadcast Saints": "/books/feast-of-the-broadcast-saints",
  "What Survives Is Proof": "/books/what-survives-is-proof",
  "Declensions of Dark Water": "/books/declensions-of-dark-water",
  "Terms of Unbeing": "/books/terms-of-unbeing",
  "Summer of the Glass Bees": "/books/summer-of-the-glass-bees",
  "The Quiet Metric": "/books/quiet-metric",
  // Books — forthcoming
  "Liminal 6:17": "/books/liminal-617",
  "Babel Threshold": "/books/babel-threshold",
  "Guestbook of the North Wind": "/books/guestbook-of-the-north-wind",
};

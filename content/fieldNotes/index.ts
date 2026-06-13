import type { FieldNote } from "./types";

export const fieldNotes: FieldNote[] = [
  {
    title: "Gluggaveður and the cruelty of windows",
    slug: "gluggavedur-and-the-cruelty-of-windows",
    date: "2026-05-18",
    category: "Language",
    excerpt:
      "Icelandic has a word for weather that looks beautiful through a window and punishes you the moment you step into it. I've started keeping a list of ideas that work the same way — gorgeous from inside the frame, unlivable once you cross the threshold.",
    body: "I keep returning to the structure of the word itself — gluggi (window) plus veður (weather), compounded into a single judgment. English doesn't compress opinion into nouns this efficiently; we'd need a whole sentence to say 'it looks fine until you're in it.' Some languages just refuse to let you separate the observation from the verdict. That refusal is the whole study, really — not the vocabulary, but what a language decides is worth naming in one breath.",
    relatedWork: ["Language Research"],
    status: "published",
  },
  {
    title: "LuaLaTeX as a nervous system",
    slug: "lualatex-as-a-nervous-system",
    date: "2026-04-02",
    category: "Software",
    excerpt:
      "Somewhere between the macro expansion and the rendered glyph, a document stops being yours. LuaLaTeX just makes the nerve endings visible — every \\def a synapse firing in the dark, long before anything reaches the page.",
    body: "What I keep noticing is the lag between intention and appearance — you write a command, and it travels through three or four layers of expansion before it ever touches the page. Most of the time you don't see any of it. You only notice the system exists when something misfires: a spacing rule collides with a font feature, and suddenly you're reading a stack trace instead of a paragraph. That's the moment it stops looking like typesetting and starts looking like a body.",
    relatedWork: ["Babel Threshold", "FORMÆTRIX"],
    status: "fragment",
  },
  {
    title: "A chapter outline is a software diagram with ghosts",
    slug: "a-chapter-outline-is-a-software-diagram-with-ghosts",
    date: "2026-02-27",
    category: "Writing",
    excerpt:
      "Every outline I've drawn has the same shape: boxes, arrows, a spine running left to right. It looks like architecture. It takes a few drafts to notice that half the boxes are characters who no longer exist in the manuscript.",
    body: "Every outline I've drawn for Babel Threshold has the same shape: boxes, arrows, a spine running left to right. It looks like architecture. But three drafts in, half the boxes are characters who no longer exist in the manuscript — cut, merged, renamed beyond recognition — and the arrows still point to where they used to be. The diagram is accurate. It's just describing a building that was demolished to make room for the one you're standing in.",
    relatedWork: ["Babel Threshold"],
    status: "draft",
  },
  {
    title: "Why restraint only works when something underneath is unstable",
    slug: "why-restraint-only-works-when-something-underneath-is-unstable",
    date: "2026-01-09",
    category: "Design",
    excerpt:
      "Restraint reads as intention only when there's something underneath straining against it. Take away the pressure and what's left isn't minimal — it's just empty. The blank page has to have weather behind it.",
    body: "The Quiet Metrics taught me this the hard way: every sentence I cut had to leave a pressure behind it, or the cut just read as absence. Restraint isn't the removal of material — it's the visible evidence that material existed and was declined. A blank wall isn't minimal. A wall with one nail and a faint rectangle where a painting used to hang — that's minimal. That's restraint. The ghost is the point.",
    relatedWork: ["The Quiet Metric", "FORMÆTRIX"],
    status: "published",
  },
];

export type { FieldNote };

/**
 * A sample canonical manuscript — a slice of "Declensions of Dark Water"
 * stored as semantic nodes. It carries the awkward cases a real literary book
 * has and plain document converters drop: a multilingual span, a scene break,
 * a transcript, an epigraph, and a footnote that must resolve. The demo and
 * the validator both read this.
 */

import type { Book } from "./model";

export const SAMPLE_BOOK: Book = {
  title: "Declensions of Dark Water",
  author: "Elian Voigt",
  language: "en-US",
  chapters: [
    {
      type: "chapter",
      id: "chapter-06",
      number: 6,
      title: "What the Tenants Agreed Not to Say",
      content: [
        {
          type: "paragraph",
          style: "opening",
          runs: [
            {
              text:
                "The lease said nothing about the hours the building kept, and so neither did they.",
            },
          ],
        },
      ],
    },
    {
      type: "chapter",
      id: "chapter-07",
      number: 7,
      title: "The House That Forgot Us",
      content: [
        {
          type: "epigraph",
          runs: [{ text: "A house remembers in the order it is left." }],
          attribution: "marginalia, east stairwell",
        },
        {
          type: "paragraph",
          style: "opening",
          runs: [{ text: "The first thing missing was the door." }],
        },
        {
          type: "paragraph",
          runs: [
            { text: "Mrs. Adler had written one word on the frame — " },
            { text: "גם זה יעבור", lang: "he" },
            { text: " — and by Tuesday the frame was gone too." },
          ],
        },
        { type: "sceneBreak" },
        {
          type: "transcript",
          lines: [
            { speaker: "INSPECTOR", text: "And the hinges?" },
            { speaker: "TENANT", text: "Returned by morning. Warm, like they'd been held." },
          ],
        },
        {
          type: "paragraph",
          runs: [
            { text: "By morning the hinges had returned, and no one admitted to having waited up." },
            { noteRef: "fn-18" },
          ],
        },
      ],
      footnotes: [
        {
          id: "fn-18",
          runs: [
            {
              text:
                "The building's logbook records the time as 4:17, though the logbook had, by then, begun keeping its own hours.",
            },
          ],
        },
      ],
    },
    {
      type: "chapter",
      id: "chapter-08",
      number: 8,
      title: "A Short History of Returned Objects",
      content: [
        {
          type: "paragraph",
          style: "opening",
          runs: [
            {
              text:
                "Everything the house took, it gave back changed by exactly the amount no one could prove.",
            },
          ],
        },
      ],
    },
  ],
};

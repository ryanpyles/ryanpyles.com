export type FragmentKind = "note" | "greeting" | "coordinate" | "snippet";

export interface ManuscriptFragment {
  id: string;
  label: string;
  kind: FragmentKind;
  detail: string;
  position: [number, number, number];
}

export const manuscriptFragments: ManuscriptFragment[] = [
  {
    id: "greeting-fr",
    label: "bonjour",
    kind: "greeting",
    detail:
      "French still feels like the language I learned to be polite in before I learned to think in it. 'Bonjour' carries a whole social contract — you say it to a room, not a person, and the room is expected to answer back.",
    position: [-2.5, 1.2, -1.2],
  },
  {
    id: "greeting-is",
    label: "halló",
    kind: "greeting",
    detail:
      "Icelandic borrowed this one from English sometime in the twentieth century and then quietly made it its own. The native greeting, 'sæll', is older, gendered, and faintly formal — 'halló' is what you say when you'd rather not commit to anything yet.",
    position: [2.2, -0.5, -0.7],
  },
  {
    id: "greeting-zh",
    label: "你好",
    kind: "greeting",
    detail:
      "Two characters, literally 'you good' — a question folded into a statement folded into a greeting. I keep returning to how much restraint that compression requires, and how much of the meaning the listener is trusted to supply.",
    position: [-1.0, -1.3, -1.9],
  },
  {
    id: "coordinate-reykjavik",
    label: "64°08′ N, 21°56′ W",
    kind: "coordinate",
    detail:
      "Reykjavík, more or less. I keep a running list of coordinates for places I've only visited through other people's vocabulary — borrowed words, translated weather reports, a grammar that already assumes you know which way the wind comes from.",
    position: [1.7, 1.5, -1.4],
  },
  {
    id: "snippet-font",
    label: "body: 11pt Garamond, tracked −15",
    kind: "snippet",
    detail:
      "The first line of every document I typeset, and the last thing I ever stop adjusting. Somewhere there's a folder of forty drafts of the same paragraph, differing only in which font it was rendered in to convince me it was finished.",
    position: [-0.5, 0.5, -2.2],
  },
  {
    id: "note-margin",
    label: "marg. — the gap between intention and syntax",
    kind: "note",
    detail:
      "Written in the margin of a draft I no longer have, in handwriting I don't entirely recognize anymore. I think it was about a sentence that meant one thing in my head and another on the page — and the distance between those two things turning out to be the actual subject.",
    position: [2.3, 0.3, -2.0],
  },
  {
    id: "note-cut",
    label: "draft 4, p. 212 — cut",
    kind: "note",
    detail:
      "An entire chapter, removed in a single afternoon, that I still think about more than most of what survived. Some cuts heal clean. This one left a shape in the manuscript that the surrounding pages quietly rearranged themselves around.",
    position: [-2.1, -0.4, -0.9],
  },
  {
    id: "footnote-voigt",
    label: "fn. 14 — see Voigt, 2019",
    kind: "note",
    detail:
      "A footnote pointing at a source I can no longer locate — which means either I invented it under deadline and forgot, or it's real and I've simply lost the thread back to it. I've decided, for now, not to resolve which.",
    position: [0.7, -1.6, -1.6],
  },
];

export type NoteCategory =
  | "language"
  | "narrative"
  | "software"
  | "architecture"
  | "research";

export interface ScholarNote {
  id: string;
  number: string;
  text: string;
  category: NoteCategory;
}

export const scholarNotes: ScholarNote[] = [
  {
    id: "fn-014",
    number: "fn. 014",
    text: "A grammar is a map pretending to be a machine.",
    category: "language",
  },
  {
    id: "fn-067",
    number: "fn. 067",
    text: "Every language develops a preferred method for lying politely.",
    category: "language",
  },
  {
    id: "fn-212",
    number: "fn. 212",
    text: "Architecture and narrative differ mainly in what happens when they collapse.",
    category: "architecture",
  },
  {
    id: "fn-617",
    number: "fn. 617",
    text: "Most manuscripts fail for the same reason empires do: they become too large to understand themselves.",
    category: "narrative",
  },
  {
    id: "fn-903",
    number: "fn. 903",
    text: "Software scales through abstraction. Stories scale through omission.",
    category: "software",
  },
  {
    id: "fn-031",
    number: "fn. 031",
    text: "The footnote exists because the author couldn't decide what was important.",
    category: "narrative",
  },
  {
    id: "fn-118",
    number: "fn. 118",
    text: "Translation is not the transfer of meaning. It is the negotiation of loss.",
    category: "language",
  },
  {
    id: "fn-244",
    number: "fn. 244",
    text: "Every naming system contains a theory of the world. Most naming systems are wrong.",
    category: "research",
  },
  {
    id: "fn-391",
    number: "fn. 391",
    text: "A library is a machine for the production of context. A novel is a machine for the production of loneliness.",
    category: "narrative",
  },
  {
    id: "fn-512",
    number: "fn. 512",
    text: "The best interfaces disappear. The best sentences do the opposite.",
    category: "software",
  },
  {
    id: "fn-708",
    number: "fn. 708",
    text: "Syntax is the politics of a language. Vocabulary is its economy.",
    category: "language",
  },
  {
    id: "fn-801",
    number: "fn. 801",
    text: "Memory is not storage. Memory is the act of deciding what to reconstruct.",
    category: "research",
  },
];

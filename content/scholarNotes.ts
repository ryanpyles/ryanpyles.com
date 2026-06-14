export type NoteCategory =
  | "language"
  | "narrative"
  | "software"
  | "architecture"
  | "research";

export interface ScholarNote {
  id: string;
  number: string;
  date: string;       // ISO "YYYY-MM-DD"
  text: string;
  body: string;
  category: NoteCategory;
  refs?: string[];    // other note IDs
}

export const scholarNotes: ScholarNote[] = [
  {
    id: "fn-014",
    number: "fn. 014",
    date: "2022-01-19",
    text: "A grammar is a map pretending to be a machine.",
    body: "We draw grammars as if they are systems of rules, mechanical and exceptionless. But the rules always have exceptions, and the exceptions always have exceptions. What a grammar actually does is impose a coherent fiction on the chaos of a living language — convincing speakers and learners alike that there's a machine underneath, when really there's only the map.\n\nThe distinction matters: machines are built; maps are drawn; and maps, unlike machines, can be wrong without breaking. A broken machine stops working. A wrong map is used anyway, and its wrongness becomes part of the territory.",
    category: "language",
    refs: ["fn-118", "fn-708"],
  },
  {
    id: "fn-031",
    number: "fn. 031",
    date: "2022-04-07",
    text: "The footnote exists because the author couldn't decide what was important.",
    body: "Or more precisely: the author decided it was important, but couldn't decide how important. The main text is the claim; the footnote is the hedge against being wrong about it. Scholars are addicted to footnotes because their professional identity requires appearing to have read everything — the footnote is the evidence trail.\n\nBut footnotes in fiction are a different animal. They are a way of saying: here is another surface, another texture, another depth. They invite the reader to do the bibliographic version of stage-acting — to look at something in the margins and wonder whether the margins are the real text.",
    category: "narrative",
    refs: ["fn-617", "fn-391"],
  },
  {
    id: "fn-067",
    number: "fn. 067",
    date: "2022-09-30",
    text: "Every language develops a preferred method for lying politely.",
    body: "In English it's the passive voice: mistakes were made, not I made a mistake. In Japanese, the art lies in what goes unsaid — there are entire social protocols for refusing a request without ever using the word no. Study a language long enough and you find its designated escape hatches, the places where the grammar provides plausible deniability for the speaker.\n\nThis tells you something true about the culture the language grew inside. The preferred polite lie is a window into what the culture most needs to say while not saying.",
    category: "language",
    refs: ["fn-014", "fn-708"],
  },
  {
    id: "fn-118",
    number: "fn. 118",
    date: "2023-02-14",
    text: "Translation is not the transfer of meaning. It is the negotiation of loss.",
    body: "You decide which losses are acceptable and which are not. Sometimes you sacrifice rhythm to save sense; sometimes the opposite. The best translations make these decisions with unusual self-awareness — they know exactly what they gave up and they give up those things consistently, so the reader encounters a coherent alternative object, not a degraded copy of the original.\n\nA word-by-word translation is the most accurate and the most wrong thing a translator can produce. Accuracy and fidelity are not the same operation.",
    category: "language",
    refs: ["fn-014", "fn-244"],
  },
  {
    id: "fn-212",
    number: "fn. 212",
    date: "2023-08-22",
    text: "Architecture and narrative differ mainly in what happens when they collapse.",
    body: "When a building collapses, people die. When a narrative collapses, people feel cheated, lost, or strangely relieved. The structural failure is more obvious in architecture — a load-bearing wall removed where it shouldn't be, a foundation that couldn't support what was placed on it.\n\nIn narrative, the same failure modes exist, but the collapse happens in the reader's mind rather than in space. The reader is the only building inspector, and the reader often doesn't know what failed until they've already walked away from the rubble.",
    category: "architecture",
    refs: ["fn-617", "fn-391"],
  },
  {
    id: "fn-244",
    number: "fn. 244",
    date: "2023-11-03",
    text: "Every naming system contains a theory of the world. Most naming systems are wrong.",
    body: "The Linnaean taxonomy assumed stability of species that turned out to be historically contingent. The Dewey Decimal System assumed that knowledge organized itself around certain centers that European and American scholars in 1876 found natural. Every filing system is a philosophy disguised as an administrative convenience.\n\nThe philosophy dates; the filing system persists; the mismatch becomes the archive's ghost. You can tell a lot about a civilization by looking at what it couldn't imagine needing a category for.",
    category: "research",
    refs: ["fn-118", "fn-801"],
  },
  {
    id: "fn-391",
    number: "fn. 391",
    date: "2024-04-18",
    text: "A library is a machine for the production of context. A novel is a machine for the production of loneliness.",
    body: "The library does this by putting one thing next to another and letting you move between them. The context isn't stored in any single book — it emerges from the act of adjacency. The novel does the opposite: it creates a sustained, private experience that can only happen to one person at a time. You cannot read a novel as a group; you can use a library as one.\n\nThe experience of finishing a very good novel is structurally identical to ending an important relationship.",
    category: "narrative",
    refs: ["fn-512", "fn-617"],
  },
  {
    id: "fn-512",
    number: "fn. 512",
    date: "2024-08-09",
    text: "The best interfaces disappear. The best sentences do the opposite.",
    body: "A great interface makes you forget you're using software; you think you're just doing the thing. A great sentence makes you forget you were doing anything — you stop, you reread it, you notice that language was doing something unusual here. One form of excellence is invisible; the other announces itself.\n\nI don't think this is a contradiction, exactly, but it is an asymmetry worth sitting with. The interface wants you to pass through it. The sentence wants you to stay.",
    category: "software",
    refs: ["fn-903", "fn-391"],
  },
  {
    id: "fn-617",
    number: "fn. 617",
    date: "2024-12-01",
    text: "Most manuscripts fail for the same reason empires do: they become too large to understand themselves.",
    body: "Both accumulate too much: too many characters, too many storylines, too many provinces, too many contingent obligations. At some critical mass, the administration of complexity begins to cost more than the complexity produces.\n\nThe solution is the same in both cases — decentralization, or pruning — but the author, like the emperor, usually discovers the need for this too late. The manuscript that needed to be cut in half is instead published as written, and the reader feels the weight of everything that should have been left out.",
    category: "narrative",
    refs: ["fn-212", "fn-031"],
  },
  {
    id: "fn-708",
    number: "fn. 708",
    date: "2025-03-27",
    text: "Syntax is the politics of a language. Vocabulary is its economy.",
    body: "Both syntax and politics are about power: who is the subject of what sentence, whose actions require passive constructions, which things can be said plainly and which must be paraphrased. Vocabulary, like an economy, is about resources and their distribution: who has access to what words, which meanings are common currency and which are luxury goods, which terms go extinct when the markets change.\n\nA pidgin is what happens when two economies occupy the same political space.",
    category: "language",
    refs: ["fn-014", "fn-067"],
  },
  {
    id: "fn-801",
    number: "fn. 801",
    date: "2025-09-14",
    text: "Memory is not storage. Memory is the act of deciding what to reconstruct.",
    body: "Every time you remember something you are doing it again for the first time — which is why memories change over time and why people who witness the same event remember different events. What you reconstruct depends on what you need: context, emotion, the state of knowledge at the time of reconstruction, all of these shape what gets assembled.\n\nThis is also true of historical archives, which is why the history you get depends entirely on who is doing the remembering and when. The archive is not a record of the past. It is a record of what survived the decisions about what was worth keeping.",
    category: "research",
    refs: ["fn-244", "fn-391"],
  },
  {
    id: "fn-903",
    number: "fn. 903",
    date: "2026-01-08",
    text: "Software scales through abstraction. Stories scale through omission.",
    body: "The engineering move is to hide complexity behind a clean interface: I don't need to know how the database handles transactions to build on top of it. The narrative move is different — instead of hiding complexity, you simply don't include it. The war novel doesn't describe every rifle inspection. The omission isn't a lie, it's a compositional choice.\n\nBoth techniques scale, but they produce different kinds of structural weakness: abstractions leak; omissions accumulate into plausibility problems. Neither strategy can be pushed to its limit without eventually breaking the thing it was meant to support.",
    category: "software",
    refs: ["fn-512", "fn-391"],
  },
];

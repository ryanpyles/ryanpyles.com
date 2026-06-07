export type LanguageRing = 1 | 2 | 3;

export type LanguageLevel = "Fluent" | "Conversational" | "Reading Knowledge" | "Beginner";

export type LanguageFocus =
  | "Literature"
  | "Travel"
  | "Translation"
  | "Conversation"
  | "Research";

export interface LanguageProfile {
  id: string;
  name: string;
  ring: LanguageRing;
  level: LanguageLevel;
  focus: LanguageFocus[];
  started: string;
  books?: string[];
  notes: string;
}

export const languages: LanguageProfile[] = [
  {
    id: "french",
    name: "French",
    ring: 1,
    level: "Fluent",
    focus: ["Literature", "Translation", "Conversation"],
    started: "2004",
    books: ["Camus — L'Étranger", "Duras — Moderato Cantabile", "Despentes — Vernon Subutex"],
    notes:
      "French I in 2004. Then French II, then straight to French V — skipped the middle for reasons I no longer remember but would make now. AP Test. High level. What French gave me wasn't vocabulary but the idea that grammar could carry an attitude — the subjunctive is almost entirely a register for doubt, and once you can hear it, you start noticing how much doubt English sentences quietly choose not to mark.",
  },
  {
    id: "spanish",
    name: "Spanish",
    ring: 1,
    level: "Fluent",
    focus: ["Conversation", "Travel", "Literature"],
    started: "2005",
    books: ["Borges — Ficciones", "Cortázar — Bestiario", "Bolaño — Los detectives salvajes"],
    notes:
      "Spanish I in 2005, Spanish IV, AP Test. Then nearly a decade in South Florida — five of those years in Miami specifically — which finished what the classroom started and added about twelve registers the textbook never covered. I'm comfortable across regions in a way that only comes from having had the same argument about por versus para in three different accents.",
  },
  {
    id: "italian",
    name: "Italian",
    ring: 1,
    level: "Conversational",
    focus: ["Travel", "Conversation", "Literature"],
    started: "2011",
    books: ["Calvino — Le città invisibili", "Pavese — La luna e i falò"],
    notes:
      "I came to Italian by living in the Piedmont region in 2011 — the kind of acquisition that doesn't feel like studying, just like paying attention. The Piedmontese are precise and slightly suspicious of ornament, which turns out to be an excellent dialect to absorb when you already read a lot of Calvino. Italian makes Spanish feel like it was holding something back.",
  },
  {
    id: "portuguese",
    name: "Portuguese",
    ring: 1,
    level: "Conversational",
    focus: ["Travel", "Conversation", "Literature"],
    started: "2006",
    books: ["Pessoa — Livro do Desassossego", "Saramago — Ensaio sobre a Cegueira"],
    notes:
      "Brazilian Portuguese, specifically, started around 2006 alongside German and Mandarin in a period where I apparently believed quantity was a viable strategy. The nasal vowels are their own argument — you can't borrow them from Spanish, you have to earn them. Embarrassed and embaraçada are not synonyms, and I learned this in front of witnesses.",
  },
  {
    id: "german",
    name: "German",
    ring: 2,
    level: "Conversational",
    focus: ["Literature", "Research", "Conversation"],
    started: "2006",
    books: ["Kafka — Die Verwandlung", "Sebald — Austerlitz", "Bernhard — Frost"],
    notes:
      "Started German around 2006, but the real consolidation happened in 2012 when I lived briefly in Zürich. Swiss German is not a gentle introduction — it sounds like Standard German was left out in the weather — but it calibrated my ear in ways that a classroom couldn't have. German compounds nouns the way I name CSS classes: stack the qualifiers until the meaning stops being ambiguous, then stop apologizing for the length.",
  },
  {
    id: "mandarin",
    name: "Mandarin",
    ring: 2,
    level: "Conversational",
    focus: ["Research", "Conversation", "Literature"],
    started: "2006",
    notes:
      "Started alongside German and Portuguese around 2006 — a year of perhaps poor judgment about cognitive bandwidth, or perhaps exactly the right amount of ambition. Conversational, with reading at a higher register across both scripts: 繁體字 and 简体字. The two character sets are the same language making two different arguments about what continuity means — traditional characters preserve the visual etymology of a word, simplified characters trust the reader to bring the meaning themselves. I find both arguments persuasive.",
  },
  {
    id: "japanese",
    name: "Japanese",
    ring: 2,
    level: "Conversational",
    focus: ["Conversation", "Travel", "Research"],
    started: "2008",
    notes:
      "Two years in Okinawa, 2008 to 2010. The immersion was total and the progress was accordingly faster than anything I've managed in a classroom. Okinawan Japanese has its own texture — the islands have their own language distinct from standard Japanese, and living there made me aware early of how much dialect carries history. Three writing systems running simultaneously in a single sentence is still the most honest design decision a language has ever made: it admits, up front, that different kinds of information need different kinds of marks.",
  },
  {
    id: "swedish",
    name: "Swedish",
    ring: 3,
    level: "Reading Knowledge",
    focus: ["Literature", "Research"],
    started: "2011",
    books: ["Larsson — Män som hatar kvinnor", "Tranströmer — Det vilda torget", "Enquist — Livläkarens besök"],
    notes:
      "Started in 2011 with an obsession with the Millennium series — Stieg Larsson's Män som hatar kvinnor specifically — and never fully converted it into spoken fluency, which I consider a coherent choice. Swedish word order rearranged how I think about emphasis: once the verb has somewhere specific it must go, you start noticing how much of meaning in English is just a decision about where to put the weight.",
  },
  {
    id: "russian",
    name: "Russian",
    ring: 3,
    level: "Reading Knowledge",
    focus: ["Literature", "Research"],
    started: "2020",
    books: ["Bulgakov — Мастер и Маргарита", "Akhmatova — Реквием", "Babel — Конармия"],
    notes:
      "Most recent, alongside Icelandic. The Cyrillic script took about a week to stop feeling like a code and start feeling like an alphabet — the real difficulty is aspect, which marks whether an action is a single completed event or an ongoing one. It turned out to be the missing piece in how I think about scene construction in fiction. Every Russian verb makes a structural decision before the sentence ends.",
  },
  {
    id: "icelandic",
    name: "Icelandic",
    ring: 3,
    level: "Beginner",
    focus: ["Literature", "Research"],
    started: "2022",
    books: ["Sjón — Skugga-Baldur", "Laxness — Sjálfstætt fólk"],
    notes:
      "The most recent, and the most structurally unusual of any I've studied. A small population maintaining centuries of continuity with its own medieval literature, still coining new words by recombining old roots rather than borrowing. Gluggaveður — window-weather, the kind you watch rather than go out into — came from here and has lived in my notebook ever since. The four-case declension system is an exercise in patience I haven't yet completed.",
  },
];

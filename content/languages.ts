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
    started: "2011",
    books: ["Camus — L'Étranger", "Duras — Moderato Cantabile", "Despentes — Vernon Subutex"],
    notes:
      "French was the first language that taught me grammar could be an aesthetic decision rather than just a rule set — the subjunctive exists almost entirely to register doubt, and once you can hear that, you start noticing how much doubt English sentences quietly decline to mark.",
  },
  {
    id: "spanish",
    name: "Spanish",
    ring: 1,
    level: "Conversational",
    focus: ["Travel", "Conversation"],
    started: "2014",
    books: ["Borges — Ficciones", "Cortázar — Bestiario"],
    notes:
      "Spanish rewards you faster than almost any language I've studied — the early curve is generous, the late curve is not. I can order a meal in six countries and still trip over the difference between por and para in the same sentence.",
  },
  {
    id: "italian",
    name: "Italian",
    ring: 1,
    level: "Reading Knowledge",
    focus: ["Literature", "Travel"],
    started: "2017",
    books: ["Calvino — Le città invisibili", "Ferrante — L'amica geniale"],
    notes:
      "I started Italian to read Calvino without an intermediary and have stalled, happily, somewhere in the foothills — close enough to hear the music in a sentence, not quite close enough to trust my own ear about what it's playing.",
  },
  {
    id: "portuguese",
    name: "Portuguese",
    ring: 1,
    level: "Beginner",
    focus: ["Travel"],
    started: "2023",
    books: ["Pessoa — Livro do Desassossego (in progress)"],
    notes:
      "Portuguese sits close enough to Spanish that I keep mistaking false cousins for synonyms. Embaraçada does not mean what I once, confidently, told a room of people it meant.",
  },
  {
    id: "german",
    name: "German",
    ring: 2,
    level: "Conversational",
    focus: ["Research", "Literature"],
    started: "2013",
    books: ["Kafka — Die Verwandlung", "Sebald — Austerlitz"],
    notes:
      "German compounds nouns the way I name CSS classes — stack the qualifiers until the meaning stops being ambiguous, then stop apologizing for the length of the word.",
  },
  {
    id: "mandarin",
    name: "Mandarin",
    ring: 2,
    level: "Beginner",
    focus: ["Research", "Conversation"],
    started: "2021",
    notes:
      "I came to Mandarin curious about how a tonal, non-alphabetic system encodes the kind of ambiguity English usually buries in syntax instead. I'm still mostly reading character components like a detective reads a scene — slowly, and often wrong.",
  },
  {
    id: "japanese",
    name: "Japanese",
    ring: 2,
    level: "Beginner",
    focus: ["Research", "Travel"],
    started: "2022",
    notes:
      "Three writing systems running concurrently in a single sentence still strikes me as the most honest design decision a language has ever made — it simply admits, up front, that different kinds of information need different kinds of marks.",
  },
  {
    id: "swedish",
    name: "Swedish",
    ring: 3,
    level: "Reading Knowledge",
    focus: ["Research", "Literature"],
    started: "2019",
    books: ["Tranströmer — Det vilda torget"],
    notes:
      "Swedish word order rearranged how I think about emphasis in English — once the verb has somewhere specific it has to go, you start noticing how much of meaning is just a decision about where to put the weight in a sentence.",
  },
  {
    id: "russian",
    name: "Russian",
    ring: 3,
    level: "Reading Knowledge",
    focus: ["Literature", "Research"],
    started: "2016",
    books: ["Bulgakov — Мастер и Маргарита", "Babel — Конармия"],
    notes:
      "Russian aspect — marking whether an action is a single completed event or an ongoing process — turned out to be the missing piece in how I think about scene construction in fiction. Every verb is already making a structural decision before the sentence finishes.",
  },
  {
    id: "icelandic",
    name: "Icelandic",
    ring: 3,
    level: "Conversational",
    focus: ["Research", "Travel"],
    started: "2020",
    books: ["Sjón — Skugga-Baldur"],
    notes:
      "The language that started this whole obsession — a small population maintaining centuries of continuity with its own literature, and still coining new words by recombining old roots rather than importing them wholesale. Gluggaveður lives here. So does most of my notebook.",
  },
];

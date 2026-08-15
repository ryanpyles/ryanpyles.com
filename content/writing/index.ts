import type { Article } from "./types";

/* ── Hand-authored architecture diagram (inline SVG, theme-aware) ──── */
const memoryPipelineSvg = `
<svg viewBox="0 0 880 320" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono', monospace">
  <defs>
    <marker id="cg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.55"/>
    </marker>
  </defs>
  <g stroke="currentColor" fill="none" stroke-width="1.4" opacity="0.55">
    <line x1="150" y1="60" x2="196" y2="60" marker-end="url(#cg-arrow)"/>
    <line x1="316" y1="60" x2="362" y2="60" marker-end="url(#cg-arrow)"/>
    <line x1="520" y1="150" x2="520" y2="196" marker-end="url(#cg-arrow)"/>
    <line x1="418" y1="250" x2="372" y2="250" marker-end="url(#cg-arrow)"/>
    <line x1="248" y1="250" x2="202" y2="250" marker-end="url(#cg-arrow)"/>
  </g>

  <!-- top row: ingest -->
  <g fill="currentColor">
    <rect x="20" y="38" width="130" height="44" rx="4" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
    <text x="85" y="64" text-anchor="middle" font-size="13" opacity="0.9">Manuscript</text>

    <rect x="196" y="38" width="120" height="44" rx="4" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
    <text x="256" y="64" text-anchor="middle" font-size="13" opacity="0.9">Parser</text>
  </g>

  <!-- typed memory store -->
  <rect x="362" y="24" width="316" height="118" rx="6" fill="#c69c5d" fill-opacity="0.08" stroke="#c69c5d" stroke-width="1.4"/>
  <text x="520" y="46" text-anchor="middle" font-size="11" fill="#b07a3d" letter-spacing="2">TYPED MEMORY</text>
  <g font-size="12" fill="currentColor" opacity="0.9">
    <rect x="378" y="58" width="130" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="443" y="77" text-anchor="middle">States</text>
    <rect x="532" y="58" width="130" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="597" y="77" text-anchor="middle">Events</text>
    <rect x="378" y="98" width="130" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="443" y="117" text-anchor="middle">Claims</text>
    <rect x="532" y="98" width="130" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="597" y="117" text-anchor="middle">Relations</text>
  </g>

  <!-- bottom row: validate -> receipt -> generate -->
  <g fill="currentColor">
    <rect x="418" y="228" width="204" height="44" rx="4" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
    <text x="520" y="248" text-anchor="middle" font-size="12" opacity="0.9">Validator</text>
    <text x="520" y="263" text-anchor="middle" font-size="10" opacity="0.6">temporal · contradiction</text>

    <rect x="202" y="228" width="170" height="44" rx="4" fill="none" stroke="#e0742f" stroke-width="1.4"/>
    <text x="287" y="248" text-anchor="middle" font-size="12" fill="#c15f22">Context Receipt</text>
    <text x="287" y="263" text-anchor="middle" font-size="10" fill="#c15f22" opacity="0.75">inspect before generate</text>

    <rect x="20" y="228" width="182" height="44" rx="4" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
    <text x="111" y="254" text-anchor="middle" font-size="12" opacity="0.9">Constrained generation</text>
  </g>
</svg>`;

/* ── The character-state data model (faithful to the prototype) ─────── */
const stateModelCode = `// The unit of memory is a *state*, not a character.
// A character is a stable spine plus an ordered sequence of states.

type Knowledge = "reader" | "character" | "author-only";

interface Fact {
  id: string;
  claim: string;
  knownBy: Knowledge;          // who is allowed to know this
  status: "dormant" | "paid-off" | "contradicted";
  firstSeen: ChapterRef;
}

interface CharacterState {
  chapter: ChapterRef;          // when this state is valid
  disposition: string;          // "avoidant, lucid" -> "fractured, panic"
  knows: string[];              // fact ids in scope for this state
  doesNotKnow: string[];        // explicitly out of scope (guardrail)
  readerKnows: string[];        // dramatic-irony ledger
  authorOnly: string[];         // hidden from generation by default
  activeMotifs: string[];       // e.g. "6:17"
  continuityWarnings: string[]; // fracture flags surfaced to the author
}

interface Character {
  id: string;
  // Invariants — the part that does NOT move across the book:
  surfaceGoal: string;
  hiddenDesire: string;
  fear: string;
  lie: string;                  // the false belief the arc tests
  voiceMarkers: VoiceFingerprint;
  // The part that moves:
  states: CharacterState[];     // ordered by chapter
}`;

const contradictionCode = `// Contradiction detection is a query over typed facts,
// not a semantic-similarity guess.

function validate(fact: Fact, state: CharacterState): Violation[] {
  const out: Violation[] = [];

  // 1. Knowledge boundary: generation must not use author-only facts.
  if (fact.knownBy === "author-only" && !state.authorOnly.includes(fact.id)) {
    out.push({ kind: "leaked-secret", fact: fact.id });
  }

  // 2. Temporal validity: a state cannot "know" a fact from its future.
  if (state.knows.includes(fact.id) && fact.firstSeen.after(state.chapter)) {
    out.push({ kind: "anachronism", fact: fact.id });
  }

  // 3. Explicit contradiction: the fact is in the doesNotKnow ledger.
  if (state.doesNotKnow.includes(fact.id)) {
    out.push({ kind: "impossible-knowledge", fact: fact.id });
  }

  return out;
}`;

export const articles: Article[] = [
  {
    slug: "ai-story-memory-engine",
    title: "Building an AI Story-Memory Engine for Long-Form Fiction",
    subtitle:
      "Why embeddings and character biographies cannot preserve a novel’s internal history — and what a structured, time-aware memory model looks like instead.",
    byline: "Ryan Pyles",
    date: "2026-08-15",
    category: "AI Systems",
    excerpt:
      "Most AI writing tools store documents; a story-memory engine stores relationships. This is how I model characters as time-dependent states, detect contradictions as typed queries, and keep an author’s secrets out of generation — built as the Continuity Atlas prototype on real manuscript data.",
    keywords: [
      "AI story memory",
      "LLM novel continuity",
      "narrative intelligence software",
      "AI story bible",
      "story memory engine",
      "Ryan Pyles",
    ],
    targetSearches: [
      "AI story memory",
      "LLM novel continuity",
      "narrative intelligence software",
      "AI story bible",
    ],
    relatedProject: {
      href: "/projects/continuity-atlas",
      label: "Continuity Atlas — the working prototype",
    },
    status: "published",
    blocks: [
      {
        type: "paragraph",
        text: "A novel breaks in mundane ways. A character’s eyes change color between chapters. Someone who died in Part I answers a door in Part III. A grief ritual introduced with great weight is quietly forgotten. None of these are failures of prose — they are failures of _memory_. And they are exactly the failures that current AI writing tools make worse, because the tools that are supposed to remember the book do not model the book at all.",
      },
      {
        type: "paragraph",
        text: "I built [Continuity Atlas](/projects/continuity-atlas) to test a different shape of memory. This is the engineering behind it: what a story-memory engine actually stores, why a vector index and a static story bible both fail, and how modeling characters as **time-dependent states** turns continuity from a vibe into a query.",
      },

      { type: "heading", level: 2, text: "Why a story bible and a vector index both fail" },
      {
        type: "paragraph",
        text: "The two default answers to “give the AI context” are a story bible (a document of facts) and a vector index (embeddings of the manuscript, retrieved by similarity). Both are storage strategies. Neither is a model of the narrative.",
      },
      {
        type: "paragraph",
        text: "A **story bible** freezes truth. It says _Rowan is a soldier; the war is over; the brother is dead._ But in a real manuscript, truth is contextual and it moves on purpose. What a character knows, what the reader knows, and what only the author knows are three different layers, and they drift apart deliberately — that drift is the plot. A frozen bible collapses those layers and, worse, resolves mysteries the author was holding open. It answers questions the book has not asked yet.",
      },
      {
        type: "paragraph",
        text: "A **vector index** loses structure. Embeddings are wonderful at “find me passages that feel like this” and useless at “is it currently possible for Jack to know his brother is alive?” Similarity is not validity. Retrieval will happily surface the most relevant paragraph that also happens to contradict chapter four, because nothing in the index encodes _when_ a fact became true or _who_ is allowed to hold it.",
      },
      {
        type: "callout",
        variant: "insight",
        title: "The reframing",
        text: "Continuity is not a retrieval problem. It is a **state-validity** problem. The question is never “what is similar?” — it is “what is true, for whom, right now, and does this new sentence violate that?”",
      },

      { type: "heading", level: 2, text: "Characters are not entities. They are sequences of states." },
      {
        type: "paragraph",
        text: "The core modeling decision is that a character is not a record. A character is a stable spine — the invariants that do not move across the book — plus an _ordered sequence of states_, each valid for a stretch of the story. Jack in chapter one (avoidant, lucid) and Jack in chapter seven (fractured, in bodily panic) are not the same node with updated fields. They are different states, and they carry different continuity guardrails and different voice rules.",
      },
      {
        type: "code",
        language: "typescript",
        caption:
          "The character-state model from the prototype. The invariants rarely change; the `states` array is the moving part, and each state carries its own knowledge ledgers.",
        code: stateModelCode,
      },
      {
        type: "paragraph",
        text: "Everything that makes continuity checkable lives on the state: `knows`, `doesNotKnow`, `readerKnows`, and `authorOnly`. A fact is not globally true — it is true _for a state_. That single move is what lets the engine answer questions a bible and an index cannot.",
      },
      {
        type: "figure",
        label: "Architecture",
        caption:
          "The manuscript is parsed into a typed memory store — states, events, claims, and relations. Generation never reads the store directly: it passes through a validator and a Context Receipt the author can inspect and edit before anything is written.",
        svg: memoryPipelineSvg,
      },

      { type: "heading", level: 2, text: "Four schemas: state, event, claim, relation" },
      {
        type: "paragraph",
        text: "The memory store is small and typed on purpose. Four node kinds carry almost all the weight:",
      },
      {
        type: "list",
        items: [
          "**State** — a character (or place, or institution) at a moment in narrative time, holding its knowledge ledgers and active motifs.",
          "**Event** — something that happened, anchored to a chapter, with participants and a cause that may be withheld from the reader.",
          "**Claim** — a fact _as asserted_, tagged with who knows it and whether it is dormant, paid off, or contradicted. Claims are where secrets and lies live.",
          "**Relation** — a typed edge between the above: _remembers_, _contradicts_, _marks_, _caused-by_. Relations are what a graph query traverses; they are not free-text notes.",
        ],
      },
      {
        type: "paragraph",
        text: "Because these are typed, the interesting operations become ordinary code rather than prompts. “Every scene where Rowan and the priest are both present before chapter eight” is a filter over events. “Every claim the reader believes but a character does not” is a set difference over ledgers. The manuscript becomes queryable.",
      },

      { type: "heading", level: 2, text: "Temporal validity and contradiction detection" },
      {
        type: "paragraph",
        text: "Once facts are typed and time-stamped, contradiction detection stops being a judgment call and becomes a validation pass. Three checks catch most of what a story bible silently allows:",
      },
      {
        type: "code",
        language: "typescript",
        caption:
          "Validation runs before generation. Each check is a deterministic query over typed facts — no similarity threshold, no model in the loop.",
        code: contradictionCode,
      },
      {
        type: "paragraph",
        text: "The first check is the one general-purpose tools get wrong most often: **a leaked secret**. If a fact is marked `author-only` and it is not explicitly in scope for the current state, generation is not allowed to use it — even if it is, semantically, the single most relevant thing in the book. Relevance is precisely why a vector index would surface it. Validity is why the engine must not.",
      },

      { type: "heading", level: 2, text: "Structured memory vs. vector retrieval, side by side" },
      {
        type: "paragraph",
        text: "The graph below is the shape of the model on a small slice of real data. Nodes are typed; edges are relations. Toggle the author-only layer to reveal the fact the model is not permitted to use yet — the true cause of an event the reader has seen but not understood. That hidden node is the whole argument: a retrieval system cannot hide it, because it does not know it should.",
      },
      {
        type: "embed",
        component: "continuity-graph",
        caption:
          "Interactive — hover a node for its knowledge status; toggle the author-only layer. Data anonymized from Liminal 6:17.",
      },

      { type: "heading", level: 2, text: "A worked example from Liminal 6:17" },
      {
        type: "paragraph",
        text: "The prototype is built on an actual manuscript — _Liminal 6:17_, a multi-POV literary-horror novel — rather than an invented demo. One thread makes the model concrete. A motif, the time **6:17**, recurs from chapter one; the reader clocks it long before it means anything. In chapter four there is an event on a staircase whose cause is withheld. A character states, in chapter two, that “Oren left first.” Much later that claim is contradicted — but the contradiction is not _resolved_ on the page. The author is holding it open.",
      },
      {
        type: "paragraph",
        text: "In the memory store, the true cause of the staircase event is a single `author-only` claim, linked to the event by a `true-cause` relation. The reader-facing claim (“Oren left first”) links to it by a `contradicts` edge flagged as unresolved. An AI asked to expand chapter five can see the event, can see the reader-facing claim, and is _structurally blocked_ from using the true cause — until the author moves it out of the author-only ledger. The secret survives contact with the machine.",
      },
      {
        type: "callout",
        variant: "failure",
        title: "What broke — and what it taught",
        text: "My first model made the character the unit of memory: one node per character, with fields updated as the book progressed. It fell apart immediately. Jack at chapter one and Jack at chapter seven needed contradictory voice rules and contradictory continuity guardrails, and a single updatable record cannot hold both without lying about one of them. Worse, “update the field” quietly destroyed history — the exact thing the tool exists to preserve. The fix was to stop updating and start appending: the character became invariants plus an ordered array of states. Almost every hard bug I had disappeared the moment memory became immutable and time-indexed.",
      },

      { type: "heading", level: 2, text: "Inspect before generate" },
      {
        type: "paragraph",
        text: "The last piece is not a model at all — it is a receipt. Before any rewrite fires, the engine assembles a **Context Receipt**: what will be preserved, what is forbidden, what is hidden from output, which state is active. The author reads it, edits it, and only then approves generation. That ordering — inspect, then generate — is the product’s entire thesis made physical. The value of a story-memory engine is not that it writes better sentences. It is that its memory is _visible, editable, and trustworthy_ before it is ever used.",
      },
      {
        type: "quote",
        text: "The most interesting frontier for AI-assisted fiction isn’t better prose. It’s a collaborator with visible, editable, trustworthy memory.",
      },
      {
        type: "paragraph",
        text: "The working prototype — Story Memory, Character Drift, the Voice Fingerprint, and the full rewrite flow with a Context Receipt — runs on the real _Liminal 6:17_ data. You can open it here: [Continuity Atlas](/projects/continuity-atlas).",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

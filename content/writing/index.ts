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

/* ── Entity-graph diagram for the split-identity article ────────────── */
const entityGraphSvg = `
<svg viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono', monospace">
  <defs>
    <marker id="eg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.5"/>
    </marker>
  </defs>

  <!-- sameAs edges from the canonical Person -->
  <g stroke="currentColor" fill="none" stroke-width="1.3" opacity="0.5">
    <line x1="430" y1="150" x2="180" y2="70"  marker-end="url(#eg-arrow)"/>
    <line x1="430" y1="150" x2="180" y2="300" marker-end="url(#eg-arrow)"/>
    <line x1="430" y1="150" x2="690" y2="70"  marker-end="url(#eg-arrow)"/>
    <line x1="430" y1="150" x2="690" y2="300" marker-end="url(#eg-arrow)"/>
  </g>

  <!-- edge labels -->
  <g fill="currentColor" font-size="10" opacity="0.6" text-anchor="middle">
    <text x="292" y="100">sameAs</text>
    <text x="292" y="235">sameAs</text>
    <text x="576" y="100">worksFor</text>
    <text x="576" y="235">sameAs</text>
  </g>

  <!-- central Person -->
  <rect x="322" y="128" width="216" height="66" rx="8" fill="#e0742f" fill-opacity="0.10" stroke="#c15f22" stroke-width="1.6"/>
  <text x="430" y="150" text-anchor="middle" font-size="10" fill="#c15f22" letter-spacing="1.5">schema.org/Person · CANONICAL</text>
  <text x="430" y="170" text-anchor="middle" font-size="15" fill="currentColor">Ryan Pyles</text>
  <text x="430" y="185" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.65">alternateName: “Ryan J. Pyles”</text>

  <!-- satellites -->
  <g font-size="12" fill="currentColor">
    <rect x="60" y="44" width="150" height="52" rx="6" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="1.5"/>
    <text x="135" y="68" text-anchor="middle">GitHub</text>
    <text x="135" y="84" text-anchor="middle" font-size="10" opacity="0.65">/ryanpyles</text>

    <rect x="60" y="278" width="150" height="52" rx="6" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="1.5"/>
    <text x="135" y="302" text-anchor="middle">LinkedIn</text>
    <text x="135" y="318" text-anchor="middle" font-size="10" opacity="0.65">/in/ryanpyles</text>

    <rect x="650" y="44" width="160" height="52" rx="6" fill="#b07a3d" fill-opacity="0.06" stroke="#b07a3d" stroke-width="1.6"/>
    <text x="730" y="66" text-anchor="middle" fill="#b07a3d" font-size="10" letter-spacing="1">Organization</text>
    <text x="730" y="84" text-anchor="middle">FORMÆTRIX</text>

    <rect x="650" y="278" width="160" height="52" rx="6" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="1.5"/>
    <text x="730" y="300" text-anchor="middle">Elian Voigt</text>
    <text x="730" y="316" text-anchor="middle" font-size="10" opacity="0.65">pen name · fiction</text>
  </g>
</svg>`;

const personJsonLdCode = `// One canonical Person entity, declared once, that claims its own
// satellites. The alternateName resolves the two spellings of the name;
// sameAs is what tells a search engine these profiles are ONE identity.

export function buildPersonJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Pyles",
    alternateName: "Ryan J. Pyles",
    url: "https://ryanpyles.com",       // the canonical home
    sameAs: [
      "https://github.com/ryanpyles",
      "https://www.linkedin.com/in/ryanpyles",
      "https://www.formaetrix.com",     // the studio
      "https://www.elianvoigt.com",     // the pen name
    ],
    jobTitle: "Software Engineer & AI Systems Architect",
    worksFor: { "@type": "Organization", name: "FORMÆTRIX" },
    knowsAbout: ["AI Systems", "Next.js", "Publishing Infrastructure",
                 "Linguistics", "Experimental Fiction"],
  });
}`;

const canonicalCode = `// Every page declares exactly one canonical URL. No page is reachable
// at two addresses that both claim to be the original.

alternates: { canonical: \`https://ryanpyles.com\${path}\` }

// And at the host level, one 301 collapses the www duplicate:
// next.config — www.ryanpyles.com/:path -> ryanpyles.com/:path (permanent)`;

articles.push({
  slug: "split-digital-identity",
  title: "One Person, Two Names, Three Domains: Engineering a Split Digital Identity",
  subtitle:
    "A pen name, a studio, and a personal archive are not a branding problem — they are an entity-graph problem. Here is how I keep search engines from turning three identities into one muddy blur.",
  byline: "Ryan Pyles",
  date: "2026-08-15",
  category: "Identity & SEO",
  excerpt:
    "I publish fiction as Elian Voigt, run the FORMÆTRIX studio, and keep a personal engineering archive at ryanpyles.com. To a search engine that is three overlapping entities waiting to be confused. This is the structured-data and canonical architecture that keeps them distinct — and connected.",
  keywords: [
    "pen name SEO",
    "multiple brand website architecture",
    "author identity SEO",
    "Schema.org alternateName",
    "sameAs schema",
    "Ryan Pyles",
  ],
  targetSearches: [
    "pen name SEO",
    "multiple brand website architecture",
    "author identity SEO",
    "Schema.org alternateName",
  ],
  relatedProject: {
    href: "/projects/book-seo-system",
    label: "Book SEO Architecture — the nested-schema system",
  },
  status: "published",
  blocks: [
    {
      type: "paragraph",
      text: "I answer to more than one name on purpose. I write experimental fiction as **Elian Voigt**. I build software and run a studio called **FORMÆTRIX**. And I keep a personal engineering archive under my own name at ryanpyles.com. Three surfaces, one human. To a search engine, that is not a tidy story — it is three overlapping entities that will happily be merged, split, or confused unless you tell the machine, explicitly, how they relate.",
    },
    {
      type: "paragraph",
      text: "There is a second wrinkle. Search for “Ryan Pyles software engineer” and you will find _another_ engineer with the same name. Identity on the web is not resolved by how often you repeat your biography. It is resolved by structured, machine-readable claims. This is the architecture I use to make those claims — and the trap I engineered against.",
    },

    { type: "heading", level: 2, text: "Identity is an entity graph, not a bio" },
    {
      type: "paragraph",
      text: "The instinct with multiple brands is to write one good biography and paste it on every domain. That is precisely the move that creates a muddy entity graph. Duplicated prose gives a search engine no signal about _boundaries_ — where one identity ends and another begins — so it does the reasonable thing and blurs them together, or picks the wrong one as canonical.",
    },
    {
      type: "paragraph",
      text: "The fix is to stop thinking in pages and start thinking in nodes and edges. There is one **canonical Person** node. It lives at exactly one URL. It _claims_ its satellites — the studio, the pen name, the code profiles — with explicit typed edges. Everything else points home.",
    },
    {
      type: "figure",
      label: "Entity graph",
      caption:
        "The canonical Person at ryanpyles.com declares its own satellites via `sameAs` and `worksFor`. The pen name and the studio are separate nodes, connected — not duplicated.",
      svg: entityGraphSvg,
    },

    { type: "heading", level: 2, text: "alternateName and sameAs do the real work" },
    {
      type: "paragraph",
      text: "Two `schema.org/Person` properties carry most of the weight. `alternateName` resolves the fact that “Ryan Pyles” and “Ryan J. Pyles” are the same person — a small thing that quietly prevents the two spellings from fragmenting into two entities. `sameAs` is the load-bearing one: it is an explicit assertion that a list of URLs all refer to _this_ identity. It is how you connect the studio and the pen name to the person without collapsing them into it.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "The actual `buildPersonJsonLd()` from the site. `knowsAbout` is deliberate: it is disambiguation fuel against the other Ryan Pyles.",
      code: personJsonLdCode,
    },
    {
      type: "paragraph",
      text: "`knowsAbout` and `jobTitle` are not decoration. When another person shares your name, generic identity signals are a coin flip. Specific, typed expertise — _AI Systems, Next.js, Publishing Infrastructure, Linguistics_ — is what lets a search engine attach the right facts to the right Ryan. Technical specificity beats biographical volume every time.",
    },

    { type: "heading", level: 2, text: "One canonical URL per thing that exists" },
    {
      type: "paragraph",
      text: "Structured data tells engines how entities relate. Canonicalization tells them which address is the original. Every page on the site declares exactly one canonical URL, and the host layer collapses the obvious duplicate — `www` — with a single permanent redirect. The rule is boring and absolute: nothing important is reachable at two addresses that both claim to be the source.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "Per-page canonical declaration, plus the host-level www → apex 301 that lives in next.config.",
      code: canonicalCode,
    },
    {
      type: "paragraph",
      text: "The same discipline extends to the book pages, where the JSON-LD nests a `Book` inside an author `Person` and a `publisher` — so a novel is associated with a named author entity rather than a bare string. That nesting is what lets the fiction reinforce the person’s graph instead of floating free of it.",
    },

    { type: "heading", level: 2, text: "Where authorship boundaries actually matter" },
    {
      type: "paragraph",
      text: "The point of separating the identities is not secrecy — it is _clarity_. Elian Voigt is the byline on the fiction; Ryan Pyles is the byline on the engineering. The technical writing you are reading is signed Ryan Pyles, consistently, because a stable byline is itself an entity signal. The pen name gets its own canonical home and its own graph; ryanpyles.com merely declares the connection. Cross-linking is one-directional discipline: each home claims the others, so the edges are asserted from a place that has the authority to assert them.",
    },
    {
      type: "callout",
      variant: "failure",
      title: "The trap — a muddy entity graph",
      text: "The naive version of this — copy one biography onto ryanpyles.com, formaetrix.com, and elianvoigt.com — actively harms you. Identical prose across three domains reads to a crawler as duplicate content with no entity boundaries, which invites exactly the merge you are trying to prevent: the studio absorbed into the person, the pen name collapsed into the real name, or worse, your graph fused with the _other_ Ryan Pyles. The countermeasure is structural, not editorial: distinct descriptions per surface, one canonical home per entity, and explicit `sameAs` edges instead of repeated paragraphs. Say it once, in a machine-readable way, from the place that owns the claim.",
    },

    { type: "heading", level: 2, text: "The short version" },
    {
      type: "list",
      items: [
        "Model identities as **nodes and edges**, not as repeated biographies.",
        "Use `alternateName` to fuse spellings of one name; use `sameAs` to _connect_ distinct identities without merging them.",
        "Give each entity **one canonical home** and collapse duplicate hosts with a 301.",
        "Lean on `knowsAbout` / `jobTitle` for disambiguation when you share a name with someone else.",
        "Keep a **consistent byline** per surface — the byline is an entity signal.",
      ],
    },
    {
      type: "paragraph",
      text: "The publishing side of this — one typed content model generating pages, Open Graph, and nested JSON-LD automatically — is its own build: [Book SEO Architecture](/projects/book-seo-system).",
    },
  ],
});

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * Concrete evidence layered onto each case study: a real code excerpt, a
 * system diagram where one clarifies, an honest constraint or failure, what
 * I personally built, and where it runs. Code is pulled from — or faithful
 * to — the actual implementation; no invented figures.
 */

export interface ProofLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Proof {
  diagram?: { label?: string; svg: string; caption: string };
  implementation?: { language: string; caption: string; code: string };
  constraint?: { title?: string; body: string };
  built?: string[];
  links?: ProofLink[];
}

/* ── Diagrams (hand-authored, theme-aware via currentColor) ─────────────── */

const dualDomainSvg = `
<svg viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono', monospace">
  <defs>
    <marker id="dd-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.55"/>
    </marker>
  </defs>
  <rect x="20" y="96" width="200" height="58" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.85"/>
  <text x="120" y="120" text-anchor="middle" font-size="12" opacity="0.9">Host header</text>
  <text x="120" y="138" text-anchor="middle" font-size="10" opacity="0.6">[data-domain] on &lt;html&gt;</text>

  <g stroke="currentColor" fill="none" stroke-width="1.4" opacity="0.5">
    <line x1="220" y1="112" x2="300" y2="70" marker-end="url(#dd-a)"/>
    <line x1="220" y1="138" x2="300" y2="180" marker-end="url(#dd-a)"/>
    <line x1="560" y1="70" x2="640" y2="120" marker-end="url(#dd-a)"/>
    <line x1="560" y1="180" x2="640" y2="130" marker-end="url(#dd-a)"/>
  </g>

  <rect x="300" y="44" width="260" height="52" rx="6" fill="#c69c5d" fill-opacity="0.08" stroke="#b07a3d" stroke-width="1.4"/>
  <text x="430" y="66" text-anchor="middle" font-size="11" fill="#b07a3d">ryan → --color-black: paper</text>
  <text x="430" y="84" text-anchor="middle" font-size="11" fill="#b07a3d">--color-white: ink</text>

  <rect x="300" y="156" width="260" height="52" rx="6" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-width="1.4"/>
  <text x="430" y="178" text-anchor="middle" font-size="11" opacity="0.85">formaetrix → --color-black: #0a0a0a</text>
  <text x="430" y="196" text-anchor="middle" font-size="11" opacity="0.85">--color-white: #f5f5f5</text>

  <rect x="640" y="98" width="160" height="54" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="720" y="120" text-anchor="middle" font-size="12">Shared component</text>
  <text x="720" y="138" text-anchor="middle" font-size="10" opacity="0.6">reads var(--color-white)</text>
</svg>`;

const bookSeoSvg = `
<svg viewBox="0 0 840 150" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono', monospace">
  <defs>
    <marker id="bs-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.55"/>
    </marker>
  </defs>
  <g stroke="currentColor" fill="none" stroke-width="1.4" opacity="0.5">
    <line x1="150" y1="75" x2="196" y2="75" marker-end="url(#bs-a)"/>
    <line x1="330" y1="75" x2="376" y2="45" marker-end="url(#bs-a)"/>
    <line x1="330" y1="75" x2="376" y2="75" marker-end="url(#bs-a)"/>
    <line x1="330" y1="75" x2="376" y2="105" marker-end="url(#bs-a)"/>
  </g>
  <rect x="20" y="52" width="130" height="46" rx="5" fill="#c69c5d" fill-opacity="0.08" stroke="#b07a3d" stroke-width="1.4"/>
  <text x="85" y="72" text-anchor="middle" font-size="12" fill="#b07a3d">Book</text>
  <text x="85" y="88" text-anchor="middle" font-size="10" fill="#b07a3d" opacity="0.8">one typed object</text>

  <rect x="200" y="52" width="130" height="46" rx="5" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
  <text x="265" y="79" text-anchor="middle" font-size="12" opacity="0.9">pure transforms</text>

  <g font-size="11" fill="currentColor" opacity="0.9">
    <rect x="376" y="24" width="200" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="476" y="46" text-anchor="middle">Next Metadata + OpenGraph</text>
    <rect x="376" y="58" width="200" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="476" y="80" text-anchor="middle">Twitter Card</text>
    <rect x="376" y="92" width="200" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="476" y="114" text-anchor="middle">JSON-LD: Book › Person › Publisher</text>
  </g>
</svg>`;

const contentArchSvg = `
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono', monospace">
  <defs>
    <marker id="ca-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.55"/>
    </marker>
  </defs>
  <rect x="300" y="66" width="220" height="48" rx="6" fill="#c69c5d" fill-opacity="0.08" stroke="#b07a3d" stroke-width="1.5"/>
  <text x="410" y="86" text-anchor="middle" font-size="12" fill="#b07a3d">Typed content interface</text>
  <text x="410" y="103" text-anchor="middle" font-size="10" fill="#b07a3d" opacity="0.8">single source of truth</text>

  <g stroke="currentColor" fill="none" stroke-width="1.4" opacity="0.5">
    <line x1="300" y1="90" x2="180" y2="40" marker-end="url(#ca-a)"/>
    <line x1="300" y1="90" x2="180" y2="150" marker-end="url(#ca-a)"/>
    <line x1="520" y1="90" x2="640" y2="40" marker-end="url(#ca-a)"/>
    <line x1="520" y1="90" x2="640" y2="150" marker-end="url(#ca-a)"/>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.9">
    <rect x="40" y="20" width="140" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="110" y="42" text-anchor="middle">UI components</text>
    <rect x="40" y="132" width="140" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="110" y="154" text-anchor="middle">generateStaticParams</text>
    <rect x="640" y="20" width="140" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="710" y="42" text-anchor="middle">SEO metadata</text>
    <rect x="640" y="132" width="140" height="34" rx="4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>
    <text x="710" y="154" text-anchor="middle">JSON-LD</text>
  </g>
</svg>`;

/* ── Proof, keyed by case-study slug ────────────────────────────────────── */

export const projectProof: Record<string, Proof> = {
  "dual-domain-system": {
    diagram: {
      label: "Architecture",
      svg: dualDomainSvg,
      caption:
        "A single attribute on the root element remaps what the semantic color names resolve to. Shared components never branch — they read `var(--color-white)` and inherit the right value for whichever domain they render in.",
    },
    implementation: {
      language: "css",
      caption:
        "The real inversion, from globals.css. The semantic names keep their spelling but swap meaning under each domain scope.",
      code: `/* One attribute on <html> decides what the semantic names mean. */
[data-domain="ryan"] {
  --color-black: var(--paper);          /* background becomes parchment */
  --color-white: var(--ink);            /* foreground becomes ink */
  --color-accent: var(--orange);
  --color-border: rgba(17, 17, 17, 0.10);
}
/* Default (formaetrix) register — dark studio. */
:root {
  --color-black: #0a0a0a;
  --color-white: #f5f5f5;
}
/* A shared component never knows which register it is in: */
.card { background: var(--color-black); color: var(--color-white); }`,
    },
    constraint: {
      title: "The constraint",
      body: "The two brands are aesthetically opposite — one parchment-and-brass, one dark-and-orange — so they could not share a palette. The temptation was per-component conditionals. Instead the semantic tokens invert in meaning while keeping their names, so not one shared component needs a `domain` prop to render correctly in either register.",
    },
    built: [
      "The two-register token architecture and the `[data-domain]` cascade.",
      "Route isolation so both identities share one SiteLayout, Navigation, and Footer.",
      "Colocated, separately-exported content so the data layer never cross-contaminates.",
    ],
    links: [
      { label: "Live — this very page runs on the ryan register", href: "/", external: false },
    ],
  },

  "language-typography-engine": {
    implementation: {
      language: "css",
      caption:
        "Font stack, line-height, and reading direction switch in a single style recalculation, cascaded from the root — not through JS DOM mutations.",
      code: `/* CJK scripts get a different stack and looser rhythm, in one repaint. */
[data-lang="ja"] body,
[data-lang="zh"] body {
  font-family: var(--font-cjk);
  line-height: 1.8;                 /* taller glyph boxes need more room */
}

/* RTL flips the whole layout via logical properties, not left/right. */
[dir="rtl"] { text-align: start; }
.card { padding-inline-start: var(--space-6); }  /* start, never left */`,
    },
    constraint: {
      title: "Why the dir update is imperative",
      body: "A declarative `dir` swap renders one frame in the wrong direction before React reconciles — a visible flash of RTL-as-LTR. The switcher instead sets `document.dir` imperatively on selection, and the SSR default is `en`/LTR with the client reconciling on mount, so there is no flash on first paint or on return visits (the choice is read from localStorage).",
    },
    built: [
      "The single context dispatch that updates `dir`, `lang`, the font class, and every UI string at once.",
      "The CJK font stack with per-script line-height, and the RTL logical-property cascade.",
      "localStorage persistence to kill the repeat-visit flash of wrong direction.",
    ],
    links: [
      { label: "Live — the language switcher on the homepage", href: "/", external: false },
    ],
  },

  "blob-navigation": {
    implementation: {
      language: "typescript",
      caption:
        "From BlobNav.tsx. Each frame recomputes vertices from the stored originals plus noise — never from the previous frame — so the geometry can't drift or compound error over time.",
      code: `// origPositions is captured once at init.
useFrame(({ clock }) => {
  const t = clock.getElapsedTime();
  for (let i = 0; i < positions.count; i++) {
    const ix = origPositions[i*3], iy = origPositions[i*3+1], iz = origPositions[i*3+2];
    const noise =
      Math.sin(ix*3.2 + t*speed) *
      Math.cos(iy*2.8 + t*speed*1.1) *
      Math.sin(iz*3.0 + t*speed*0.9);
    // computed from ORIGINALS + noise(t, cursor), not accumulated:
    positions.setXYZ(i, ix + noise*amp + mouse.x*0.04,
                        iy + noise*amp + mouse.y*0.04, iz + noise*amp);
  }
  positions.needsUpdate = true;
});`,
    },
    constraint: {
      title: "The failure it avoids",
      body: "The obvious way — nudge each vertex a little every frame — accumulates floating-point error and the blob slowly melts into noise. Recomputing from the immutable original positions each frame keeps it stable indefinitely. Navigation targets are mapped to spherical coordinates and hit-tested in 3D, so the hit zones stay consistent no matter how the surface deforms — and there's an accessible `BlobNavFallback` list plus a WebGL capability guard for anyone without a GPU.",
    },
    built: [
      "The per-frame vertex deformation driven by cursor position.",
      "Region-mapped 3D hit detection with angular-proximity thresholds.",
      "The accessible non-WebGL fallback and the capability/error guard around the canvas.",
    ],
    links: [
      { label: "Explore the live navigation demo", href: "/projects/blob-navigation#prototype", external: false },
    ],
  },

  "book-seo-system": {
    diagram: {
      label: "Pipeline",
      svg: bookSeoSvg,
      caption:
        "One typed `Book` object feeds pure transforms that emit every SEO surface at build time — including a JSON-LD graph that nests the book inside a named author and publisher.",
    },
    implementation: {
      language: "typescript",
      caption:
        "The real buildBookJsonLd from lib/metadata.ts. Nesting Book › Person › Publisher is what associates a novel with an author *entity*, not a bare string.",
      code: `export function buildBookJsonLd(book: Book): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.author },
    datePublished: book.publishDate,
    description: book.description,
    ...(book.isbn ? { isbn: book.isbn } : {}),
    publisher: { "@type": "Person", name: "Ryan J. Pyles" },
    inLanguage: "en",
    genre: book.keywords[0] ?? "Literary Fiction",
  });
}`,
    },
    constraint: {
      title: "The constraint",
      body: "Next's Metadata API doesn't emit JSON-LD, so the structured data is injected as a script tag with full control over schema shape — while Open Graph and Twitter cards go through the Metadata API. The rule that makes it scale: the content model *is* the SEO model. There is no separate SEO config to drift out of sync; adding a title is one typed object.",
    },
    built: [
      "The Book → Metadata → Open Graph → Twitter → JSON-LD transform, as pure functions.",
      "Full static pre-rendering via generateStaticParams, so there's no request-time metadata work.",
      "The nested Person/Organization schema that puts books into the author's entity graph.",
    ],
    links: [
      { label: "See a live book page", href: "/books", external: false },
    ],
  },

  "editorial-design-system": {
    implementation: {
      language: "css",
      caption:
        "From tokens.css. Raw manuscript values live at :root; semantic tokens are domain-scoped references to them — the two-layer split that lets shared and domain-exclusive components coexist.",
      code: `:root {
  /* Raw manuscript palette — literal values, defined once. */
  --paper: #F8F6F3; --ink: #111111; --brass: #c69c5d;

  /* Modular type scale, in rem for accessibility (~1.25x steps). */
  --text-base: 1rem; --text-lg: 1.25rem; --text-2xl: 2rem; --text-5xl: 5rem;

  /* Spacing on a 4px base unit — no magic numbers in components. */
  --space-1: 0.25rem; --space-4: 1rem; --space-8: 2rem; --space-16: 4rem;
}`,
    },
    constraint: {
      title: "The load-bearing decision",
      body: "Separating raw tokens (`--paper`, `--ink`) from semantic tokens (`--color-black`, `--color-white`) is what makes the dual-domain inversion possible. A ryan-exclusive component that always wants parchment writes `var(--paper)` directly; a shared component writes `var(--color-black)` and gets whatever the current register resolves it to. One stylesheet, two brands, zero framework dependency.",
    },
    built: [
      "The two-layer token system — raw palette plus semantic roles.",
      "A seven-step rem type scale and a twelve-step 4px spacing system.",
      "Motion tokens (durations + easing) so every transition shares one temporal feel.",
    ],
    links: [
      { label: "Live — the whole site runs on these tokens", href: "/", external: false },
    ],
  },

  "content-architecture": {
    diagram: {
      label: "Data flow",
      svg: contentArchSvg,
      caption:
        "One typed interface is the single source of truth. Four consumers — UI, static params, SEO metadata, and JSON-LD — all read from it, so they cannot silently diverge.",
    },
    implementation: {
      language: "typescript",
      caption:
        "Static params are generated by mapping over typed content arrays — adding an entry creates its page, metadata, and schema with no configuration change.",
      code: `// The content array is the source; the router just follows it.
export async function generateStaticParams() {
  return projectCases.map((c) => ({ slug: c.slug }));
}

// Discriminated unions make missing cases a compile error, not a runtime bug:
type Demo =
  | { type: "seo";  caption: string }
  | { type: "continuity-atlas"; caption: string };
// add a variant without handling it everywhere → TypeScript refuses to build.`,
    },
    constraint: {
      title: "The failure mode it prevents",
      body: "A literary site's content feeds four consumers — components, SSG params, SEO, and structured data. Without a typed source of truth they develop independent assumptions and break silently over time. Making the interface the contract means a new book or project is a single typed object addition that propagates everywhere, and a mismatch fails the build rather than production.",
    },
    built: [
      "The colocated typed content domains (books, projects, field notes, languages, …).",
      "generateStaticParams driven entirely by content arrays.",
      "Framework-agnostic pure utility functions (buildPersonJsonLd, buildBookJsonLd, …).",
    ],
    links: [
      { label: "Read the architecture in depth", href: "/writing/ai-story-memory-engine", external: false },
    ],
  },

  "continuity-atlas": {
    diagram: {
      label: "Architecture",
      svg: `
<svg viewBox="0 0 840 150" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono', monospace">
  <defs>
    <marker id="ca2-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.55"/>
    </marker>
  </defs>
  <g stroke="currentColor" fill="none" stroke-width="1.4" opacity="0.5">
    <line x1="150" y1="75" x2="196" y2="75" marker-end="url(#ca2-a)"/>
    <line x1="360" y1="75" x2="406" y2="75" marker-end="url(#ca2-a)"/>
    <line x1="576" y1="75" x2="622" y2="75" marker-end="url(#ca2-a)"/>
  </g>
  <rect x="20" y="52" width="130" height="46" rx="5" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
  <text x="85" y="79" text-anchor="middle" font-size="12" opacity="0.9">Manuscript</text>
  <rect x="196" y="52" width="164" height="46" rx="5" fill="#c69c5d" fill-opacity="0.08" stroke="#b07a3d" stroke-width="1.4"/>
  <text x="278" y="72" text-anchor="middle" font-size="11" fill="#b07a3d">Typed memory</text>
  <text x="278" y="88" text-anchor="middle" font-size="9" fill="#b07a3d" opacity="0.8">states · claims · relations</text>
  <rect x="406" y="52" width="170" height="46" rx="5" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.85"/>
  <text x="491" y="72" text-anchor="middle" font-size="11" opacity="0.9">Validator</text>
  <text x="491" y="88" text-anchor="middle" font-size="9" opacity="0.6">temporal · contradiction</text>
  <rect x="622" y="52" width="196" height="46" rx="5" fill="none" stroke="#e0742f" stroke-width="1.4"/>
  <text x="720" y="72" text-anchor="middle" font-size="11" fill="#c15f22">Context Receipt</text>
  <text x="720" y="88" text-anchor="middle" font-size="9" fill="#c15f22" opacity="0.75">inspect before generate</text>
</svg>`,
      caption:
        "Generation never reads the memory store directly — it passes through a validator and an editable Context Receipt the author approves first.",
    },
    implementation: {
      language: "typescript",
      caption:
        "The character model that makes 'truth has a status' executable — the invariants stay put; the ordered `states` array is the moving part, each state carrying its own knowledge ledgers.",
      code: `interface CharacterState {
  chapter: ChapterRef;
  knows: string[];              // fact ids in scope for this state
  doesNotKnow: string[];        // explicit guardrail
  readerKnows: string[];        // dramatic-irony ledger
  authorOnly: string[];         // hidden from generation by default
  continuityWarnings: string[];
}
interface Character {
  surfaceGoal: string; hiddenDesire: string; fear: string; lie: string;
  states: CharacterState[];     // ordered by chapter — memory is append-only
}`,
    },
    constraint: {
      title: "What broke — and what it taught",
      body: "The first model made the character the unit of memory: one node, fields updated as the book progressed. It fell apart immediately — Jack at Chapter I and Jack at Chapter VII need contradictory voice rules and guardrails, and 'update the field' quietly destroyed the very history the tool exists to preserve. The fix was to stop updating and start appending: a character became invariants plus an ordered array of states. Almost every hard bug disappeared once memory was immutable and time-indexed.",
    },
    built: [
      "The append-only, time-indexed character-state data model on real Liminal 6:17 data.",
      "The author-only knowledge layer that keeps secrets out of generation by default.",
      "The Context Receipt — inspect-before-generate — and the interactive prototype itself.",
    ],
    links: [
      { label: "Launch the interactive prototype", href: "/projects/continuity-atlas#prototype", external: false },
      { label: "Read the full architecture write-up", href: "/writing/ai-story-memory-engine", external: false },
    ],
  },
};

export function getProof(slug: string): Proof | undefined {
  return projectProof[slug];
}

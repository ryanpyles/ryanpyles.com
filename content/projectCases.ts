export type DemoType =
  | "domain-toggle"
  | "language"
  | "blob-nav"
  | "seo"
  | "tokens"
  | "schema"
  | "continuity-atlas";

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  stack: string[];
  tagline: string;
  problem: string;
  approach: {
    summary: string;
    decisions: string[];
  };
  demo: {
    type: DemoType;
    caption: string;
  };
  technical: string;
  outcome: string;
  metrics?: string[];
}

export const projectCases: CaseStudy[] = [
  {
    slug: "dual-domain-system",
    title: "Dual-Domain Identity System",
    year: "2025",
    stack: ["Next.js 14", "TypeScript", "CSS Modules", "Middleware"],
    tagline:
      "One codebase, two completely different brand identities — served at runtime by domain, with zero build-time duplication.",
    problem:
      "FORMÆTRIX (a literary studio) and ryanpyles.com (a personal archive) needed to coexist in a single Next.js repository without bleeding into each other visually, semantically, or structurally. Maintaining two separate repositories for what was essentially one interconnected system would have meant duplicating layout infrastructure, navigation logic, SEO primitives, and the entire design token architecture — then keeping them synchronized indefinitely. The real constraint was that the two identities are aesthetically opposite: one is a dark, high-contrast studio brand with orange accents; the other is a manuscript-paper archive with terracotta and brass. They couldn't share a palette.",
    approach: {
      summary:
        "The solution was domain-scoped CSS custom property remapping layered over a shared token system. Every shared component reads color through semantic names (--color-black, --color-white, --color-accent) — and a single [data-domain] attribute on the root layout element redefines what those names resolve to per domain.",
      decisions: [
        "Middleware domain detection: edge-level request inspection reads the Host header and sets a response header, which the root layout uses to select the domain branch. No client-side JS, no cookie dependency.",
        "CSS custom property inversion: under [data-domain='ryan'], --color-black becomes the paper background (#F5F1EA) and --color-white becomes the ink foreground (#1A1A1A). The semantic names invert in meaning but every downstream component still just reads var(--color-white) for foreground text — no per-component changes needed.",
        "Route isolation: formaetrix pages live under /formaetrix/* with their own layout. Ryan pages are root-level. Both share the same SiteLayout component, Navigation, Footer, Section, and ProjectCard — differentiated entirely by the data-domain cascade.",
        "Content separation: ryanBooks and formaetrixBooks are typed and colocated in content/books/ but exported separately. No cross-contamination at the data layer.",
      ],
    },
    demo: {
      type: "domain-toggle",
      caption:
        "The same Navigation and Section components rendered under each domain's CSS scope. Toggle to see the token inversion in effect.",
    },
    technical:
      "The critical implementation detail is that CSS custom property inheritance respects the DOM tree — [data-domain='ryan'] on the <html> element means every descendant's var(--color-black) resolves to #F5F1EA, even inside a shared component that was written for the formaetrix dark register. This means zero conditional rendering in shared components; they simply inherit the correct values. The only place domain logic appears in component code is in components that need domain-exclusive behavior (like BlobNav, which only renders on formaetrix). The performance profile is clean: no client-side domain detection, no hydration mismatch risk, no extra CSS bundles. Both domains share the same stylesheet and same JS bundle.",
    outcome:
      "A single deployable unit serving two distinct brand identities. Adding a third domain (hypothetically) would require one new [data-domain] block in globals.css and a middleware Host match — no new components, no new routes, no new build configuration.",
    metrics: [
      "Zero shared components duplicated",
      "One stylesheet, one JS bundle",
      "Edge-level domain detection with no client JS",
      "Two fully independent visual identities from one token system",
    ],
  },
  {
    slug: "language-typography-engine",
    title: "Multi-Language Typography Engine",
    year: "2025",
    stack: ["React Context", "TypeScript", "CSS Custom Properties", "i18n"],
    tagline:
      "Typography that doesn't just translate text — it reconfigures the entire reading surface for each language's structural requirements.",
    problem:
      "Standard i18n implementations swap text strings and stop there. The actual problem is deeper: Arabic and Hebrew require RTL layout direction, CJK scripts require fundamentally different font stacks and line-height adjustments, and some languages have UI strings long enough to break fixed-width navigation elements. A typography engine that only handles string replacement produces a site that technically supports eleven languages but visually reads like it was designed for one.",
    approach: {
      summary:
        "Language switching is implemented as a coordinated state update that modifies the document's dir attribute, the html element's lang, the body's font-family via a scoped CSS class, and all UI strings simultaneously — from a single context dispatch.",
      decisions: [
        "localStorage persistence: the selected language is stored in localStorage and read on initial hydration to prevent flash-of-wrong-direction on return visits. The SSR default is 'en' with LTR; the client immediately reconciles on mount.",
        "CJK font stack: Japanese and Mandarin apply a separate --font-body token resolving to 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans CJK JP', system-ui. Line height increases from 1.6 to 1.8 for CJK to accommodate taller character bounding boxes.",
        "RTL cascade: Arabic and Hebrew set dir='rtl' on the html element, which reverses flex direction across the entire layout. Padding, margin, and border radius values that are directional (start/end, not left/right) are written using logical properties throughout the CSS.",
        "Dynamic dir attribute management: the LanguageSwitcher component reads the current language's metadata (including isRTL) and imperatively updates document.dir on selection. This is intentionally imperative rather than declarative to avoid an intermediate render with the wrong direction.",
      ],
    },
    demo: {
      type: "language",
      caption:
        "Switch between scripts to see font stack, reading direction, and typographic adjustments applied live.",
    },
    technical:
      "The font switching mechanism relies on data-lang attributes cascaded from the html element rather than JavaScript-injected inline styles. Each language has a CSS rule matching [data-lang='ja'] body { font-family: var(--font-cjk); line-height: 1.8; } — which means the font change happens in a single style recalculation pass rather than through multiple JS DOM mutations. The LanguageSwitcher component itself is dynamically imported with ssr:false, preventing hydration mismatches from the localStorage read. The translations table is a flat TypeScript record rather than nested JSON files, which makes dead-code elimination simpler and keeps the bundle size predictable.",
    outcome:
      "Eleven languages rendering correctly with appropriate typography, reading direction, and UI strings — loaded from a single shared stylesheet with no per-language CSS bundles.",
    metrics: [
      "11 languages: Latin, RTL (Arabic, Hebrew), CJK (Japanese, Mandarin), Cyrillic (Russian), Nordic",
      "Single CSS bundle with data-attribute language scoping",
      "No layout shift on language switch",
      "localStorage persistence eliminates repeat-visit FOUC",
    ],
  },
  {
    slug: "blob-navigation",
    title: "3D Identity Navigation",
    year: "2025",
    stack: ["Three.js", "React Three Fiber", "WebGL", "GLSL"],
    tagline:
      "Navigation as a physical object — an organic WebGL form that responds to the cursor and maps spatial regions to site destinations.",
    problem:
      "The FORMÆTRIX studio needed a navigation system that embodied the brand's core tension between structure and instability. A standard nav bar contradicts a publishing imprint that explicitly resists convention. The requirement was a navigation that felt like a living thing — something with mass and reactivity — while still being a functional, accessible wayfinding system.",
    approach: {
      summary:
        "A Three.js IcosahedronGeometry with high vertex subdivision is deformed per-frame using sinusoidal noise functions that read mouse position as an influence vector. Navigation targets are mapped to spherical coordinate regions — hover detection is done in 3D space rather than 2D screen space.",
      decisions: [
        "Vertex deformation in useFrame: each animation tick reads the cursor's normalized NDC coordinates and applies them as a directional influence to the noise amplitude. The effect is that the blob 'reaches' toward the cursor, giving it apparent intention.",
        "Region-mapped navigation: rather than invisible DOM hotspots, each nav node (Works, Imprint, System, Contact) is assigned a theta/phi coordinate on the sphere. Hover detection raycasts into the 3D scene and checks angular proximity to each node — providing a consistent hit zone regardless of deformation state.",
        "Domain-differentiated lighting: the ryan domain uses warm ambient light with a fill from below; the formaetrix domain uses harsher directional lighting with a stronger rim. The blob reads as the same form but with a different character.",
        "Non-WebGL fallback: BlobNavFallback renders a standard nav list visible only at mobile breakpoints (CSS-swapped), keeping the DOM accessible without requiring WebGL capability detection.",
      ],
    },
    demo: {
      type: "blob-nav",
      caption:
        "The live FORMÆTRIX navigation blob. Move your cursor over it — the deformation responds to your position.",
    },
    technical:
      "The noise function adds a time-varying sin/cos displacement to each vertex position vector, scaled by a cursor influence factor. The key insight is that the original vertex positions are stored in a Float32Array at initialization — each frame, positions are computed from originals + noise(t, cursor) rather than accumulated, which prevents the geometry from drifting or compounding errors over time. The domain-specific color values are passed as props rather than hardcoded, making the component reusable across both domains with different material configurations.",
    outcome:
      "A navigation interface that doubles as the primary brand expression on the FORMÆTRIX homepage — recognizable, cursor-reactive, and functionally complete for wayfinding.",
    metrics: [
      "60fps on mid-range hardware",
      "Vertex-level deformation (not just scale/translate)",
      "3D hit detection with angular proximity thresholds",
      "Accessible fallback for mobile and reduced-motion",
    ],
  },
  {
    slug: "book-seo-system",
    title: "Book SEO Architecture",
    year: "2025",
    stack: ["Next.js", "JSON-LD", "Open Graph", "Static Generation"],
    tagline:
      "Structured data and metadata as a first-class concern — every book page readable by search engines, social cards, and reading apps without extra effort.",
    problem:
      "A literary publisher's catalog is only as discoverable as its metadata. Book pages need to be indexable not just as generic web pages but as structured Book entities that search engines can parse, social platforms can preview, and reading apps can import. The challenge is authoring that metadata once per title — in the content layer — and having it flow automatically into every surface that needs it without manual Open Graph tags or hand-written JSON-LD.",
    approach: {
      summary:
        "Each Book object in the content layer carries all the metadata needed for every downstream SEO surface. A set of pure utility functions transforms Book → Next.js Metadata → Open Graph → Twitter Card → JSON-LD Book schema, called once per static page generation.",
      decisions: [
        "Content-first metadata: the Book type includes publishDate, author (for the Person schema), publisher (for the Organization schema), isbn, and description. No separate SEO config file — the content model is the SEO model.",
        "generateStaticParams for full pre-rendering: every book slug generates a static HTML page at build time with its metadata embedded. No server-side rendering, no metadata fetching at request time.",
        "JSON-LD injection via dangerouslySetInnerHTML: the structured data script tag is rendered inside the page component using Next.js's script injection pattern, not the Metadata API (which doesn't support JSON-LD directly). This gives full control over schema shape.",
        "Canonical URL construction: a shared buildCanonicalUrl() utility derives canonical URLs from the base domain + slug, ensuring consistent canonicalization across the ryan and formaetrix domains.",
      ],
    },
    demo: {
      type: "seo",
      caption:
        "The metadata layers generated for a single book — Open Graph, Twitter Card, and JSON-LD Book schema rendered in full.",
    },
    technical:
      "The JSON-LD schema nests three schema.org types: Book (the primary entity), Person (for the author, with a sameAs URL linking to the author page), and Organization (for the publisher/imprint). This nesting is what allows search engines to associate a book with a named author entity rather than treating the author as just a string. The buildBookJsonLd() function is a pure TypeScript function — no hooks, no React — which makes it fully testable and reusable across SSG contexts.",
    outcome:
      "Every book in the catalog is fully represented in search engine indexes, social media previews, and structured data graphs — authored once in the content layer with zero per-page SEO work.",
    metrics: [
      "100% of book pages have Book schema, Open Graph, and Twitter Card",
      "Zero per-page manual metadata authoring",
      "Nested Person + Organization schemas for full entity graph",
      "Static HTML output — no runtime metadata fetching",
    ],
  },
  {
    slug: "editorial-design-system",
    title: "Editorial Design System",
    year: "2025",
    stack: ["CSS Custom Properties", "Design Tokens", "Typography", "Responsive"],
    tagline:
      "A token-based design system built for reading — where type scale, rhythm, and color are the interface, not ornamentation.",
    problem:
      "Literary publishing requires a design system that serves reading first and brand second. Most CSS frameworks optimize for UI components — buttons, modals, navigation. A system for long-form editorial content needs to prioritize vertical rhythm, type hierarchy, and the relationship between the reading column and the surrounding page. Building without a UI framework forces every decision to be intentional rather than inherited.",
    approach: {
      summary:
        "A fully custom token system defined in a single tokens.css file — no utility class proliferation, no component library overhead. Every value is a named custom property; every component references tokens, never raw values. The system supports two visual registers (dark studio, manuscript paper) from the same token names.",
      decisions: [
        "Semantic color naming: tokens are named by role (--color-black, --color-white, --color-accent) not by value (#f5f1ea). This is what enables the domain-scoped palette inversion — components never need to know which register they're in.",
        "Modular type scale: seven named sizes from --text-xs to --text-5xl, set in rem for accessibility. The scale is approximately 1.25× (major third) between steps, which produces comfortable visual hierarchy without excessive size jumps.",
        "Spacing as a system: spacing tokens follow a 0.25rem (4px) base unit with steps at 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8 rem. Every component uses these tokens — no magic numbers in component CSS.",
        "Motion tokens: --duration-fast (150ms), --duration-base (300ms), --duration-slow (500ms), --duration-lazy (800ms) + two easing curves. All transitions in the system pull from these values, ensuring consistent temporal feel across interactions.",
      ],
    },
    demo: {
      type: "tokens",
      caption:
        "The live token system — color palette, type scale, and spacing values as rendered on both domain registers.",
    },
    technical:
      "The single most important structural decision was separating the manuscript palette tokens (--paper, --ink, --brass, etc.) from the semantic tokens (--color-black, --color-white, etc.). The manuscript tokens are raw values defined once at :root. The semantic tokens are domain-scoped references to the raw values. This two-layer system means you can write var(--paper) directly in ryan-exclusive components (like the NotebookPanel) where you always want parchment — while shared components write var(--color-black) and get the right value for whatever domain they're rendering in.",
    outcome:
      "A design system that serves two fully differentiated brand identities from one stylesheet, with no framework dependency, no build-time token compilation, and complete control over every rendered value.",
    metrics: [
      "Zero UI framework dependencies",
      "Two domain registers from one token system",
      "7-step type scale in rem",
      "12-step spacing system on a 4px base unit",
    ],
  },
  {
    slug: "content-architecture",
    title: "Data-Driven Content Architecture",
    year: "2025",
    stack: ["TypeScript", "Static Generation", "Content Modeling", "Next.js"],
    tagline:
      "Content as typed infrastructure — a schema-first approach where the shape of data drives the shape of every page, component, and metadata output.",
    problem:
      "A literary site's content isn't just text to display — it's structured data with relationships (books to authors, projects to tags, field notes to categories) that needs to feed UI components, SEO pipelines, static generation parameters, and structured data schemas simultaneously. Without a typed content layer, these four consumers develop independent data assumptions that diverge over time and break silently.",
    approach: {
      summary:
        "Every content type is defined as a TypeScript interface in a dedicated content file. The interface is the single source of truth — it determines what UI components can render, what pages can be generated, and what structured data can be produced. No content is valid unless it satisfies the type.",
      decisions: [
        "Colocated content and types: each content domain (books, projects, field notes, languages, network nodes) has its own directory with a types.ts and an index.ts exporting the typed data. Types and data live together rather than in separate /types and /data directories.",
        "generateStaticParams driven by content arrays: Next.js static params are generated by mapping over the typed content arrays, so adding a new book or project automatically creates the corresponding static page at build time without any configuration change.",
        "Discriminated union patterns: where content varies structurally (e.g., different demo types per project, different language focus levels), discriminated unions enforce completeness — TypeScript will error if a new variant is added without handling it in every consumer.",
        "Content utilities as pure functions: buildPersonJsonLd(), buildBookJsonLd(), buildCanonicalUrl() are pure TypeScript functions that transform content types to output types. Pure functions are testable, tree-shakeable, and have no side effects — keeping the content layer clean of framework concerns.",
      ],
    },
    demo: {
      type: "schema",
      caption:
        "The TypeScript content schema and how each type flows into its page, component, and metadata consumers.",
    },
    technical:
      "The key architectural discipline is that no component ever constructs content — components only render what they receive via props. The content layer (typed data + utility functions) is entirely framework-agnostic TypeScript. It could be consumed by a different framework without changes. This separation also means the content layer is the right place to add validation, relationships, or computed fields — not inside components or page files, where that logic would be invisible to other consumers.",
    outcome:
      "A codebase where adding a new book, project, or field note is a single typed object addition in a content file — which automatically propagates to static page generation, SEO metadata, UI rendering, and structured data output.",
    metrics: [
      "7 typed content domains (books, projects, field notes, languages, network nodes, current work, manuscript fragments)",
      "generateStaticParams driven entirely by content arrays",
      "Zero untyped content — TypeScript enforces schema compliance",
      "Content layer framework-agnostic (pure TypeScript, no React imports)",
    ],
  },
  {
    slug: "continuity-atlas",
    title: "Continuity Atlas",
    year: "2025",
    stack: ["React", "Framer Motion", "Product Design", "Narrative Design"],
    tagline:
      "Story memory that behaves like a living manuscript — a visual interface for novelists who need to inspect what the AI thinks is true before it generates, rewrites, or expands anything.",
    problem:
      "Most AI writing tools understand story context as stored facts: characters, synopsis, genre, outline, style. A source of truth that can't move will eventually contradict the book it's supposed to protect. The series novelist's real anxiety about AI collaboration is sharper than generation quality — it's visible memory. Will the AI remember what matters, or confidently sand the weirdness off the book? In real manuscripts, truth is contextual. What a character knows, what the reader knows, and what only the author knows are three different layers — and they drift apart on purpose. A frozen Story Bible collapses those layers and resolves mysteries the author was deliberately holding open.",
    approach: {
      summary:
        "Rather than invent a fake app for 'aspiring writers,' the prototype uses an actual manuscript — Liminal 6:17, a multi-POV literary speculative novel — as its test case. Every card in the demo is grounded in the real text. Three working assumptions came from treating a real book as the probe.",
      decisions: [
        "Truth has a status: every fact carries who knows it (reader, character, or author-only) and whether it's been paid off, contradicted, or is still dormant. Author-only facts are locked behind a violet marginalia treatment and hidden from AI output by default.",
        "The unit of memory is the state, not the character: Jack at Chapter I (avoidant, lucid) and Jack at Chapter VII (fractured, bodily panic) need different voice rules and different continuity guardrails. One card can't hold both. Fracture states render as warning-red rotated diamonds on the chapter timeline.",
        "Inspect before generate: the writer sees a Context Receipt — what will be preserved, what's forbidden, what's hidden from output — before any rewrite fires. The receipt is editable. That ordering is the product's whole argument made physical.",
        "Voice is behavioral, not adjectival: 'dark, literary' is useless to an AI. Fragment frequency, sensory density, dialogue evasion, time-marker repetition — measured behaviors the system can be held to. Generic competence is the failure mode, not the goal.",
      ],
    },
    demo: {
      type: "continuity-atlas",
      caption:
        "The full interactive prototype, built on real Liminal 6:17 manuscript data. Navigate between Story Memory, Character Drift, Voice Fingerprint, and the Rewrite flow.",
    },
    technical:
      "A single-file React prototype driven by local manuscript JSON — no backend; AI generation is mocked so the design thinking stays the subject. The manuscript data was extracted from the actual Liminal 6:17 .docx: 24 chapters parsed, character and motif frequencies counted, real passages pulled for the rewrite flow. The data model makes 'truth has a status' executable: each character holds invariants (surface goal, hidden desire, fear, lie, voice markers) plus an ordered array of states, each carrying knows / doesNotKnow / readerKnows / authorOnly / activeMotifs / continuityWarnings. Motion is slow and deliberate — digital index cards, marginalia, burn-mark timeline nodes — built to feel like a manuscript desk at midnight rather than a product dashboard.",
    outcome:
      "AI writing tools become more useful when writers can inspect and shape the context behind generation. Continuity Atlas explores a visual interface for story memory — one that treats characters, voice, motifs, and narrative secrets as evolving states rather than static notes. It sits at the intersection of product design, narrative design, writing craft, prompt engineering, and front-end implementation. The most interesting frontier for AI-assisted fiction isn't better sentences — it's a collaborator with visible, editable, trustworthy memory.",
    metrics: [
      "3 POV characters (Jack, Oren, Damon) with chapter-by-chapter state timelines",
      "8 story memory entries — motifs, secrets, contradictions, promises — with author-only gating",
      "8-metric voice fingerprint extracted from real manuscript data",
      "Full rewrite flow: Context Receipt → constrained generation → voice-match diff → memory patch prompt",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return projectCases.find((c) => c.slug === slug);
}

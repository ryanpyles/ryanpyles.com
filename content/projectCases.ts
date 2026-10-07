export type DemoType =
  | "domain-toggle"
  | "language"
  | "blob-nav"
  | "seo"
  | "tokens"
  | "schema"
  | "polytype"
  | "publish-arch"
  | "locale-system"
  | "continuity-atlas";

/** A metric worth setting at display scale rather than burying in a list. */
export interface Figure {
  /** The numeral or short token, e.g. "0", "60", "100", "3D". */
  value: string;
  /** Optional suffix rendered smaller and tight against the value, e.g. "fps", "%". */
  unit?: string;
  /** What the figure counts. */
  label: string;
}

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

  /* ── Staged narrative ────────────────────────────────────────────────
     The fields below re-cut `problem` and `technical` into beats so the
     case study reads as a sequence rather than two walls of prose. The
     sentences are the same ones; only their grouping and order differ.
     All optional — a case study without them falls back to the long form. */

  /** The sharpest line of `problem`, promoted to open the piece. */
  lede?: string;
  /** The rest of `problem`, grouped into paragraphs. */
  problemBeats?: string[];
  /** `technical`, split at its natural turns. */
  technicalBeats?: string[];
  /** One sentence worth reading on its own. */
  pullQuote?: string;
  /** Numeric metrics, set large. Non-numeric ones stay in `metrics`. */
  figures?: Figure[];

  /* ── Failure & decision beats ────────────────────────────────────────
     Failure states are design material: the "04 / Failure" and
     "05 / Decision" beats render a real constraint and the call made
     about it, not decorative filler. Both optional. */
  failure?: FailureBeat;
  decision?: DecisionBeat;
}

/** A real constraint, rendered as evidence. */
export type FailureBeat =
  | {
      kind: "overflow";
      label: string;
      caption: string;
      /** Fixed component width in px that the strings must fit. */
      budget: number;
      cases: { locale: string; text: string; over?: boolean }[];
    }
  | {
      kind: "divergence";
      label: string;
      caption: string;
      /** Two fragments that drifted; the changed line is called out. */
      left: { title: string; lines: string[] };
      right: { title: string; lines: string[] };
      /** Index of the line that differs, highlighted in both columns. */
      changedLine: number;
    };

/** The call made about the failure — a before/after. */
export interface DecisionBeat {
  label: string;
  rejected: string;
  chosen: string;
  note?: string;
}

export const projectCases: CaseStudy[] = [
  {
    slug: "dual-domain-system",
    lede: "They couldn't share a palette.",
    problemBeats: [
      "FORMÆTRIX (a literary studio) and ryanpyles.com (a personal archive) needed to coexist in a single Next.js repository without bleeding into each other visually, semantically, or structurally.",
      "Maintaining two separate repositories for what was essentially one interconnected system would have meant duplicating layout infrastructure, navigation logic, SEO primitives, and the entire design token architecture — then keeping them synchronized indefinitely.",
      "The real constraint was that the two identities are aesthetically opposite: one is a dark, high-contrast studio brand with orange accents; the other is a manuscript-paper archive with terracotta and brass.",
    ],
    technicalBeats: [
      "CSS custom property inheritance respects the DOM tree — [data-domain='ryan'] on the <html> element means every descendant's var(--color-black) resolves to #F5F1EA, even inside a shared component that was written for the formaetrix dark register.",
      "The only place domain logic appears in component code is in components that need domain-exclusive behavior (like BlobNav, which only renders on formaetrix).",
      "The performance profile is clean: no client-side domain detection, no hydration mismatch risk, no extra CSS bundles. Both domains share the same stylesheet and same JS bundle.",
    ],
    pullQuote:
      "Zero conditional rendering in shared components. They simply inherit the correct values.",
    figures: [
      { value: "0", label: "shared components duplicated" },
      { value: "1", label: "stylesheet and one JS bundle, for both domains" },
      { value: "2", label: "independent visual identities from one token system" },
    ],
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
      "Edge-level domain detection with no client JS",
    ],
  },
  {
    slug: "polytype",
    lede:
      "Most multilingual interfaces are not designed in multiple languages. They are designed in English and repaired afterward.",
    problemBeats: [
      "A designer draws a button that reads “Save changes.” Then localization happens. French turns it into “Enregistrer les modifications” — nearly twice as wide. German stacks compound words. Hebrew and Arabic flip the whole layout right-to-left. Japanese does not break lines on spaces. The usual remedy is to ship it and hope CSS survives.",
      "Polytype is an experiment in reversing that assumption. It treats script, locale, direction, line breaking, font coverage, and text expansion as inputs to the design system — not bugs discovered after translation.",
      "The engine sits above the browser's text shaping. It does not reimplement HarfBuzz, Unicode bidi, or rasterization; it makes the product and design decisions below that layer the browser has no opinion about — which font a script should use, how much leading it needs, and whether a label will overflow once it is translated.",
    ],
    technicalBeats: [
      "The core object is a TypographyContext — locale, content type, density, and the sample text — resolved to a TypographyPolicy: font stack, size, line-height, letter-spacing, text-align, hyphenation, line-break mode, and overflow strategy. A component stops hardcoding font-size: 16px; line-height: 1.5 and instead asks the engine for values correct for the script and the content type.",
      "Script analysis inspects actual character usage by Unicode block rather than trusting the locale, so a string mixing Latin, Hebrew, and numerals resolves per run and the coverage audit reports exactly which faces each run will fall back to. Line-height is script-dependent, because equal numbers do not read as equal rhythm across scripts — the kind of value a script-aware design token should carry.",
      "Expansion forecasting measures rendered width with canvas and compares each translation to the component's budget, so overflow is caught before anyone opens the app in that language. Everything in the core is deterministic and inspectable — there is deliberately no model in the decision path. That is the point: it shows where a model does not belong.",
    ],
    pullQuote: "The broken one is the point.",
    figures: [
      { value: "10", label: "scripts classified from Unicode ranges" },
      { value: "0", label: "AI in the core — deterministic, inspectable rules" },
      { value: "6", label: "locales rendered side by side; watch which one breaks" },
    ],
    title: "Polytype",
    year: "2026",
    stack: ["TypeScript", "Intl / Unicode CLDR", "React", "CSS Logical Properties"],
    tagline:
      "A locale-aware typography engine for multilingual interfaces — script, direction, line breaking, font coverage, and text expansion treated as inputs to the design system, not bugs found after translation.",
    problem:
      "Most multilingual interfaces are designed in English and repaired afterward. A button sized for “Save changes” clips “Enregistrer les modifications”; Hebrew and Arabic invert the layout; Japanese ignores English word boundaries; a Latin UI font has zero Hebrew or CJK coverage and silently falls back to whatever the OS supplies. The usual solution is to translate the strings and hope the layout holds. Polytype treats these as predictable system behaviors rather than post-translation surprises — a locale-aware typesetting layer that sits above the browser's shaping and makes the decisions the browser cannot.",
    approach: {
      summary:
        "A deterministic pipeline: content → locale and script analysis → typographic policy → font and fallback resolution → line-break and width behavior → direction and punctuation → responsive adaptation. Each stage is a small, inspectable, pure function; the engine exposes a resolve() that returns a concrete TypographyPolicy for a given context.",
      decisions: [
        "Policy over properties: components describe intent (locale, contentType: 'navigation') and the engine returns the typographic values. The decision lives in one place that can be tested, not scattered across component CSS.",
        "Script analysis, not locale assumption: text is split into runs by Unicode block, so mixed-script strings resolve per run and the coverage audit names exactly which face renders each — turning font fallback into something testable.",
        "Expansion forecasting: translations are measured against a component's width budget with canvas, producing a PASS / WARN / FAIL matrix and a sizing recommendation before a single string reaches a translator.",
        "Deterministic by design: the core has no model in the decision path. AI is reserved for secondary, advisory features (suggesting a shorter label, pairing a companion face) — which is itself a positioning statement about where a model belongs and where it does not.",
      ],
    },
    demo: {
      type: "polytype",
      caption:
        "The live engine. Pick a UI string and a button width and watch each locale resolve, then overflow — the one that breaks is breaking in your own browser. Also: policy resolution per script, mixed-script analysis with a coverage audit, and pseudo-localization.",
    },
    technical:
      "Polytype's core (lib/polytype) is framework-agnostic TypeScript over Intl and Unicode block ranges. detectScripts() breaks a string into maximal same-script runs; resolvePolicy() maps a TypographyContext to a TypographyPolicy with script-dependent leading and content-type-aware hyphenation, overflow, and line-break modes; auditCoverage() checks a sample's scripts against declared font profiles and reports the fallbacks it forces; measureTranslationRisk() forecasts overflow, accepting a real canvas measurer in the browser and falling back to per-script advance-width estimates on the server. None of it touches a network or a model. The React layer and the Studio demo are thin skins over these pure functions, so the thing on screen is the engine, not a mock of it.",
    outcome:
      "A working engine that makes multilingual typography testable: a locale matrix that flags overflow, a coverage audit that names missing glyphs, and pseudo-localization that exposes layout assumptions before translation begins. The core is small enough to read in one sitting and deterministic enough to trust — a portfolio piece that is genuinely built, not described.",
    metrics: [
      "Expansion forecasting flags overflow before translators are involved",
      "Pseudo-localization exposes clipping and hardcoded widths pre-translation",
      "RTL handled with logical properties, not left/right",
    ],
    failure: {
      kind: "overflow",
      label: "Localization overflow",
      caption:
        "A button sized for the English label clips the moment it is translated. The same component, one fixed width, four locales — two of them break.",
      budget: 150,
      cases: [
        { locale: "en-US", text: "Save changes" },
        { locale: "de-DE", text: "Änderungen speichern", over: true },
        { locale: "fr-FR", text: "Enregistrer les modifications", over: true },
        { locale: "ja-JP", text: "変更を保存" },
      ],
    },
    decision: {
      label: "Fixed width, or intrinsic width?",
      rejected: "Pin the button to the English width and hope the translations fit.",
      chosen:
        "Forecast each locale's rendered width against the budget, then let the component take intrinsic width with a safe minimum.",
      note: "The matrix surfaces the break during development, before a translator is involved.",
    },
  },
  {
    slug: "publish-architecture",
    lede: "The manuscript was not the product.",
    problemBeats: [
      "A novel needed to become a paperback and an EPUB. That should have been simple. It wasn't: the manuscript carried multilingual passages, unusual section structures, transcripts, ornamented breaks, metadata dependencies, and typographic rules that did not survive ordinary document conversion.",
      "So it forked. manuscript-final.docx became manuscript-final-KDP.docx became manuscript-FINAL-final.docx. Corrections made during print formatting never reached the EPUB. The proof became a third manuscript. Eventually the book had several technically valid versions and no obvious answer to which one was actually the book.",
      "None of these problems was individually hard. Together they built a system that ran on memory — and memory is exactly what fails across a year of revisions.",
    ],
    technicalBeats: [
      "The prose is stored as semantic nodes — a chapter is a chapter, a scene break is a scene break, a foreign-language span declares its language — with no layout instructions embedded. The renderer decides whether chapter seven reads as CHAPTER SEVEN, as VII, or as nothing at all; the content layer does not care.",
      "Separate renderers interpret the one source: print through a LuaLaTeX pipeline for press-ready PDF, EPUB through accessible semantic HTML, web through an excerpt view. Metadata lives once and flows into every output; fonts are mapped by script (the Polytype layer underneath), so a Hebrew passage never silently drops to a fallback glyph.",
      "Before anything builds, the publication is validated — chapters detected, IDs unique, footnote references resolved, font coverage complete. The pipeline can fail loudly instead of shipping a subtly broken book.",
    ],
    pullQuote:
      "A book should not require its author to remember where all of its copies are lying.",
    figures: [
      { value: "1", label: "canonical source; print, EPUB, and web are outputs" },
      { value: "0", label: "manuscripts to keep in sync — a correction made once reaches every edition" },
      { value: "5", label: "layers kept apart: content, structure, metadata, typography, output" },
    ],
    title: "FORMÆTRIX Publish Architecture",
    year: "2026",
    stack: ["TypeScript", "Canonical Document Model", "LuaLaTeX", "EPUB3"],
    tagline:
      "A publishing system that treats a manuscript as structured source, not a Word file — one canonical source compiled to print, EPUB, and web, so a correction made once reaches every edition.",
    problem:
      "Publishing workflows begin simply — a manuscript in Word — and end in a folder of near-identical files where nobody remembers which one is canonical. A correction made during print formatting never reaches the EPUB; special typography disappears in conversion; a foreign-language passage loses its font; a new trim size means rebuilding the book. None of it is individually difficult, but together it produces a system that depends on memory and quietly lets editions diverge. Publish Architecture removes that by treating the manuscript as structured source material rather than a document to copy and repair.",
    approach: {
      summary:
        "Content has one source; presentation has many outputs. The architecture separates content, structure, metadata, typography, and output instead of embedding all five in one application document. A paragraph is stored as a paragraph; its appearance belongs to the renderer.",
      decisions: [
        "Canonical document model: prose is a tree of semantic nodes (chapter, scene break, epigraph, transcript, footnote, language span), never layout. Each renderer decides presentation, so the text stays identical across editions.",
        "Edition profiles: a base book is inherited by each edition — paperback, large print, web — which overrides only what changes (trim, type scale, measure, how a chapter number is displayed). A new trim size is a config change, not a manuscript reconstruction.",
        "Centralized metadata and script-aware fonts: ISBNs, subjects, and dates live once and flow into EPUB metadata, copyright pages, and web tags; fonts are mapped by script through the shared typography layer so multilingual passages render correctly rather than falling back silently.",
        "Validate before build, version like code: the publication is checked (chapters, unique IDs, resolved footnotes, font coverage) before generation, and because the source is text it lives in Git with history, branching, and tagged editions. A book becomes reproducible.",
      ],
    },
    demo: {
      type: "publish-arch",
      caption:
        "One canonical source, rendered live: the semantic node tree, a print interior whose edition profile changes trim and type, the EPUB semantic mapping, and the build validator with its receipt. Switch editions and the same nodes regenerate. (Print output targets a LuaLaTeX pipeline; the demo renders the model and validation in the browser.)",
    },
    technical:
      "Authoring is Markdown, DOCX, or structured JSON; a TypeScript parser produces a canonical document AST that every renderer consumes. Print passes through an intermediate LaTeX representation into LuaLaTeX for OpenType typography, multilingual fonts, microtypography, and reliable pagination; EPUB maps nodes to accessible HTML5 with epub:type semantics and passes EPUBCheck; the web renderer emits excerpts. Metadata is centralized rather than embedded per output, fonts are resolved by script, and a validation pass runs before generation. The content layer is framework-agnostic — it could be consumed by a different toolchain without change.",
    outcome:
      "A publication pipeline that behaves like software compilation. A typo corrected once disappears everywhere; a new trim size is configuration, not reconstruction; a Hebrew passage keeps its font; a new edition inherits the same source and overrides only what differs. The book becomes reproducible — and the expensive, invisible divergences between editions stop happening.",
    metrics: [
      "Build validation fails loudly before generating a broken book",
      "Edition profiles inherit a base and override only what changes",
      "Text-based source → Git history, branching, tagged editions",
    ],
    failure: {
      kind: "divergence",
      label: "Silent edition divergence",
      caption:
        "A correction made in the print file never reached the EPUB. Two technically valid editions, one line quietly different — and no answer to which one is the book.",
      left: {
        title: "Paperback (corrected)",
        lines: [
          "The first thing missing was the door.",
          "By morning the hinges had returned.",
        ],
      },
      right: {
        title: "EPUB (stale copy)",
        lines: [
          "The first thing missing was the door.",
          "By morning the hinges returned.",
        ],
      },
      changedLine: 1,
    },
    decision: {
      label: "Many manuscripts, or one source?",
      rejected: "Keep a separate file per format and copy corrections between them by hand.",
      chosen: "One canonical semantic source; print, EPUB, and web are rendered outputs.",
      note: "A correction made once reaches every edition — divergence becomes structurally impossible.",
    },
  },
  {
    slug: "locale-aware-product-system",
    lede: "The interface worked perfectly until it spoke another language.",
    problemBeats: [
      "The product looked finished. Spacing was consistent, navigation aligned, forms validated, buttons fit. Then it was translated. French broke several controls; German broke the navigation; Arabic exposed physical left/right positioning throughout the CSS; Japanese made assumptions about word boundaries visible; a name form could not represent users whose names did not fit a first-name/last-name model.",
      "Nothing had gone wrong during localization. The original system had simply made assumptions it could no longer hide — an invisible locale of English, Latin script, left-to-right, Western name order, US address and unit conventions — baked into the architecture.",
      "Repairing each locale separately would have fixed the screenshots and left the architecture. So locale became application state instead: available to typography, layout, forms, formatting, and validation, not just a string table.",
    ],
    technicalBeats: [
      "Every interface renders inside a resolved LocaleContext — language, script, region, direction, numbering system, calendar, currency, measurement system, week start. The same React component receives a different behavioral policy without becoming a different component.",
      "Responsiveness became content-based: a navigation bar collapses when its labels stop fitting, not at 768px because someone once decided that was a tablet. Direction is handled with logical properties (inline-start / inline-end), so components mirror from the document direction outward — with an explicit policy for what mirrors (arrows, chevrons) and what must not (play controls, logos, clocks).",
      "Forms resolve an address schema and name model per country rather than assuming First name / Last name / State / ZIP, and numbers, dates, currency, and units format through Intl. Typography runs on Polytype underneath. A route-based form of this exact architecture is in production on this site — ten locales, hreflang with x-default, RTL Hebrew, and a deliberately non-BCP-47 experimental locale held out of the search signals.",
    ],
    pullQuote:
      "Internationalization problems often arrive disguised as copy problems. Most are architecture problems.",
    figures: [
      { value: "9", label: "facets a locale resolves — from direction to week start" },
      { value: "0", label: "physical left/right in layout — logical properties mirror from direction" },
      { value: "1", label: "locale context the whole product reads from" },
    ],
    title: "Locale-Aware Product System",
    year: "2026",
    stack: ["TypeScript", "React", "ECMA Intl / CLDR", "CSS Logical Properties"],
    tagline:
      "An interface architecture that treats locale as product behavior, not translated copy — direction, typography, forms, formatting, and layout all resolve from one locale context.",
    problem:
      "Most products are built around an invisible locale — English, Latin, left-to-right, Gregorian, Western name order, US address and unit assumptions — and those assumptions stay hidden until the product enters another market, where they surface everywhere at once. A form asks everyone for State and ZIP; a date reads MM/DD/YYYY; navigation assumes labels keep English's width; search assumes spaces separate words; layout assumes left means start. The product has been translated, but it has not become local. Translation changes words; localization can change the product.",
    approach: {
      summary:
        "Locale is application state. Instead of using it only for string lookup, the system resolves a structured LocaleContext that typography, layout, forms, formatting, and validation all read from. Components describe intent and respond to the resolved policy, so one component behaves correctly across markets rather than forking per locale.",
      decisions: [
        "Locale context, not a string table: resolveLocale(tag) returns language, script, region, direction, numbering, calendar, currency, measurement system, and week start — the structured policy the whole product reads.",
        "Behavioral tokens beside visual ones: a navigation collapse threshold, whether the family name comes first, the default date style — product behavior gets an explicit per-locale configuration layer rather than hard-coded assumptions.",
        "Direction as architecture: logical properties (margin-inline-start, inset-inline-end) mean RTL mirrors from the document direction; a lint flags physical left/right, and a mirroring policy says which elements flip and which never should.",
        "Separate language from market: a French user in Switzerland, an English user in Japan, a Spanish user in the US — language preference does not silently decide currency, units, or address format. Forms and names are stored structurally and displayed per locale.",
      ],
    },
    demo: {
      type: "locale-system",
      caption:
        "The engine, live: resolve a locale to its full context and watch the same values reformat; see a form reorder its fields and name model by country; a component × locale matrix measure overflow (via Polytype); and a toolbar mirror between LTR and RTL from logical properties alone.",
    },
    technical:
      "createLocaleSystem resolves a BCP-47 tag to a LocaleContext using Intl.Locale.maximize() plus small region tables for currency, measurement, and week start, with a CLDR-style fallback chain (fr-CA → fr → default). Dates, numbers, currency, and units format through Intl; collation uses Intl.Collator; address schemas and the name model are country-driven; the typography layer is Polytype. The whole thing is deterministic and inspectable — AI is reserved for advisory localization review (a shorter label for a constrained component, an explanation of a QA failure), never the authoritative locale behavior. A route-based instance of the architecture already runs this site across ten locales.",
    outcome:
      "Localization becomes testable. A locale matrix renders every component across languages so overflow appears during development, not after a market launch; pseudo-localization exposes clipping before translators are involved; font-coverage checks catch missing glyphs; RTL is a property of the component system, not a patch. The result is not a product that can be translated — it is a product built expecting that English was never going to be the only language in the room.",
    metrics: [
      "Locale matrix flags overflow during development, not after launch",
      "Forms adapt field order and name model by country",
      "RTL via logical properties + an explicit mirroring policy, not a patch stylesheet",
    ],
    failure: {
      kind: "overflow",
      label: "A navigation that only fit English",
      caption:
        "The nav was laid out at English width and collapsed at 768px because that was 'tablet'. German never fit; the real break point was the content, not the device.",
      budget: 128,
      cases: [
        { locale: "en-US", text: "Account settings" },
        { locale: "fr-FR", text: "Paramètres du compte", over: true },
        { locale: "de-DE", text: "Kontoeinstellungen", over: true },
        { locale: "ja-JP", text: "アカウント設定" },
      ],
    },
    decision: {
      label: "Viewport breakpoint, or content breakpoint?",
      rejected: "Collapse the navigation at 768px because someone decided that was a tablet.",
      chosen: "Collapse when the rendered labels stop fitting — the break point is the real failure point.",
      note: "Responsiveness follows content and locale, not a device assumption.",
    },
  },
  {
    slug: "blob-navigation",
    lede:
      "The requirement was a navigation that felt like a living thing — something with mass and reactivity — while still being a functional, accessible wayfinding system.",
    problemBeats: [
      "The FORMÆTRIX studio needed a navigation system that embodied the brand's core tension between structure and instability.",
      "A standard nav bar contradicts a publishing imprint that explicitly resists convention.",
    ],
    technicalBeats: [
      "The noise function adds a time-varying sin/cos displacement to each vertex position vector, scaled by a cursor influence factor.",
      "The key insight is that the original vertex positions are stored in a Float32Array at initialization — each frame, positions are computed from originals + noise(t, cursor) rather than accumulated, which prevents the geometry from drifting or compounding errors over time.",
      "The domain-specific color values are passed as props rather than hardcoded, making the component reusable across both domains with different material configurations.",
    ],
    pullQuote:
      "Positions are computed from originals plus noise, never accumulated — so the geometry cannot drift.",
    figures: [
      { value: "60", unit: "fps", label: "sustained on mid-range hardware" },
      { value: "3D", label: "hit detection by angular proximity, not screen-space hotspots" },
    ],
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
      "Vertex-level deformation (not just scale/translate)",
      "Accessible fallback for mobile and reduced-motion",
    ],
  },
  {
    slug: "book-seo-system",
    lede:
      "The challenge is authoring that metadata once per title — in the content layer — and having it flow automatically into every surface that needs it, without manual Open Graph tags or hand-written JSON-LD.",
    problemBeats: [
      "A literary publisher's catalog is only as discoverable as its metadata.",
      "Book pages need to be indexable not just as generic web pages but as structured Book entities that search engines can parse, social platforms can preview, and reading apps can import.",
    ],
    technicalBeats: [
      "The JSON-LD schema nests three schema.org types: Book (the primary entity), Person (for the author, with a sameAs URL linking to the author page), and Organization (for the publisher/imprint).",
      "This nesting is what allows search engines to associate a book with a named author entity rather than treating the author as just a string.",
      "The buildBookJsonLd() function is a pure TypeScript function — no hooks, no React — which makes it fully testable and reusable across SSG contexts.",
    ],
    pullQuote:
      "The content model is the SEO model.",
    figures: [
      { value: "100", unit: "%", label: "of book pages carry Book schema, Open Graph, and Twitter Card" },
      { value: "0", label: "per-page manual metadata authoring" },
      { value: "3", label: "nested schema types — Book, Person, Organization" },
    ],
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
      "Static HTML output — no runtime metadata fetching",
    ],
  },
  {
    slug: "editorial-design-system",
    lede:
      "Building without a UI framework forces every decision to be intentional rather than inherited.",
    problemBeats: [
      "Literary publishing requires a design system that serves reading first and brand second. Most CSS frameworks optimize for UI components — buttons, modals, navigation.",
      "A system for long-form editorial content needs to prioritize vertical rhythm, type hierarchy, and the relationship between the reading column and the surrounding page.",
    ],
    technicalBeats: [
      "The single most important structural decision was separating the manuscript palette tokens (--paper, --ink, --brass) from the semantic tokens (--color-black, --color-white).",
      "The manuscript tokens are raw values defined once at :root. The semantic tokens are domain-scoped references to the raw values.",
      "This two-layer system means you can write var(--paper) directly in ryan-exclusive components (like the NotebookPanel) where you always want parchment — while shared components write var(--color-black) and get the right value for whatever domain they're rendering in.",
    ],
    pullQuote:
      "Components never need to know which register they're in.",
    figures: [
      { value: "0", label: "UI framework dependencies" },
      { value: "2", label: "domain registers from one token system" },
      { value: "7", label: "step type scale, set in rem" },
      { value: "12", label: "step spacing system on a 4px base unit" },
    ],
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
  },
  {
    slug: "content-architecture",
    lede:
      "Without a typed content layer, these four consumers develop independent data assumptions that diverge over time and break silently.",
    problemBeats: [
      "A literary site's content isn't just text to display — it's structured data with relationships (books to authors, projects to tags, field notes to categories) that needs to feed UI components, SEO pipelines, static generation parameters, and structured data schemas simultaneously.",
    ],
    technicalBeats: [
      "The key architectural discipline is that no component ever constructs content — components only render what they receive via props.",
      "The content layer (typed data + utility functions) is entirely framework-agnostic TypeScript. It could be consumed by a different framework without changes.",
      "This separation also means the content layer is the right place to add validation, relationships, or computed fields — not inside components or page files, where that logic would be invisible to other consumers.",
    ],
    pullQuote:
      "No component ever constructs content. Components only render what they receive.",
    figures: [
      { value: "7", label: "typed content domains" },
      { value: "0", label: "untyped content — TypeScript enforces schema compliance" },
    ],
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
      "generateStaticParams driven entirely by content arrays",
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

/** Previous and next case studies in catalogue order, for footer navigation. */
export function getAdjacentCases(slug: string): {
  prev?: CaseStudy;
  next?: CaseStudy;
} {
  const i = projectCases.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? projectCases[i - 1] : undefined,
    next: i < projectCases.length - 1 ? projectCases[i + 1] : undefined,
  };
}

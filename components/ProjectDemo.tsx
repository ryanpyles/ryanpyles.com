"use client";

import React, { Suspense, useState } from "react";
import { Ae } from "./Ae";
import dynamic from "next/dynamic";
import type { DemoType } from "@/content/projectCases";
import styles from "./ProjectDemo.module.css";

/* ---------- Domain Toggle ---------- */
function DomainToggleDemo() {
  const [active, setActive] = useState<"ryan" | "formaetrix">("ryan");

  return (
    <div className={styles.domainDemo}>
      <div className={styles.domainToggleBar}>
        <button
          className={[styles.domainBtn, active === "ryan" ? styles.domainBtnActive : ""].join(" ")}
          onClick={() => setActive("ryan")}
        >
          ryanpyles.com
        </button>
        <button
          className={[styles.domainBtn, active === "formaetrix" ? styles.domainBtnActive : ""].join(" ")}
          onClick={() => setActive("formaetrix")}
        >
          formaetrix.com
        </button>
      </div>

      <div
        className={[styles.domainPreview, active === "ryan" ? styles.domainPreviewRyan : styles.domainPreviewFormaetrix].join(" ")}
        data-domain={active === "formaetrix" ? "formaetrix" : undefined}
      >
        <div className={styles.domainNav}>
          <span className={styles.domainLogo}>{active === "ryan" ? "Ryan J. Pyles" : <>FORM<Ae />TRIX</>}</span>
          <div className={styles.domainNavLinks}>
            {active === "ryan" ? (
              <>
                <span>Books</span><span>Projects</span><span>About</span>
              </>
            ) : (
              <>
                <span>Works</span><span>Imprint</span><span>System</span>
              </>
            )}
          </div>
        </div>
        <div className={styles.domainBody}>
          <p className={styles.domainEyebrow}>{active === "ryan" ? "Author · Engineer · Linguist" : "A System for Language-Bound Realities"}</p>
          <h2 className={styles.domainHeading}>{active === "ryan" ? "Ryan Pyles" : <>FORM<Ae />TRIX</>}</h2>
          <p className={styles.domainSub}>{active === "ryan" ? "I write experimental fiction, build web systems, study languages." : "An imprint for fiction that resists easy categorization."}</p>
          <div className={styles.domainPalette}>
            {active === "ryan" ? (
              <>
                <span className={styles.swatchPaper} title="--paper #F5F1EA" />
                <span className={styles.swatchInk} title="--ink #1A1A1A" />
                <span className={styles.swatchOxide} title="--oxide #A14B2B" />
                <span className={styles.swatchBrass} title="--brass #C69C5D" />
                <span className={styles.swatchDust} title="--dust #B7B0A5" />
              </>
            ) : (
              <>
                <span className={styles.swatchBlack} title="--color-black #0A0A0A" />
                <span className={styles.swatchWhite} title="--color-white #F5F5F5" />
                <span className={styles.swatchOrange} title="--color-accent #F26A21" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Language Demo ---------- */
const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" as const, sample: "The gap between intention and syntax is where all the interesting work happens.", font: "serif" },
  { code: "ar", label: "العربية", dir: "rtl" as const, sample: "الفجوة بين النية والتركيب هي المكان الذي يحدث فيه كل العمل المثير للاهتمام.", font: "sans" },
  { code: "ja", label: "日本語", dir: "ltr" as const, sample: "意図と構文の間の隔たりこそが、すべての興味深い作業が行われる場所です。", font: "cjk" },
  { code: "he", label: "עברית", dir: "rtl" as const, sample: "הפער בין הכוונה לתחביר הוא המקום שבו מתרחשת כל העבודה המעניינת.", font: "sans" },
  { code: "ru", label: "Русский", dir: "ltr" as const, sample: "Разрыв между намерением и синтаксисом — место, где происходит вся интересная работа.", font: "serif" },
  { code: "fr", label: "Français", dir: "ltr" as const, sample: "L'écart entre l'intention et la syntaxe est là où se passe tout le travail intéressant.", font: "serif" },
];

function LanguageDemo() {
  const [selected, setSelected] = useState("en");
  const lang = LANGUAGES.find((l) => l.code === selected) ?? LANGUAGES[0];

  return (
    <div className={styles.langDemo}>
      <div className={styles.langSelector}>
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            className={[styles.langBtn, selected === l.code ? styles.langBtnActive : ""].join(" ")}
            onClick={() => setSelected(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div
        className={[styles.langSample, styles[`langFont_${lang.font}`]].join(" ")}
        dir={lang.dir}
        lang={lang.code}
      >
        <p className={styles.langText}>{lang.sample}</p>
        <div className={styles.langMeta}>
          <span>{lang.dir === "rtl" ? "RTL" : "LTR"}</span>
          <span>{lang.font === "cjk" ? "CJK font stack" : lang.font === "sans" ? "System sans" : "Serif"}</span>
          <span>{lang.label}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Continuity Atlas Demo ---------- */
const ContinuityAtlas = dynamic(() => import("@/components/ContinuityAtlas"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 720, display: "grid", placeItems: "center", background: "#14120F", borderRadius: 3, border: "1px solid rgba(245,240,232,.10)" }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#9A948C" }}>
        Loading prototype…
      </span>
    </div>
  ),
});

function ContinuityAtlasDemo() {
  return (
    <div style={{
      height: 720,
      overflowY: "auto",
      border: "1px solid rgba(245,240,232,.12)",
      borderRadius: 3,
      position: "relative",
      background: "#14120F",
    }}>
      <ContinuityAtlas />
    </div>
  );
}

/* ---------- Blob Nav Demo ---------- */
const BlobNav = dynamic(() => import("@/components/BlobNav"), { ssr: false });

function BlobNavDemo() {
  return (
    <div className={styles.blobDemo}>
      <Suspense fallback={<div className={styles.blobFallback}>Loading…</div>}>
        <BlobNav domain="formaetrix" />
      </Suspense>
      <p className={styles.blobHint}>Move your cursor over the form</p>
    </div>
  );
}

/* ---------- SEO Architecture Demo ---------- */
const SEO_BOOK = {
  title: "Declensions of Dark Water",
  author: "Elian Voigt",
  publisher: "FORMÆTRIX",
  year: "2024",
  slug: "declensions-of-dark-water",
  description: "A novel of accumulated silences. Seven characters share one apartment building over forty years — the building speaks; the people mostly don't.",
};

function SeoDemo() {
  const [activeLayer, setActiveLayer] = useState<"og" | "twitter" | "jsonld" | "result">("og");

  const layers = [
    { id: "og" as const, label: "Open Graph" },
    { id: "twitter" as const, label: "Twitter Card" },
    { id: "jsonld" as const, label: "JSON-LD" },
    { id: "result" as const, label: "Search Preview" },
  ];

  return (
    <div className={styles.seoDemo}>
      <div className={styles.seoTabs}>
        {layers.map((l) => (
          <button
            key={l.id}
            className={[styles.seoTab, activeLayer === l.id ? styles.seoTabActive : ""].join(" ")}
            onClick={() => setActiveLayer(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className={styles.seoPanel}>
        {activeLayer === "og" && (
          <pre className={styles.seoCode}>{`<meta property="og:type" content="book" />
<meta property="og:title"
  content="${SEO_BOOK.title}" />
<meta property="og:description"
  content="${SEO_BOOK.description.slice(0, 80)}…" />
<meta property="og:url"
  content="https://formaetrix.com/works/${SEO_BOOK.slug}" />
<meta property="og:image"
  content="https://formaetrix.com/og/${SEO_BOOK.slug}.png" />
<meta property="book:author"
  content="${SEO_BOOK.author}" />`}</pre>
        )}
        {activeLayer === "twitter" && (
          <pre className={styles.seoCode}>{`<meta name="twitter:card"
  content="summary_large_image" />
<meta name="twitter:title"
  content="${SEO_BOOK.title}" />
<meta name="twitter:description"
  content="${SEO_BOOK.description.slice(0, 80)}…" />
<meta name="twitter:image"
  content="https://formaetrix.com/og/${SEO_BOOK.slug}.png" />`}</pre>
        )}
        {activeLayer === "jsonld" && (
          <pre className={styles.seoCode}>{`{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "${SEO_BOOK.title}",
  "author": {
    "@type": "Person",
    "name": "${SEO_BOOK.author}",
    "sameAs": "https://formaetrix.com/imprint"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${SEO_BOOK.publisher}"
  },
  "datePublished": "${SEO_BOOK.year}",
  "description": "${SEO_BOOK.description.slice(0, 60)}…"
}`}</pre>
        )}
        {activeLayer === "result" && (
          <div className={styles.seoResult}>
            <p className={styles.seoResultUrl}>formaetrix.com › works › {SEO_BOOK.slug}</p>
            <p className={styles.seoResultTitle}>{SEO_BOOK.title} — {SEO_BOOK.publisher}</p>
            <p className={styles.seoResultDesc}>{SEO_BOOK.description.slice(0, 120)}…</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Design Tokens Demo ---------- */
const TOKEN_COLORS = [
  { name: "--paper", value: "#F5F1EA", domain: "ryan", label: "Paper" },
  { name: "--ink", value: "#1A1A1A", domain: "ryan", label: "Ink" },
  { name: "--oxide", value: "#A14B2B", domain: "ryan", label: "Oxide" },
  { name: "--brass", value: "#C69C5D", domain: "ryan", label: "Brass" },
  { name: "--dust", value: "#B7B0A5", domain: "ryan", label: "Dust" },
  { name: "--color-black", value: "#0A0A0A", domain: "formaetrix", label: "Black" },
  { name: "--color-white", value: "#F5F5F5", domain: "formaetrix", label: "White" },
  { name: "--color-accent", value: "#F26A21", domain: "formaetrix", label: "Accent" },
];

const TYPE_SCALE = [
  { name: "--text-5xl", value: "5rem", label: "Display" },
  { name: "--text-4xl", value: "3.75rem", label: "Hero" },
  { name: "--text-3xl", value: "2.75rem", label: "H1" },
  { name: "--text-2xl", value: "2rem", label: "H2" },
  { name: "--text-xl", value: "1.5rem", label: "H3" },
  { name: "--text-lg", value: "1.25rem", label: "Large" },
  { name: "--text-md", value: "1.125rem", label: "Body" },
  { name: "--text-sm", value: "0.875rem", label: "Small" },
  { name: "--text-xs", value: "0.75rem", label: "Mono / Label" },
];

function TokensDemo() {
  const [activeTab, setActiveTab] = useState<"color" | "type">("color");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1200);
    });
  };

  return (
    <div className={styles.tokensDemo}>
      <div className={styles.tokensTabs}>
        <button className={[styles.tokensTab, activeTab === "color" ? styles.tokensTabActive : ""].join(" ")} onClick={() => setActiveTab("color")}>Color</button>
        <button className={[styles.tokensTab, activeTab === "type" ? styles.tokensTabActive : ""].join(" ")} onClick={() => setActiveTab("type")}>Type Scale</button>
      </div>

      {activeTab === "color" && (
        <div className={styles.tokenColorGrid}>
          <p className={styles.tokenDomainLabel}>ryanpyles.com</p>
          <div className={styles.tokenRow}>
            {TOKEN_COLORS.filter((t) => t.domain === "ryan").map((token) => (
              <button key={token.name} className={styles.tokenSwatch} onClick={() => copy(token.name)} title={`Click to copy ${token.name}`}>
                <span className={styles.tokenSwatchColor} style={{ backgroundColor: token.value }} />
                <span className={styles.tokenSwatchName}>{token.label}</span>
                <span className={styles.tokenSwatchValue}>{copied === token.name ? "Copied!" : token.value}</span>
              </button>
            ))}
          </div>
          <p className={styles.tokenDomainLabel}>formaetrix.com</p>
          <div className={styles.tokenRow}>
            {TOKEN_COLORS.filter((t) => t.domain === "formaetrix").map((token) => (
              <button key={token.name} className={styles.tokenSwatch} onClick={() => copy(token.name)} title={`Click to copy ${token.name}`}>
                <span className={styles.tokenSwatchColor} style={{ backgroundColor: token.value }} />
                <span className={styles.tokenSwatchName}>{token.label}</span>
                <span className={styles.tokenSwatchValue}>{copied === token.name ? "Copied!" : token.value}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "type" && (
        <div className={styles.typeScale}>
          {TYPE_SCALE.map((step) => (
            <div key={step.name} className={styles.typeScaleRow}>
              <span className={styles.typeScaleMeta}>{step.name} / {step.value}</span>
              <span className={styles.typeScaleSample} style={{ fontSize: `min(${step.value}, 2.5rem)` }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Content Schema Demo ---------- */
function SchemaDemo() {
  const [active, setActive] = useState<"book" | "fieldnote" | "project">("book");

  const schemas: Record<typeof active, string> = {
    book: `// content/books/types.ts
interface Book {
  slug: string;
  title: string;
  author: string;
  description: string;
  publishDate: string;
  tags: string[];
  domain: "ryan" | "formaetrix";
  // Feeds → /books/[slug] page
  // Feeds → JSON-LD Book schema
  // Feeds → Open Graph metadata
  // Feeds → BookCard component
}`,
    fieldnote: `// content/fieldNotes/types.ts
type FieldNoteCategory =
  | "Language" | "Writing"
  | "Software" | "Design"
  | "Research" | "Travel";

interface FieldNote {
  title: string;
  slug: string;
  date: string;              // ISO 8601
  category: FieldNoteCategory;
  excerpt: string;
  body?: string;             // expanded content
  relatedWork?: string[];    // cross-references
  status: "draft" | "published" | "fragment";
  // Feeds → FieldNoteCard component
  // Feeds → /field-notes index page
}`,
    project: `// content/projectCases.ts
type DemoType =
  | "domain-toggle" | "language"
  | "blob-nav"      | "seo"
  | "tokens"        | "schema";

interface CaseStudy {
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
  demo: { type: DemoType; caption: string };
  technical: string;
  outcome: string;
  metrics?: string[];
  // Feeds → /projects/[slug] page
  // Feeds → generateStaticParams
}`,
  };

  return (
    <div className={styles.schemaDemo}>
      <div className={styles.schemaTabs}>
        <button className={[styles.schemaTab, active === "book" ? styles.schemaTabActive : ""].join(" ")} onClick={() => setActive("book")}>Book</button>
        <button className={[styles.schemaTab, active === "fieldnote" ? styles.schemaTabActive : ""].join(" ")} onClick={() => setActive("fieldnote")}>FieldNote</button>
        <button className={[styles.schemaTab, active === "project" ? styles.schemaTabActive : ""].join(" ")} onClick={() => setActive("project")}>CaseStudy</button>
      </div>
      <pre className={styles.schemaCode}>{schemas[active]}</pre>
    </div>
  );
}

/* ---------- Dispatcher ---------- */
export default function ProjectDemo({ type, caption }: { type: DemoType; caption: string }) {
  return (
    <div className={styles.root}>
      {type === "domain-toggle" && <DomainToggleDemo />}
      {type === "language" && <LanguageDemo />}
      {type === "blob-nav" && <BlobNavDemo />}
      {type === "seo" && <SeoDemo />}
      {type === "tokens" && <TokensDemo />}
      {type === "schema" && <SchemaDemo />}
      {type === "continuity-atlas" && <ContinuityAtlasDemo />}
      <p className={styles.caption}>{caption}</p>
    </div>
  );
}

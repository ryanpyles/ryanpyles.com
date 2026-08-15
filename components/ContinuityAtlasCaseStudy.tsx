import React from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ArticleBody from "@/components/ArticleBody";
import type { CaseStudy } from "@/content/projectCases";
import { getProof } from "@/content/projectProof";
import type { Block } from "@/content/writing/types";
import styles from "./ContinuityAtlasCaseStudy.module.css";

const designedFor = [
  "Novelists writing large-cast fiction",
  "Literary horror authors",
  "Multi-book series authors",
  "Developmental editors",
  "Publishing teams maintaining franchise consistency",
  "Worldbuilders creating internally coherent universes",
];

const projectSpecs = [
  "75–300+ named characters",
  "Multiple timelines",
  "Invented languages",
  "Religious systems",
  "Genealogies",
  "Geographic histories",
  "Repeated symbolic motifs",
  "Cross-volume continuity",
];

const modeled = [
  "Character profiles",
  "Family trees",
  "Timeline events",
  "Object histories",
  "Location references",
  "Linguistic evolution",
  "Religious traditions",
  "Symbol recurrence",
  "POV tracking",
  "Chapter appearances",
  "Dialogue attribution",
  "Plot dependency chains",
];

const techStack: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Azure Functions", "Node.js", "GraphQL APIs"] },
  { group: "Storage", items: ["Azure SQL", "Azure Blob Storage"] },
  { group: "AI", items: ["OpenAI APIs", "Vector embeddings", "Semantic retrieval", "RAG architecture"] },
  { group: "Supporting", items: ["Azure Cognitive Search", "GitHub Actions", "CI/CD pipelines"] },
];

const features: { name: string; blurb: string; items: string[] }[] = [
  {
    name: "Character Intelligence",
    blurb: "Every character becomes a living record rather than a paragraph of notes.",
    items: [
      "First appearance",
      "Relationships",
      "Aliases",
      "Physical descriptions",
      "Dialogue patterns",
      "Injuries & deaths",
      "Knowledge boundaries",
      "Unresolved arcs",
    ],
  },
  {
    name: "Timeline Engine",
    blurb: "Builds an internally consistent chronology and flags what can't be true.",
    items: [
      "Impossible travel",
      "Overlapping events",
      "Age inconsistencies",
      "Seasonal conflicts",
      "Duplicated scenes",
    ],
  },
  {
    name: "Continuity Validation",
    blurb: "Automatically detects contradictions across the manuscript.",
    items: [
      "Changed descriptions",
      "Conflicting dates",
      "Impossible knowledge",
      "Repeated introductions",
      "Forgotten subplots",
      "Inconsistent terminology",
    ],
  },
  {
    name: "World Bible",
    blurb: "A continuously updated reference that rebuilds itself with every revision.",
    items: [
      "Locations",
      "Organizations",
      "Religions",
      "Fictional languages",
      "Artifacts",
      "Historical events",
      "Laws & customs",
    ],
  },
];

const searchExamples = [
  "every conversation involving Rowan before Chapter 8",
  "references to Brynjavík churches",
  "all mentions of Vikamál grammar",
  "scenes involving mourning rituals",
];

const useCases: { kind: string; note: string }[] = [
  { kind: "Literary Horror", note: "Maintain recurring symbolic systems across an entire novel." },
  { kind: "Epic Fantasy", note: "Track hundreds of named characters over multiple generations." },
  { kind: "Historical Fiction", note: "Validate chronology against real historical timelines." },
  { kind: "Mystery", note: "Track clue placement, reveals, suspects, and information exposure." },
  { kind: "Multi-Series Publishing", note: "Maintain continuity across novels sharing one universe." },
];

export default function ContinuityAtlasCaseStudy({
  cs,
  demo,
}: {
  cs: CaseStudy;
  demo: React.ReactNode;
}) {
  const proof = getProof("continuity-atlas");
  const proofBlocks: Block[] = [];
  if (proof?.diagram)
    proofBlocks.push({
      type: "figure",
      svg: proof.diagram.svg,
      caption: proof.diagram.caption,
      label: proof.diagram.label,
    });
  if (proof?.implementation)
    proofBlocks.push({
      type: "code",
      language: proof.implementation.language,
      code: proof.implementation.code,
      caption: proof.implementation.caption,
    });
  if (proof?.constraint)
    proofBlocks.push({
      type: "callout",
      variant: "failure",
      title: proof.constraint.title,
      text: proof.constraint.body,
    });

  return (
    <article className={styles.root}>
      <div className={styles.back}>
        <Link href="/projects" className={styles.backLink}>
          ← All Projects
        </Link>
      </div>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <Reveal>
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.year}>{cs.year}</span>
            <ul className={styles.stack} role="list">
              {cs.stack.map((tag) => (
                <li key={tag} className={styles.stackTag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <p className={styles.kicker}>Narrative Intelligence System</p>
          <h1 className={styles.title}>Continuity Atlas</h1>
          <p className={styles.subtitle}>Narrative Intelligence for Complex Fiction</p>
        </header>
      </Reveal>

      {/* ── The one-line thesis ─────────────────────────────────────────── */}
      <Reveal delay={60}>
        <p className={styles.lede}>
          Most writing software stores documents. Continuity Atlas stores
          relationships — it turns a manuscript into a searchable narrative
          knowledge graph.
        </p>
      </Reveal>

      {/* ── Jump straight to the working prototype ──────────────────────── */}
      <Reveal delay={100}>
        <div className={styles.protoActions}>
          <a href="#prototype" className={styles.protoCta}>
            Launch the interactive prototype ↓
          </a>
          <Link href="/writing/ai-story-memory-engine" className={styles.protoSecondary}>
            Read the architecture write-up →
          </Link>
        </div>
      </Reveal>

      <div className={styles.body}>
        {/* ── Problem ───────────────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>The problem</p>
            <div className={styles.prose}>
              <p>Long-form fiction breaks in surprisingly mundane ways.</p>
              <p>
                Characters change eye color between chapters. Secondary
                characters disappear for fifty pages before returning without
                explanation. Timelines drift. Languages evolve inconsistently.
                Religious systems accumulate contradictions. Entire plotlines
                become victims of revision.
              </p>
              <p>
                Traditional notes quickly become unsearchable, while generic AI
                tools lack awareness of the living internal logic of a
                manuscript. For projects spanning hundreds of pages — or
                multiple books — the cost of continuity errors grows
                exponentially.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ── Users ─────────────────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Who it&rsquo;s for</p>
            <div className={styles.usersGrid}>
              <div>
                <h3 className={styles.subhead}>Designed for</h3>
                <ul className={styles.list}>
                  {designedFor.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.subhead}>A typical project</h3>
                <ul className={styles.chips}>
                  {projectSpecs.map((s) => (
                    <li key={s} className={styles.chip}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Solution ──────────────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>The solution</p>
            <p className={styles.prose}>
              Instead of static notes, the platform models the relationships
              between every major narrative element. Every revision updates the
              narrative model rather than creating disconnected notes.
            </p>
            <ul className={styles.modeledGrid}>
              {modeled.map((m) => (
                <li key={m} className={styles.modeledItem}>
                  {m}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* ── Architecture & evidence ───────────────────────────────────── */}
        {proof && (
          <Reveal>
            <section className={styles.section} id="architecture">
              <p className={styles.sectionLabel}>Architecture &amp; evidence</p>
              <ArticleBody blocks={proofBlocks} />
              {proof.built && proof.built.length > 0 && (
                <div>
                  <h3 className={styles.subhead}>What I built</h3>
                  <ul className={styles.list}>
                    {proof.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </Reveal>
        )}

        {/* ── Interactive prototype ─────────────────────────────────────── */}
        <Reveal>
          <section className={styles.demoSection} id="prototype">
            <p className={styles.sectionLabel}>Interactive prototype</p>
            <p className={styles.demoNote}>
              A working prototype built on real manuscript data from{" "}
              <em>Liminal 6:17</em> — inspect Story Memory, Character Drift, the
              Voice Fingerprint, and the Rewrite flow.
            </p>
            {demo}
          </section>
        </Reveal>

        {/* ── Core features ─────────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Core features</p>
            <div className={styles.featureGrid}>
              {features.map((f) => (
                <div key={f.name} className={styles.feature}>
                  <h3 className={styles.featureName}>{f.name}</h3>
                  <p className={styles.featureBlurb}>{f.blurb}</p>
                  <ul className={styles.featureList}>
                    {f.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Semantic search — spans, with example queries */}
              <div className={`${styles.feature} ${styles.featureWide}`}>
                <h3 className={styles.featureName}>Semantic Search</h3>
                <p className={styles.featureBlurb}>
                  Instead of searching for words, authors search for concepts.
                </p>
                <ul className={styles.queries}>
                  {searchExamples.map((q) => (
                    <li key={q} className={styles.query}>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Technology ────────────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Technology</p>
            <div className={styles.techGrid}>
              {techStack.map((t) => (
                <div key={t.group} className={styles.techCol}>
                  <h3 className={styles.techGroup}>{t.group}</h3>
                  <ul className={styles.techList}>
                    {t.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Outcome ───────────────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Outcome</p>
            <div className={styles.prose}>
              <p>
                Instead of searching prose for what a character knows, an author
                queries it: every fact carries who knows it and when it became
                true. Editors review a continuously updated continuity model
                rather than static notes, and author-only facts stay out of AI
                generation by default.
              </p>
              <p>
                This is a working prototype on real manuscript data, not a
                shipped product with usage metrics — so the claim it makes is
                specific and structural: continuity becomes a validation pass
                over typed facts, not a manual re-read.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ── Use cases ─────────────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Example use cases</p>
            <ul className={styles.useCases}>
              {useCases.map((u) => (
                <li key={u.kind} className={styles.useCase}>
                  <span className={styles.useCaseKind}>{u.kind}</span>
                  <span className={styles.useCaseNote}>{u.note}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* ── Why it's different ────────────────────────────────────────── */}
        <Reveal>
          <section className={styles.whySection}>
            <p className={styles.sectionLabel}>Why it&rsquo;s different</p>
            <p className={styles.whyStatement}>
              Rather than treating a manuscript as pages of text, it models the
              narrative itself — characters, events, places, motifs, languages,
              and dependencies — as interconnected data that can be queried,
              validated, and explored.
            </p>
            <p className={styles.whyCoda}>
              Less time searching through notes. Fewer continuity errors. A more
              reliable foundation for developing complex fictional worlds.
            </p>
          </section>
        </Reveal>
      </div>

      <footer className={styles.footer}>
        <Link href="/projects" className={styles.footerLink}>
          ← All Projects
        </Link>
        <Link href="/contact" className={styles.footerCta}>
          Discuss your project →
        </Link>
      </footer>
    </article>
  );
}

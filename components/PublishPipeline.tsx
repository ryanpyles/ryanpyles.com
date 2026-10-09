"use client";

/**
 * Publish Architecture — the pipeline, as an inspectable flow.
 *
 * Semantic Source → Validation → Edition Profile → Rendering Engine →
 * Outputs. Select a stage to see what actually happens there — and the
 * stage data is real: the validation checks are the ones validateBook()
 * runs on the canonical sample, and the edition profiles are the real
 * EDITIONS. This is the overview; the detailed demo below renders the same
 * source three ways.
 */

import React, { useMemo, useState } from "react";
import { EDITIONS } from "@/lib/publish/model";
import { SAMPLE_BOOK } from "@/lib/publish/sample";
import { validateBook } from "@/lib/publish/validate";
import styles from "./PublishPipeline.module.css";

type StageId = "source" | "validate" | "edition" | "render" | "outputs";

const STAGES: { id: StageId; label: string; n: string }[] = [
  { id: "source", label: "Semantic source", n: "01" },
  { id: "validate", label: "Validation", n: "02" },
  { id: "edition", label: "Edition profile", n: "03" },
  { id: "render", label: "Rendering engine", n: "04" },
  { id: "outputs", label: "Outputs", n: "05" },
];

export default function PublishPipeline() {
  const [stage, setStage] = useState<StageId>("validate");

  const report = useMemo(() => validateBook(SAMPLE_BOOK), []);

  return (
    <section className={styles.wrap} aria-labelledby="publish-pipeline-title">
      <header className={styles.head}>
        <p className={styles.kicker}>FORMÆTRIX Publish · the pipeline</p>
        <h2 id="publish-pipeline-title" className={styles.title}>
          One source, compiled like software.
        </h2>
        <p className={styles.lede}>
          A manuscript is structured source, not a Word file. Select a stage
          to see what it does — the checks and edition profiles below are the
          real ones the engine runs, not a diagram of an idea.
        </p>
      </header>

      {/* ── Stage flow ───────────────────────────────────────────── */}
      <div className={styles.flow} role="tablist" aria-label="Pipeline stage">
        {STAGES.map((s, i) => (
          <React.Fragment key={s.id}>
            <button
              role="tab"
              aria-selected={stage === s.id}
              className={[styles.stage, stage === s.id ? styles.stageOn : ""].join(" ")}
              onClick={() => setStage(s.id)}
            >
              <span className={styles.stageNo}>{s.n}</span>
              <span className={styles.stageLabel}>{s.label}</span>
            </button>
            {i < STAGES.length - 1 && (
              <span className={styles.arrow} aria-hidden="true">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Stage detail ─────────────────────────────────────────── */}
      <div className={styles.detail}>
        {stage === "source" && (
          <StagePanel
            heading="Prose as a tree of semantic nodes"
            note="A chapter is a chapter; a scene break is a scene break; a foreign-language span declares its language. No layout instructions are embedded — the renderer decides presentation."
            rows={[
              ["chapters", `${SAMPLE_BOOK.chapters.length} parsed from source`],
              ["node types", "chapter · scene break · epigraph · language span · footnote"],
              ["layout in source", "none — presentation belongs to the renderer"],
            ]}
          />
        )}

        {stage === "validate" && (
          <div className={styles.panel}>
            <h3 className={styles.panelHeading}>Validate before build</h3>
            <p className={styles.panelNote}>
              The publication is checked before anything generates, so the
              pipeline fails loudly instead of shipping a subtly broken book.
            </p>
            <ul className={styles.checks}>
              {report.checks.map((c, i) => (
                <li key={i} className={styles.check}>
                  <span className={[styles.checkMark, styles[`m_${c.status}`]].join(" ")}>
                    {c.status === "pass" ? "✓" : c.status === "error" ? "✕" : c.status === "warn" ? "!" : "·"}
                  </span>
                  <span className={styles.checkLabel}>{c.label}</span>
                  <span className={styles.checkDetail}>{c.detail}</span>
                </li>
              ))}
            </ul>
            <p className={styles.panelFoot}>
              {report.errors} errors · {report.warnings} warnings · {report.words.toLocaleString()} words
            </p>
          </div>
        )}

        {stage === "edition" && (
          <div className={styles.panel}>
            <h3 className={styles.panelHeading}>Edition profiles</h3>
            <p className={styles.panelNote}>
              A base book is inherited by each edition, which overrides only
              what changes — trim, type scale, measure, how a chapter number
              is shown. A new trim size is a config change, not a rebuild.
            </p>
            <div className={styles.editionGrid}>
              {EDITIONS.map((e) => (
                <div key={e.key} className={styles.edition}>
                  <span className={styles.editionName}>{e.label}</span>
                  <dl className={styles.editionMeta}>
                    <div><dt>trim</dt><dd>{e.trim}</dd></div>
                    <div><dt>type scale</dt><dd>×{e.typeScale}</dd></div>
                    <div><dt>measure</dt><dd>{e.measure} ch</dd></div>
                    <div><dt>chapter №</dt><dd>{e.numeral}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === "render" && (
          <StagePanel
            heading="Separate renderers, one source"
            note="Each renderer interprets the same node tree. Metadata lives once and flows into every output; fonts are mapped by script (the Polytype layer underneath), so a Hebrew passage never silently drops to a fallback glyph."
            rows={[
              ["print", "LuaLaTeX — OpenType, microtypography, reliable pagination → press-ready PDF"],
              ["epub", "accessible HTML5 with epub:type semantics → passes EPUBCheck"],
              ["web", "excerpt view, stops after the first scene break"],
            ]}
          />
        )}

        {stage === "outputs" && (
          <StagePanel
            heading="Many artifacts, no divergence"
            note="Because there is one canonical source, a correction made once reaches every edition. The expensive, invisible drift between a print file and its EPUB stops happening."
            rows={[
              ["print PDF", "paperback, large print — trim and type per edition profile"],
              ["EPUB3", "semantic, accessible, metadata-complete"],
              ["web", "excerpt for the site"],
              ["source of truth", "text-based → Git history, branching, tagged editions"],
            ]}
          />
        )}
      </div>
    </section>
  );
}

function StagePanel({
  heading,
  note,
  rows,
}: {
  heading: string;
  note: string;
  rows: [string, string][];
}) {
  return (
    <div className={styles.panel}>
      <h3 className={styles.panelHeading}>{heading}</h3>
      <p className={styles.panelNote}>{note}</p>
      <dl className={styles.rows}>
        {rows.map(([k, v]) => (
          <div key={k} className={styles.row}>
            <dt className={styles.rowKey}>{k}</dt>
            <dd className={styles.rowVal}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

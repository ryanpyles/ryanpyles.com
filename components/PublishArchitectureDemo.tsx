"use client";

/**
 * FORMÆTRIX Publish Architecture — the demo. One canonical semantic source
 * (lib/publish/sample) is rendered three ways, driven by the real model and
 * validator: the source tree, a print interior whose edition profile changes
 * trim/type/numeral, the EPUB semantic mapping, and a build pass with the
 * validator's checklist and receipt. Nothing is mocked — change the edition
 * and the same nodes regenerate.
 */

import React, { useMemo, useState } from "react";
import {
  EDITIONS,
  chapterNumeral,
  runText,
  type Block,
  type Chapter,
  type Edition,
  type Run,
} from "@/lib/publish/model";
import { SAMPLE_BOOK } from "@/lib/publish/sample";
import { validateBook, type CheckStatus } from "@/lib/publish/validate";
import styles from "./PublishArchitectureDemo.module.css";

type Tab = "source" | "print" | "epub" | "build";

const FEATURE_CHAPTER = SAMPLE_BOOK.chapters.find((c) => c.id === "chapter-07")!;

function refNumber(noteRef: string): string {
  const m = noteRef.match(/(\d+)/);
  return m ? m[1] : "*";
}

/* Render inline runs for a reading view (print / web). */
function Runs({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((r, i) => {
        if (r.noteRef)
          return (
            <sup key={i} className={styles.noteMark}>
              {refNumber(r.noteRef)}
            </sup>
          );
        if (r.lang)
          return (
            <span key={i} lang={r.lang} dir={r.lang === "he" ? "rtl" : "ltr"} className={styles.langSpan}>
              {r.text}
            </span>
          );
        return <React.Fragment key={i}>{r.text}</React.Fragment>;
      })}
    </>
  );
}

/* ── Reading renderer (print + web share it, parameterized by edition) ──── */
function ReadingView({ chapter, edition }: { chapter: Chapter; edition: Edition }) {
  const base = 17 * edition.typeScale;
  let blocks: Block[] = chapter.content;
  if (edition.excerpt) {
    const cut = chapter.content.findIndex((b) => b.type === "sceneBreak");
    if (cut > 0) blocks = chapter.content.slice(0, cut);
  }

  return (
    <div
      className={[styles.page, edition.renderer === "web" ? styles.pageWeb : styles.pagePrint].join(" ")}
      style={{ ["--measure" as string]: `${edition.measure}ch`, ["--fs" as string]: `${base}px` }}
    >
      <p className={styles.chapterNo}>{chapterNumeral(chapter.number, edition.numeral)}</p>
      <h3 className={styles.chapterTitle}>{chapter.title}</h3>

      {blocks.map((b, i) => {
        if (b.type === "epigraph")
          return (
            <blockquote key={i} className={styles.epigraph}>
              <Runs runs={b.runs} />
              {b.attribution && <cite className={styles.epigraphCite}>— {b.attribution}</cite>}
            </blockquote>
          );
        if (b.type === "sceneBreak")
          return (
            <p key={i} className={styles.sceneBreak} aria-hidden="true">
              ❖
            </p>
          );
        if (b.type === "transcript")
          return (
            <div key={i} className={styles.transcript}>
              {b.lines.map((l, j) => (
                <p key={j} className={styles.transcriptLine}>
                  <span className={styles.speaker}>{l.speaker}</span>
                  {l.text}
                </p>
              ))}
            </div>
          );
        return (
          <p
            key={i}
            className={[styles.para, b.style === "opening" ? styles.opening : ""].join(" ")}
          >
            <Runs runs={b.runs} />
          </p>
        );
      })}

      {!edition.excerpt && chapter.footnotes && chapter.footnotes.length > 0 && (
        <div className={styles.footnotes}>
          {chapter.footnotes.map((f) => (
            <p key={f.id} className={styles.footnote}>
              <sup className={styles.noteMark}>{refNumber(f.id)}</sup>
              <span>{runText(f.runs)}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── EPUB semantic mapping ─────────────────────────────────────────────── */
const EPUB_MAP: [string, string][] = [
  ["chapter", "<section epub:type=\"chapter\">"],
  ["paragraph", "<p>"],
  ["paragraph[opening]", "<p class=\"opening\">"],
  ["epigraph", "<blockquote epub:type=\"epigraph\">"],
  ["sceneBreak", "<hr role=\"separator\" class=\"scene\">"],
  ["transcript", "<div epub:type=\"dialogue\">"],
  ["footnote", "<aside epub:type=\"footnote\" id=\"fn-18\">"],
  ["langSpan", "<span lang=\"he\" dir=\"rtl\">"],
];

export default function PublishArchitectureDemo() {
  const [tab, setTab] = useState<Tab>("source");
  const [editionKey, setEditionKey] = useState<string>("paperback");
  const edition = EDITIONS.find((e) => e.key === editionKey) ?? EDITIONS[0];
  const report = useMemo(() => validateBook(SAMPLE_BOOK), []);

  return (
    <div className={styles.demo}>
      <div className={styles.tabs} role="tablist">
        {(
          [
            ["source", "Canonical source"],
            ["print", "Print interior"],
            ["epub", "EPUB mapping"],
            ["build", "Build"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={[styles.tab, tab === id ? styles.tabActive : ""].join(" ")}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Edition selector drives the reading views from the same source. */}
      {(tab === "print" || tab === "build") && (
        <div className={styles.editionBar}>
          <span className={styles.editionLabel}>Edition</span>
          {EDITIONS.map((e) => (
            <button
              key={e.key}
              className={[styles.editionBtn, e.key === editionKey ? styles.editionBtnActive : ""].join(" ")}
              onClick={() => setEditionKey(e.key)}
            >
              {e.label}
              <span className={styles.editionTrim}>{e.trim}</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.body}>
        {tab === "source" && (
          <ol className={styles.tree}>
            {FEATURE_CHAPTER.content.map((b, i) => (
              <li key={i} className={styles.node}>
                <span className={styles.nodeType}>
                  {b.type}
                  {b.type === "paragraph" && b.style === "opening" ? " · opening" : ""}
                </span>
                <span className={styles.nodeText}>
                  {b.type === "sceneBreak"
                    ? "— scene break —"
                    : b.type === "transcript"
                    ? b.lines.map((l) => `${l.speaker}: ${l.text}`).join("  /  ")
                    : runText((b as Extract<Block, { runs: Run[] }>).runs)}
                </span>
                {b.type === "paragraph" &&
                  b.runs.some((r) => r.lang) && (
                    <span className={styles.nodeTag}>lang span</span>
                  )}
                {b.type === "paragraph" &&
                  b.runs.some((r) => r.noteRef) && (
                    <span className={styles.nodeTag}>footnote ref</span>
                  )}
              </li>
            ))}
            {FEATURE_CHAPTER.footnotes?.map((f) => (
              <li key={f.id} className={styles.node}>
                <span className={styles.nodeType}>footnote · {f.id}</span>
                <span className={styles.nodeText}>{runText(f.runs)}</span>
              </li>
            ))}
          </ol>
        )}

        {tab === "print" && <ReadingView chapter={FEATURE_CHAPTER} edition={edition} />}

        {tab === "epub" && (
          <div className={styles.epub}>
            <p className={styles.epubNote}>
              The same nodes map to accessible EPUB3 semantics — structure the
              reader and reading apps can parse, not visual markup.
            </p>
            <ul className={styles.epubList}>
              {EPUB_MAP.map(([node, html]) => (
                <li key={node} className={styles.epubRow}>
                  <span className={styles.epubNode}>{node}</span>
                  <span className={styles.epubArrow}>→</span>
                  <code className={styles.epubHtml}>{html}</code>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "build" && (
          <div className={styles.build}>
            <code className={styles.buildCmd}>formaetrix build {edition.key}</code>
            <ul className={styles.checks}>
              {report.checks.map((c, i) => (
                <li key={i} className={[styles.check, styles[`st_${c.status}`]].join(" ")}>
                  <span className={styles.checkMark} aria-hidden="true">
                    {mark(c.status)}
                  </span>
                  <span className={styles.checkBody}>
                    <span className={styles.checkLabel}>{c.label}</span>
                    <span className={styles.checkDetail}>{c.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.receipt}>
              <span className={styles.receiptHead}>Build receipt</span>
              {(
                [
                  ["edition", `${edition.label} · ${edition.trim}`],
                  ["output", edition.renderer === "web" ? "HTML excerpt" : edition.renderer === "epub" ? "EPUB3" : "press-ready PDF"],
                  ["est. pages", String(report.pages)],
                  ["words", report.words.toLocaleString("en-US")],
                  ["fonts", report.fonts.join(", ")],
                  ["warnings", String(report.warnings)],
                  ["errors", String(report.errors)],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className={styles.receiptRow}>
                  <span className={styles.receiptKey}>{k}</span>
                  <span className={styles.receiptVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function mark(status: CheckStatus): string {
  return status === "pass" ? "✓" : status === "error" ? "✕" : status === "warn" ? "!" : "i";
}

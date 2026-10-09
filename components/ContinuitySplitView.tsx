"use client";

/**
 * Continuity Atlas — source tracing, split-screen.
 *
 * Left: manuscript passages. Right: the relationships a continuity model
 * derives from them. Select an entity to filter the relationships; select a
 * relationship to light up the exact spans that evidence it — and to see
 * whether the edge is VERIFIED (cited to a line) or INFERRED (derived, with
 * no single line to point at). One pair of relationships contradicts: the
 * demo traces both claims back to the two passages that disagree.
 *
 * All data here is illustrative, deterministic sample data from the
 * Liminal 6:17 manuscript — no model runs, nothing is fetched. The point is
 * the architecture of contextual reasoning, shown honestly, not a live AI
 * result.
 */

import React, { useMemo, useState } from "react";
import styles from "./ContinuitySplitView.module.css";

/* ── Passages (left) — segments carry ids so a relationship can cite one ── */
interface Segment {
  text: string;
  /** Evidence id — relationships reference these to highlight the span. */
  ev?: string;
}
interface Passage {
  id: string;
  chapter: string;
  segments: Segment[];
}

const PASSAGES: Passage[] = [
  {
    id: "ch1",
    chapter: "Ch. I",
    segments: [
      { text: "The house was quiet. The hall clock read " },
      { text: "6:17", ev: "clock-1" },
      { text: ", the way it always did when he couldn’t sleep." },
    ],
  },
  {
    id: "ch2",
    chapter: "Ch. II",
    segments: [
      { text: "“" },
      { text: "Oren left first", ev: "oren-left" },
      { text: ",” Jack said, not looking up." },
    ],
  },
  {
    id: "ch4",
    chapter: "Ch. IV",
    segments: [
      { text: "Afterward, " },
      { text: "no one agreed on the order of the stairs", ev: "stair-event" },
      { text: "." },
    ],
  },
  {
    id: "ch7",
    chapter: "Ch. VII",
    segments: [
      { text: "He had counted them on the way down — he was sure of that now. " },
      { text: "6:17", ev: "clock-7" },
      { text: ". " },
      { text: "Oren’s coat still on the hook", ev: "oren-present" },
      { text: "." },
    ],
  },
];

/* ── Relationships (right) ──────────────────────────────────────────────── */
type Status = "verified" | "inferred";
interface Relationship {
  id: string;
  subject: string;
  relation: string;
  object: string;
  status: Status;
  /** Entities this edge touches — drives the filter chips. */
  entities: string[];
  /** Evidence segment ids to highlight on the left. */
  evidence: string[];
  /** Human note describing the basis. */
  note: string;
  /** Another relationship id this one contradicts. */
  conflictsWith?: string;
  authorOnly?: boolean;
}

const RELATIONSHIPS: Relationship[] = [
  {
    id: "r-clock",
    subject: "6:17",
    relation: "recurs at",
    object: "Ch. I → Ch. VII",
    status: "verified",
    entities: ["6:17"],
    evidence: ["clock-1", "clock-7"],
    note: "Motif cited verbatim in two chapters — a verified recurrence.",
  },
  {
    id: "r-oren-left",
    subject: "Oren",
    relation: "left before",
    object: "the stair event",
    status: "verified",
    entities: ["Oren", "Stair event"],
    evidence: ["oren-left"],
    note: "Character-stated by Jack in Ch. II. Verified as said — not as true.",
    conflictsWith: "r-oren-present",
  },
  {
    id: "r-oren-present",
    subject: "Oren",
    relation: "was still present at",
    object: "6:17, Ch. VII",
    status: "verified",
    entities: ["Oren", "6:17"],
    evidence: ["oren-present"],
    note: "Ch. VII puts Oren’s coat on the hook at 6:17 — he had not left.",
    conflictsWith: "r-oren-left",
  },
  {
    id: "r-jack-present",
    subject: "Jack",
    relation: "was present at",
    object: "the stair event",
    status: "inferred",
    entities: ["Jack", "Stair event"],
    evidence: ["stair-event"],
    note: "No line places Jack on the stairs. Inferred from Ch. IV plus his Ch. VII memory — flagged, not asserted.",
  },
];

const ENTITIES = ["Jack", "Oren", "6:17", "Stair event"] as const;

export default function ContinuitySplitView() {
  const [entity, setEntity] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>("r-oren-left");

  const visible = useMemo(
    () => (entity ? RELATIONSHIPS.filter((r) => r.entities.includes(entity)) : RELATIONSHIPS),
    [entity]
  );

  const selectedRel = RELATIONSHIPS.find((r) => r.id === selected) ?? null;
  const conflictRel = selectedRel?.conflictsWith
    ? RELATIONSHIPS.find((r) => r.id === selectedRel.conflictsWith) ?? null
    : null;

  // Which evidence spans are lit: the selected edge plus, for a contradiction,
  // the edge it conflicts with — so both sides of the disagreement show.
  const litEvidence = useMemo(() => {
    const ids = new Set<string>();
    if (selectedRel) selectedRel.evidence.forEach((e) => ids.add(e));
    if (conflictRel) conflictRel.evidence.forEach((e) => ids.add(e));
    return ids;
  }, [selectedRel, conflictRel]);

  return (
    <section className={styles.wrap} aria-labelledby="atlas-trace-title">
      <header className={styles.head}>
        <p className={styles.kicker}>Continuity Atlas · trace a claim to its source</p>
        <h2 id="atlas-trace-title" className={styles.title}>
          Where does the model think this is true?
        </h2>
        <p className={styles.lede}>
          Select an entity to filter what the continuity model derives, then a
          relationship to trace it back to the exact line. A verified edge
          points at a sentence; an inferred one is honest that it is a guess.
          One pair contradicts — both claims trace back, and the model flags
          the disagreement instead of resolving it.
        </p>
      </header>

      <div className={styles.split}>
        {/* ── Left: source ─────────────────────────────────────────── */}
        <div className={styles.source}>
          <p className={styles.panelLabel}>Manuscript · source</p>
          <div className={styles.passages}>
            {PASSAGES.map((p) => {
              const active = p.segments.some((s) => s.ev && litEvidence.has(s.ev));
              return (
                <article
                  key={p.id}
                  className={[styles.passage, active ? styles.passageActive : ""].join(" ")}
                >
                  <span className={styles.chapter}>{p.chapter}</span>
                  <p className={styles.passageText}>
                    {p.segments.map((s, i) =>
                      s.ev ? (
                        <mark
                          key={i}
                          className={[
                            styles.span,
                            litEvidence.has(s.ev) ? styles.spanLit : "",
                          ].join(" ")}
                        >
                          {s.text}
                        </mark>
                      ) : (
                        <span key={i}>{s.text}</span>
                      )
                    )}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Right: relationships ─────────────────────────────────── */}
        <div className={styles.relations}>
          <p className={styles.panelLabel}>Continuity model · relationships</p>

          <div className={styles.filters} role="group" aria-label="Filter by entity">
            <button
              className={[styles.chip, entity === null ? styles.chipOn : ""].join(" ")}
              aria-pressed={entity === null}
              onClick={() => setEntity(null)}
            >
              All
            </button>
            {ENTITIES.map((e) => (
              <button
                key={e}
                className={[styles.chip, entity === e ? styles.chipOn : ""].join(" ")}
                aria-pressed={entity === e}
                onClick={() => setEntity((cur) => (cur === e ? null : e))}
              >
                {e}
              </button>
            ))}
          </div>

          <ul className={styles.edgeList}>
            {visible.map((r) => {
              const isSel = r.id === selected;
              const isConflictOfSel = conflictRel?.id === r.id;
              return (
                <li key={r.id}>
                  <button
                    className={[
                      styles.edge,
                      isSel ? styles.edgeSel : "",
                      isConflictOfSel ? styles.edgeConflict : "",
                    ].join(" ")}
                    aria-pressed={isSel}
                    onClick={() => setSelected(r.id)}
                  >
                    <span className={styles.edgeClaim}>
                      <span className={styles.subj}>{r.subject}</span>{" "}
                      <span className={styles.rel}>{r.relation}</span>{" "}
                      <span className={styles.obj}>{r.object}</span>
                    </span>
                    <span className={styles.edgeMeta}>
                      <span
                        className={[
                          styles.badge,
                          r.status === "verified" ? styles.badgeVerified : styles.badgeInferred,
                        ].join(" ")}
                      >
                        {r.status}
                      </span>
                      {r.conflictsWith && (
                        <span className={styles.badgeConflict}>contradiction</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {selectedRel && (
            <div className={styles.detail} role="status">
              <p className={styles.detailNote}>{selectedRel.note}</p>
              {conflictRel && (
                <p className={styles.detailConflict}>
                  Contradicts: “{conflictRel.subject} {conflictRel.relation}{" "}
                  {conflictRel.object}.” Both lines are lit on the left — the
                  model holds the conflict open.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={[styles.swatch, styles.badgeVerified].join(" ")} /> verified — cited to a line
        </span>
        <span className={styles.legendItem}>
          <span className={[styles.swatch, styles.badgeInferred].join(" ")} /> inferred — derived, no single line
        </span>
        <span className={styles.legendNote}>Illustrative sample data · Liminal 6:17 · deterministic</span>
      </footer>
    </section>
  );
}

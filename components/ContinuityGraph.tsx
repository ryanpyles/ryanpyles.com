"use client";

import React, { useState } from "react";
import styles from "./ContinuityGraph.module.css";

/**
 * A small, interactive continuity graph — the shape of the memory model
 * described in the article. Nodes are typed (state / event / claim / motif),
 * edges are typed relations, and an author-only layer can be revealed to
 * show facts deliberately hidden from generation.
 *
 * Data is illustrative and anonymized from Liminal 6:17.
 */

type Kind = "state" | "event" | "claim" | "motif" | "contradiction";

interface Node {
  id: string;
  kind: Kind;
  label: string;
  sub: string;
  x: number;
  y: number;
  authorOnly?: boolean;
  /** who-knows summary shown on hover */
  knows: string;
}

interface Edge {
  from: string;
  to: string;
  label: string;
  authorOnly?: boolean;
  conflict?: boolean;
}

const NODES: Node[] = [
  { id: "jack-1", kind: "state", label: "Jack · Ch. I", sub: "avoidant · lucid", x: 120, y: 90, knows: "Knows: the house is quiet. Does not know: what waits at 6:17." },
  { id: "jack-7", kind: "state", label: "Jack · Ch. VII", sub: "fractured · bodily panic", x: 120, y: 300, knows: "Knows: too much. Voice rules differ from Ch. I — different card." },
  { id: "clock", kind: "motif", label: "6:17", sub: "recurring motif", x: 400, y: 60, knows: "Reader-visible. Pays off in Ch. VII." },
  { id: "event", kind: "event", label: "The stair event", sub: "Ch. IV", x: 400, y: 200, knows: "Reader knows an event occurred; cause is withheld." },
  { id: "claim", kind: "claim", label: "“Oren left first”", sub: "stated, Ch. II", x: 680, y: 130, knows: "Character-stated. Contradicted later — flagged, not resolved." },
  { id: "secret", kind: "claim", label: "Jack caused it", sub: "author-only", x: 680, y: 320, authorOnly: true, knows: "Author-only. Hidden from generation until the author pays it off." },
];

const EDGES: Edge[] = [
  { from: "jack-1", to: "jack-7", label: "drifts into" },
  { from: "jack-7", to: "event", label: "remembers" },
  { from: "clock", to: "event", label: "marks" },
  { from: "event", to: "claim", label: "occasions" },
  { from: "claim", to: "secret", label: "contradicts", conflict: true },
  { from: "event", to: "secret", label: "true cause", authorOnly: true },
];

const KIND_LABEL: Record<Kind, string> = {
  state: "State",
  event: "Event",
  claim: "Claim",
  motif: "Motif",
  contradiction: "Conflict",
};

export default function ContinuityGraph() {
  const [authorLayer, setAuthorLayer] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  const byId = (id: string) => NODES.find((n) => n.id === id)!;
  const visible = (n: { authorOnly?: boolean }) => authorLayer || !n.authorOnly;

  const active = hover ? byId(hover) : null;

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <span className={styles.title}>Story-memory graph</span>
        <button
          type="button"
          className={[styles.toggle, authorLayer ? styles.toggleOn : ""].join(
            " "
          )}
          aria-pressed={authorLayer}
          onClick={() => setAuthorLayer((v) => !v)}
        >
          <span className={styles.toggleDot} aria-hidden="true" />
          {authorLayer ? "Author-only layer: on" : "Reveal author-only layer"}
        </button>
      </div>

      <div className={styles.stage}>
        <svg
          viewBox="0 0 800 380"
          className={styles.svg}
          role="img"
          aria-label="An interactive continuity graph of typed nodes and relations"
        >
          {/* edges */}
          <g>
            {EDGES.filter((e) => visible(e)).map((e, i) => {
              const a = byId(e.from);
              const b = byId(e.to);
              if (!visible(a) || !visible(b)) return null;
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              const dim = hover && hover !== e.from && hover !== e.to;
              return (
                <g key={i} opacity={dim ? 0.18 : 1} className={styles.edge}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={[
                      styles.edgeLine,
                      e.conflict ? styles.edgeConflict : "",
                      e.authorOnly ? styles.edgeAuthor : "",
                    ].join(" ")}
                  />
                  <text x={mx} y={my - 5} className={styles.edgeLabel}>
                    {e.label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* nodes */}
          <g>
            {NODES.filter(visible).map((n) => {
              const dim = hover && hover !== n.id;
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x},${n.y})`}
                  opacity={dim ? 0.4 : 1}
                  className={styles.nodeG}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  tabIndex={0}
                  onFocus={() => setHover(n.id)}
                  onBlur={() => setHover(null)}
                >
                  <circle
                    r={13}
                    className={[
                      styles.node,
                      styles[`node_${n.kind}`],
                      n.authorOnly ? styles.nodeAuthor : "",
                    ].join(" ")}
                  />
                  <text x={20} y={-2} className={styles.nodeLabel}>
                    {n.label}
                  </text>
                  <text x={20} y={13} className={styles.nodeSub}>
                    {n.sub}
                  </text>
                  <text x={0} y={4} className={styles.nodeKind}>
                    {n.kind === "state"
                      ? "S"
                      : n.kind === "event"
                      ? "E"
                      : n.kind === "claim"
                      ? "C"
                      : "M"}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className={styles.readout} aria-live="polite">
        {active ? (
          <>
            <span className={styles.readoutKind}>{KIND_LABEL[active.kind]}</span>
            <span className={styles.readoutText}>{active.knows}</span>
          </>
        ) : (
          <span className={styles.readoutHint}>
            Hover a node to see who knows what. Toggle the author-only layer to
            reveal the fact the model is not allowed to use yet.
          </span>
        )}
      </div>
    </div>
  );
}

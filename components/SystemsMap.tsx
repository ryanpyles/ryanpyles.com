"use client";

/**
 * SystemsMap — the brand architecture made navigable. RYAN PYLES at the hub,
 * four disciplines on the inner ring, the six FORMÆTRIX-stack projects and the
 * Elian Voigt imprint on the outer ring. Unlike the hero orrery this is
 * wayfinding, not decoration: the nodes are real links, keyboard-focusable,
 * and hovering/focusing one brightens its connections and reveals a one-line
 * description. On narrow screens the orbital figure gives way to a structured
 * outline — simplified, not merely shrunk.
 */

import React, { useId, useState } from "react";
import Link from "next/link";
import styles from "./SystemsMap.module.css";

const VBW = 1000;
const VBH = 860;
const CX = 500;
const CY = 430;

type Tier = "hub" | "discipline" | "project" | "identity";

interface MapNode {
  id: string;
  label: string;
  meta: string;
  tier: Tier;
  href?: string;
  external?: boolean;
  deg?: number;
  r?: number;
}

const NODES: MapNode[] = [
  { id: "ryan", label: "RYAN PYLES", meta: "Multidisciplinary technologist — software, AI, design, language.", tier: "hub" },
  { id: "eng", label: "ENGINEERING", meta: "Full-stack systems, shipped end to end.", tier: "discipline", href: "/projects", deg: -90, r: 172 },
  { id: "design", label: "DESIGN", meta: "Editorial interfaces where form carries meaning.", tier: "discipline", href: "/projects", deg: 0, r: 172 },
  { id: "ai", label: "AI", meta: "Systems that reason over long context.", tier: "discipline", href: "/projects", deg: 90, r: 172 },
  { id: "lang", label: "LANGUAGE", meta: "Multilingual architecture and applied linguistics.", tier: "discipline", href: "/projects", deg: 180, r: 172 },
  { id: "formaetrix", label: "FORMÆTRIX", meta: "The studio — systems, publishing, and the Elian Voigt imprint.", tier: "identity", href: "https://www.formaetrix.com", external: true, deg: -90, r: 352 },
  { id: "atlas", label: "CONTINUITY ATLAS", meta: "Narrative memory and continuity system.", tier: "project", href: "/projects/continuity-atlas", deg: -30, r: 352 },
  { id: "publish", label: "PUBLISH ARCHITECTURE", meta: "Structured publishing infrastructure.", tier: "project", href: "/projects/publish-architecture", deg: 30, r: 352 },
  { id: "polytype", label: "POLYTYPE", meta: "Locale-aware typography engine.", tier: "project", href: "/projects/polytype", deg: 90, r: 352 },
  { id: "locale", label: "LOCALE-AWARE PRODUCT SYSTEM", meta: "Locale as product behavior, not translated copy.", tier: "project", href: "/projects/locale-aware-product-system", deg: 150, r: 352 },
  { id: "elian", label: "ELIAN VOIGT", meta: "The literary identity — experimental fiction.", tier: "identity", href: "https://www.elianvoigt.com", external: true, deg: 210, r: 352 },
];

/** Undirected edges: hub→disciplines, project→discipline(s), imprint chain. */
const EDGES: [string, string][] = [
  ["ryan", "eng"], ["ryan", "design"], ["ryan", "ai"], ["ryan", "lang"],
  ["ryan", "formaetrix"],
  ["atlas", "ai"],
  ["publish", "eng"], ["publish", "design"],
  ["polytype", "design"], ["polytype", "lang"],
  ["locale", "lang"], ["locale", "eng"],
  ["formaetrix", "elian"], ["formaetrix", "polytype"], ["formaetrix", "publish"],
];

function pos(node: MapNode): { x: number; y: number } {
  if (node.tier === "hub" || node.deg === undefined || node.r === undefined)
    return { x: CX, y: CY };
  const rad = (node.deg * Math.PI) / 180;
  return { x: CX + node.r * Math.cos(rad), y: CY + node.r * Math.sin(rad) };
}

const POS: Record<string, { x: number; y: number }> = Object.fromEntries(
  NODES.map((n) => [n.id, pos(n)])
);

/** Ids adjacent to a given id, for emphasis. */
function neighbors(id: string): Set<string> {
  const s = new Set<string>();
  for (const [a, b] of EDGES) {
    if (a === id) s.add(b);
    if (b === id) s.add(a);
  }
  return s;
}

export default function SystemsMap() {
  const [active, setActive] = useState<string | null>(null);
  const titleId = useId();
  const adj = active ? neighbors(active) : null;
  const activeNode = NODES.find((n) => n.id === active) ?? null;

  const emphasized = (id: string) =>
    active != null && (id === active || (adj?.has(id) ?? false));

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.head}>
        <p className={styles.kicker}>Fig. 02 — Systems map</p>
        <h2 id={titleId} className={styles.heading}>
          One practice, a common orbit
        </h2>
        <p className={styles.sub}>
          Ryan at the center; four disciplines; the systems they produce. Hover
          or focus a node to trace its connections.
        </p>
      </div>

      {/* ── Orbital figure (wide screens) ──────────────────────────────── */}
      <div
        className={styles.figure}
        role="group"
        aria-label="Interactive systems map"
        onMouseLeave={() => setActive(null)}
      >
        <svg className={styles.svg} viewBox={`0 0 ${VBW} ${VBH}`} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="smHub" cx="38%" cy="34%" r="72%">
              <stop offset="0%" stopColor="#e7cfa0" />
              <stop offset="45%" stopColor="#c69c5d" />
              <stop offset="100%" stopColor="#7c5a2e" />
            </radialGradient>
          </defs>

          {/* cardinal cross + construction rings */}
          <line className={styles.axis} x1={CX} y1="70" x2={CX} y2={VBH - 70} />
          <line className={styles.axis} x1="120" y1={CY} x2={VBW - 120} y2={CY} />
          <circle className={styles.ring} cx={CX} cy={CY} r="172" />
          <circle className={styles.ringDashed} cx={CX} cy={CY} r="352" />

          {/* edges */}
          {EDGES.map(([a, b], i) => {
            const pa = POS[a];
            const pb = POS[b];
            const on = active != null && (a === active || b === active);
            return (
              <line
                key={i}
                className={[styles.edge, on ? styles.edgeOn : ""].join(" ")}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
              />
            );
          })}

          {/* orange connection points */}
          {NODES.map((n) => {
            const p = POS[n.id];
            return (
              <circle
                key={n.id}
                className={[styles.joint, emphasized(n.id) ? styles.jointOn : ""].join(" ")}
                cx={p.x}
                cy={p.y}
                r={n.tier === "hub" ? 5 : 3.5}
              />
            );
          })}

          <circle cx={CX} cy={CY} r="44" fill="url(#smHub)" className={styles.hubSphere} />
          <circle className={styles.hubRing} cx={CX} cy={CY} r="56" />
        </svg>

        {/* HTML node layer — real links, focusable */}
        <ul className={styles.nodes}>
          {NODES.map((n) => {
            const p = POS[n.id];
            const left = (p.x / VBW) * 100;
            const top = (p.y / VBH) * 100;
            const cls = [
              styles.node,
              styles[`tier_${n.tier}`],
              active != null && !emphasized(n.id) ? styles.dim : "",
              active === n.id ? styles.active : "",
            ].join(" ");
            // Label sits above the joint for lower-half nodes, below otherwise.
            const vside =
              n.deg !== undefined && Math.sin((n.deg * Math.PI) / 180) > 0.25 ? "up" : "down";
            const inner = <span className={styles.nodeLabel}>{n.label}</span>;
            return (
              <li
                key={n.id}
                className={styles.nodeWrap}
                data-vside={n.tier === "hub" ? "center" : vside}
                style={{ left: `${left}%`, top: `${top}%` }}
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive((cur) => (cur === n.id ? null : cur))}
              >
                {n.href ? (
                  n.external ? (
                    <a className={cls} href={n.href} target="_blank" rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <Link className={cls} href={n.href}>
                      {inner}
                    </Link>
                  )
                ) : (
                  <span className={[cls, styles.nodeStatic].join(" ")}>{inner}</span>
                )}
              </li>
            );
          })}
        </ul>

        {/* live caption */}
        <p className={styles.caption} aria-live="polite">
          {activeNode ? (
            <>
              <span className={styles.captionLabel}>{activeNode.label}</span>
              <span className={styles.captionMeta}>{activeNode.meta}</span>
            </>
          ) : (
            <span className={styles.captionIdle}>Different disciplines. A common orbit.</span>
          )}
        </p>
      </div>

      {/* ── Outline fallback (narrow screens) — simplified, not shrunk ──── */}
      <div className={styles.outline}>
        <div className={styles.outlineHub}>
          <span className={styles.outlineHubLabel}>Ryan Pyles</span>
          <span className={styles.outlineHubMeta}>Multidisciplinary technologist</span>
        </div>
        {(["eng", "ai", "design", "lang"] as const).map((did) => {
          const d = NODES.find((n) => n.id === did)!;
          const kids = NODES.filter(
            (n) => n.tier === "project" && neighbors(n.id).has(did)
          );
          return (
            <div key={did} className={styles.outlineGroup}>
              <Link href={d.href!} className={styles.outlineDiscipline}>
                {d.label}
              </Link>
              <span className={styles.outlineMeta}>{d.meta}</span>
              {kids.length > 0 && (
                <ul className={styles.outlineProjects}>
                  {kids.map((k) => (
                    <li key={k.id}>
                      <Link href={k.href!} className={styles.outlineProject}>
                        {k.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <div className={styles.outlineGroup}>
          <a href="https://www.formaetrix.com" target="_blank" rel="noopener noreferrer" className={styles.outlineDiscipline}>
            FORMÆTRIX
          </a>
          <span className={styles.outlineMeta}>The studio — systems, publishing, and the Elian Voigt imprint.</span>
          <ul className={styles.outlineProjects}>
            <li>
              <a href="https://www.elianvoigt.com" target="_blank" rel="noopener noreferrer" className={styles.outlineProject}>
                ELIAN VOIGT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

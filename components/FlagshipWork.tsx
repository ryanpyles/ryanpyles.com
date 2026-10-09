import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { getCaseStudy } from "@/content/projectCases";
import styles from "./FlagshipWork.module.css";

/**
 * FlagshipWork — the "selected systems" index, as a sequence of large
 * editorial exhibits rather than a card grid. Each flagship gets a full
 * composition row (alternating side to side) with its real metadata pulled
 * from content/projectCases.ts and a native diagram motif derived from what
 * the system actually does — a narrative state graph, script runs, the
 * one-source/many-outputs pipeline, a locale audit matrix. No raster, no
 * stock: every figure is drawn from the project's own logic.
 *
 * The motifs share one drawing grammar (hairline strokes, mono labels, a
 * single accent reserved for the active signal) so the four read as exhibits
 * in one museum, not four unrelated graphics.
 */

type MotifKind = "atlas" | "polytype" | "publish" | "locale";

interface Flagship {
  slug: string;
  index: string;
  motif: MotifKind;
}

const FLAGSHIPS: Flagship[] = [
  { slug: "continuity-atlas", index: "01", motif: "atlas" },
  { slug: "polytype", index: "02", motif: "polytype" },
  { slug: "publish-architecture", index: "03", motif: "publish" },
  { slug: "locale-aware-product-system", index: "04", motif: "locale" },
];

export default function FlagshipWork() {
  return (
    <section className={styles.section} aria-labelledby="flagship-heading">
      <div className={styles.head}>
        <p className={styles.kicker}>Fig. 05 — Selected systems</p>
        <h2 id="flagship-heading" className={styles.heading}>
          Four systems, built — not described.
        </h2>
        <p className={styles.sub}>
          Each is a working engine with a live demo. The drawing beside it is
          its own logic, not decoration.
        </p>
      </div>

      <div className={styles.exhibits}>
        {FLAGSHIPS.map((f) => {
          const c = getCaseStudy(f.slug);
          if (!c) return null;
          const figure = c.figures?.[0];
          return (
            <Reveal key={f.slug}>
              <article className={styles.exhibit}>
                <div className={styles.plate} aria-hidden="true">
                  <Motif kind={f.motif} />
                </div>

                <div className={styles.body}>
                  <div className={styles.bodyTop}>
                    <span className={styles.index}>{f.index}</span>
                    <span className={styles.year}>{c.year}</span>
                  </div>
                  <h3 className={styles.title}>{c.title}</h3>
                  <p className={styles.tagline}>{c.tagline}</p>

                  {figure && (
                    <p className={styles.figure}>
                      <span className={styles.figureValue}>{figure.value}</span>
                      <span className={styles.figureLabel}>{figure.label}</span>
                    </p>
                  )}

                  <ul className={styles.stack}>
                    {c.stack.map((s) => (
                      <li key={s} className={styles.chip}>
                        {s}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/projects/${c.slug}`} className={styles.link}>
                    Open the case study →
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ── Motifs ──────────────────────────────────────────────────────────────
   One shared grammar: 1.25px hairlines in currentColor, mono labels, the
   accent class reserved for the single "live signal" in each figure. */

function Motif({ kind }: { kind: MotifKind }) {
  switch (kind) {
    case "atlas":
      return <AtlasMotif />;
    case "polytype":
      return <PolytypeMotif />;
    case "publish":
      return <PublishMotif />;
    case "locale":
      return <LocaleMotif />;
  }
}

/* Continuity Atlas — a character resolved into chapter states along a
   timeline; one state fractures (red diamond), one fact is author-only
   (violet). "The unit of memory is the state, not the character." */
function AtlasMotif() {
  return (
    <svg className={styles.svg} viewBox="0 0 440 240" role="presentation">
      {/* timeline */}
      <line className={styles.wire} x1="60" y1="190" x2="400" y2="190" />
      {[60, 145, 230, 315, 400].map((x) => (
        <line key={x} className={styles.tick} x1={x} y1="185" x2={x} y2="195" />
      ))}
      <text className={styles.lab} x="60" y="214">CH.I</text>
      <text className={styles.lab} x="214" y="214">CH.IV</text>
      <text className={styles.lab} x="372" y="214">CH.VII</text>

      {/* character node */}
      <circle className={styles.node} cx="60" cy="70" r="16" />
      <text className={styles.nodeLab} x="60" y="74" textAnchor="middle">JACK</text>

      {/* state wires to the timeline */}
      <path className={styles.wire} d="M60 86 C 60 150, 145 150, 145 182" fill="none" />
      <path className={styles.wire} d="M76 70 C 180 70, 215 150, 230 182" fill="none" />
      <path className={styles.wire} d="M76 70 C 300 70, 315 150, 315 182" fill="none" />

      {/* states on the line */}
      <circle className={styles.state} cx="145" cy="190" r="5" />
      {/* fracture state — rotated diamond, the one signal in accent-red */}
      <rect
        className={styles.fracture}
        x="224" y="184" width="12" height="12"
        transform="rotate(45 230 190)"
      />
      {/* author-only state */}
      <circle className={styles.authorOnly} cx="315" cy="190" r="5" />

      <text className={styles.capt} x="230" y="38" textAnchor="middle">
        fracture · lucid → fractured
      </text>
    </svg>
  );
}

/* Polytype — a mixed-script string broken into runs by Unicode block; the
   Hebrew run reverses (RTL). detectScripts(), made visible. */
function PolytypeMotif() {
  const runs = [
    { label: "LATIN", dir: "→", w: 130 },
    { label: "HEBREW", dir: "←", w: 90, rtl: true },
    { label: "HAN", dir: "→", w: 70 },
    { label: "KANA", dir: "→", w: 90 },
  ];
  let x = 40;
  return (
    <svg className={styles.svg} viewBox="0 0 440 240" role="presentation">
      <text className={styles.capt} x="40" y="48">detectScripts( )</text>
      {runs.map((r) => {
        const el = (
          <g key={r.label}>
            <rect
              className={r.rtl ? styles.runRtl : styles.run}
              x={x}
              y="96"
              width={r.w}
              height="48"
              rx="3"
            />
            <text className={styles.runLab} x={x + r.w / 2} y="124" textAnchor="middle">
              {r.label} {r.dir}
            </text>
          </g>
        );
        x += r.w + 6;
        return el;
      })}
      {/* baseline */}
      <line className={styles.wire} x1="40" y1="168" x2="400" y2="168" />
      <text className={styles.lab} x="40" y="192">ONE STRING · FOUR RUNS · TWO DIRECTIONS</text>
    </svg>
  );
}

/* Publish Architecture — one semantic source compiled to many outputs. */
function PublishMotif() {
  return (
    <svg className={styles.svg} viewBox="0 0 440 240" role="presentation">
      {/* source → model */}
      <line className={styles.wire} x1="70" y1="120" x2="190" y2="120" />
      {/* model → outputs */}
      <path className={styles.wire} d="M230 120 C 300 120, 320 60, 380 60" fill="none" />
      <line className={styles.wire} x1="230" y1="120" x2="380" y2="120" />
      <path className={styles.wire} d="M230 120 C 300 120, 320 180, 380 180" fill="none" />

      <text className={styles.nodeLab} x="40" y="124">SOURCE</text>
      <circle className={styles.hub} cx="210" cy="120" r="22" />
      <text className={styles.hubLab} x="210" y="124" textAnchor="middle">MODEL</text>

      {[60, 120, 180].map((y) => (
        <circle key={y} className={styles.state} cx="380" cy={y} r="5" />
      ))}
      <text className={styles.lab} x="392" y="64">PRINT</text>
      <text className={styles.lab} x="392" y="124">EPUB</text>
      <text className={styles.lab} x="392" y="184">WEB</text>
      <text className={styles.capt} x="40" y="214">one source · corrected once · reaches every edition</text>
    </svg>
  );
}

/* Locale-Aware — a component × locale audit matrix; fit / tight / overflow. */
function LocaleMotif() {
  const cols = ["EN", "FR", "DE", "AR", "JA"];
  type Cell = "ok" | "warn" | "fail";
  const rows: { label: string; cells: Cell[] }[] = [
    { label: "NAV", cells: ["ok", "warn", "fail", "ok", "ok"] },
    { label: "FORM", cells: ["ok", "ok", "ok", "warn", "ok"] },
    { label: "BTN", cells: ["ok", "warn", "ok", "ok", "ok"] },
  ];
  const mark: Record<Cell, string> = { ok: "✓", warn: "!", fail: "✕" };
  const cw = 58;
  const originX = 96;
  return (
    <svg className={styles.svg} viewBox="0 0 440 240" role="presentation">
      {cols.map((c, i) => (
        <text key={c} className={styles.lab} x={originX + i * cw + cw / 2} y="56" textAnchor="middle">
          {c}
        </text>
      ))}
      {rows.map((r, ri) => {
        const y = 92 + ri * 46;
        return (
          <g key={r.label}>
            <text className={styles.nodeLab} x="40" y={y + 4}>{r.label}</text>
            {r.cells.map((cell, ci) => (
              <g key={ci}>
                <rect
                  className={styles.cell}
                  x={originX + ci * cw - cw / 2 + 6}
                  y={y - 18}
                  width={cw - 12}
                  height="34"
                  rx="3"
                />
                <text
                  className={cell === "ok" ? styles.cellOk : styles.cellBad}
                  x={originX + ci * cw}
                  y={y + 5}
                  textAnchor="middle"
                >
                  {mark[cell]}
                </text>
              </g>
            ))}
          </g>
        );
      })}
      <text className={styles.capt} x="40" y="224">✓ fits · ! tight · ✕ overflows — caught in development</text>
    </svg>
  );
}

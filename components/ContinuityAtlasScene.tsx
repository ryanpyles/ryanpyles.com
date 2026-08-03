"use client";

import React from "react";
import Link from "next/link";
import ScrollScene, { mapRange, clamp01 } from "./ScrollScene";
import styles from "./ContinuityAtlasScene.module.css";

type GlyphKind = "cards" | "drift" | "bars" | "receipt" | "graph" | "rings";

const modules: { name: string; tag: string; glyph: GlyphKind }[] = [
  {
    name: "Story Memory",
    tag: "Motifs, secrets, and promises tracked as living entries — author-only facts stay hidden from AI output by default.",
    glyph: "cards",
  },
  {
    name: "Character Drift",
    tag: "A character is an ordered sequence of states, not one biography. Each chapter can carry different voice rules and guardrails.",
    glyph: "drift",
  },
  {
    name: "Voice Fingerprint",
    tag: "Voice measured as behavior — fragment frequency, sensory density, dialogue evasion — not described as a style.",
    glyph: "bars",
  },
  {
    name: "Rewrite Assist",
    tag: "Inspect before generate. A Context Receipt shows what is preserved, forbidden, and hidden before any rewrite fires.",
    glyph: "receipt",
  },
  {
    name: "Continuity Graph",
    tag: "Characters, events, places, and motifs as interconnected data — queried and validated across the whole book.",
    glyph: "graph",
  },
  {
    name: "AI Integration",
    tag: "Semantic retrieval gives the model visible, editable, trustworthy memory of the manuscript.",
    glyph: "rings",
  },
];

function Glyph({ kind }: { kind: GlyphKind }) {
  const s = styles.glyphStroke;
  const a = styles.glyphAccent;
  const d = styles.glyphDot;
  switch (kind) {
    case "cards":
      return (
        <svg viewBox="0 0 120 120" className={styles.glyph} aria-hidden="true">
          <rect x="26" y="30" width="60" height="44" rx="4" className={s} />
          <rect x="34" y="40" width="60" height="44" rx="4" className={s} />
          <rect x="42" y="50" width="60" height="44" rx="4" className={a} />
        </svg>
      );
    case "drift":
      return (
        <svg viewBox="0 0 120 120" className={styles.glyph} aria-hidden="true">
          <line x1="18" y1="60" x2="102" y2="60" className={s} />
          <circle cx="18" cy="60" r="5" className={s} />
          <circle cx="46" cy="60" r="5" className={s} />
          <rect x="69" y="51" width="18" height="18" transform="rotate(45 78 60)" className={a} />
          <circle cx="102" cy="60" r="5" className={s} />
        </svg>
      );
    case "bars":
      return (
        <svg viewBox="0 0 120 120" className={styles.glyph} aria-hidden="true">
          {[20, 55, 34, 72, 44, 62, 28].map((h, i) => (
            <line
              key={i}
              x1={22 + i * 13}
              y1={90}
              x2={22 + i * 13}
              y2={90 - h}
              className={i === 3 ? a : s}
            />
          ))}
        </svg>
      );
    case "receipt":
      return (
        <svg viewBox="0 0 120 120" className={styles.glyph} aria-hidden="true">
          <rect x="38" y="24" width="44" height="72" rx="3" className={s} />
          <line x1="46" y1="40" x2="74" y2="40" className={s} />
          <line x1="46" y1="52" x2="74" y2="52" className={s} />
          <line x1="46" y1="64" x2="66" y2="64" className={s} />
          <path d="M47 78 l6 6 l12 -14" className={a} />
        </svg>
      );
    case "graph":
      return (
        <svg viewBox="0 0 120 120" className={styles.glyph} aria-hidden="true">
          <line x1="60" y1="34" x2="30" y2="66" className={s} />
          <line x1="60" y1="34" x2="90" y2="66" className={s} />
          <line x1="30" y1="66" x2="60" y2="90" className={s} />
          <line x1="90" y1="66" x2="60" y2="90" className={s} />
          <line x1="30" y1="66" x2="90" y2="66" className={s} />
          <circle cx="60" cy="34" r="6" className={a} />
          <circle cx="30" cy="66" r="6" className={s} />
          <circle cx="90" cy="66" r="6" className={s} />
          <circle cx="60" cy="90" r="6" className={s} />
        </svg>
      );
    case "rings":
      return (
        <svg viewBox="0 0 120 120" className={styles.glyph} aria-hidden="true">
          <circle cx="60" cy="60" r="34" className={s} />
          <circle cx="60" cy="60" r="22" className={s} />
          <circle cx="60" cy="60" r="6" className={d} />
          <circle cx="94" cy="60" r="3.5" className={d} />
          <circle cx="60" cy="26" r="3.5" className={d} />
          <circle cx="34" cy="78" r="3.5" className={d} />
        </svg>
      );
  }
}

function StaticView() {
  return (
    <div className={styles.staticScene}>
      <header className={styles.staticHeader}>
        <span className={styles.kicker}>§ 05 · Narrative Intelligence System</span>
        <h2 className={styles.wordmark}>Continuity Atlas</h2>
        <p className={styles.introSub}>
          A visual story-memory architecture for authors working with AI.
        </p>
      </header>

      <ul className={styles.staticList}>
        {modules.map((m, i) => (
          <li key={m.name} className={styles.staticItem}>
            <div className={styles.staticGlyph}>
              <Glyph kind={m.glyph} />
            </div>
            <div>
              <span className={styles.focusIndex}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.focusName}>{m.name}</h3>
              <p className={styles.focusTag}>{m.tag}</p>
            </div>
          </li>
        ))}
      </ul>

      <Ctas />
    </div>
  );
}

function Ctas() {
  return (
    <div className={styles.cta}>
      <Link href="/projects/continuity-atlas" className={styles.ctaLink}>
        View the case study →
      </Link>
      <Link href="/projects/continuity-atlas#prototype" className={styles.ctaSecondary}>
        Open the prototype →
      </Link>
    </div>
  );
}

export default function ContinuityAtlasScene() {
  return (
    <ScrollScene
      id="continuity-atlas"
      ariaLabel="Continuity Atlas"
      heightVh={560}
      className={styles.root}
      contentClassName={styles.sticky}
    >
      {(progress, isStatic) => {
        if (isStatic) return <StaticView />;

        const introOpacity = 1 - mapRange(progress, 0.06, 0.14);
        const span = (0.9 - 0.14) / modules.length;
        const op = modules.map((_, i) => {
          const center = 0.14 + (i + 0.5) * span;
          return clamp01(1 - Math.abs(progress - center) / (span * 0.72));
        });
        let active = 0;
        op.forEach((o, i) => {
          if (o >= op[active]) active = i;
        });
        const ctaIn = mapRange(progress, 0.9, 1);

        return (
          <div className={styles.scene}>
            <div className={styles.top}>
              <span className={styles.kicker}>§ 05 · Narrative Intelligence System</span>
              <span className={styles.wordmarkSmall}>Continuity Atlas</span>
            </div>

            <div className={styles.center}>
              {/* Intro */}
              <div
                className={styles.intro}
                style={{ opacity: introOpacity, pointerEvents: introOpacity > 0.5 ? "auto" : "none" }}
              >
                <h2 className={styles.introHeading}>
                  Narrative intelligence for complex fiction.
                </h2>
                <p className={styles.introSub}>
                  A visual story-memory architecture for authors working with AI.
                  Keep scrolling to walk the system.
                </p>
              </div>

              {/* Module stage */}
              <div className={styles.stage} style={{ opacity: 1 - introOpacity }}>
                <div className={styles.focus}>
                  {modules.map((m, i) => (
                    <div
                      key={m.name}
                      className={styles.focusItem}
                      style={{ opacity: op[i] }}
                      aria-hidden={op[i] < 0.5}
                    >
                      <span className={styles.focusIndex}>
                        {String(i + 1).padStart(2, "0")} / 06
                      </span>
                      <h3 className={styles.focusName}>{m.name}</h3>
                      <p className={styles.focusTag}>{m.tag}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.visual}>
                  {modules.map((m, i) => (
                    <div
                      key={m.name}
                      className={styles.visualItem}
                      style={{ opacity: op[i], transform: `scale(${0.9 + op[i] * 0.1})` }}
                      aria-hidden="true"
                    >
                      <Glyph kind={m.glyph} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.bottom}>
              <ul className={styles.rail} aria-hidden="true">
                {modules.map((m, i) => (
                  <li
                    key={m.name}
                    className={styles.railItem}
                    data-active={active === i && introOpacity < 0.5}
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
              <div style={{ opacity: ctaIn, pointerEvents: ctaIn > 0.5 ? "auto" : "none" }}>
                <Ctas />
              </div>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}

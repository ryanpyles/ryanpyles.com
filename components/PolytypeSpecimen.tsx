"use client";

/**
 * Polytype Specimen — the site's typographic signature.
 *
 * Pick a script and the whole composition recomposes: writing direction flips,
 * the font stack changes, and the metrics (size, leading, tracking) are reset
 * — every value here is computed live by the real engine in lib/polytype
 * (`engine.resolve`, `engine.audit`), not hand-authored per script. The sample
 * strings are the vetted translations already used by the Polytype case study,
 * so nothing on screen is an invented translation.
 *
 * Non-Latin scripts render in the viewer's own system faces (Noto / PingFang /
 * Hiragino / David …) — which is exactly the font-fallback decision Polytype
 * exists to make, and the coverage strip names the hand-off honestly rather
 * than pretending a bespoke web font ships for every script.
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Polytype } from "@/lib/polytype";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./PolytypeSpecimen.module.css";

const engine = new Polytype({ defaultLocale: "en-US" });

interface Specimen {
  id: string;
  /** BCP-47 locale that drives the engine. */
  locale: string;
  /** The script's own name, in its own script — always a correct sample. */
  autonym: string;
  /** English label for the control. */
  label: string;
  /** `lang` attribute for the rendered text. */
  lang: string;
  /** A vetted sentence (reused from the Polytype case study). */
  sample: string;
  /** Short gloss of the sample, in English, for the caption. */
  gloss: string;
}

/* Scripts limited to those with a verified sample sentence and real system
   fallback. Hebrew and Arabic exercise RTL; Japanese mixes Han + Kana; German
   is Latin but shows locale-driven expansion against English. */
const SPECIMENS: Specimen[] = [
  {
    id: "latin",
    locale: "en-US",
    autonym: "Latin",
    label: "Latin · English",
    lang: "en",
    sample: "Multilingual systems, resolved before render.",
    gloss: "English — the source string.",
  },
  {
    id: "hebrew",
    locale: "he-IL",
    autonym: "עברית",
    label: "Hebrew",
    lang: "he",
    sample: "מערכות רב־לשוניות נפתרות לפני ההצגה.",
    gloss: "Hebrew — “Multilingual systems are resolved before display.”",
  },
  {
    id: "arabic",
    locale: "ar-SA",
    autonym: "العربية",
    label: "Arabic",
    lang: "ar",
    sample: "أنظمة متعددة اللغات تُحسم قبل العرض.",
    gloss: "Arabic — “Multilingual systems are settled before rendering.”",
  },
  {
    id: "japanese",
    locale: "ja-JP",
    autonym: "日本語",
    label: "Japanese",
    lang: "ja",
    sample: "多言語システムは描画前に解決される。",
    gloss: "Japanese — “Multilingual systems are resolved before drawing.”",
  },
  {
    id: "german",
    locale: "de-DE",
    autonym: "Deutsch",
    label: "German",
    lang: "de",
    sample: "Mehrsprachige Systeme, vor dem Rendern aufgelöst.",
    gloss: "German — the same sentence, ~30% longer than English.",
  },
];

export default function PolytypeSpecimen() {
  const [activeId, setActiveId] = useState<string>("hebrew");
  const [showOverlay, setShowOverlay] = useState(false);
  const reduced = usePrefersReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);

  const active = SPECIMENS.find((s) => s.id === activeId) ?? SPECIMENS[0];

  const policy = useMemo(
    () => engine.resolve({ locale: active.locale, contentType: "heading", sample: active.sample }),
    [active.locale, active.sample]
  );
  const bodyPolicy = useMemo(
    () => engine.resolve({ locale: active.locale, contentType: "body", sample: active.sample }),
    [active.locale, active.sample]
  );
  const audit = useMemo(() => engine.audit(active.sample), [active.sample]);

  const rtl = policy.direction === "rtl";

  // Roving-tabindex arrow-key navigation across the script controls.
  function onTabKey(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + SPECIMENS.length) % SPECIMENS.length;
    setActiveId(SPECIMENS[next].id);
    const btn = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next];
    btn?.focus();
  }

  return (
    <section className={styles.specimen} aria-labelledby="polytype-specimen-title">
      <header className={styles.head}>
        <p className={styles.kicker}>
          <span className={styles.kickerMark} aria-hidden="true">∑</span>
          Polytype · live specimen
        </p>
        <h2 id="polytype-specimen-title" className={styles.title}>
          One engine, every writing system.
        </h2>
        <p className={styles.lede}>
          A locale-aware typography engine. Choose a script and the composition
          recomposes — direction, font stack, and metrics are resolved in your
          browser by the real engine, not styled by hand.
        </p>
      </header>

      <div className={styles.frame} data-rtl={rtl}>
        {/* ── Script selector ─────────────────────────────────────── */}
        <div
          ref={tabsRef}
          className={styles.tabs}
          role="tablist"
          aria-label="Writing system"
          aria-orientation="horizontal"
        >
          {SPECIMENS.map((s, i) => {
            const selected = s.id === activeId;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                lang={s.lang}
                className={[styles.tab, selected ? styles.tabActive : ""].join(" ")}
                onClick={() => setActiveId(s.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                <span className={styles.tabAutonym}>{s.autonym}</span>
                <span className={styles.tabLabel}>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── The large-format display ────────────────────────────── */}
        <div className={styles.stage}>
          <div
            key={reduced ? undefined : active.id}
            className={[styles.display, reduced ? "" : styles.displayEnter].join(" ")}
            lang={active.lang}
            dir={policy.direction}
            style={{
              fontFamily: policy.fontFamily.join(", "),
              letterSpacing: `${policy.letterSpacing}em`,
              lineHeight: policy.lineHeight,
            }}
          >
            {active.autonym}
          </div>

          <p
            className={styles.sample}
            lang={active.lang}
            dir={bodyPolicy.direction}
            style={{
              fontFamily: bodyPolicy.fontFamily.join(", "),
              letterSpacing: `${bodyPolicy.letterSpacing}em`,
              lineHeight: bodyPolicy.lineHeight,
              textAlign: rtl ? "right" : "left",
            }}
          >
            {active.sample}
          </p>
          <p className={styles.gloss}>{active.gloss}</p>
        </div>

        {/* ── Inspectable layout decisions ────────────────────────── */}
        <div className={styles.readout}>
          <button
            className={styles.overlayToggle}
            aria-expanded={showOverlay}
            onClick={() => setShowOverlay((v) => !v)}
          >
            {showOverlay ? "Hide" : "Show"} layout decisions
            <span className={styles.toggleGlyph} aria-hidden="true">
              {showOverlay ? "−" : "+"}
            </span>
          </button>

          {showOverlay && (
            <div className={styles.overlay}>
              <dl className={styles.policyList}>
                {(
                  [
                    ["script", policy.script],
                    ["direction", policy.direction.toUpperCase()],
                    ["primary face", policy.fontFamily[0]],
                    ["size", `${policy.fontSize}px`],
                    ["line-height", String(policy.lineHeight)],
                    ["tracking", `${policy.letterSpacing}em`],
                    ["line-break", policy.lineBreak],
                    ["overflow", policy.overflowStrategy],
                  ] as [string, React.ReactNode][]
                ).map(([k, v]) => (
                  <div key={k} className={styles.policyRow}>
                    <dt className={styles.policyKey}>{k}</dt>
                    <dd className={styles.policyVal}>{v}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.coverage}>
                <span className={styles.coverageLabel}>Coverage</span>
                {audit.fallbacks.length > 0 ? (
                  <ul className={styles.fallbacks}>
                    {audit.fallbacks.map((f) => (
                      <li key={f} className={styles.fallback}>
                        {f}
                      </li>
                    ))}
                    <li className={styles.fallbackNote}>
                      Rendered by your system’s face for this script.
                    </li>
                  </ul>
                ) : (
                  <p className={styles.coverageClean}>
                    {audit.primary} covers this sample with no fallback.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className={styles.foot}>
        <Link href="/projects/polytype" className={styles.caseLink}>
          Open the Polytype case study →
        </Link>
        <span className={styles.footNote}>
          Deterministic · no model · computed on this page
        </span>
      </footer>
    </section>
  );
}

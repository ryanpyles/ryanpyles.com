"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Ae, withAe } from "./Ae";
import styles from "./VoigtProject.module.css";

// 10 viewports: 1000vh track, 900vh scroll room
// Scene map (progress 0→1):
//  0.00–0.08  portraits fade in united
//  0.08–0.18  split line grows
//  0.18–0.28  Ryan label + descriptor
//  0.28–0.38  Elian label + descriptor
//  0.38–0.46  transition: portraits shrink to header strip
//  0.46–0.54  dim 01 Naming
//  0.54–0.61  dim 02 Typography
//  0.61–0.67  dim 03 Publishing Strategy
//  0.67–0.73  dim 04 Book Design
//  0.73–0.79  dim 05 Worldbuilding
//  0.79–0.86  dim 06 Authorial Voice
//  0.86–1.00  exit / CTA
const STICKY_VIEWPORTS = 10;

const dimensions = [
  {
    id: "naming",
    num: "01",
    label: "Naming",
    note: "The construction of Elian Voigt as a literary identity distinct from the engineer who built it.",
    start: 0.46,
    end: 0.54,
  },
  {
    id: "typography",
    num: "02",
    label: "Typography",
    note: "Custom type systems for FORMÆTRIX — reading environments designed to slow the eye down.",
    start: 0.54,
    end: 0.61,
  },
  {
    id: "publishing",
    num: "03",
    label: "Publishing Strategy",
    note: "FORMÆTRIX as infrastructure, not imprint. Catalog logic over catalog sales.",
    start: 0.61,
    end: 0.67,
  },
  {
    id: "book-design",
    num: "04",
    label: "Book Design",
    note: "Object first. Each book is designed before it is written. Cover as constraint.",
    start: 0.67,
    end: 0.73,
  },
  {
    id: "worldbuilding",
    num: "05",
    label: "Worldbuilding",
    note: "A shared universe across titles — not by plot, but by recurring structural problems.",
    start: 0.73,
    end: 0.79,
  },
  {
    id: "authorial-voice",
    num: "06",
    label: "Authorial Voice",
    note: "What Voigt sounds like versus what Pyles writes. Convergence as a risk, not a goal.",
    start: 0.79,
    end: 0.86,
  },
];

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const mapRange = (v: number, a: number, b: number) =>
  easeInOut(clamp01((v - a) / (b - a)));

export default function VoigtProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const scrollRoom = window.innerHeight * (STICKY_VIEWPORTS - 1);
      setProgress(clamp01(-top / scrollRoom));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Portraits (united phase) ─────────────────────────────────────────────
  const portraitsIn    = mapRange(progress, 0.00, 0.08);
  const portraitsShift = mapRange(progress, 0.38, 0.46); // shrink into header strip
  const portraitScale  = 1 - 0.35 * portraitsShift;      // 1 → 0.65
  const portraitY      = -18 * portraitsShift;            // nudge up

  // ── Split line ───────────────────────────────────────────────────────────
  const splitIn  = mapRange(progress, 0.08, 0.18);
  const splitOut = mapRange(progress, 0.38, 0.44);
  const splitOpacity = splitIn * (1 - splitOut);

  // ── Ryan identity ────────────────────────────────────────────────────────
  const ryanIn  = mapRange(progress, 0.18, 0.28);
  const ryanOut = mapRange(progress, 0.38, 0.44);
  const ryanOpacity = ryanIn * (1 - ryanOut);
  const ryanY = (1 - ryanIn) * 32;

  // ── Elian identity ───────────────────────────────────────────────────────
  const elianIn  = mapRange(progress, 0.28, 0.38);
  const elianOut = mapRange(progress, 0.38, 0.44);
  const elianOpacity = elianIn * (1 - elianOut);
  const elianY = (1 - elianIn) * 32;

  // ── Case study header (appears as portraits shrink) ──────────────────────
  const headerIn = mapRange(progress, 0.42, 0.50);

  // ── Active dimension ─────────────────────────────────────────────────────
  const activeDimIndex = dimensions.findIndex(
    (d) => progress >= d.start && progress < d.end
  );
  // CTA at the end
  const ctaIn = mapRange(progress, 0.88, 1.0);

  return (
    <section className={styles.section} id="voigt" ref={sectionRef}>

      <div className={styles.stickyTrack}>
        <div className={styles.viewport}>

          {/* ── Phase 1–2: Two portraits united side by side ───────────── */}
          <div
            className={styles.portraits}
            style={{
              opacity: portraitsIn,
              transform: `scale(${portraitScale}) translateY(${portraitY}px)`,
            }}
          >
            <div className={styles.portrait}>
              <Image
                src="/images/ryan-pyles.png"
                alt="Ryan Pyles — engineer, architect"
                fill
                sizes="50vw"
                className={styles.portraitImg}
                priority
                unoptimized
              />
            </div>
            <div className={styles.portrait}>
              <Image
                src="/images/elian-voigt.png"
                alt="Elian Voigt — author"
                fill
                sizes="50vw"
                className={styles.portraitImg}
                priority
                unoptimized
              />
            </div>
          </div>

          {/* ── Phase 2: Split line ──────────────────────────────────────── */}
          <div
            className={styles.splitLine}
            style={{ opacity: splitOpacity, transform: `scaleY(${splitIn})` }}
            aria-hidden="true"
          />

          {/* ── Phase 3: Ryan panel ──────────────────────────────────────── */}
          <div
            className={`${styles.identityPanel} ${styles.identityLeft}`}
            style={{ opacity: ryanOpacity, transform: `translateY(${ryanY}px)` }}
          >
            <span className={styles.identityMono}>Ryan Pyles</span>
            <p className={styles.identityVerb}>builds<br />systems.</p>
            <p className={styles.identityNote}>Engineer · Architect · Chicago</p>
          </div>

          {/* ── Phase 4: Elian panel ─────────────────────────────────────── */}
          <div
            className={`${styles.identityPanel} ${styles.identityRight}`}
            style={{ opacity: elianOpacity, transform: `translateY(${elianY}px)` }}
          >
            <span className={styles.identityMono}>Elian Voigt</span>
            <p className={`${styles.identityVerb} ${styles.identityVerbSerif}`}>
              dismantles<br />them.
            </p>
            <p className={styles.identityNote}>Literary Fiction · Nine Novels</p>
          </div>

          {/* ── Phase 5+: Case study overlay ─────────────────────────────── */}
          <div
            className={styles.caseStudy}
            style={{ opacity: headerIn, pointerEvents: headerIn > 0.5 ? "auto" : "none" }}
          >
            {/* Section label */}
            <div className={styles.caseHeader}>
              <span className={styles.caseMono}>§ 04 · The Voigt Project</span>
              <h2 className={styles.caseHeading}>A Case Study in Identity</h2>
            </div>

            {/* Dimension list */}
            <div className={styles.dimList}>
              {dimensions.map((d, i) => {
                const isActive = i === activeDimIndex;
                const isPast = progress >= d.end;
                return (
                  <div
                    key={d.id}
                    className={`${styles.dim} ${isActive ? styles.dimActive : ""} ${isPast ? styles.dimPast : ""}`}
                  >
                    <span className={styles.dimNum}>{d.num}</span>
                    <div className={styles.dimBody}>
                      <span className={styles.dimLabel}>{d.label}</span>
                      <p className={styles.dimNote}>{withAe(d.note)}</p>
                    </div>
                    {isActive && <div className={styles.dimBar} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <div className={styles.cta} style={{ opacity: ctaIn }}>
            <a href="https://www.formaetrix.com" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
              FORM<Ae />TRIX →
            </a>
            <a href="https://www.formaetrix.com/imprint" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
              Elian Voigt →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

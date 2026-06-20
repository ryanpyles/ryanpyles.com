"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Ae } from "./Ae";
import styles from "./VoigtProject.module.css";

// Scene map — 10 sticky viewports (1000vh):
//  0.00–0.10  full diptych fades in (united)
//  0.10–0.35  halves slide apart; center gap opens
//  0.35–0.46  identity labels appear in each half
//  0.42–0.50  identity labels fade; case study header appears in gap
//  0.50–0.59  dim 01 — Naming
//  0.59–0.68  dim 02 — Voice
//  0.68–0.77  dim 03 — Typography
//  0.77–0.86  dim 04 — Constraint
//  0.86–0.96  dim 05 — The risk
//  0.96–1.00  CTA
const STICKY_VIEWPORTS = 10;
const MAX_GAP_VW = 20; // each half shifts 10vw; total gap = 20vw

const dimensions = [
  {
    id: "naming",
    num: "01",
    label: "Naming",
    ryan:  { heading: "Ryan J. Pyles",   note: "A proper name. A real person. Engineer, Chicago." },
    elian: { heading: "Elian Voigt",     note: "A constructed identity. A literary voice. No fixed address." },
    start: 0.50, end: 0.59,
  },
  {
    id: "voice",
    num: "02",
    label: "Voice",
    ryan:  { heading: "Declarative",     note: "Problem → approach → outcome. Precision over warmth." },
    elian: { heading: "Oblique",         note: "Structure first. Meaning emergent. The text never explains itself." },
    start: 0.59, end: 0.68,
  },
  {
    id: "typography",
    num: "03",
    label: "Typography",
    ryan:  { heading: "IBM Plex Mono",   note: "Systems-first. A typeface that belongs to infrastructure." },
    elian: { heading: "EB Garamond",     note: "Designed to slow the eye. Warmth through historical weight." },
    start: 0.68, end: 0.77,
  },
  {
    id: "constraint",
    num: "04",
    label: "Constraint",
    ryan:  { heading: "Minimum viable",  note: "Only what the structure requires. Every abstraction earns its place." },
    elian: { heading: "Generator",       note: "Not a limit. The source of strangeness — what remains when everything else is removed." },
    start: 0.77, end: 0.86,
  },
  {
    id: "risk",
    num: "05",
    label: "The risk",
    ryan:  { heading: "Convergence",     note: "When the engineer starts to sound like the author, the distinction collapses." },
    elian: { heading: "Convergence",     note: "When the author starts to sound like the engineer, the strangeness disappears." },
    start: 0.86, end: 0.96,
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

  // ── Phase 1: Diptych fade-in ──────────────────────────────────────────────
  const diptychIn = mapRange(progress, 0.00, 0.10);

  // ── Phase 2: Halves slide apart ───────────────────────────────────────────
  const splitProgress = mapRange(progress, 0.10, 0.35);
  const halfShiftVw   = splitProgress * (MAX_GAP_VW / 2); // 0 → 10vw per side
  const gapVw         = halfShiftVw * 2;                  // 0 → 20vw total

  // ── Phase 3: Identity labels ──────────────────────────────────────────────
  const identityIn  = mapRange(progress, 0.35, 0.44);
  const identityOut = mapRange(progress, 0.43, 0.49);
  const identityOpacity = identityIn * (1 - identityOut);

  // ── Phase 4: Case study header + portrait dimming ─────────────────────────
  const caseHeaderIn = mapRange(progress, 0.44, 0.52);
  const portraitDim  = mapRange(progress, 0.40, 0.52); // 0 → 1 (dims portrait brightness)

  // ── Active dimension ──────────────────────────────────────────────────────
  const activeDimIndex = dimensions.findIndex(
    (d) => progress >= d.start && progress < d.end
  );

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaIn = mapRange(progress, 0.93, 1.0);

  const ryanBrightness  = 1 - 0.50 * portraitDim;  // 1 → 0.50
  const elianBrightness = (1 - 0.40 * portraitDim) * 0.92; // slightly dimmer base

  return (
    <section className={styles.section} id="voigt" ref={sectionRef}>
      <div className={styles.stickyTrack}>
        <div className={styles.viewport}>

          {/* ── Diptych ──────────────────────────────────────────────────── */}
          <div className={styles.diptych} style={{ opacity: diptychIn }}>

            {/* Left half — Ryan */}
            <div
              className={`${styles.half} ${styles.halfLeft}`}
              style={{ transform: `translateX(-${halfShiftVw}vw)` }}
            >
              <Image
                src="/images/ryan-pyles.png"
                alt="Ryan Pyles — engineer, architect"
                fill
                sizes="50vw"
                className={styles.portraitImg}
                style={{
                  objectFit: "cover",
                  objectPosition: "left 30%",
                  filter: `brightness(${ryanBrightness})`,
                  transition: "filter 600ms ease",
                }}
                priority
                unoptimized
              />
              <div className={styles.gradientLeft} style={{ opacity: caseHeaderIn }} />

              {/* Identity label */}
              <div className={styles.identityLeft} style={{ opacity: identityOpacity }}>
                <span className={styles.identityMono}>Ryan Pyles</span>
                <p className={styles.identityVerb}>builds<br />systems.</p>
                <p className={styles.identityNote}>Engineer · Architect · Chicago</p>
              </div>

              {/* Per-dimension content */}
              {dimensions.map((d, i) => (
                <div
                  key={d.id}
                  className={styles.dimHalf}
                  style={{ opacity: i === activeDimIndex ? 1 : 0 }}
                  aria-hidden={i !== activeDimIndex}
                >
                  <span className={styles.dimHalfHeading}>{d.ryan.heading}</span>
                  <p className={styles.dimHalfNote}>{d.ryan.note}</p>
                </div>
              ))}
            </div>

            {/* Center gap — holds section label + dimension number/label */}
            <div
              className={styles.centerGap}
              style={{
                left:  `calc(50% - ${halfShiftVw}vw)`,
                width: `${gapVw}vw`,
              }}
            >
              <div
                className={styles.gapContent}
                style={{
                  opacity: caseHeaderIn,
                  transform: `translateY(${(1 - caseHeaderIn) * 18}px)`,
                }}
              >
                <span className={styles.gapMono}>§ 04 · The Voigt Project</span>
                <h2 className={styles.gapTitle}>A Case Study<br />in Identity</h2>
              </div>

              {dimensions.map((d, i) => (
                <div
                  key={d.id}
                  className={styles.dimCenter}
                  style={{ opacity: i === activeDimIndex ? 1 : 0 }}
                  aria-hidden={i !== activeDimIndex}
                >
                  <span className={styles.dimCenterNum}>{d.num}</span>
                  <span className={styles.dimCenterLabel}>{d.label}</span>
                </div>
              ))}

              <div className={styles.seamLine} />
            </div>

            {/* Right half — Elian */}
            <div
              className={`${styles.half} ${styles.halfRight}`}
              style={{ transform: `translateX(${halfShiftVw}vw)` }}
            >
              <Image
                src="/images/elian-voigt.png"
                alt="Elian Voigt — author"
                fill
                sizes="50vw"
                className={styles.portraitImg}
                style={{
                  objectFit: "cover",
                  objectPosition: "right 30%",
                  filter: `brightness(${elianBrightness})`,
                  transition: "filter 600ms ease",
                }}
                priority
                unoptimized
              />
              <div className={styles.gradientRight} style={{ opacity: caseHeaderIn }} />

              {/* Identity label */}
              <div className={styles.identityRight} style={{ opacity: identityOpacity }}>
                <span className={styles.identityMono}>Elian Voigt</span>
                <p className={`${styles.identityVerb} ${styles.identityVerbSerif}`}>
                  dismantles<br />them.
                </p>
                <p className={styles.identityNote}>Literary Fiction · Nine Novels</p>
              </div>

              {/* Per-dimension content */}
              {dimensions.map((d, i) => (
                <div
                  key={d.id}
                  className={`${styles.dimHalf} ${styles.dimHalfRight}`}
                  style={{ opacity: i === activeDimIndex ? 1 : 0 }}
                  aria-hidden={i !== activeDimIndex}
                >
                  <span className={styles.dimHalfHeading}>{d.elian.heading}</span>
                  <p className={styles.dimHalfNote}>{d.elian.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ────────────────────────────────────────────────────────── */}
          <div
            className={styles.cta}
            style={{ opacity: ctaIn, pointerEvents: ctaIn > 0.5 ? "auto" : "none" }}
          >
            <a
              href="https://www.formaetrix.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLink}
            >
              FORM<Ae />TRIX →
            </a>
            <a
              href="https://www.formaetrix.com/imprint"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLink}
            >
              Elian Voigt →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

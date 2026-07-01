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
const MAX_GAP_VW = 20;

const dimensions = [
  {
    id: "naming",
    num: "01",
    label: "Naming",
    ryan: {
      heading: "Ryan J. Pyles",
      code: `const identity = {\n  name: "ryan.pyles",\n  role: "maker",\n  city: "chicago",\n  status: "active",\n};`,
    },
    elian: {
      heading: "Elian Voigt",
      note: "A constructed identity. A literary voice. No fixed address.",
    },
    start: 0.50, end: 0.59,
  },
  {
    id: "voice",
    num: "02",
    label: "Voice",
    ryan: {
      heading: "Declarative",
      code: `fn approach(\n  problem: Problem\n) -> Outcome {\n  problem\n    .decompose()\n    .map(resolve)\n    .collect()\n}`,
    },
    elian: {
      heading: "Oblique",
      note: "Structure first. Meaning emergent. The text never explains itself.",
    },
    start: 0.59, end: 0.68,
  },
  {
    id: "typography",
    num: "03",
    label: "Typography",
    ryan: {
      heading: "IBM Plex Mono",
      code: `/* systems infrastructure */\nfont-family: "IBM Plex Mono";\nfont-weight: 400;\nletter-spacing: 0.08em;\nrendering: gridded;`,
    },
    elian: {
      heading: "EB Garamond",
      note: "Designed to slow the eye. Warmth through historical weight.",
    },
    start: 0.68, end: 0.77,
  },
  {
    id: "constraint",
    num: "04",
    label: "Constraint",
    ryan: {
      heading: "Minimum viable",
      code: `// only what the structure requires\nfunction build(input) {\n  return input\n    .strip(redundant)\n    .verify()\n    .ship();\n}`,
    },
    elian: {
      heading: "Generator",
      note: "Not a limit. The source of strangeness — what remains when everything else is removed.",
    },
    start: 0.77, end: 0.86,
  },
  {
    id: "risk",
    num: "05",
    label: "The risk",
    ryan: {
      heading: "Convergence",
      code: `if (engineer === author) {\n  // the distinction\n  // collapses here\n  boundary.dissolve();\n}`,
    },
    elian: {
      heading: "Convergence",
      note: "When the author sounds like the engineer, the strangeness disappears.",
    },
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
  const [terminalText, setTerminalText] = useState("");
  const [elianText, setElianText]       = useState("");
  const termTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const elianTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elianDelayRef = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const prevDimRef    = useRef(-2);

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
  const halfShiftVw   = splitProgress * (MAX_GAP_VW / 2);
  const gapVw         = halfShiftVw * 2;

  // ── Phase 3: Identity labels ──────────────────────────────────────────────
  const identityIn  = mapRange(progress, 0.35, 0.44);
  const identityOut = mapRange(progress, 0.43, 0.49);
  const identityOpacity = identityIn * (1 - identityOut);

  // ── Phase 4: Case study header + portrait dimming ─────────────────────────
  const caseHeaderIn = mapRange(progress, 0.44, 0.52);
  const portraitDim  = mapRange(progress, 0.40, 0.52);

  // ── Active dimension ──────────────────────────────────────────────────────
  const activeDimIndex = dimensions.findIndex(
    (d) => progress >= d.start && progress < d.end
  );

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaIn = mapRange(progress, 0.93, 1.0);

  const ryanBrightness  = 1 - 0.50 * portraitDim;
  const elianBrightness = (1 - 0.40 * portraitDim) * 0.92;

  // ── Typewriter animations ─────────────────────────────────────────────────
  useEffect(() => {
    if (activeDimIndex === prevDimRef.current) return;
    prevDimRef.current = activeDimIndex;

    if (termTimerRef.current)  clearInterval(termTimerRef.current);
    if (elianTimerRef.current) clearInterval(elianTimerRef.current);
    if (elianDelayRef.current) clearTimeout(elianDelayRef.current);

    if (activeDimIndex < 0) {
      setTerminalText("");
      setElianText("");
      return;
    }

    const dim  = dimensions[activeDimIndex];
    const code = dim.ryan.code;
    const note = dim.elian.note;

    setTerminalText("");
    setElianText("");

    let ci = 0;
    termTimerRef.current = setInterval(() => {
      ci++;
      setTerminalText(code.slice(0, ci));
      if (ci >= code.length) clearInterval(termTimerRef.current!);
    }, 18);

    elianDelayRef.current = setTimeout(() => {
      let ei = 0;
      elianTimerRef.current = setInterval(() => {
        ei++;
        setElianText(note.slice(0, ei));
        if (ei >= note.length) clearInterval(elianTimerRef.current!);
      }, 32);
    }, 350);

    return () => {
      if (termTimerRef.current)  clearInterval(termTimerRef.current);
      if (elianTimerRef.current) clearInterval(elianTimerRef.current);
      if (elianDelayRef.current) clearTimeout(elianDelayRef.current);
    };
  }, [activeDimIndex]);

  const activeDim  = activeDimIndex >= 0 ? dimensions[activeDimIndex] : null;
  const dimOpacity = activeDimIndex >= 0 ? 1 : 0;

  return (
    <section className={styles.section} id="voigt" ref={sectionRef}>
      <div className={styles.stickyTrack}>
        <div className={styles.viewport}>

          {/* ── Diptych ──────────────────────────────────────────────────── */}
          <div className={styles.diptych} style={{ opacity: diptychIn }}>

            {/* Left half — image + gradient only */}
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
                loading="lazy"
              />
              <div className={styles.gradientLeft} style={{ opacity: caseHeaderIn }} />
            </div>

            {/* Center gap */}
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

            {/* Right half — image + gradient only */}
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
                loading="lazy"
              />
              <div className={styles.gradientRight} style={{ opacity: caseHeaderIn }} />
            </div>

            {/* ── Text overlays — direct children of .diptych so they          */}
            {/*    position relative to the full viewport, not the shifted halves */}

            {/* Identity label — left */}
            <div className={styles.identityLeft} style={{ opacity: identityOpacity }}>
              <span className={styles.identityMono}>Ryan Pyles</span>
              <p className={styles.identityVerb}>builds<br />systems.</p>
              <p className={styles.identityNote}>Engineer · Architect · Chicago</p>
            </div>

            {/* Identity label — right */}
            <div className={styles.identityRight} style={{ opacity: identityOpacity }}>
              <span className={styles.identityMono}>Elian Voigt</span>
              <p className={`${styles.identityVerb} ${styles.identityVerbSerif}`}>
                dismantles<br />them.
              </p>
              <p className={styles.identityNote}>Literary Fiction · Six Novels</p>
            </div>

            {/* Terminal — Ryan's side */}
            <div
              className={styles.dimHalf}
              style={{ opacity: dimOpacity }}
              aria-hidden={!activeDim}
            >
              {activeDim && (
                <>
                  <span className={styles.dimHalfLabel}>{activeDim.ryan.heading}</span>
                  <div className={styles.terminalWindow}>
                    <div className={styles.terminalBar}>
                      <span className={styles.terminalDot} />
                      <span className={styles.terminalDot} />
                      <span className={styles.terminalDot} />
                    </div>
                    <div className={styles.terminalBody}>
                      <pre className={styles.terminalCode}>
                        {terminalText}
                        <span className={styles.terminalCursor} aria-hidden="true" />
                      </pre>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Handwritten EB Garamond — Elian's side */}
            <div
              className={`${styles.dimHalf} ${styles.dimHalfRight}`}
              style={{ opacity: dimOpacity }}
              aria-hidden={!activeDim}
            >
              {activeDim && (
                <>
                  <span className={styles.dimHalfHeading}>{activeDim.elian.heading}</span>
                  <p className={styles.dimHalfNote}>{elianText}</p>
                </>
              )}
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
              aria-label="Visit FORMÆTRIX — the studio site"
            >
              FORM<Ae />TRIX →
            </a>
            <a
              href="https://www.elianvoigt.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLink}
              aria-label="Visit Elian Voigt — the fiction site"
            >
              Elian Voigt →
            </a>
          </div>

        </div>
      </div>

      {/* ── Mobile showcase — vertical compare/contrast narrative ──────────── */}
      {/*    The horizontal diptych can't survive a narrow portrait viewport,   */}
      {/*    so phones get the full concept as a stacked sequence instead.      */}
      <div className={styles.mobileShowcase}>
        <header className={styles.mShowHeader}>
          <span className={styles.mShowKicker}>§ 04 · The Voigt Project</span>
          <h2 className={styles.mShowTitle}>A Case Study in Identity</h2>
          <p className={styles.mShowIntro}>
            One maker, two voices. Ryan Pyles builds systems; Elian Voigt
            dismantles them. Five dimensions where the engineer and the author
            diverge.
          </p>
        </header>

        {/* Dimensions as a dossier — collapsed by default; tap to open */}
        {dimensions.map((d) => (
          <details key={d.id} className={styles.mSpread}>
            <summary className={styles.mSummary}>
              <span className={styles.mDimNum}>{d.num}</span>
              <span className={styles.mDimLabel}>{d.label}</span>
              <span className={styles.mChevron} aria-hidden="true" />
            </summary>

            <div className={styles.mSpreadBody}>
              {/* Ryan — terminal */}
              <div className={styles.mRyan}>
                <span className={styles.mPaneName}>Ryan Pyles</span>
                <span className={styles.mRyanHeading}>{d.ryan.heading}</span>
                <div className={styles.terminalWindow}>
                  <div className={styles.terminalBar}>
                    <span className={styles.terminalDot} />
                    <span className={styles.terminalDot} />
                    <span className={styles.terminalDot} />
                  </div>
                  <div className={styles.terminalBody}>
                    <pre className={styles.terminalCode}>
                      {d.ryan.code}
                      <span className={styles.terminalCursor} aria-hidden="true" />
                    </pre>
                  </div>
                </div>
              </div>

              {/* Elian — handwriting */}
              <div className={styles.mElian}>
                <span className={styles.mPaneNameDark}>Elian Voigt</span>
                <span className={styles.mElianHeading}>{d.elian.heading}</span>
                <p className={styles.mElianNote}>{d.elian.note}</p>
              </div>
            </div>
          </details>
        ))}

        <div className={styles.mCta}>
          <a
            href="https://www.formaetrix.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
            aria-label="Visit FORMÆTRIX — the studio site"
          >
            FORM<Ae />TRIX →
          </a>
          <a
            href="https://www.elianvoigt.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
            aria-label="Visit Elian Voigt — the fiction site"
          >
            Elian Voigt →
          </a>
        </div>
      </div>
    </section>
  );
}

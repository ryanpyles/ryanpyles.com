"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { Ae, withAe } from "./Ae";
import VoigtDuel from "./VoigtDuel";
import styles from "./VoigtProject.module.css";

const STICKY_VIEWPORTS = 5; // 500vh track → 400vh of scroll room for scenes

const dimensions = [
  {
    id: "naming",
    label: "Naming",
    note: "The construction of Elian Voigt as a literary identity distinct from the engineer who built it.",
  },
  {
    id: "typography",
    label: "Typography",
    note: "Custom type systems for FORMÆTRIX — reading environments designed to slow the eye down.",
  },
  {
    id: "publishing",
    label: "Publishing Strategy",
    note: "FORMÆTRIX as infrastructure, not imprint. Catalog logic over catalog sales.",
  },
  {
    id: "book-design",
    label: "Book Design",
    note: "Object first. Each book is designed before it is written. Cover as constraint.",
  },
  {
    id: "worldbuilding",
    label: "Worldbuilding",
    note: "A shared universe across titles — not by plot, but by recurring structural problems.",
  },
  {
    id: "authorial-voice",
    label: "Authorial Voice",
    note: "What Voigt sounds like versus what Pyles writes. Convergence as a risk, not a goal.",
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
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const onScroll = () => {
      if (rafRef.current !== undefined) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = undefined;
        const el = sectionRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        const scrollRoom = window.innerHeight * (STICKY_VIEWPORTS - 1);
        setProgress(clamp01(-top / scrollRoom));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Scene values ─────────────────────────────────────────────────────────
  const bgOpacity = mapRange(progress, 0, 0.10);
  const bgScale   = 1 + 0.06 * (1 - mapRange(progress, 0, 0.16));

  const labelOpacity = mapRange(progress, 0.09, 0.22);
  const labelY       = (1 - mapRange(progress, 0.09, 0.22)) * -24;

  const splitScale = mapRange(progress, 0.20, 0.36);

  const panelsFadeOut = mapRange(progress, 0.62, 0.72);
  const leftOpacity   = mapRange(progress, 0.30, 0.44) * (1 - panelsFadeOut);
  const leftY         = (1 - mapRange(progress, 0.30, 0.44)) * 40;
  const rightOpacity  = mapRange(progress, 0.42, 0.56) * (1 - panelsFadeOut);
  const rightY        = (1 - mapRange(progress, 0.42, 0.56)) * 40;

  const manifestoOpacity =
    mapRange(progress, 0.66, 0.78) * (1 - mapRange(progress, 0.86, 0.94));

  const ctaOpacity = mapRange(progress, 0.90, 1.0);

  return (
    <section className={styles.section} id="voigt" ref={sectionRef}>

      {/* ── Sticky scroll track — 500vh gives the viewport its scroll room ── */}
      <div className={styles.stickyTrack}>
        <div className={styles.viewport}>

          {/* Portrait background */}
          <div
            className={styles.bg}
            style={{
              position: "absolute",
              opacity: bgOpacity,
              transform: `scale(${bgScale})`,
            }}
          >
            <Image
              src="/images/ryan-pyles-elian-voigt.png"
              alt="Ryan Pyles · Elian Voigt — engineer and author"
              fill
              sizes="100vw"
              className={styles.bgImg}
              priority
            />
          </div>

          {/* Scene 1: Section label */}
          <div
            className={styles.stamp}
            style={{ opacity: labelOpacity, transform: `translateY(${labelY}px)` }}
          >
            <span className={styles.kickerOverlay}>§ 04</span>
            <h2 className={styles.headingOverlay}>The Voigt Project</h2>
          </div>

          {/* Scene 2: Split line */}
          <div
            className={styles.splitLine}
            style={{ transform: `scaleY(${splitScale})` }}
            aria-hidden="true"
          />

          {/* Scene 3: Left identity */}
          <div
            className={`${styles.panel} ${styles.panelLeft}`}
            style={{ opacity: leftOpacity, transform: `translateY(${leftY}px)` }}
          >
            <span className={styles.panelLabel}>Ryan Pyles</span>
            <p className={styles.panelVerb}>
              builds<br />systems.
            </p>
            <p className={styles.panelSub}>Engineer · Architect · Chicago</p>
          </div>

          {/* Scene 4: Right identity */}
          <div
            className={`${styles.panel} ${styles.panelRight}`}
            style={{ opacity: rightOpacity, transform: `translateY(${rightY}px)` }}
          >
            <span className={styles.panelLabel}>Elian Voigt</span>
            <p className={styles.panelVerb}>
              dismantles<br />them.
            </p>
            <p className={styles.panelSub}>Literary Fiction · Nine Novels</p>
          </div>

          {/* Scene 5: Manifesto overlay */}
          <div
            className={styles.manifesto}
            style={{ opacity: manifestoOpacity }}
            aria-hidden="true"
          >
            <p className={styles.manifestoText}>
              One writes software. The other writes novels about what happens
              when systems become indistinguishable from belief.
            </p>
            <p className={styles.manifestoSub}>
              The deliberate construction of a literary identity — not biography,
              but design.
            </p>
          </div>

          {/* Scene 6: Enter the duel hint */}
          <div className={styles.scrollHint} style={{ opacity: ctaOpacity }}>
            <span className={styles.scrollHintArrow} aria-hidden="true">↓</span>
            <span className={styles.scrollHintLabel}>Enter the duel</span>
          </div>

        </div>
      </div>

      {/* ── Below-fold content — scrolls in after sticky releases ─────────── */}
      <div className={styles.inner}>
        <div className={styles.innerWrap}>

          <Reveal>
            <VoigtDuel />
          </Reveal>

          <div className={styles.dimensions}>
            {dimensions.map((d, i) => (
              <Reveal key={d.id} delay={i * 50}>
                <div className={styles.dimension}>
                  <span className={styles.dimensionNumber}>0{i + 1}</span>
                  <div className={styles.dimensionContent}>
                    <h3 className={styles.dimensionLabel}>{d.label}</h3>
                    <p className={styles.dimensionNote}>{withAe(d.note)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={380}>
            <div className={styles.links}>
              <a
                href="https://www.formaetrix.com"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                FORM<Ae />TRIX →
              </a>
              <a
                href="https://www.formaetrix.com/imprint"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Elian Voigt →
              </a>
            </div>
          </Reveal>

        </div>
      </div>

    </section>
  );
}

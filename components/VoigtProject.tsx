"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { Ae, withAe } from "./Ae";
import VoigtDuel from "./VoigtDuel";
import styles from "./VoigtProject.module.css";

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

export default function VoigtProject() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} id="voigt">

      {/* ── Full-viewport image panel ──────────────────────────────── */}
      <div className={styles.viewport} ref={viewportRef}>

        {/* Background image — fades + scales in on scroll */}
        <div
          className={`${styles.bg} ${revealed ? styles.bgIn : ""}`}
          style={{ position: "absolute" }}
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

        {/* Section label — top left */}
        <div className={`${styles.stamp} ${revealed ? styles.stampIn : ""}`}>
          <span className={styles.kickerOverlay}>§ 04</span>
          <h2 className={styles.headingOverlay}>The Voigt Project</h2>
        </div>

        {/* Center divider line matching image split */}
        <div className={`${styles.splitLine} ${revealed ? styles.splitLineIn : ""}`} aria-hidden="true" />

        {/* Identity panels anchored to bottom */}
        <div className={`${styles.panels} ${revealed ? styles.panelsIn : ""}`}>

          <div className={`${styles.panel} ${styles.panelLeft}`}>
            <span className={styles.panelLabel}>Ryan Pyles</span>
            <p className={styles.panelVerb}>builds<br />systems.</p>
            <p className={styles.panelSub}>Engineer · Architect · Chicago</p>
          </div>

          <div className={`${styles.panel} ${styles.panelRight}`}>
            <span className={styles.panelLabel}>Elian Voigt</span>
            <p className={styles.panelVerb}>dismantles<br />them.</p>
            <p className={styles.panelSub}>Literary Fiction · Nine Novels</p>
          </div>

        </div>
      </div>

      {/* ── Below-fold prose — scrolls over the sticky image ──────── */}
      <div className={styles.inner}>
        <div className={styles.innerWrap}>

          <Reveal>
            <p className={styles.description}>
              One writes software. The other writes novels about what happens when systems
              become indistinguishable from belief. This section documents the deliberate
              construction of a literary identity — not biography, but design.
            </p>
          </Reveal>

          <Reveal delay={60}>
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

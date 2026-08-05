"use client";

import React, { useEffect, useRef, useState } from "react";
import LanguageOrrery from "./LanguageOrrery";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./LanguageOrreryScene.module.css";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const annotations = [
  {
    at: 0.0,
    title: "Twelve languages, one system",
    body: "A living map of everything I am learning to hold at once.",
  },
  {
    at: 0.3,
    title: "Distance is not difficulty",
    body: "Each language orbits by how I hold it — not by how hard it is.",
  },
  {
    at: 0.55,
    title: "Fluency at the center",
    body: "The inner orbit is fluent ground. Further out: working knowledge, then pure curiosity.",
  },
  {
    at: 0.8,
    title: "Open the notebooks",
    body: "Hover any node for its bearings. Click one to open its study notebook.",
  },
];

export default function LanguageOrreryScene() {
  const reducedMotion = usePrefersReducedMotion();
  const [staticMode, setStaticMode] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [annIndex, setAnnIndex] = useState(0);
  const zoomRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const lastIdx = useRef(-1);

  useEffect(() => {
    // Pin + zoom on mobile too now; only reduced motion falls back to the plain
    // interactive orrery.
    const isStatic = reducedMotion;
    setStaticMode(isStatic);
    if (isStatic) {
      zoomRef.current = 1;
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const travel = el.offsetHeight - window.innerHeight;
      const p = clamp01(travel > 0 ? -top / travel : 0);
      zoomRef.current = p;

      let idx = 0;
      for (let i = 0; i < annotations.length; i += 1) {
        if (p >= annotations[i].at) idx = i;
      }
      if (idx !== lastIdx.current) {
        lastIdx.current = idx;
        setAnnIndex(idx);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (staticMode) {
    return <LanguageOrrery />;
  }

  return (
    <div ref={trackRef} className={styles.track} style={{ height: "360vh" }}>
      <div className={styles.sticky}>
        <LanguageOrrery scrollZoomRef={zoomRef} hideCaption />

        <div className={styles.overlay} aria-hidden="true">
          <div className={styles.annotations}>
            {annotations.map((a, i) => (
              <div
                key={a.title}
                className={styles.annotation}
                data-active={i === annIndex}
              >
                <p className={styles.annEyebrow}>The Language Orrery</p>
                <h3 className={styles.annTitle}>{a.title}</h3>
                <p className={styles.annBody}>{a.body}</p>
              </div>
            ))}
          </div>

          <div
            className={styles.scrollHint}
            data-hide={annIndex >= annotations.length - 1}
          >
            Scroll to explore ↓
          </div>
        </div>
      </div>
    </div>
  );
}

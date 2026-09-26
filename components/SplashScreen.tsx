"use client";

import { useEffect, useRef, useState } from "react";
import SelfDrawingSvg from "./SelfDrawingSvg";
import styles from "./SplashScreen.module.css";

type Phase = "visible" | "exiting" | "gone";

/**
 * Intro splash — a line-drawing portrait that inks itself in as the welcome,
 * then the overlay turns away like the first page of a book to reveal the site.
 * Shown once per session (keyed on sessionStorage). Exit is driven by the
 * drawing finishing, with a hard cap so it can never hang.
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("visible");
  const [skip, setSkip] = useState(false);
  const holdRef = useRef<ReturnType<typeof setTimeout>>();

  // Already opened this session → never show.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("archive-opened")) setSkip(true);
    } catch {
      /* sessionStorage blocked — show the intro */
    }
  }, []);

  const beginExit = () =>
    setPhase((p) => (p === "visible" ? "exiting" : p));

  const finish = () => {
    setPhase("gone");
    try {
      sessionStorage.setItem("archive-opened", "1");
    } catch {
      /* ignore */
    }
  };

  // Hard cap: never let the intro outstay its welcome, even if the asset stalls.
  useEffect(() => {
    if (skip || phase !== "visible") return;
    const cap = setTimeout(beginExit, 6500);
    return () => clearTimeout(cap);
  }, [skip, phase]);

  useEffect(() => () => clearTimeout(holdRef.current), []);

  if (skip || phase === "gone") return null;

  return (
    <div
      className={styles.overlay}
      data-phase={phase}
      aria-hidden="true"
      onAnimationEnd={() => {
        if (phase === "exiting") finish();
      }}
    >
      <div className={styles.annotations}>
        <span className={styles.chip}>64°08′ N, 21°56′ W</span>
        <span className={styles.chip}>fn. 014 — see Voigt, 2019</span>
        <span className={styles.chip}>syntax</span>
      </div>

      <div className={styles.center}>
        <div className={styles.portrait}>
          <SelfDrawingSvg
            src="/images/Seatedpose.svg"
            label="Ink line-drawing portrait of Ryan Pyles, seated"
            variant="ink-fill"
            aspect="1168 / 1563"
            autoStart
            drawMs={2200}
            fillMs={700}
            onDone={() => {
              holdRef.current = setTimeout(beginExit, 650);
            }}
          />
        </div>
        <span className={styles.name}>Ryan J. Pyles</span>
        <span className={styles.label}>Opening the archive</span>
      </div>

      <div className={styles.bottom}>
        <span className={styles.rule} />
        <span className={styles.footnote}>Chicago · Author · Engineer · Linguist</span>
        <span className={styles.rule} />
      </div>
    </div>
  );
}

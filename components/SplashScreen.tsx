"use client";

import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";

type Phase = "visible" | "exiting" | "gone";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("archive-opened")) {
      setPhase("gone");
      return;
    }

    const t1 = setTimeout(() => setPhase("exiting"), 2200);
    const t2 = setTimeout(() => {
      setPhase("gone");
      sessionStorage.setItem("archive-opened", "1");
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={styles.overlay} data-phase={phase} aria-hidden="true">
      <div className={styles.annotations}>
        <span className={styles.chip}>64°08′ N, 21°56′ W</span>
        <span className={styles.chip}>fn. 014 — see Voigt, 2019</span>
        <span className={styles.chip}>syntax</span>
      </div>

      <div className={styles.center}>
        <span className={styles.glyph}>§</span>
        <span className={styles.name}>Ryan J. Pyles</span>
        <span className={styles.label}>Opening the archive</span>
        <span className={styles.incantation} lang="la">
          In girum imus nocte et consumimur igni
        </span>
      </div>

      <div className={styles.bottom}>
        <span className={styles.rule} />
        <span className={styles.footnote}>Chicago · Author · Engineer · Linguist</span>
        <span className={styles.rule} />
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import type { SubpageEasterEgg } from "@/content/locales/subpages";
import styles from "./LocaleEgg.module.css";

/**
 * A subtle, culturally specific easter egg for each locale: a single
 * untranslatable word rendered faint in the footer. Hovering or clicking it
 * reveals its meaning; on first mount it also whispers the full line to the
 * console, the classic developer discovery. Nothing here is load-bearing, and
 * it stays quiet under prefers-reduced-motion.
 */
export default function LocaleEgg({ egg }: { egg: SubpageEasterEgg }) {
  const [open, setOpen] = useState(false);
  const logged = useRef(false);

  useEffect(() => {
    if (logged.current) return;
    logged.current = true;
    // A quiet console note — findable, never intrusive.
    try {
      // eslint-disable-next-line no-console
      console.log(
        `%c${egg.word}%c — ${egg.gloss}\n%c${egg.reveal}`,
        "font-weight:700;letter-spacing:0.04em;",
        "opacity:0.7;",
        "font-style:italic;opacity:0.6;"
      );
    } catch {
      /* console unavailable — the visible egg still works */
    }
  }, [egg]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        title={egg.gloss}
      >
        {egg.word}
      </button>
      {open && (
        <p className={styles.reveal} role="note">
          {egg.reveal}
        </p>
      )}
    </div>
  );
}

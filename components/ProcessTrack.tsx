"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProcessTrack.module.css";

/**
 * The work process as a timeline whose connecting line draws itself in accent
 * when the section scrolls into view, lighting each node in sequence — a
 * pipeline that literally assembles. Inert (drawn at rest) under reduced motion.
 */
export default function ProcessTrack({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol
      ref={ref}
      className={[styles.track, drawn ? styles.drawn : ""].join(" ")}
      style={{ "--count": steps.length } as React.CSSProperties}
    >
      <span className={styles.rail} aria-hidden="true">
        <span className={styles.railFill} />
      </span>
      {steps.map((step, i) => (
        <li
          key={step}
          className={styles.node}
          style={{ "--i": i } as React.CSSProperties}
        >
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
          <span className={styles.name}>{step}</span>
        </li>
      ))}
    </ol>
  );
}

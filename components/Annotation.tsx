import React from "react";
import styles from "./Annotation.module.css";

/**
 * Annotation — a restrained editorial footnote that identifies a real
 * implementation decision: what is deterministic, what uses a model, where a
 * pipeline can fail, what was rejected. Optional to inspect, never necessary
 * to understand the page around it.
 *
 * Built on native <details>/<summary> so it is keyboard-accessible and works
 * with no client JavaScript. The marker is deliberately quiet — a small mono
 * tag with a accent dot — and the note opens inline beneath it.
 */

interface AnnotationProps {
  /** The short trigger label, e.g. "deterministic", "what's mocked". */
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function Annotation({ label, children, className }: AnnotationProps) {
  return (
    <details className={[styles.annotation, className].filter(Boolean).join(" ")}>
      <summary className={styles.summary}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </summary>
      <div className={styles.note}>{children}</div>
    </details>
  );
}

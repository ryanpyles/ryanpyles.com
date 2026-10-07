import React from "react";
import styles from "./SectionTransition.module.css";

/**
 * A sparse, full-width phrase panel used to reset visual rhythm between major
 * sections. Typography only — no diagram — so it reads as a breath. Use
 * sparingly. Optional enumerated items render as a mono index beneath.
 */

interface Props {
  fig?: string;
  /** Phrase lines, set large in serif. */
  lines: string[];
  /** Optional enumerated index, e.g. ["01 Engineering", "02 Language"]. */
  items?: string[];
  /** Decorative label at top; defaults to no fig. */
}

export default function SectionTransition({ fig, lines, items }: Props) {
  return (
    <section className={styles.panel} aria-hidden="true">
      {fig && <span className={styles.fig}>{fig}</span>}
      <p className={styles.phrase}>
        {lines.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </p>
      {items && items.length > 0 && (
        <ul className={styles.items}>
          {items.map((it) => (
            <li key={it} className={styles.item}>
              <span className={styles.slash}>/</span>
              {it}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

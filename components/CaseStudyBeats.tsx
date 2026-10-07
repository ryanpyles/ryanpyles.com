import React from "react";
import type { FailureBeat, DecisionBeat } from "@/content/projectCases";
import styles from "./CaseStudyBeats.module.css";

/**
 * The "Failure" and "Decision" beats of a case study. Failure states are
 * rendered as real evidence — a fixed-width button that clips its longest
 * translation, or two edition fragments that quietly diverged — because a
 * system behaviour demonstrates more than a decorative image. The decision
 * beat shows the call made about it as a before/after.
 */

export function FailurePlate({ failure }: { failure: FailureBeat }) {
  return (
    <div className={styles.plate}>
      <p className={styles.plateLabel}>{failure.label}</p>
      <p className={styles.plateCaption}>{failure.caption}</p>

      {failure.kind === "overflow" && (
        <ul className={styles.overflowList}>
          {failure.cases.map((c) => (
            <li key={c.locale} className={styles.overflowRow}>
              <span className={styles.overflowLocale}>{c.locale}</span>
              <span
                className={[styles.fakeButton, c.over ? styles.fakeButtonOver : ""].join(" ")}
                style={{ width: failure.budget }}
                dir={c.locale.startsWith("he") || c.locale.startsWith("ar") ? "rtl" : "ltr"}
              >
                {c.text}
              </span>
              {c.over && <span className={styles.overTag}>overflow</span>}
            </li>
          ))}
        </ul>
      )}

      {failure.kind === "divergence" && (
        <div className={styles.divergence}>
          {[failure.left, failure.right].map((col, ci) => (
            <div key={ci} className={styles.divCol}>
              <span className={styles.divTitle}>{col.title}</span>
              <ol className={styles.divLines}>
                {col.lines.map((line, i) => (
                  <li
                    key={i}
                    className={[styles.divLine, i === failure.changedLine ? styles.divChanged : ""].join(" ")}
                  >
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DecisionPlate({ decision }: { decision: DecisionBeat }) {
  return (
    <div className={styles.decision}>
      <p className={styles.plateLabel}>{decision.label}</p>
      <div className={styles.decisionCols}>
        <div className={[styles.decisionCol, styles.rejected].join(" ")}>
          <span className={styles.decisionTag}>Rejected</span>
          <p className={styles.decisionText}>{decision.rejected}</p>
        </div>
        <span className={styles.decisionArrow} aria-hidden="true">→</span>
        <div className={[styles.decisionCol, styles.chosen].join(" ")}>
          <span className={styles.decisionTag}>Chosen</span>
          <p className={styles.decisionText}>{decision.chosen}</p>
        </div>
      </div>
      {decision.note && <p className={styles.decisionNote}>{decision.note}</p>}
    </div>
  );
}

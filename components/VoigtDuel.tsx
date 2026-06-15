"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./VoigtDuel.module.css";

const PAIRS = [
  {
    concept: "GRAMMAR",
    ryan: "A grammar is a specification. Production rules mapping tokens to parse trees. Deterministic where possible. Ambiguity is a failure mode to be resolved — not a feature to be inhabited.",
    elian: "A grammar is a map pretending to be a machine. The rules always have exceptions, and the exceptions always have exceptions. What a grammar actually does is impose a coherent fiction on the chaos of a living language.",
  },
  {
    concept: "MEMORY",
    ryan: "Memory is cache with expiry. A lossy compression algorithm running on biological hardware. What gets evicted depends on access frequency and something we have not yet formally specified.",
    elian: "Memory is not storage. Memory is the act of deciding what to reconstruct — and what you reconstruct depends on what you need. This is also true of archives. The archive is not a record of the past. It is a record of survival.",
  },
  {
    concept: "SYSTEM",
    ryan: "A system is components with defined interfaces and emergent behavior. Complexity is always the enemy. The goal is to make complexity manageable, not invisible — invisible complexity is the kind that kills.",
    elian: "Every system is an argument about the world. The argument breaks down exactly where it meets what it cannot account for — and that is where the interesting things live. The breakdown is the thesis.",
  },
  {
    concept: "LANGUAGE",
    ryan: "Language is a protocol. Encoding and decoding meaning across a shared specification. Dialects are forks. Dead languages are deprecated APIs with no documented migration path and nobody left to file the ticket.",
    elian: "Language is not a protocol. It is a living argument between the people who speak it about what the world contains. Syntax is the politics of it. Vocabulary is the economy. A pidgin is two economies occupying the same political space.",
  },
];

function useTypewriter(text: string, speed: number, running: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!running || !text) return;

    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        return;
      }
      const jitter = speed + (Math.random() > 0.85 ? speed * 3.5 : 0);
      timer = window.setTimeout(tick, jitter);
    };
    let timer = window.setTimeout(tick, speed);
    return () => window.clearTimeout(timer);
  }, [text, speed, running]);

  return { displayed, done };
}

export default function VoigtDuel() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);

  const pair = PAIRS[index];

  const ryan = useTypewriter(pair.ryan, 20, running);
  const elian = useTypewriter(pair.elian, 34, running);

  const start = useCallback(() => {
    setStarted(true);
    setRunning(true);
  }, []);

  const next = useCallback(() => {
    setRunning(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % PAIRS.length);
      setRunning(true);
    }, 220);
  }, []);

  const bothDone = ryan.done && elian.done;

  return (
    <div className={styles.root} aria-label="Identity duel — two voices, one concept">
      <div className={styles.header}>
        <span className={styles.headerLabel}>ON THE CONCEPT OF</span>
        <span className={styles.concept}>{pair.concept}</span>
        <span className={styles.counter}>{index + 1} / {PAIRS.length}</span>
      </div>

      <div className={styles.columns}>
        <div className={styles.col}>
          <span className={styles.voice}>R. PYLES</span>
          <p className={styles.ryan}>
            {started ? (
              <>
                {ryan.displayed}
                {!ryan.done && <span className={`${styles.cursor} ${styles.cursorRyan}`} />}
              </>
            ) : (
              <span className={styles.ghost}>_ _ _ _ _ _</span>
            )}
          </p>
        </div>

        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerLine} />
          <span className={styles.dividerMark}>vs</span>
          <span className={styles.dividerLine} />
        </div>

        <div className={styles.col}>
          <span className={styles.voice}>E. VOIGT</span>
          <p className={styles.elian}>
            {started ? (
              <>
                {elian.displayed}
                {!elian.done && <span className={`${styles.cursor} ${styles.cursorElian}`} />}
              </>
            ) : (
              <span className={styles.ghost}>_ _ _ _ _ _</span>
            )}
          </p>
        </div>
      </div>

      <div className={styles.footer}>
        {!started ? (
          <button className={styles.btn} onClick={start}>
            BEGIN TRANSMISSION ↓
          </button>
        ) : bothDone ? (
          <button className={styles.btn} onClick={next}>
            NEXT CONCEPT →
          </button>
        ) : (
          <span className={styles.transmitting}>TRANSMITTING…</span>
        )}
      </div>
    </div>
  );
}

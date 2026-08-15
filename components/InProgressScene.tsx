"use client";

import React from "react";
import Link from "next/link";
import ScrollScene, { mapRange } from "./ScrollScene";
import { currentWork } from "@/content/currentWork";
import styles from "./InProgressScene.module.css";

const items = currentWork;

const intro =
  "Longer-form work before it closes — language studies, narrative systems, and ongoing manuscripts held open on the desk.";

function Row({
  item,
  index,
}: {
  item: (typeof items)[number];
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const inner = (
    <>
      <span className={styles.rowNum} aria-hidden="true">
        {num}
      </span>
      <span className={styles.rowTitle}>{item.title}</span>
      <span className={styles.rowType}>{item.type}</span>
      <span className={styles.rowStatus}>{item.status}</span>
    </>
  );
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.row}
      >
        {inner}
      </a>
    );
  }
  return <div className={styles.row}>{inner}</div>;
}

function StaticView() {
  return (
    <div className={styles.staticScene}>
      <header className={styles.staticHeader}>
        <span className={styles.kicker}>Research</span>
        <h2 className={styles.wordmark}>In Progress</h2>
        <p className={styles.introSub}>{intro}</p>
      </header>
      <div className={styles.ledger}>
        {items.map((item, i) => (
          <Row key={item.slug} item={item} index={i} />
        ))}
      </div>
      <Link href="/archive" className={styles.archive}>
        Research archive →
      </Link>
    </div>
  );
}

export default function InProgressScene() {
  return (
    <ScrollScene
      id="in-progress"
      ariaLabel="In Progress"
      heightVh={420}
      heightVhMobile={380}
      pinOnMobile
      className={styles.root}
      contentClassName={styles.sticky}
    >
      {(progress, isStatic) => {
        if (isStatic) return <StaticView />;

        const introOpacity = 1 - mapRange(progress, 0.04, 0.12);
        const step = (0.94 - 0.16) / items.length;
        const rowIn = items.map((_, i) =>
          mapRange(progress, 0.16 + i * step, 0.16 + i * step + step * 0.7)
        );
        const revealed = rowIn.filter((c) => c > 0.5).length;
        const activeIndex = Math.max(0, revealed - 1);

        return (
          <div className={styles.scene}>
            <div className={styles.top}>
              <span className={styles.kicker}>Research</span>
              <span className={styles.wordmarkSmall}>In Progress</span>
            </div>

            <div className={styles.center}>
              <div
                className={styles.intro}
                style={{
                  opacity: introOpacity,
                  pointerEvents: introOpacity > 0.5 ? "auto" : "none",
                }}
              >
                <h2 className={styles.introHeading}>
                  Work held open on the desk.
                </h2>
                <p className={styles.introSub}>{intro}</p>
              </div>

              <ol
                className={styles.ledger}
                style={{ opacity: 1 - introOpacity }}
              >
                {items.map((item, i) => {
                  const entrance = rowIn[i];
                  const active = i === activeIndex;
                  return (
                    <li
                      key={item.slug}
                      className={[
                        styles.ledgerItem,
                        active ? styles.ledgerActive : "",
                      ].join(" ")}
                      style={{
                        opacity: entrance,
                        transform: `translateY(${(1 - entrance) * 26}px)`,
                      }}
                    >
                      <Row item={item} index={i} />
                      <span
                        className={styles.rule}
                        aria-hidden="true"
                        style={{ transform: `scaleX(${entrance})` }}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className={styles.bottom}>
              <span className={styles.counter}>
                {String(Math.min(revealed, items.length)).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <Link href="/archive" className={styles.archive}>
                Research archive →
              </Link>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}

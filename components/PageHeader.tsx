import React from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  /** Big serif title. The orange period is appended automatically. */
  title: React.ReactNode;
  /** Small mono eyebrow above the title. */
  kicker?: React.ReactNode;
  /** Italic serif standfirst below the title. */
  intro?: React.ReactNode;
  className?: string;
}

/**
 * Shared subpage masthead — the "Systems." treatment from the projects index:
 * a large serif title closed with an orange period, over an optional mono
 * kicker and italic standfirst. Used across the section-landing subpages so
 * every header shares one editorial system.
 */
export default function PageHeader({
  title,
  kicker,
  intro,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={[styles.header, className].filter(Boolean).join(" ")}
    >
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      <h1 className={styles.title}>
        {title}
        <span className={styles.dot} aria-hidden="true">
          .
        </span>
      </h1>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}

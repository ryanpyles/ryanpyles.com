import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./SectionCta.module.css";

/**
 * A closing conversion band for section-landing pages that would otherwise end
 * on content with no next step. Keeps the editorial voice — a single line and
 * one or two links — rather than a loud marketing block.
 */
export default function SectionCta({
  text,
  primary,
  secondary,
}: {
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Reveal>
      <section className={styles.cta} aria-label="Work with Ryan">
        <p className={styles.text}>{text}</p>
        <div className={styles.links}>
          <Link href={primary.href} className={styles.primary}>
            {primary.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className={styles.secondary}>
              {secondary.label}
            </Link>
          )}
        </div>
      </section>
    </Reveal>
  );
}

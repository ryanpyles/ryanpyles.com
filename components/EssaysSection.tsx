import React from "react";
import Section from "@/components/Section";
import EssayList from "@/components/EssayList";
import styles from "./EssaysSection.module.css";

/**
 * The long-form engineering essays, surfaced beneath the systems showcase.
 * The essays themselves are English write-ups of shipped work; only the section
 * header is localizable, so localized routes pass translated header copy while
 * the list stays the English canon.
 */
export default function EssaysSection({
  kicker,
  heading,
  intro,
}: {
  kicker: string;
  heading: string;
  intro: string;
}) {
  return (
    <Section>
      <div className={styles.essays}>
        <header className={styles.essaysHeader}>
          <span className={styles.essaysKicker}>{kicker}</span>
          <h2 className={styles.essaysHeading}>{heading}</h2>
          <p className={styles.essaysIntro}>{intro}</p>
        </header>
        <EssayList />
      </div>
    </Section>
  );
}

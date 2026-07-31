import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import { buildPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Ryan J. Pyles for web development, brand design, or speaking inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteLayout>
      <Section narrow>
        <header className={styles.header}>
          <h1>Contact</h1>
          <p className={styles.intro}>
            For web development, brand design, or speaking inquiries.
          </p>
        </header>

        <div className={styles.accepting}>
          <p className={styles.acceptingLabel}>
            <span className={styles.acceptingDot} aria-hidden="true" />
            Currently accepting
          </p>
          <ul className={styles.acceptingList}>
            <li className={styles.acceptingItem}>Publishing systems</li>
            <li className={styles.acceptingItem}>Editorial websites</li>
            <li className={styles.acceptingItem}>AI narrative tooling</li>
            <li className={styles.acceptingItem}>Research collaborations</li>
          </ul>
        </div>

        <div className={styles.options}>
          <div className={styles.option}>
            <h2 className={styles.optionLabel}>All Inquiries</h2>
            <a href="mailto:me@ryanpyles.com" className={styles.optionLink}>
              me@ryanpyles.com
            </a>
          </div>

          <div className={styles.option}>
            <h2 className={styles.optionLabel}>Availability</h2>
            <p className={styles.optionText}>
              Taking on a small number of selected engagements. Response time is
              typically two business days.
            </p>
          </div>

          <div className={styles.option}>
            <h2 className={styles.optionLabel}>Good fit</h2>
            <ul className={styles.fitList}>
              <li>Brand identity systems and editorial design</li>
              <li>Publishing and author platforms — Next.js, structured content, SEO</li>
              <li>Web applications with language, typography, or data at the center</li>
              <li>Speaking: experimental fiction, constraint-based writing, language and systems</li>
            </ul>
          </div>

          <div className={styles.option}>
            <h2 className={styles.optionLabel}>Not a fit</h2>
            <ul className={styles.fitList}>
              <li>Maintenance contracts or ongoing retainer support</li>
              <li>Projects requiring a large team or agency infrastructure</li>
              <li>Rush timelines without prior relationship</li>
            </ul>
          </div>
        </div>

        <p className={styles.note}>
          I do not respond to cold pitches, unsolicited manuscripts, or
          automated outreach. For press and media inquiries, see the{" "}
          <a href="/press" className={styles.noteLink}>press page</a>.
        </p>
      </Section>
    </SiteLayout>
  );
}

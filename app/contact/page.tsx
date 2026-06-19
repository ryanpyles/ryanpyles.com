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

        <div className={styles.options}>
          <div className={styles.option}>
            <h2 className={styles.optionLabel}>All Inquiries</h2>
            <a href="mailto:ryan@ryanpyles.com" className={styles.optionLink}>
              ryan@ryanpyles.com
            </a>
          </div>

          <div className={styles.option}>
            <h2 className={styles.optionLabel}>Availability</h2>
            <p className={styles.optionText}>
              Currently available for selected web development and brand design
              engagements. Response time is typically two business days.
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

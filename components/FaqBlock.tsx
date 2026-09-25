import React from "react";
import { buildFaqJsonLd } from "@/lib/metadata";
import styles from "./FaqBlock.module.css";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * A visible FAQ that also emits matching FAQPage structured data from the same
 * source array, so the two never drift (Google drops the rich result when they
 * disagree). Answers are plain strings — no markup — to keep that guarantee.
 */
export default function FaqBlock({
  heading = "Questions",
  items,
}: {
  heading?: string;
  items: FaqItem[];
}) {
  return (
    <section className={styles.faq} aria-label={heading}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(items) }}
      />
      <h2 className={styles.heading}>{heading}</h2>
      <dl className={styles.list}>
        {items.map((it) => (
          <div key={it.question} className={styles.item}>
            <dt className={styles.question}>{it.question}</dt>
            <dd className={styles.answer}>{it.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

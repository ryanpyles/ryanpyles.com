import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { articles } from "@/content/writing";
import { articleMinutes } from "@/content/writing/utils";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writing — Engineering Essays by Ryan Pyles",
  description:
    "First-hand technical writing by Ryan Pyles on AI systems, software architecture, web engineering, and the places where language and code overlap — grounded in shipped work.",
  keywords: [
    "Ryan Pyles writing",
    "software engineering essays",
    "AI systems architecture",
    "narrative intelligence software",
    "technical writing",
  ],
  alternates: { canonical: "https://ryanpyles.com/writing" },
};

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

const published = articles.filter((a) => a.status === "published");

export default function WritingPage() {
  return (
    <SiteLayout>
      <Section>
        <header className={styles.header}>
          <Reveal>
            <span className={styles.kicker}>Writing</span>
          </Reveal>
          <Reveal delay={80} slow>
            <h1 className={styles.title}>Engineering essays</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.intro}>
              First-hand technical writing from shipped work — AI systems,
              architecture, and the places where software, language, and
              publishing overlap. One diagram, one real code sample, one
              honest failure per piece. No “ten tips.”
            </p>
          </Reveal>
        </header>

        <ol className={styles.list}>
          {published.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <li className={styles.item}>
                <Link href={`/writing/${a.slug}`} className={styles.link}>
                  <div className={styles.itemMeta}>
                    <span className={styles.category}>{a.category}</span>
                    <span className={styles.dot} aria-hidden="true">
                      ·
                    </span>
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span className={styles.dot} aria-hidden="true">
                      ·
                    </span>
                    <span>{articleMinutes(a)} min</span>
                  </div>
                  <h2 className={styles.itemTitle}>{a.title}</h2>
                  <p className={styles.itemSub}>{a.subtitle}</p>
                  <span className={styles.itemArrow} aria-hidden="true">
                    Read →
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </SiteLayout>
  );
}

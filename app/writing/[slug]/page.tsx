import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import ArticleBody from "@/components/ArticleBody";
import ContinuityGraph from "@/components/ContinuityGraph";
import { articles, getArticle } from "@/content/writing";
import { articleMinutes } from "@/content/writing/utils";
import styles from "./page.module.css";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: `${a.title} — Ryan Pyles`,
    description: a.excerpt,
    keywords: a.keywords,
    alternates: { canonical: `https://ryanpyles.com/writing/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      type: "article",
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      authors: [a.byline],
    },
  };
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Named client components an article may embed via an "embed" block.
const EMBEDS: Record<string, React.ReactNode> = {
  "continuity-graph": <ContinuityGraph />,
};

export default function ArticlePage({ params }: Params) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const minutes = articleMinutes(a);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    articleSection: a.category,
    keywords: a.keywords.join(", "),
    author: {
      "@type": "Person",
      name: a.byline,
      url: "https://ryanpyles.com",
    },
    publisher: {
      "@type": "Person",
      name: "Ryan Pyles",
      url: "https://ryanpyles.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ryanpyles.com/writing/${a.slug}`,
    },
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section narrow>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/writing" className={styles.back}>
            ← Writing
          </Link>
        </nav>

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.category}>{a.category}</span>
              <time className={styles.date} dateTime={a.date}>
                {formatDate(a.date)}
              </time>
              <span className={styles.readTime}>{minutes} min read</span>
            </div>
            <h1 className={styles.title}>{a.title}</h1>
            <p className={styles.subtitle}>{a.subtitle}</p>
            <p className={styles.byline}>
              By <span className={styles.bylineName}>{a.byline}</span>
            </p>
          </header>

          <ArticleBody blocks={a.blocks} embeds={EMBEDS} />

          <footer className={styles.footer}>
            {a.relatedProject && (
              <Link href={a.relatedProject.href} className={styles.projectCta}>
                {a.relatedProject.label} →
              </Link>
            )}
            <div className={styles.footerNav}>
              <Link href="/writing" className={styles.back}>
                ← All writing
              </Link>
              <Link href="/contact" className={styles.contact}>
                Discuss your project →
              </Link>
            </div>
          </footer>
        </article>
      </Section>
    </SiteLayout>
  );
}

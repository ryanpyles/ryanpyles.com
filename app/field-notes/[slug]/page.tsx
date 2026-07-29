import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import { fieldNotes } from "@/content/fieldNotes";
import { RELATED_HREFS } from "@/content/fieldNotes/relatedLinks";
import { readingMinutes, relatedNotes } from "@/content/fieldNotes/utils";
import styles from "./page.module.css";

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const note = fieldNotes.find((n) => n.slug === params.slug);
  if (!note) return {};

  return {
    title: `${note.title} — Field Notes`,
    description: note.excerpt,
    keywords: ["Ryan Pyles field notes", note.category.toLowerCase(), "notebook"],
    openGraph: {
      title: note.title,
      description: note.excerpt,
      type: "article",
      publishedTime: note.date,
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

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  fragment: "Fragment",
};

export default function FieldNoteSlugPage({ params }: Params) {
  const note = fieldNotes.find((n) => n.slug === params.slug);
  if (!note) notFound();

  return (
    <SiteLayout>
      <Section narrow>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/field-notes" className={styles.back}>
            ← Field Notes
          </Link>
        </nav>

        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <time className={styles.date} dateTime={note.date}>
                {formatDate(note.date)}
              </time>
              <span className={styles.category}>{note.category}</span>
              <span className={styles.status}>{STATUS_LABEL[note.status]}</span>
              <span className={styles.readTime}>{readingMinutes(note)} min read</span>
            </div>
            <h1 className={styles.title}>{note.title}</h1>
          </header>

          <div className={styles.body}>
            <p className={styles.excerpt}>{note.excerpt}</p>

            {note.body && (
              <div className={styles.full}>
                {note.body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {note.relatedWork && note.relatedWork.length > 0 && (
              <footer className={styles.related}>
                <span className={styles.relatedLabel}>Related —</span>
                {note.relatedWork.map((item, i) => {
                  const href = RELATED_HREFS[item];
                  const isExternal = href?.startsWith("http");
                  return (
                    <React.Fragment key={item}>
                      {i > 0 && <span aria-hidden="true">, </span>}
                      {href ? (
                        <Link
                          href={href}
                          className={styles.relatedLink}
                          {...(isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {item}
                        </Link>
                      ) : (
                        <span className={styles.relatedItem}>{item}</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </footer>
            )}
          </div>
        </article>

        {(() => {
          const related = relatedNotes(note.slug);
          if (related.length === 0) return null;
          return (
            <aside className={styles.relatedNotes} aria-label="Related notes">
              <span className={styles.relatedNotesLabel}>Threads from the archive</span>
              <ul className={styles.relatedNotesList}>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/field-notes/${r.slug}`} className={styles.relatedNote}>
                      <span className={styles.relatedNoteCategory}>{r.category}</span>
                      <span className={styles.relatedNoteTitle}>{r.title}</span>
                      <span className={styles.relatedNoteArrow} aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          );
        })()}

        <nav className={styles.pagination} aria-label="Field note navigation">
          {(() => {
            const idx = fieldNotes.findIndex((n) => n.slug === params.slug);
            const prev = idx > 0 ? fieldNotes[idx - 1] : null;
            const next = idx < fieldNotes.length - 1 ? fieldNotes[idx + 1] : null;
            return (
              <>
                {prev && (
                  <Link href={`/field-notes/${prev.slug}`} className={styles.paginationLink} data-dir="prev">
                    <span className={styles.paginationDir}>← Previous</span>
                    <span className={styles.paginationTitle}>{prev.title}</span>
                  </Link>
                )}
                {next && (
                  <Link href={`/field-notes/${next.slug}`} className={styles.paginationLink} data-dir="next">
                    <span className={styles.paginationDir}>Next →</span>
                    <span className={styles.paginationTitle}>{next.title}</span>
                  </Link>
                )}
              </>
            );
          })()}
        </nav>
      </Section>
    </SiteLayout>
  );
}

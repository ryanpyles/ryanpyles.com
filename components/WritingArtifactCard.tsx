import React from "react";
import Link from "next/link";
import type { Book } from "@/content/books/types";
import styles from "./WritingArtifactCard.module.css";

const FORMS = ["Fragments", "Notes", "Excerpts", "Marginalia"];

interface WritingArtifactCardProps {
  book: Book;
}

export default function WritingArtifactCard({ book }: WritingArtifactCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/books/${book.slug}`} className={styles.inner}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.description}>{book.description}</p>
        <ul className={styles.forms} role="list">
          {FORMS.map((form) => (
            <li key={form} className={styles.form}>
              {form}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}

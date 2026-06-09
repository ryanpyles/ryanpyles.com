import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import BookCard from "@/components/BookCard";
import { ryanBooks } from "@/content/books";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Books — Elian Voigt / FORMÆTRIX",
  description:
    "Novels by Elian Voigt, published by FORMÆTRIX — including Feast of the Broadcast Saints, What Survives Is Proof, Declensions of Dark Water, Terms of Unbeing, Summer of the Glass Bees, and The Quiet Metric.",
  keywords: [
    "Elian Voigt books",
    "FORMÆTRIX novels",
    "experimental literary fiction",
    "Feast of the Broadcast Saints",
    "Declensions of Dark Water",
    "Terms of Unbeing",
  ],
};

export default function BooksPage() {
  return (
    <SiteLayout>
      <Section>
        <header className={styles.header}>
          <h1>Books</h1>
          <p className={styles.intro}>
            Novels that resist easy resolution. Fiction built from constraint.
          </p>
        </header>

        <div className={styles.list}>
          {ryanBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

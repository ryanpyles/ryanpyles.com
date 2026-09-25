import React from "react";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/metadata";
import { subpageLanguageAlternates } from "@/lib/i18n";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";
import { ryanBooks } from "@/content/books";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Books — Elian Voigt / FORMÆTRIX",
  description:
    "Novels by Elian Voigt, published by FORMÆTRIX — including Feast of the Broadcast Saints, What Survives Is Proof, Declensions of Dark Water, Terms of Unbeing, Summer of the Glass Bees, and The Quiet Metric.",
  path: "/books",
  keywords: [
    "Elian Voigt books",
    "FORMÆTRIX novels",
    "experimental literary fiction",
    "Feast of the Broadcast Saints",
    "Declensions of Dark Water",
    "Terms of Unbeing",
  ],
  languageAlternates: subpageLanguageAlternates("/books"),
});

export default function BooksPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Fiction", path: "/books" },
          ]),
        }}
      />
      <Section>
        <PageHeader
          kicker="Elian Voigt — FORMÆTRIX"
          title="Fiction"
          intro="Novels that resist easy resolution. Fiction built from constraint."
        />

        <div className={styles.list}>
          {ryanBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

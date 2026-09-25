import type { Metadata } from "next";
import type { Book } from "@/content/books/types";

const site = {
  name: "Ryan J. Pyles",
  url: "https://ryanpyles.com",
  description:
    "Ryan J. Pyles — author of experimental fiction, software engineer, and linguist based in Chicago.",
  twitterHandle: "@rypychi",
};

export function buildPageMetadata(overrides: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  /**
   * Use the title verbatim rather than appending the site name. For pages
   * whose title already carries it — the homepage above all, where
   * "… | Ryan J. Pyles" would only repeat the name.
   */
  titleIsComplete?: boolean;
  /**
   * Marks the page as an article rather than a generic website, preserving
   * publication dates and bylines that a plain og:type would drop.
   */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
  };
  /**
   * hreflang cluster for pages that have localized variants. Maps each
   * language tag (plus x-default) to its URL, emitted as <link rel="alternate">
   * so the return links are bidirectional with the localized routes.
   */
  languageAlternates?: Record<string, string>;
}): Metadata {
  const fullTitle = overrides.titleIsComplete
    ? overrides.title
    : `${overrides.title} | ${site.name}`;
  const url = `${site.url}${overrides.path ?? ""}`;
  const ogImage = overrides.ogImage ?? `/og/ryan-default.jpg`;

  return {
    title: { absolute: fullTitle },
    description: overrides.description,
    ...(overrides.keywords ? { keywords: overrides.keywords } : {}),
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
      ...(overrides.languageAlternates
        ? { languages: overrides.languageAlternates }
        : {}),
      types: { "application/rss+xml": `${site.url}/feed.xml` },
    },
    openGraph: {
      title: fullTitle,
      description: overrides.description,
      url,
      siteName: site.name,
      locale: "en_US",
      ...(overrides.article
        ? {
            type: "article" as const,
            publishedTime: overrides.article.publishedTime,
            modifiedTime:
              overrides.article.modifiedTime ?? overrides.article.publishedTime,
            ...(overrides.article.authors
              ? { authors: overrides.article.authors }
              : {}),
          }
        : { type: "website" as const }),
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: overrides.description,
      site: site.twitterHandle,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function buildBookMetadata(book: Book): Metadata {
  const fullTitle = `${book.title} by ${book.author} | ${site.name}`;
  const url = `${site.url}/books/${book.slug}`;
  const ogImage = book.coverImage ?? `/og/ryan-default.jpg`;

  return {
    title: fullTitle,
    description: book.description,
    metadataBase: new URL(site.url),
    keywords: book.keywords,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": `${site.url}/feed.xml` },
    },
    openGraph: {
      title: fullTitle,
      description: book.description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "book",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 1200,
          alt: `${book.title} cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: book.description,
      site: site.twitterHandle,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildBookJsonLd(book: Book): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author,
    },
    datePublished: book.publishDate,
    description: book.description,
    image: book.coverImage,
    ...(book.isbn ? { isbn: book.isbn } : {}),
    publisher: {
      "@type": "Organization",
      name: "FORMÆTRIX",
    },
    inLanguage: "en",
    genre: book.keywords[0] ?? "Literary Fiction",
    // Offer only when the title is actually for sale and has a real retailer
    // URL — no fabricated prices. Availability + URL is honest and valid.
    ...(book.status !== "forthcoming" && book.purchaseUrl
      ? {
          offers: {
            "@type": "Offer",
            url: book.purchaseUrl,
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
          },
        }
      : {}),
  };
  return JSON.stringify(schema);
}

export function buildPersonJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Pyles",
    // Both the formal byline and the pen name, so the entity resolves for
    // "Ryan J. Pyles" and "Elian Voigt" queries alike.
    alternateName: ["Ryan J. Pyles", "Elian Voigt"],
    url: "https://ryanpyles.com",
    image: "https://ryanpyles.com/images/portraits/ryan-pyles-studio.jpg",
    sameAs: [
      "https://github.com/ryanpyles",
      "https://www.linkedin.com/in/ryanpyles",
      "https://x.com/rypychi",
      "https://www.formaetrix.com",
      "https://www.elianvoigt.com",
    ],
    jobTitle: "Software Engineer & AI Systems Architect",
    worksFor: {
      "@type": "Organization",
      name: "FORMÆTRIX",
      url: "https://www.formaetrix.com",
    },
    homeLocation: {
      "@type": "Place",
      name: "Chicago, Illinois",
    },
    description:
      "Ryan Pyles is a software engineer and AI systems architect in Chicago, building AI, publishing, and multilingual web systems with React, Next.js, and TypeScript. He runs the FORMÆTRIX studio and writes fiction as Elian Voigt.",
    knowsAbout: [
      "Software Engineering",
      "AI Systems",
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Publishing Infrastructure",
      "Linguistics",
      "Experimental Fiction",
    ],
  });
}

/**
 * BreadcrumbList structured data — helps search engines render a breadcrumb
 * trail in results. Paths are site-relative; names are the visible labels.
 */
export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  });
}

/**
 * FAQPage structured data. Answers are plain text (no markup), matching what
 * the visible FAQ renders — the two must agree or Google drops the rich result.
 */
export function buildFaqJsonLd(items: { question: string; answer: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  });
}

/** Organization structured data for the FORMÆTRIX studio. */
export function buildOrganizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FORMÆTRIX",
    url: "https://www.formaetrix.com",
    founder: { "@type": "Person", name: "Ryan Pyles", url: site.url },
    description:
      "A multidisciplinary studio for publishing, software, and narrative systems, founded by Ryan Pyles. Home of the pen name Elian Voigt.",
    sameAs: ["https://www.formaetrix.com", "https://www.elianvoigt.com"],
  });
}

/** BlogPosting structured data for a Field Note. */
export function buildNoteJsonLd(note: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.excerpt,
    datePublished: note.date,
    dateModified: note.date,
    url: `${site.url}/notes/${note.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    articleSection: note.category,
    inLanguage: "en",
  });
}

/**
 * Structured data for a case study. Uses only fields the CaseStudy model
 * actually carries — nothing is inferred or invented.
 */
export function buildCaseStudyJsonLd(cs: {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  stack: string[];
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    headline: cs.title,
    description: cs.tagline,
    url: `${site.url}/projects/${cs.slug}`,
    dateCreated: cs.year,
    author: { "@type": "Person", name: site.name, url: site.url },
    creator: { "@type": "Person", name: site.name, url: site.url },
    keywords: cs.stack.join(", "),
    inLanguage: "en",
  };
  return JSON.stringify(schema);
}

/**
 * Structured data for a live application embedded on the site. These are
 * running software rather than write-ups, so they take SoftwareApplication.
 */
export function buildEmbeddedAppJsonLd(app: {
  slug: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.title,
    description: app.description,
    url: `${site.url}/projects/${app.slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    dateCreated: app.year,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: app.tags.join(", "),
    inLanguage: "en",
  };
  return JSON.stringify(schema);
}

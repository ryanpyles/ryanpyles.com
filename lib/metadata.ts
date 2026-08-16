import type { Metadata } from "next";
import type { Book } from "@/content/books/types";

const site = {
  name: "Ryan J. Pyles",
  url: "https://ryanpyles.com",
  description:
    "Ryan J. Pyles — author of experimental fiction, software engineer, and linguist based in Chicago.",
  twitterHandle: "@ryanpyles",
};

export function buildPageMetadata(overrides: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const fullTitle = `${overrides.title} | ${site.name}`;
  const url = `${site.url}${overrides.path ?? ""}`;
  const ogImage = overrides.ogImage ?? `/og/ryan-default.jpg`;

  return {
    title: { absolute: fullTitle },
    description: overrides.description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: overrides.description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
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
    alternates: { canonical: url },
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
      "@type": "Person",
      name: "Ryan J. Pyles",
    },
    inLanguage: "en",
    genre: book.keywords[0] ?? "Literary Fiction",
  };
  return JSON.stringify(schema);
}

const PERSON_REF = {
  "@type": "Person",
  name: "Ryan Pyles",
  url: "https://ryanpyles.com",
} as const;

/** CreativeWork markup for a project case study (a documented software system). */
export function buildCaseStudyJsonLd(cs: {
  title: string;
  tagline: string;
  slug: string;
  year: string;
  stack: string[];
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    headline: cs.title,
    description: cs.tagline,
    url: `https://ryanpyles.com/projects/${cs.slug}`,
    dateCreated: cs.year,
    inLanguage: "en",
    author: PERSON_REF,
    creator: PERSON_REF,
    keywords: cs.stack.join(", "),
    about: cs.stack,
  });
}

/** SoftwareApplication markup — for pages that are genuinely runnable apps. */
export function buildSoftwareAppJsonLd(app: {
  name: string;
  description: string;
  url: string;
  category?: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.category ?? "DeveloperApplication",
    operatingSystem: "Web",
    author: PERSON_REF,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  });
}

/** CollectionPage + ItemList for the /projects archive. */
export function buildProjectCollectionJsonLd(
  items: { slug: string; title: string }[]
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Systems — Engineering Work by Ryan Pyles",
    url: "https://ryanpyles.com/projects",
    isPartOf: { "@type": "WebSite", url: "https://ryanpyles.com" },
    about: PERSON_REF,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.title,
        url: `https://ryanpyles.com/projects/${it.slug}`,
      })),
    },
  });
}

export function buildPersonJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Pyles",
    alternateName: "Ryan J. Pyles",
    url: "https://ryanpyles.com",
    sameAs: [
      "https://github.com/ryanpyles",
      "https://www.linkedin.com/in/ryanpyles",
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

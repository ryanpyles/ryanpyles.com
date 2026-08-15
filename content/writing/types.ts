/**
 * Long-form technical articles — the canonical, first-hand engineering
 * writing published on ryanpyles.com. Distinct from Field Notes (short
 * fragments): these are structured, code-bearing, diagram-bearing pieces.
 */

export type ArticleCategory =
  | "AI Systems"
  | "Architecture"
  | "Web Engineering"
  | "Identity & SEO"
  | "Graphics";

export type ArticleStatus = "published" | "draft";

/** Inline markup supported in paragraph/list/quote text:
 *  **bold**, _italic_, `code`, and [label](href). */
export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
  /** Explicit anchor id; falls back to a slug of `text`. */
  id?: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface ListBlock {
  type: "list";
  ordered?: boolean;
  items: string[];
}

export interface CodeBlock {
  type: "code";
  language: string;
  code: string;
  caption?: string;
}

export interface FigureBlock {
  type: "figure";
  /** Trusted, hand-authored inline SVG. */
  svg: string;
  caption: string;
  label?: string;
}

export interface CalloutBlock {
  type: "callout";
  variant: "failure" | "insight" | "note";
  title?: string;
  text: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  cite?: string;
}

/** Renders a named client component supplied by the page (e.g. a demo). */
export interface EmbedBlock {
  type: "embed";
  component: string;
  caption?: string;
}

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | CodeBlock
  | FigureBlock
  | CalloutBlock
  | QuoteBlock
  | EmbedBlock;

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  /** Byline is always Ryan Pyles; kept explicit for the article schema. */
  byline: string;
  date: string;
  updated?: string;
  category: ArticleCategory;
  excerpt: string;
  keywords: string[];
  /** The literal searches this piece is written to answer. */
  targetSearches: string[];
  blocks: Block[];
  relatedProject?: { href: string; label: string };
  status: ArticleStatus;
}

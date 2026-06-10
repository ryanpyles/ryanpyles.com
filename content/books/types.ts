export type BookTheme = "ryan" | "formaetrix";
export type BookStatus = "published" | "forthcoming";

export interface AmazonData {
  subtitle?: string;
  backendKeywords?: string;
  categories?: string[];
  blurbHTML?: string;
}

export interface Book {
  slug: string;
  title: string;
  author: string;
  description: string;
  fullDescription: string;
  keywords: string[];
  /** Real ISBN-13 only — omit if not yet assigned. Never use placeholder values. */
  isbn?: string;
  /** Direct retailer URL (Amazon product page, Bookshop.org, etc.). Omit if not yet listed. */
  purchaseUrl?: string;
  publishDate?: string;
  status?: BookStatus;
  /** Path to cover image in /public — omit for forthcoming titles without a cover yet. */
  coverImage?: string;
  theme: BookTheme;
  amazon?: AmazonData;
}

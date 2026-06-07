import type { Book } from "./types";

import gideons from "./ryan/gideons-inferno";
import terms from "./ryan/terms-of-unbeing";
import quietMetrics from "./ryan/quiet-metrics";

export const ryanBooks: Book[] = [gideons, terms, quietMetrics];

export const allBooks: Book[] = [...ryanBooks];

export function getBookBySlug(slug: string): Book | undefined {
  return allBooks.find((b) => b.slug === slug);
}

export function getAllSlugs(): string[] {
  return allBooks.map((b) => b.slug);
}

export type { Book };

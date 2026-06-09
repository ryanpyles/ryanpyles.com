import type { Book } from "./types";

// Published — in catalogue order (I–VI)
import feast from "./ryan/feast-of-the-broadcast-saints";
import whatSurvives from "./ryan/what-survives-is-proof";
import declensions from "./ryan/declensions-of-dark-water";
import terms from "./ryan/terms-of-unbeing";
import glassBees from "./ryan/summer-of-the-glass-bees";
import quietMetric from "./ryan/quiet-metrics";

// Forthcoming
import liminal from "./ryan/liminal-617";
import babel from "./ryan/babel-threshold";
import guestbook from "./ryan/guestbook-of-the-north-wind";

export const ryanBooks: Book[] = [
  feast,
  whatSurvives,
  declensions,
  terms,
  glassBees,
  quietMetric,
  liminal,
  babel,
  guestbook,
];

export const allBooks: Book[] = [...ryanBooks];

export function getBookBySlug(slug: string): Book | undefined {
  return allBooks.find((b) => b.slug === slug);
}

export function getAllSlugs(): string[] {
  return allBooks.map((b) => b.slug);
}

export type { Book };

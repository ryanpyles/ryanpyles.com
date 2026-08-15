import type { Article, Block } from "./types";

/** Strip the inline markdown-lite tokens so word counts stay honest. */
function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "");
}

function blockWords(b: Block): number {
  switch (b.type) {
    case "heading":
      return plain(b.text).split(/\s+/).filter(Boolean).length;
    case "paragraph":
    case "quote":
      return plain(b.text).split(/\s+/).filter(Boolean).length;
    case "list":
      return b.items.reduce(
        (n, it) => n + plain(it).split(/\s+/).filter(Boolean).length,
        0
      );
    case "code":
      // Code reads slower; count lines as a rough proxy at ~8 "words"/line.
      return b.code.split("\n").length * 8;
    case "callout":
      return plain(b.text).split(/\s+/).filter(Boolean).length;
    default:
      return 0;
  }
}

/** Estimated reading time in whole minutes (~200 wpm). */
export function articleMinutes(article: Article): number {
  const words = article.blocks.reduce((n, b) => n + blockWords(b), 0);
  return Math.max(1, Math.round(words / 200));
}

/** Anchor id for a heading (explicit id wins). */
export function headingId(text: string, id?: string): string {
  if (id) return id;
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

import { articles } from "@/content/writing";
import { fieldNotes } from "@/content/fieldNotes";

const BASE = "https://ryanpyles.com";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface FeedItem {
  title: string;
  desc: string;
  url: string;
  date: string;
  category: string;
}

/** Static RSS 2.0 feed of the long-form writing and published field notes. */
export function GET(): Response {
  const items: FeedItem[] = [
    ...articles
      .filter((a) => a.status === "published")
      .map((a) => ({
        title: a.title,
        desc: a.excerpt,
        url: `${BASE}/writing/${a.slug}`,
        date: a.updated ?? a.date,
        category: a.category,
      })),
    ...fieldNotes
      .filter((n) => n.status === "published")
      .map((n) => ({
        title: n.title,
        desc: n.excerpt,
        url: `${BASE}/notes/${n.slug}`,
        date: n.date,
        category: n.category,
      })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastBuild =
    items.length > 0
      ? new Date(`${items[0].date}T00:00:00Z`).toUTCString()
      : new Date().toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ryan J. Pyles — Writing &amp; Notes</title>
    <link>${BASE}</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Essays and field notes on language, software, and narrative systems.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${i.url}</link>
      <guid isPermaLink="true">${i.url}</guid>
      <pubDate>${new Date(`${i.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(i.category)}</category>
      <description>${esc(i.desc)}</description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

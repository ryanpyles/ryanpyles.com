import type { MetadataRoute } from "next";

const BASE = "https://ryanpyles.com";

/**
 * Without this the sitemap is never declared to crawlers — it exists at
 * /sitemap.xml but nothing points at it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here is meant to be indexed on its own.
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}

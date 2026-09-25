/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ryanpyles.com" }],
        destination: "https://ryanpyles.com/:path*",
        permanent: true,
      },
      {
        // Indexed professional-intent URL — keep it alive, point at the bio.
        source: "/resume",
        destination: "/about",
        permanent: true,
      },
      {
        // English lives at the root; /en is not a separate route.
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        // Localized subpages exist at /<lang>/<section>, but English has no
        // prefix — fold any /en/<section> back onto the canonical root path.
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },

      /* ── Phase 2 information architecture ────────────────────────────
         Field Notes and the Scholar's Notebook merged into /notes, and
         the Writing index was absorbed into Systems. Every one of these
         paths was indexed and in the sitemap, so each gets a 301 rather
         than being allowed to 404. Article URLs under /writing are
         deliberately NOT moved — only the index did. */
      {
        source: "/field-notes",
        destination: "/notes",
        permanent: true,
      },
      {
        source: "/field-notes/:slug",
        destination: "/notes/:slug",
        permanent: true,
      },
      {
        source: "/archive",
        destination: "/notes",
        permanent: true,
      },
      {
        source: "/writing",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

export interface EmbeddedApp {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  description: string;
  url: string;
  tags: string[];
}

/**
 * Live applications embedded in-frame rather than opened as external
 * redirects — so a visitor can explore them and still navigate back into
 * the site. Rendered by /projects/[slug] via <EmbeddedApp>.
 */
export const embeddedApps: EmbeddedApp[] = [
  {
    slug: "color-workshop",
    title: "3D Color Workshop",
    year: "2025",
    tagline:
      "An interactive color explorer that shows how colors relate in perceptual space — not just on a flat wheel.",
    description:
      "Harmony modes, mood-based generation, curated film and brand palettes, and one-click export to CSS, Tailwind, SCSS, or JSON. Built with React and Three.js.",
    url: "https://color-workshop.vercel.app/",
    tags: ["React", "Three.js", "Color Theory", "Design Tools"],
  },
  {
    slug: "global-data-visual",
    title: "Global Data Visualizer",
    year: "2025",
    tagline:
      "A dashboard for exploring and contrasting global statistics — charts designed for navigation, not just display.",
    description:
      "Large international datasets are structurally comparable but rarely presented that way. Responsive, interactive charts built for side-by-side exploration.",
    url: "https://global-data-visual.vercel.app/",
    tags: ["React", "Data Visualization", "D3.js", "Dashboard"],
  },
];

export function getEmbeddedApp(slug: string): EmbeddedApp | undefined {
  return embeddedApps.find((a) => a.slug === slug);
}

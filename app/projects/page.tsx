import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import type { ShowcaseProject } from "@/components/ProjectsShowcase";
import { buildProjectCollectionJsonLd } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Systems — Engineering Work",
  description:
    "Engineering work by Ryan Pyles — systems architecture, AI narrative tooling, publishing infrastructure, and production-grade web applications built with Next.js, React, and TypeScript.",
  keywords: [
    "software engineer portfolio Chicago",
    "systems architecture",
    "AI narrative tooling",
    "Ryan Pyles developer",
    "Next.js projects",
    "TypeScript development",
  ],
  alternates: { canonical: "https://ryanpyles.com/projects" },
};

const projects: ShowcaseProject[] = [
  {
    slug: "dual-domain-system",
    title: "Dual-Domain Identity System",
    description:
      "Two publishing brands needed distinct visual identities without two codebases to maintain. One Next.js repository now serves both — domain detected at the edge, CSS tokens inverted per domain, zero shared components duplicated.",
    tags: ["Next.js", "TypeScript", "CSS Modules", "Middleware"],
    year: "2025",
  },
  {
    slug: "language-typography-engine",
    title: "Multi-Language Typography Engine",
    description:
      "A site studying eleven languages needed to look like it was designed for each one, not just translated. RTL layout, CJK font stacks, and localized UI strings switch simultaneously from a single context dispatch — no layout shift, no flash of wrong direction.",
    tags: ["React Context", "i18n", "Typography", "RTL"],
    year: "2025",
  },
  {
    slug: "blob-navigation",
    title: "3D Identity Navigation",
    description:
      "Navigation as a spatial object rather than a list. A WebGL organic blob deforms in real time under cursor pressure, with region-mapped navigation nodes and domain-differentiated lighting — making the interface itself feel like it belongs to the brand.",
    tags: ["Three.js", "R3F", "WebGL", "GLSL"],
    year: "2025",
  },
  {
    slug: "book-seo-system",
    title: "Book SEO Architecture",
    description:
      "Nine books needed discoverable, accurate pages without per-title manual SEO work. The book data model is the SEO model — one typed interface generates static pages, Open Graph tags, Twitter Cards, and JSON-LD Book schemas automatically.",
    tags: ["Next.js", "SEO", "JSON-LD", "Static Generation"],
    year: "2025",
  },
  {
    slug: "editorial-design-system",
    title: "Editorial Design System",
    description:
      "A publishing platform needs typographic precision across contexts a general-purpose UI framework won't provide. Custom CSS token system with vertical rhythm, semantic color roles, and responsive type scales — built specifically for long-form literary content.",
    tags: ["CSS", "Design Tokens", "Typography", "Responsive"],
    year: "2025",
  },
  {
    slug: "content-architecture",
    title: "Data-Driven Content Architecture",
    description:
      "Content that lives in component files doesn't scale and can't be queried. Typed TypeScript schemas for books, projects, and field notes feed static generation, SEO pipelines, and UI simultaneously — one source of truth, zero duplication.",
    tags: ["TypeScript", "Content Architecture", "Static Generation"],
    year: "2025",
  },
  {
    slug: "continuity-atlas",
    title: "Continuity Atlas",
    description:
      "Novelists working with AI have no tool for tracking what the model knows versus what the author knows. Continuity Atlas separates those layers — characters as evolving states, voice as behavioral metrics, narrative secrets hidden from generation.",
    tags: ["React", "Product Design", "Narrative Design", "Framer Motion"],
    year: "2025",
  },
  {
    slug: "color-workshop",
    title: "3D Color Workshop",
    description:
      "Color theory tools that live in 2D can't show how colors relate in perceptual space. An interactive 3D color explorer with harmony modes, mood-based generation, film and brand palettes, and export to CSS, Tailwind, SCSS, or JSON.",
    tags: ["React", "Three.js", "Color Theory", "Design Tools"],
    live: true,
    year: "2025",
  },
  {
    slug: "global-data-visual",
    title: "Global Data Visualizer",
    description:
      "Large international datasets are structurally comparable but rarely presented that way. An interactive dashboard for exploring and contrasting global statistics — responsive charts designed for navigation, not just display.",
    tags: ["React", "Data Visualization", "D3.js", "Dashboard"],
    live: true,
    year: "2025",
  },
];

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildProjectCollectionJsonLd(
            projects.map((p) => ({ slug: p.slug, title: p.title }))
          ),
        }}
      />
      <ProjectsShowcase projects={projects} />
    </SiteLayout>
  );
}

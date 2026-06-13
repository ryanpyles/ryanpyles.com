import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web development and design projects by Ryan J. Pyles — systems architecture, brand identity, and production-grade web applications.",
  keywords: [
    "web developer portfolio Chicago",
    "brand and web design services",
    "Ryan J. Pyles developer",
    "Next.js projects",
    "TypeScript development",
  ],
};

const projects: Project[] = [
  {
    slug: "dual-domain-system",
    title: "Dual-Domain Identity System",
    description:
      "A single Next.js codebase serving two distinct brand identities via domain-based rendering. Middleware routing, shared design tokens, and independent theme differentiation.",
    tags: ["Next.js", "TypeScript", "CSS Modules", "Middleware"],
    year: "2025",
  },
  {
    slug: "language-typography-engine",
    title: "Multi-Language Typography Engine",
    description:
      "RTL support, CJK font stack switching, and localized UI strings across eleven languages. Browser detection, localStorage persistence, and dynamic `dir` attribute management.",
    tags: ["React Context", "i18n", "Typography", "RTL"],
    year: "2025",
  },
  {
    slug: "blob-navigation",
    title: "3D Identity Navigation",
    description:
      "WebGL organic blob interface using Three.js and React Three Fiber. Cursor-reactive deformation, region-mapped navigation nodes, and domain-differentiated lighting rigs.",
    tags: ["Three.js", "R3F", "WebGL", "GLSL"],
    year: "2025",
  },
  {
    slug: "book-seo-system",
    title: "Book SEO Architecture",
    description:
      "Statically generated book pages with per-title metadata, Open Graph tags, Twitter Cards, and JSON-LD structured data (Book, Person, Organization schemas).",
    tags: ["Next.js", "SEO", "JSON-LD", "Static Generation"],
    year: "2025",
  },
  {
    slug: "editorial-design-system",
    title: "Editorial Design System",
    description:
      "Token-based design system for literary publishing: CSS custom properties, vertical rhythm, semantic color roles, and responsive type scales — no UI framework.",
    tags: ["CSS", "Design Tokens", "Typography", "Responsive"],
    year: "2025",
  },
  {
    slug: "content-architecture",
    title: "Data-Driven Content Architecture",
    description:
      "TypeScript content layer for books and projects. Typed schemas, index files, and utility functions that feed static generation, SEO pipelines, and UI components.",
    tags: ["TypeScript", "Content Architecture", "Static Generation"],
    year: "2025",
  },
  {
    slug: "continuity-atlas",
    title: "Continuity Atlas",
    description:
      "A visual story-memory system for novelists working with AI. Characters tracked as evolving states, voice as behavioral metrics, and an author-only layer that keeps narrative secrets hidden from generation.",
    tags: ["React", "Product Design", "Narrative Design", "Framer Motion"],
    year: "2025",
  },
  {
    slug: "color-workshop",
    title: "3D Color Workshop",
    description:
      "Interactive 3D color space explorer and palette builder. Color wheel picking, harmony modes (Mono, Comp, Triadic, Tetrad, and more), mood-based generation, film and brand reference palettes, and export to CSS variables, Tailwind, SCSS, or JSON.",
    tags: ["React", "Three.js", "Color Theory", "Design Tools"],
    href: "https://color-workshop.vercel.app/",
    year: "2025",
  },
  {
    slug: "global-data-visual",
    title: "Global Data Visualizer",
    description:
      "Interactive dashboard for exploring and comparing global datasets. Responsive charts and data views built for navigating large-scale international statistics at a glance.",
    tags: ["React", "Data Visualization", "D3.js", "Dashboard"],
    href: "https://global-data-visual.vercel.app/",
    year: "2025",
  },
];

export default function ProjectsPage() {
  return (
    <SiteLayout background="systems">
      <Section>
        <header className={styles.header}>
          <h1>Systems</h1>
          <p className={styles.intro}>
            Systems built to last. Work that resists entropy.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}

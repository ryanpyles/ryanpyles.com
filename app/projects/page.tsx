import React from "react";
import { buildPageMetadata } from "@/lib/metadata";
import { subpageLanguageAlternates } from "@/lib/i18n";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import EssaysSection from "@/components/EssaysSection";
import { showcaseProjects } from "@/content/projects/showcase";

export const metadata: Metadata = buildPageMetadata({
  title: "Systems — Engineering Work",
  description:
    "Engineering work by Ryan Pyles — systems architecture, AI narrative tooling, publishing infrastructure, and production-grade web applications built with Next.js, React, and TypeScript.",
  path: "/projects",
  keywords: [
    "software engineer portfolio Chicago",
    "systems architecture",
    "AI narrative tooling",
    "Ryan Pyles developer",
    "Next.js projects",
    "TypeScript development",
  ],
  languageAlternates: subpageLanguageAlternates("/projects"),
});

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <ProjectsShowcase projects={showcaseProjects} />

      {/* The long-form write-ups belong with the systems they describe,
          not in a separate section that read as a blog. */}
      <EssaysSection
        kicker="Long form"
        heading="Engineering essays"
        intro="First-hand technical writing from shipped work. One diagram, one real code sample, one honest failure per piece."
      />
    </SiteLayout>
  );
}

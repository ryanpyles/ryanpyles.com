import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaseStudyView from "@/components/CaseStudyView";
import ContinuityAtlasCaseStudy from "@/components/ContinuityAtlasCaseStudy";
import EmbeddedApp from "@/components/EmbeddedApp";
import {
  projectCases,
  getCaseStudy,
  getAdjacentCases,
} from "@/content/projectCases";
import { embeddedApps, getEmbeddedApp } from "@/content/embeddedApps";
import {
  buildPageMetadata,
  buildCaseStudyJsonLd,
  buildEmbeddedAppJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/metadata";

/** Systems › <title> breadcrumb for a project detail page. */
function projectBreadcrumb(title: string, slug: string): string {
  return buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Systems", path: "/projects" },
    { name: title, path: `/projects/${slug}` },
  ]);
}
import styles from "./page.module.css";

const ProjectDemo = dynamic(() => import("@/components/ProjectDemo"), {
  ssr: false,
  loading: () => <div className={styles.demoSkeleton} />,
});

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [
    ...projectCases.map((c) => ({ slug: c.slug })),
    ...embeddedApps.map((a) => ({ slug: a.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getEmbeddedApp(params.slug);
  if (app) {
    return buildPageMetadata({
      title: `${app.title} — Live App`,
      description: app.tagline,
      path: `/projects/${app.slug}`,
      keywords: app.tags,
    });
  }
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return buildPageMetadata({
    title: `${cs.title} — Case Study`,
    description: cs.tagline,
    path: `/projects/${cs.slug}`,
    keywords: cs.stack,
  });
}

export default function CaseStudyPage({ params }: Props) {
  // Live applications render embedded in-frame instead of redirecting out.
  const app = getEmbeddedApp(params.slug);
  if (app) {
    return (
      <SiteLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildEmbeddedAppJsonLd(app) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: projectBreadcrumb(app.title, app.slug) }}
        />
        <EmbeddedApp app={app} />
      </SiteLayout>
    );
  }

  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  // The flagship case study keeps its bespoke, deeper layout.
  if (cs.slug === "continuity-atlas") {
    return (
      <SiteLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildCaseStudyJsonLd(cs) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: projectBreadcrumb(cs.title, cs.slug) }}
        />
        <ContinuityAtlasCaseStudy
          cs={cs}
          demo={<ProjectDemo type={cs.demo.type} />}
        />
      </SiteLayout>
    );
  }

  const { prev, next } = getAdjacentCases(cs.slug);

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildCaseStudyJsonLd(cs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: projectBreadcrumb(cs.title, cs.slug) }}
      />
      <CaseStudyView
        cs={cs}
        demo={<ProjectDemo type={cs.demo.type} />}
        prev={prev && { slug: prev.slug, title: prev.title }}
        next={next && { slug: next.slug, title: next.title }}
      />
    </SiteLayout>
  );
}

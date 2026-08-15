import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaseStudyView from "@/components/CaseStudyView";
import ContinuityAtlasCaseStudy from "@/components/ContinuityAtlasCaseStudy";
import EmbeddedApp from "@/components/EmbeddedApp";
import { projectCases, getCaseStudy } from "@/content/projectCases";
import { embeddedApps, getEmbeddedApp } from "@/content/embeddedApps";
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
    return {
      title: `${app.title} — Live App`,
      description: app.tagline,
    };
  }
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study`,
    description: cs.tagline,
  };
}

export default function CaseStudyPage({ params }: Props) {
  // Live applications render embedded in-frame instead of redirecting out.
  const app = getEmbeddedApp(params.slug);
  if (app) {
    return (
      <SiteLayout>
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
        <ContinuityAtlasCaseStudy
          cs={cs}
          demo={<ProjectDemo type={cs.demo.type} />}
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <CaseStudyView cs={cs} demo={<ProjectDemo type={cs.demo.type} />} />
    </SiteLayout>
  );
}

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
import {
  buildCaseStudyJsonLd,
  buildSoftwareAppJsonLd,
} from "@/lib/metadata";
import styles from "./page.module.css";

function JsonLd({ data }: { data: string }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />
  );
}

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
      alternates: { canonical: `https://ryanpyles.com/projects/${app.slug}` },
    };
  }
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study`,
    description: cs.tagline,
    alternates: { canonical: `https://ryanpyles.com/projects/${cs.slug}` },
  };
}

export default function CaseStudyPage({ params }: Props) {
  // Live applications render embedded in-frame instead of redirecting out.
  const app = getEmbeddedApp(params.slug);
  if (app) {
    return (
      <SiteLayout>
        <JsonLd
          data={buildSoftwareAppJsonLd({
            name: app.title,
            description: app.tagline,
            url: `https://ryanpyles.com/projects/${app.slug}`,
            category: "DesignApplication",
          })}
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
        <JsonLd
          data={buildSoftwareAppJsonLd({
            name: cs.title,
            description: cs.tagline,
            url: `https://ryanpyles.com/projects/${cs.slug}`,
            category: "DeveloperApplication",
          })}
        />
        <ContinuityAtlasCaseStudy
          cs={cs}
          demo={<ProjectDemo type={cs.demo.type} />}
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <JsonLd data={buildCaseStudyJsonLd(cs)} />
      <CaseStudyView cs={cs} demo={<ProjectDemo type={cs.demo.type} />} />
    </SiteLayout>
  );
}

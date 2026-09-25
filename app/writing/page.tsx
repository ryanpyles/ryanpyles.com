import React from "react";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import EssaysSection from "@/components/EssaysSection";
import SectionCta from "@/components/SectionCta";
import { buildPageMetadata, buildBreadcrumbJsonLd } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering essays",
  description:
    "First-hand technical writing from Ryan Pyles on AI story-memory systems, publishing infrastructure, and split digital identity — write-ups of shipped work, not a blog.",
  path: "/writing",
  keywords: [
    "AI story memory",
    "LLM novel continuity",
    "AI story bible",
    "pen name SEO",
    "publishing infrastructure",
    "Ryan Pyles essays",
  ],
});

export default function WritingIndexPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Essays", path: "/writing" },
          ]),
        }}
      />
      <EssaysSection
        kicker="Long form"
        heading="Engineering essays"
        intro="Write-ups of shipped systems. One diagram, one real code sample, one honest failure per piece. Also listed under Systems."
      />
      <SectionCta
        text="These essays describe systems I build for clients."
        primary={{ label: "Discuss a project →", href: "/contact" }}
        secondary={{ label: "View the systems →", href: "/projects" }}
      />
    </SiteLayout>
  );
}

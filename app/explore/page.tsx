import React from "react";
import type { Metadata } from "next";
import ExploreScene from "@/components/ExploreScene";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Explore",
  description:
    "A navigable spatial index of Ryan J. Pyles's work — travel laterally between sections, vertically within each. Software, AI, design, language, and fiction.",
  path: "/explore",
});

/**
 * /explore — the immersive mode. Rendered bare (no SiteLayout chrome) so the
 * experience owns the viewport; ExploreScene sets the ryan (paper) palette on
 * its own root. The real section links render in the HTML, so this page is
 * still crawlable and fully usable without WebGL.
 */
export default function ExplorePage() {
  return <ExploreScene />;
}

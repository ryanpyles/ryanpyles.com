import React from "react";
import { buildPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import VoigtProject from "@/components/VoigtProject";
import VoigtEssay from "@/components/VoigtEssay";

export const metadata: Metadata = buildPageMetadata({
  title: "The Voigt Project — One Maker, Two Public Identities",
  description:
    "Ryan Pyles builds systems; Elian Voigt tests them. A case study in engineering one body of work through two public identities — the studio FORMÆTRIX and the pen name Elian Voigt — and why the separation is methodology, not marketing.",
  path: "/voigt-project",
  keywords: [
    "Ryan Pyles",
    "Elian Voigt",
    "FORMÆTRIX",
    "pen name",
    "author identity",
    "narrative research",
  ],
  titleIsComplete: true,
});

export default function VoigtProjectPage() {
  return (
    <SiteLayout>
      <VoigtProject />
      <VoigtEssay />
    </SiteLayout>
  );
}

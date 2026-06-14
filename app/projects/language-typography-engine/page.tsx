import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import LangTypographyCaseStudy from "@/components/LangTypographyCaseStudy";

export const metadata: Metadata = {
  title: {
    absolute: "Multi-Language Typography Engine — Case Study | Ryan J. Pyles",
  },
  description:
    "Typography that doesn't just translate text — it reconfigures the entire reading surface for each language's structural requirements. Read this case study in seven languages.",
};

export default function LanguageTypographyEnginePage() {
  return (
    <SiteLayout>
      <LangTypographyCaseStudy />
    </SiteLayout>
  );
}

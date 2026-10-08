import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocaleShell from "@/components/LocaleShell";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Ae } from "@/components/Ae";
import Portrait from "@/components/Portrait";
import MotionPlate from "@/components/MotionPlate";
import ReadingSpine from "@/components/ReadingSpine";
import FaqBlock from "@/components/FaqBlock";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import { subpagesContent, aboutWorkMeta } from "@/content/locales/subpages";
import { aboutPractice } from "@/content/locales/aboutPractice";
import {
  isLocale,
  defaultLocale,
  landingLocales,
  localeTags,
  localizedPath,
  localizedHref,
  subpageLanguageAlternates,
  siteUrl,
  type Locale,
} from "@/lib/i18n";
import styles from "@/app/about/page.module.css";

const SECTION = "/about";

interface Params {
  params: { lang: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return landingLocales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: Params): Metadata {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) return {};
  const c = subpagesContent[lang as Locale].about;
  const url = `${siteUrl}${localizedPath(lang as Locale, SECTION)}`;
  const ogLocale = localeTags[lang as Locale];

  return {
    title: { absolute: `${c.title} — Ryan Pyles` },
    description: c.intro,
    alternates: {
      canonical: url,
      languages: subpageLanguageAlternates(SECTION),
      types: { "application/rss+xml": `${siteUrl}/feed.xml` },
    },
    openGraph: {
      title: `${c.title} — Ryan Pyles`,
      description: c.intro,
      url,
      siteName: "Ryan J. Pyles",
      ...(ogLocale ? { locale: ogLocale } : {}),
      type: "website",
      images: [{ url: "/og/ryan-default.jpg", width: 1200, height: 630, alt: "Ryan Pyles" }],
    },
    robots: { index: true, follow: true },
  };
}

export default function LocalizedAbout({ params }: Params) {
  const { lang } = params;
  if (!isLocale(lang) || lang === defaultLocale) notFound();
  const loc = lang as Locale;
  const c = subpagesContent[loc].about;
  const practice = aboutPractice[loc];

  return (
    <LocaleShell lang={loc}>
      <ReadingSpine />
      <Section>
        <PageHeader kicker={c.kicker} title={c.title} intro={c.intro} />

        <div className={styles.spread}>
          <div className={`${styles.row} ${styles.rowLead}`}>
            <MotionPlate
              src="/assets/videos/ryan-pyles-generalist.mp4"
              poster="/assets/videos/ryan-pyles-generalist-poster.jpg"
              label={practice.figures.leadLabel}
              index="fig. 01"
              caption={practice.figures.leadCaption}
              aspect="16 / 9"
              silent
              className={styles.leadPlate}
            />
            <p className={styles.lede}>{c.lede}</p>
          </div>

          <div className={`${styles.row} ${styles.rowStudio}`}>
            <Portrait
              src="/images/portraits/ryan-pyles-studio.jpg"
              alt={practice.figures.studioAlt}
              index="fig. 02"
              caption={practice.figures.studioCaption}
              aspect="4 / 3"
              sizes="(max-width: 900px) 100vw, 560px"
              className={styles.studioPlate}
            />
            <div className={styles.rowText}>
              <p>{c.studioParas[0]}</p>
              <p>{c.studioParas[1]}</p>
            </div>
          </div>

          <div className={`${styles.row} ${styles.rowFigure}`}>
            <div className={styles.rowText}>
              <p>{c.languagePara}</p>
              <p className={styles.pull}>{c.pull}</p>
            </div>
            <Portrait
              src="/images/portraits/ryan-pyles-figure.jpg"
              alt={practice.figures.figureAlt}
              index="fig. 03"
              caption={practice.figures.figureCaption}
              aspect="2 / 3"
              sizes="(max-width: 900px) 100vw, 300px"
              className={styles.figurePlate}
            />
          </div>
        </div>


        <section className={styles.practice} aria-label={practice.practiceLabel}>
          <h2 className={styles.practiceHeading}>{practice.practiceHeading}</h2>
          <p className={styles.practiceIntro}>{practice.practiceIntro}</p>
          <ol className={styles.disciplines}>
            {practice.disciplines.map((d) => (
              <li key={d.n} className={styles.discipline}>
                <span className={styles.disciplineNo}>{d.n}</span>
                <span className={styles.disciplineName}>{d.name}</span>
                <span className={styles.disciplineBody}>{d.body}</span>
              </li>
            ))}
          </ol>
          <p className={styles.selected}>
            {practice.selectedLead}{" "}
            {practice.systems.map((system, i) => (
              <span key={system.href}>
                {i > 0 ? ", " : null}
                <Link href={system.href}>{system.name}</Link> ({system.gloss})
              </span>
            ))}
            {" — "}
            {practice.selectedTail}
          </p>
          <p className={styles.stack}>
            <span className={styles.stackLabel}>{practice.stackLabel}</span>
            React · Next.js · TypeScript · Node · AI&nbsp;/&nbsp;RAG · Intl&nbsp;&&nbsp;i18n · CSS architecture
          </p>
        </section>

        <Reveal>
          <Figure
            src="/images/about/orrery-formaetrix.jpg"
            alt={practice.figures.orreryAlt}
            width={1168}
            height={784}
            index="fig. 04"
            caption={practice.figures.orreryCaption}
            sizes="(max-width: 900px) 100vw, 720px"
          />
        </Reveal>

        <div className={styles.closing}>
          <h2 className={styles.subheading}>
            FORM<Ae />TRIX
          </h2>
          <p>{c.imprintParas[0]}</p>
          <p>{c.imprintParas[1]}</p>

          <p className={styles.footnote}>
            <span className={styles.footnoteMarker}>*</span>
            {c.footnote}
          </p>

          <h2 className={styles.subheading}>{c.workHeading}</h2>
        </div>

        <div className={styles.workMap}>
          {c.workAreas.map((area, i) => (
            <Link
              key={aboutWorkMeta[i].href}
              href={localizedHref(loc, aboutWorkMeta[i].href)}
              className={styles.workEntry}
            >
              <span className={styles.workAnnotation} aria-hidden="true">
                {aboutWorkMeta[i].annotation}
              </span>
              <span className={styles.workLabel}>{area.label}</span>
              <span className={styles.workDesc}>{area.desc}</span>
            </Link>
          ))}
        </div>

        <div className={styles.contact}>
          <p>{c.contactLabel}</p>
          <a href="mailto:me@ryanpyles.com" className={styles.email}>
            me@ryanpyles.com
          </a>
          <Link href="/press" className={styles.pressLink}>
            {c.pressLink}
          </Link>
        </div>

        <FaqBlock heading={practice.faqHeading} items={practice.faq} />
      </Section>
    </LocaleShell>
  );
}

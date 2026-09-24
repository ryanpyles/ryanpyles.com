import type { Locale } from "@/lib/i18n";

/**
 * Per-locale landing content. Each locale is a genuine cultural variant, not a
 * translation of the English page: its own voice, descriptor, emphasis, and a
 * locale-specific signature device. The English canon (novels, notes, systems,
 * bio) is shared and linked into via `nav`/CTAs. Copy is original and kept
 * factually accurate (Elian Voigt, FORMÆTRIX, Chicago, six novels, twelve
 * languages).
 *
 * NOTE: the non-English copy should get a native-speaker proofing pass before
 * it backs paid campaigns.
 */
export interface LandingNavItem {
  label: string;
  href: string;
}

export type LandingSignature =
  | { kind: "pullQuote"; quote: string }
  | { kind: "systemStatus"; title: string; state: string; rows: string[] }
  | { kind: "vertical"; text: string; caption: string }
  | { kind: "triad"; lines: string[] };

export interface LandingContent {
  /** Content-subtree language (also applied to <html lang> on this route). */
  lang: string;
  /** One-line editorial lens for this locale (rendered as the eyebrow). */
  emphasis: string;
  /** Role line under the hero. */
  descriptor: string;
  hero: {
    statement: string;
    summary: string;
  };
  /** Localized "what are you looking for?" that prefaces the section index. */
  lookingFor: string;
  nav: LandingNavItem[];
  highlights: { value: string; label: string }[];
  formaetrix: {
    label: string;
    body: string;
    href: string;
  };
  signature: LandingSignature;
  ctas: {
    primary: LandingNavItem; // → /contact
    secondary: LandingNavItem; // → /projects
  };
  /** The memorable per-locale footer line. */
  footerArtifact: string;
  rights: string;
  /** The linguist touch: why the localization isn't literal. */
  localizationNote: {
    label: string;
    body: string;
  };
  /** Only Scandimix: an admission that the locale is a deliberate experiment. */
  experimentNote?: {
    label: string;
    body: string;
  };
}

const NAV = {
  about: "/about",
  projects: "/projects",
  fiction: "/books",
  writing: "/notes",
  work: "/work",
  contact: "/contact",
} as const;

export const landingContent: Record<Locale, LandingContent> = {
  en: {
    lang: "en",
    emphasis: "Multidisciplinary — systems, language, narrative",
    descriptor: "Solutions Architect · Designer · Developer · Author",
    hero: {
      statement:
        "I design systems, digital experiences, and stories that don't sit easily in a single category.",
      summary:
        "The archive behind the fiction of Elian Voigt, the FORMÆTRIX studio, and the language work.",
    },
    lookingFor: "What are you looking for?",
    nav: [
      { label: "About", href: NAV.about },
      { label: "Projects", href: NAV.projects },
      { label: "Fiction", href: NAV.fiction },
      { label: "Writing", href: NAV.writing },
      { label: "Work", href: NAV.work },
      { label: "Contact", href: NAV.contact },
    ],
    highlights: [
      { value: "Narrative systems", label: "for authors & publishers" },
      { value: "Six published novels", label: "as Elian Voigt" },
      { value: "Twelve languages", label: "in active study" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "A multidisciplinary practice where software, design, language, and narrative collide.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "pullQuote",
      quote: "An idea, sometimes, simply deserves to be given room.",
    },
    ctas: {
      primary: { label: "Discuss your project →", href: NAV.contact },
      secondary: { label: "View the systems →", href: NAV.projects },
    },
    footerArtifact: "Built in Chicago. Designed somewhere between disciplines.",
    rights: "All rights reserved.",
    localizationNote: {
      label: "Localization notes",
      body: "Each language here is written for its audience, not translated line-for-line. The long-form work stays in English.",
    },
  },

  es: {
    lang: "es",
    emphasis: "Diseño y experiencia humana",
    descriptor: "Arquitecto de soluciones · Diseñador · Desarrollador · Escritor",
    hero: {
      statement:
        "Diseño y construyo sistemas digitales, experiencias y herramientas que conectan ideas que normalmente viven por separado.",
      summary:
        "El archivo detrás de la ficción de Elian Voigt, el estudio FORMÆTRIX y el trabajo con las lenguas.",
    },
    lookingFor: "¿Qué estás buscando?",
    nav: [
      { label: "Sobre mí", href: NAV.about },
      { label: "Proyectos", href: NAV.projects },
      { label: "Ficción", href: NAV.fiction },
      { label: "Escritura", href: NAV.writing },
      { label: "Servicios", href: NAV.work },
      { label: "Contacto", href: NAV.contact },
    ],
    highlights: [
      { value: "Sistemas narrativos", label: "para autores y editoriales" },
      { value: "Seis novelas publicadas", label: "como Elian Voigt" },
      { value: "Doce idiomas", label: "en estudio activo" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "Una práctica multidisciplinar donde el software, el diseño, el lenguaje y la narrativa se encuentran.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "pullQuote",
      quote: "Una idea, a veces, solo merece que le dejemos espacio.",
    },
    ctas: {
      primary: { label: "Hablemos de tu proyecto →", href: NAV.contact },
      secondary: { label: "Ver los sistemas →", href: NAV.projects },
    },
    footerArtifact: "Hecho en Chicago. En algún punto entre disciplinas.",
    rights: "Todos los derechos reservados.",
    localizationNote: {
      label: "Notas de localización",
      body: "Cada idioma está escrito para su público, no traducido palabra por palabra. La obra extensa permanece en inglés.",
    },
  },

  fr: {
    lang: "fr",
    emphasis: "Éditorial — langue, écriture, design",
    descriptor: "Architecte de solutions · Designer · Développeur · Auteur",
    hero: {
      statement:
        "Je conçois des systèmes, des expériences numériques et des histoires qui n'entrent pas facilement dans une seule catégorie.",
      summary:
        "L'archive derrière la fiction d'Elian Voigt, le studio FORMÆTRIX et le travail sur les langues.",
    },
    lookingFor: "Que recherchez-vous ?",
    nav: [
      { label: "À propos", href: NAV.about },
      { label: "Projets", href: NAV.projects },
      { label: "Fiction", href: NAV.fiction },
      { label: "Écriture", href: NAV.writing },
      { label: "Services", href: NAV.work },
      { label: "Contact", href: NAV.contact },
    ],
    highlights: [
      { value: "Systèmes narratifs", label: "pour auteurs et éditeurs" },
      { value: "Six romans publiés", label: "sous le nom d'Elian Voigt" },
      { value: "Douze langues", label: "en étude active" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "Un laboratoire multidisciplinaire à la croisée du logiciel, du design, des langues et de la narration.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "pullQuote",
      quote: "Une idée, parfois, mérite simplement qu'on lui laisse de la place.",
    },
    ctas: {
      primary: { label: "Parlons de votre projet →", href: NAV.contact },
      secondary: { label: "Voir les systèmes →", href: NAV.projects },
    },
    footerArtifact: "Conçu à Chicago. Quelque part entre plusieurs disciplines.",
    rights: "Tous droits réservés.",
    localizationNote: {
      label: "Notes de localisation",
      body: "Chaque langue est écrite pour son public, et non traduite mot à mot. Les textes longs restent en anglais.",
    },
  },

  de: {
    lang: "de",
    emphasis: "Technik — Systeme und Struktur",
    descriptor: "Lösungsarchitekt · Designer · Entwickler · Autor",
    hero: {
      statement:
        "Ich entwickle digitale Systeme, Produkte und Erlebnisse an der Schnittstelle von Technologie, Design und Sprache.",
      summary:
        "Das Archiv hinter der Literatur von Elian Voigt, dem Studio FORMÆTRIX und der Spracharbeit.",
    },
    lookingFor: "Wonach suchen Sie?",
    nav: [
      { label: "Über mich", href: NAV.about },
      { label: "Projekte", href: NAV.projects },
      { label: "Literatur", href: NAV.fiction },
      { label: "Texte", href: NAV.writing },
      { label: "Leistungen", href: NAV.work },
      { label: "Kontakt", href: NAV.contact },
    ],
    highlights: [
      { value: "Narrative Systeme", label: "für Autoren und Verlage" },
      { value: "Sechs Romane", label: "als Elian Voigt" },
      { value: "Zwölf Sprachen", label: "im aktiven Studium" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "Eine multidisziplinäre Praxis an der Schnittstelle von Softwareentwicklung, Design, Sprache und narrativen Systemen.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "systemStatus",
      title: "Systemstatus",
      state: "Online",
      rows: ["6 Disziplinen", "5 Sprachen", "∞ Ideen"],
    },
    ctas: {
      primary: { label: "Über Ihr Projekt sprechen →", href: NAV.contact },
      secondary: { label: "Die Systeme ansehen →", href: NAV.projects },
    },
    footerArtifact: "Entwickelt in Chicago. Irgendwo zwischen mehreren Disziplinen.",
    rights: "Alle Rechte vorbehalten.",
    localizationNote: {
      label: "Lokalisierungshinweise",
      body: "Jede Sprache ist für ihr Publikum geschrieben, nicht Wort für Wort übersetzt. Die langen Texte bleiben auf Englisch.",
    },
  },

  ja: {
    lang: "ja",
    emphasis: "工芸 — 技術と美意識",
    descriptor: "ソリューションアーキテクト · デザイナー · 開発者 · 作家",
    hero: {
      statement: "技術、デザイン、言語、物語。それぞれの境界を越えて、デジタル体験をつくる。",
      summary:
        "Elian Voigt名義のフィクション、スタジオ FORMÆTRIX、そして言語の仕事——その背後にあるアーカイブ。",
    },
    lookingFor: "何をお探しですか？",
    nav: [
      { label: "私について", href: NAV.about },
      { label: "プロジェクト", href: NAV.projects },
      { label: "フィクション", href: NAV.fiction },
      { label: "執筆", href: NAV.writing },
      { label: "サービス", href: NAV.work },
      { label: "お問い合わせ", href: NAV.contact },
    ],
    highlights: [
      { value: "物語システム", label: "作家と出版社のために" },
      { value: "六つの長編", label: "Elian Voigt として" },
      { value: "十二の言語", label: "を継続して研究" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "ソフトウェア、デザイン、言語、物語。異なる領域を横断し、新しい体験を設計する。",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "vertical",
      text: "技術とデザイン",
      caption: "Craft & technology",
    },
    ctas: {
      primary: { label: "プロジェクトを相談する →", href: NAV.contact },
      secondary: { label: "システムを見る →", href: NAV.projects },
    },
    footerArtifact: "シカゴから。境界のあいだでつくる。",
    rights: "無断複写・転載を禁じます。",
    localizationNote: {
      label: "ローカライズについて",
      body: "各言語はその読者のために書かれており、逐語訳ではありません。長い文章は英語のままです。",
    },
  },

  it: {
    lang: "it",
    emphasis: "Umano — prosa espressiva",
    descriptor: "Architetto di soluzioni · Designer · Sviluppatore · Autore",
    hero: {
      statement:
        "Creo sistemi digitali, esperienze e storie all'incrocio tra tecnologia, design, linguaggio e immaginazione.",
      summary:
        "L'archivio dietro la narrativa di Elian Voigt, lo studio FORMÆTRIX e il lavoro sulle lingue.",
    },
    lookingFor: "Cosa stai cercando?",
    nav: [
      { label: "Chi sono", href: NAV.about },
      { label: "Progetti", href: NAV.projects },
      { label: "Narrativa", href: NAV.fiction },
      { label: "Scrittura", href: NAV.writing },
      { label: "Servizi", href: NAV.work },
      { label: "Contatti", href: NAV.contact },
    ],
    highlights: [
      { value: "Sistemi narrativi", label: "per autori ed editori" },
      { value: "Sei romanzi pubblicati", label: "come Elian Voigt" },
      { value: "Dodici lingue", label: "in studio attivo" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "Una pratica multidisciplinare dove software, design, linguaggio e narrazione si incontrano.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "pullQuote",
      quote: "Scrivo anche.",
    },
    ctas: {
      primary: { label: "Parliamo del tuo progetto →", href: NAV.contact },
      secondary: { label: "Guarda i sistemi →", href: NAV.projects },
    },
    footerArtifact: "Fatto a Chicago. Nato dalla curiosità.",
    rights: "Tutti i diritti riservati.",
    localizationNote: {
      label: "Note di localizzazione",
      body: "Ogni lingua è scritta per il suo pubblico, non tradotta parola per parola. I testi lunghi restano in inglese.",
    },
  },

  pt: {
    lang: "pt-BR",
    emphasis: "Conversacional — microcópia pessoal",
    descriptor: "Arquiteto de soluções · Designer · Desenvolvedor · Autor",
    hero: {
      statement:
        "Crio sistemas digitais, experiências e histórias onde tecnologia, design e linguagem se encontram.",
      summary:
        "O arquivo por trás da ficção de Elian Voigt, do estúdio FORMÆTRIX e do trabalho com as línguas.",
    },
    lookingFor: "O que você procura?",
    nav: [
      { label: "Sobre mim", href: NAV.about },
      { label: "Projetos", href: NAV.projects },
      { label: "Ficção", href: NAV.fiction },
      { label: "Escrita", href: NAV.writing },
      { label: "Serviços", href: NAV.work },
      { label: "Contato", href: NAV.contact },
    ],
    highlights: [
      { value: "Sistemas narrativos", label: "para autores e editoras" },
      { value: "Seis romances publicados", label: "como Elian Voigt" },
      { value: "Doze idiomas", label: "em estudo ativo" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "Uma prática multidisciplinar onde software, design, linguagem e narrativa se encontram.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "triad",
      lines: ["Feito para funcionar.", "Feito para durar.", "Feito para ser lembrado."],
    },
    ctas: {
      primary: { label: "Vamos falar do seu projeto →", href: NAV.contact },
      secondary: { label: "Ver os sistemas →", href: NAV.projects },
    },
    footerArtifact: "Feito em Chicago. Em algum lugar entre disciplinas.",
    rights: "Todos os direitos reservados.",
    localizationNote: {
      label: "Notas de localização",
      body: "Cada idioma é escrito para o seu público, não traduzido palavra por palavra. Os textos longos permanecem em inglês.",
    },
  },

  zh: {
    lang: "zh-Hant",
    emphasis: "簡約 — 台灣用語",
    descriptor: "解決方案架構師 · 設計師 · 開發者 · 作家",
    hero: {
      statement:
        "我在科技、設計、語言與故事之間尋找交會點，並將想法做成真正可以使用的東西。",
      summary:
        "Elian Voigt 的小說、FORMÆTRIX 工作室，以及語言的工作——背後的檔案庫。",
    },
    lookingFor: "您在找什麼？",
    nav: [
      { label: "關於我", href: NAV.about },
      { label: "專案", href: NAV.projects },
      { label: "小說", href: NAV.fiction },
      { label: "寫作", href: NAV.writing },
      { label: "服務", href: NAV.work },
      { label: "聯絡", href: NAV.contact },
    ],
    highlights: [
      { value: "敘事系統", label: "為作家與出版社" },
      { value: "六部長篇小說", label: "以 Elian Voigt 之名" },
      { value: "十二種語言", label: "持續研究中" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "一個跨領域的工作室，軟體、設計、語言與敘事在此交會。",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "vertical",
      text: "科技與敘事",
      caption: "Technology & narrative",
    },
    ctas: {
      primary: { label: "聊聊你的專案 →", href: NAV.contact },
      secondary: { label: "查看系統 →", href: NAV.projects },
    },
    footerArtifact: "來自芝加哥。在領域的交界處工作。",
    rights: "版權所有。",
    localizationNote: {
      label: "在地化說明",
      body: "每一種語言都是為它的讀者而寫，而非逐字翻譯；此處採用台灣用語（軟體、專案、網站、資訊）。長篇內容維持英文。",
    },
  },

  he: {
    lang: "he",
    emphasis: "כיווניות — התאמה מלאה מימין לשמאל",
    descriptor: "ארכיטקט פתרונות · מעצב · מפתח · סופר",
    hero: {
      statement:
        "אני בונה מערכות, חוויות דיגיטליות וסיפורים הנמצאים בין טכנולוגיה, עיצוב, שפה ותרבות.",
      summary:
        "הארכיון שמאחורי הסיפורת של Elian Voigt, אולפן FORMÆTRIX והעבודה עם השפות.",
    },
    lookingFor: "מה אתם מחפשים?",
    nav: [
      { label: "אודות", href: NAV.about },
      { label: "פרויקטים", href: NAV.projects },
      { label: "סיפורת", href: NAV.fiction },
      { label: "כתיבה", href: NAV.writing },
      { label: "שירותים", href: NAV.work },
      { label: "צור קשר", href: NAV.contact },
    ],
    highlights: [
      { value: "מערכות נרטיביות", label: "לסופרים ולמו״לים" },
      { value: "שישה רומנים", label: "בשם Elian Voigt" },
      { value: "שתים־עשרה שפות", label: "בלימוד פעיל" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "פרקטיקה רב־תחומית שבה תוכנה, עיצוב, שפה ונרטיב נפגשים.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "pullQuote",
      quote: "בין השורות.",
    },
    ctas: {
      primary: { label: "← נדבר על הפרויקט שלך", href: NAV.contact },
      secondary: { label: "← לצפייה במערכות", href: NAV.projects },
    },
    footerArtifact: "נבנה בשיקגו. אי־שם בין התחומים.",
    rights: "כל הזכויות שמורות.",
    localizationNote: {
      label: "הערות לוקליזציה",
      body: "כל שפה נכתבת עבור הקהל שלה ואינה תרגום מילולי. כאן הממשק כולו עובר לכיוון ימין־לשמאל. הטקסטים הארוכים נשארים באנגלית.",
    },
  },

  skandi: {
    lang: "no",
    emphasis: "Eksperiment — nordisk hybrid",
    descriptor: "Løysingsarkitekt · Designar · Utviklar · Forfattar",
    hero: {
      statement:
        "Eg bygger digitale system, formar opplevingar og skriv historier mellom teknologi, språk og menneske.",
      summary:
        "Arkivet bak skjønnlitteraturen til Elian Voigt, studioet FORMÆTRIX og språkarbeidet.",
    },
    lookingFor: "Kva ser du etter?",
    nav: [
      { label: "Om meg", href: NAV.about },
      { label: "Prosjekt", href: NAV.projects },
      { label: "Skjønnlitteratur", href: NAV.fiction },
      { label: "Skriving", href: NAV.writing },
      { label: "Tenester", href: NAV.work },
      { label: "Kontakt", href: NAV.contact },
    ],
    highlights: [
      { value: "Narrative system", label: "for forfattarar og forlag" },
      { value: "Seks romanar", label: "som Elian Voigt" },
      { value: "Tolv språk", label: "i aktiv studie" },
    ],
    formaetrix: {
      label: "FORMÆTRIX",
      body: "Ein tverrfagleg praksis der programvare, design, språk og forteljing møtest.",
      href: "https://www.formaetrix.com",
    },
    signature: {
      kind: "pullQuote",
      quote: "Eg bygger system, formar opplevingar og skriv historier.",
    },
    ctas: {
      primary: { label: "Snakk om prosjektet →", href: NAV.contact },
      secondary: { label: "Sjå systema →", href: NAV.projects },
    },
    footerArtifact: "Laga i Chicago. Ein stad mellom disiplinar.",
    rights: "Alle rettar reserverte.",
    localizationNote: {
      label: "Om lokaliseringa",
      body: "Kvart språk er skrive for lesaren sin, ikkje omsett ord for ord. Dei lange tekstane er på engelsk.",
    },
    experimentNote: {
      label: "Skandimix",
      body: "Ein personleg nordisk hybrid. Ikkje heilt svensk. Ikkje heilt norsk. Ikkje heilt dansk — språk som noko å designe med.",
    },
  },
};

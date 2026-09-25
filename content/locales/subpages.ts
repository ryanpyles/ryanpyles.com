import type { Locale } from "@/lib/i18n";
import type { ShowcaseMasthead } from "@/components/ProjectsShowcase";
import type { InquiryFormLabels } from "@/components/InquiryForm";

/**
 * Localized copy for the five section-landing subpages (Systems, Work, Fiction,
 * About, Contact). This translates the *page copy* — headings, intros, the Work
 * services/process, the About bio, the Contact form and its options, and all UI
 * labels/CTAs. It deliberately does NOT translate the records themselves: book
 * blurbs and case-study titles/descriptions stay in English, because those are
 * the catalogue, not chrome. Proper nouns (FORMÆTRIX, Elian Voigt, Continuity
 * Atlas, Next.js, …) are kept as-is.
 *
 * Each locale also carries an easter egg: a single culturally untranslatable
 * word, surfaced subtly in the footer and the console. See LocaleEgg.
 *
 * NOTE: like the landing copy, the non-English text should get a native-speaker
 * proofing pass before it backs paid campaigns.
 */

export interface WorkService {
  name: string;
  body: string;
}

export interface Engagement {
  name: string;
  body: string;
}

export interface AboutWorkArea {
  label: string;
  desc: string;
}

export interface SubpageEasterEgg {
  /** The untranslatable word itself. */
  word: string;
  /** A terse gloss (one line). */
  gloss: string;
  /** The full, in-voice reveal that ties the word to the work. */
  reveal: string;
}

export interface SubpagesContent {
  chrome: {
    /** Link back to this locale's landing (/<lang>). */
    backToIndex: string;
    /** Accessible label for the wordmark home link. */
    homeLabel: string;
  };
  projects: {
    masthead: ShowcaseMasthead;
    essaysKicker: string;
    essaysHeading: string;
    essaysIntro: string;
  };
  work: {
    kicker: string;
    title: string;
    intro: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    servicesLabel: string;
    /** Four services, in the canonical order. Proof link is shared per index. */
    services: [WorkService, WorkService, WorkService, WorkService];
    proofPrefix: string;
    engagementsLabel: string;
    /** Three engagements, in order (numbers 01–03 are shared). */
    engagements: [Engagement, Engagement, Engagement];
    processLabel: string;
    /** Five process steps, in order. */
    process: [string, string, string, string, string];
    outcomesLabel: string;
    outcomes: string[];
    finalCtaText: string;
    finalCtaPrimary: string;
  };
  books: {
    kicker: string;
    title: string;
    intro: string;
    byLabel: string;
    viewLabel: string;
  };
  about: {
    kicker: string;
    title: string;
    intro: string;
    lede: string;
    studioParas: [string, string];
    languagePara: string;
    pull: string;
    imprintParas: [string, string];
    footnote: string;
    workHeading: string;
    workAreas: [AboutWorkArea, AboutWorkArea, AboutWorkArea];
    contactLabel: string;
    pressLink: string;
  };
  contact: {
    kicker: string;
    title: string;
    intro: string;
    acceptingLabel: string;
    acceptingList: string[];
    formLabel: string;
    form: InquiryFormLabels;
    preferEmailLabel: string;
    howLabel: string;
    /** Uses {link} where the "how I work" anchor goes. */
    howText: string;
    howLinkLabel: string;
    goodFitLabel: string;
    goodFit: string[];
    notFitLabel: string;
    notFit: string[];
    /** Uses {link} where the press-page anchor goes. */
    note: string;
    pressLinkLabel: string;
  };
  easterEgg: SubpageEasterEgg;
}

// ── Shared, non-translated references ──────────────────────────────────────
// Proof links point at the English case studies (detail pages aren't localized).
export const workProofLinks = [
  { label: "Continuity Atlas", href: "/projects/continuity-atlas" },
  { label: "Book SEO Architecture", href: "/projects/book-seo-system" },
  { label: "Typography Engine", href: "/projects/language-typography-engine" },
  { label: "Content Architecture", href: "/projects/content-architecture" },
] as const;

/** Annotations / hrefs for the About work-map (shared across locales). */
export const aboutWorkMeta = [
  { annotation: "fn. ——", href: "/notes" },
  { annotation: "∑ systems", href: "/projects" },
  { annotation: "≡ fiction", href: "/books" },
] as const;

export const subpagesContent: Record<Locale, SubpagesContent> = {
  // ── English (canonical; used as the fallback shape) ────────────────────
  en: {
    chrome: { backToIndex: "← Index", homeLabel: "Ryan J. Pyles — home" },
    projects: {
      masthead: {
        kicker: "Selected engineering — 2025",
        title: "Systems",
        intro:
          "Systems built to last — architecture, interfaces, and the infrastructure underneath. Work that resists entropy.",
        scrollCue: "Scroll the index ↓",
      },
      essaysKicker: "Long form",
      essaysHeading: "Engineering essays",
      essaysIntro:
        "First-hand technical writing from shipped work. One diagram, one real code sample, one honest failure per piece.",
    },
    work: {
      kicker: "Work with FORMÆTRIX",
      title: "Work",
      intro: "Design and engineering for systems where language is load-bearing.",
      lede:
        "I build for publishers, authors, and teams whose products live or die on language, structure, and typography — from AI narrative tooling to the publishing infrastructure underneath it. Every engagement below is backed by shipped work you can inspect.",
      ctaPrimary: "Start a project →",
      ctaSecondary: "View the systems →",
      servicesLabel: "What I build",
      services: [
        {
          name: "AI narrative tooling",
          body: "Story-memory systems, continuity validation, and inspectable AI workflows for long-form fiction and publishing — the machinery around the model, not another prompt.",
        },
        {
          name: "Publishing & author platforms",
          body: "Author sites, catalogue systems, and the SEO and structured-data layer underneath — where one typed content model generates pages, metadata, and schema automatically.",
        },
        {
          name: "Editorial web systems",
          body: "Reading-first interfaces with real typographic control — multilingual layout, RTL and CJK, and design-token systems built for long-form content rather than generic UI.",
        },
        {
          name: "Systems & content architecture",
          body: "Typed content infrastructure that keeps UI, static generation, SEO, and structured data from drifting apart — one source of truth, framework-agnostic.",
        },
      ],
      proofPrefix: "Proof:",
      engagementsLabel: "How engagements work",
      engagements: [
        {
          name: "Project build",
          body: "Fixed-scope design and engineering, discovery through launch. The default engagement.",
        },
        {
          name: "Prototype sprint",
          body: "A short, focused build to prove an idea or de-risk a decision before a full commitment.",
        },
        {
          name: "Advisory",
          body: "Architecture reviews and technical direction for teams already building — no open-ended retainer.",
        },
      ],
      processLabel: "How the work moves",
      process: ["Discovery", "Architecture", "Prototype", "Build", "Launch"],
      outcomesLabel: "Selected outcomes",
      outcomes: [
        "An AI-powered narrative-continuity platform for long-form fiction.",
        "Publishing infrastructure supporting a growing catalogue of novels.",
        "Multilingual editorial systems with genuine typographic control.",
        "React / TypeScript products shipped from concept through deployment.",
      ],
      finalCtaText: "Have something that fits? Tell me what you're building.",
      finalCtaPrimary: "Start a project →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "Fiction",
      intro: "Novels that resist easy resolution. Fiction built from constraint.",
      byLabel: "by",
      viewLabel: "View book",
    },
    about: {
      kicker: "Ryan J. Pyles — the archive",
      title: "About",
      intro:
        "Author, engineer, and linguist in Chicago — the person behind FORMÆTRIX and Elian Voigt.",
      lede:
        "Ryan J. Pyles writes experimental fiction and builds web systems. The work — across both disciplines — starts from the same premise: what is the minimum necessary to make something hold?",
      studioParas: [
        "His novels operate through formal constraint. Each book proposes a structure — a legal brief, a grammar of declensions, an archive of measurement — and then inhabits that structure until it produces something the structure alone could not predict. The result is fiction that is precise without being cold, and strange without being ornamental.",
        "On the web side, he works at the intersection of identity, language, and system design. His practice is editorial rather than decorative — built on the conviction that good design is the absence of everything that isn't load-bearing.",
      ],
      languagePara:
        "He studies twelve languages and is interested in the way grammar constrains and enables thought — and in how those constraints travel between natural language and code.",
      pull: "He is based in Chicago.",
      imprintParas: [
        "FORMÆTRIX is an imprint Ryan founded for work that operates at the edge of what publishing categories can hold. It is the home of Elian Voigt — the literary identity through which Ryan's fiction is released — whose books refuse the distinction between literary and genre fiction.",
        "The relationship between the person and the imprint is not fully explained here. It is felt in the work.",
      ],
      footnote:
        "Ryan Pyles is the real person. Elian Voigt is the authorial identity — a distinct literary voice, not a pseudonym in any simple sense. The distinction matters less than the work it produces.",
      workHeading: "The Work",
      workAreas: [
        {
          label: "Notes",
          desc: "Short entries on language, writing, software, and design, written close to the moment — alongside a Scholar's Notebook of structural observations on twelve languages under active study.",
        },
        {
          label: "Systems & Projects",
          desc: "Software built because the fiction and the publishing required it. Identity systems, narrative engines, editorial architecture.",
        },
        {
          label: "Fiction Catalogue",
          desc: "The complete catalogue of novels published under the Elian Voigt name, with notes on form, structure, and context.",
        },
      ],
      contactLabel: "For inquiries:",
      pressLink: "Press & media kit →",
    },
    contact: {
      kicker: "Work with FORMÆTRIX",
      title: "Start a project",
      intro:
        "Tell me what you're building. I read every inquiry myself and reply within about two business days.",
      acceptingLabel: "Currently accepting",
      acceptingList: [
        "AI narrative tooling",
        "Publishing & author platforms",
        "Editorial web systems",
        "Prototype & discovery sprints",
      ],
      formLabel: "The inquiry",
      form: {
        projectTypes: [
          "AI narrative tooling",
          "Publishing / author platform",
          "Editorial web system",
          "Systems & content architecture",
          "Prototype / discovery sprint",
          "Something else",
        ],
        budgets: ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+", "Not sure yet"],
        timelines: ["Exploring", "Next 1–3 months", "3–6 months", "Flexible"],
        select: "Select…",
        name: "Name *",
        email: "Email *",
        organization: "Organization",
        optional: "(optional)",
        projectType: "Project type",
        budget: "Budget",
        timeline: "Timeline",
        message: "What are you trying to build? *",
        messagePlaceholder:
          "The problem, who it's for, and what success looks like. A paragraph is plenty.",
        ready: "Ready to send",
        progress: "{filled} of {total} — name, email, a few words",
        submit: "Start the conversation →",
        privacy:
          "Opens your email app with the details filled in. No data is stored here.",
        doneTitle: "Your draft is ready.",
        doneBody:
          "Your email client should have opened with everything filled in — just hit send. If nothing opened, email me directly at {email} or copy the message below.",
        copy: "Copy the message",
        copied: "Copied ✓",
        editInquiry: "← Edit the inquiry",
      },
      preferEmailLabel: "Prefer email?",
      howLabel: "How engagements work",
      howText:
        "I take on a small number of selected engagements at a time — fixed-scope project builds, short prototype/discovery sprints, and advisory. See {link} for the full picture.",
      howLinkLabel: "how I work",
      goodFitLabel: "Good fit",
      goodFit: [
        "AI narrative tooling and story-memory systems",
        "Publishing and author platforms — Next.js, structured content, SEO",
        "Web apps with language, typography, or data at the center",
        "A prototype that has to prove an idea before a full build",
      ],
      notFitLabel: "Not a fit",
      notFit: [
        "Ongoing maintenance or open-ended retainer support",
        "Projects requiring a large team or agency infrastructure",
        "Rush timelines without a prior relationship",
      ],
      note:
        "I don't respond to cold pitches, unsolicited manuscripts, or automated outreach. For press and media, see the {link}.",
      pressLinkLabel: "press page",
    },
    easterEgg: {
      word: "hapax",
      gloss: "a word that appears only once in a whole body of text",
      reveal:
        "hapax legomenon — a word that occurs exactly once across an entire corpus. You found the one that occurs once on this site.",
    },
  },

  // ── Español ────────────────────────────────────────────────────────────
  es: {
    chrome: { backToIndex: "← Índice", homeLabel: "Ryan J. Pyles — inicio" },
    projects: {
      masthead: {
        kicker: "Ingeniería seleccionada — 2025",
        title: "Sistemas",
        intro:
          "Sistemas hechos para durar: arquitectura, interfaces y la infraestructura que hay debajo. Trabajo que resiste la entropía.",
        scrollCue: "Recorre el índice ↓",
      },
      essaysKicker: "Textos largos",
      essaysHeading: "Ensayos de ingeniería",
      essaysIntro:
        "Escritura técnica en primera persona sobre trabajo ya publicado. Un diagrama, un fragmento de código real y un fracaso honesto por pieza.",
    },
    work: {
      kicker: "Trabaja con FORMÆTRIX",
      title: "Servicios",
      intro: "Diseño e ingeniería para sistemas donde el lenguaje es estructural.",
      lede:
        "Trabajo para editoriales, autores y equipos cuyos productos dependen del lenguaje, la estructura y la tipografía: desde herramientas narrativas con IA hasta la infraestructura editorial que las sostiene. Cada modalidad de abajo está respaldada por trabajo real que puedes inspeccionar.",
      ctaPrimary: "Empezar un proyecto →",
      ctaSecondary: "Ver los sistemas →",
      servicesLabel: "Lo que construyo",
      services: [
        {
          name: "Herramientas narrativas con IA",
          body: "Sistemas de memoria narrativa, validación de continuidad y flujos de IA inspeccionables para ficción extensa y edición: la maquinaria alrededor del modelo, no otro prompt más.",
        },
        {
          name: "Plataformas de edición y autores",
          body: "Sitios de autor, sistemas de catálogo y la capa de SEO y datos estructurados que hay debajo, donde un único modelo de contenido tipado genera páginas, metadatos y esquemas de forma automática.",
        },
        {
          name: "Sistemas web editoriales",
          body: "Interfaces pensadas primero para la lectura, con control tipográfico real: composición multilingüe, RTL y CJK, y sistemas de tokens de diseño hechos para textos largos, no para UI genérica.",
        },
        {
          name: "Arquitectura de sistemas y contenido",
          body: "Infraestructura de contenido tipada que evita que la UI, la generación estática, el SEO y los datos estructurados se desalineen: una sola fuente de verdad, independiente del framework.",
        },
      ],
      proofPrefix: "Prueba:",
      engagementsLabel: "Cómo funcionan los encargos",
      engagements: [
        {
          name: "Proyecto completo",
          body: "Diseño e ingeniería de alcance fijo, del descubrimiento al lanzamiento. El encargo por defecto.",
        },
        {
          name: "Sprint de prototipo",
          body: "Un desarrollo breve y enfocado para probar una idea o reducir el riesgo de una decisión antes de un compromiso mayor.",
        },
        {
          name: "Asesoría",
          body: "Revisiones de arquitectura y dirección técnica para equipos que ya están construyendo, sin contratos abiertos.",
        },
      ],
      processLabel: "Cómo avanza el trabajo",
      process: ["Descubrimiento", "Arquitectura", "Prototipo", "Construcción", "Lanzamiento"],
      outcomesLabel: "Resultados seleccionados",
      outcomes: [
        "Una plataforma de continuidad narrativa con IA para ficción extensa.",
        "Infraestructura editorial que sostiene un catálogo creciente de novelas.",
        "Sistemas editoriales multilingües con control tipográfico real.",
        "Productos en React / TypeScript llevados del concepto al despliegue.",
      ],
      finalCtaText: "¿Tienes algo que encaje? Cuéntame qué estás construyendo.",
      finalCtaPrimary: "Empezar un proyecto →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "Ficción",
      intro: "Novelas que se resisten a la resolución fácil. Ficción hecha desde la restricción.",
      byLabel: "por",
      viewLabel: "Ver libro",
    },
    about: {
      kicker: "Ryan J. Pyles — el archivo",
      title: "Sobre mí",
      intro:
        "Autor, ingeniero y lingüista en Chicago: la persona detrás de FORMÆTRIX y Elian Voigt.",
      lede:
        "Ryan J. Pyles escribe ficción experimental y construye sistemas web. El trabajo —en ambas disciplinas— parte de la misma premisa: ¿qué es lo mínimo necesario para que algo se sostenga?",
      studioParas: [
        "Sus novelas funcionan mediante la restricción formal. Cada libro propone una estructura —un escrito jurídico, una gramática de declinaciones, un archivo de mediciones— y luego la habita hasta producir algo que la estructura por sí sola no podría predecir. El resultado es una ficción precisa sin ser fría, y extraña sin ser ornamental.",
        "En lo digital, trabaja en el cruce de la identidad, el lenguaje y el diseño de sistemas. Su práctica es editorial más que decorativa, sostenida por la convicción de que el buen diseño es la ausencia de todo lo que no es estructural.",
      ],
      languagePara:
        "Estudia doce idiomas y le interesa cómo la gramática limita y a la vez habilita el pensamiento, y cómo esas restricciones viajan entre la lengua natural y el código.",
      pull: "Vive en Chicago.",
      imprintParas: [
        "FORMÆTRIX es un sello que Ryan fundó para el trabajo que opera en el límite de lo que las categorías editoriales pueden contener. Es la casa de Elian Voigt —la identidad literaria a través de la cual se publica la ficción de Ryan—, cuyos libros rechazan la distinción entre ficción literaria y de género.",
        "La relación entre la persona y el sello no se explica del todo aquí. Se siente en el trabajo.",
      ],
      footnote:
        "Ryan Pyles es la persona real. Elian Voigt es la identidad autoral: una voz literaria propia, no un seudónimo en el sentido simple. La distinción importa menos que el trabajo que produce.",
      workHeading: "El trabajo",
      workAreas: [
        {
          label: "Notas",
          desc: "Entradas breves sobre lengua, escritura, software y diseño, escritas al calor del momento, junto a un Cuaderno del Estudioso con observaciones estructurales sobre doce idiomas en estudio activo.",
        },
        {
          label: "Sistemas y proyectos",
          desc: "Software construido porque la ficción y la edición lo exigían. Sistemas de identidad, motores narrativos, arquitectura editorial.",
        },
        {
          label: "Catálogo de ficción",
          desc: "El catálogo completo de novelas publicadas bajo el nombre de Elian Voigt, con notas sobre forma, estructura y contexto.",
        },
      ],
      contactLabel: "Para consultas:",
      pressLink: "Prensa y kit de medios →",
    },
    contact: {
      kicker: "Trabaja con FORMÆTRIX",
      title: "Empezar un proyecto",
      intro:
        "Cuéntame qué estás construyendo. Leo cada consulta yo mismo y respondo en unos dos días hábiles.",
      acceptingLabel: "Actualmente acepto",
      acceptingList: [
        "Herramientas narrativas con IA",
        "Plataformas de edición y autores",
        "Sistemas web editoriales",
        "Sprints de prototipo y descubrimiento",
      ],
      formLabel: "La consulta",
      form: {
        projectTypes: [
          "Herramientas narrativas con IA",
          "Plataforma de edición / autor",
          "Sistema web editorial",
          "Arquitectura de sistemas y contenido",
          "Sprint de prototipo / descubrimiento",
          "Otra cosa",
        ],
        budgets: [
          "Menos de 10.000 $",
          "10.000 – 25.000 $",
          "25.000 – 50.000 $",
          "Más de 50.000 $",
          "Aún no lo sé",
        ],
        timelines: ["Explorando", "En 1–3 meses", "3–6 meses", "Flexible"],
        select: "Elegir…",
        name: "Nombre *",
        email: "Correo *",
        organization: "Organización",
        optional: "(opcional)",
        projectType: "Tipo de proyecto",
        budget: "Presupuesto",
        timeline: "Plazos",
        message: "¿Qué quieres construir? *",
        messagePlaceholder:
          "El problema, para quién es y cómo se ve el éxito. Con un párrafo basta.",
        ready: "Listo para enviar",
        progress: "{filled} de {total} — nombre, correo y unas líneas",
        submit: "Iniciar la conversación →",
        privacy:
          "Abre tu app de correo con los datos ya rellenados. Aquí no se guarda nada.",
        doneTitle: "Tu borrador está listo.",
        doneBody:
          "Tu cliente de correo debería haberse abierto con todo rellenado; solo dale a enviar. Si no se abrió nada, escríbeme directamente a {email} o copia el mensaje de abajo.",
        copy: "Copiar el mensaje",
        copied: "Copiado ✓",
        editInquiry: "← Editar la consulta",
      },
      preferEmailLabel: "¿Prefieres el correo?",
      howLabel: "Cómo funcionan los encargos",
      howText:
        "Acepto un número reducido de encargos seleccionados a la vez: proyectos de alcance fijo, sprints breves de prototipo/descubrimiento y asesoría. Consulta {link} para el panorama completo.",
      howLinkLabel: "cómo trabajo",
      goodFitLabel: "Buen encaje",
      goodFit: [
        "Herramientas narrativas con IA y sistemas de memoria narrativa",
        "Plataformas de edición y autores: Next.js, contenido estructurado, SEO",
        "Aplicaciones web con lengua, tipografía o datos en el centro",
        "Un prototipo que debe probar una idea antes de un desarrollo completo",
      ],
      notFitLabel: "No encaja",
      notFit: [
        "Mantenimiento continuo o soporte por contrato abierto",
        "Proyectos que requieren un equipo grande o infraestructura de agencia",
        "Plazos urgentes sin una relación previa",
      ],
      note:
        "No respondo a propuestas en frío, manuscritos no solicitados ni mensajería automática. Para prensa y medios, consulta la {link}.",
      pressLinkLabel: "página de prensa",
    },
    easterEgg: {
      word: "sobremesa",
      gloss: "la conversación que se queda en la mesa cuando la comida ya acabó",
      reveal:
        "Sobremesa: el rato que nadie se levanta de la mesa porque la conversación sigue. El buen trabajo, como la buena sobremesa, empieza cuando ya podrías haberte ido.",
    },
  },

  // ── Français ───────────────────────────────────────────────────────────
  fr: {
    chrome: { backToIndex: "← Index", homeLabel: "Ryan J. Pyles — accueil" },
    projects: {
      masthead: {
        kicker: "Ingénierie choisie — 2025",
        title: "Systèmes",
        intro:
          "Des systèmes faits pour durer : architecture, interfaces et l'infrastructure en dessous. Un travail qui résiste à l'entropie.",
        scrollCue: "Parcourir l'index ↓",
      },
      essaysKicker: "Textes longs",
      essaysHeading: "Essais d'ingénierie",
      essaysIntro:
        "De l'écriture technique à la première personne, tirée de travaux livrés. Un schéma, un vrai extrait de code et un échec assumé par texte.",
    },
    work: {
      kicker: "Travailler avec FORMÆTRIX",
      title: "Services",
      intro: "Design et ingénierie pour les systèmes où la langue est porteuse.",
      lede:
        "Je conçois pour des éditeurs, des auteurs et des équipes dont les produits reposent sur la langue, la structure et la typographie — des outils narratifs par IA jusqu'à l'infrastructure éditoriale qui les soutient. Chaque prestation ci-dessous s'appuie sur un travail livré que vous pouvez examiner.",
      ctaPrimary: "Lancer un projet →",
      ctaSecondary: "Voir les systèmes →",
      servicesLabel: "Ce que je construis",
      services: [
        {
          name: "Outils narratifs par IA",
          body: "Systèmes de mémoire narrative, validation de continuité et flux d'IA inspectables pour la fiction longue et l'édition — la mécanique autour du modèle, pas un prompt de plus.",
        },
        {
          name: "Plateformes d'édition et d'auteurs",
          body: "Sites d'auteur, systèmes de catalogue et la couche de SEO et de données structurées en dessous, où un seul modèle de contenu typé génère automatiquement pages, métadonnées et schémas.",
        },
        {
          name: "Systèmes web éditoriaux",
          body: "Des interfaces pensées d'abord pour la lecture, avec un vrai contrôle typographique : mise en page multilingue, RTL et CJK, et systèmes de tokens de design faits pour les textes longs plutôt que pour une UI générique.",
        },
        {
          name: "Architecture de systèmes et de contenu",
          body: "Une infrastructure de contenu typée qui empêche l'UI, la génération statique, le SEO et les données structurées de diverger — une seule source de vérité, indépendante du framework.",
        },
      ],
      proofPrefix: "Preuve :",
      engagementsLabel: "Comment se déroulent les missions",
      engagements: [
        {
          name: "Projet complet",
          body: "Design et ingénierie à périmètre fixe, du cadrage au lancement. La mission par défaut.",
        },
        {
          name: "Sprint de prototype",
          body: "Un développement court et ciblé pour prouver une idée ou réduire le risque d'une décision avant un engagement complet.",
        },
        {
          name: "Conseil",
          body: "Revues d'architecture et direction technique pour des équipes qui construisent déjà — sans forfait ouvert.",
        },
      ],
      processLabel: "Comment le travail avance",
      process: ["Cadrage", "Architecture", "Prototype", "Développement", "Lancement"],
      outcomesLabel: "Résultats choisis",
      outcomes: [
        "Une plateforme de continuité narrative par IA pour la fiction longue.",
        "Une infrastructure éditoriale qui soutient un catalogue de romans en croissance.",
        "Des systèmes éditoriaux multilingues avec un vrai contrôle typographique.",
        "Des produits React / TypeScript menés du concept au déploiement.",
      ],
      finalCtaText: "Quelque chose qui correspond ? Dites-moi ce que vous construisez.",
      finalCtaPrimary: "Lancer un projet →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "Fiction",
      intro: "Des romans qui refusent la résolution facile. Une fiction née de la contrainte.",
      byLabel: "par",
      viewLabel: "Voir le livre",
    },
    about: {
      kicker: "Ryan J. Pyles — l'archive",
      title: "À propos",
      intro:
        "Auteur, ingénieur et linguiste à Chicago — la personne derrière FORMÆTRIX et Elian Voigt.",
      lede:
        "Ryan J. Pyles écrit de la fiction expérimentale et construit des systèmes web. Le travail — dans les deux disciplines — part de la même prémisse : quel est le minimum nécessaire pour que quelque chose tienne ?",
      studioParas: [
        "Ses romans fonctionnent par la contrainte formelle. Chaque livre propose une structure — un mémoire juridique, une grammaire de déclinaisons, un archivage de mesures — puis l'habite jusqu'à produire ce que la structure seule ne pouvait prévoir. Il en résulte une fiction précise sans être froide, et étrange sans être ornementale.",
        "Côté web, il travaille à l'intersection de l'identité, de la langue et de la conception de systèmes. Sa pratique est éditoriale plutôt que décorative — fondée sur la conviction qu'un bon design est l'absence de tout ce qui n'est pas porteur.",
      ],
      languagePara:
        "Il étudie douze langues et s'intéresse à la manière dont la grammaire contraint et rend possible la pensée — et à la façon dont ces contraintes circulent entre la langue naturelle et le code.",
      pull: "Il vit à Chicago.",
      imprintParas: [
        "FORMÆTRIX est une maison que Ryan a fondée pour le travail qui opère à la limite de ce que les catégories éditoriales peuvent contenir. C'est la demeure d'Elian Voigt — l'identité littéraire par laquelle paraît la fiction de Ryan —, dont les livres refusent la distinction entre littérature et fiction de genre.",
        "La relation entre la personne et la maison n'est pas entièrement expliquée ici. Elle se ressent dans le travail.",
      ],
      footnote:
        "Ryan Pyles est la personne réelle. Elian Voigt est l'identité auctoriale — une voix littéraire à part entière, pas un pseudonyme au sens simple. La distinction importe moins que le travail qu'elle produit.",
      workHeading: "Le travail",
      workAreas: [
        {
          label: "Notes",
          desc: "De courtes entrées sur la langue, l'écriture, le logiciel et le design, écrites au plus près du moment — aux côtés d'un Carnet du chercheur regroupant des observations structurelles sur douze langues étudiées activement.",
        },
        {
          label: "Systèmes et projets",
          desc: "Des logiciels nés parce que la fiction et l'édition les exigeaient. Systèmes d'identité, moteurs narratifs, architecture éditoriale.",
        },
        {
          label: "Catalogue de fiction",
          desc: "Le catalogue complet des romans parus sous le nom d'Elian Voigt, avec des notes sur la forme, la structure et le contexte.",
        },
      ],
      contactLabel: "Pour toute demande :",
      pressLink: "Presse et dossier média →",
    },
    contact: {
      kicker: "Travailler avec FORMÆTRIX",
      title: "Lancer un projet",
      intro:
        "Dites-moi ce que vous construisez. Je lis chaque demande moi-même et je réponds sous deux jours ouvrés environ.",
      acceptingLabel: "Actuellement ouvert à",
      acceptingList: [
        "Outils narratifs par IA",
        "Plateformes d'édition et d'auteurs",
        "Systèmes web éditoriaux",
        "Sprints de prototype et de cadrage",
      ],
      formLabel: "La demande",
      form: {
        projectTypes: [
          "Outils narratifs par IA",
          "Plateforme d'édition / d'auteur",
          "Système web éditorial",
          "Architecture de systèmes et de contenu",
          "Sprint de prototype / cadrage",
          "Autre chose",
        ],
        budgets: [
          "Moins de 10 000 $",
          "10 000 – 25 000 $",
          "25 000 – 50 000 $",
          "Plus de 50 000 $",
          "Pas encore sûr",
        ],
        timelines: ["En réflexion", "D'ici 1 à 3 mois", "3 à 6 mois", "Flexible"],
        select: "Choisir…",
        name: "Nom *",
        email: "E-mail *",
        organization: "Organisation",
        optional: "(facultatif)",
        projectType: "Type de projet",
        budget: "Budget",
        timeline: "Échéance",
        message: "Que cherchez-vous à construire ? *",
        messagePlaceholder:
          "Le problème, à qui il s'adresse et à quoi ressemble la réussite. Un paragraphe suffit.",
        ready: "Prêt à envoyer",
        progress: "{filled} sur {total} — nom, e-mail, quelques mots",
        submit: "Démarrer la conversation →",
        privacy:
          "Ouvre votre messagerie avec les détails déjà remplis. Rien n'est stocké ici.",
        doneTitle: "Votre brouillon est prêt.",
        doneBody:
          "Votre client de messagerie devrait s'être ouvert, tout est rempli — il ne reste qu'à envoyer. Si rien ne s'est ouvert, écrivez-moi directement à {email} ou copiez le message ci-dessous.",
        copy: "Copier le message",
        copied: "Copié ✓",
        editInquiry: "← Modifier la demande",
      },
      preferEmailLabel: "Vous préférez l'e-mail ?",
      howLabel: "Comment se déroulent les missions",
      howText:
        "Je prends un petit nombre de missions choisies à la fois — projets à périmètre fixe, courts sprints de prototype/cadrage, et conseil. Voir {link} pour le tableau complet.",
      howLinkLabel: "comment je travaille",
      goodFitLabel: "Bon accord",
      goodFit: [
        "Outils narratifs par IA et systèmes de mémoire narrative",
        "Plateformes d'édition et d'auteurs — Next.js, contenu structuré, SEO",
        "Applications web où la langue, la typographie ou les données sont au centre",
        "Un prototype qui doit prouver une idée avant un développement complet",
      ],
      notFitLabel: "Pas un bon accord",
      notFit: [
        "Maintenance continue ou support en forfait ouvert",
        "Projets nécessitant une grande équipe ou une infrastructure d'agence",
        "Délais serrés sans relation préalable",
      ],
      note:
        "Je ne réponds pas aux démarchages à froid, aux manuscrits non sollicités ni aux relances automatiques. Pour la presse et les médias, voir la {link}.",
      pressLinkLabel: "page presse",
    },
    easterEgg: {
      word: "l'esprit de l'escalier",
      gloss: "la réplique parfaite qui n'arrive qu'une fois la porte fermée",
      reveal:
        "« L'esprit de l'escalier » — la réponse parfaite qui ne vous vient qu'en descendant l'escalier, trop tard. Concevoir, c'est remonter l'escalier avant de fermer la porte.",
    },
  },

  // ── Deutsch ──────────────────────────────────────────────────────────────
  de: {
    chrome: { backToIndex: "← Index", homeLabel: "Ryan J. Pyles — Startseite" },
    projects: {
      masthead: {
        kicker: "Ausgewählte Entwicklung — 2025",
        title: "Systeme",
        intro:
          "Systeme, die halten sollen — Architektur, Schnittstellen und die Infrastruktur darunter. Arbeit, die der Entropie widersteht.",
        scrollCue: "Index durchscrollen ↓",
      },
      essaysKicker: "Langtexte",
      essaysHeading: "Essays zur Entwicklung",
      essaysIntro:
        "Technische Texte aus erster Hand, aus ausgelieferter Arbeit. Ein Diagramm, ein echtes Codebeispiel, ein ehrliches Scheitern pro Stück.",
    },
    work: {
      kicker: "Mit FORMÆTRIX arbeiten",
      title: "Leistungen",
      intro: "Design und Entwicklung für Systeme, in denen Sprache tragend ist.",
      lede:
        "Ich baue für Verlage, Autorinnen und Autoren sowie Teams, deren Produkte von Sprache, Struktur und Typografie leben — von KI-gestützten Erzählwerkzeugen bis zur Verlagsinfrastruktur darunter. Jede Leistung unten ist durch ausgelieferte Arbeit belegt, die Sie prüfen können.",
      ctaPrimary: "Projekt starten →",
      ctaSecondary: "Die Systeme ansehen →",
      servicesLabel: "Was ich baue",
      services: [
        {
          name: "KI-gestützte Erzählwerkzeuge",
          body: "Systeme für Erzählgedächtnis, Kontinuitätsprüfung und nachvollziehbare KI-Abläufe für lange Fiktion und den Verlag — die Maschinerie um das Modell herum, nicht noch ein Prompt.",
        },
        {
          name: "Verlags- und Autorenplattformen",
          body: "Autorenseiten, Katalogsysteme und die darunterliegende Schicht aus SEO und strukturierten Daten, in der ein einziges typisiertes Inhaltsmodell Seiten, Metadaten und Schemata automatisch erzeugt.",
        },
        {
          name: "Redaktionelle Websysteme",
          body: "Leseorientierte Oberflächen mit echter typografischer Kontrolle — mehrsprachiges Layout, RTL und CJK sowie Design-Token-Systeme, die für lange Texte gebaut sind, nicht für generische UI.",
        },
        {
          name: "System- und Inhaltsarchitektur",
          body: "Typisierte Inhaltsinfrastruktur, die verhindert, dass UI, statische Generierung, SEO und strukturierte Daten auseinanderdriften — eine einzige Quelle der Wahrheit, frameworkunabhängig.",
        },
      ],
      proofPrefix: "Beleg:",
      engagementsLabel: "Wie die Zusammenarbeit läuft",
      engagements: [
        {
          name: "Projektaufbau",
          body: "Design und Entwicklung mit festem Umfang, von der Analyse bis zum Start. Die Standardleistung.",
        },
        {
          name: "Prototyp-Sprint",
          body: "Ein kurzer, fokussierter Aufbau, um eine Idee zu belegen oder eine Entscheidung abzusichern, bevor man sich voll festlegt.",
        },
        {
          name: "Beratung",
          body: "Architektur-Reviews und technische Leitung für Teams, die bereits bauen — ohne offenen Retainer.",
        },
      ],
      processLabel: "Wie die Arbeit voranschreitet",
      process: ["Analyse", "Architektur", "Prototyp", "Aufbau", "Start"],
      outcomesLabel: "Ausgewählte Ergebnisse",
      outcomes: [
        "Eine KI-gestützte Plattform für Erzählkontinuität in langer Fiktion.",
        "Verlagsinfrastruktur, die einen wachsenden Katalog von Romanen trägt.",
        "Mehrsprachige redaktionelle Systeme mit echter typografischer Kontrolle.",
        "React-/TypeScript-Produkte, vom Konzept bis zum Deployment ausgeliefert.",
      ],
      finalCtaText: "Etwas, das passt? Erzählen Sie mir, was Sie bauen.",
      finalCtaPrimary: "Projekt starten →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "Literatur",
      intro: "Romane, die sich der einfachen Auflösung verweigern. Fiktion aus Beschränkung gebaut.",
      byLabel: "von",
      viewLabel: "Buch ansehen",
    },
    about: {
      kicker: "Ryan J. Pyles — das Archiv",
      title: "Über mich",
      intro:
        "Autor, Ingenieur und Linguist in Chicago — der Mensch hinter FORMÆTRIX und Elian Voigt.",
      lede:
        "Ryan J. Pyles schreibt experimentelle Fiktion und baut Websysteme. Die Arbeit — in beiden Disziplinen — geht von derselben Prämisse aus: Was ist das Mindeste, damit etwas trägt?",
      studioParas: [
        "Seine Romane arbeiten über formale Beschränkung. Jedes Buch schlägt eine Struktur vor — einen juristischen Schriftsatz, eine Grammatik der Deklinationen, ein Archiv der Messung — und bewohnt sie dann so lange, bis etwas entsteht, das die Struktur allein nicht vorhersagen konnte. Das Ergebnis ist Fiktion, die präzise ist, ohne kalt zu sein, und fremd, ohne ornamental zu sein.",
        "Im Digitalen arbeitet er an der Schnittstelle von Identität, Sprache und Systemgestaltung. Seine Praxis ist redaktionell statt dekorativ — getragen von der Überzeugung, dass gutes Design das Fehlen von allem ist, was nicht tragend ist.",
      ],
      languagePara:
        "Er studiert zwölf Sprachen und interessiert sich dafür, wie Grammatik das Denken einschränkt und ermöglicht — und wie diese Beschränkungen zwischen natürlicher Sprache und Code wandern.",
      pull: "Er lebt in Chicago.",
      imprintParas: [
        "FORMÆTRIX ist ein Verlagslabel, das Ryan für Arbeit gegründet hat, die am Rand dessen operiert, was verlegerische Kategorien fassen können. Es ist das Zuhause von Elian Voigt — der literarischen Identität, durch die Ryans Fiktion erscheint — deren Bücher die Unterscheidung zwischen Literatur und Genrefiktion verweigern.",
        "Das Verhältnis zwischen der Person und dem Label wird hier nicht vollständig erklärt. Es ist in der Arbeit zu spüren.",
      ],
      footnote:
        "Ryan Pyles ist die reale Person. Elian Voigt ist die Autoren-Identität — eine eigenständige literarische Stimme, kein Pseudonym im einfachen Sinn. Die Unterscheidung zählt weniger als die Arbeit, die sie hervorbringt.",
      workHeading: "Die Arbeit",
      workAreas: [
        {
          label: "Notizen",
          desc: "Kurze Einträge zu Sprache, Schreiben, Software und Design, nah am Moment geschrieben — neben einem Gelehrtenheft mit strukturellen Beobachtungen zu zwölf aktiv studierten Sprachen.",
        },
        {
          label: "Systeme & Projekte",
          desc: "Software, gebaut, weil die Fiktion und der Verlag sie verlangten. Identitätssysteme, Erzählmaschinen, redaktionelle Architektur.",
        },
        {
          label: "Werkverzeichnis",
          desc: "Das vollständige Verzeichnis der unter dem Namen Elian Voigt erschienenen Romane, mit Anmerkungen zu Form, Struktur und Kontext.",
        },
      ],
      contactLabel: "Für Anfragen:",
      pressLink: "Presse & Medienkit →",
    },
    contact: {
      kicker: "Mit FORMÆTRIX arbeiten",
      title: "Projekt starten",
      intro:
        "Erzählen Sie mir, was Sie bauen. Ich lese jede Anfrage selbst und antworte innerhalb von etwa zwei Werktagen.",
      acceptingLabel: "Aktuell offen für",
      acceptingList: [
        "KI-gestützte Erzählwerkzeuge",
        "Verlags- und Autorenplattformen",
        "Redaktionelle Websysteme",
        "Prototyp- und Analyse-Sprints",
      ],
      formLabel: "Die Anfrage",
      form: {
        projectTypes: [
          "KI-gestützte Erzählwerkzeuge",
          "Verlags- / Autorenplattform",
          "Redaktionelles Websystem",
          "System- und Inhaltsarchitektur",
          "Prototyp- / Analyse-Sprint",
          "Etwas anderes",
        ],
        budgets: [
          "Unter 10.000 $",
          "10.000 – 25.000 $",
          "25.000 – 50.000 $",
          "Über 50.000 $",
          "Noch unklar",
        ],
        timelines: ["Am Sondieren", "In 1–3 Monaten", "3–6 Monate", "Flexibel"],
        select: "Auswählen…",
        name: "Name *",
        email: "E-Mail *",
        organization: "Organisation",
        optional: "(optional)",
        projectType: "Projektart",
        budget: "Budget",
        timeline: "Zeitrahmen",
        message: "Was möchten Sie bauen? *",
        messagePlaceholder:
          "Das Problem, für wen es ist und wie Erfolg aussieht. Ein Absatz genügt.",
        ready: "Bereit zum Senden",
        progress: "{filled} von {total} — Name, E-Mail, ein paar Worte",
        submit: "Das Gespräch beginnen →",
        privacy:
          "Öffnet Ihre E-Mail-App mit den ausgefüllten Angaben. Hier wird nichts gespeichert.",
        doneTitle: "Ihr Entwurf ist fertig.",
        doneBody:
          "Ihr E-Mail-Programm sollte sich mit allem ausgefüllt geöffnet haben — nur noch abschicken. Falls sich nichts geöffnet hat, schreiben Sie mir direkt an {email} oder kopieren Sie die Nachricht unten.",
        copy: "Nachricht kopieren",
        copied: "Kopiert ✓",
        editInquiry: "← Anfrage bearbeiten",
      },
      preferEmailLabel: "Lieber per E-Mail?",
      howLabel: "Wie die Zusammenarbeit läuft",
      howText:
        "Ich übernehme jeweils eine kleine Zahl ausgewählter Projekte — Projektaufbauten mit festem Umfang, kurze Prototyp-/Analyse-Sprints und Beratung. Das ganze Bild finden Sie unter {link}.",
      howLinkLabel: "wie ich arbeite",
      goodFitLabel: "Gut passend",
      goodFit: [
        "KI-gestützte Erzählwerkzeuge und Systeme für Erzählgedächtnis",
        "Verlags- und Autorenplattformen — Next.js, strukturierte Inhalte, SEO",
        "Web-Apps mit Sprache, Typografie oder Daten im Zentrum",
        "Ein Prototyp, der eine Idee vor dem vollen Aufbau belegen muss",
      ],
      notFitLabel: "Nicht passend",
      notFit: [
        "Laufende Wartung oder offener Retainer-Support",
        "Projekte, die ein großes Team oder Agenturinfrastruktur brauchen",
        "Eilige Termine ohne vorherige Beziehung",
      ],
      note:
        "Ich reagiere nicht auf Kaltakquise, unaufgeforderte Manuskripte oder automatisierte Ansprache. Für Presse und Medien siehe die {link}.",
      pressLinkLabel: "Presseseite",
    },
    easterEgg: {
      word: "Fingerspitzengefühl",
      gloss: "das feine Gespür in den Fingerspitzen für das Richtige",
      reveal:
        "Fingerspitzengefühl — das Gespür, das in den Fingerspitzen sitzt, wenn es auf das genaue Maß ankommt. Ein System hält nicht durch Regeln allein, sondern durch das Gefühl, wann eine Regel genug ist.",
    },
  },

  // ── 日本語 ─────────────────────────────────────────────────────────────
  ja: {
    chrome: { backToIndex: "← 目次", homeLabel: "Ryan J. Pyles — ホーム" },
    projects: {
      masthead: {
        kicker: "選りすぐりのエンジニアリング — 2025",
        title: "システム",
        intro:
          "長く使うために築いたシステム——アーキテクチャ、インターフェース、そしてその下の基盤。エントロピーに抗う仕事。",
        scrollCue: "目次をスクロール ↓",
      },
      essaysKicker: "長文",
      essaysHeading: "エンジニアリング・エッセイ",
      essaysIntro:
        "納品した仕事から書いた一次情報の技術文。一篇につき、図がひとつ、実際のコードがひとつ、そして正直な失敗がひとつ。",
    },
    work: {
      kicker: "FORMÆTRIX と仕事する",
      title: "サービス",
      intro: "言語が構造を支えるシステムのための設計とエンジニアリング。",
      lede:
        "言語・構造・タイポグラフィが成否を分けるプロダクトを持つ出版社、作家、チームのために制作します——AI 物語ツールから、その下を支える出版基盤まで。以下の各サービスは、実際に検証できる納品済みの仕事に裏づけられています。",
      ctaPrimary: "プロジェクトを始める →",
      ctaSecondary: "システムを見る →",
      servicesLabel: "つくるもの",
      services: [
        {
          name: "AI 物語ツール",
          body: "長編フィクションと出版のための、物語記憶システム、連続性の検証、そして検証可能な AI ワークフロー——モデルの周りの仕組みであって、もうひとつのプロンプトではありません。",
        },
        {
          name: "出版・作家プラットフォーム",
          body: "作家サイト、カタログシステム、そしてその下の SEO と構造化データの層——ひとつの型付きコンテンツモデルが、ページ・メタデータ・スキーマを自動で生成します。",
        },
        {
          name: "編集的なウェブシステム",
          body: "読むことを第一に、本物のタイポグラフィ制御を備えたインターフェース——多言語レイアウト、RTL と CJK、そして汎用 UI ではなく長文のために築いたデザイントークンのシステム。",
        },
        {
          name: "システムとコンテンツの設計",
          body: "UI、静的生成、SEO、構造化データがばらばらに散らばらないための型付きコンテンツ基盤——単一の真実の源、フレームワークに依存しません。",
        },
      ],
      proofPrefix: "実証:",
      engagementsLabel: "仕事の進め方",
      engagements: [
        {
          name: "フルプロジェクト",
          body: "範囲を固定した設計とエンジニアリング、調査から公開まで。既定の関わり方です。",
        },
        {
          name: "プロトタイプ・スプリント",
          body: "本格的に取り組む前に、アイデアを証明し、決定のリスクを下げるための、短く集中した制作。",
        },
        {
          name: "アドバイザリー",
          body: "すでに開発中のチームへのアーキテクチャレビューと技術的な方向づけ——期限のない顧問契約はなし。",
        },
      ],
      processLabel: "仕事の流れ",
      process: ["調査", "設計", "プロトタイプ", "制作", "公開"],
      outcomesLabel: "選りすぐりの成果",
      outcomes: [
        "長編フィクションのための、AI による物語連続性プラットフォーム。",
        "増えつづける小説カタログを支える出版基盤。",
        "本物のタイポグラフィ制御を備えた多言語の編集システム。",
        "構想から公開まで届けた React / TypeScript のプロダクト。",
      ],
      finalCtaText: "合いそうなものがありますか？ つくっているものを教えてください。",
      finalCtaPrimary: "プロジェクトを始める →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "フィクション",
      intro: "たやすい決着を拒む小説。制約から築いたフィクション。",
      byLabel: "著",
      viewLabel: "本を見る",
    },
    about: {
      kicker: "Ryan J. Pyles — アーカイブ",
      title: "私について",
      intro:
        "シカゴを拠点とする作家・エンジニア・言語学者——FORMÆTRIX と Elian Voigt の背後にいる人物。",
      lede:
        "Ryan J. Pyles は実験的なフィクションを書き、ウェブシステムを築きます。どちらの領域でも、仕事は同じ前提から始まります——何かを成り立たせるために、最小限必要なものは何か？",
      studioParas: [
        "彼の小説は形式上の制約によって動きます。それぞれの本が構造を——法的な準備書面、格変化の文法、測定のアーカイブを——提案し、その中に住みつづけ、やがて構造だけでは予測できなかった何かを生み出します。結果として生まれるのは、冷たくないのに精密で、装飾的でないのに奇妙なフィクションです。",
        "ウェブの側では、彼はアイデンティティ・言語・システム設計の交点で仕事をします。その実践は装飾的というより編集的です——良いデザインとは、構造を支えないすべてが取り除かれた状態だ、という確信に基づいています。",
      ],
      languagePara:
        "彼は十二の言語を学び、文法がどのように思考を制約し、また可能にするか——そしてその制約が自然言語とコードのあいだをどう行き来するかに関心を寄せています。",
      pull: "拠点はシカゴ。",
      imprintParas: [
        "FORMÆTRIX は、出版のカテゴリーが抱えきれる境界の際で動く仕事のために、Ryan が立ち上げたインプリントです。ここは Elian Voigt の家——Ryan のフィクションが世に出るための文学的アイデンティティ——であり、その本は純文学とジャンル小説の区別を拒みます。",
        "人物とインプリントの関係は、ここで完全には説明されません。それは仕事のなかで感じ取られます。",
      ],
      footnote:
        "Ryan Pyles は実在の人物です。Elian Voigt は作家としてのアイデンティティ——単なる筆名ではなく、独立した文学的な声です。その区別よりも、そこから生まれる仕事のほうが重要です。",
      workHeading: "仕事",
      workAreas: [
        {
          label: "ノート",
          desc: "言語・執筆・ソフトウェア・デザインについて、その瞬間の近くで書いた短い記録——あわせて、積極的に研究している十二の言語の構造的観察をまとめた研究者のノートも。",
        },
        {
          label: "システムとプロジェクト",
          desc: "フィクションと出版が必要としたために築いたソフトウェア。アイデンティティシステム、物語エンジン、編集のアーキテクチャ。",
        },
        {
          label: "フィクション目録",
          desc: "Elian Voigt の名で出版された小説の完全な目録。形式・構造・文脈についての注記つき。",
        },
      ],
      contactLabel: "お問い合わせ:",
      pressLink: "プレス & メディアキット →",
    },
    contact: {
      kicker: "FORMÆTRIX と仕事する",
      title: "プロジェクトを始める",
      intro:
        "つくっているものを教えてください。いただいたお問い合わせはすべて自分で読み、およそ二営業日以内にお返事します。",
      acceptingLabel: "現在お受けしているもの",
      acceptingList: [
        "AI 物語ツール",
        "出版・作家プラットフォーム",
        "編集的なウェブシステム",
        "プロトタイプ・調査スプリント",
      ],
      formLabel: "お問い合わせ",
      form: {
        projectTypes: [
          "AI 物語ツール",
          "出版／作家プラットフォーム",
          "編集的なウェブシステム",
          "システムとコンテンツの設計",
          "プロトタイプ／調査スプリント",
          "その他",
        ],
        budgets: [
          "1万ドル未満",
          "1万〜2.5万ドル",
          "2.5万〜5万ドル",
          "5万ドル以上",
          "まだ未定",
        ],
        timelines: ["検討中", "1〜3か月以内", "3〜6か月", "柔軟に対応"],
        select: "選択…",
        name: "お名前 *",
        email: "メール *",
        organization: "組織",
        optional: "（任意）",
        projectType: "プロジェクトの種類",
        budget: "予算",
        timeline: "スケジュール",
        message: "何をつくろうとしていますか？ *",
        messagePlaceholder:
          "課題、対象、そして成功の姿。ひと段落で十分です。",
        ready: "送信できます",
        progress: "{total} 項目中 {filled} 項目 — 名前・メール・ひとこと",
        submit: "会話を始める →",
        privacy:
          "内容を入力した状態でメールアプリが開きます。ここには何も保存されません。",
        doneTitle: "下書きが用意できました。",
        doneBody:
          "メールソフトがすべて入力された状態で開いているはずです——あとは送信するだけ。何も開かなければ、直接 {email} までご連絡いただくか、下のメッセージをコピーしてください。",
        copy: "メッセージをコピー",
        copied: "コピーしました ✓",
        editInquiry: "← お問い合わせを編集",
      },
      preferEmailLabel: "メールがよいですか？",
      howLabel: "仕事の進め方",
      howText:
        "一度にお受けするのは、少数の選んだ仕事だけです——範囲を固定したプロジェクト、短いプロトタイプ／調査スプリント、そしてアドバイザリー。全体像は {link} をご覧ください。",
      howLinkLabel: "仕事の進め方",
      goodFitLabel: "合うもの",
      goodFit: [
        "AI 物語ツールと物語記憶システム",
        "出版・作家プラットフォーム——Next.js、構造化コンテンツ、SEO",
        "言語・タイポグラフィ・データを中心に据えたウェブアプリ",
        "本格的な制作の前にアイデアを証明すべきプロトタイプ",
      ],
      notFitLabel: "合わないもの",
      notFit: [
        "継続的な保守や期限のない顧問サポート",
        "大規模なチームや代理店規模の体制を要するプロジェクト",
        "以前からの関係がない状態での急ぎの案件",
      ],
      note:
        "飛び込みの売り込み、依頼していない原稿、自動送信の連絡にはお返事しません。プレスとメディアについては {link} をご覧ください。",
      pressLinkLabel: "プレスページ",
    },
    easterEgg: {
      word: "間（ま）",
      gloss: "音や物のあいだに置かれる、意味を帯びた空白",
      reveal:
        "間（ま）——音と音、物と物のあいだにある、意味を帯びた空白。良い設計は、置くものと同じくらい、間で決まります。",
    },
  },

  // ── Italiano ─────────────────────────────────────────────────────────────
  it: {
    chrome: { backToIndex: "← Indice", homeLabel: "Ryan J. Pyles — home" },
    projects: {
      masthead: {
        kicker: "Ingegneria selezionata — 2025",
        title: "Sistemi",
        intro:
          "Sistemi fatti per durare: architettura, interfacce e l'infrastruttura sottostante. Lavoro che resiste all'entropia.",
        scrollCue: "Scorri l'indice ↓",
      },
      essaysKicker: "Testi lunghi",
      essaysHeading: "Saggi di ingegneria",
      essaysIntro:
        "Scrittura tecnica in prima persona, da lavoro già consegnato. Un diagramma, un frammento di codice reale e un fallimento onesto per pezzo.",
    },
    work: {
      kicker: "Lavora con FORMÆTRIX",
      title: "Servizi",
      intro: "Design e ingegneria per sistemi in cui la lingua è portante.",
      lede:
        "Progetto per editori, autori e team i cui prodotti vivono di lingua, struttura e tipografia — dagli strumenti narrativi con IA fino all'infrastruttura editoriale che li sostiene. Ogni servizio qui sotto è supportato da lavoro consegnato che puoi esaminare.",
      ctaPrimary: "Avvia un progetto →",
      ctaSecondary: "Vedi i sistemi →",
      servicesLabel: "Cosa costruisco",
      services: [
        {
          name: "Strumenti narrativi con IA",
          body: "Sistemi di memoria narrativa, validazione della continuità e flussi di IA ispezionabili per la narrativa lunga e l'editoria — il meccanismo attorno al modello, non l'ennesimo prompt.",
        },
        {
          name: "Piattaforme editoriali e per autori",
          body: "Siti d'autore, sistemi di catalogo e lo strato di SEO e dati strutturati sottostante, dove un unico modello di contenuto tipizzato genera automaticamente pagine, metadati e schemi.",
        },
        {
          name: "Sistemi web editoriali",
          body: "Interfacce pensate prima di tutto per la lettura, con vero controllo tipografico: impaginazione multilingue, RTL e CJK, e sistemi di design token fatti per i testi lunghi, non per UI generiche.",
        },
        {
          name: "Architettura di sistemi e contenuti",
          body: "Infrastruttura di contenuto tipizzata che impedisce a UI, generazione statica, SEO e dati strutturati di divergere — un'unica fonte di verità, indipendente dal framework.",
        },
      ],
      proofPrefix: "Prova:",
      engagementsLabel: "Come funzionano gli incarichi",
      engagements: [
        {
          name: "Progetto completo",
          body: "Design e ingegneria a perimetro fisso, dallo studio al lancio. L'incarico predefinito.",
        },
        {
          name: "Sprint di prototipo",
          body: "Uno sviluppo breve e mirato per dimostrare un'idea o ridurre il rischio di una decisione prima di un impegno completo.",
        },
        {
          name: "Consulenza",
          body: "Revisioni di architettura e direzione tecnica per team che stanno già costruendo — senza contratti aperti.",
        },
      ],
      processLabel: "Come procede il lavoro",
      process: ["Studio", "Architettura", "Prototipo", "Sviluppo", "Lancio"],
      outcomesLabel: "Risultati selezionati",
      outcomes: [
        "Una piattaforma di continuità narrativa con IA per la narrativa lunga.",
        "Infrastruttura editoriale a supporto di un catalogo di romanzi in crescita.",
        "Sistemi editoriali multilingue con vero controllo tipografico.",
        "Prodotti React / TypeScript portati dal concept al deployment.",
      ],
      finalCtaText: "Hai qualcosa che si adatta? Raccontami cosa stai costruendo.",
      finalCtaPrimary: "Avvia un progetto →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "Narrativa",
      intro: "Romanzi che resistono alla risoluzione facile. Narrativa costruita dal vincolo.",
      byLabel: "di",
      viewLabel: "Vedi il libro",
    },
    about: {
      kicker: "Ryan J. Pyles — l'archivio",
      title: "Chi sono",
      intro:
        "Autore, ingegnere e linguista a Chicago — la persona dietro FORMÆTRIX ed Elian Voigt.",
      lede:
        "Ryan J. Pyles scrive narrativa sperimentale e costruisce sistemi web. Il lavoro — in entrambe le discipline — parte dalla stessa premessa: qual è il minimo necessario perché qualcosa tenga?",
      studioParas: [
        "I suoi romanzi funzionano attraverso il vincolo formale. Ogni libro propone una struttura — un atto giudiziario, una grammatica di declinazioni, un archivio di misurazioni — e poi la abita finché non produce qualcosa che la struttura da sola non poteva prevedere. Il risultato è una narrativa precisa senza essere fredda, e strana senza essere ornamentale.",
        "Sul versante digitale lavora all'incrocio tra identità, lingua e progettazione di sistemi. La sua pratica è editoriale più che decorativa — fondata sulla convinzione che il buon design sia l'assenza di tutto ciò che non è portante.",
      ],
      languagePara:
        "Studia dodici lingue ed è interessato al modo in cui la grammatica vincola e rende possibile il pensiero — e a come quei vincoli viaggiano tra lingua naturale e codice.",
      pull: "Vive a Chicago.",
      imprintParas: [
        "FORMÆTRIX è un marchio editoriale che Ryan ha fondato per il lavoro che opera al limite di ciò che le categorie editoriali riescono a contenere. È la casa di Elian Voigt — l'identità letteraria attraverso cui esce la narrativa di Ryan — i cui libri rifiutano la distinzione tra narrativa letteraria e di genere.",
        "Il rapporto tra la persona e il marchio non è spiegato del tutto qui. Si sente nel lavoro.",
      ],
      footnote:
        "Ryan Pyles è la persona reale. Elian Voigt è l'identità autoriale — una voce letteraria a sé, non uno pseudonimo in senso semplice. La distinzione conta meno del lavoro che produce.",
      workHeading: "Il lavoro",
      workAreas: [
        {
          label: "Note",
          desc: "Voci brevi su lingua, scrittura, software e design, scritte a ridosso del momento — accanto a un Taccuino dello studioso con osservazioni strutturali su dodici lingue in studio attivo.",
        },
        {
          label: "Sistemi e progetti",
          desc: "Software nato perché la narrativa e l'editoria lo richiedevano. Sistemi di identità, motori narrativi, architettura editoriale.",
        },
        {
          label: "Catalogo di narrativa",
          desc: "Il catalogo completo dei romanzi pubblicati con il nome di Elian Voigt, con note su forma, struttura e contesto.",
        },
      ],
      contactLabel: "Per informazioni:",
      pressLink: "Stampa e media kit →",
    },
    contact: {
      kicker: "Lavora con FORMÆTRIX",
      title: "Avvia un progetto",
      intro:
        "Raccontami cosa stai costruendo. Leggo personalmente ogni richiesta e rispondo entro circa due giorni lavorativi.",
      acceptingLabel: "Attualmente disponibile per",
      acceptingList: [
        "Strumenti narrativi con IA",
        "Piattaforme editoriali e per autori",
        "Sistemi web editoriali",
        "Sprint di prototipo e studio",
      ],
      formLabel: "La richiesta",
      form: {
        projectTypes: [
          "Strumenti narrativi con IA",
          "Piattaforma editoriale / per autori",
          "Sistema web editoriale",
          "Architettura di sistemi e contenuti",
          "Sprint di prototipo / studio",
          "Qualcos'altro",
        ],
        budgets: [
          "Meno di 10.000 $",
          "10.000 – 25.000 $",
          "25.000 – 50.000 $",
          "Oltre 50.000 $",
          "Non ancora sicuro",
        ],
        timelines: ["In esplorazione", "Tra 1–3 mesi", "3–6 mesi", "Flessibile"],
        select: "Seleziona…",
        name: "Nome *",
        email: "Email *",
        organization: "Organizzazione",
        optional: "(facoltativo)",
        projectType: "Tipo di progetto",
        budget: "Budget",
        timeline: "Tempistiche",
        message: "Cosa vuoi costruire? *",
        messagePlaceholder:
          "Il problema, per chi è e come si presenta il successo. Basta un paragrafo.",
        ready: "Pronto da inviare",
        progress: "{filled} di {total} — nome, email, due righe",
        submit: "Inizia la conversazione →",
        privacy:
          "Apre la tua app di posta con i dettagli già compilati. Qui non si salva nulla.",
        doneTitle: "La tua bozza è pronta.",
        doneBody:
          "Il tuo client di posta dovrebbe essersi aperto con tutto compilato — basta inviare. Se non si è aperto nulla, scrivimi direttamente a {email} o copia il messaggio qui sotto.",
        copy: "Copia il messaggio",
        copied: "Copiato ✓",
        editInquiry: "← Modifica la richiesta",
      },
      preferEmailLabel: "Preferisci l'email?",
      howLabel: "Come funzionano gli incarichi",
      howText:
        "Accetto un piccolo numero di incarichi selezionati per volta — progetti a perimetro fisso, brevi sprint di prototipo/studio e consulenza. Vedi {link} per il quadro completo.",
      howLinkLabel: "come lavoro",
      goodFitLabel: "Buon incastro",
      goodFit: [
        "Strumenti narrativi con IA e sistemi di memoria narrativa",
        "Piattaforme editoriali e per autori — Next.js, contenuto strutturato, SEO",
        "App web con lingua, tipografia o dati al centro",
        "Un prototipo che deve dimostrare un'idea prima di uno sviluppo completo",
      ],
      notFitLabel: "Non adatto",
      notFit: [
        "Manutenzione continua o supporto a contratto aperto",
        "Progetti che richiedono un grande team o un'infrastruttura d'agenzia",
        "Tempi stretti senza una relazione pregressa",
      ],
      note:
        "Non rispondo a proposte a freddo, manoscritti non richiesti o contatti automatici. Per stampa e media, vedi la {link}.",
      pressLinkLabel: "pagina stampa",
    },
    easterEgg: {
      word: "sprezzatura",
      gloss: "l'arte di far sembrare facile ciò che è costato moltissimo",
      reveal:
        "Sprezzatura: l'arte rinascimentale di nascondere lo sforzo, così che il difficile sembri naturale. Ogni interfaccia curata è un piccolo atto di sprezzatura.",
    },
  },

  // ── Português (BR) ─────────────────────────────────────────────────────
  pt: {
    chrome: { backToIndex: "← Índice", homeLabel: "Ryan J. Pyles — início" },
    projects: {
      masthead: {
        kicker: "Engenharia selecionada — 2025",
        title: "Sistemas",
        intro:
          "Sistemas feitos para durar — arquitetura, interfaces e a infraestrutura por baixo. Trabalho que resiste à entropia.",
        scrollCue: "Percorra o índice ↓",
      },
      essaysKicker: "Textos longos",
      essaysHeading: "Ensaios de engenharia",
      essaysIntro:
        "Escrita técnica em primeira pessoa, a partir de trabalho já entregue. Um diagrama, um trecho de código real e um fracasso honesto por peça.",
    },
    work: {
      kicker: "Trabalhe com a FORMÆTRIX",
      title: "Serviços",
      intro: "Design e engenharia para sistemas onde a linguagem é estrutural.",
      lede:
        "Construo para editoras, autores e times cujos produtos dependem de linguagem, estrutura e tipografia — de ferramentas narrativas com IA até a infraestrutura editorial por baixo delas. Cada serviço abaixo é sustentado por trabalho entregue que você pode inspecionar.",
      ctaPrimary: "Começar um projeto →",
      ctaSecondary: "Ver os sistemas →",
      servicesLabel: "O que eu construo",
      services: [
        {
          name: "Ferramentas narrativas com IA",
          body: "Sistemas de memória narrativa, validação de continuidade e fluxos de IA inspecionáveis para ficção longa e edição — a maquinaria em torno do modelo, não mais um prompt.",
        },
        {
          name: "Plataformas de edição e de autores",
          body: "Sites de autor, sistemas de catálogo e a camada de SEO e dados estruturados por baixo, onde um único modelo de conteúdo tipado gera páginas, metadados e esquemas automaticamente.",
        },
        {
          name: "Sistemas web editoriais",
          body: "Interfaces pensadas primeiro para a leitura, com controle tipográfico de verdade: layout multilíngue, RTL e CJK, e sistemas de design tokens feitos para textos longos, não para UI genérica.",
        },
        {
          name: "Arquitetura de sistemas e conteúdo",
          body: "Infraestrutura de conteúdo tipada que impede a UI, a geração estática, o SEO e os dados estruturados de se desalinharem — uma única fonte de verdade, independente de framework.",
        },
      ],
      proofPrefix: "Prova:",
      engagementsLabel: "Como funcionam os trabalhos",
      engagements: [
        {
          name: "Projeto completo",
          body: "Design e engenharia de escopo fixo, da descoberta ao lançamento. O trabalho padrão.",
        },
        {
          name: "Sprint de protótipo",
          body: "Um desenvolvimento curto e focado para provar uma ideia ou reduzir o risco de uma decisão antes de um compromisso completo.",
        },
        {
          name: "Consultoria",
          body: "Revisões de arquitetura e direção técnica para times que já estão construindo — sem contrato aberto.",
        },
      ],
      processLabel: "Como o trabalho avança",
      process: ["Descoberta", "Arquitetura", "Protótipo", "Construção", "Lançamento"],
      outcomesLabel: "Resultados selecionados",
      outcomes: [
        "Uma plataforma de continuidade narrativa com IA para ficção longa.",
        "Infraestrutura editorial que sustenta um catálogo crescente de romances.",
        "Sistemas editoriais multilíngues com controle tipográfico de verdade.",
        "Produtos em React / TypeScript entregues do conceito à implantação.",
      ],
      finalCtaText: "Tem algo que se encaixa? Conte-me o que você está construindo.",
      finalCtaPrimary: "Começar um projeto →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "Ficção",
      intro: "Romances que resistem à resolução fácil. Ficção construída a partir da restrição.",
      byLabel: "por",
      viewLabel: "Ver livro",
    },
    about: {
      kicker: "Ryan J. Pyles — o arquivo",
      title: "Sobre mim",
      intro:
        "Autor, engenheiro e linguista em Chicago — a pessoa por trás da FORMÆTRIX e de Elian Voigt.",
      lede:
        "Ryan J. Pyles escreve ficção experimental e constrói sistemas web. O trabalho — nas duas disciplinas — parte da mesma premissa: qual é o mínimo necessário para que algo se sustente?",
      studioParas: [
        "Seus romances funcionam pela restrição formal. Cada livro propõe uma estrutura — uma petição jurídica, uma gramática de declinações, um arquivo de medições — e então a habita até produzir algo que a estrutura sozinha não poderia prever. O resultado é uma ficção precisa sem ser fria, e estranha sem ser ornamental.",
        "No lado digital, ele trabalha no cruzamento de identidade, linguagem e design de sistemas. Sua prática é editorial, não decorativa — apoiada na convicção de que bom design é a ausência de tudo o que não é estrutural.",
      ],
      languagePara:
        "Ele estuda doze idiomas e se interessa pela forma como a gramática limita e possibilita o pensamento — e por como essas restrições transitam entre a língua natural e o código.",
      pull: "Ele mora em Chicago.",
      imprintParas: [
        "A FORMÆTRIX é um selo que Ryan fundou para o trabalho que opera no limite do que as categorias editoriais conseguem conter. É a casa de Elian Voigt — a identidade literária pela qual a ficção de Ryan é lançada — cujos livros recusam a distinção entre ficção literária e de gênero.",
        "A relação entre a pessoa e o selo não é totalmente explicada aqui. Ela é sentida no trabalho.",
      ],
      footnote:
        "Ryan Pyles é a pessoa real. Elian Voigt é a identidade autoral — uma voz literária própria, não um pseudônimo em sentido simples. A distinção importa menos do que o trabalho que produz.",
      workHeading: "O trabalho",
      workAreas: [
        {
          label: "Notas",
          desc: "Entradas curtas sobre língua, escrita, software e design, escritas perto do momento — ao lado de um Caderno do Estudioso com observações estruturais sobre doze idiomas em estudo ativo.",
        },
        {
          label: "Sistemas e projetos",
          desc: "Software construído porque a ficção e a edição exigiam. Sistemas de identidade, motores narrativos, arquitetura editorial.",
        },
        {
          label: "Catálogo de ficção",
          desc: "O catálogo completo dos romances publicados sob o nome de Elian Voigt, com notas sobre forma, estrutura e contexto.",
        },
      ],
      contactLabel: "Para contato:",
      pressLink: "Imprensa e media kit →",
    },
    contact: {
      kicker: "Trabalhe com a FORMÆTRIX",
      title: "Começar um projeto",
      intro:
        "Conte-me o que você está construindo. Eu leio cada mensagem pessoalmente e respondo em cerca de dois dias úteis.",
      acceptingLabel: "Aceitando no momento",
      acceptingList: [
        "Ferramentas narrativas com IA",
        "Plataformas de edição e de autores",
        "Sistemas web editoriais",
        "Sprints de protótipo e descoberta",
      ],
      formLabel: "A mensagem",
      form: {
        projectTypes: [
          "Ferramentas narrativas com IA",
          "Plataforma de edição / autor",
          "Sistema web editorial",
          "Arquitetura de sistemas e conteúdo",
          "Sprint de protótipo / descoberta",
          "Outra coisa",
        ],
        budgets: [
          "Abaixo de US$ 10 mil",
          "US$ 10 mil – 25 mil",
          "US$ 25 mil – 50 mil",
          "Acima de US$ 50 mil",
          "Ainda não sei",
        ],
        timelines: ["Explorando", "Em 1–3 meses", "3–6 meses", "Flexível"],
        select: "Selecionar…",
        name: "Nome *",
        email: "E-mail *",
        organization: "Organização",
        optional: "(opcional)",
        projectType: "Tipo de projeto",
        budget: "Orçamento",
        timeline: "Prazo",
        message: "O que você quer construir? *",
        messagePlaceholder:
          "O problema, para quem é e como é o sucesso. Um parágrafo já basta.",
        ready: "Pronto para enviar",
        progress: "{filled} de {total} — nome, e-mail e algumas linhas",
        submit: "Iniciar a conversa →",
        privacy:
          "Abre seu app de e-mail com os detalhes preenchidos. Nada é armazenado aqui.",
        doneTitle: "Seu rascunho está pronto.",
        doneBody:
          "Seu cliente de e-mail deve ter aberto com tudo preenchido — é só enviar. Se nada abriu, escreva direto para {email} ou copie a mensagem abaixo.",
        copy: "Copiar a mensagem",
        copied: "Copiado ✓",
        editInquiry: "← Editar a mensagem",
      },
      preferEmailLabel: "Prefere e-mail?",
      howLabel: "Como funcionam os trabalhos",
      howText:
        "Aceito um número pequeno de trabalhos selecionados por vez — projetos de escopo fixo, sprints curtos de protótipo/descoberta e consultoria. Veja {link} para o quadro completo.",
      howLinkLabel: "como eu trabalho",
      goodFitLabel: "Boa combinação",
      goodFit: [
        "Ferramentas narrativas com IA e sistemas de memória narrativa",
        "Plataformas de edição e de autores — Next.js, conteúdo estruturado, SEO",
        "Apps web com língua, tipografia ou dados no centro",
        "Um protótipo que precisa provar uma ideia antes da construção completa",
      ],
      notFitLabel: "Não combina",
      notFit: [
        "Manutenção contínua ou suporte por contrato aberto",
        "Projetos que exigem um time grande ou infraestrutura de agência",
        "Prazos apertados sem uma relação prévia",
      ],
      note:
        "Não respondo a abordagens frias, manuscritos não solicitados ou contatos automáticos. Para imprensa e mídia, veja a {link}.",
      pressLinkLabel: "página de imprensa",
    },
    easterEgg: {
      word: "saudade",
      gloss: "a presença viva do que está ausente",
      reveal:
        "Saudade: a presença de algo que não está aqui. Todo arquivo — de romances, de sistemas, de versões — é uma forma de guardar saudade com cuidado.",
    },
  },

  // ── 繁體中文（台灣） ─────────────────────────────────────────────────────
  zh: {
    chrome: { backToIndex: "← 索引", homeLabel: "Ryan J. Pyles — 首頁" },
    projects: {
      masthead: {
        kicker: "精選工程 — 2025",
        title: "系統",
        intro:
          "為長久而打造的系統——架構、介面，以及底下的基礎設施。抵抗熵的作品。",
        scrollCue: "往下瀏覽索引 ↓",
      },
      essaysKicker: "長文",
      essaysHeading: "工程隨筆",
      essaysIntro:
        "來自已交付作品的第一手技術書寫。每篇一張圖、一段真實程式碼、一次誠實的失敗。",
    },
    work: {
      kicker: "與 FORMÆTRIX 合作",
      title: "服務",
      intro: "為語言至關重要的系統提供設計與工程。",
      lede:
        "我為出版社、作家與團隊打造產品，這些產品的成敗取決於語言、結構與排版——從 AI 敘事工具，到其底下的出版基礎設施。下方每一項服務都有可供檢視的實際作品支撐。",
      ctaPrimary: "開始一個專案 →",
      ctaSecondary: "查看系統 →",
      servicesLabel: "我打造什麼",
      services: [
        {
          name: "AI 敘事工具",
          body: "為長篇小說與出版打造的故事記憶系統、連續性驗證，以及可檢視的 AI 工作流程——是圍繞模型的機制，而非又一個提示詞。",
        },
        {
          name: "出版與作家平台",
          body: "作家網站、書目系統，以及底下的 SEO 與結構化資料層——由單一型別化的內容模型自動生成頁面、中繼資料與結構描述。",
        },
        {
          name: "編輯型網頁系統",
          body: "以閱讀為先、具備真正排版控制的介面——多語版面、RTL 與 CJK，以及為長篇內容而非通用 UI 打造的設計 token 系統。",
        },
        {
          name: "系統與內容架構",
          body: "型別化的內容基礎設施，讓 UI、靜態生成、SEO 與結構化資料不再各自漂移——單一事實來源，且不綁定框架。",
        },
      ],
      proofPrefix: "實證：",
      engagementsLabel: "合作方式",
      engagements: [
        {
          name: "完整專案",
          body: "範圍固定的設計與工程，從探索到上線。預設的合作方式。",
        },
        {
          name: "原型衝刺",
          body: "在全面投入前，以短而聚焦的開發驗證構想或降低決策風險。",
        },
        {
          name: "顧問諮詢",
          body: "為已在開發的團隊提供架構審查與技術方向——不綁長期聘約。",
        },
      ],
      processLabel: "工作如何推進",
      process: ["探索", "架構", "原型", "開發", "上線"],
      outcomesLabel: "精選成果",
      outcomes: [
        "為長篇小說打造的 AI 敘事連續性平台。",
        "支撐持續成長之小說書目的出版基礎設施。",
        "具備真正排版控制的多語編輯系統。",
        "從概念到部署交付的 React / TypeScript 產品。",
      ],
      finalCtaText: "有合適的想法嗎？告訴我你正在打造什麼。",
      finalCtaPrimary: "開始一個專案 →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "小說",
      intro: "拒絕輕易收束的小說。從限制中生長出的虛構。",
      byLabel: "作者",
      viewLabel: "查看書籍",
    },
    about: {
      kicker: "Ryan J. Pyles — 檔案",
      title: "關於我",
      intro:
        "身在芝加哥的作家、工程師與語言學者——FORMÆTRIX 與 Elian Voigt 背後的那個人。",
      lede:
        "Ryan J. Pyles 寫實驗小說，也打造網頁系統。無論在哪個領域，作品都始於同一個前提：要讓一件事物成立，最少需要什麼？",
      studioParas: [
        "他的小說透過形式上的限制運作。每一本書都提出一種結構——一份法律訴狀、一套變格語法、一份測量檔案——再棲居其中，直到生出結構本身無法預測的東西。結果是精準卻不冷漠、奇異卻不流於裝飾的小說。",
        "在網頁這一側，他工作於身分、語言與系統設計的交會處。他的實踐偏向編輯而非裝飾——建立在一個信念之上：好的設計，就是去除一切非結構性的東西。",
      ],
      languagePara:
        "他研究十二種語言，關注文法如何約束並同時開啟思考——以及這些約束如何在自然語言與程式碼之間往返。",
      pull: "他住在芝加哥。",
      imprintParas: [
        "FORMÆTRIX 是 Ryan 創立的出版標記，收容那些遊走在出版分類邊界的作品。它是 Elian Voigt 的家——Ryan 的小說透過這個文學身分問世——這些書拒絕在純文學與類型小說之間劃界。",
        "人與這個標記之間的關係，這裡不會完全說明。它在作品中被感受到。",
      ],
      footnote:
        "Ryan Pyles 是真實的人。Elian Voigt 是作者身分——一個獨立的文學聲音，而非簡單意義上的筆名。這個區別，遠不如它所產出的作品來得重要。",
      workHeading: "作品",
      workAreas: [
        {
          label: "筆記",
          desc: "關於語言、寫作、軟體與設計的短篇條目，貼近當下寫成——並附有一本學者筆記，記錄十二種積極研究語言的結構觀察。",
        },
        {
          label: "系統與專案",
          desc: "因為小說與出版有此需要而打造的軟體。身分系統、敘事引擎、編輯架構。",
        },
        {
          label: "小說書目",
          desc: "以 Elian Voigt 之名出版的小說完整書目，附上關於形式、結構與脈絡的註記。",
        },
      ],
      contactLabel: "洽詢：",
      pressLink: "媒體與新聞資料 →",
    },
    contact: {
      kicker: "與 FORMÆTRIX 合作",
      title: "開始一個專案",
      intro:
        "告訴我你正在打造什麼。每一封洽詢我都親自閱讀，並約在兩個工作天內回覆。",
      acceptingLabel: "目前承接",
      acceptingList: [
        "AI 敘事工具",
        "出版與作家平台",
        "編輯型網頁系統",
        "原型與探索衝刺",
      ],
      formLabel: "洽詢",
      form: {
        projectTypes: [
          "AI 敘事工具",
          "出版／作家平台",
          "編輯型網頁系統",
          "系統與內容架構",
          "原型／探索衝刺",
          "其他",
        ],
        budgets: [
          "1 萬美元以下",
          "1 萬 – 2.5 萬美元",
          "2.5 萬 – 5 萬美元",
          "5 萬美元以上",
          "還不確定",
        ],
        timelines: ["探索中", "未來 1–3 個月", "3–6 個月", "彈性"],
        select: "請選擇…",
        name: "姓名 *",
        email: "電子郵件 *",
        organization: "組織",
        optional: "（選填）",
        projectType: "專案類型",
        budget: "預算",
        timeline: "時程",
        message: "你想打造什麼？ *",
        messagePlaceholder: "問題、對象，以及成功的樣子。一段就很足夠。",
        ready: "可以送出了",
        progress: "{total} 項中已填 {filled} — 姓名、信箱、幾句話",
        submit: "開始對話 →",
        privacy: "會開啟你的郵件程式並帶入內容。這裡不儲存任何資料。",
        doneTitle: "你的草稿已就緒。",
        doneBody:
          "你的郵件程式應已開啟並填好一切——按下寄出即可。若沒有開啟，請直接寄到 {email}，或複製下方訊息。",
        copy: "複製訊息",
        copied: "已複製 ✓",
        editInquiry: "← 編輯洽詢",
      },
      preferEmailLabel: "偏好電子郵件？",
      howLabel: "合作方式",
      howText:
        "我一次只承接少量精選的合作——範圍固定的專案、短期原型／探索衝刺，以及顧問諮詢。完整說明請見 {link}。",
      howLinkLabel: "我的工作方式",
      goodFitLabel: "適合",
      goodFit: [
        "AI 敘事工具與故事記憶系統",
        "出版與作家平台——Next.js、結構化內容、SEO",
        "以語言、排版或資料為核心的網頁應用",
        "需要在全面開發前先驗證構想的原型",
      ],
      notFitLabel: "不適合",
      notFit: [
        "持續維運或無限期的長期支援",
        "需要大型團隊或代理商規模基礎設施的專案",
        "沒有既有關係的趕工時程",
      ],
      note:
        "我不回覆陌生推銷、未經邀約的稿件或自動化來信。媒體與新聞事宜請見 {link}。",
      pressLinkLabel: "新聞頁面",
    },
    easterEgg: {
      word: "留白",
      gloss: "刻意留下的空白，讓其餘之物得以呼吸",
      reveal:
        "留白——在畫面上刻意留下的空白，好讓其餘的一切得以呼吸。這整個網站，都是一場關於留白的練習。",
    },
  },

  // ── עברית (RTL) ─────────────────────────────────────────────────────────
  he: {
    chrome: { backToIndex: "מפתח ←", homeLabel: "Ryan J. Pyles — דף הבית" },
    projects: {
      masthead: {
        kicker: "הנדסה נבחרת — 2025",
        title: "מערכות",
        intro:
          "מערכות שנבנו כדי להחזיק מעמד — ארכיטקטורה, ממשקים והתשתית שמתחת. עבודה שעומדת מול האנטרופיה.",
        scrollCue: "↓ גללו את המפתח",
      },
      essaysKicker: "טקסטים ארוכים",
      essaysHeading: "מסות הנדסיות",
      essaysIntro:
        "כתיבה טכנית ממקור ראשון, מתוך עבודה שנמסרה. תרשים אחד, קטע קוד אמיתי אחד וכישלון כן אחד בכל פיסה.",
    },
    work: {
      kicker: "לעבוד עם FORMÆTRIX",
      title: "שירותים",
      intro: "עיצוב והנדסה למערכות שבהן השפה נושאת משקל.",
      lede:
        "אני בונה עבור הוצאות לאור, סופרים וצוותים שהמוצרים שלהם חיים ומתים על שפה, מבנה וטיפוגרפיה — מכלי סיפור מבוססי בינה מלאכותית ועד תשתית ההוצאה לאור שמתחתם. כל שירות למטה נשען על עבודה שנמסרה ושאפשר לבחון.",
      ctaPrimary: "להתחיל פרויקט →",
      ctaSecondary: "לצפייה במערכות →",
      servicesLabel: "מה אני בונה",
      services: [
        {
          name: "כלי סיפור מבוססי בינה מלאכותית",
          body: "מערכות זיכרון עלילתי, אימות רציפות וזרימות בינה מלאכותית שאפשר לבחון — עבור סיפורת ארוכה והוצאה לאור. המנגנון שסביב המודל, לא עוד פרומפט.",
        },
        {
          name: "פלטפורמות להוצאה לאור ולסופרים",
          body: "אתרי סופרים, מערכות קטלוג ושכבת ה-SEO והנתונים המובְנים שמתחת — שבה מודל תוכן מוקלד יחיד מייצר דפים, מטא-נתונים וסכמות באופן אוטומטי.",
        },
        {
          name: "מערכות ווב עריכתיות",
          body: "ממשקים שהקריאה קודמת בהם, עם שליטה טיפוגרפית אמיתית — פריסה רב-לשונית, RTL ו-CJK, ומערכות design token שנבנו לטקסט ארוך ולא ל-UI גנרי.",
        },
        {
          name: "ארכיטקטורת מערכות ותוכן",
          body: "תשתית תוכן מוקלדת שמונעת מה-UI, מהיצירה הסטטית, מה-SEO ומהנתונים המובְנים להיפרד זה מזה — מקור אמת יחיד, בלתי תלוי בפריימוורק.",
        },
      ],
      proofPrefix: "הוכחה:",
      engagementsLabel: "איך עובדים יחד",
      engagements: [
        {
          name: "פרויקט מלא",
          body: "עיצוב והנדסה בהיקף קבוע, מהבירור ועד ההשקה. ההתקשרות שבברירת המחדל.",
        },
        {
          name: "ספרינט אב-טיפוס",
          body: "בנייה קצרה וממוקדת כדי להוכיח רעיון או להפחית סיכון בהחלטה, לפני התחייבות מלאה.",
        },
        {
          name: "ייעוץ",
          body: "סקירות ארכיטקטורה וכיוון טכני לצוותים שכבר בונים — בלי ריטיינר פתוח.",
        },
      ],
      processLabel: "איך העבודה מתקדמת",
      process: ["בירור", "ארכיטקטורה", "אב-טיפוס", "בנייה", "השקה"],
      outcomesLabel: "תוצאות נבחרות",
      outcomes: [
        "פלטפורמת רציפות עלילתית מבוססת בינה מלאכותית לסיפורת ארוכה.",
        "תשתית הוצאה לאור שתומכת בקטלוג רומנים גדל.",
        "מערכות עריכה רב-לשוניות עם שליטה טיפוגרפית אמיתית.",
        "מוצרי React / TypeScript שנמסרו מהרעיון ועד ההטמעה.",
      ],
      finalCtaText: "יש לך משהו שמתאים? ספר לי מה אתה בונה.",
      finalCtaPrimary: "להתחיל פרויקט →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "סיפורת",
      intro: "רומנים שמסרבים לפתרון קל. סיפורת שנבנתה מתוך אילוץ.",
      byLabel: "מאת",
      viewLabel: "לצפייה בספר",
    },
    about: {
      kicker: "Ryan J. Pyles — הארכיון",
      title: "אודות",
      intro:
        "סופר, מהנדס ובלשן בשיקגו — האדם שמאחורי FORMÆTRIX ו-Elian Voigt.",
      lede:
        "Ryan J. Pyles כותב סיפורת ניסיונית ובונה מערכות ווב. העבודה — בשני התחומים — יוצאת מאותה הנחה: מהו המינימום ההכרחי כדי שדבר-מה יחזיק?",
      studioParas: [
        "הרומנים שלו פועלים דרך אילוץ צורני. כל ספר מציע מבנה — כתב טענות משפטי, דקדוק של נטיות, ארכיון של מדידה — ואז שוכן בתוכו עד שנוצר משהו שהמבנה לבדו לא יכול היה לחזות. התוצאה היא סיפורת מדויקת בלי להיות קרה, ומוזרה בלי להיות קישוטית.",
        "בצד הדיגיטלי הוא עובד בצומת של זהות, שפה ותכנון מערכות. הפרקטיקה שלו עריכתית ולא דקורטיבית — נשענת על האמונה שעיצוב טוב הוא היעדרו של כל מה שאינו נושא משקל.",
      ],
      languagePara:
        "הוא לומד שתים-עשרה שפות ומתעניין באופן שבו הדקדוק מגביל ומאפשר את המחשבה — ובאופן שבו האילוצים האלה נעים בין השפה הטבעית לקוד.",
      pull: "הוא חי בשיקגו.",
      imprintParas: [
        "FORMÆTRIX היא הוצאה ש-Ryan הקים עבור עבודה שפועלת בקצה של מה שקטגוריות הוצאה לאור מסוגלות להכיל. זהו ביתו של Elian Voigt — הזהות הספרותית שדרכה יוצאת הסיפורת של Ryan — שספריה מסרבים להבחנה בין ספרות יפה לספרות ז'אנר.",
        "הקשר בין האדם לבין ההוצאה אינו מוסבר כאן במלואו. הוא מורגש בעבודה.",
      ],
      footnote:
        "Ryan Pyles הוא האדם האמיתי. Elian Voigt הוא הזהות היוצרת — קול ספרותי נבדל, לא שם עט במובן הפשוט. ההבחנה חשובה פחות מהעבודה שהיא מולידה.",
      workHeading: "העבודה",
      workAreas: [
        {
          label: "רשימות",
          desc: "רשומות קצרות על שפה, כתיבה, תוכנה ועיצוב, שנכתבות סמוך לרגע — לצד מחברת חוקר של תצפיות מבניות על שתים-עשרה שפות בלימוד פעיל.",
        },
        {
          label: "מערכות ופרויקטים",
          desc: "תוכנה שנבנתה מפני שהסיפורת וההוצאה לאור דרשו זאת. מערכות זהות, מנועי סיפור, ארכיטקטורה עריכתית.",
        },
        {
          label: "קטלוג הסיפורת",
          desc: "הקטלוג המלא של הרומנים שראו אור תחת השם Elian Voigt, עם הערות על צורה, מבנה והקשר.",
        },
      ],
      contactLabel: "לפניות:",
      pressLink: "עיתונות וערכת מדיה →",
    },
    contact: {
      kicker: "לעבוד עם FORMÆTRIX",
      title: "להתחיל פרויקט",
      intro:
        "ספר לי מה אתה בונה. אני קורא כל פנייה בעצמי ומשיב בתוך כיומיים עסקים.",
      acceptingLabel: "כרגע פתוח ל",
      acceptingList: [
        "כלי סיפור מבוססי בינה מלאכותית",
        "פלטפורמות להוצאה לאור ולסופרים",
        "מערכות ווב עריכתיות",
        "ספרינטים של אב-טיפוס ובירור",
      ],
      formLabel: "הפנייה",
      form: {
        projectTypes: [
          "כלי סיפור מבוססי בינה מלאכותית",
          "פלטפורמת הוצאה לאור / סופר",
          "מערכת ווב עריכתית",
          "ארכיטקטורת מערכות ותוכן",
          "ספרינט אב-טיפוס / בירור",
          "משהו אחר",
        ],
        budgets: [
          "פחות מ-10,000$",
          "10,000$ – 25,000$",
          "25,000$ – 50,000$",
          "מעל 50,000$",
          "עוד לא בטוח",
        ],
        timelines: ["בבחינה", "בעוד 1–3 חודשים", "3–6 חודשים", "גמיש"],
        select: "בחירה…",
        name: "שם *",
        email: "אימייל *",
        organization: "ארגון",
        optional: "(רשות)",
        projectType: "סוג הפרויקט",
        budget: "תקציב",
        timeline: "לוח זמנים",
        message: "מה אתה מנסה לבנות? *",
        messagePlaceholder:
          "הבעיה, למי היא מיועדת ואיך נראית הצלחה. פסקה אחת בהחלט מספיקה.",
        ready: "מוכן לשליחה",
        progress: "{filled} מתוך {total} — שם, אימייל וכמה מילים",
        submit: "להתחיל את השיחה →",
        privacy:
          "פותח את אפליקציית האימייל עם הפרטים ממולאים. שום דבר אינו נשמר כאן.",
        doneTitle: "הטיוטה שלך מוכנה.",
        doneBody:
          "תוכנת האימייל שלך אמורה להיפתח כשהכול ממולא — רק ללחוץ שליחה. אם דבר לא נפתח, כתוב לי ישירות אל {email} או העתק את ההודעה למטה.",
        copy: "להעתיק את ההודעה",
        copied: "הועתק ✓",
        editInquiry: "→ לערוך את הפנייה",
      },
      preferEmailLabel: "מעדיף אימייל?",
      howLabel: "איך עובדים יחד",
      howText:
        "אני לוקח מספר קטן של פרויקטים נבחרים בכל פעם — פרויקטים בהיקף קבוע, ספרינטים קצרים של אב-טיפוס/בירור, וייעוץ. לתמונה המלאה ראה {link}.",
      howLinkLabel: "איך אני עובד",
      goodFitLabel: "התאמה טובה",
      goodFit: [
        "כלי סיפור מבוססי בינה מלאכותית ומערכות זיכרון עלילתי",
        "פלטפורמות להוצאה לאור ולסופרים — Next.js, תוכן מובְנה, SEO",
        "אפליקציות ווב שבמרכזן שפה, טיפוגרפיה או נתונים",
        "אב-טיפוס שצריך להוכיח רעיון לפני בנייה מלאה",
      ],
      notFitLabel: "לא מתאים",
      notFit: [
        "תחזוקה שוטפת או תמיכת ריטיינר פתוחה",
        "פרויקטים הדורשים צוות גדול או תשתית של סוכנות",
        "לוחות זמנים דחופים בלי היכרות מוקדמת",
      ],
      note:
        "אני לא מגיב לפניות קרות, לכתבי יד לא מוזמנים או לפניות אוטומטיות. לעיתונות ולמדיה ראה את {link}.",
      pressLinkLabel: "עמוד העיתונות",
    },
    easterEgg: {
      word: "דווקא",
      gloss: "מילה עברית שאין לה תרגום — 'דווקא כך, ולא אחרת'",
      reveal:
        "דַּוְקָא — מילה עברית שאין לה תרגום מדויק: 'דווקא כך, ולא אחרת'. לפעמים רעיון מתעקש להיעשות דווקא בדרך הקשה. זו בדרך כלל הדרך הנכונה.",
    },
  },

  // ── Skandimix (experimental Nynorsk-leaning hybrid) ────────────────────
  skandi: {
    chrome: { backToIndex: "← Register", homeLabel: "Ryan J. Pyles — heim" },
    projects: {
      masthead: {
        kicker: "Utvald ingeniørkunst — 2025",
        title: "System",
        intro:
          "System bygde for å vare — arkitektur, grensesnitt og infrastrukturen under. Arbeid som står imot entropien.",
        scrollCue: "Bla gjennom registeret ↓",
      },
      essaysKicker: "Lange tekstar",
      essaysHeading: "Ingeniøressay",
      essaysIntro:
        "Teknisk skriving på førstehand, frå levert arbeid. Eitt diagram, eitt ekte kodeutdrag og ein ærleg fiasko per tekst.",
    },
    work: {
      kicker: "Arbeid med FORMÆTRIX",
      title: "Tenester",
      intro: "Design og ingeniørkunst for system der språket ber vekta.",
      lede:
        "Eg byggjer for forlag, forfattarar og team der produkta lever og døyr på språk, struktur og typografi — frå narrative KI-verktøy til forlagsinfrastrukturen under. Kvar teneste under er tufta på levert arbeid du kan granske.",
      ctaPrimary: "Start eit prosjekt →",
      ctaSecondary: "Sjå systema →",
      servicesLabel: "Kva eg byggjer",
      services: [
        {
          name: "Narrative KI-verktøy",
          body: "System for forteljingsminne, kontinuitetskontroll og gjennomsiktige KI-arbeidsflytar for lang skjønnlitteratur og forlag — maskineriet rundt modellen, ikkje endå ein prompt.",
        },
        {
          name: "Forlags- og forfattarplattformer",
          body: "Forfattarnettstader, katalogsystem og laget med SEO og strukturerte data under — der éin typa innhaldsmodell lagar sider, metadata og skjema automatisk.",
        },
        {
          name: "Redaksjonelle vevsystem",
          body: "Lesefyrst grensesnitt med ekte typografisk kontroll — fleirspråkleg oppsett, RTL og CJK, og design-token-system bygde for lange tekstar, ikkje generisk UI.",
        },
        {
          name: "System- og innhaldsarkitektur",
          body: "Typa innhaldsinfrastruktur som hindrar UI, statisk generering, SEO og strukturerte data i å skli frå kvarandre — éi sanningskjelde, uavhengig av rammeverk.",
        },
      ],
      proofPrefix: "Prov:",
      engagementsLabel: "Korleis oppdraga går føre seg",
      engagements: [
        {
          name: "Fullt prosjekt",
          body: "Design og ingeniørkunst med fast omfang, frå kartlegging til lansering. Standardoppdraget.",
        },
        {
          name: "Prototype-sprint",
          body: "Ei kort, fokusert bygging for å prove ein idé eller minske risikoen i eit val før full forplikting.",
        },
        {
          name: "Rådgjeving",
          body: "Arkitekturgjennomgang og teknisk retning for team som alt byggjer — utan open avtale på timar.",
        },
      ],
      processLabel: "Korleis arbeidet rører seg",
      process: ["Kartlegging", "Arkitektur", "Prototype", "Bygging", "Lansering"],
      outcomesLabel: "Utvalde resultat",
      outcomes: [
        "Ei KI-driven plattform for narrativ kontinuitet i lang skjønnlitteratur.",
        "Forlagsinfrastruktur som ber ein veksande katalog av romanar.",
        "Fleirspråklege redaksjonelle system med ekte typografisk kontroll.",
        "React-/TypeScript-produkt levert frå idé til utrulling.",
      ],
      finalCtaText: "Har du noko som passar? Fortel meg kva du byggjer.",
      finalCtaPrimary: "Start eit prosjekt →",
    },
    books: {
      kicker: "Elian Voigt — FORMÆTRIX",
      title: "Skjønnlitteratur",
      intro: "Romanar som står imot enkle løysingar. Skjønnlitteratur bygd av avgrensing.",
      byLabel: "av",
      viewLabel: "Sjå boka",
    },
    about: {
      kicker: "Ryan J. Pyles — arkivet",
      title: "Om meg",
      intro:
        "Forfattar, ingeniør og språkforskar i Chicago — mennesket bak FORMÆTRIX og Elian Voigt.",
      lede:
        "Ryan J. Pyles skriv eksperimentell skjønnlitteratur og byggjer vevsystem. Arbeidet — i begge fag — startar frå same premiss: kva er det minste som skal til for at noko held?",
      studioParas: [
        "Romanane hans verkar gjennom formell avgrensing. Kvar bok føreslår ein struktur — eit rettsskriv, ein grammatikk av bøyingar, eit arkiv av måling — og bur så i han til det kjem fram noko strukturen åleine ikkje kunne varsle. Resultatet er skjønnlitteratur som er presis utan å vere kald, og framand utan å vere pynt.",
        "På vevsida arbeider han i skjeringspunktet mellom identitet, språk og systemdesign. Praksisen hans er redaksjonell heller enn dekorativ — tufta på overtydinga om at god design er fråveret av alt som ikkje ber vekt.",
      ],
      languagePara:
        "Han studerer tolv språk og er oppteken av korleis grammatikk avgrensar og opnar tanken — og av korleis desse avgrensingane reiser mellom naturleg språk og kode.",
      pull: "Han bur i Chicago.",
      imprintParas: [
        "FORMÆTRIX er eit forlagsmerke Ryan grunnla for arbeid som verkar i kanten av det forlagskategoriane kan romme. Det er heimen til Elian Voigt — den litterære identiteten skjønnlitteraturen til Ryan kjem ut gjennom — der bøkene nektar skiljet mellom skjønnlitteratur og sjangerlitteratur.",
        "Tilhøvet mellom mennesket og merket blir ikkje fullt ut forklart her. Det blir kjent i arbeidet.",
      ],
      footnote:
        "Ryan Pyles er den verkelege personen. Elian Voigt er forfattaridentiteten — ei eiga litterær røyst, ikkje eit pseudonym i enkel forstand. Skiljet tel mindre enn arbeidet det ber fram.",
      workHeading: "Arbeidet",
      workAreas: [
        {
          label: "Notat",
          desc: "Korte innførsler om språk, skriving, programvare og design, skrivne nær augeblinken — ved sida av ei forskarbok med strukturelle observasjonar om tolv språk i aktiv studie.",
        },
        {
          label: "System og prosjekt",
          desc: "Programvare bygd fordi skjønnlitteraturen og forlaget kravde det. Identitetssystem, forteljemotorar, redaksjonell arkitektur.",
        },
        {
          label: "Skjønnlitterær katalog",
          desc: "Den fullstendige katalogen over romanar gjevne ut under namnet Elian Voigt, med notat om form, struktur og samanheng.",
        },
      ],
      contactLabel: "For førespurnader:",
      pressLink: "Presse og mediekit →",
    },
    contact: {
      kicker: "Arbeid med FORMÆTRIX",
      title: "Start eit prosjekt",
      intro:
        "Fortel meg kva du byggjer. Eg les kvar førespurnad sjølv og svarar innan om lag to verkedagar.",
      acceptingLabel: "Tek imot no",
      acceptingList: [
        "Narrative KI-verktøy",
        "Forlags- og forfattarplattformer",
        "Redaksjonelle vevsystem",
        "Prototype- og kartleggingssprintar",
      ],
      formLabel: "Førespurnaden",
      form: {
        projectTypes: [
          "Narrative KI-verktøy",
          "Forlags- / forfattarplattform",
          "Redaksjonelt vevsystem",
          "System- og innhaldsarkitektur",
          "Prototype- / kartleggingssprint",
          "Noko anna",
        ],
        budgets: [
          "Under 10 000 $",
          "10 000 – 25 000 $",
          "25 000 – 50 000 $",
          "Over 50 000 $",
          "Ikkje sikker enno",
        ],
        timelines: ["Utforskar", "Om 1–3 månader", "3–6 månader", "Fleksibelt"],
        select: "Vel…",
        name: "Namn *",
        email: "E-post *",
        organization: "Organisasjon",
        optional: "(valfritt)",
        projectType: "Prosjekttype",
        budget: "Budsjett",
        timeline: "Tidsramme",
        message: "Kva prøver du å byggje? *",
        messagePlaceholder:
          "Problemet, kven det er for, og korleis suksess ser ut. Eit avsnitt held.",
        ready: "Klar til å sende",
        progress: "{filled} av {total} — namn, e-post, nokre ord",
        submit: "Start samtalen →",
        privacy:
          "Opnar e-postappen din med detaljane ferdig utfylte. Ingenting blir lagra her.",
        doneTitle: "Utkastet ditt er klart.",
        doneBody:
          "E-postklienten din skulle ha opna med alt utfylt — berre trykk send. Om ingenting opna seg, skriv til meg direkte på {email} eller kopier meldinga under.",
        copy: "Kopier meldinga",
        copied: "Kopiert ✓",
        editInquiry: "← Rediger førespurnaden",
      },
      preferEmailLabel: "Føretrekkjer du e-post?",
      howLabel: "Korleis oppdraga går føre seg",
      howText:
        "Eg tek nokre få utvalde oppdrag om gongen — prosjekt med fast omfang, korte prototype-/kartleggingssprintar og rådgjeving. Sjå {link} for heile biletet.",
      howLinkLabel: "korleis eg arbeider",
      goodFitLabel: "Godt høve",
      goodFit: [
        "Narrative KI-verktøy og system for forteljingsminne",
        "Forlags- og forfattarplattformer — Next.js, strukturert innhald, SEO",
        "Vevapplikasjonar med språk, typografi eller data i sentrum",
        "Ein prototype som må prove ein idé før full bygging",
      ],
      notFitLabel: "Dårleg høve",
      notFit: [
        "Løpande vedlikehald eller open avtale om støtte",
        "Prosjekt som krev eit stort team eller byråinfrastruktur",
        "Hastefristar utan eit tidlegare tilhøve",
      ],
      note:
        "Eg svarar ikkje på kald kontakt, manus eg ikkje har bede om, eller automatisk utsending. For presse og media, sjå {link}.",
      pressLinkLabel: "pressesida",
    },
    easterEgg: {
      word: "lagom",
      gloss: "svensk: ikkje for lite, ikkje for mykje — akkurat passe",
      reveal:
        "Lagom — svensk for «ikkje for lite, ikkje for mykje, akkurat passe». Heile denne lokaliteten er ei øving i lagom: ein nordisk hybrid som ikkje prøver å vere alt.",
    },
  },
};

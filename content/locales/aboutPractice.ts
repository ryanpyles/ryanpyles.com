import type { Locale } from "@/lib/i18n";

/**
 * The professional layer added to About after the locale dictionaries shipped.
 * Full translations of that copy — not cultural variants. Proper nouns
 * (FORMÆTRIX, Elian Voigt, Continuity Atlas, Polytype, React, Next.js,
 * TypeScript) stay as published.
 *
 * Register follows the existing About voice: third person, dry, no pitch.
 * fr is continental. pt follows the site tag pt-BR. zh is Traditional.
 * skandi stays in the Nynorsk-leaning hybrid already used on that route.
 *
 * Native-speaker proof before this backs a paid campaign.
 */

export interface AboutDiscipline {
  n: string;
  name: string;
  body: string;
}

export interface AboutSystemGloss {
  name: string;
  gloss: string;
  href: string;
}

export interface AboutFaqItem {
  question: string;
  answer: string;
}

export interface AboutPracticeCopy {
  figures: {
    leadCaption: string;
    leadLabel: string;
    studioAlt: string;
    studioCaption: string;
    figureAlt: string;
    figureCaption: string;
    orreryAlt: string;
    orreryCaption: string;
  };
  practiceLabel: string;
  practiceHeading: string;
  practiceIntro: string;
  disciplines: [AboutDiscipline, AboutDiscipline, AboutDiscipline, AboutDiscipline];
  selectedLead: string;
  systems: [AboutSystemGloss, AboutSystemGloss, AboutSystemGloss, AboutSystemGloss];
  selectedTail: string;
  stackLabel: string;
  faqHeading: string;
  faq: [AboutFaqItem, AboutFaqItem, AboutFaqItem, AboutFaqItem];
}

const SYSTEMS: [AboutSystemGloss, AboutSystemGloss, AboutSystemGloss, AboutSystemGloss] = [
  {
    name: "Continuity Atlas",
    gloss: "",
    href: "/projects/continuity-atlas",
  },
  {
    name: "Polytype",
    gloss: "",
    href: "/projects/polytype",
  },
  {
    name: "Publish Architecture",
    gloss: "",
    href: "/projects/publish-architecture",
  },
  {
    name: "Locale-Aware Product System",
    gloss: "",
    href: "/projects/locale-aware-product-system",
  },
];

function systems(
  glosses: [string, string, string, string],
): [AboutSystemGloss, AboutSystemGloss, AboutSystemGloss, AboutSystemGloss] {
  return SYSTEMS.map((s, i) => ({ ...s, gloss: glosses[i] })) as [
    AboutSystemGloss,
    AboutSystemGloss,
    AboutSystemGloss,
    AboutSystemGloss,
  ];
}

export const aboutPractice: Record<Locale, AboutPracticeCopy> = {
  en: {
    figures: {
      leadCaption: "Multidisciplinary Human System — built across disciplines.",
      leadLabel:
        "A short silent loop: Ryan Pyles stands on a lit disc in a dark studio under a single overhead beam, as scanning rings rotate slowly around him. A lockup to the left reads: Ryan Pyles, Multidisciplinary Human System, built across disciplines.",
      studioAlt:
        "Ryan J. Pyles seated at a drafting table spread with floor plans, in a concrete-and-timber studio lined with books.",
      studioCaption: "Chicago studio — drafting table, reference library, work in plan.",
      figureAlt:
        "A vinyl figure of Ryan Pyles on a desk, standing in front of a monitor showing the same character as an untextured 3D model, with anatomy reference sheets pinned to the wall behind.",
      figureCaption:
        "Figure study — reference sheets, mesh, packaged object. The same pipeline, run end to end.",
      orreryAlt:
        "A small brass orrery-like sculpture of stacked gears and orbiting spheres, standing on a sheet of paper, signed Ryan Pyles · FORMÆTRIX.",
      orreryCaption:
        "FORMÆTRIX — the studio as a mechanism: many disciplines turning on one axis.",
    },
    practiceLabel: "Practice",
    practiceHeading: "The practice",
    practiceIntro:
      "Beneath the literary surface is a working engineering practice. Ryan builds production systems across four disciplines — most often where they overlap.",
    disciplines: [
      {
        n: "01",
        name: "Engineering",
        body: "Full-stack systems in React, Next.js, and TypeScript — architecture and data modeling through deployment.",
      },
      {
        n: "02",
        name: "AI",
        body: "Systems that reason over long-form context: narrative continuity, retrieval, and structured memory.",
      },
      {
        n: "03",
        name: "Design",
        body: "Editorial interfaces and design-token systems where typography and form carry as much meaning as the copy.",
      },
      {
        n: "04",
        name: "Language",
        body: "Multilingual architecture and applied linguistics — twelve languages in active study, built into the work.",
      },
    ],
    selectedLead: "Selected systems:",
    systems: systems([
      "AI narrative memory",
      "a locale-aware typography engine",
      "structured publishing infrastructure",
      "locale as product behavior",
    ]),
    selectedTail: "each a real, deterministic engine with a live demo.",
    stackLabel: "Stack",
    faqHeading: "Questions",
    faq: [
      {
        question: "Is Ryan Pyles the same person as Elian Voigt?",
        answer:
          "Yes. Ryan Pyles is the person; Elian Voigt is the authorial identity his fiction is published under through FORMÆTRIX. It is a distinct literary voice, not a pseudonym in any simple sense — the distinction matters less than the work it produces.",
      },
      {
        question: "What is FORMÆTRIX?",
        answer:
          "FORMÆTRIX is Ryan Pyles's studio — the multidisciplinary practice behind his software, AI, design, and publishing systems. It also operates an imprint: the publishing line through which Elian Voigt's fiction is released. The studio is the practice; the imprint is one of the things it runs.",
      },
      {
        question: "What does Ryan Pyles do?",
        answer:
          "He is a multidisciplinary technologist working across software engineering, AI systems, product design, and language. He builds production systems — AI narrative tooling, publishing infrastructure, a locale-aware typography engine, and locale-aware product systems — with React, Next.js, and TypeScript, and writes experimental fiction as Elian Voigt.",
      },
      {
        question: "Where is Ryan Pyles based?",
        answer: "Chicago, Illinois. He works with clients worldwide.",
      },
    ],
  },

  es: {
    figures: {
      leadCaption: "Sistema humano multidisciplinar — construido entre disciplinas.",
      leadLabel:
        "Un bucle breve y silencioso: Ryan Pyles de pie sobre un disco iluminado, en un estudio a oscuras, bajo un único foco. Unos anillos de escaneo giran despacio a su alrededor. A la izquierda, un bloque tipográfico: Ryan Pyles, Sistema humano multidisciplinar, construido entre disciplinas.",
      studioAlt:
        "Ryan J. Pyles sentado a una mesa de dibujo cubierta de planos, en un estudio de hormigón y madera rodeado de libros.",
      studioCaption: "Estudio en Chicago — mesa de dibujo, biblioteca de consulta, trabajo en plano.",
      figureAlt:
        "Una figura de vinilo de Ryan Pyles sobre un escritorio, frente a un monitor que muestra el mismo personaje como modelo 3D sin textura, con láminas de referencia anatómica clavadas en la pared.",
      figureCaption:
        "Estudio de figura — láminas de referencia, malla, objeto empaquetado. El mismo proceso, de extremo a extremo.",
      orreryAlt:
        "Una pequeña escultura de latón, a modo de planetario, con engranajes apilados y esferas en órbita, sobre una hoja de papel, firmada Ryan Pyles · FORMÆTRIX.",
      orreryCaption:
        "FORMÆTRIX — el estudio como mecanismo: varias disciplinas girando sobre un mismo eje.",
    },
    practiceLabel: "Práctica",
    practiceHeading: "La práctica",
    practiceIntro:
      "Bajo la superficie literaria hay una práctica de ingeniería en activo. Ryan construye sistemas de producción en cuatro disciplinas, casi siempre en el punto en que se solapan.",
    disciplines: [
      {
        n: "01",
        name: "Ingeniería",
        body: "Sistemas full-stack en React, Next.js y TypeScript: de la arquitectura y el modelado de datos al despliegue.",
      },
      {
        n: "02",
        name: "IA",
        body: "Sistemas que razonan sobre contexto de largo aliento: continuidad narrativa, recuperación y memoria estructurada.",
      },
      {
        n: "03",
        name: "Diseño",
        body: "Interfaces editoriales y sistemas de tokens en los que la tipografía y la forma cargan tanto sentido como el texto.",
      },
      {
        n: "04",
        name: "Lengua",
        body: "Arquitectura multilingüe y lingüística aplicada: doce idiomas en estudio activo, incorporados al trabajo.",
      },
    ],
    selectedLead: "Sistemas seleccionados:",
    systems: systems([
      "memoria narrativa por IA",
      "un motor tipográfico sensible a la locale",
      "infraestructura de publicación estructurada",
      "la locale como comportamiento del producto",
    ]),
    selectedTail: "cada uno, un motor real y determinista, con una demo en vivo.",
    stackLabel: "Pila",
    faqHeading: "Preguntas",
    faq: [
      {
        question: "¿Ryan Pyles y Elian Voigt son la misma persona?",
        answer:
          "Sí. Ryan Pyles es la persona; Elian Voigt es la identidad autoral bajo la cual se publica su ficción, a través de FORMÆTRIX. Es una voz literaria propia, no un seudónimo en el sentido simple. La distinción importa menos que el trabajo que produce.",
      },
      {
        question: "¿Qué es FORMÆTRIX?",
        answer:
          "FORMÆTRIX es el estudio de Ryan Pyles: la práctica multidisciplinar detrás de sus sistemas de software, IA, diseño y publicación. También dirige un sello, la línea editorial por la que se publica la ficción de Elian Voigt. El estudio es la práctica; el sello es una de las cosas que esa práctica dirige.",
      },
      {
        question: "¿A qué se dedica Ryan Pyles?",
        answer:
          "Es un tecnólogo multidisciplinar que trabaja entre la ingeniería de software, los sistemas de IA, el diseño de producto y la lengua. Construye sistemas de producción —herramientas narrativas de IA, infraestructura editorial, un motor tipográfico sensible a la locale y sistemas de producto sensibles a la locale— con React, Next.js y TypeScript, y escribe ficción experimental como Elian Voigt.",
      },
      {
        question: "¿Dónde está Ryan Pyles?",
        answer: "En Chicago, Illinois. Trabaja con clientes en cualquier parte.",
      },
    ],
  },

  fr: {
    figures: {
      leadCaption: "Système humain multidisciplinaire — construit entre les disciplines.",
      leadLabel:
        "Une boucle courte et silencieuse : Ryan Pyles debout sur un disque éclairé, dans un studio sombre, sous un unique faisceau. Des anneaux de balayage tournent lentement autour de lui. À gauche, un bloc typographique : Ryan Pyles, Système humain multidisciplinaire, construit entre les disciplines.",
      studioAlt:
        "Ryan J. Pyles assis à une table à dessin couverte de plans, dans un studio de béton et de bois, bordé de livres.",
      studioCaption: "Studio de Chicago — table à dessin, bibliothèque de référence, travail en plan.",
      figureAlt:
        "Une figurine en vinyle de Ryan Pyles sur un bureau, devant un écran qui montre le même personnage en modèle 3D non texturé, avec des planches d'anatomie punaisées au mur.",
      figureCaption:
        "Étude de figure — planches de référence, maillage, objet conditionné. Le même pipeline, d'un bout à l'autre.",
      orreryAlt:
        "Une petite sculpture de laiton, façon planétaire, d'engrenages empilés et de sphères en orbite, posée sur une feuille, signée Ryan Pyles · FORMÆTRIX.",
      orreryCaption:
        "FORMÆTRIX — le studio comme mécanisme : plusieurs disciplines tournant sur un même axe.",
    },
    practiceLabel: "Pratique",
    practiceHeading: "La pratique",
    practiceIntro:
      "Sous la surface littéraire, une pratique d'ingénierie en activité. Ryan construit des systèmes de production dans quatre disciplines — le plus souvent là où elles se recouvrent.",
    disciplines: [
      {
        n: "01",
        name: "Ingénierie",
        body: "Systèmes full-stack en React, Next.js et TypeScript — de l'architecture et de la modélisation des données jusqu'au déploiement.",
      },
      {
        n: "02",
        name: "IA",
        body: "Des systèmes qui raisonnent sur un contexte long : continuité narrative, recherche, mémoire structurée.",
      },
      {
        n: "03",
        name: "Design",
        body: "Interfaces éditoriales et systèmes de jetons, où la typographie et la forme portent autant que le texte.",
      },
      {
        n: "04",
        name: "Langue",
        body: "Architecture multilingue et linguistique appliquée — douze langues en étude active, intégrées au travail.",
      },
    ],
    selectedLead: "Systèmes retenus :",
    systems: systems([
      "mémoire narrative par IA",
      "un moteur typographique sensible à la locale",
      "infrastructure d'édition structurée",
      "la locale comme comportement du produit",
    ]),
    selectedTail: "chacun un moteur réel et déterministe, avec une démo en ligne.",
    stackLabel: "Pile",
    faqHeading: "Questions",
    faq: [
      {
        question: "Ryan Pyles et Elian Voigt sont-ils la même personne ?",
        answer:
          "Oui. Ryan Pyles est la personne ; Elian Voigt est l'identité auctoriale sous laquelle sa fiction paraît, via FORMÆTRIX. C'est une voix littéraire distincte, pas un pseudonyme au sens simple. La distinction compte moins que le travail qu'elle produit.",
      },
      {
        question: "Qu'est-ce que FORMÆTRIX ?",
        answer:
          "FORMÆTRIX est le studio de Ryan Pyles — la pratique multidisciplinaire derrière ses systèmes de logiciel, d'IA, de design et d'édition. Il dirige aussi une maison : la ligne par laquelle paraît la fiction d'Elian Voigt. Le studio est la pratique ; la maison est l'une des choses qu'elle fait tourner.",
      },
      {
        question: "Que fait Ryan Pyles ?",
        answer:
          "Technologiste multidisciplinaire, entre ingénierie logicielle, systèmes d'IA, design de produit et langue. Il construit des systèmes de production — outillage narratif par IA, infrastructure d'édition, un moteur typographique sensible à la locale, des systèmes de produit sensibles à la locale — en React, Next.js et TypeScript, et écrit de la fiction expérimentale sous le nom d'Elian Voigt.",
      },
      {
        question: "Où est basé Ryan Pyles ?",
        answer: "À Chicago, dans l'Illinois. Il travaille avec des clients partout.",
      },
    ],
  },

  pt: {
    figures: {
      leadCaption: "Sistema humano multidisciplinar — construído entre disciplinas.",
      leadLabel:
        "Um loop curto e silencioso: Ryan Pyles em pé sobre um disco iluminado, num estúdio escuro, sob um único feixe. Anéis de varredura giram devagar ao redor dele. À esquerda, um bloco tipográfico: Ryan Pyles, Sistema humano multidisciplinar, construído entre disciplinas.",
      studioAlt:
        "Ryan J. Pyles sentado a uma mesa de desenho coberta de plantas, num estúdio de concreto e madeira, forrado de livros.",
      studioCaption: "Estúdio em Chicago — mesa de desenho, biblioteca de referência, trabalho em planta.",
      figureAlt:
        "Uma figure de vinil de Ryan Pyles sobre uma mesa, diante de um monitor que mostra o mesmo personagem como modelo 3D sem textura, com pranchas de anatomia presas na parede.",
      figureCaption:
        "Estudo de figure — pranchas de referência, malha, objeto embalado. O mesmo pipeline, de ponta a ponta.",
      orreryAlt:
        "Uma pequena escultura de latão, à maneira de um planetário, com engrenagens empilhadas e esferas em órbita, sobre uma folha, assinada Ryan Pyles · FORMÆTRIX.",
      orreryCaption:
        "FORMÆTRIX — o estúdio como mecanismo: várias disciplinas girando num mesmo eixo.",
    },
    practiceLabel: "Prática",
    practiceHeading: "A prática",
    practiceIntro:
      "Sob a superfície literária há uma prática de engenharia em atividade. Ryan constrói sistemas de produção em quatro disciplinas — quase sempre onde elas se sobrepõem.",
    disciplines: [
      {
        n: "01",
        name: "Engenharia",
        body: "Sistemas full-stack em React, Next.js e TypeScript — da arquitetura e da modelagem de dados até o deploy.",
      },
      {
        n: "02",
        name: "IA",
        body: "Sistemas que raciocinam sobre contexto longo: continuidade narrativa, recuperação e memória estruturada.",
      },
      {
        n: "03",
        name: "Design",
        body: "Interfaces editoriais e sistemas de tokens em que a tipografia e a forma carregam tanto sentido quanto o texto.",
      },
      {
        n: "04",
        name: "Língua",
        body: "Arquitetura multilíngue e linguística aplicada — doze idiomas em estudo ativo, embutidos no trabalho.",
      },
    ],
    selectedLead: "Sistemas selecionados:",
    systems: systems([
      "memória narrativa por IA",
      "um motor tipográfico sensível à locale",
      "infraestrutura de publicação estruturada",
      "a locale como comportamento do produto",
    ]),
    selectedTail: "cada um, um motor real e determinístico, com uma demo ao vivo.",
    stackLabel: "Stack",
    faqHeading: "Perguntas",
    faq: [
      {
        question: "Ryan Pyles e Elian Voigt são a mesma pessoa?",
        answer:
          "Sim. Ryan Pyles é a pessoa; Elian Voigt é a identidade autoral sob a qual a ficção dele é publicada, pela FORMÆTRIX. É uma voz literária distinta, não um pseudônimo no sentido simples. A distinção importa menos do que o trabalho que ela produz.",
      },
      {
        question: "O que é a FORMÆTRIX?",
        answer:
          "FORMÆTRIX é o estúdio de Ryan Pyles — a prática multidisciplinar por trás dos sistemas de software, IA, design e publicação. Também opera um selo: a linha pela qual a ficção de Elian Voigt é lançada. O estúdio é a prática; o selo é uma das coisas que ela opera.",
      },
      {
        question: "O que Ryan Pyles faz?",
        answer:
          "É um tecnólogo multidisciplinar, entre engenharia de software, sistemas de IA, design de produto e língua. Constrói sistemas de produção — ferramental narrativo de IA, infraestrutura editorial, um motor tipográfico sensível à locale e sistemas de produto sensíveis à locale — com React, Next.js e TypeScript, e escreve ficção experimental como Elian Voigt.",
      },
      {
        question: "Onde Ryan Pyles está?",
        answer: "Em Chicago, Illinois. Trabalha com clientes em qualquer lugar.",
      },
    ],
  },

  de: {
    figures: {
      leadCaption: "Multidisziplinäres menschliches System — über die Disziplinen hinweg gebaut.",
      leadLabel:
        "Eine kurze stumme Schleife: Ryan Pyles steht auf einer beleuchteten Scheibe in einem dunklen Studio, unter einem einzigen Strahl. Abtastende Ringe drehen sich langsam um ihn. Links ein Schriftblock: Ryan Pyles, Multidisziplinäres menschliches System, über die Disziplinen hinweg gebaut.",
      studioAlt:
        "Ryan J. Pyles an einem Zeichentisch mit ausgebreiteten Plänen, in einem Studio aus Beton und Holz, gesäumt von Büchern.",
      studioCaption: "Studio in Chicago — Zeichentisch, Referenzbibliothek, Arbeit im Plan.",
      figureAlt:
        "Eine Vinylfigur von Ryan Pyles auf einem Schreibtisch, vor einem Monitor, der dieselbe Figur als untexturiertes 3D-Modell zeigt, mit Anatomieblättern an der Wand dahinter.",
      figureCaption:
        "Figurenstudie — Referenzblätter, Mesh, verpacktes Objekt. Dieselbe Pipeline, von Anfang bis Ende.",
      orreryAlt:
        "Eine kleine Messingskulptur nach Art eines Planetariums, gestapelte Zahnräder und kreisende Kugeln, auf einem Blatt, signiert Ryan Pyles · FORMÆTRIX.",
      orreryCaption:
        "FORMÆTRIX — das Studio als Mechanismus: mehrere Disziplinen auf einer Achse.",
    },
    practiceLabel: "Praxis",
    practiceHeading: "Die Praxis",
    practiceIntro:
      "Unter der literarischen Oberfläche liegt eine arbeitende Ingenieurpraxis. Ryan baut Produktionssysteme in vier Disziplinen — meist dort, wo sie sich überlappen.",
    disciplines: [
      {
        n: "01",
        name: "Engineering",
        body: "Full-Stack-Systeme in React, Next.js und TypeScript — von Architektur und Datenmodellierung bis zum Deployment.",
      },
      {
        n: "02",
        name: "KI",
        body: "Systeme, die über langen Kontext urteilen: narrative Kontinuität, Retrieval, strukturiertes Gedächtnis.",
      },
      {
        n: "03",
        name: "Design",
        body: "Redaktionelle Interfaces und Token-Systeme, in denen Typografie und Form ebenso tragen wie der Text.",
      },
      {
        n: "04",
        name: "Sprache",
        body: "Mehrsprachige Architektur und angewandte Linguistik — zwölf Sprachen im aktiven Studium, in die Arbeit eingebaut.",
      },
    ],
    selectedLead: "Ausgewählte Systeme:",
    systems: systems([
      "narrative KI-Erinnerung",
      "eine locale-bewusste Typografie-Engine",
      "strukturierte Publikationsinfrastruktur",
      "Locale als Produktverhalten",
    ]),
    selectedTail: "jeweils eine echte, deterministische Engine mit Live-Demo.",
    stackLabel: "Stack",
    faqHeading: "Fragen",
    faq: [
      {
        question: "Sind Ryan Pyles und Elian Voigt dieselbe Person?",
        answer:
          "Ja. Ryan Pyles ist die Person; Elian Voigt ist die Autorenidentität, unter der seine Fiktion über FORMÆTRIX erscheint. Eine eigene literarische Stimme, kein Pseudonym im einfachen Sinn. Die Unterscheidung zählt weniger als die Arbeit, die sie hervorbringt.",
      },
      {
        question: "Was ist FORMÆTRIX?",
        answer:
          "FORMÆTRIX ist das Studio von Ryan Pyles — die multidisziplinäre Praxis hinter seinen Software-, KI-, Design- und Publikationssystemen. Es führt auch ein Imprint: die Linie, über die die Fiktion von Elian Voigt erscheint. Das Studio ist die Praxis; das Imprint ist eines der Dinge, die sie betreibt.",
      },
      {
        question: "Was macht Ryan Pyles?",
        answer:
          "Er ist ein multidisziplinärer Technologe zwischen Software-Engineering, KI-Systemen, Produktdesign und Sprache. Er baut Produktionssysteme — narrative KI-Werkzeuge, Publikationsinfrastruktur, eine locale-bewusste Typografie-Engine und locale-bewusste Produktsysteme — mit React, Next.js und TypeScript, und schreibt experimentelle Fiktion als Elian Voigt.",
      },
      {
        question: "Wo ist Ryan Pyles ansässig?",
        answer: "In Chicago, Illinois. Er arbeitet mit Auftraggebern weltweit.",
      },
    ],
  },

  it: {
    figures: {
      leadCaption: "Sistema umano multidisciplinare — costruito tra le discipline.",
      leadLabel:
        "Un loop breve e muto: Ryan Pyles in piedi su un disco illuminato, in uno studio buio, sotto un unico fascio. Anelli di scansione ruotano lentamente intorno a lui. A sinistra, un blocco tipografico: Ryan Pyles, Sistema umano multidisciplinare, costruito tra le discipline.",
      studioAlt:
        "Ryan J. Pyles seduto a un tavolo da disegno coperto di piante, in uno studio di cemento e legno, foderato di libri.",
      studioCaption: "Studio a Chicago — tavolo da disegno, biblioteca di consultazione, lavoro in pianta.",
      figureAlt:
        "Una figure in vinile di Ryan Pyles su una scrivania, davanti a un monitor che mostra lo stesso personaggio come modello 3D senza texture, con tavole anatomiche fissate al muro.",
      figureCaption:
        "Studio di figura — tavole di riferimento, mesh, oggetto confezionato. La stessa pipeline, da un capo all'altro.",
      orreryAlt:
        "Una piccola scultura in ottone, a mo' di planetario, con ingranaggi impilati e sfere in orbita, su un foglio, firmata Ryan Pyles · FORMÆTRIX.",
      orreryCaption:
        "FORMÆTRIX — lo studio come meccanismo: più discipline che girano su un asse.",
    },
    practiceLabel: "Pratica",
    practiceHeading: "La pratica",
    practiceIntro:
      "Sotto la superficie letteraria c'è una pratica di ingegneria in attività. Ryan costruisce sistemi di produzione in quattro discipline — quasi sempre dove si sovrappongono.",
    disciplines: [
      {
        n: "01",
        name: "Ingegneria",
        body: "Sistemi full-stack in React, Next.js e TypeScript — dall'architettura e dalla modellazione dei dati al deploy.",
      },
      {
        n: "02",
        name: "IA",
        body: "Sistemi che ragionano su un contesto lungo: continuità narrativa, recupero, memoria strutturata.",
      },
      {
        n: "03",
        name: "Design",
        body: "Interfacce editoriali e sistemi di token, in cui tipografia e forma portano quanto il testo.",
      },
      {
        n: "04",
        name: "Lingua",
        body: "Architettura multilingue e linguistica applicata — dodici lingue in studio attivo, incorporate nel lavoro.",
      },
    ],
    selectedLead: "Sistemi selezionati:",
    systems: systems([
      "memoria narrativa via IA",
      "un motore tipografico sensibile alla locale",
      "infrastruttura di pubblicazione strutturata",
      "la locale come comportamento del prodotto",
    ]),
    selectedTail: "ciascuno un motore reale e deterministico, con una demo dal vivo.",
    stackLabel: "Stack",
    faqHeading: "Domande",
    faq: [
      {
        question: "Ryan Pyles ed Elian Voigt sono la stessa persona?",
        answer:
          "Sì. Ryan Pyles è la persona; Elian Voigt è l'identità autoriale sotto cui esce la sua narrativa, tramite FORMÆTRIX. È una voce letteraria distinta, non uno pseudonimo in senso semplice. La distinzione conta meno del lavoro che produce.",
      },
      {
        question: "Che cos'è FORMÆTRIX?",
        answer:
          "FORMÆTRIX è lo studio di Ryan Pyles — la pratica multidisciplinare dietro i suoi sistemi di software, IA, design e editoria. Gestisce anche un marchio: la linea attraverso cui esce la narrativa di Elian Voigt. Lo studio è la pratica; il marchio è una delle cose che essa fa funzionare.",
      },
      {
        question: "Che cosa fa Ryan Pyles?",
        answer:
          "È un tecnologo multidisciplinare, tra ingegneria del software, sistemi di IA, design di prodotto e lingua. Costruisce sistemi di produzione — strumenti narrativi di IA, infrastruttura editoriale, un motore tipografico sensibile alla locale e sistemi di prodotto sensibili alla locale — con React, Next.js e TypeScript, e scrive narrativa sperimentale come Elian Voigt.",
      },
      {
        question: "Dove si trova Ryan Pyles?",
        answer: "A Chicago, Illinois. Lavora con clienti ovunque.",
      },
    ],
  },

  ja: {
    figures: {
      leadCaption: "領域を横断して組まれた、多分野の人的システム。",
      leadLabel:
        "短い無音のループ。暗いスタジオで、頭上の一本の光の下、照らされた円盤の上に Ryan Pyles が立っている。走査の環がゆっくりと周囲を回る。左にはロゴタイプ。Ryan Pyles、多分野の人的システム、領域を横断して組まれた。",
      studioAlt:
        "製図台に図面を広げ、本に囲まれたコンクリートと木材のスタジオで座る Ryan J. Pyles。",
      studioCaption: "シカゴのスタジオ——製図台、参照書架、図面上の仕事。",
      figureAlt:
        "机の上の Ryan Pyles のビニールフィギュア。手前のモニタには同じ人物のテクスチャなし3Dモデル。背後の壁には解剖の参照シート。",
      figureCaption: "フィギュアスタディ——参照シート、メッシュ、梱包された物体。同じパイプラインを端から端まで。",
      orreryAlt:
        "積み重なった歯車と周回する球からなる、小さな真鍮の惑星儀のような彫刻。紙の上に立ち、Ryan Pyles · FORMÆTRIX と署名されている。",
      orreryCaption: "FORMÆTRIX——機構としてのスタジオ。複数の分野が一本の軸で回る。",
    },
    practiceLabel: "実務",
    practiceHeading: "実務",
    practiceIntro:
      "文学の表面の下に、動いている工学の実務がある。Ryan は四つの分野で本番のシステムを組む。重なるところがいちばん多い。",
    disciplines: [
      {
        n: "01",
        name: "エンジニアリング",
        body: "React、Next.js、TypeScript によるフルスタック。設計とデータモデリングからデプロイまで。",
      },
      {
        n: "02",
        name: "AI",
        body: "長い文脈を扱うシステム。物語の連続性、検索、構造化された記憶。",
      },
      {
        n: "03",
        name: "デザイン",
        body: "編集的なインターフェースとデザイントークン。組版と形が、本文と同じだけ意味を担う。",
      },
      {
        n: "04",
        name: "言語",
        body: "多言語の設計と応用言語学。継続して学んでいる十二の言語が、仕事の中に入っている。",
      },
    ],
    selectedLead: "選んだシステム：",
    systems: systems([
      "AIによる物語の記憶",
      "ロケールを知る組版エンジン",
      "構造化された出版の基盤",
      "ロケールを製品の振る舞いとして扱う",
    ]),
    selectedTail: "いずれも実在する決定的なエンジンで、動くデモがある。",
    stackLabel: "スタック",
    faqHeading: "問い",
    faq: [
      {
        question: "Ryan Pyles と Elian Voigt は同一人物か。",
        answer:
          "そうだ。Ryan Pyles が人であり、Elian Voigt は FORMÆTRIX を通じて小説が刊行される作者の身分だ。単純な筆名ではない、独立した文学の声である。区別より、それが生む仕事のほうが重い。",
      },
      {
        question: "FORMÆTRIX とは何か。",
        answer:
          "FORMÆTRIX は Ryan Pyles のスタジオだ。ソフトウェア、AI、デザイン、出版のシステムの背後にある、領域を横断する実務である。あわせてインプリントを運営する。Elian Voigt の小説がそこから出る。スタジオが実務で、インプリントはその実務が回しているもののひとつだ。",
      },
      {
        question: "Ryan Pyles は何をしているか。",
        answer:
          "ソフトウェア工学、AI、プロダクトデザイン、言語を横断する技術者である。React、Next.js、TypeScript で本番のシステムを組む。AIの物語ツール、出版の基盤、ロケールを知る組版エンジン、ロケールを知る製品システム。実験的な小説は Elian Voigt として書く。",
      },
      {
        question: "拠点はどこか。",
        answer: "イリノイ州シカゴ。依頼は各地から受ける。",
      },
    ],
  },

  zh: {
    figures: {
      leadCaption: "跨領域組裝的人的系統。",
      leadLabel:
        "一段短而靜音的循環：Ryan Pyles 站在暗室裡一束頂光下的亮盤上，掃描環緩緩繞著他轉。左側是一組字標：Ryan Pyles，跨領域的人的系統，在學科之間建成。",
      studioAlt:
        "Ryan J. Pyles 坐在鋪滿平面圖的製圖桌前，工作室是混凝土與木材，四周是書。",
      studioCaption: "芝加哥工作室——製圖桌、參考書架、圖上的工作。",
      figureAlt:
        "桌上的 Ryan Pyles 乙烯基人偶，面前的螢幕顯示同一個角色的無貼圖 3D 模型，背後牆上釘著解剖參考稿。",
      figureCaption: "人偶研究——參考稿、網格、包裝好的物件。同一條管線，從頭到尾。",
      orreryAlt:
        "一座小型黃銅雕塑，像一具行星儀：層疊的齒輪與繞行的球，立在一張紙上，署名 Ryan Pyles · FORMÆTRIX。",
      orreryCaption: "FORMÆTRIX——作為機構的工作室：多個學科繞同一根軸轉動。",
    },
    practiceLabel: "實務",
    practiceHeading: "實務",
    practiceIntro:
      "文學表面之下是一套正在運作的工程實務。Ryan 在四個領域裡建造正式上線的系統，多半是在它們重疊的地方。",
    disciplines: [
      {
        n: "01",
        name: "工程",
        body: "以 React、Next.js、TypeScript 做的全端系統——從架構與資料建模到部署。",
      },
      {
        n: "02",
        name: "人工智慧",
        body: "對長上下文作判斷的系統：敘事連續性、檢索、有結構的記憶。",
      },
      {
        n: "03",
        name: "設計",
        body: "編輯式介面與設計代幣系統。字體與形式所承擔的意義，不少於正文。",
      },
      {
        n: "04",
        name: "語言",
        body: "多語架構與應用語言學——十二種持續研究的語言，做進工作裡。",
      },
    ],
    selectedLead: "選錄系統：",
    systems: systems([
      "人工智慧的敘事記憶",
      "能辨認語區的排版引擎",
      "有結構的出版基礎設施",
      "把語區當作產品行為",
    ]),
    selectedTail: "每一個都是真實、可判定的引擎，並附有可操作的示範。",
    stackLabel: "技術棧",
    faqHeading: "問題",
    faq: [
      {
        question: "Ryan Pyles 與 Elian Voigt 是同一個人嗎？",
        answer:
          "是。Ryan Pyles 是那個人；Elian Voigt 是他的小說經由 FORMÆTRIX 出版時所用的作者身分。那是一種獨立的文學聲音，不是簡單意義上的筆名。分別本身，不如它產生的作品要緊。",
      },
      {
        question: "FORMÆTRIX 是什麼？",
        answer:
          "FORMÆTRIX 是 Ryan Pyles 的工作室——軟體、人工智慧、設計與出版系統背後的跨領域實務。它也經營一個出版標記：Elian Voigt 的小說由此發行。工作室是實務；標記是這套實務所經營的事物之一。",
      },
      {
        question: "Ryan Pyles 做什麼？",
        answer:
          "他是跨領域的技術者，工作橫跨軟體工程、人工智慧系統、產品設計與語言。他用 React、Next.js 與 TypeScript 建造正式系統——人工智慧敘事工具、出版基礎設施、能辨認語區的排版引擎，以及把語區當作產品行為的系統——並以 Elian Voigt 的名義寫實驗小說。",
      },
      {
        question: "Ryan Pyles 駐在哪裡？",
        answer: "伊利諾州芝加哥。客戶不限一地。",
      },
    ],
  },

  he: {
    figures: {
      leadCaption: "מערכת אנושית רב־תחומית — בנויה לרוחב התחומים.",
      leadLabel:
        "לולאה קצרה ושקטה: Ryan Pyles עומד על דיסקה מוארת בסטודיו חשוך, תחת אלומה אחת. טבעות סריקה סובבות לאט סביבו. משמאל, בלוק אותיות: Ryan Pyles, מערכת אנושית רב־תחומית, בנויה לרוחב התחומים.",
      studioAlt:
        "Ryan J. Pyles יושב לשולחן שרטוט מכוסה בתוכניות, בסטודיו של בטון ועץ המוקף ספרים.",
      studioCaption: "הסטודיו בשיקגו — שולחן שרטוט, ספריית עזר, עבודה בתוכנית.",
      figureAlt:
        "דמות ויניל של Ryan Pyles על שולחן, מול מסך שמציג את אותה דמות כמודל תלת־ממדי בלי טקסטורה, וגיליונות אנטומיה נעוצים בקיר מאחור.",
      figureCaption: "מחקר דמות — גיליונות עזר, רשת, אובייקט ארוז. אותו צינור, מקצה לקצה.",
      orreryAlt:
        "פסל פליז קטן, כמין פלנטריום, גלגלי שיניים מוערמים וכדורים במסלול, על גיליון נייר, חתום Ryan Pyles · FORMÆTRIX.",
      orreryCaption: "FORMÆTRIX — הסטודיו כמנגנון: כמה תחומים על ציר אחד.",
    },
    practiceLabel: "הפרקטיקה",
    practiceHeading: "הפרקטיקה",
    practiceIntro:
      "מתחת לפני השטח הספרותיים יש פרקטיקה הנדסית עובדת. Ryan בונה מערכות ייצור בארבעה תחומים — לרוב במקום שבו הם חופפים.",
    disciplines: [
      {
        n: "01",
        name: "הנדסה",
        body: "מערכות full-stack ב־React, ב־Next.js וב־TypeScript — מארכיטקטורה וממידול נתונים ועד לפריסה.",
      },
      {
        n: "02",
        name: "בינה מלאכותית",
        body: "מערכות ששופטות הקשר ארוך: רציפות נרטיבית, אחזור, וזיכרון מובנה.",
      },
      {
        n: "03",
        name: "עיצוב",
        body: "ממשקים עריכתיים ומערכות אסימוני עיצוב, שבהם הטיפוגרפיה והצורה נושאות לא פחות מהטקסט.",
      },
      {
        n: "04",
        name: "שפה",
        body: "ארכיטקטורה רב־לשונית ובלשנות יישומית — שתים־עשרה שפות בלימוד פעיל, בנויות לתוך העבודה.",
      },
    ],
    selectedLead: "מערכות נבחרות:",
    systems: systems([
      "זיכרון נרטיבי בבינה מלאכותית",
      "מנוע טיפוגרפיה שמכיר locale",
      "תשתית הוצאה מובנית",
      "locale כהתנהגות של מוצר",
    ]),
    selectedTail: "כל אחת מנוע אמיתי ודטרמיניסטי, עם הדגמה חיה.",
    stackLabel: "מחסנית",
    faqHeading: "שאלות",
    faq: [
      {
        question: "האם Ryan Pyles ו־Elian Voigt הם אותו אדם?",
        answer:
          "כן. Ryan Pyles הוא האדם; Elian Voigt הוא הזהות המחברת שתחתיה יוצאת הפרוזה שלו, דרך FORMÆTRIX. זה קול ספרותי נבדל, לא שם עט במובן הפשוט. ההבחנה חשובה פחות מהעבודה שהיא מייצרת.",
      },
      {
        question: "מהי FORMÆTRIX?",
        answer:
          "FORMÆTRIX הוא הסטודיו של Ryan Pyles — הפרקטיקה הרב־תחומית שמאחורי מערכות התוכנה, הבינה המלאכותית, העיצוב וההוצאה לאור. הוא גם מפעיל חותם: הקו שדרכו יוצאת הפרוזה של Elian Voigt. הסטודיו הוא הפרקטיקה; החותם הוא אחד הדברים שהיא מפעילה.",
      },
      {
        question: "מה Ryan Pyles עושה?",
        answer:
          "הוא טכנולוג רב־תחומי, בין הנדסת תוכנה, מערכות בינה מלאכותית, עיצוב מוצר ושפה. הוא בונה מערכות ייצור — כלי נרטיב בבינה מלאכותית, תשתית הוצאה, מנוע טיפוגרפיה שמכיר locale, ומערכות מוצר שמכירות locale — ב־React, ב־Next.js וב־TypeScript, וכותב פרוזה ניסיונית כ־Elian Voigt.",
      },
      {
        question: "היכן Ryan Pyles יושב?",
        answer: "בשיקגו, אילינוי. הוא עובד עם לקוחות בכל מקום.",
      },
    ],
  },

  skandi: {
    figures: {
      leadCaption: "Tverrfagleg menneskeleg system — bygt på tvers av faga.",
      leadLabel:
        "Ei kort og stille sløyfe: Ryan Pyles står på ein opplyst skive i eit mørkt studio, under éin stråle. Skanneringar ringar seg sakte rundt han. Til venstre, ein skriftblokk: Ryan Pyles, tverrfagleg menneskeleg system, bygt på tvers av faga.",
      studioAlt:
        "Ryan J. Pyles sit ved eit teiknebord dekt av planar, i eit studio av betong og tre, kanta av bøker.",
      studioCaption: "Studio i Chicago — teiknebord, referansebibliotek, arbeid i plan.",
      figureAlt:
        "Ein vinylfigur av Ryan Pyles på eit bord, framfor ein skjerm som viser same figuren som ein 3D-modell utan tekstur, med anatomiark festa på veggen bak.",
      figureCaption:
        "Figurstudie — referanseark, mesh, pakka objekt. Same røyrleidning, frå ende til annan.",
      orreryAlt:
        "Ein liten messingsskulptur, som eit planetarium, med stabla tannhjul og kuler i bane, på eit ark, signert Ryan Pyles · FORMÆTRIX.",
      orreryCaption:
        "FORMÆTRIX — studioet som ein mekanisme: fleire fag på éin akse.",
    },
    practiceLabel: "Praksis",
    practiceHeading: "Praksisen",
    practiceIntro:
      "Under den litterære overflata ligg ein arbeidande ingeniørpraksis. Ryan byggjer produksjonssystem i fire fag — oftast der dei overlappar.",
    disciplines: [
      {
        n: "01",
        name: "Ingeniørfag",
        body: "Full-stack-system i React, Next.js og TypeScript — frå arkitektur og datamodellering til utrulling.",
      },
      {
        n: "02",
        name: "KI",
        body: "System som dømer over lang kontekst: narrativ kontinuitet, attfinning, strukturert minne.",
      },
      {
        n: "03",
        name: "Design",
        body: "Redaksjonelle grensesnitt og token-system, der typografi og form ber like mykje som teksten.",
      },
      {
        n: "04",
        name: "Språk",
        body: "Fleirspråkleg arkitektur og brukt lingvistikk — tolv språk i aktivt studium, bygde inn i arbeidet.",
      },
    ],
    selectedLead: "Valde system:",
    systems: systems([
      "narrativt KI-minne",
      "ein typografimotor som kjenner locale",
      "strukturert utgjevarsinfrastruktur",
      "locale som produktåtferd",
    ]),
    selectedTail: "kvar ein ekte, deterministisk motor med ein live demo.",
    stackLabel: "Stabel",
    faqHeading: "Spørsmål",
    faq: [
      {
        question: "Er Ryan Pyles og Elian Voigt same person?",
        answer:
          "Ja. Ryan Pyles er mennesket; Elian Voigt er forfattaridentiteten fiksjonen hans kjem ut under, gjennom FORMÆTRIX. Ein eigen litterær røyst, ikkje eit pseudonym i enkel meining. Skilnaden tel mindre enn arbeidet ho produserer.",
      },
      {
        question: "Kva er FORMÆTRIX?",
        answer:
          "FORMÆTRIX er studioet til Ryan Pyles — den tverrfaglege praksisen bak systema hans for programvare, KI, design og utgjeving. Det driv òg eit forlagsmerke: lina Elian Voigt sin fiksjon kjem ut gjennom. Studioet er praksisen; merket er ein av tinga ho driv.",
      },
      {
        question: "Kva gjer Ryan Pyles?",
        answer:
          "Han er ein tverrfagleg teknolog, mellom programvareingeniørfag, KI-system, produktdesign og språk. Han byggjer produksjonssystem — narrative KI-verkty, utgjevarsinfrastruktur, ein typografimotor som kjenner locale, og produktsystem som kjenner locale — med React, Next.js og TypeScript, og skriv eksperimentell fiksjon som Elian Voigt.",
      },
      {
        question: "Kor er Ryan Pyles basert?",
        answer: "I Chicago, Illinois. Han arbeider med oppdragsgjevarar kvar som helst.",
      },
    ],
  },
};

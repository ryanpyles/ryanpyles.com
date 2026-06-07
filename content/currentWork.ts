export interface CurrentWorkItem {
  slug: string;
  title: string;
  status: string;
  type: string;
  href?: string;
}

export const currentWork: CurrentWorkItem[] = [
  {
    slug: "babel-threshold",
    title: "Babel Threshold",
    status: "In Development",
    type: "Experimental Novel",
  },
  {
    slug: "liminal-617",
    title: "Liminal 6:17",
    status: "Part I",
    type: "Literary Horror",
  },
  {
    slug: "formaetrix",
    title: "FORMÆTRIX",
    status: "Active",
    type: "Studio",
    href: "https://www.formaetrix.com",
  },
  {
    slug: "language-research",
    title: "Language Research",
    status: "Ongoing",
    type: "Lifelong Obsession",
  },
];

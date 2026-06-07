export interface NetworkNode {
  id: string;
  label: string;
  description: string;
  links: string[];
  position: [number, number, number];
}

export interface NetworkEdge {
  source: string;
  target: string;
}

export const networkNodes: NetworkNode[] = [
  {
    id: "author",
    label: "Author",
    position: [-0.4, 0.8, 0],
    description:
      "Experimental fiction, linguistic edge cases, and the structural behavior of narrative. Work tends toward darkness, exactness, and considerable length.",
    links: [
      "Declensions of Dark Water",
      "Feast of the Broadcast Saints",
      "Babel Threshold (In Development)",
      "Liminal 6:17 (Part I)",
    ],
  },
  {
    id: "developer",
    label: "Developer",
    position: [1.4, 0.2, -0.3],
    description:
      "Web systems, design infrastructure, the kind of code that has strong opinions about typography. Currently working in Next.js, React Three Fiber, and CSS with convictions.",
    links: [
      "FORMÆTRIX Studio",
      "Dual-Domain Identity System",
      "Multi-Language Typography Engine",
      "3D Identity Navigation",
    ],
  },
  {
    id: "designer",
    label: "Designer",
    position: [0.9, -0.8, 0.2],
    description:
      "Type-first, system-second. The question is always about what a structure should feel like before it can decide what to look like.",
    links: [
      "FORMÆTRIX Studio",
      "Field Notes: Why restraint only works when something underneath is unstable",
      "Field Notes: LuaLaTeX as a nervous system",
    ],
  },
  {
    id: "linguist",
    label: "Linguist",
    position: [-1.3, 0.3, -0.2],
    description:
      "Ten languages at various depths of study. Particular interest in aspect, register, the grammar of uncertainty, and what gets lost when you translate the subjunctive.",
    links: [
      "Language Research (Ongoing)",
      "Language Orrery",
      "Field Notes: Gluggaveður and the cruelty of windows",
      "Babel Threshold (In Development)",
    ],
  },
  {
    id: "traveler",
    label: "Traveler",
    position: [-1.6, -0.5, 0.3],
    description:
      "Maps as grammar. The places that teach you their language before they teach you anything else — Iceland first, then wherever the footnotes lead.",
    links: [
      "Field Notes: Gluggaveður and the cruelty of windows",
      "Language Research (Ongoing)",
    ],
  },
  {
    id: "researcher",
    label: "Researcher",
    position: [0.2, 1.5, -0.4],
    description:
      "Deep structure. The bibliography that outlasts the project. Current threads: narrative theory, linguistic typology, and the behavior of form under constraint.",
    links: [
      "Language Research (Ongoing)",
      "Babel Threshold (In Development)",
      "Field Notes: A chapter outline is a software diagram with ghosts",
    ],
  },
  {
    id: "corpsman",
    label: "Corpsman",
    position: [-0.8, -1.1, 0.1],
    description:
      "US Navy Hospital Corpsman. Fourteen months in Afghanistan. Emergency medicine under pressure. The body as something you have to understand completely, immediately, without sentiment.",
    links: [
      "Field Notes: Why restraint only works when something underneath is unstable",
      "Field Notes: A chapter outline is a software diagram with ghosts",
    ],
  },
  {
    id: "dog-dad",
    label: "Dog Dad",
    position: [1.2, -1.3, 0.4],
    description:
      "Handler of one very large, extremely opinionated dog who has strong views on appropriate software development hours and when it is time to close the laptop.",
    links: ["Field Notes: Why restraint only works when something underneath is unstable"],
  },
];

export const networkEdges: NetworkEdge[] = [
  { source: "author", target: "linguist" },
  { source: "author", target: "researcher" },
  { source: "author", target: "corpsman" },
  { source: "author", target: "designer" },
  { source: "developer", target: "designer" },
  { source: "developer", target: "linguist" },
  { source: "developer", target: "researcher" },
  { source: "linguist", target: "traveler" },
  { source: "linguist", target: "researcher" },
  { source: "traveler", target: "corpsman" },
  { source: "traveler", target: "dog-dad" },
  { source: "researcher", target: "corpsman" },
  { source: "corpsman", target: "designer" },
];

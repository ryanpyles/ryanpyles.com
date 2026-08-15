"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   CONTINUITY ATLAS
   A visual story-memory system for AI-assisted novelists.
   Sample project: "Liminal 6:17" — multi-POV literary speculative novel.
   Single-file prototype. Local data. Mocked AI generation.
   ============================================================ */

/* ---------- design tokens ---------- */
const C = {
  ink: "#14120F",
  bone: "#F5F0E8",
  parchment: "#D8CDBB",
  oxide: "#D96A3A",
  violet: "#6E5A7E",
  fog: "#9A948C",
  warn: "#8F3D2E",
} as const;

/* ---------- font references ---------- */
const mono = "'IBM Plex Mono', ui-monospace, monospace";
const serif = "'Fraunces', 'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

/* ---------- data types ---------- */
interface MemoryItem {
  id: string;
  kind: string;
  label: string;
  status: string;
  first: string;
  last: string;
  linked: string[];
  reader: string;
  author: string;
  risk: string;
  suggest: string;
  count: number;
  authorOnly: boolean;
}

interface CharacterState {
  chapter: string;
  title: string;
  mood: string;
  knows: string[];
  doesNotKnow: string[];
  reader: string[];
  author: string[];
  motifs: string[];
  warnings: string[];
  fracture: boolean;
}

interface Character {
  id: string;
  name: string;
  role: string;
  surfaceGoal: string;
  hiddenDesire: string;
  fear: string;
  lie: string;
  voiceMarkers: string[];
  states: CharacterState[];
}

interface VoiceMetric {
  k: string;
  v: number;
  note: string;
}

/* ---------- manuscript data (extracted from the real ms) ---------- */
const PROJECT = {
  title: "Liminal 6:17",
  structure: "Multi-POV literary speculative novel",
  povOrder: ["Jack", "Oren", "Damon"],
  motifs: ["6:17", "crows", "static hum", "mirrored water", "leash slack"],
  chapters: [
    "I. 6:17", "II. Recalculation", "III. The Basement", "IV. She Knows",
    "V. Whitaker Way", "VI. Not How It Happened", "VII. We've Been Here Before",
    "VIII. The Mirror", "IX. The Loop", "X. Flyers", "XI. Home Is Taken",
    "XII. Do You Want to Stay This Time?", "XIII. The Other Street",
    "XIV. David, Again", "XV. The House with No Basement", "XVI. A Better Version",
    "XVII. The Decision", "XVIII. The Drive", "XIX. The Pulse", "XX. ∆",
    "XXI. The Toy", "XXII. Reunion 2017", "XXIII. Tomorrow's Note", "XXIV. We Stayed",
  ],
};

const STORY_MEMORY: MemoryItem[] = [
  {
    id: "m_617", kind: "Motif", label: "6:17",
    status: "Recurring", first: "I", last: "XXII",
    linked: ["Jack", "Oren", "Damon"],
    reader: "Pattern noticed, meaning unclear",
    author: "Moment of simultaneous death",
    risk: "Overuse may make the reveal too obvious",
    suggest: "Delay explicit interpretation until late in the book",
    count: 124, authorOnly: true,
  },
  {
    id: "m_static", kind: "Motif", label: "Static hum",
    status: "Recurring", first: "I", last: "XIX",
    linked: ["Jack", "Damon"],
    reader: "Ambient dread / wrongness of the street",
    author: "The threshold's carrier signal between loops",
    risk: "Reads as set-dressing if not tied to a state change",
    suggest: "Spike it at loop boundaries only",
    count: 89, authorOnly: true,
  },
  {
    id: "m_leash", kind: "Motif", label: "Leash slack",
    status: "Recurring", first: "I", last: "X",
    linked: ["Jack", "Arya"],
    reader: "Jack's control over Arya, then its loss",
    author: "Index of how much body Jack has left",
    risk: "Sentimental if over-described",
    suggest: "Let slack increase silently across chapters",
    count: 63, authorOnly: false,
  },
  {
    id: "m_mirror", kind: "Motif", label: "Mirrored water",
    status: "Recurring", first: "VIII", last: "XX",
    linked: ["Jack", "Oren"],
    reader: "Doubling, the wrong reflection",
    author: "Where the three POVs are actually one event",
    risk: "Convergence becomes legible too early",
    suggest: "Keep reflections subtly non-matching",
    count: 54, authorOnly: true,
  },
  {
    id: "m_loop", kind: "Motif", label: "The loop",
    status: "Recurring", first: "I", last: "XXIV",
    linked: ["Jack", "Oren", "Damon"],
    reader: "Time is repeating; rules unknown",
    author: "Memory's last-ditch hold on the dead",
    risk: "Mechanic gets explained before it's felt",
    suggest: "Withhold any 'rules' dialogue",
    count: 140, authorOnly: true,
  },
  {
    id: "s_death", kind: "Secret", label: "The simultaneous death",
    status: "Author-only", first: "—", last: "—",
    linked: ["Jack", "Oren", "Damon"],
    reader: "Not confirmed; sensed",
    author: "All three POVs die at 6:17 in the same event",
    risk: "Any character understanding it collapses the reveal",
    suggest: "Reveal gradually; never state it in narration",
    count: 1, authorOnly: true,
  },
  {
    id: "c_david", kind: "Contradiction", label: "David: gone vs. addressed",
    status: "Open loop", first: "II", last: "XIV",
    linked: ["Oren", "David"],
    reader: "Oren speaks to an absent 'you'",
    author: "David is the loss that pulls Oren into the loop",
    risk: "Timeline of David's absence reads inconsistent",
    suggest: "Lock when David's absence becomes a death",
    count: 74, authorOnly: false,
  },
  {
    id: "p_return", kind: "Promise", label: "RETURN / the flyer",
    status: "Foreshadowed", first: "I", last: "XI",
    linked: ["Jack"],
    reader: "MISSING. GONE. RETURN.",
    author: "The book's offer: stay, or return and lose it",
    risk: "Reader resolves the choice before Jack does",
    suggest: "Pay off only at 'We Stayed'",
    count: 32, authorOnly: false,
  },
];

const CHARACTERS: Character[] = [
  {
    id: "jack", name: "Jack", role: "Protagonist · POV 1",
    surfaceGoal: "Reach home with Arya",
    hiddenDesire: "Be forgiven for what happened to Arya",
    fear: "That stopping means it was real",
    lie: "If he keeps moving, the loop ends",
    voiceMarkers: [
      "Fragmented syntax under stress",
      "Sensory detail before interpretation",
      "Military cadence / drill-sergeant bark",
      "Time distortion, timestamp fragments",
    ],
    states: [
      {
        chapter: "I", title: "6:17", mood: "Avoidant · lucid · skeptical",
        knows: ["The street is wrong", "Arya is reacting to something"],
        doesNotKnow: ["He is dead"],
        reader: ["A pattern (6-1-7) is surfacing"],
        author: ["This is the first loop the reader sees, not the first that happened"],
        motifs: ["6:17", "leash slack", "static hum"],
        warnings: ["Keep Jack confident; no metaphysical understanding yet"],
        fracture: false,
      },
      {
        chapter: "VII", title: "We've Been Here Before", mood: "Fractured · bodily panic",
        knows: ["Something is wrong with time", "They've walked this road too many times"],
        doesNotKnow: ["He is dead"],
        reader: ["Supernatural recurrence confirmed"],
        author: ["Simultaneous death event at 6:17 underlies the recurrence"],
        motifs: ["6:17", "leash slack", "static hum", "the loop"],
        warnings: [
          "Do not let Jack understand the afterlife yet",
          "Keep Arya physically present but narratively slipping",
        ],
        fracture: true,
      },
      {
        chapter: "X", title: "Flyers", mood: "Grief-softened · loosening grip",
        knows: ["The flyer is about him", "He cannot win by moving"],
        doesNotKnow: ["Whether staying is allowed"],
        reader: ["RETURN is a choice, not a command"],
        author: ["Leash slack reaches maximum; Arya is mostly gone"],
        motifs: ["leash slack", "the loop", "6:17"],
        warnings: ["Let the release be physical, not stated"],
        fracture: true,
      },
      {
        chapter: "XXIV", title: "We Stayed", mood: "Recognition · quiet",
        knows: ["What 6:17 was", "That he stayed"],
        doesNotKnow: ["—"],
        reader: ["The full event, finally"],
        author: ["Promise RETURN paid off; loop closes"],
        motifs: ["6:17", "the loop", "mirrored water"],
        warnings: ["Earn the understatement; resist summary"],
        fracture: false,
      },
    ],
  },
  {
    id: "oren", name: "Oren", role: "POV 2",
    surfaceGoal: "Drive somewhere that isn't here",
    hiddenDesire: "Undo the loss of David",
    fear: "That David's absence is permanent",
    lie: "The road leads to a destination",
    voiceMarkers: [
      "Long lyrical sentences, second-person address",
      "Apostrophe to an absent 'you' (David)",
      "Architecture as judgment / sentinels",
      "GPS as a brittle oracle",
    ],
    states: [
      {
        chapter: "II", title: "Recalculation", mood: "Adrift · grieving",
        knows: ["The roads loop", "His hands still belong to him — barely"],
        doesNotKnow: ["He is dead", "David is part of the same event"],
        reader: ["A second voice, also looping"],
        author: ["Oren's loop is the same 6:17, seen sideways"],
        motifs: ["mirrored water", "static hum", "the loop"],
        warnings: ["Keep David's status ambiguous; don't confirm a death yet"],
        fracture: false,
      },
      {
        chapter: "XIV", title: "David, Again", mood: "Pleading · unraveling",
        knows: ["The GPS is lying", "He keeps arriving where he left"],
        doesNotKnow: ["That 'arriving' is the threshold"],
        reader: ["David is the engine of Oren's loop"],
        author: ["David's absence resolves into the shared death"],
        motifs: ["mirrored water", "the loop"],
        warnings: ["Lock the David contradiction here; no earlier"],
        fracture: true,
      },
    ],
  },
  {
    id: "damon", name: "Damon", role: "POV 3",
    surfaceGoal: "Make the pattern run correctly",
    hiddenDesire: "Be the author of the loop, not its subject",
    fear: "That he is the broken code, not the coder",
    lie: "The rhythm is fixable",
    voiceMarkers: [
      "Loop described as code / rhythm / syntax",
      "Self-diagnosis: 'or perhaps I am [broken]'",
      "House as a witness that speaks his name",
      "Dissonance between word and self",
    ],
    states: [
      {
        chapter: "III", title: "The Basement", mood: "Clinical · destabilizing",
        knows: ["The pattern is off", "The house knows his name"],
        doesNotKnow: ["He is dead", "He is not in control"],
        reader: ["A third voice; most analytical"],
        author: ["Damon mistakes his death for a debugging problem"],
        motifs: ["static hum", "the loop"],
        warnings: ["Keep his control fantasy intact early"],
        fracture: false,
      },
      {
        chapter: "XIX", title: "The Pulse", mood: "Cracking · recognition near",
        knows: ["The loop is not his to fix"],
        doesNotKnow: ["How close the convergence is"],
        reader: ["The three voices are nearly one"],
        author: ["Pulse = the shared 6:17 heartbeat across POVs"],
        motifs: ["static hum", "6:17", "mirrored water"],
        warnings: ["Don't let Damon name the convergence"],
        fracture: true,
      },
    ],
  },
];

const VOICE = {
  metrics: [
    { k: "Sentence-length volatility", v: 0.82, note: "Short fragments cluster near traumatic memory." },
    { k: "Fragment frequency", v: 0.74, note: "Sentence fragments spike under bodily fear." },
    { k: "Sensory density", v: 0.88, note: "Detail arrives before explicit emotion." },
    { k: "Dialogue evasion", v: 0.79, note: "Characters rarely answer the question asked." },
    { k: "Abstract-noun tolerance", v: 0.31, note: "Abstraction kept low; objects carry feeling." },
    { k: "Metaphor pressure", v: 0.66, note: "Figurative load rises around the loop." },
    { k: "Time-marker repetition", v: 0.91, note: "6:17 behaves as structure, not decoration." },
    { k: "Interior vs. exterior", v: 0.58, note: "Slight tilt to interior, anchored by setting." },
  ] as VoiceMetric[],
  notes: [
    "Emotion usually arrives through objects, not statements.",
    "Animal presence (Arya) reduces abstraction.",
    "Repeated time markers create pressure before explanation.",
    "Metaphysical information should stay under-described.",
  ],
  risk: "Generic rewrite may over-explain emotional logic. Preserve omission.",
};

const DEMO_PASSAGE = `I lose count of how many times we've walked this road. Too many. More than there should be.
"Guess we're the ghosts this time, baby girl," I say to Arya. The storefronts blink like they've just noticed us. Their signs flicker with wrong words: KEEP CLOSING. A clearance sale, I tell myself. Just markdowns and tired neon. Not a message. Not prophecy. But even the glass echoes us now.`;

const REWRITE_OUTPUT = `I've stopped counting. The road keeps handing itself back, longer each time.
"Guess we're the ghosts this time, baby girl." Arya's ears fold. The storefronts catch us late, signs stuttering the same two words — KEEP CLOSING — and I make them mean a clearance sale, markdowns, tired neon. Not a message. The leash goes slack in my fist and I don't look down at it. The glass keeps our shapes a half-second too long.`;

const CONTEXT_RECEIPT = {
  preserve: [
    { k: "POV", v: "Jack — first person" },
    { k: "Timeline state", v: "Ch. VII · recurrence felt, death not recognized" },
    { k: "Reader knowledge", v: "Death not confirmed" },
    { k: "Active motifs", v: "leash slack · static hum · the loop" },
    { k: "Voice rule", v: "Sensory detail before interpretation" },
  ],
  forbidden: ["Do not explain the metaphysics", "Do not let Jack name the loop's rules"],
  hidden: ["Simultaneous death at 6:17", "Arya is already mostly gone"],
};

const KINDS: Record<string, string> = {
  Motif: C.oxide, Secret: C.violet, Contradiction: C.warn,
  Promise: "#8a8f5a", "Open loop": C.fog,
};

/* ---------- tiny ui atoms ---------- */
function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{
        font: `500 11px/1 ${mono}`, letterSpacing: ".08em", textTransform: "uppercase" as const,
        padding: "7px 12px", borderRadius: 2, cursor: "pointer",
        border: `1px solid ${active ? C.oxide : "rgba(245,240,232,.18)"}`,
        background: active ? "rgba(217,106,58,.14)" : "transparent",
        color: active ? C.oxide : C.fog, transition: "all .2s",
      }}>{children}</button>
  );
}

function Slip({ children, locked, style }: { children: React.ReactNode; locked?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "relative", background: "#1B1813",
      border: "1px solid rgba(245,240,232,.10)",
      borderLeft: locked ? `2px solid ${C.violet}` : "1px solid rgba(245,240,232,.10)",
      borderRadius: 3, padding: "14px 16px",
      boxShadow: "0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(245,240,232,.03)",
      ...style,
    }}>
      {locked && <span style={{ position: "absolute", top: 10, right: 12, font: `600 9px/1 ${mono}`, color: C.violet, letterSpacing: ".12em" }}>◆ AUTHOR-ONLY</span>}
      {children}
    </div>
  );
}

/* ============================================================ */
export default function ContinuityAtlas() {
  const [screen, setScreen] = useState<string>("landing");
  return (
    <div style={{
      minHeight: "100%", background: C.ink, color: C.bone,
      fontFamily: sans,
      backgroundImage:
        "radial-gradient(1200px 600px at 80% -10%, rgba(110,90,126,.10), transparent), radial-gradient(900px 500px at -10% 110%, rgba(217,106,58,.07), transparent)",
    }}>
      <style>{`
        .ca-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .ca-scroll::-webkit-scrollbar-thumb { background: rgba(245,240,232,.14); border-radius: 4px; }
        ::selection { background: rgba(217,106,58,.30); }
      `}</style>
      <Nav screen={screen} setScreen={setScreen} />
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px 96px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={screen}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>
            {screen === "landing" && <Landing go={setScreen} />}
            {screen === "import" && <ImportScreen go={setScreen} />}
            {screen === "memory" && <StoryMemory />}
            {screen === "drift" && <CharacterDrift />}
            {screen === "voice" && <VoiceFingerprint />}
            {screen === "rewrite" && <RewriteFlow />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer style={{ borderTop: "1px solid rgba(245,240,232,.08)", padding: "22px 28px", textAlign: "center", font: `400 11px/1.6 ${mono}`, color: "rgba(154,148,140,.6)", letterSpacing: ".06em" }}>
        CONTINUITY ATLAS — speculative prototype · sample manuscript "Liminal 6:17" · AI generation mocked
      </footer>
    </div>
  );
}

/* ---------- nav ---------- */
function Nav({ screen, setScreen }: { screen: string; setScreen: (s: string) => void }) {
  const tabs: [string, string][] = [
    ["landing", "Atlas"], ["import", "Import"], ["memory", "Story Memory"],
    ["drift", "Character Drift"], ["voice", "Voice Fingerprint"], ["rewrite", "Rewrite"],
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(20,18,15,.92)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(245,240,232,.08)",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "13px 28px", display: "flex", alignItems: "center", gap: 28 }}>
        <button onClick={() => setScreen("landing")} style={{ all: "unset" as const, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.oxide, boxShadow: `0 0 10px ${C.oxide}`, display: "inline-block" }} />
          <span style={{ font: `600 15px/1 ${serif}`, letterSpacing: ".01em" }}>Continuity&nbsp;Atlas</span>
        </button>
        <nav style={{ display: "flex", gap: 4, marginLeft: "auto", flexWrap: "wrap" as const }}>
          {tabs.slice(1).map(([id, label]) => (
            <button key={id} onClick={() => setScreen(id)}
              style={{
                all: "unset" as const, cursor: "pointer", padding: "6px 11px", borderRadius: 2,
                font: `500 11px/1 ${mono}`, letterSpacing: ".07em", textTransform: "uppercase" as const,
                color: screen === id ? C.bone : C.fog,
                borderBottom: `2px solid ${screen === id ? C.oxide : "transparent"}`,
                transition: "all .2s",
              }}>{label}</button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ---------- landing ---------- */
function Landing({ go }: { go: (s: string) => void }) {
  return (
    <div style={{ paddingTop: 64 }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ font: `500 12px/1 ${mono}`, letterSpacing: ".22em", color: C.oxide, textTransform: "uppercase" as const, marginBottom: 22 }}>
        Story memory that behaves like a living manuscript
      </motion.p>
      <h1 style={{ font: `400 clamp(38px,6vw,72px)/1.02 ${serif}`, color: C.bone, margin: 0, maxWidth: 880, letterSpacing: "-.01em" }}>
        See how a book <em style={{ color: C.oxide, fontStyle: "italic" }}>changes</em> before you ask the AI to touch it.
      </h1>
      <p style={{ maxWidth: 600, marginTop: 26, font: `400 17px/1.6 ${sans}`, color: "rgba(245,240,232,.78)" }}>
        Continuity Atlas tracks character evolution, voice consistency, motifs, and unresolved
        promises across a manuscript — so the writer can inspect what the AI thinks is true
        before generating, rewriting, or expanding anything.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" as const }}>
        <button onClick={() => go("memory")} style={btn(true)}>Open sample: Liminal 6:17 →</button>
        <button onClick={() => go("import")} style={btn(false)}>Import a manuscript</button>
      </div>

      <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14 }}>
        {([
          ["Story Memory", "Facts with a status — known, hidden, contradicted, paid off.", "memory"],
          ["Character Drift", "How a character's knowledge, fear, and voice move chapter to chapter.", "drift"],
          ["Voice Fingerprint", "What the system learned about the prose. Edit anything too clean.", "voice"],
          ["Context Receipt", "Inspect what the AI will use before it rewrites a line.", "rewrite"],
        ] as [string, string, string][]).map(([t, d, s], i) => (
          <motion.button key={t} onClick={() => go(s)}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
            style={{ all: "unset" as const, cursor: "pointer", display: "block" }}>
            <Slip style={{ height: "100%" }}>
              <div style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".14em", color: C.oxide, marginBottom: 10 }}>0{i + 1}</div>
              <div style={{ font: `500 19px/1.2 ${serif}`, marginBottom: 8 }}>{t}</div>
              <div style={{ font: `400 13px/1.5 ${sans}`, color: C.fog }}>{d}</div>
            </Slip>
          </motion.button>
        ))}
      </div>

      <p style={{ marginTop: 40, font: `400 13px/1.6 ${mono}`, color: "rgba(154,148,140,.7)", maxWidth: 640 }}>
        The anxiety this is built for: <span style={{ color: C.bone }}>"If I let AI help, will it remember
        what matters — or confidently sand the weirdness off my book?"</span>
      </p>
    </div>
  );
}

/* ---------- import ---------- */
function ImportScreen({ go }: { go: (s: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div style={{ paddingTop: 48, maxWidth: 720 }}>
      <ScreenHead kicker="Step 01" title="Bring in the mess."
        sub="Paste a chapter, upload a sample, or start from a rough outline. The Atlas extracts characters, motifs, open questions, and scene states without pretending your book is cleaner than it is." />
      <div style={{ display: "grid", gap: 14, marginTop: 30 }}>
        <Field label="Manuscript title" value="Liminal 6:17" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="POV structure" value="Multi-POV (Jack · Oren · Damon)" />
          <Field label="Form" value="Standalone novel" />
        </div>
        <div>
          <Lbl>Paste / upload</Lbl>
          <div style={{
            marginTop: 8, minHeight: 130, border: "1px dashed rgba(245,240,232,.18)", borderRadius: 3,
            padding: 16, font: `400 14px/1.6 ${serif}`, color: "rgba(245,240,232,.6)", background: "#1B1813",
          }}>
            {DEMO_PASSAGE}
          </div>
        </div>
      </div>
      <button disabled={busy} onClick={() => { setBusy(true); setTimeout(() => go("memory"), 1100); }}
        style={{ ...btn(true), marginTop: 24 }}>
        {busy ? "Reading the manuscript…" : "Build Atlas"}
      </button>
      {busy && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 18, font: `400 12px/1.8 ${mono}`, color: C.fog }}>
          {["extracting characters", "mapping motif recurrence", "scoring voice", "flagging contradictions"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.22 }}>
              <span style={{ color: C.oxide }}>✓</span> {s}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ---------- story memory ---------- */
function StoryMemory() {
  const [filter, setFilter] = useState<string>("All");
  const [revealAuthor, setRevealAuthor] = useState(false);
  const kinds = ["All", "Motif", "Secret", "Contradiction", "Promise"];
  const items = useMemo(
    () => STORY_MEMORY.filter(m => filter === "All" || m.kind === filter),
    [filter]);

  return (
    <div style={{ paddingTop: 48 }}>
      <ScreenHead kicker="Story Memory" title="The book remembers more than the outline does."
        sub="Each fact carries a status, who knows it, and a continuity risk. Review before using any of it in AI-assisted drafting." />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginTop: 24, alignItems: "center" }}>
        {kinds.map(k => <Chip key={k} active={filter === k} onClick={() => setFilter(k)}>{k}</Chip>)}
        <label style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", cursor: "pointer", font: `500 11px/1 ${mono}`, letterSpacing: ".06em", color: revealAuthor ? C.violet : C.fog }}>
          <input type="checkbox" checked={revealAuthor} onChange={e => setRevealAuthor(e.target.checked)} style={{ accentColor: C.violet }} />
          REVEAL AUTHOR-ONLY
        </label>
      </div>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
        {items.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Slip locked={m.authorOnly}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <span style={{ font: `500 9px/1 ${mono}`, letterSpacing: ".14em", color: KINDS[m.kind] || C.fog, textTransform: "uppercase" as const }}>{m.kind}</span>
                <span style={{ font: `400 10px/1 ${mono}`, color: C.fog }}>{m.first}–{m.last} · ×{m.count}</span>
              </div>
              <div style={{ font: `500 21px/1.1 ${serif}`, marginBottom: 12 }}>{m.label}</div>
              <Row k="Status" v={m.status} />
              <Row k="Linked" v={m.linked.join(" · ")} />
              <Row k="Reader knows" v={m.reader} />
              <Row k="Author knows" v={revealAuthor ? m.author : "•••••• hidden from AI output"} dim={!revealAuthor} violet={revealAuthor} />
              <Row k="Risk" v={m.risk} warn />
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(245,240,232,.08)", display: "flex", gap: 8 }}>
                {["Confirm", "Correct", "Hide from AI"].map(b => (
                  <button key={b} style={{
                    all: "unset" as const, cursor: "pointer", font: `500 10px/1 ${mono}`, letterSpacing: ".06em",
                    color: b === "Hide from AI" ? C.warn : C.fog, padding: "4px 0",
                  }}>{b}</button>
                ))}
              </div>
            </Slip>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- character drift ---------- */
function CharacterDrift() {
  const [charId, setCharId] = useState<string>("jack");
  const char = CHARACTERS.find(c => c.id === charId) ?? CHARACTERS[0];
  const [stateIdx, setStateIdx] = useState<number>(0);
  useEffect(() => setStateIdx(0), [charId]);
  const st = char.states[stateIdx];
  const [showAuthor, setShowAuthor] = useState(false);

  return (
    <div style={{ paddingTop: 48 }}>
      <ScreenHead kicker="Character Drift" title={`${char.name} is not one card.`}
        sub="Track how knowledge, voice, fear, and relationships change from chapter to chapter. Each node is a state, not a fact." />

      <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 22, marginTop: 26, alignItems: "start" }}>
        {/* character list */}
        <div style={{ display: "grid", gap: 8, position: "sticky", top: 70 }}>
          {CHARACTERS.map(c => (
            <button key={c.id} onClick={() => setCharId(c.id)}
              style={{
                all: "unset" as const, cursor: "pointer", padding: "11px 13px", borderRadius: 3,
                background: c.id === charId ? "rgba(217,106,58,.12)" : "#1B1813",
                border: `1px solid ${c.id === charId ? C.oxide : "rgba(245,240,232,.08)"}`,
                transition: "all .2s",
              }}>
              <div style={{ font: `500 16px/1.1 ${serif}`, color: c.id === charId ? C.bone : "rgba(245,240,232,.8)" }}>{c.name}</div>
              <div style={{ font: `400 9px/1.3 ${mono}`, letterSpacing: ".06em", color: C.fog, marginTop: 4 }}>{c.role}</div>
            </button>
          ))}
        </div>

        <div>
          {/* state timeline */}
          <div style={{ background: "#1B1813", border: "1px solid rgba(245,240,232,.08)", borderRadius: 3, padding: "20px 18px", marginBottom: 18 }}>
            <div style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".12em", color: C.fog, marginBottom: 18 }}>STATE TIMELINE</div>
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ position: "absolute", left: 8, right: 8, top: "50%", height: 1, background: "rgba(245,240,232,.14)" }} />
              {char.states.map((s, i) => (
                <button key={i} onClick={() => setStateIdx(i)} style={{ all: "unset" as const, cursor: "pointer", position: "relative", textAlign: "center" as const, flex: 1 }}>
                  <motion.div
                    animate={{ scale: i === stateIdx ? 1 : 0.8 }}
                    style={{
                      width: s.fracture ? 16 : 12, height: s.fracture ? 16 : 12, margin: "0 auto",
                      borderRadius: s.fracture ? 2 : "50%", transform: s.fracture ? "rotate(45deg)" : "none",
                      background: i === stateIdx ? C.oxide : (s.fracture ? C.warn : "#2a2620"),
                      border: `1px solid ${i === stateIdx ? C.oxide : (s.fracture ? C.warn : "rgba(245,240,232,.25)")}`,
                      boxShadow: i === stateIdx ? `0 0 12px ${C.oxide}` : "none",
                    }} />
                  {i === stateIdx && (
                    <motion.div layoutId="pulse" style={{ position: "absolute", top: -6, left: "50%", marginLeft: -14, width: 28, height: 28, borderRadius: "50%", border: `1px solid ${C.oxide}`, opacity: 0.4 }} />
                  )}
                  <div style={{ font: `500 11px/1.2 ${mono}`, marginTop: 12, color: i === stateIdx ? C.bone : C.fog }}>{s.chapter}</div>
                  <div style={{ font: `400 9px/1.2 ${sans}`, color: C.fog, marginTop: 2 }}>{s.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* invariant + state cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Slip>
              <div style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".12em", color: C.fog, marginBottom: 12 }}>CHARACTER INVARIANTS</div>
              <Row k="Surface goal" v={char.surfaceGoal} />
              <Row k="Hidden desire" v={char.hiddenDesire} />
              <Row k="Fear" v={char.fear} />
              <Row k="Lie believed" v={char.lie} warn />
              <div style={{ marginTop: 10 }}>
                <Lbl>Voice markers</Lbl>
                <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                  {char.voiceMarkers.map(v => (
                    <span key={v} style={{ font: `400 11px/1.3 ${sans}`, color: "rgba(245,240,232,.78)", padding: "4px 8px", background: "rgba(245,240,232,.05)", borderRadius: 2 }}>{v}</span>
                  ))}
                </div>
              </div>
            </Slip>

            <AnimatePresence mode="wait">
              <motion.div key={stateIdx} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.3 }}>
                <Slip style={{ borderTop: `2px solid ${st.fracture ? C.warn : C.oxide}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ font: `500 18px/1.1 ${serif}` }}>Ch. {st.chapter} — {st.title}</div>
                  </div>
                  <div style={{ font: `400 11px/1 ${mono}`, color: st.fracture ? C.warn : C.oxide, letterSpacing: ".06em", margin: "6px 0 14px" }}>{st.mood}{st.fracture ? "  · FRACTURE" : ""}</div>
                  <Row k="Knows" v={st.knows.join(" · ")} />
                  <Row k="Does NOT know" v={st.doesNotKnow.join(" · ")} warn />
                  <Row k="Reader knows" v={st.reader.join(" · ")} />
                  <Row k="Author-only" v={showAuthor ? st.author.join(" · ") : "•••••• hidden"} dim={!showAuthor} violet={showAuthor} />
                  <Row k="Active motifs" v={st.motifs.join(" · ")} />
                  <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(143,61,46,.12)", border: `1px solid rgba(143,61,46,.4)`, borderRadius: 2 }}>
                    <div style={{ font: `600 9px/1 ${mono}`, letterSpacing: ".12em", color: C.warn, marginBottom: 6 }}>⚠ CONTINUITY WARNINGS</div>
                    {st.warnings.map(w => <div key={w} style={{ font: `400 12px/1.5 ${sans}`, color: "rgba(245,240,232,.85)" }}>— {w}</div>)}
                  </div>
                  <button onClick={() => setShowAuthor(a => !a)} style={{ all: "unset" as const, cursor: "pointer", marginTop: 12, font: `500 10px/1 ${mono}`, letterSpacing: ".06em", color: C.violet }}>
                    {showAuthor ? "◆ hide author-only truth" : "◆ reveal author-only truth"}
                  </button>
                </Slip>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- voice fingerprint ---------- */
function VoiceFingerprint() {
  return (
    <div style={{ paddingTop: 48 }}>
      <ScreenHead kicker="Voice Fingerprint" title="Preserve the damage in the sentence."
        sub="Detected stylistic behaviors from the manuscript sample — not generic 'tone: dark, literary,' but design-relevant attributes the AI should treat as guardrails." />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18, marginTop: 26 }}>
        <Slip>
          <div style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".12em", color: C.fog, marginBottom: 18 }}>MEASURED TENDENCIES</div>
          <div style={{ display: "grid", gap: 14 }}>
            {VOICE.metrics.map((m, i) => (
              <div key={m.k}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ font: `500 12px/1.2 ${sans}` }}>{m.k}</span>
                  <span style={{ font: `500 11px/1 ${mono}`, color: C.oxide }}>{Math.round(m.v * 100)}</span>
                </div>
                <div style={{ height: 5, background: "rgba(245,240,232,.07)", borderRadius: 3, overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${m.v * 100}%` }} transition={{ delay: i * 0.06, duration: 0.7, ease: "easeOut" }}
                    style={{ height: "100%", background: `linear-gradient(90deg, ${C.violet}, ${C.oxide})` }} />
                </div>
                <div style={{ font: `400 11px/1.4 ${sans}`, color: C.fog, marginTop: 5 }}>{m.note}</div>
              </div>
            ))}
          </div>
        </Slip>

        <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <Slip>
            <div style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".12em", color: C.fog, marginBottom: 12 }}>STYLE NOTES</div>
            {VOICE.notes.map(n => (
              <div key={n} style={{ font: `400 13px/1.5 ${serif}`, color: "rgba(245,240,232,.85)", padding: "7px 0", borderBottom: "1px solid rgba(245,240,232,.06)" }}>{n}</div>
            ))}
          </Slip>
          <div style={{ padding: "14px 16px", background: "rgba(143,61,46,.12)", border: `1px solid rgba(143,61,46,.45)`, borderRadius: 3 }}>
            <div style={{ font: `600 9px/1 ${mono}`, letterSpacing: ".12em", color: C.warn, marginBottom: 8 }}>⚠ AI RISK</div>
            <div style={{ font: `400 14px/1.5 ${serif}`, color: C.bone }}>{VOICE.risk}</div>
          </div>
          <button style={btn(true)}>Use as revision guardrail</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- rewrite flow ---------- */
function RewriteFlow() {
  const [step, setStep] = useState<number>(0); // 0 receipt, 1 generating, 2 diff, 3 patch
  const [opts, setOpts] = useState<Record<string, boolean>>({
    "Preserve voice": true,
    "Intensify dread": true,
    "Add sensory detail": false,
    "Hide author spoilers": true,
  });
  const [patch, setPatch] = useState<string | null>(null);
  const toggle = (k: string) => setOpts(o => ({ ...o, [k]: !o[k] }));

  return (
    <div style={{ paddingTop: 48 }}>
      <ScreenHead kicker="Context Receipt" title="Revise without breaking the book."
        sub="Before the AI touches a passage, see exactly what context it will use — and what it's forbidden to do." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 26, alignItems: "start" }}>
        {/* passage */}
        <Slip>
          <div style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".12em", color: C.fog, marginBottom: 12 }}>SELECTED PASSAGE — Ch. VII · Jack</div>
          <div style={{ font: `400 15px/1.65 ${serif}`, color: C.bone, whiteSpace: "pre-wrap" as const }}>{DEMO_PASSAGE}</div>
        </Slip>

        {/* receipt / generation / diff */}
        <div>
          {step === 0 && (
            <Slip>
              <div style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".12em", color: C.oxide, marginBottom: 14 }}>BEFORE THE AI TOUCHES THIS, IT WILL PRESERVE</div>
              {CONTEXT_RECEIPT.preserve.map(p => <Row key={p.k} k={p.k} v={p.v} />)}
              <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(143,61,46,.12)", border: "1px solid rgba(143,61,46,.4)", borderRadius: 2 }}>
                <div style={{ font: `600 9px/1 ${mono}`, letterSpacing: ".12em", color: C.warn, marginBottom: 6 }}>FORBIDDEN MOVES</div>
                {CONTEXT_RECEIPT.forbidden.map(f => <div key={f} style={{ font: `400 12px/1.5 ${sans}`, color: "rgba(245,240,232,.85)" }}>— {f}</div>)}
              </div>
              <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(110,90,126,.12)", border: "1px solid rgba(110,90,126,.4)", borderRadius: 2 }}>
                <div style={{ font: `600 9px/1 ${mono}`, letterSpacing: ".12em", color: C.violet, marginBottom: 6 }}>◆ HIDDEN FROM OUTPUT</div>
                {CONTEXT_RECEIPT.hidden.map(f => <div key={f} style={{ font: `400 12px/1.5 ${sans}`, color: "rgba(245,240,232,.7)" }}>— {f}</div>)}
              </div>

              <div style={{ marginTop: 14 }}>
                <Lbl>Revision options</Lbl>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                  {Object.keys(opts).map(k => <Chip key={k} active={opts[k]} onClick={() => toggle(k)}>{k}</Chip>)}
                </div>
              </div>
              <button onClick={() => { setStep(1); setTimeout(() => setStep(2), 1300); }} style={{ ...btn(true), marginTop: 16, width: "100%", textAlign: "center" as const }}>
                Rewrite with this context
              </button>
            </Slip>
          )}

          {step === 1 && (
            <Slip style={{ minHeight: 220, display: "grid", placeItems: "center" }}>
              <div style={{ textAlign: "center" as const }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                  style={{ width: 26, height: 26, border: `2px solid rgba(245,240,232,.15)`, borderTopColor: C.oxide, borderRadius: "50%", margin: "0 auto 16px" }} />
                <div style={{ font: `400 13px/1.6 ${mono}`, color: C.fog }}>generating within constraints…</div>
              </div>
            </Slip>
          )}

          {step >= 2 && (
            <Slip style={{ borderTop: `2px solid ${C.oxide}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".12em", color: C.oxide }}>REWRITE · DIFF</span>
                <span style={{ font: `500 10px/1 ${mono}`, color: "#8a8f5a" }}>VOICE MATCH 0.91</span>
              </div>
              <div style={{ font: `400 15px/1.65 ${serif}`, color: C.bone, whiteSpace: "pre-wrap" as const }}>{REWRITE_OUTPUT}</div>
              <div style={{ marginTop: 14, display: "flex", gap: 8, font: `400 11px/1.5 ${mono}` }}>
                <span style={{ color: "#8a8f5a" }}>+ leash slack (motif kept)</span>
                <span style={{ color: C.warn }}>✓ metaphysics not explained</span>
              </div>
              {step === 2 && (
                <button onClick={() => setStep(3)} style={{ ...btn(true), marginTop: 16, width: "100%", textAlign: "center" as const }}>Accept rewrite →</button>
              )}
            </Slip>
          )}
        </div>
      </div>

      {/* memory patch dialog */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(10,9,7,.78)", display: "grid", placeItems: "center", zIndex: 60, padding: 24 }}>
            <motion.div initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }} style={{ maxWidth: 480, width: "100%" }}>
              <Slip>
                <div style={{ font: `500 20px/1.2 ${serif}`, marginBottom: 6 }}>Did the rewrite change the book?</div>
                <div style={{ font: `400 13px/1.5 ${sans}`, color: C.fog, marginBottom: 16 }}>Generated prose may alter the story's internal reality, not just the document.</div>
                {["No — prose only", "Character state changed", "Motif repeated", "Promise paid off", "Contradiction introduced", "Relationship shifted"].map(o => (
                  <button key={o} onClick={() => setPatch(o)} style={{
                    all: "unset" as const, cursor: "pointer", display: "block", width: "100%", padding: "10px 12px", marginBottom: 6, borderRadius: 2,
                    border: `1px solid ${patch === o ? C.oxide : "rgba(245,240,232,.12)"}`,
                    background: patch === o ? "rgba(217,106,58,.12)" : "transparent",
                    font: `400 13px/1.3 ${sans}`, color: patch === o ? C.bone : "rgba(245,240,232,.8)",
                  }}>{o}</button>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <button disabled={!patch} onClick={() => { setStep(0); setPatch(null); }} style={{ ...btn(true), opacity: patch ? 1 : 0.4 }}>Update Atlas</button>
                  <button onClick={() => { setStep(0); setPatch(null); }} style={btn(false)}>Cancel</button>
                </div>
              </Slip>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- shared bits ---------- */
function ScreenHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ font: `500 11px/1 ${mono}`, letterSpacing: ".18em", color: C.oxide, textTransform: "uppercase" as const, marginBottom: 14 }}>{kicker}</div>
      <h2 style={{ font: `400 clamp(26px,3.6vw,40px)/1.08 ${serif}`, color: C.bone, margin: 0, letterSpacing: "-.01em" }}>{title}</h2>
      {sub && <p style={{ marginTop: 14, font: `400 15px/1.6 ${sans}`, color: "rgba(245,240,232,.72)" }}>{sub}</p>}
    </div>
  );
}

function Row({ k, v, warn, dim, violet }: { k: string; v: string; warn?: boolean; dim?: boolean; violet?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 10, padding: "3px 0" }}>
      <span style={{ font: `500 10px/1.5 ${mono}`, letterSpacing: ".05em", color: warn ? C.warn : C.fog, textTransform: "uppercase" as const }}>{k}</span>
      <span style={{ font: `400 13px/1.5 ${sans}`, color: violet ? C.violet : dim ? "rgba(154,148,140,.55)" : "rgba(245,240,232,.9)", fontStyle: dim ? "italic" : "normal" as const }}>{v}</span>
    </div>
  );
}

const Lbl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ font: `500 10px/1 ${mono}`, letterSpacing: ".1em", color: C.fog, textTransform: "uppercase" as const }}>{children}</span>
);

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Lbl>{label}</Lbl>
      <div style={{ marginTop: 7, padding: "10px 12px", background: "#1B1813", border: "1px solid rgba(245,240,232,.12)", borderRadius: 3, font: `400 14px/1.3 ${sans}`, color: C.bone }}>{value}</div>
    </div>
  );
}

function btn(primary: boolean): React.CSSProperties {
  return {
    all: "unset" as const,
    cursor: "pointer",
    padding: "12px 20px",
    borderRadius: 3,
    font: `600 12px/1 ${mono}`,
    letterSpacing: ".06em",
    textTransform: "uppercase" as const,
    background: primary ? C.oxide : "transparent",
    color: primary ? C.ink : C.bone,
    border: `1px solid ${primary ? C.oxide : "rgba(245,240,232,.25)"}`,
    transition: "all .2s",
    textAlign: "center" as const,
  };
}

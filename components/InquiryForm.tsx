"use client";

import React, { useMemo, useState } from "react";
import styles from "./InquiryForm.module.css";

const PROJECT_TYPES = [
  "AI narrative tooling",
  "Publishing / author platform",
  "Editorial web system",
  "Systems & content architecture",
  "Prototype / discovery sprint",
  "Something else",
];

const BUDGETS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
  "Not sure yet",
];

const TIMELINES = [
  "Exploring",
  "Next 1–3 months",
  "3–6 months",
  "Flexible",
];

const EMAIL = "me@ryanpyles.com";

function composeEmail(f: {
  name: string;
  email: string;
  org: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}) {
  const subject = `Project inquiry — ${f.projectType || "General"}`;
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.org ? `Organization: ${f.org}` : null,
    `Project type: ${f.projectType || "—"}`,
    `Budget: ${f.budget || "—"}`,
    `Timeline: ${f.timeline || "—"}`,
    "",
    "Details:",
    f.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
  return { subject, body };
}

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid = name.trim() && emailValid && message.trim().length > 10;

  const composed = useMemo(
    () => composeEmail({ name, email, org, projectType, budget, timeline, message }),
    [name, email, org, projectType, budget, timeline, message]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      composed.subject
    )}&body=${encodeURIComponent(composed.body)}`;
    // Open the visitor's mail client with everything pre-filled.
    window.location.href = href;
    setSent(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${EMAIL}\nSubject: ${composed.subject}\n\n${composed.body}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked — the mailto path still works */
    }
  };

  if (sent) {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>Your draft is ready.</p>
        <p className={styles.doneBody}>
          Your email client should have opened with everything filled in — just
          hit send. If nothing opened, email me directly at{" "}
          <a href={`mailto:${EMAIL}`} className={styles.doneLink}>
            {EMAIL}
          </a>{" "}
          or copy the message below.
        </p>
        <div className={styles.doneActions}>
          <button type="button" className={styles.secondaryBtn} onClick={handleCopy}>
            {copied ? "Copied ✓" : "Copy the message"}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setSent(false)}
          >
            ← Edit the inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name *</span>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email *</span>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            aria-invalid={email.length > 0 && !emailValid}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>
          Organization <span className={styles.optional}>(optional)</span>
        </span>
        <input
          className={styles.input}
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          autoComplete="organization"
        />
      </label>

      <div className={styles.row3}>
        <label className={styles.field}>
          <span className={styles.label}>Project type</span>
          <select
            className={styles.select}
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">Select…</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Budget</span>
          <select
            className={styles.select}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Select…</option>
            {BUDGETS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Timeline</span>
          <select
            className={styles.select}
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          >
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>
          What are you trying to build? *
        </span>
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          placeholder="The problem, who it's for, and what success looks like. A paragraph is plenty."
          required
        />
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={!valid}>
          Start the conversation →
        </button>
        <span className={styles.privacy}>
          Opens your email app with the details filled in. No data is stored here.
        </span>
      </div>
    </form>
  );
}

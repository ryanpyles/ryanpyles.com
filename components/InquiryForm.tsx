"use client";

import React, { useMemo, useState } from "react";
import styles from "./InquiryForm.module.css";

export interface InquiryFormLabels {
  projectTypes: string[];
  budgets: string[];
  timelines: string[];
  select: string;
  name: string;
  email: string;
  organization: string;
  optional: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  messagePlaceholder: string;
  ready: string;
  /** {filled} and {total} are substituted. */
  progress: string;
  submit: string;
  privacy: string;
  doneTitle: string;
  /** {email} is substituted with a mailto link. */
  doneBody: string;
  copy: string;
  copied: string;
  editInquiry: string;
}

export const defaultInquiryLabels: InquiryFormLabels = {
  projectTypes: [
    "Continuity Atlas commission",
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
};

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

export default function InquiryForm({
  labels = defaultInquiryLabels,
}: {
  labels?: InquiryFormLabels;
}) {
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
  const requirements = [
    Boolean(name.trim()),
    emailValid,
    message.trim().length > 10,
  ];
  const filled = requirements.filter(Boolean).length;
  const valid = filled === requirements.length;

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
    const [beforeEmail, afterEmail] = labels.doneBody.split("{email}");
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>{labels.doneTitle}</p>
        <p className={styles.doneBody}>
          {beforeEmail}
          <a href={`mailto:${EMAIL}`} className={styles.doneLink}>
            {EMAIL}
          </a>
          {afterEmail}
        </p>
        <div className={styles.doneActions}>
          <button type="button" className={styles.secondaryBtn} onClick={handleCopy}>
            {copied ? labels.copied : labels.copy}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setSent(false)}
          >
            {labels.editInquiry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{labels.name}</span>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{labels.email}</span>
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
          {labels.organization}{" "}
          <span className={styles.optional}>{labels.optional}</span>
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
          <span className={styles.label}>{labels.projectType}</span>
          <select
            className={styles.select}
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">{labels.select}</option>
            {labels.projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{labels.budget}</span>
          <select
            className={styles.select}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">{labels.select}</option>
            {labels.budgets.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{labels.timeline}</span>
          <select
            className={styles.select}
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          >
            <option value="">{labels.select}</option>
            {labels.timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>{labels.message}</span>
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          placeholder={labels.messagePlaceholder}
          required
        />
      </label>

      <div className={styles.readiness}>
        <span className={styles.readinessTrack} aria-hidden="true">
          <span
            className={styles.readinessFill}
            style={{ width: `${(filled / requirements.length) * 100}%` }}
          />
        </span>
        <span
          className={`${styles.readinessLabel} ${valid ? styles.readinessReady : ""}`}
          role="status"
        >
          {valid
            ? labels.ready
            : labels.progress
                .replace("{filled}", String(filled))
                .replace("{total}", String(requirements.length))}
        </span>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={!valid}>
          {labels.submit}
        </button>
        <span className={styles.privacy}>{labels.privacy}</span>
      </div>
    </form>
  );
}

import { NextResponse } from "next/server";

/**
 * Contact-form endpoint. Emails the inquiry via Resend so nothing is lost to a
 * missing mail client. Configuration (Vercel env):
 *   - RESEND_API_KEY   (required) — https://resend.com/api-keys
 *   - INQUIRY_TO       (optional) — where inquiries land; default me@ryanpyles.com
 *   - INQUIRY_FROM     (optional) — a verified Resend sender on a domain you own;
 *                                   default "Ryan Pyles — ryanpyles.com <inquiries@ryanpyles.com>"
 *
 * When RESEND_API_KEY is absent, or Resend errors, this returns a non-2xx so
 * the client falls back to the mailto flow — the form always has a path.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Payload {
  name?: string;
  email?: string;
  org?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  /** Honeypot — real users never fill this. */
  company?: string;
  utm?: Record<string, string>;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value?: string): string {
  if (!value) return "";
  return `<tr><td style="padding:2px 12px 2px 0;color:#888;">${esc(label)}</td><td style="padding:2px 0;">${esc(value)}</td></tr>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client to use its mailto fallback.
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  // Honeypot: silently accept and drop obvious bots.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  if (!name || !EMAIL_RE.test(email) || message.length <= 10) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const projectType = (body.projectType ?? "").trim();
  const to = process.env.INQUIRY_TO || "me@ryanpyles.com";
  const from =
    process.env.INQUIRY_FROM ||
    "Ryan Pyles — ryanpyles.com <inquiries@ryanpyles.com>";

  const utmLines = body.utm
    ? Object.entries(body.utm).filter(([, v]) => v)
    : [];

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    body.org ? `Organization: ${body.org}` : null,
    `Project type: ${projectType || "—"}`,
    `Budget: ${body.budget || "—"}`,
    `Timeline: ${body.timeline || "—"}`,
    "",
    "Details:",
    message,
    utmLines.length ? "\nSource:" : null,
    ...utmLines.map(([k, v]) => `${k}: ${v}`),
  ]
    .filter((l) => l !== null)
    .join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;line-height:1.5;color:#111;">
      <p style="font-weight:600;">New project inquiry${projectType ? ` — ${esc(projectType)}` : ""}</p>
      <table style="border-collapse:collapse;">
        ${row("Name", name)}
        ${row("Email", email)}
        ${row("Organization", body.org)}
        ${row("Project type", projectType)}
        ${row("Budget", body.budget)}
        ${row("Timeline", body.timeline)}
        ${utmLines.map(([k, v]) => row(k, v)).join("")}
      </table>
      <p style="margin-top:16px;white-space:pre-wrap;">${esc(message)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Project inquiry — ${projectType || "General"}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
}

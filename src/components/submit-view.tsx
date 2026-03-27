"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import templateJson from "@/content/builder-launch-template.json";
import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

type SubmitFormState = {
  name: string;
  creator: string;
  creatorUrl: string;
  tagline: string;
  installCommand: string;
  href: string;
  released: string;
  notes: string;
};

const initialState: SubmitFormState = {
  name: "",
  creator: "",
  creatorUrl: "",
  tagline: "",
  installCommand: "",
  href: "",
  released: "New",
  notes: "",
};

export function SubmitView() {
  const [form, setForm] = useState<SubmitFormState>(initialState);
  const [submissionState, setSubmissionState] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [showJson, setShowJson] = useState(false);

  const jsonPayload = useMemo(() => {
    const payload = {
      ...templateJson,
      name: form.name || templateJson.name,
      creator: form.creator || templateJson.creator,
      creatorUrl: form.creatorUrl || templateJson.creatorUrl,
      tagline: form.tagline || templateJson.tagline,
      installCommand: form.installCommand || templateJson.installCommand,
      href: form.href || templateJson.href,
      released: form.released || templateJson.released,
    };
    return JSON.stringify(payload, null, 2);
  }, [form]);

  const issueUrl = useMemo(() => {
    const title = form.name ? `Add builder launch: ${form.name}` : "Add builder launch";
    const body = [
      "## Builder launch submission",
      "",
      form.notes ? `Notes: ${form.notes}` : "Notes: n/a",
      "",
      "```json",
      jsonPayload,
      "```",
    ].join("\n");
    const params = new URLSearchParams({ title, body, labels: "launch-submission" });
    return `${siteConfig.links.github}/issues/new?${params.toString()}`;
  }, [form.name, form.notes, jsonPayload]);

  function update<K extends keyof SubmitFormState>(key: K, value: SubmitFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveSubmission() {
    setSubmissionState("saving");
    setSubmissionMessage("");
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setSubmissionState("error");
        setSubmissionMessage(data.error || "Could not save. Try again or use the GitHub issue link.");
        return;
      }
      setSubmissionState("success");
      setSubmissionMessage("Saved. We’ll review it shortly.");
    } catch {
      setSubmissionState("error");
      setSubmissionMessage("Network error. Try again or open a GitHub issue instead.");
    }
  }

  const inputCls =
    "h-11 w-full rounded-xl border border-white/12 bg-white/[0.05] px-3.5 text-white/96 outline-none placeholder:text-white/44 transition-colors focus:border-white/18 focus:bg-white/[0.07]";

  const canSubmit = form.name.trim() && form.href.trim();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-white/50">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>
          <span className="text-white/52">submit</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Submit</div>
            <h1 className="ui-title-lg max-w-3xl">
              Add a CLI to the directory.
            </h1>
            <p className="ui-body max-w-2xl">
              If a useful CLI is missing, send the basics here. Keep it short and factual — name, link, install command, and why it matters.
            </p>
          </div>

          <div className="ui-panel rounded-[20px] p-4 sm:p-5">
            <div className="ui-label">What helps most</div>
            <ul className="mt-3 space-y-2.5 text-sm leading-6 text-white/64">
              <li>• A working project or docs link</li>
              <li>• A real install command</li>
              <li>• A one-line explanation of what the tool is good at</li>
              <li>• Notes only if they add something useful</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="ui-panel rounded-[22px] p-5 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="CLI name *">
                <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. summarize" className={inputCls} />
              </Field>
              <Field label="Project link *">
                <input value={form.href} onChange={(event) => update("href", event.target.value)} placeholder="https://github.com/owner/repo" className={inputCls} />
              </Field>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="One-line description">
                <input value={form.tagline} onChange={(event) => update("tagline", event.target.value)} placeholder="What does it do in one sentence?" className={inputCls} />
              </Field>
              <Field label="Install command">
                <input value={form.installCommand} onChange={(event) => update("installCommand", event.target.value)} placeholder="npm i -g my-tool" className={inputCls} />
              </Field>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Creator">
                <input value={form.creator} onChange={(event) => update("creator", event.target.value)} placeholder="Name or handle" className={inputCls} />
              </Field>
              <Field label="Creator link">
                <input value={form.creatorUrl} onChange={(event) => update("creatorUrl", event.target.value)} placeholder="https://…" className={inputCls} />
              </Field>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Release status">
                <select value={form.released} onChange={(event) => update("released", event.target.value)} className={inputCls}>
                  <option className="bg-[#050505]" value="New">New</option>
                  <option className="bg-[#050505]" value="Latest">Latest</option>
                  <option className="bg-[#050505]" value="Popular">Popular</option>
                </select>
              </Field>
              <Field label="Why should this be included?">
                <textarea
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Who is it for? What makes it worth listing?"
                  rows={3}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.05] px-3.5 py-3 text-white/96 outline-none placeholder:text-white/44 transition-colors focus:border-white/18 focus:bg-white/[0.07]"
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/8 pt-5">
              <button
                type="button"
                onClick={saveSubmission}
                disabled={!canSubmit || submissionState === "saving"}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-white/92 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submissionState === "saving" ? (
                  <><div className="spinner" style={{ borderTopColor: "#000" }} /> Saving…</>
                ) : submissionState === "success" ? (
                  <>
                    <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5"><path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Saved
                  </>
                ) : (
                  "Submit for review"
                )}
              </button>

              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/10 px-5 text-sm text-white/58 transition hover:border-white/18 hover:text-white"
              >
                Or open GitHub issue
                <svg className="h-3 w-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6" /></svg>
              </a>
            </div>

            {submissionMessage ? (
              <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                submissionState === "error"
                  ? "border-red-500/18 bg-red-500/8 text-red-400/82"
                  : "border-emerald-500/18 bg-emerald-500/8 text-emerald-400/82"
              }`}>
                {submissionMessage}
              </div>
            ) : null}
          </div>

          <aside className="space-y-5">
            <div className="ui-panel rounded-[20px] p-4 sm:p-5">
              <div className="ui-label">JSON preview</div>
              <button
                type="button"
                onClick={() => setShowJson(!showJson)}
                className="mt-3 inline-flex items-center gap-2 text-sm text-white/62 transition hover:text-white"
              >
                <svg className={`h-3 w-3 transition-transform ${showJson ? "rotate-90" : ""}`} fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>
                {showJson ? "Hide" : "Show"} payload
              </button>

              {showJson ? (
                <div className="ui-panel-soft mt-3 overflow-hidden rounded-xl">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/46">builder-launches.json</span>
                    <CopyButton compact value={jsonPayload} label="Copy JSON" />
                  </div>
                  <pre className="max-h-64 overflow-auto p-4 font-mono text-xs leading-6 text-white/74">{jsonPayload}</pre>
                </div>
              ) : null}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm">
      <span className="text-white/62">{label}</span>
      {children}
    </label>
  );
}

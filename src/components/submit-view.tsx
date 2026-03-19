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

    const params = new URLSearchParams({
      title,
      body,
      labels: "launch-submission",
    });

    return `${siteConfig.links.github}/issues/new?${params.toString()}`;
  }, [form.name, form.notes, jsonPayload]);

  function update<K extends keyof SubmitFormState>(key: K, value: SubmitFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveSubmission() {
    setSubmissionState("saving");
    setSubmissionMessage("Saving submission...");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setSubmissionState("error");
        setSubmissionMessage(data.error || "Could not save submission.");
        return;
      }

      setSubmissionState("success");
      setSubmissionMessage("Saved. You can review it in /admin.");
    } catch {
      setSubmissionState("error");
      setSubmissionMessage("Could not save submission.");
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12">
          <div className="space-y-4">
            <div className="section-kicker">Submit a CLI launch</div>
            <h1 className="max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
              Share a new tool from a builder you think should be featured.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/54">
              Fill out the basics, copy the JSON, or open a prefilled GitHub issue. This keeps the workflow
              simple while the site is still curated by hand.
            </p>
          </div>

          <div className="panel-texture rounded-[20px] border border-white/8 p-4">
            <div className="section-kicker">Current content workflow</div>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-white/50">
              <li>
                1. New launches live in <code className="font-mono text-white/68">src/content/builder-launches.json</code>.
              </li>
              <li>
                2. Use <code className="font-mono text-white/68">src/content/builder-launch-template.json</code> as the schema.
              </li>
              <li>3. Submit via GitHub issue now, or open a PR later when you want direct content edits.</li>
            </ol>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-white/60">
                <span>CLI name</span>
                <input
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="summarize"
                  className="h-11 w-full border-b border-white/12 bg-transparent px-0 text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
                />
              </label>
              <label className="space-y-2 text-sm text-white/60">
                <span>Release label</span>
                <select
                  value={form.released}
                  onChange={(event) => update("released", event.target.value)}
                  className="h-11 w-full border-b border-white/12 bg-transparent px-0 text-white outline-none focus:border-[var(--accent-lilac)]"
                >
                  <option className="bg-[#08090b]" value="New">New</option>
                  <option className="bg-[#08090b]" value="Latest">Latest</option>
                  <option className="bg-[#08090b]" value="Popular">Popular</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-white/60">
                <span>Creator</span>
                <input
                  value={form.creator}
                  onChange={(event) => update("creator", event.target.value)}
                  placeholder="Peter Steinberger"
                  className="h-11 w-full border-b border-white/12 bg-transparent px-0 text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
                />
              </label>
              <label className="space-y-2 text-sm text-white/60">
                <span>Creator link</span>
                <input
                  value={form.creatorUrl}
                  onChange={(event) => update("creatorUrl", event.target.value)}
                  placeholder="https://github.com/steipete"
                  className="h-11 w-full border-b border-white/12 bg-transparent px-0 text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-white/60">
              <span>One-line description</span>
              <input
                value={form.tagline}
                onChange={(event) => update("tagline", event.target.value)}
                placeholder="Summarize links, files, and long-form content from the terminal."
                className="h-11 w-full border-b border-white/12 bg-transparent px-0 text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-white/60">
                <span>Install command</span>
                <input
                  value={form.installCommand}
                  onChange={(event) => update("installCommand", event.target.value)}
                  placeholder="npm i -g @steipete/summarize"
                  className="h-11 w-full border-b border-white/12 bg-transparent px-0 text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
                />
              </label>
              <label className="space-y-2 text-sm text-white/60">
                <span>Project link</span>
                <input
                  value={form.href}
                  onChange={(event) => update("href", event.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="h-11 w-full border-b border-white/12 bg-transparent px-0 text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-white/60">
              <span>Notes</span>
              <textarea
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Why is this worth featuring? Who is it for?"
                rows={4}
                className="w-full border border-white/10 bg-[#0b0c0e]/70 px-3 py-3 text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
              />
            </label>
          </div>

          <aside className="space-y-4">
            <div className="section-kicker">JSON preview</div>
            <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0b0c0e]/90">
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/42">builder-launches.json</div>
                <CopyButton compact value={jsonPayload} label="Copy JSON" />
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-white/72">{jsonPayload}</pre>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={saveSubmission}
                className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--accent-lilac)] bg-white/[0.03] px-4 text-sm text-white transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={submissionState === "saving"}
              >
                {submissionState === "saving" ? "Saving..." : "Save to admin queue"}
              </button>
              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-4 text-sm text-white/72 transition hover:border-white/18 hover:text-white"
              >
                Open GitHub issue
              </a>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-4 text-sm text-white/72 transition hover:border-white/18 hover:text-white"
              >
                Open repository
              </Link>
            </div>
            {submissionMessage ? (
              <div
                className={`text-sm ${submissionState === "error" ? "text-[var(--accent-rose)]" : "text-white/46"}`}
              >
                {submissionMessage}
              </div>
            ) : null}
          </aside>
        </section>
      </main>
    </>
  );
}

"use client";

import { useState } from "react";

export function AdminActions() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function runSync() {
    setState("loading");
    setMessage("Syncing launch metadata...");

    try {
      const response = await fetch("/api/sync-launches", {
        method: "POST",
      });
      const data = (await response.json()) as { ok: boolean; launches?: unknown[]; error?: string | null };

      if (!response.ok || !data.ok) {
        setState("error");
        setMessage(data.error || "Sync failed.");
        return;
      }

      setState("success");
      setMessage(`Synced ${data.launches?.length ?? 0} launches.`);
    } catch {
      setState("error");
      setMessage("Sync failed.");
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={runSync}
        className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--accent-lilac)] bg-white/[0.03] px-4 text-sm text-white transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "loading"}
      >
        {state === "loading" ? "Syncing..." : "Sync latest launch data"}
      </button>
      {message ? (
        <div
          className={`text-sm ${
            state === "error" ? "text-[var(--accent-rose)]" : "text-white/46"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}

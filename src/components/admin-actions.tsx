"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminActions() {
  const router = useRouter();
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

  async function signOut() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={runSync}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white transition hover:border-white/16 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={state === "loading"}
        >
          {state === "loading" ? "Syncing..." : "Sync latest launch data"}
        </button>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 px-4 text-sm text-white/72 transition hover:border-white/18 hover:text-white"
        >
          Sign out
        </button>
      </div>
      {message ? (
        <div
          className={`text-sm ${
            state === "error" ? "text-red-400/82" : "text-white/46"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}

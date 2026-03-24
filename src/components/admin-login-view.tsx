"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/site-header";

type AdminLoginViewProps = {
  nextPath: string;
};

export function AdminLoginView({ nextPath }: AdminLoginViewProps) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as { ok: boolean; error?: string };

    if (!response.ok || !data.ok) {
      setStatus("error");
      setMessage(data.error || "Could not sign in.");
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div>
            <div className="section-kicker">Admin login</div>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.05em] text-white">Sign in to Open CLI admin.</h1>
            <p className="mt-3 text-base leading-7 text-white/54">
              This page is for reviewing launch submissions, syncing data, and curating the builder feed.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="space-y-2 text-sm text-white/60">
              <span>Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 text-white outline-none focus:border-white/18 focus:bg-white/[0.03]"
              />
            </label>
            <label className="space-y-2 text-sm text-white/60">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 text-white outline-none focus:border-white/18 focus:bg-white/[0.03]"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white transition hover:border-white/16 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Signing in..." : "Sign in"}
            </button>
            {message ? <div className="text-sm text-red-400/82">{message}</div> : null}
          </form>
        </div>
      </main>
    </>
  );
}

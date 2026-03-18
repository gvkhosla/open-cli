"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label?: string;
  compact?: boolean;
};

export function CopyButton({ value, label = "Copy", compact = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/72 transition hover:border-white/18 hover:bg-white/[0.06] hover:text-white ${
        compact ? "h-9 px-3" : "h-10 px-4"
      }`}
      aria-label={`Copy ${label.toLowerCase()}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}

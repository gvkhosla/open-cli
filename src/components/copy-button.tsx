"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label?: string;
  compact?: boolean;
};

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.3">
      <rect x="5" y="5" width="9" height="9" rx="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
    <Button
      type="button"
      variant="outline"
      size={compact ? "sm" : "default"}
      onClick={onCopy}
      className={cn(
        "group/copy shrink-0 gap-1.5 rounded-lg border-white/10 bg-white/[0.03] text-white/64 shadow-none transition-all duration-200 hover:border-white/16 hover:bg-white/[0.05] hover:text-white",
        compact && "h-8 px-3",
        copied && "border-white/16 bg-white/[0.06] text-white hover:border-white/16 hover:text-white",
      )}
      aria-label={`Copy ${label.toLowerCase()}`}
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5" />
          Copied
        </>
      ) : (
        <>
          <CopyIcon className="h-3.5 w-3.5 transition-transform group-hover/copy:scale-110" />
          {label}
        </>
      )}
    </Button>
  );
}

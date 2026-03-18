"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <Button
      type="button"
      variant="outline"
      size={compact ? "sm" : "default"}
      onClick={onCopy}
      className={cn(
        "shrink-0 rounded-md border-white/10 bg-white/[0.03] text-white/68 shadow-none hover:border-[rgba(183,182,233,0.28)] hover:bg-white/[0.05] hover:text-white",
        compact && "h-8 px-3",
      )}
      aria-label={`Copy ${label.toLowerCase()}`}
    >
      {copied ? "Copied" : label}
    </Button>
  );
}

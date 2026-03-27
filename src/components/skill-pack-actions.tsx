"use client";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";

type SkillPackActionsProps = {
  skillMarkdown: string;
  fileName: string;
  agentsMarkdown?: string;
  harnessJson?: string;
  copyLabel?: string;
  downloadLabel?: string;
  showSecondary?: boolean;
};

export function SkillPackActions({
  skillMarkdown,
  fileName,
  agentsMarkdown,
  harnessJson,
  copyLabel = "Copy SKILL.md",
  downloadLabel = "Download SKILL.md",
  showSecondary = false,
}: SkillPackActionsProps) {
  function handleDownload() {
    const blob = new Blob([skillMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <CopyButton compact value={skillMarkdown} label={copyLabel} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="h-8 rounded-full border-white/10 bg-white/[0.03] px-3.5 text-white/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
      >
        {downloadLabel}
      </Button>

      {showSecondary && agentsMarkdown ? <CopyButton compact value={agentsMarkdown} label="Copy AGENTS.md block" /> : null}
      {showSecondary && harnessJson ? <CopyButton compact value={harnessJson} label="Copy harness JSON" /> : null}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";

type WorkflowPackActionsProps = {
  markdown: string;
  fileName: string;
  copyLabel?: string;
  downloadLabel?: string;
};

export function WorkflowPackActions({
  markdown,
  fileName,
  copyLabel = "Copy pack",
  downloadLabel = "Download pack",
}: WorkflowPackActionsProps) {
  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
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
      <CopyButton compact value={markdown} label={copyLabel} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="h-8 rounded-lg border-white/10 bg-white/[0.03] px-3 text-white/64 shadow-none hover:border-white/16 hover:bg-white/[0.05] hover:text-white"
      >
        {downloadLabel}
      </Button>
    </div>
  );
}

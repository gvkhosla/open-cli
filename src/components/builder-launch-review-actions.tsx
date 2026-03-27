"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { BuilderLaunchStatus } from "@/data/clis";

export function BuilderLaunchReviewActions({
  launchId,
  currentStatus,
}: {
  launchId: string;
  currentStatus: BuilderLaunchStatus;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<BuilderLaunchStatus | null>(null);

  async function updateStatus(status: BuilderLaunchStatus) {
    setLoading(status);

    try {
      const response = await fetch(`/api/builder-launches/${launchId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        setLoading(null);
        return;
      }

      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {currentStatus !== "approved" ? (
        <button
          type="button"
          onClick={() => updateStatus("approved")}
          disabled={loading !== null}
          className="inline-flex h-8 items-center rounded-full border border-white/10 bg-white/[0.05] px-3 text-xs text-white/72 transition hover:border-white/16 hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
        >
          {loading === "approved" ? "Approving…" : "Approve"}
        </button>
      ) : null}

      {currentStatus !== "rejected" ? (
        <button
          type="button"
          onClick={() => updateStatus("rejected")}
          disabled={loading !== null}
          className="inline-flex h-8 items-center rounded-full border border-white/10 px-3 text-xs text-white/56 transition hover:border-white/16 hover:text-white disabled:opacity-50"
        >
          {loading === "rejected" ? "Rejecting…" : "Reject"}
        </button>
      ) : null}

      {currentStatus !== "pending" ? (
        <button
          type="button"
          onClick={() => updateStatus("pending")}
          disabled={loading !== null}
          className="inline-flex h-8 items-center rounded-full border border-white/10 px-3 text-xs text-white/56 transition hover:border-white/16 hover:text-white disabled:opacity-50"
        >
          {loading === "pending" ? "Moving…" : "Move to pending"}
        </button>
      ) : null}
    </div>
  );
}

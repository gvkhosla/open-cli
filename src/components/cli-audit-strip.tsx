import { cn } from "@/lib/utils";
import type { CliAudit } from "@/lib/audits";

function AuditPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/46 transition-colors hover:bg-white/[0.04]">
      {label}
    </span>
  );
}

function AuditStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "good" | "warn";
}) {
  return (
    <div className="group rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.03]">
      <div className="text-[11px] uppercase tracking-[0.16em] text-white/28">{label}</div>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full",
            tone === "good" && "bg-white/52",
            tone === "warn" && "bg-white/32",
            tone === "default" && "bg-white/20",
          )}
        />
        <span
          className={cn(
            "text-sm font-medium",
            tone === "good" && "text-white/82",
            tone === "warn" && "text-white/56",
            tone === "default" && "text-white/70",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function titleCase(value: string) {
  return value.replace(/-/g, " ");
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-white";
  if (score >= 60) return "text-white/82";
  return "text-white/58";
}

function getScoreRing(score: number) {
  if (score >= 80) return "border-white/18";
  if (score >= 60) return "border-white/12";
  return "border-white/10";
}

export function CliAuditStrip({ audit }: { audit: CliAudit }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 bg-white/[0.02]",
              getScoreRing(audit.score),
            )}
          >
            <span className={cn("text-xl font-semibold tabular-nums", getScoreColor(audit.score))}>
              {audit.score}
            </span>
          </div>
          <div>
            <div className="section-kicker">Audit Score</div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/50 capitalize">{titleCase(audit.tier)}</span>
              <span className="text-[10px] text-white/22">·</span>
              <span className="text-xs text-white/28">Metadata quality</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {audit.badges.map((badge) => (
            <AuditPill key={badge} label={badge} />
          ))}
        </div>
      </div>

      <div className="stagger-children mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AuditStat label="Install" value={audit.installability.status} tone={audit.installability.status === "ready" ? "good" : "default"} />
        <AuditStat label="Source" value={audit.sourceTrust.level} tone={audit.sourceTrust.level === "high" ? "good" : "default"} />
        <AuditStat label="Automation" value={audit.automation.level} tone={audit.automation.level === "good" ? "good" : "default"} />
        <AuditStat label="Risk" value={audit.risk.level} tone={audit.risk.level === "high" ? "warn" : "default"} />
      </div>
    </section>
  );
}

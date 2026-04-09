type SuperchargeAgentProps = {
  stats: {
    total: number;
    official: number;
    builders: number;
  };
};

export function SuperchargeAgent({ stats }: SuperchargeAgentProps) {
  return (
    <section className="ui-panel relative overflow-hidden rounded-[34px] px-6 py-8 shadow-[0_20px_48px_rgba(0,0,0,0.16)] sm:px-8 sm:py-10">
      <div className="hero-shimmer pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%)]" />
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="section-kicker">Open CLI</div>
          <span className="rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/42">
            Live directory
          </span>
        </div>

        <div className="max-w-[52rem] space-y-3">
          <h1 className="ui-title-xl max-w-[13ch] tracking-[-0.075em]">
            Choose the right CLI faster.
          </h1>
          <p className="max-w-[38rem] text-sm leading-6 text-white/46 sm:text-[15px]">
            Search by task or jump straight to a known tool.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <HeroStat label="Tools indexed" value={String(stats.total)} />
          <HeroStat label="Official platforms" value={String(stats.official)} />
          <HeroStat label="Builder-made" value={String(stats.builders)} />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/34">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{value}</div>
    </div>
  );
}

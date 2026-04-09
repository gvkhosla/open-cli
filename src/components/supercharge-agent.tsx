type SuperchargeAgentProps = {
  stats: {
    total: number;
    official: number;
    builders: number;
  };
};

export function SuperchargeAgent({ stats }: SuperchargeAgentProps) {
  return (
    <section className="ui-panel overflow-hidden rounded-[32px] border-white/10 bg-[#0d141c] px-6 py-8 shadow-[0_24px_64px_rgba(0,0,0,0.24)] sm:px-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-end">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="section-kicker">Open CLI</div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/56">
              Directory
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="ui-title-xl max-w-[11ch] text-white">
              Find the right CLI without the guesswork.
            </h1>
            <p className="max-w-[40rem] text-[15px] leading-7 text-white/78 sm:text-base">
              Search by task when you are exploring, or type a tool name when you already know what you want.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-sm text-white/72">
            <HeroChip>Task-based search</HeroChip>
            <HeroChip>Direct CLI lookup</HeroChip>
            <HeroChip>Safe first commands</HeroChip>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
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
    <div className="rounded-[24px] border border-white/10 bg-white/[0.035] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">{value}</div>
    </div>
  );
}

function HeroChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/72">
      {children}
    </span>
  );
}

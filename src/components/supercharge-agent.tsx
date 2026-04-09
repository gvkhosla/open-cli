type SuperchargeAgentProps = {
  stats: {
    total: number;
    official: number;
    builders: number;
  };
};

export function SuperchargeAgent({ stats }: SuperchargeAgentProps) {
  return (
    <section className="space-y-4">
      <div className="section-kicker">Open CLI</div>

      <div className="max-w-3xl space-y-3">
        <h1 className="text-[clamp(2.1rem,5vw,3.8rem)] font-semibold tracking-[-0.07em] text-white">
          Find the right CLI for the job.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-white/72">
          Search by task when you are exploring, or type the exact tool when you already know what you want.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/52">
        <span>{stats.total} tools</span>
        <span className="text-white/24">•</span>
        <span>{stats.official} official</span>
        <span className="text-white/24">•</span>
        <span>{stats.builders} builder-made</span>
      </div>
    </section>
  );
}

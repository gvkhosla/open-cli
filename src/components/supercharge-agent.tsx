export function SuperchargeAgent() {
  return (
    <section className="rounded-[24px] border border-white/8 bg-[#0b0d10]/88 px-6 py-7 sm:px-8 sm:py-8">
      <div className="max-w-3xl space-y-4">
        <div className="section-kicker">Open CLI</div>
        <div className="space-y-3">
          <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.02]">
            Find the right CLI, then run the first safe command.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-white/52 sm:text-base">
            Search by job, not tool name. Open CLI gives you a clear recommendation, a verify step, and a reusable workflow pack without turning the homepage into another catalog wall.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/48">
            Task-first recommendations
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/48">
            Install + verify commands
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/48">
            Workflow packs for agents
          </span>
        </div>
      </div>
    </section>
  );
}

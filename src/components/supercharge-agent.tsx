export function SuperchargeAgent() {
  return (
    <section className="ui-panel relative overflow-hidden rounded-[32px] px-6 py-10 shadow-[0_20px_48px_rgba(0,0,0,0.14)] sm:px-8 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_36%)]" />
      <div className="relative max-w-[46rem] space-y-5">
        <div className="section-kicker">Open CLI</div>
        <h1 className="ui-title-xl max-w-[12ch] tracking-[-0.075em]">
          Choose the right CLI for the job.
        </h1>
        <p className="ui-body max-w-[40rem] sm:text-[17px]">
          Describe the task in plain English. Open CLI recommends the best fit, explains the tradeoffs,
          and shows the first safe commands to run.
        </p>
      </div>
    </section>
  );
}

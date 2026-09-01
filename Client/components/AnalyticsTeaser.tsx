import Link from 'next/link';

const metrics = [
  ['Product discovery', '68%', '+7.2%'],
  ['Add-to-cart', '31%', '+4.8%'],
  ['Checkout completion', '74%', '+6.1%'],
  ['Repeat purchase', '27%', '+3.5%'],
];

export default function AnalyticsTeaser() {
  return (
    <section className="mx-auto my-12 w-[92%] max-w-[1280px] rounded-3xl bg-slate-950 p-6 text-white md:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Product intelligence</p>
          <h2 className="text-3xl font-bold md:text-4xl">Shopping decisions backed by measurable customer behavior.</h2>
          <p className="mt-4 text-slate-300">ShopSense connects the storefront with funnel, feature-adoption, search and experiment insights so product teams can find friction instead of guessing.</p>
        </div>
        <Link href="/analytics" className="w-fit rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300">Open analytics workspace →</Link>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value, delta]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <div className="mt-2 flex items-end justify-between"><span className="text-3xl font-bold">{value}</span><span className="text-sm font-medium text-emerald-300">{delta}</span></div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">Portfolio demo metrics are seeded for presentation; live event tracking can be enabled with the included analytics migration.</p>
    </section>
  );
}

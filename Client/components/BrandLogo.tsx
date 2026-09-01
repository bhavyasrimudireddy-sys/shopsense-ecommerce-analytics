import Link from 'next/link';

export default function BrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="ShopSense home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-lg font-bold text-white">S</span>
      <span className="text-2xl font-bold tracking-tight text-slate-950">Shop<span className="text-emerald-600">Sense</span></span>
    </Link>
  );
}

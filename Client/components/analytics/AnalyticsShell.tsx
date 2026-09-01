import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

const nav=[
  ['Overview','/analytics'],['Funnels','/analytics/funnel'],['Journeys','/analytics/journeys'],['Search','/analytics/search'],['Adoption','/analytics/adoption'],['Cohorts','/analytics/cohorts'],['Experiments','/analytics/experiments'],['Products','/analytics/products']
];

export default function AnalyticsShell({children}:{children:React.ReactNode}){
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4"><BrandLogo/><Link href="/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">← Storefront</Link></div>
    </header>
    <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[230px_1fr]">
      <aside className="border-r border-slate-200 bg-white p-4 lg:min-h-[calc(100vh-73px)]">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Product analytics</p>
        <nav className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">{nav.map(([name,href])=><Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800">{name}</Link>)}</nav>
      </aside>
      <main className="min-w-0 p-5 md:p-8">{children}</main>
    </div>
  </div>
}

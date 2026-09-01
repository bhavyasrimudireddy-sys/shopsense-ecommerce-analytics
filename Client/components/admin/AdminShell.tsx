import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

const links = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Products', href: '/admin/products' },
  { name: 'Add Product', href: '/admin/products/new' },
  { name: 'Analytics', href: '/analytics' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-4">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 sm:inline">Admin demo</span>
          </div>
          <Link href="/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">← Storefront</Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-4 lg:min-h-[calc(100vh-73px)]">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Catalog management</p>
          <nav className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-6 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
            Portfolio note: this local admin workspace focuses on catalog CRUD, not enterprise role/permission administration.
          </div>
        </aside>
        <main className="min-w-0 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

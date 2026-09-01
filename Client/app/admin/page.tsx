import Link from 'next/link';
import { adminSummaryHandler } from '@/app/api/admin';

export default async function AdminPage() {
  const response = await adminSummaryHandler();
  const data = response.status === 200 ? response.data : { products: 0, categories: 0, units: 0, lowStock: 0 };
  const cards = [
    ['Products', data.products, 'Products currently available in the catalog'],
    ['Categories', data.categories, 'Merchandising categories available to assign'],
    ['Inventory units', data.units, 'Total units across all product records'],
    ['Low stock', data.lowStock, 'Products with five or fewer units remaining'],
  ];
  return <>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">ShopSense operations</p><h1 className="mt-2 text-3xl font-bold">Admin Dashboard</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">A focused portfolio workspace for maintaining the product catalog while keeping the storefront and analytics journey demonstrable.</p></div>
      <Link href="/admin/products/new" className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-emerald-700">+ Add product</Link>
    </div>
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label,value,note]) => <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p><p className="mt-3 text-xs leading-5 text-slate-400">{note}</p></div>)}</div>
    <div className="mt-7 grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold">Catalog workflow</h2><div className="mt-5 space-y-4 text-sm text-slate-600"><p><strong className="text-slate-900">1. Add</strong> a product with category, pricing, inventory and image information.</p><p><strong className="text-slate-900">2. Review</strong> it directly on the storefront product page.</p><p><strong className="text-slate-900">3. Edit</strong> price, stock, merchandising flags or image details as needed.</p><p><strong className="text-slate-900">4. Analyze</strong> product discovery and conversion from the ShopSense analytics workspace.</p></div></div>
      <div className="rounded-2xl bg-emerald-950 p-6 text-emerald-50"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Portfolio scope</p><h2 className="mt-3 text-xl font-bold">Useful, not over-engineered</h2><p className="mt-3 text-sm leading-7 text-emerald-100">This admin panel intentionally demonstrates practical catalog operations without claiming enterprise-grade RBAC, audit logging or multi-merchant workflows. That keeps the project aligned with a Product Analyst portfolio.</p><div className="mt-5 flex gap-3"><Link href="/admin/products" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-950">Manage products</Link><Link href="/analytics" className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-bold">View analytics</Link></div></div>
    </div>
  </>;
}

import Link from 'next/link';
import ProductTable from '@/components/admin/ProductTable';
import { adminProductsHandler } from '@/app/api/admin';

export default async function ProductsAdminPage() {
  const response = await adminProductsHandler();
  const products = response.status === 200 ? response.data : [];
  return <>
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Inventory</p><h1 className="mt-2 text-3xl font-bold">Product Management</h1><p className="mt-2 text-sm text-slate-500">Search, review, edit or remove products from the ShopSense catalog.</p></div><Link href="/admin/products/new" className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-emerald-700">+ Add product</Link></div>
    {response.status !== 200 && <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{('message' in response && response.message) || 'Products could not be loaded.'}</p>}
    <ProductTable products={products} />
  </>;
}

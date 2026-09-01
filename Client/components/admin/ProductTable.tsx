'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAdminProduct } from '@/app/api/admin';

type Product = {
  productid: number;
  title: string;
  categoryname?: string;
  maincategory?: string;
  price: number | string;
  stock: number;
  imglink?: string;
  isnew?: boolean;
  issale?: boolean;
  isdiscount?: boolean;
};

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const filtered = products.filter((product) => `${product.title} ${product.categoryname || ''} ${product.maincategory || ''}`.toLowerCase().includes(query.toLowerCase()));

  async function remove(product: Product) {
    const confirmed = window.confirm(`Delete “${product.title}”? This removes the product and its related demo cart, review, deal and order-item references.`);
    if (!confirmed) return;
    setDeleting(product.productid);
    setMessage('');
    const result = await deleteAdminProduct(product.productid);
    setDeleting(null);
    if (result.status >= 200 && result.status < 300) {
      router.refresh();
    } else {
      setMessage(result.message || 'Unable to delete product.');
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 sm:max-w-sm" placeholder="Search products or categories…" />
        <p className="text-sm text-slate-500">{filtered.length} products</p>
      </div>
      {message && <p className="m-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{message}</p>}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="px-5 py-3">Product</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Price</th><th className="px-5 py-3">Stock</th><th className="px-5 py-3">Flags</th><th className="px-5 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((product) => (
              <tr key={product.productid} className="hover:bg-slate-50/70">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="h-14 w-14 overflow-hidden rounded-xl bg-slate-100">{product.imglink && <img src={product.imglink} alt="" className="h-full w-full object-contain" />}</div><div><p className="max-w-xs font-semibold text-slate-800">{product.title}</p><p className="text-xs text-slate-400">ID {product.productid}</p></div></div></td>
                <td className="px-5 py-4"><p className="font-medium">{product.categoryname || '—'}</p><p className="text-xs text-slate-400">{product.maincategory || ''}</p></td>
                <td className="px-5 py-4 font-semibold">${Number(product.price).toFixed(2)}</td>
                <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${product.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700'}`}>{product.stock}</span></td>
                <td className="px-5 py-4"><div className="flex flex-wrap gap-1">{product.isnew && <span className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-700">New</span>}{product.issale && <span className="rounded bg-rose-50 px-2 py-1 text-xs text-rose-700">Sale</span>}{product.isdiscount && <span className="rounded bg-violet-50 px-2 py-1 text-xs text-violet-700">Discount</span>}</div></td>
                <td className="px-5 py-4"><div className="flex justify-end gap-2"><Link href={`/product/${product.productid}`} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">View</Link><Link href={`/admin/products/${product.productid}/edit`} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100">Edit</Link><button disabled={deleting === product.productid} onClick={() => remove(product)} className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50">{deleting === product.productid ? 'Deleting…' : 'Delete'}</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No products match this search.</div>}
    </div>
  );
}

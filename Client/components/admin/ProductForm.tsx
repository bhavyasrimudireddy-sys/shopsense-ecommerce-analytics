'use client'

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAdminProduct, updateAdminProduct, type AdminProductPayload } from '@/app/api/admin';

type Category = { categoryid: number; name: string; maincategory?: string | null };
type Product = {
  productid?: number;
  title?: string;
  description?: string;
  categoryid?: number;
  price?: number | string;
  discount?: number | string;
  stock?: number;
  tags?: string;
  imglink?: string;
  imgalt?: string;
  issale?: boolean;
  isnew?: boolean;
  isdiscount?: boolean;
};

export default function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const router = useRouter();
  const editing = Boolean(product?.productid);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(product?.imglink || '');

  const grouped = useMemo(() => {
    return categories.reduce<Record<string, Category[]>>((acc, category) => {
      const key = category.maincategory || 'Other';
      (acc[key] ||= []).push(category);
      return acc;
    }, {});
  }, [categories]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const form = new FormData(e.currentTarget);
    const payload: AdminProductPayload = {
      title: String(form.get('title') || '').trim(),
      description: String(form.get('description') || '').trim(),
      categoryID: Number(form.get('categoryID')),
      price: Number(form.get('price')),
      discount: Number(form.get('discount') || 0),
      stock: Number(form.get('stock')),
      tags: String(form.get('tags') || '').trim(),
      imgLink: String(form.get('imgLink') || '').trim(),
      imgAlt: String(form.get('imgAlt') || '').trim(),
      isSale: form.get('isSale') === 'on',
      isNew: form.get('isNew') === 'on',
      isDiscount: form.get('isDiscount') === 'on',
    };

    const result = editing && product?.productid
      ? await updateAdminProduct(product.productid, payload)
      : await createAdminProduct(payload);

    setSaving(false);
    if (result.status >= 200 && result.status < 300) {
      router.push('/admin/products');
      router.refresh();
      return;
    }
    setMessage(result.message || 'Unable to save this product.');
  }

  const input = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100';
  const label = 'text-sm font-semibold text-slate-700';

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div>
          <h2 className="text-lg font-bold">Product information</h2>
          <p className="mt-1 text-sm text-slate-500">Keep the catalog data clear enough for shoppers and useful enough for product analysis.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <label className={label}>Product title
            <input className={input} name="title" required minLength={2} defaultValue={product?.title || ''} placeholder="e.g. Everyday Running Shoes" />
          </label>
          <label className={label}>Category
            <select className={input} name="categoryID" required defaultValue={product?.categoryid || ''}>
              <option value="" disabled>Select a category</option>
              {Object.entries(grouped).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((category) => <option key={category.categoryid} value={category.categoryid}>{category.name}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
        </div>
        <label className={label}>Description
          <textarea className={`${input} min-h-32 resize-y`} name="description" required minLength={2} defaultValue={product?.description || ''} placeholder="What should a shopper know about this product?" />
        </label>
        <div className="grid gap-5 md:grid-cols-3">
          <label className={label}>Selling price
            <input className={input} name="price" required type="number" step="0.01" min="0" defaultValue={product?.price ?? ''} placeholder="59.99" />
          </label>
          <label className={label}>Compare-at price
            <input className={input} name="discount" type="number" step="0.01" min="0" defaultValue={product?.discount ?? 0} placeholder="79.99" />
          </label>
          <label className={label}>Stock
            <input className={input} name="stock" required type="number" step="1" min="0" defaultValue={product?.stock ?? 0} />
          </label>
        </div>
        <label className={label}>Tags
          <input className={input} name="tags" defaultValue={product?.tags || ''} placeholder="running, shoes, everyday" />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className={label}>Primary image URL
            <input className={input} name="imgLink" required type="url" defaultValue={product?.imglink || ''} onChange={(e) => setImagePreview(e.target.value)} placeholder="https://.../product.jpg" />
          </label>
          <label className={label}>Image alt text
            <input className={input} name="imgAlt" required defaultValue={product?.imgalt || product?.title || ''} placeholder="Blue running shoe" />
          </label>
        </div>
        <div className="flex flex-wrap gap-5 rounded-xl bg-slate-50 p-4 text-sm">
          <label className="flex items-center gap-2 font-medium"><input type="checkbox" name="isNew" defaultChecked={product?.isnew} /> New arrival</label>
          <label className="flex items-center gap-2 font-medium"><input type="checkbox" name="isSale" defaultChecked={product?.issale} /> Sale</label>
          <label className="flex items-center gap-2 font-medium"><input type="checkbox" name="isDiscount" defaultChecked={product?.isdiscount} /> Discounted</label>
        </div>
        {message && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{message}</p>}
        <div className="flex flex-wrap gap-3">
          <button disabled={saving} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60" type="submit">
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Add product'}
          </button>
          <button type="button" onClick={() => router.push('/admin/products')} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
        </div>
      </section>
      <aside className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold">Image preview</p>
          <div className="mt-4 flex min-h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
            {imagePreview ? <img src={imagePreview} alt="Product preview" className="max-h-72 w-full object-contain" /> : <p className="px-5 text-center text-sm text-slate-400">Paste a public image URL to preview it here.</p>}
          </div>
        </div>
        <div className="rounded-2xl bg-emerald-950 p-5 text-sm leading-6 text-emerald-50">
          <p className="font-bold">Product Analyst angle</p>
          <p className="mt-2 text-emerald-100">After saving, storefront views and actions can feed ShopSense analytics such as product discovery, conversion and feature-adoption analysis.</p>
        </div>
      </aside>
    </form>
  );
}

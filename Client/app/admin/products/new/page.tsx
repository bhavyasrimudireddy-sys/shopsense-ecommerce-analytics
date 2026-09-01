import ProductForm from '@/components/admin/ProductForm';
import { adminCategoriesHandler } from '@/app/api/admin';

export default async function NewProductPage() {
  const response = await adminCategoriesHandler();
  const categories = response.status === 200 ? response.data : [];
  return <><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Catalog</p><h1 className="mt-2 text-3xl font-bold">Add Product</h1><p className="mt-2 text-sm text-slate-500">Create a new storefront product using the existing ShopSense PostgreSQL catalog.</p></div>{response.status !== 200 && <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">Categories could not be loaded. Make sure the backend is running.</p>}<ProductForm categories={categories} /></>;
}

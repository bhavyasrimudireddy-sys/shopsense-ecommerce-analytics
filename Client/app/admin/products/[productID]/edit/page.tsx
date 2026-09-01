import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { adminCategoriesHandler, adminProductHandler } from '@/app/api/admin';

export default async function EditProductPage({ params }: { params: Promise<{ productID: string }> }) {
  const { productID } = await params;
  const id = Number(productID);
  if (!Number.isInteger(id)) notFound();
  const [productResponse, categoryResponse] = await Promise.all([adminProductHandler(id), adminCategoriesHandler()]);
  if (productResponse.status === 404) notFound();
  const categories = categoryResponse.status === 200 ? categoryResponse.data : [];
  return <><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Catalog</p><h1 className="mt-2 text-3xl font-bold">Edit Product</h1><p className="mt-2 text-sm text-slate-500">Update storefront content, pricing, inventory, merchandising flags or the primary image.</p></div>{productResponse.status !== 200 ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">Unable to load this product.</p> : <ProductForm categories={categories} product={productResponse.data} />}</>;
}

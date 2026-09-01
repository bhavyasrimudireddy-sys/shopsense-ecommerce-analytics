'use server'

import backendClient from '@/Helpers/backendClient';

export type AdminProductPayload = {
  title: string;
  description: string;
  categoryID: number;
  price: number;
  discount: number;
  stock: number;
  tags: string;
  imgLink: string;
  imgAlt: string;
  isSale: boolean;
  isNew: boolean;
  isDiscount: boolean;
};

function normalizedError(error: any) {
  if (error?.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || error.response.data?.error || 'Request failed',
      data: error.response.data,
    };
  }
  return { status: 500, message: 'Unable to reach the ShopSense server' };
}

export async function adminSummaryHandler() {
  try {
    const response = await backendClient.get('/api/admin/summary');
    return { status: response.status, data: response.data.data };
  } catch (error: any) {
    return normalizedError(error);
  }
}

export async function adminCategoriesHandler() {
  try {
    const response = await backendClient.get('/api/admin/categories');
    return { status: response.status, data: response.data.data };
  } catch (error: any) {
    return normalizedError(error);
  }
}

export async function adminProductsHandler() {
  try {
    const response = await backendClient.get('/api/admin/products');
    return { status: response.status, data: response.data.data };
  } catch (error: any) {
    return normalizedError(error);
  }
}

export async function adminProductHandler(productID: number) {
  try {
    const response = await backendClient.get(`/api/admin/products/${productID}`);
    return { status: response.status, data: response.data.data };
  } catch (error: any) {
    return normalizedError(error);
  }
}

export async function createAdminProduct(payload: AdminProductPayload) {
  try {
    const response = await backendClient.post('/api/admin/products', payload);
    return { status: response.status, message: response.data.message, productID: response.data.productID };
  } catch (error: any) {
    return normalizedError(error);
  }
}

export async function updateAdminProduct(productID: number, payload: AdminProductPayload) {
  try {
    const response = await backendClient.put(`/api/admin/products/${productID}`, payload);
    return { status: response.status, message: response.data.message };
  } catch (error: any) {
    return normalizedError(error);
  }
}

export async function deleteAdminProduct(productID: number) {
  try {
    const response = await backendClient.delete(`/api/admin/products/${productID}`);
    return { status: response.status, message: response.data.message };
  } catch (error: any) {
    return normalizedError(error);
  }
}

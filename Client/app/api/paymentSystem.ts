'use server'
import backendClient from '../../Helpers/backendClient';

export async function checkoutProductDataHandler({productID,colorID,sizeID}:{productID:string,colorID:string,sizeID:string}) {
  try {
    const response = await backendClient.get(`/api/checkout/product-details/${productID}/${sizeID}/${colorID}`);
    return {status:response.status,data:response.data};
  } catch (error:any) {
    if (error.response) return {status:error.response.status,data:error.response.data};
    return {status:500,error:'Internal Server Error'};
  }
}

export async function createDemoOrderHandler({userid,productid,colorid,sizeid}:{userid:number,productid:string|string[],colorid:string|string[],sizeid:string|string[]}) {
  try {
    const response = await backendClient.post('/api/demo-checkout/create-order',{userid,productid,colorid,sizeid});
    return {status:response.status,data:response.data};
  } catch (error:any) {
    if (error.response) return {status:error.response.status,data:error.response.data};
    return {status:500,error:'Internal Server Error'};
  }
}

export async function checkoutCartProductDataHandler(userID:number) {
  try {
    const response = await backendClient.get(`/api/checkout-cart/product-details/${userID}`);
    return {status:response.status,data:response.data};
  } catch (error:any) {
    if (error.response) return {status:error.response.status,data:error.response.data};
    return {status:500,error:'Internal Server Error'};
  }
}

export async function createDemoCartOrderHandler(userID:number) {
  try {
    const response = await backendClient.post('/api/demo-checkout/cart-create-order',{userID});
    return {status:response.status,data:response.data};
  } catch (error:any) {
    if (error.response) return {status:error.response.status,data:error.response.data};
    return {status:500,error:'Internal Server Error'};
  }
}

export async function orderStatusDataHandler({orderID}:{orderID:string|string[]}) {
  try {
    const response = await backendClient.get(`/api/orders/status/${orderID}`);
    return {status:response.status,data:response.data};
  } catch (error:any) {
    if (error.response) return {status:error.response.status,data:error.response.data};
    return {status:500,error:'Internal Server Error'};
  }
}

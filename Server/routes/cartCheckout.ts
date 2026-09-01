import express, { Request, Response } from 'express';
import { client } from '../data/DB';
import { userIDSchema } from '../validators/cartCheckoutValidation';
import { validationResult,matchedData } from 'express-validator';
import { randomUUID } from 'crypto';
const router = express.Router();
function getDateTimeFiveDaysFromNow() {
  const today = new Date();
  const fiveDaysFromNow = new Date(today);
  fiveDaysFromNow.setDate(today.getDate() + 5);

  const year = fiveDaysFromNow.getFullYear();
  const month = String(fiveDaysFromNow.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const date = String(fiveDaysFromNow.getDate()).padStart(2, '0');
  const hours = String(fiveDaysFromNow.getHours()).padStart(2, '0');
  const minutes = String(fiveDaysFromNow.getMinutes()).padStart(2, '0');
  const seconds = String(fiveDaysFromNow.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const shippingcharge = 5;
async function fetchProductData(productid:string,colorid:string,sizeid:string,quantity:number){
  try {
    // Fetch product details
    const productQuery = `
      SELECT
        p.title,
        p.price,
        p.discount,
        ps.sizename,
        pc.colorname,
        pi.imglink,
        pi.imgalt
      FROM products p
      JOIN productSizes ps ON ps.productid = p.productid AND ps.sizeid = $2
      JOIN productcolors pc ON pc.productid = p.productid AND pc.colorid = $3
      JOIN productimages pi ON pi.productid = p.productid AND pi.isprimary = true
      WHERE p.productid = $1
    `;
    const productResult = await client.query(productQuery, [productid, sizeid, colorid]);

    if (productResult.rows.length === 0) {
      return []
    }

    const productDetails = productResult.rows[0];

    return {
      title: productDetails.title,
      price: productDetails.price,
      discount: productDetails.discount,
      sizename: productDetails.sizename,
      colorname: productDetails.colorname,
      imglink: productDetails.imglink,
      imgalt: productDetails.imgalt,
      shippingcost:10,
      quantity
    };
  } catch (error) {
    return error;
  }
}
router.get('/checkout-cart/product-details/:userID',userIDSchema, async (req:Request, res:Response) => {
  const result = validationResult(req);
  if(result.isEmpty()){
    const data = matchedData(req);
    const userID = data.userID;
    try {
      // Fetch product details
      const cartlistQuery = `SELECT productid,sizeid,colorid,quantity FROM cartitems WHERE userid = $1`;
      const cartItems = await client.query(cartlistQuery,[userID]);
      if(cartItems.rows.length===0){
        return res.status(404).json({ error: 'cart items not found' });
      }
      const productResult = await Promise.all(
          cartItems.rows.map(each => fetchProductData(each.productid, each.colorid, each.sizeid,each.quantity))
      );
  
      if (productResult.length === 0) {
        return res.status(404).json({ error: 'Product details not found' });
      }
      res.status(200).json({products:productResult});
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }else
  {
      res.status(500).json({ message: 'Validation error' });
  }
});
async function createCashOrder(userid:string,productid:string, colorid:string, sizeid:string,quantity:number){
  const orderid = randomUUID();
  const shippingid = randomUUID();
  const paymentid = randomUUID();
  const transactionid = `TS-${randomUUID()}`;
  const orderitemid = randomUUID();
  const trackingnumber = `IN-${orderid}`;
  const deliveryDate = getDateTimeFiveDaysFromNow();
  const paymentCharge = 0;
  try {
    // Check if product with given productid, colorid, and sizeid exists
    const productQuery = `
      SELECT p.discount
      FROM products p
      JOIN productcolors pc ON pc.productid = p.productid AND pc.colorid = $2
      JOIN productSizes ps ON ps.productid = p.productid AND ps.sizeid = $3
      WHERE p.productid = $1
    `;
    const productResult = await client.query(productQuery, [productid, colorid, sizeid]);

    if (productResult.rows.length === 0) {
      return 404;
    }
    const addressQuery = `
      SELECT addressid FROM addresses WHERE userid = $1 AND is_default = true
    `;
    const addressResult = await client.query(addressQuery, [userid]);

    if (addressResult.rows.length === 0) {
      return 404;
    }
    const addressid = addressResult.rows[0].addressid;
    const amount = productResult.rows[0].discount;
    const orderShipping = shippingcharge;
    const totalAmount = (orderShipping+paymentCharge+parseFloat(amount)*quantity).toFixed(2);

    const conn = await client.connect();
    try {
      await conn.query('BEGIN');

      await conn.query(
        `INSERT INTO orders (orderid, userid, totalamount, orderstatus, order_code) VALUES ($1, $2, $3, $4, $5)`,
        [orderid, userid, totalAmount, 'Confirmed', 'IN']
      );
      await conn.query(
        `INSERT INTO shipping (shippingid, orderid, addressid, shippingmethod, shippingcost, trackingnumber, deliveredat) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [shippingid, orderid, addressid, 'Express', orderShipping, trackingnumber, deliveryDate]
      );
      await conn.query(
        `INSERT INTO payments (paymentid, orderid, paymentmethod, paymentstatus, amount, transactionid, billingaddress) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [paymentid, orderid, 'Portfolio Demo', 'Not Applicable', parseFloat(amount)*quantity, transactionid, addressid]
      );
      await conn.query(
        `INSERT INTO orderitems (orderitemid, orderid, productid, quantity, shippingid, paymentid, colorid, sizeid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [orderitemid, orderid, productid, quantity, shippingid, paymentid, colorid, sizeid]
      );
      await conn.query(`UPDATE productparams SET sold = sold + 1 WHERE productid = $1`, [productid]);

      await conn.query('COMMIT');
      return 200;
    } catch (error) {
      await conn.query('ROLLBACK');
      return 500;
    } finally {
      conn.release();
    }
  } catch (error) {
    return 500;
  }
}
router.post('/demo-checkout/cart-create-order',userIDSchema, async (req:Request, res:Response) => {
  const result = validationResult(req);
  if(result.isEmpty()){
    const data = matchedData(req);
    const userID = data.userID;
    try {
      const cartlistQuery = `SELECT productid,sizeid,colorid,quantity FROM cartitems WHERE userid = $1`;
      const cartItems = await client.query(cartlistQuery,[userID]);
      if(cartItems.rows.length===0){
        return res.status(404).json({ error: 'cart items not found' });
      }
      
      const results = await Promise.all(cartItems.rows.map(each=>createCashOrder(userID,each.productid,each.colorid,each.sizeid,each.quantity)));
      if (results.some(r => r !== 200)) {
        return res.status(500).json({ error: 'One or more orders failed to create' });
      }
      res.status(200).json({message:'Successfully created orders'});
    } catch (error) {
      res.status(500).json({error:'Server Internal Server'});
    }
  }else
  {
      res.status(500).json({ message: 'Validation error' });
  }
});

export default router;
import express, { Request, Response } from 'express';
import { client } from '../data/DB';

const router = express.Router();

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

router.get('/admin/categories', async (_req: Request, res: Response) => {
  try {
    const result = await client.query(
      `SELECT categoryid, name, slug, maincategory
       FROM categories
       ORDER BY COALESCE(maincategory, ''), name`
    );
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error('Admin categories error:', error);
    return res.status(500).json({ message: 'Unable to load categories' });
  }
});

router.get('/admin/summary', async (_req: Request, res: Response) => {
  try {
    const [products, categories, stock] = await Promise.all([
      client.query(`SELECT COUNT(*)::int AS count FROM products`),
      client.query(`SELECT COUNT(*)::int AS count FROM categories`),
      client.query(`SELECT COALESCE(SUM(stock), 0)::int AS units,
                           COUNT(*) FILTER (WHERE stock <= 5)::int AS lowstock
                    FROM products`),
    ]);

    return res.status(200).json({
      data: {
        products: products.rows[0].count,
        categories: categories.rows[0].count,
        units: stock.rows[0].units,
        lowStock: stock.rows[0].lowstock,
      },
    });
  } catch (error) {
    console.error('Admin summary error:', error);
    return res.status(500).json({ message: 'Unable to load admin summary' });
  }
});

router.get('/admin/products', async (_req: Request, res: Response) => {
  try {
    const result = await client.query(
      `SELECT p.productid, p.title, p.description, p.categoryid, c.name AS categoryname,
              c.maincategory, p.price, p.discount, p.stock, p.tags, p.createdat, p.updatedat,
              pp.issale, pp.isnew, pp.isdiscount, pp.stars, pp.views, pp.sold, pp.rating,
              pi.imglink, pi.imgalt
       FROM products p
       LEFT JOIN categories c ON c.categoryid = p.categoryid
       LEFT JOIN productparams pp ON pp.productid = p.productid
       LEFT JOIN LATERAL (
         SELECT imglink, imgalt
         FROM productimages
         WHERE productid = p.productid
         ORDER BY isprimary DESC NULLS LAST, imageid ASC
         LIMIT 1
       ) pi ON true
       ORDER BY p.updatedat DESC NULLS LAST, p.productid DESC`
    );
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error('Admin products error:', error);
    return res.status(500).json({ message: 'Unable to load products' });
  }
});

router.get('/admin/products/:productID', async (req: Request, res: Response) => {
  const productID = Number(req.params.productID);
  if (!Number.isInteger(productID) || productID <= 0) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const result = await client.query(
      `SELECT p.productid, p.title, p.description, p.categoryid, c.name AS categoryname,
              c.maincategory, p.price, p.discount, p.stock, p.tags,
              pp.issale, pp.isnew, pp.isdiscount,
              pi.imglink, pi.imgalt
       FROM products p
       LEFT JOIN categories c ON c.categoryid = p.categoryid
       LEFT JOIN productparams pp ON pp.productid = p.productid
       LEFT JOIN LATERAL (
         SELECT imglink, imgalt
         FROM productimages
         WHERE productid = p.productid
         ORDER BY isprimary DESC NULLS LAST, imageid ASC
         LIMIT 1
       ) pi ON true
       WHERE p.productid = $1`,
      [productID]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error('Admin product detail error:', error);
    return res.status(500).json({ message: 'Unable to load product' });
  }
});

router.post('/admin/products', async (req: Request, res: Response) => {
  const {
    title, description, categoryID, price, discount, stock, tags,
    imgLink, imgAlt, isSale, isNew, isDiscount,
  } = req.body || {};

  if (!String(title || '').trim() || !String(description || '').trim() || !String(imgLink || '').trim()) {
    return res.status(400).json({ message: 'Title, description and image URL are required' });
  }

  const category = Number(categoryID);
  const productPrice = asNumber(price, -1);
  const comparePrice = asNumber(discount, 0);
  const productStock = asNumber(stock, -1);
  if (!Number.isInteger(category) || category <= 0 || productPrice < 0 || !Number.isInteger(productStock) || productStock < 0) {
    return res.status(400).json({ message: 'Please provide valid category, price and stock values' });
  }

  try {
    await client.query('BEGIN');
    const product = await client.query(
      `INSERT INTO products (title, description, categoryid, price, discount, stock, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING productid`,
      [String(title).trim(), String(description).trim(), category, productPrice, comparePrice, productStock, String(tags || '').trim()]
    );
    const productID = product.rows[0].productid;

    const image = await client.query(
      `INSERT INTO productimages (productid, imglink, imgalt, isprimary)
       VALUES ($1, $2, $3, true)
       RETURNING imageid`,
      [productID, String(imgLink).trim(), String(imgAlt || title).trim()]
    );

    await client.query(`UPDATE products SET imgid = $2 WHERE productid = $1`, [productID, String(image.rows[0].imageid)]);
    await client.query(
      `INSERT INTO productparams (productid, issale, isnew, isdiscount, stars, views, sold, rating)
       VALUES ($1, $2, $3, $4, 0, 0, 0, 0)`,
      [productID, asBoolean(isSale), asBoolean(isNew), asBoolean(isDiscount)]
    );
    await client.query('COMMIT');
    return res.status(201).json({ message: 'Product created successfully', productID });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Admin create product error:', error);
    return res.status(500).json({ message: 'Unable to create product' });
  }
});

router.put('/admin/products/:productID', async (req: Request, res: Response) => {
  const productID = Number(req.params.productID);
  if (!Number.isInteger(productID) || productID <= 0) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const {
    title, description, categoryID, price, discount, stock, tags,
    imgLink, imgAlt, isSale, isNew, isDiscount,
  } = req.body || {};

  const category = Number(categoryID);
  const productPrice = asNumber(price, -1);
  const comparePrice = asNumber(discount, 0);
  const productStock = asNumber(stock, -1);
  if (!String(title || '').trim() || !String(description || '').trim() || !String(imgLink || '').trim()) {
    return res.status(400).json({ message: 'Title, description and image URL are required' });
  }
  if (!Number.isInteger(category) || category <= 0 || productPrice < 0 || !Number.isInteger(productStock) || productStock < 0) {
    return res.status(400).json({ message: 'Please provide valid category, price and stock values' });
  }

  try {
    await client.query('BEGIN');
    const updated = await client.query(
      `UPDATE products
       SET title = $2, description = $3, categoryid = $4, price = $5, discount = $6,
           stock = $7, tags = $8, updatedat = CURRENT_TIMESTAMP
       WHERE productid = $1
       RETURNING productid`,
      [productID, String(title).trim(), String(description).trim(), category, productPrice, comparePrice, productStock, String(tags || '').trim()]
    );
    if (updated.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Product not found' });
    }

    await client.query(
      `INSERT INTO productparams (productid, issale, isnew, isdiscount, stars, views, sold, rating)
       VALUES ($1, $2, $3, $4, 0, 0, 0, 0)
       ON CONFLICT (productid)
       DO UPDATE SET issale = EXCLUDED.issale, isnew = EXCLUDED.isnew, isdiscount = EXCLUDED.isdiscount`,
      [productID, asBoolean(isSale), asBoolean(isNew), asBoolean(isDiscount)]
    );

    const primaryImage = await client.query(
      `SELECT imageid FROM productimages
       WHERE productid = $1
       ORDER BY isprimary DESC NULLS LAST, imageid ASC
       LIMIT 1`,
      [productID]
    );

    let imageID: number;
    if (primaryImage.rows.length > 0) {
      imageID = primaryImage.rows[0].imageid;
      await client.query(
        `UPDATE productimages SET imglink = $2, imgalt = $3, isprimary = true WHERE imageid = $1`,
        [imageID, String(imgLink).trim(), String(imgAlt || title).trim()]
      );
    } else {
      const image = await client.query(
        `INSERT INTO productimages (productid, imglink, imgalt, isprimary)
         VALUES ($1, $2, $3, true) RETURNING imageid`,
        [productID, String(imgLink).trim(), String(imgAlt || title).trim()]
      );
      imageID = image.rows[0].imageid;
    }
    await client.query(`UPDATE products SET imgid = $2 WHERE productid = $1`, [productID, String(imageID)]);

    await client.query('COMMIT');
    return res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Admin update product error:', error);
    return res.status(500).json({ message: 'Unable to update product' });
  }
});

router.delete('/admin/products/:productID', async (req: Request, res: Response) => {
  const productID = Number(req.params.productID);
  if (!Number.isInteger(productID) || productID <= 0) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    await client.query('BEGIN');
    const exists = await client.query(`SELECT productid FROM products WHERE productid = $1`, [productID]);
    if (exists.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Product not found' });
    }

    const childTables = ['cartitems', 'wishlistitems', 'reviews', 'deals', 'orderitems', 'productcolors', 'productsizes', 'productimages', 'productparams'];
    for (const table of childTables) {
      await client.query(`DELETE FROM ${table} WHERE productid = $1`, [productID]);
    }
    await client.query(`DELETE FROM products WHERE productid = $1`, [productID]);
    await client.query('COMMIT');
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Admin delete product error:', error);
    return res.status(500).json({ message: 'Unable to delete product' });
  }
});

export default router;

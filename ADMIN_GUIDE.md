# ShopSense Admin Guide

The ShopSense admin workspace is a **local portfolio catalog manager**. It is designed to make the e-commerce demo practical without adding unnecessary enterprise administration complexity.

## Open the dashboard

Start the Server and Client, then visit:

```text
http://localhost:3000/admin
```

## Add a product

Open **Admin → Add Product** or visit:

```text
http://localhost:3000/admin/products/new
```

Complete:

- Product title
- Existing ShopSense category
- Description
- Selling price
- Compare-at price (optional)
- Stock quantity
- Tags
- Public primary image URL
- Image alt text
- New / Sale / Discount flags

Select **Add product**. The item is written to PostgreSQL and becomes available to the storefront/catalog queries.

## Edit a product

Open **Admin → Products**, find the item, and select **Edit**. You can update catalog copy, category, pricing, inventory, tags, image information, and merchandising flags.

## Delete a product

Open **Admin → Products** and select **Delete**. ShopSense asks for confirmation before removing the product. For the local demo dataset, related cart, wishlist, review, deal, order-item, color, size, image, and parameter references for that product are removed as part of the same database transaction.

## Portfolio scope

This workspace deliberately does not claim production-grade RBAC, audit logs, approval workflows, or merchant permissions. Access is intended for local demonstration only. API calls are made through Next.js server actions using the shared `API_SECRET`; the secret is not entered into the browser form.

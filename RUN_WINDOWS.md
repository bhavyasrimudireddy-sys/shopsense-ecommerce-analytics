# Run ShopSense on Windows

## 1. Requirements

Install **Node.js**, **npm**, **Git**, and **PostgreSQL**.

Check:

```powershell
node --version
npm --version
psql --version
```

## 2. Database

If your existing `ecommerce` database already contains the ShopSense tables, do **not** create it again. Verify with:

```powershell
psql -U postgres -d ecommerce
```

Then:

```sql
\dt
\q
```

For a fresh setup, create `ecommerce` and restore the included custom-format dump:

```powershell
createdb -U postgres ecommerce
pg_restore -U postgres -d ecommerce --no-owner --no-privileges shopsense_seed.dump
```

Then install the analytics tables once:

```powershell
psql -U postgres -d ecommerce -f shopsense_analytics.sql
```

## 3. Server environment

Copy `Server/.env.example` to `Server/.env`. Set your real PostgreSQL password:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=YOUR_REAL_POSTGRES_PASSWORD
DB_NAME=ecommerce
PORT=3500
FRONTEND_SERVER_ORIGIN=http://localhost:3000
JWT_ENCRYPTION_KEY=ShopSenseJWT2026_ProductAnalytics
API_SECRET=ShopSenseAPI2026_ProductAnalytics
```

SMTP settings are optional unless you test email features.

## 4. Client environment

Copy `Client/.env.example` to `Client/.env`:

```env
BACKEND_URL=http://localhost:3500
API_SECRET=ShopSenseAPI2026_ProductAnalytics
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

**The API secret must match the Server value exactly.**

## 5. Install dependencies

Server:

```powershell
cd Server
npm install
```

Client:

```powershell
cd Client
npm install
```

## 6. Run

Terminal 1:

```powershell
cd Server
npm run dev
```

Expected:

```text
Connected to the database
[server]: Server is running at Port 3500
```

Terminal 2:

```powershell
cd Client
npm run dev
```

Open **http://localhost:3000**.

## 7. Portfolio demo checkout

Sign up/sign in with a demo account, add a default address, choose a product/cart, and use **Place Demo Order**. No Stripe, card number, Google OAuth, or real payment credentials are required.

## 8. Analytics

Open **http://localhost:3000/analytics** to review the product analytics workspace.

## 9. Admin product management

After both servers are running, open:

```text
http://localhost:3000/admin
```

Useful admin routes:

```text
http://localhost:3000/admin/products
http://localhost:3000/admin/products/new
```

To add a product, choose an existing category, enter the product details and use a public image URL. After saving, the item is stored in PostgreSQL and can be opened from the storefront. The edit page can change pricing, stock, category, image, tags, and New/Sale/Discount flags. Delete removes the product and its related demo references.

No separate admin password is required in this portfolio edition. The admin UI is intended for **local demonstration only** and uses the same server-side `API_SECRET` already configured between the Client and Server.

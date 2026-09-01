# ShopSense — Personalized E-commerce & Product Analytics Portfolio

ShopSense is a **portfolio e-commerce application tailored to Bhavyasri Mudireddy's Product Analyst profile**. It keeps a practical shopping journey while emphasizing the areas that matter for product analysis: discovery, search behavior, funnel conversion, feature adoption, customer journeys, experimentation, and product performance.

## Why this version exists

The project started from an MIT-licensed open-source e-commerce codebase and was substantially customized into a focused portfolio application. The original MIT copyright notice is preserved in `LICENSE`, as required by the license. Personal contact details and original maintainer branding have been removed from the application and documentation.

This portfolio edition intentionally **does not include live card/payment processing or Google OAuth**. Those integrations add setup and compliance complexity without materially improving a Product Analyst demonstration. Checkout remains functional in **Portfolio Demo Checkout** mode: a shopper can select products, use an address, place a demo order, and continue through confirmation/order tracking without sending real payment information.

## Product Analyst focus

- Product discovery and category journeys
- Search and filter behavior
- Funnel/conversion analysis
- Product and feature adoption
- Customer journey analysis
- Cohort/retention views
- A/B experiment concepts
- Product performance metrics
- Analytics event instrumentation

## Core storefront features

- Responsive storefront and category navigation
- Product search and filtering
- Product details and variants
- Wishlist and cart
- User registration/sign-in with email and password
- Address management
- Portfolio demo checkout and order confirmation
- Order history/tracking
- Product comparison
- Personalized-discovery concepts

## Analytics workspace

Visit `/analytics` after starting the app. The portfolio includes pages for funnel analysis, journeys, search analytics, feature adoption, cohorts, experiments, and product performance. Seeded metrics are demo data for presentation; they are not claimed as production results.

## Technology

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Redux Toolkit, Axios  
**Backend:** Node.js, Express, TypeScript, PostgreSQL, JWT/bcrypt, Nodemailer (optional)  
**Analytics:** ShopSense event vocabulary plus PostgreSQL analytics tables

## Local setup

See **`RUN_WINDOWS.md`** for the full Windows setup. In short:

1. Create/restore the PostgreSQL `ecommerce` database.
2. Run `shopsense_analytics.sql` once for analytics tables.
3. Copy `Server/.env.example` to `Server/.env` and add your PostgreSQL password.
4. Copy `Client/.env.example` to `Client/.env`.
5. Keep `API_SECRET` identical in both files.
6. Run `npm install` in `Server` and `Client`.
7. Start the backend with `npm run dev`.
8. Start the frontend with `npm run dev`.
9. Open `http://localhost:3000`.

## Demo checkout

The portfolio checkout **does not collect or process real payment information**. It creates demo orders in the existing order model so the complete customer journey remains testable. Use only test/demo user data.

## Important routes

- `/` — storefront
- `/analytics` — Product Analytics overview
- `/analytics/funnel` — conversion funnel
- `/analytics/journeys` — customer journey
- `/analytics/search` — search analytics
- `/analytics/adoption` — feature adoption
- `/analytics/cohorts` — cohort view
- `/analytics/experiments` — experiment view
- `/analytics/products` — product performance
- `/compare` — comparison experience

## Open-source attribution

This repository contains modified code derived from an MIT-licensed project. The original copyright and MIT permission notice remain in `LICENSE`. ShopSense branding, portfolio positioning, analytics work, UI changes, and simplifications are part of this customized portfolio edition.

## Portfolio positioning

A concise project story for interviews:

> I customized and extended an e-commerce application into ShopSense, a product analytics-focused commerce platform. I mapped shopping journeys, instrumented behavioral events, built funnel/search/adoption/cohort/experiment views, and simplified checkout to a safe demo flow so I could evaluate end-to-end product behavior without unnecessary production payment infrastructure.

## Admin catalog workspace

ShopSense now includes a lightweight local admin experience for portfolio demonstrations:

- `/admin` — catalog dashboard
- `/admin/products` — search/view/edit/delete products
- `/admin/products/new` — add a product
- `/admin/products/[productID]/edit` — edit a product

The admin workspace writes directly to the existing PostgreSQL catalog through protected server-side ShopSense API calls. Product creation supports title, description, category, selling price, compare-at price, inventory, tags, a primary image URL/alt text, and New/Sale/Discount merchandising flags.

This is intentionally a **portfolio admin demo**, not an enterprise administration system. It does not claim production RBAC, audit logs, approval workflows, or multi-merchant permissions.

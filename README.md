# ShopSense — E-commerce Product Analytics Platform

ShopSense is an e-commerce and product analytics project built to explore how customers discover products, move through the shopping journey, and make purchase decisions.

The project combines a functional e-commerce experience with a dedicated analytics workspace for analyzing areas such as conversion funnels, search behavior, customer journeys, feature adoption, cohorts, experiments, and product performance.

## About the Project

ShopSense started from an MIT-licensed open-source e-commerce project and was customized and extended into a Product Analyst portfolio project.

The goal was not just to build another online store. I wanted to create a realistic environment where I could explore product questions such as:

- Where are customers dropping off in the purchase funnel?
- How are customers discovering products?
- Which products and features are getting the most engagement?
- What search behavior could indicate gaps in the product catalog?
- How can customer journeys and cohorts help explain user behavior?
- How could A/B testing be used to evaluate product changes?

The original MIT copyright notice has been preserved in the `LICENSE` file.

## Product Analytics Focus

The analytics side of ShopSense focuses on:

- Conversion and funnel analysis
- Customer journey analysis
- Search and filter behavior
- Product and feature adoption
- Cohort and retention analysis
- A/B testing and experimentation
- Product performance
- Behavioral event tracking

These capabilities make it possible to look at the storefront not only from a customer perspective, but also from a Product Analyst perspective.

## Storefront Experience

The customer-facing application includes:

- Responsive e-commerce storefront
- Category-based product discovery
- Product search and filtering
- Product detail pages
- Product variants
- Wishlist
- Shopping cart
- Email/password registration and sign-in
- Address management
- Product comparison
- Demo checkout
- Order confirmation
- Order history and tracking
- Personalized discovery concepts

Together, these features create an end-to-end shopping journey that can also be analyzed through the analytics workspace.

## Product Analytics Workspace

The analytics workspace is available at:

`/analytics`

It includes dedicated views for:

- Funnel analysis
- Customer journeys
- Search analytics
- Feature adoption
- Cohort analysis
- Experiments
- Product performance

Some analytics metrics are seeded demo data created for portfolio demonstrations and should not be interpreted as real production results.

## Admin Product Management

ShopSense also includes a lightweight admin workspace for managing the product catalog.

### Admin routes

`/admin` — Admin dashboard

`/admin/products` — View, search, edit, and delete products

`/admin/products/new` — Add new products

`/admin/products/[productID]/edit` — Edit an existing product

The admin workspace connects to the PostgreSQL product catalog through protected server-side API calls.

Products can be managed using information such as:

- Product name and description
- Category
- Selling price
- Compare-at price
- Inventory
- Product tags
- Product image and alt text
- New, Sale, and Discount merchandising flags

The admin area is designed as a portfolio demonstration rather than a production enterprise administration system.

## Demo Checkout

ShopSense intentionally uses a demo checkout instead of processing real payments.

Customers can still go through the complete flow:

Product Discovery → Product Details → Cart → Address → Checkout → Order Confirmation

This keeps the customer journey realistic and testable without requiring real payment information.

Only test or demo user information should be used with the application.

## Technology Stack

**Frontend**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Axios

**Backend**
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT
- bcrypt
- Nodemailer (optional)

**Product Analytics**
- PostgreSQL analytics tables
- Behavioral event vocabulary
- Funnel analysis
- Search analytics
- Customer journey analysis
- Cohort analysis
- Experiment analysis
- Product performance metrics

## Running ShopSense Locally

For detailed Windows installation instructions, see:

`RUN_WINDOWS.md`

The basic setup is:

1. Create or restore the PostgreSQL `ecommerce` database.
2. Run `shopsense_analytics.sql` to create the analytics tables.
3. Copy `Server/.env.example` to `Server/.env`.
4. Add your local PostgreSQL credentials to the server environment file.
5. Copy `Client/.env.example` to `Client/.env`.
6. Make sure `API_SECRET` is the same in both environment files.
7. Run `npm install` inside the `Server` folder.
8. Run `npm install` inside the `Client` folder.
9. Start the backend using `npm run dev`.
10. Start the frontend using `npm run dev`.
11. Open `http://localhost:3000`.

Environment files containing local credentials are intentionally excluded from Git.

## Main Routes

| Route | Purpose |
|---|---|
| `/` | Storefront |
| `/analytics` | Product Analytics overview |
| `/analytics/funnel` | Conversion funnel |
| `/analytics/journeys` | Customer journey analysis |
| `/analytics/search` | Search analytics |
| `/analytics/adoption` | Feature adoption |
| `/analytics/cohorts` | Cohort analysis |
| `/analytics/experiments` | Experiment analysis |
| `/analytics/products` | Product performance |
| `/compare` | Product comparison |
| `/admin` | Admin dashboard |
| `/admin/products` | Product management |
| `/admin/products/new` | Add product |

## Why I Built ShopSense

I wanted this project to go beyond displaying products and completing a checkout.

The more interesting challenge was understanding what happens between those interactions.

ShopSense gave me a practical environment to think about questions a Product Analyst regularly works with: where users drop off, how customers discover products, which features they engage with, how search behavior affects conversion, and how experiments could be used to improve the experience.

By combining the storefront, PostgreSQL data, behavioral events, and analytics views in one project, I was able to connect the technical side of a digital product with the analytical side of product decision-making.

## How I Would Explain It in an Interview

> I worked on ShopSense as an e-commerce product analytics portfolio project. Instead of focusing only on the storefront, I used the shopping experience as a foundation for analyzing customer behavior. I mapped the customer journey from product discovery through checkout, worked with behavioral events and PostgreSQL data, and created views for funnel, search, feature adoption, cohort, experiment, and product performance analysis. I also added product comparison and catalog management capabilities so the project represents a more complete product ecosystem.

## Open-Source Attribution

ShopSense contains modified code derived from an MIT-licensed open-source project.

The original copyright and MIT permission notice are preserved in the `LICENSE` file. ShopSense branding, product analytics functionality, portfolio positioning, UI changes, admin capabilities, and other customizations were added as part of this portfolio version.
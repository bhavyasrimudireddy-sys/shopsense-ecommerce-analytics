import React from 'react'

const PrivacyPolicy = () => (
  <section className="mx-auto max-w-4xl px-6 py-16">
    <h1 className="text-4xl font-bold">Portfolio Privacy Notice</h1>
    <p className="mt-5 leading-7 text-slate-600">ShopSense is a local portfolio demo. Use test identities and sample addresses only. Do not enter payment information, government identifiers, confidential company data, or other sensitive personal information.</p>
    <div className="mt-8 space-y-6 text-slate-600">
      <p><strong className="text-slate-900">Local application data:</strong> demo account, cart, wishlist, address, order, and analytics-event information may be stored in the local PostgreSQL database used for the project.</p>
      <p><strong className="text-slate-900">Analytics:</strong> ShopSense includes product-event instrumentation for portfolio analysis. Seeded dashboard values are demonstration metrics and are not production customer data.</p>
      <p><strong className="text-slate-900">Credentials:</strong> keep `.env` files private and outside source control. The distributable project includes examples rather than real secrets.</p>
    </div>
  </section>
)
export default PrivacyPolicy

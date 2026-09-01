import React from 'react'

const TermsConditions = () => (
  <section className="mx-auto max-w-4xl px-6 py-16">
    <h1 className="text-4xl font-bold">Portfolio Demo Terms</h1>
    <p className="mt-5 leading-7 text-slate-600">ShopSense is provided for portfolio, interview, and learning demonstrations. It is not a production marketplace and does not offer real goods, payment processing, shipping commitments, warranties, or commercial customer support.</p>
    <div className="mt-8 space-y-5 text-slate-600">
      <p>Use the project with test data and local development credentials only.</p>
      <p>Portfolio Demo Checkout creates local order records but does not charge a card or transfer money.</p>
      <p>Product images and seeded catalog data are demonstration assets used to make the customer journey testable.</p>
      <p>The open-source attribution for the original MIT-licensed foundation remains in `LICENSE`.</p>
    </div>
  </section>
)
export default TermsConditions

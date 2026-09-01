import React from 'react'

const Contact = () => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">ShopSense Portfolio</p>
      <h1 className="mt-3 text-4xl font-bold text-slate-950">Contact & project notes</h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
        ShopSense is a portfolio demonstration rather than a live retail business. The contact experience is retained to demonstrate customer-support journey design, but there is no monitored commercial support inbox, physical storefront, or customer-service phone number attached to this demo.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Product feedback</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Use the local contact form with test data when demonstrating how feedback could enter a product-support workflow.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Privacy reminder</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Do not enter real payment credentials, sensitive personal data, or production secrets while testing this portfolio project.</p>
        </div>
      </div>
    </section>
  )
}

export default Contact

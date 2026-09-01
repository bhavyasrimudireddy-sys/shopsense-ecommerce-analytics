import React from 'react'

const RefundCancellation = () => (
  <section className="mx-auto max-w-4xl px-6 py-16">
    <h1 className="text-4xl font-bold">Demo Returns & Cancellation Policy</h1>
    <p className="mt-5 leading-7 text-slate-600">ShopSense is a portfolio application and does not sell or ship real products. This page demonstrates how a commerce product can communicate return and cancellation rules without representing a live retailer.</p>
    <div className="mt-8 space-y-6">
      <div><h2 className="text-xl font-semibold">Demo orders</h2><p className="mt-2 text-slate-600">Orders created locally are test records only. They may be cleared or reset as part of development and do not create financial obligations.</p></div>
      <div><h2 className="text-xl font-semibold">No real refunds</h2><p className="mt-2 text-slate-600">Because no real payment is collected, there is no banking, card, or refund transaction associated with Portfolio Demo Checkout.</p></div>
      <div><h2 className="text-xl font-semibold">Product-analysis purpose</h2><p className="mt-2 text-slate-600">The flow can be used to study cancellation intent, return-policy discoverability, support friction, and post-purchase journey design.</p></div>
    </div>
  </section>
)
export default RefundCancellation

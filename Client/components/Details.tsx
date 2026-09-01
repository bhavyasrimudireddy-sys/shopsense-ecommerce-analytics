"use client"
import Link from 'next/link'
import React from 'react'

const signals=[
  {title:'Discovery friction',value:'32%',text:'Modeled sessions that do not progress from listing to product detail.'},
  {title:'Feature adoption',value:'48%',text:'Modeled active sessions using filters to narrow product choice.'},
  {title:'Experiment lift',value:'+2.3pp',text:'Seeded CTA experiment difference shown in the analytics workspace.'}
];
export default function Details(){return <section className='mx-auto my-12 w-[92%] max-w-[1280px]'>
  <div className='grid gap-6 lg:grid-cols-[1.15fr_1fr]'>
    <div className='rounded-3xl bg-emerald-50 p-7 md:p-9'><p className='text-sm font-bold uppercase tracking-[.18em] text-emerald-700'>Product insight</p><h2 className='mt-3 text-3xl font-bold text-slate-950'>Treat every shopping interaction as a product signal.</h2><p className='mt-4 max-w-2xl leading-7 text-slate-600'>ShopSense is designed as more than a storefront. Search, product views, cart behavior, checkout progression and feature usage become inputs for product decisions and UX prioritization.</p><Link href='/analytics/journeys' className='mt-6 inline-block rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white'>Explore customer journeys →</Link></div>
    <div className='grid gap-3'>{signals.map(s=><div key={s.title} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'><div className='flex items-start justify-between gap-4'><div><p className='font-semibold text-slate-900'>{s.title}</p><p className='mt-1 text-sm leading-6 text-slate-500'>{s.text}</p></div><span className='text-2xl font-bold text-emerald-700'>{s.value}</span></div></div>)}</div>
  </div>
</section>}

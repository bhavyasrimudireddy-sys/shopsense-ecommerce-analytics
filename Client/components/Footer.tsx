import React from 'react'
import { footerSections } from '@/app/data'
import Link from 'next/link'
import BrandLogo from './BrandLogo'

const Footer = () => {
  return (
    <footer className='mt-10 w-screen bg-slate-950 text-white'>
      <div className='mx-auto grid w-[92%] max-w-[1280px] gap-10 py-12 md:grid-cols-[1.3fr_2fr]'>
        <div>
          <div className='inline-block rounded-xl bg-white p-3'><BrandLogo/></div>
          <p className='mt-5 max-w-md text-sm leading-6 text-slate-400'>A personalized commerce and product analytics portfolio experience focused on measurable discovery, decision support, conversion and experimentation.</p>
          <div className='mt-5 flex gap-3 text-sm'><Link href='/analytics' className='rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-slate-950'>Analytics workspace</Link><Link href='/compare' className='rounded-lg border border-slate-700 px-4 py-2 text-slate-200'>Compare</Link></div>
        </div>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {footerSections.slice(0,4).map((section,index)=><div key={index}><p className='font-semibold'>{section.sectionName}</p><div className='mt-4 flex flex-col gap-2'>{section.items.slice(0,5).map((item,i)=><Link href={item.link} key={i} className='text-sm text-slate-400 hover:text-white'>{item.title}</Link>)}</div></div>)}
        </div>
      </div>
      <div className='border-t border-slate-800'><div className='mx-auto flex w-[92%] max-w-[1280px] flex-col justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row'><p>© 2026 ShopSense. Portfolio project.</p><p>Open-source foundation retained under the original MIT License.</p></div></div>
    </footer>
  )
}
export default Footer

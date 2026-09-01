"use client"
import React, { useEffect, useState } from 'react';
import { bannerDataHandler } from '@/app/api/homeData';
import { trackEvent } from '@/lib/analytics';

type BannerItem={bannerid:number;toptitle:string;middletitle:string;bottomtitle:string;imglink:string;startprice:number;buttontitle:string;redirect_link:string};
const fallback:BannerItem[]=[
 {bannerid:1,toptitle:'Curated for your journey',middletitle:'Find the right style faster',bottomtitle:'Smart discovery from',imglink:'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-1.jpg',startprice:29,buttontitle:'EXPLORE NOW',redirect_link:'/categories/fashion'},
 {bannerid:2,toptitle:'Decision support',middletitle:'Compare before you commit',bottomtitle:'Popular picks from',imglink:'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-2.jpg',startprice:39,buttontitle:'COMPARE',redirect_link:'/compare'},
 {bannerid:3,toptitle:'Product intelligence',middletitle:'See what shoppers do next',bottomtitle:'Explore ShopSense',imglink:'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/banner-3.jpg',startprice:0,buttontitle:'VIEW ANALYTICS',redirect_link:'/analytics'},
];
export default function Banner(){
 const [currentIndex,setCurrentIndex]=useState(0); const [data,setData]=useState<BannerItem[]>(fallback);
 useEffect(()=>{(async()=>{try{const res=await bannerDataHandler(); if(res.status===200 && res.banners?.data?.length) setData(res.banners.data);}catch{}})()},[]);
 const next=()=>setCurrentIndex(i=>(i+1)%data.length); const prev=()=>setCurrentIndex(i=>(i-1+data.length)%data.length);
 const item=data[currentIndex] || fallback[0];
 return <section className='relative mx-auto mt-6 w-[92%] max-w-[1280px] overflow-hidden rounded-3xl bg-slate-100'>
   <div className='relative min-h-[390px] md:min-h-[450px]'>
     <img className='absolute inset-0 h-full w-full object-cover' src={item.imglink} alt={item.middletitle} onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/about-1.jpg'}}/>
     <div className='absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-transparent'/>
     <div className='relative z-10 flex min-h-[390px] max-w-2xl flex-col justify-center px-8 py-12 text-white md:min-h-[450px] md:px-16'>
       <p className='text-sm font-bold uppercase tracking-[.2em] text-emerald-300'>{item.toptitle}</p><h1 className='mt-3 text-4xl font-bold leading-tight md:text-6xl'>{item.middletitle}</h1><p className='mt-4 text-lg text-slate-200'>{item.bottomtitle}{item.startprice>0&&<> <strong>${item.startprice}</strong></>}</p>
       <a onClick={()=>trackEvent({eventName:'hero_cta_clicked',metadata:{bannerId:item.bannerid,destination:item.redirect_link}})} href={item.redirect_link || '/'} className='mt-7 w-fit rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-300'>{item.buttontitle || 'SHOP NOW'}</a>
     </div>
   </div>
   <button aria-label='Previous banner' onClick={prev} className='absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-slate-950 shadow'>‹</button><button aria-label='Next banner' onClick={next} className='absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-slate-950 shadow'>›</button>
 </section>
}

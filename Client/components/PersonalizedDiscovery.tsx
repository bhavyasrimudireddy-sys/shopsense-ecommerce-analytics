import Link from 'next/link';

const cards = [
  {title:'Recommended for you', text:'A simple preference-based recommendation surface that can later be connected to behavioral ranking.', href:'/categories/fashion', tag:'Personalization'},
  {title:'Compare before buying', text:'Evaluate products side by side to reduce choice overload and support confident purchase decisions.', href:'/compare', tag:'Decision support'},
  {title:'Recently viewed', text:'A journey-resume concept designed to reduce repeated search effort for returning shoppers.', href:'/analytics/journeys', tag:'Journey UX'},
];

export default function PersonalizedDiscovery(){
  return <section className="mx-auto my-10 w-[92%] max-w-[1280px]">
    <div className="mb-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Smarter discovery</p><h2 className="mt-2 text-3xl font-bold text-slate-950">Built around how shoppers actually decide</h2></div>
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card)=><Link href={card.href} key={card.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{card.tag}</span>
        <h3 className="mt-5 text-xl font-semibold text-slate-900">{card.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p><span className="mt-5 inline-block text-sm font-semibold text-slate-950">Explore →</span>
      </Link>)}
    </div>
  </section>
}

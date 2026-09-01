import Link from 'next/link'
import React,{useState} from 'react'
import { navBtns } from '@/app/data'
import Account from './DropdownMenu/Account';
import { useMenu } from '@/Helpers/MenuContext';
import Product from './DropdownMenu/Product';
import Category from './DropdownMenu/Category';
import { useRouter } from 'next/navigation'
import { HeartIcon,ShoppingBagIcon,ChartBarIcon,ScaleIcon,Cog6ToothIcon } from '@heroicons/react/24/outline';
import BrandLogo from './BrandLogo';
import { trackEvent } from '@/lib/analytics';

const Navbar = () => {
    const router = useRouter();
    const { toggleCart, toggleFav } = useMenu();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectIndex, setselectIndex] = useState<number | null>(null);
    function searchRedirect(e:any){
        e.preventDefault();
        const query=(e.target.searchEntry.value || '').trim();
        if(!query) return;
        trackEvent({eventName:'search_performed', metadata:{query}});
        router.push(`/search/${query.split(' ').join('-')}`)
    }
    return (
    <nav className='w-full bg-white shadow-sm' aria-label="Primary navigation">
        <div className='hidden h-10 border-b border-slate-100 bg-slate-950 text-white sm:flex'>
          <div className='mx-auto flex w-[92%] max-w-[1280px] items-center justify-between text-xs'>
            <p className='font-medium text-slate-300'>Free shipping on orders over $55</p>
            <p className='text-slate-400'>Smarter discovery · clearer decisions · measurable journeys</p>
          </div>
        </div>
        <div className='border-b border-slate-100'>
          <div className='mx-auto flex w-[92%] max-w-[1280px] flex-col items-center gap-4 py-5 md:flex-row'>
            <div className='flex w-full items-center justify-between md:w-auto'><BrandLogo/><div className='flex gap-3 md:hidden'><Link href='/analytics' aria-label='Analytics'><ChartBarIcon width={26}/></Link><button onClick={toggleCart} aria-label='Open cart'><ShoppingBagIcon width={26}/></button></div></div>
            <form onSubmit={searchRedirect} className='flex h-12 w-full flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 md:mx-6'>
              <input name='searchEntry' aria-label='Search products' placeholder='Search products, categories and styles...' type='search' className='w-full bg-transparent text-sm outline-none placeholder:text-slate-400'/>
              <button type='submit' aria-label='Submit search' className='ml-2 text-slate-600'><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div className='hidden items-center gap-4 text-slate-700 md:flex'>
              <Link href='/analytics' className='rounded-lg p-2 hover:bg-emerald-50' aria-label='Product analytics'><ChartBarIcon width={27}/></Link>
              <Link href='/admin' className='rounded-lg p-2 hover:bg-emerald-50' aria-label='Admin catalog'><Cog6ToothIcon width={27}/></Link>
              <Link href='/compare' className='rounded-lg p-2 hover:bg-emerald-50' aria-label='Compare products'><ScaleIcon width={27}/></Link>
              <Account/>
              <button onClick={toggleFav} className='rounded-lg p-2 hover:bg-emerald-50' aria-label='Open wishlist'><HeartIcon width={27}/></button>
              <button onClick={toggleCart} className='rounded-lg p-2 hover:bg-emerald-50' aria-label='Open cart'><ShoppingBagIcon width={27}/></button>
            </div>
          </div>
        </div>
        <div className='hidden border-b border-slate-100 lg:block'>
          <div className='mx-auto flex max-w-[1280px] justify-center'>
            {navBtns.map((btn,index)=><div key={index} onMouseEnter={()=>{setDropdownVisible(true);setselectIndex(index)}} onMouseLeave={()=>{setDropdownVisible(false);setselectIndex(null)}} className="relative">
                <button onClick={() => btn.catLink && router.push(btn.catLink)} className='mx-3 px-2 py-4 text-sm font-semibold text-slate-600 transition hover:text-emerald-700'>{btn.name}</button>
                {selectIndex === index && isDropdownVisible && btn.name==='Categories' && (<Category/>)}
                {selectIndex === index && btn.isExtendable && isDropdownVisible && (<Product options={btn.extendables} />)}
            </div>)}
          </div>
        </div>
    </nav>
  )
};
export default Navbar

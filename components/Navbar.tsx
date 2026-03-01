"use client";
import { ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useState } from 'react';
import MobileSidebar from '@/components/MobileSidebar';
import { MENU_ITEMS } from '@/constants/menu';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between">
      <Link href="/" className="text-primary/75 hover:opacity-70 transition-opacity">
        <Logo size={50}/>
      </Link>

      <div className="flex items-center">
        {/* Menu items - desktop */}
        <div className="hidden md:flex items-center space-x-10 text-xs md:text-sm tracking-[0.25em] font-medium uppercase mix-blend-difference text-primary/75">
          {MENU_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">{item.zh}</Link>
          ))}
        </div>

        <div className="flex items-center space-x-6 md:ml-10">
          {/* Mobile menu trigger */}
          <button className="md:hidden mix-blend-difference text-primary/75 hover:opacity-70" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
          
          {/* Shopping bag icon */}
          <Link href="/cart" className="relative group mix-blend-difference text-primary/75 hover:opacity-70">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 rounded-full border border-background-light flex items-center justify-center text-[9px] text-white font-bold leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
        <MobileSidebar open={isOpen} setOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default Navbar;

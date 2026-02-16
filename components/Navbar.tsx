"use client";
import { ShoppingBag, Menu } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useState } from 'react';
import MobileSidebar from '@/components/MobileSidebar';
import { MENU_ITEMS } from '@/constants/menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between">
      <Link href="/" className="text-primary hover:opacity-70 transition-opacity">
        <Logo size={50}/>
      </Link>

      <div className="flex items-center">
        {/* Menu items - desktop */}
        <div className="hidden md:flex items-center space-x-10 text-xs md:text-sm tracking-[0.25em] font-medium uppercase mix-blend-difference text-white">
          {MENU_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">{item.zh}</Link>
          ))}
        </div>

        <div className="flex items-center space-x-6 md:ml-10">
          {/* Mobile menu trigger */}
          <button className="md:hidden mix-blend-difference text-white" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
          
          {/* Shopping bag icon */}
          <Link href="/cart" className="relative group mix-blend-difference text-white">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full border border-background-light"></span>
          </Link>
        </div>
        <MobileSidebar open={isOpen} setOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default Navbar;

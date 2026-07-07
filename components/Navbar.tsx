"use client";
import { ShoppingBag } from 'lucide-react';
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
    <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between bg-gradient-to-b from-background/95 via-background/60 to-transparent">
      <Link href="/" className="text-primary hover:opacity-70 transition-opacity">
        <Logo size={50} filled={true} />
      </Link>

      <div className="flex items-center">
        {/* Menu items - desktop */}
        <div className="hidden md:flex items-center space-x-10 text-xs md:text-sm tracking-[0.25em] font-medium uppercase text-primary">
          {MENU_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-70">{item.zh}</Link>
          ))}
        </div>

        <div className="flex items-center space-x-6 md:ml-10">
          {/* Mobile menu trigger：兩條不等長水平細線 */}
          <button
            className="md:hidden flex flex-col items-end gap-2 py-2 text-primary hover:opacity-70"
            onClick={() => setIsOpen(true)}
            aria-label="開啟選單"
          >
            <span className="block h-px w-7 bg-current" />
            <span className="block h-px w-4 bg-current" />
          </button>

          {/* Shopping bag icon */}
          <Link href="/cart" className="relative group text-primary hover:opacity-70">
            <ShoppingBag size={22} strokeWidth={1} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-primary rounded-full border border-background flex items-center justify-center text-[9px] text-on-primary font-medium leading-none">
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

"use client";
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { MENU_ITEMS } from '@/constants/menu';
import { useCart } from '@/context/CartContext';

const CartBadge = ({ count }: { count: number }) => {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1 -right-1.5 min-w-4 h-4 px-1 bg-primary rounded-full flex items-center justify-center text-[10px] text-on-primary font-medium leading-none">
      {count > 9 ? '9+' : count}
    </span>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* 手機版頂欄：品牌識別，導覽交給底部 tab bar */}
      <header className="md:hidden flex items-center justify-between h-14 px-5 bg-background border-b border-ghost-line">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={26} filled className="text-primary" />
          <span className="font-serif text-lg text-on-surface">塔芙</span>
        </Link>
        <span className="font-label text-[10px] tracking-[0.22em] text-outline">
          TAFF DESSERT
        </span>
      </header>

      {/* 桌機版頂欄 */}
      <nav className="hidden md:flex items-center justify-between px-14 py-4 bg-background/90 backdrop-blur border-b border-ghost-line">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={50} filled className="text-primary" />
          <span className="font-serif text-2xl text-on-surface">塔芙</span>
        </Link>

        <div className="flex items-center gap-10">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[15px] tracking-[0.02em] pb-1 border-b transition-colors font-medium ${isActive(item.href)
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-primary'
                }`}
            >
              {item.zh}
            </Link>
          ))}

          <Link
            href="/cart"
            className="relative text-primary hover:text-primary-dark transition-colors p-1"
            aria-label="購物車"
          >
            <ShoppingBag size={22} strokeWidth={1.3} />
            <CartBadge count={totalItems} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

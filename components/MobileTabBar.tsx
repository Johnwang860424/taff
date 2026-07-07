"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

import { Home, List, ShoppingBag, Store } from "lucide-react";

/* 設計稿的極細線條圖示（strokeWidth 1.4） */
const TAB_ICONS: Record<string, React.ReactNode> = {
  home: <Home size={23} strokeWidth={1.4} aria-hidden />,
  menu: <List size={23} strokeWidth={1.4} aria-hidden />,
  cart: <ShoppingBag size={23} strokeWidth={1.4} aria-hidden />,
  about: <Store size={23} strokeWidth={1.4} aria-hidden />,
};

const TABS = [
  { href: "/", label: "首頁", icon: "home" },
  { href: "/menu", label: "季節嚴選", icon: "menu" },
  { href: "/cart", label: "購物車", icon: "cart" },
  { href: "/brand", label: "品牌故事", icon: "about" },
];

const MobileTabBar = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-container border-t border-ghost-line pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 px-1.5">
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${isActive(tab.href) ? "text-primary" : "text-outline"
              }`}
          >
            <span className="relative">
              {TAB_ICONS[tab.icon]}
              {tab.href === "/cart" && totalItems > 0 && (
                <span className="absolute -top-1 left-[calc(100%-6px)] min-w-4 h-4 px-1 bg-primary text-on-primary rounded-full text-[10px] font-medium flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </span>
            <span className="text-[11px] tracking-[0.02em]">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileTabBar;

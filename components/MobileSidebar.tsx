import Link from "next/link";
import Logo from '@/components/Logo';
import SocialLinks from "@/components/SocialLinks";
import { X } from 'lucide-react';
import { MENU_ITEMS } from '@/constants/menu';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';

const MobileSidebar = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  useBodyOverflow(open);

  return (
    <div
      className={`
        fixed inset-0 flex z-auto transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}
    >
      <div className="relative w-full h-full bg-background flex flex-col">
        <div className="flex justify-between items-center p-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center text-primary">
            <Logo size={50} filled={true} />
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="text-primary hover:opacity-70 transition-all p-2.5 group flex items-center justify-center"
            aria-label="關閉選單"
          >
            <X strokeWidth={1} className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <nav className="flex flex-col gap-10 items-center justify-center flex-1">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex flex-col items-center text-center transition-colors duration-300"
            >
              <span className="text-3xl font-serif text-on-surface mb-1 group-hover:text-primary transition-colors">{item.zh}</span>
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/70 group-hover:text-on-surface-variant transition-colors">{item.en}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-center space-x-6 text-primary/60 mb-8">
          <SocialLinks/>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;

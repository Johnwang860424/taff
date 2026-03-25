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
      <div className="relative w-full h-full bg-background-light shadow-xl flex flex-col ">
        <div className="flex justify-between items-center p-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center text-primary/75">
            <Logo size={50}/>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="text-primary/75 hover:bg-gray-100 transition-all p-2.5 rounded-full group flex items-center justify-center"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <nav className="flex flex-col gap-10 items-center justify-center flex-1">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
            >
              <span className="text-3xl font-serif text-primary mb-1 group-hover:text-primary/80 transition-colors">{item.zh}</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-sans group-hover:text-gray-500 transition-colors">{item.en}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-center space-x-6 text-primary/50 mb-8">
          <SocialLinks/>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;

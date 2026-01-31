import { ShoppingBag, Menu } from 'lucide-react';
import Logo from '@/components/Logo';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between">
      <a href="#" className="text-primary hover:opacity-70 transition-opacity">
        <Logo size={50}/>
      </a>

      <div className="flex items-center">
        {/* Menu items - desktop */}
        <div className="hidden md:flex items-center space-x-10 text-xs md:text-sm tracking-[0.25em] font-medium uppercase mix-blend-difference text-white">
          <a href="#" className="hover:opacity-70 transition-opacity">品牌故事</a>
          <a href="#" className="hover:opacity-70 transition-opacity">美味菜單</a>
          <a href="#" className="hover:opacity-70 transition-opacity">聯絡我們</a>
        </div>

        <div className="flex items-center space-x-6 md:ml-10">
          {/* Mobile menu trigger */}
          <button className="md:hidden mix-blend-difference text-white">
            <Menu size={24} />
          </button>
          
          {/* Shopping bag icon */}
          <a href="#" className="relative group mix-blend-difference text-white">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full border border-background-light"></span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

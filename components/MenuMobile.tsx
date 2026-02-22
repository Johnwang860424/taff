'use client';

import Image from "next/image";
import { useState } from "react";
import type { MenuData } from "@/lib/menu";
import { ShoppingCart } from "lucide-react";

const MenuMobile = ({ data }: { data: MenuData }) => {
  const [activeCategory, setActiveCategory] = useState<keyof MenuData>("shippableItems");

  const categoryNames: Record<keyof MenuData, string> = {
    shippableItems: "可宅配",
    pickupOnlyItems: "限自取",
  };

  const categories = Object.keys(data) as Array<keyof MenuData>;

  return (
    <main className="pt-20 min-h-screen relative overflow-hidden">
      <div className="max-w-md mx-auto px-5 relative z-10">
        <div className="text-center mb-4 mt-4">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">Seasonal Menu</p>
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary dark:text-white mb-8 tracking-widest font-light">
            季節嚴選
          </h1>

          {/* Divider */}
          <div className="w-20 h-[1px] bg-accent-gold mx-auto"></div>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-3 scrollbar-hide snap-x">
          {categories.map((key) => (
            <button 
              key={key} 
              onClick={() => setActiveCategory(key)}
              className={`snap-center shrink-0 px-5 py-2 rounded-full text-sm tracking-widest font-medium shadow-sm transition-all active:scale-95 ${
                activeCategory === key
                  ? "bg-primary text-white shadow-lg shadow-primary/20 dark:bg-gray-100 dark:text-primary dark:shadow-gray-100/20"
                  : "bg-white dark:bg-surface-dark text-primary dark:text-gray-200 border border-transparent active:border-gray-200 active:bg-gray-50"
              }`}
            >
              {categoryNames[key]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 pt-4 pb-12">
          {data[activeCategory]?.map((item, index) => (
            <div key={index} className="group bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image alt={item.name} className="object-cover pointer-events-none" src={item.img} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-serif tracking-widest text-primary dark:text-white uppercase">
                  {activeCategory === "shippableItems" ? "Shippable" : "Pickup"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-2xl text-primary dark:text-white font-medium">{item.name}</h3>
                  <span className="font-sans text-lg text-accent-brown dark:text-accent-gold font-medium">${item.price}</span>
                </div>
                <button className="w-full mt-4 py-3 bg-accent-gold active:bg-accent-gold/80 active:scale-95 text-white rounded-xl font-medium tracking-widest text-sm transition-colors duration-300 flex items-center justify-center space-x-2">
                  <ShoppingCart />
                  <span>加入購物車</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MenuMobile;

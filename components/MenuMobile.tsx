'use client';

import Image from "next/image";
import { useState } from "react";
import type { MenuData } from "@/lib/menu";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

const MenuMobile = ({ data }: { data: MenuData }) => {
  const [activeCategory, setActiveCategory] = useState<keyof MenuData>("shippableItems");
  const [addedName, setAddedName] = useState<string | null>(null);

  const { addItem } = useCart();

  const categoryNames: Record<keyof MenuData, string> = {
    shippableItems: "可宅配",
    pickupOnlyItems: "限自取",
  };

  const categories = Object.keys(data) as Array<keyof MenuData>;

  const handleAddToCart = (item: { name: string; price: number; img: string }) => {
    addItem({
      name: item.name,
      price: item.price,
      img: item.img,
      category: activeCategory === "shippableItems" ? "shippable" : "pickupOnly",
    });
    setAddedName(item.name);
    setTimeout(() => setAddedName(null), 1500);
  };

  return (
    <main className="pt-20 min-h-screen relative overflow-hidden">
      <div className="max-w-md mx-auto px-5 relative z-10">
        <div className="text-center mb-4 mt-4">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">Seasonal Menu</p>
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8 tracking-widest font-light">
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
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white text-primary border border-transparent active:border-gray-200 active:bg-gray-50"
              }`}
            >
              {categoryNames[key]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 pt-4 pb-12">
          {data[activeCategory]?.map((item, index) => {
            const isAdded = addedName === item.name;
            return (
              <div key={index} className="group bg-surface-light rounded-2xl overflow-hidden bg-white">
                <div className="relative h-64 overflow-hidden">
                  <Image alt={item.name} className="object-cover pointer-events-none" src={item.img} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-serif tracking-widest text-primary uppercase">
                    {activeCategory === "shippableItems" ? "Shippable" : "Pickup"}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl text-primary font-medium">{item.name}</h3>
                    <span className="font-sans text-lg text-accent-brown font-medium">${item.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`
                      w-full mt-4 py-3 text-white rounded-xl font-medium tracking-widest text-sm
                      transition-all duration-300 flex items-center justify-center space-x-2
                      active:scale-95
                      ${isAdded
                        ? "bg-green-500"
                        : "bg-accent-gold active:bg-accent-gold/80"
                      }
                    `}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} />
                        <span>已加入購物車</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        <span>加入購物車</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
};

export default MenuMobile;

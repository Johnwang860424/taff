'use client';

import Image from "next/image";
import { useState } from "react";
import type { MenuData } from "@/lib/menu";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

const MenuDesktop = ({ data }: { data: MenuData }) => {
  const firstItem = data.shippableItems[0];
  const [currentImage, setCurrentImage] = useState(firstItem?.img);
  const [currentName, setCurrentName] = useState(firstItem?.name);
  const [currentItem, setCurrentItem] = useState(firstItem);
  const [currentCategory, setCurrentCategory] = useState<"shippable" | "pickupOnly">("shippable");
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();

  const handleMenuItemHover = (
    item: { name: string; price: number; img: string },
    category: "shippable" | "pickupOnly"
  ) => {
    setCurrentImage(item.img);
    setCurrentName(item.name);
    setCurrentItem(item);
    setCurrentCategory(category);
  };

  const handleAddToCart = () => {
    if (!currentItem) return;
    addItem({
      name: currentItem.name,
      price: currentItem.price,
      img: currentItem.img,
      category: currentCategory,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full relative">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] relative overflow-hidden order-1 group">
        <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-700 group-hover:bg-stone-900/0 z-10"></div>
        <Image
          key={currentImage}
          alt={`精美的${currentName}甜點照片`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
          src={currentImage}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Add to cart button */}
        <div className="absolute bottom-8 left-8 z-20 hidden md:block">
          <button
            onClick={handleAddToCart}
            className={`
              text-white text-xs px-4 py-2 rounded-xl shadow-md
              transition-all duration-300 flex items-center gap-2 shrink-0
              ${added
                ? "bg-green-500 hover:bg-green-500 scale-105"
                : "bg-accent-gold hover:bg-accent-gold/80 hover:scale-110 hover:shadow-lg active:scale-95"
              }
            `}
          >
            {added ? (
              <>
                <Check size={16} />
                已加入購物車
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                加入購物車
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Section - Menu Content */}
      <div className="w-full md:w-1/2 shrink-0 flex flex-col justify-between p-8 md:p-24 md:py-16 bg-background-light z-10 order-2">
        <div className="flex flex-col items-start mb-6 md:mb-6 z-10 shrink-0">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">Seasonal Selection</p>
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-widest font-light">
            季節嚴選
          </h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-4 pb-4 z-10 space-y-12">
          {/* Shippable Section */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 pb-2 border-b border-accent-gold inline-block pr-8">
              可宅配
              <span className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase ml-2">Shippable</span>
            </h2>
            <ul className="space-y-4">
              {data.shippableItems.map((item, index) => (
                <li
                  key={index}
                  className="group flex justify-between items-baseline text-lg md:text-xl font-light text-gray-800 dark:text-gray-300 hover:text-accent-gold dark:hover:text-accent-gold transition-colors cursor-pointer"
                  onMouseEnter={() => handleMenuItemHover(item, "shippable")}
                >
                  <span className="font-serif">{item.name}</span>
                  <span className="text-base font-sans text-gray-500 dark:text-gray-500 group-hover:text-accent-gold/80 transition-colors">$ {item.price}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pickup Only Section */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 pb-2 border-b border-accent-gold inline-block pr-8">
              限自取
              <span className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase ml-2">Pickup Only</span>
            </h2>
            <ul className="space-y-4">
              {data.pickupOnlyItems.map((item, index) => (
                <li
                  key={index}
                  className="group flex justify-between items-baseline text-lg md:text-xl font-light text-gray-800 dark:text-gray-300 hover:text-accent-gold dark:hover:text-accent-gold transition-colors cursor-pointer"
                  onMouseEnter={() => handleMenuItemHover(item, "pickupOnly")}
                >
                  <span className="font-serif">{item.name}</span>
                  <span className="text-base font-sans text-gray-500 dark:text-gray-500 group-hover:text-accent-gold/80 transition-colors">$ {item.price}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] tracking-[0.3em] text-primary/30 dark:text-white/20 font-sans hidden md:block writing-vertical-rl">
          SEASONAL SELECTION — 03
        </div>
      </div>
    </main>
  );
};

export default MenuDesktop;

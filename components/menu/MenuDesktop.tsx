"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuData, MenuItem } from "@/lib/menu";
import { ShoppingCart, Check, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const today = new Date();
today.setHours(0, 0, 0, 0);

const isDateExpired = (dateStr: string) => new Date(dateStr) < today;

const getPriceDisplay = (item: MenuItem): string => {
  const prices = item.flavorSchedules
    .map((fs) => fs.price)
    .filter((p) => p > 0);
  if (prices.length === 0) return "$ —";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$ ${min}` : `$${min} 起`;
};

const MenuDesktop = ({ data }: { data: MenuData }) => {
  const firstItem = data.shippableItems[0];
  const [currentItem, setCurrentItem] = useState(firstItem);
  const [activeCategory, setActiveCategory] =
    useState<keyof MenuData>("shippableItems");
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedPickupDate, setSelectedPickupDate] = useState("");

  const { addItem } = useCart();

  const flavorOptions = [
    ...new Set(currentItem?.flavorSchedules.flatMap((fs) => fs.flavor) || []),
  ];

  const selectedSchedule = currentItem?.flavorSchedules.find((fs) =>
    fs.flavor.includes(selectedFlavor),
  );

  const currentPrice = selectedSchedule?.price ?? null;

  const selectedFlavorDates = (selectedSchedule?.dates ?? []).filter(
    (d) => !isDateExpired(d),
  );

  const handleMenuItemHover = (item: MenuItem, category: keyof MenuData) => {
    setCurrentItem(item);
    setActiveCategory(category);
  };

  const openModal = () => {
    if (!currentItem) return;
    const options = [
      ...new Set(currentItem.flavorSchedules.flatMap((fs) => fs.flavor)),
    ];
    setSelectedFlavor(options.length === 1 ? options[0] : "");
    setSelectedPickupDate("");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    if (
      !currentItem ||
      !selectedFlavor ||
      !selectedPickupDate ||
      currentPrice === null
    )
      return;
    addItem({
      name: currentItem.name,
      price: currentPrice,
      img: currentItem.img,
      category:
        activeCategory === "shippableItems" ? "shippable" : "pickupOnly",
      flavor: selectedFlavor,
      pickupDate: selectedPickupDate,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    closeModal();
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full relative">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] relative overflow-hidden order-1 group">
        <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-700 group-hover:bg-stone-900/0 z-10" />
        {currentItem && (
          <Image
            key={currentItem.img}
            alt={`精美的${currentItem.name}甜點照片`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
            src={currentItem.img}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute bottom-8 left-8 z-20 hidden md:block">
          <button
            onClick={openModal}
            className={`text-white text-xs px-4 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2 shrink-0 ${
              added
                ? "bg-green-500 hover:bg-green-500 scale-105"
                : "bg-accent-gold hover:bg-accent-gold/80 hover:scale-110 hover:shadow-lg active:scale-95"
            }`}
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

      {/* Right Section */}
      <div className="w-full md:w-1/2 shrink-0 flex flex-col justify-between p-8 md:p-24 md:py-16 bg-background-light z-10 order-2">
        <div className="flex flex-col items-start mb-6 md:mb-6 z-10 shrink-0">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">
            Seasonal Selection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-widest font-light">
            季節嚴選
          </h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-4 pb-4 z-10 space-y-12">
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 pb-2 border-b border-accent-gold inline-block pr-8">
              可宅配
              <span className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase ml-2">
                Shippable
              </span>
            </h2>
            <ul className="space-y-4">
              {data.shippableItems.map((item, index) => (
                <li
                  key={index}
                  className={`group flex justify-between items-baseline text-lg md:text-xl font-light transition-colors cursor-pointer ${
                    currentItem?.name === item.name &&
                    activeCategory === "shippableItems"
                      ? "text-accent-gold"
                      : "text-gray-800 dark:text-gray-300 hover:text-accent-gold dark:hover:text-accent-gold"
                  }`}
                  onMouseEnter={() =>
                    handleMenuItemHover(item, "shippableItems")
                  }
                  onClick={() => handleMenuItemHover(item, "shippableItems")}
                >
                  <span className="font-serif">{item.name}</span>
                  <span className="text-base font-sans text-gray-500 dark:text-gray-500 group-hover:text-accent-gold/80 transition-colors">
                    {getPriceDisplay(item)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 pb-2 border-b border-accent-gold inline-block pr-8">
              限自取
              <span className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase ml-2">
                Pickup Only
              </span>
            </h2>
            <ul className="space-y-4">
              {data.pickupOnlyItems.map((item, index) => (
                <li
                  key={index}
                  className={`group flex justify-between items-baseline text-lg md:text-xl font-light transition-colors cursor-pointer ${
                    currentItem?.name === item.name &&
                    activeCategory === "pickupOnlyItems"
                      ? "text-accent-gold"
                      : "text-gray-800 dark:text-gray-300 hover:text-accent-gold dark:hover:text-accent-gold"
                  }`}
                  onMouseEnter={() =>
                    handleMenuItemHover(item, "pickupOnlyItems")
                  }
                  onClick={() => handleMenuItemHover(item, "pickupOnlyItems")}
                >
                  <span className="font-serif">{item.name}</span>
                  <span className="text-base font-sans text-gray-500 dark:text-gray-500 group-hover:text-accent-gold/80 transition-colors">
                    {getPriceDisplay(item)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] tracking-[0.3em] text-primary/30 dark:text-white/20 font-sans hidden md:block writing-vertical-rl">
          SEASONAL SELECTION — 03
        </div>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px] flex items-center justify-center px-4 transition-all duration-200 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      >
        <div
          className={`w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-black/10 p-6 md:p-8 transition-all duration-200 ${
            isModalOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-accent-gold font-sans mb-2">
                Add To Cart
              </p>
              <h3 className="font-serif text-3xl text-primary">
                {currentItem.name}
              </h3>
              <p className="font-sans text-sm text-gray-500 mt-2">
                {currentPrice !== null
                  ? `$ ${currentPrice}`
                  : getPriceDisplay(currentItem)}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="h-9 w-9 rounded-full border border-black/15 flex items-center justify-center text-gray-500 hover:text-primary hover:border-black/30 transition-colors"
              aria-label="關閉視窗"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-7">
            <p className="text-sm font-sans tracking-[0.15em] text-gray-700 mb-3">
              口味
            </p>
            <div className="flex flex-wrap gap-2">
              {flavorOptions.length > 0 ? (
                flavorOptions.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => {
                      setSelectedFlavor(flavor);
                      setSelectedPickupDate("");
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm font-sans transition-colors ${
                      selectedFlavor === flavor
                        ? "border-primary bg-primary text-white"
                        : "border-black/30 text-primary hover:border-black/60"
                    }`}
                  >
                    {flavor}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400 font-sans">
                  此商品尚未設定口味
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-sans tracking-[0.15em] text-gray-700 mb-3">
              取貨日期
            </p>
            <div className="flex flex-wrap gap-2">
              {!selectedFlavor ? (
                <p className="text-sm text-gray-400 font-sans">請先選擇口味</p>
              ) : selectedFlavorDates.length > 0 ? (
                selectedFlavorDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedPickupDate(date)}
                    className={`px-4 py-2 rounded-lg border text-sm font-sans transition-colors ${
                      selectedPickupDate === date
                        ? "border-primary bg-primary text-white"
                        : "border-black/30 text-primary hover:border-black/60"
                    }`}
                  >
                    {date}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400 font-sans">
                  此口味目前無可取貨日期
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-5 py-2.5 rounded-xl border border-black/20 text-primary font-sans text-sm hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedFlavor || !selectedPickupDate}
              className="px-5 py-2.5 rounded-xl bg-accent-gold text-white font-sans text-sm hover:bg-accent-gold/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              確認加入
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MenuDesktop;

"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { MenuData, MenuItem } from "@/lib/menu";
import { ShoppingCart, Check, X } from "lucide-react";
import { useCart, cartItemKey } from "@/context/CartContext";

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

const MenuMobile = ({ data }: { data: MenuData }) => {
  const [activeCategory, setActiveCategory] =
    useState<keyof MenuData>("shippableItems");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedItemCategory, setSelectedItemCategory] =
    useState<keyof MenuData>("shippableItems");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedPickupDate, setSelectedPickupDate] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [addedKey, setAddedKey] = useState<string | null>(null);

  const { addItem } = useCart();
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  const categoryNames: Record<keyof MenuData, string> = {
    shippableItems: "可宅配",
    pickupOnlyItems: "限自取",
  };

  const categories = Object.keys(data) as Array<keyof MenuData>;

  const flavorOptions = [
    ...new Set(selectedItem?.flavorSchedules.flatMap((fs) => fs.flavor) || []),
  ];

  const selectedSchedule = selectedItem?.flavorSchedules.find((fs) =>
    fs.flavor.includes(selectedFlavor),
  );

  const currentPrice = selectedSchedule?.price ?? null;

  const selectedFlavorDates = (selectedSchedule?.dates ?? []).filter(
    (d) => !isDateExpired(d),
  );

  const openSheet = (item: MenuItem, category: keyof MenuData) => {
    const options = [
      ...new Set(item.flavorSchedules.flatMap((fs) => fs.flavor)),
    ];
    setSelectedItem(item);
    setSelectedItemCategory(category);
    setSelectedFlavor(options.length === 1 ? options[0] : "");
    setSelectedPickupDate("");
    setIsSheetOpen(true);
  };

  const closeSheet = () => setIsSheetOpen(false);

  const handleConfirm = () => {
    if (
      !selectedItem ||
      !selectedFlavor ||
      !selectedPickupDate ||
      currentPrice === null
    )
      return;
    const key = cartItemKey(
      selectedItem.name,
      selectedFlavor,
      selectedPickupDate,
    );
    addItem({
      name: selectedItem.name,
      price: currentPrice,
      img: selectedItem.img,
      category:
        selectedItemCategory === "shippableItems" ? "shippable" : "pickupOnly",
      flavor: selectedFlavor,
      pickupDate: selectedPickupDate,
    });
    setAddedKey(key);
    setTimeout(() => setAddedKey(null), 1500);
    closeSheet();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
  };

  const onTouchEnd = () => {
    if (touchDeltaY.current > 80) closeSheet();
    touchDeltaY.current = 0;
  };

  return (
    <main className="pt-20 min-h-screen relative overflow-hidden">
      <div className="max-w-md mx-auto px-5 relative z-10">
        <div className="text-center mb-4 mt-4">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">
            Seasonal Menu
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8 tracking-widest font-light">
            季節嚴選
          </h1>
          <div className="w-20 h-[1px] bg-accent-gold mx-auto" />
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
            const itemPrefix = `${item.name}||`;
            const isAdded = addedKey?.startsWith(itemPrefix) ?? false;
            return (
              <div
                key={index}
                className="group bg-surface-light rounded-2xl overflow-hidden bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    alt={item.name}
                    className="object-cover pointer-events-none"
                    src={item.img}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-serif tracking-widest text-primary uppercase">
                    {activeCategory === "shippableItems"
                      ? "Shippable"
                      : "Pickup"}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl text-primary font-medium">
                      {item.name}
                    </h3>
                    <span className="font-sans text-lg text-accent-brown font-medium">
                      {getPriceDisplay(item)}
                    </span>
                  </div>
                  <button
                    onClick={() => openSheet(item, activeCategory)}
                    className={`w-full mt-4 py-3 text-white rounded-xl font-medium tracking-widest text-sm transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 ${
                      isAdded
                        ? "bg-green-500"
                        : "bg-accent-gold active:bg-accent-gold/80"
                    }`}
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
            );
          })}
        </div>
      </div>

      {/* Bottom Sheet Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px] transition-opacity duration-300 ${
          isSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSheet}
      />

      {/* Bottom Sheet Panel */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-2xl shadow-2xl px-6 pt-4 pb-10 max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out ${
          isSheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
      {selectedItem && (<>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-accent-gold font-sans mb-1">
                  Add To Cart
                </p>
                <h3 className="font-serif text-2xl text-primary">
                  {selectedItem.name}
                </h3>
                <p className="font-sans text-sm text-gray-500 mt-1">
                  {currentPrice !== null
                    ? `$ ${currentPrice}`
                    : getPriceDisplay(selectedItem)}
                </p>
              </div>
              <button
                onClick={closeSheet}
                className="h-9 w-9 rounded-full border border-black/15 flex items-center justify-center text-gray-500"
                aria-label="關閉"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-6">
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
                          : "border-black/30 text-primary"
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

            <div className="mb-8">
              <p className="text-sm font-sans tracking-[0.15em] text-gray-700 mb-3">
                取貨日期
              </p>
              <div className="flex flex-wrap gap-2">
                {!selectedFlavor ? (
                  <p className="text-sm text-gray-400 font-sans">
                    請先選擇口味
                  </p>
                ) : selectedFlavorDates.length > 0 ? (
                  selectedFlavorDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedPickupDate(date)}
                      className={`px-4 py-2 rounded-lg border text-sm font-sans transition-colors ${
                        selectedPickupDate === date
                          ? "border-primary bg-primary text-white"
                          : "border-black/30 text-primary"
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

            <button
              onClick={handleConfirm}
              disabled={!selectedFlavor || !selectedPickupDate}
              className="w-full py-4 bg-accent-gold text-white rounded-xl font-sans text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              確認加入
            </button>
          </>)}
      </div>
    </main>
  );
};

export default MenuMobile;

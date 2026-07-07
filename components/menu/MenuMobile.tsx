"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { MenuData } from "@/lib/menu-utils";
import { getPriceDisplay } from "@/lib/menu-utils";
import { ShoppingCart, Check } from "lucide-react";
import { useMenuItemSelection } from "@/hooks/useMenuItemSelection";
import { AddToCartModalContent } from "./AddToCartModal";

const CATEGORY_NAMES: Record<keyof MenuData, string> = {
  shippableItems: "可宅配",
  pickupOnlyItems: "限自取",
};

const MenuMobile = ({ data }: { data: MenuData }) => {
  const [activeCategory, setActiveCategory] =
    useState<keyof MenuData>("shippableItems");

  const {
    selectedItem,
    selectedFlavor,
    selectedPickupDate,
    isModalOpen,
    addedKey,
    flavorOptions,
    currentPrice,
    selectedFlavorDates,
    openModal,
    closeModal,
    handleConfirm,
    selectFlavor,
    setSelectedPickupDate,
  } = useMenuItemSelection();

  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  const categories = Object.keys(data) as Array<keyof MenuData>;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
  };

  const onTouchEnd = () => {
    if (touchDeltaY.current > 80) closeModal();
    touchDeltaY.current = 0;
  };

  return (
    <main className="pt-20 min-h-screen relative overflow-hidden">
      <div className="max-w-md mx-auto px-page relative z-10">
        <div className="text-center mb-6 mt-4">
          <p className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant mb-3">
            03 / Seasonal Menu
          </p>
          <h1 className="font-serif text-3xl text-on-surface mb-6 tracking-widest">
            季節嚴選
          </h1>
          <div className="w-20 h-px bg-outline-variant mx-auto" />
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-3 scrollbar-hide snap-x">
          {categories.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`snap-center shrink-0 px-5 py-2 rounded-soft text-sm tracking-widest font-medium transition-colors active:scale-95 ${
                activeCategory === key
                  ? "bg-primary text-on-primary"
                  : "bg-transparent text-primary border border-outline active:bg-surface-container"
              }`}
            >
              {CATEGORY_NAMES[key]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 pt-6 pb-14">
          {data[activeCategory]?.map((item, index) => {
            const itemPrefix = `${item.name}::`;
            const isAdded = addedKey?.startsWith(itemPrefix) ?? false;
            return (
              <div key={item.name} className="group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    priority
                    alt={item.name}
                    className="object-cover pointer-events-none"
                    src={item.img}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 font-label text-[10px] tracking-[0.1em] text-primary uppercase">
                    {activeCategory === "shippableItems"
                      ? "Shippable"
                      : "Pickup"}
                  </div>
                </div>
                <div className="pt-4 border-b border-ghost-line pb-6">
                  <p className="font-label text-xs tracking-[0.1em] text-on-surface-variant mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif text-2xl text-on-surface">
                      {item.name}
                    </h3>
                    <span className="font-label text-base tracking-[0.1em] text-primary">
                      {getPriceDisplay(item)}
                    </span>
                  </div>
                  <button
                    onClick={() => openModal(item, activeCategory)}
                    className={`w-full mt-4 py-3 rounded-soft font-medium tracking-widest text-sm transition-colors duration-300 flex items-center justify-center space-x-2 active:scale-95 ${
                      isAdded
                        ? "bg-primary-fixed text-primary"
                        : "bg-primary text-on-primary active:bg-primary/85"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} strokeWidth={1.25} />
                        <span>已加入購物車</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} strokeWidth={1.25} />
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
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      />

      {/* Bottom Sheet Panel */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 bg-background rounded-t-xl border-t border-ghost-line px-6 pt-4 pb-10 max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out ${
          isModalOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {selectedItem && (
          <>
            <div className="w-10 h-1 bg-outline-variant rounded-full mx-auto mb-4" />

            <div className="mb-6">
              <AddToCartModalContent
                item={selectedItem}
                currentPrice={currentPrice}
                flavorOptions={flavorOptions}
                selectedFlavor={selectedFlavor}
                selectedFlavorDates={selectedFlavorDates}
                selectedPickupDate={selectedPickupDate}
                onSelectFlavor={selectFlavor}
                onSelectDate={setSelectedPickupDate}
                onConfirm={handleConfirm}
                onClose={closeModal}
              />
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedFlavor || !selectedPickupDate}
              className="w-full py-4 bg-primary text-on-primary rounded-soft font-sans text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              確認加入
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default MenuMobile;

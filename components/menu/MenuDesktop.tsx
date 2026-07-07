"use client";

import Image from "next/image";
import type { MenuData, MenuItem } from "@/lib/menu-utils";
import { getPriceDisplay } from "@/lib/menu-utils";
import { ShoppingCart, Check } from "lucide-react";
import { useMenuItemSelection } from "@/hooks/useMenuItemSelection";
import { AddToCartModalContent } from "./AddToCartModal";

const MenuDesktop = ({ data }: { data: MenuData }) => {
  const {
    selectedItem,
    selectedCategory,
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
    setSelectedItem,
    setSelectedCategory,
  } = useMenuItemSelection();

  // Initialize with first item on mount
  const currentItem = selectedItem ?? data.shippableItems[0];
  const activeCategory = selectedItem ? selectedCategory : "shippableItems";
  const isAdded = addedKey !== null;

  const handleMenuItemHover = (item: MenuItem, category: keyof MenuData) => {
    setSelectedItem(item);
    setSelectedCategory(category);
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-full relative">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[48vh] relative overflow-hidden order-1 group">
        <div className="absolute inset-0 bg-on-surface/10 transition-opacity duration-700 group-hover:bg-on-surface/0 z-10" />
        {currentItem && (
          <Image
            key={currentItem.img}
            alt={`精美的${currentItem.name}甜點照片`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
            src={currentItem.img}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
        <div className="absolute bottom-8 left-8 z-20 hidden md:block">
          <button
            onClick={() =>
              openModal(currentItem, activeCategory)
            }
            className={`text-sm px-5 py-2.5 rounded-soft transition-colors duration-300 flex items-center gap-2 shrink-0 ${
              isAdded
                ? "bg-primary-fixed text-primary"
                : "bg-primary text-on-primary hover:bg-primary/90 active:scale-95"
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} strokeWidth={1.25} />
                已加入購物車
              </>
            ) : (
              <>
                <ShoppingCart size={16} strokeWidth={1.25} />
                加入購物車
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 shrink-0 flex flex-col justify-between px-page py-14 lg:p-[5vw] lg:py-16 bg-background z-10 order-2">
        <div className="flex flex-col items-start mb-6 z-10 shrink-0">
          <p className="flex items-center gap-3 font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant mb-3">
            <span className="h-px w-8 bg-outline-variant" />
            03 / Seasonal Selection
          </p>
          <h1 className="font-serif text-3xl md:text-4xl xl:text-5xl text-on-surface tracking-widest">
            季節嚴選
          </h1>
        </div>

        <div className="flex-grow overflow-y-auto pr-4 pb-4 z-10 space-y-12">
          <MenuCategorySection
            title="可宅配"
            subtitle="Shippable"
            items={data.shippableItems}
            categoryKey="shippableItems"
            currentItem={currentItem}
            activeCategory={activeCategory}
            onHover={handleMenuItemHover}
          />
          <MenuCategorySection
            title="限自取"
            subtitle="Pickup Only"
            items={data.pickupOnlyItems}
            categoryKey="pickupOnlyItems"
            currentItem={currentItem}
            activeCategory={activeCategory}
            onHover={handleMenuItemHover}
          />
        </div>

        {/* 編目元素：桌機角落直排 */}
        <div className="absolute bottom-12 right-12 font-label text-[10px] tracking-[0.3em] text-on-surface-variant/50 hidden lg:block text-vertical">
          03 / SEASONAL SELECTION
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
          className={`w-full max-w-xl rounded-soft bg-background border border-ghost-line p-6 md:p-8 transition-all duration-200 ${
            isModalOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <AddToCartModalContent
            item={selectedItem ?? currentItem}
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

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-5 py-2.5 rounded-soft border border-outline bg-transparent text-primary font-sans text-sm hover:bg-surface-container transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedFlavor || !selectedPickupDate}
              className="px-5 py-2.5 rounded-soft bg-primary text-on-primary font-sans text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              確認加入
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

// ── Category list section ────────────────────────────────────────

const MenuCategorySection = ({
  title,
  subtitle,
  items,
  categoryKey,
  currentItem,
  activeCategory,
  onHover,
}: {
  title: string;
  subtitle: string;
  items: MenuItem[];
  categoryKey: keyof MenuData;
  currentItem: MenuItem;
  activeCategory: keyof MenuData;
  onHover: (item: MenuItem, category: keyof MenuData) => void;
}) => (
  <section>
    <h2 className="font-serif text-2xl md:text-3xl text-on-surface mb-6 pb-2 border-b border-ghost-line inline-block pr-8">
      {title}
      <span className="font-label text-xs tracking-[0.15em] text-on-surface-variant uppercase ml-2">
        {subtitle}
      </span>
    </h2>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li
          key={item.name}
          className={`group flex justify-between items-baseline text-lg md:text-xl font-light transition-colors cursor-pointer ${
            currentItem?.name === item.name && activeCategory === categoryKey
              ? "text-primary"
              : "text-on-surface hover:text-primary"
          }`}
          onMouseEnter={() => onHover(item, categoryKey)}
          onClick={() => onHover(item, categoryKey)}
        >
          <span className="flex items-baseline gap-3">
            <span className="font-label text-xs tracking-[0.1em] text-on-surface-variant/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-serif">{item.name}</span>
          </span>
          <span className="font-label text-sm tracking-[0.1em] text-on-surface-variant group-hover:text-primary/80 transition-colors">
            {getPriceDisplay(item)}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default MenuDesktop;

"use client";

import { X } from "lucide-react";
import type { MenuItem } from "@/lib/menu-utils";
import { getPriceDisplay } from "@/lib/menu-utils";

type Props = {
  item: MenuItem | null;
  isOpen: boolean;
  currentPrice: number | null;
  flavorOptions: string[];
  selectedFlavor: string;
  selectedFlavorDates: string[];
  selectedPickupDate: string;
  onSelectFlavor: (flavor: string) => void;
  onSelectDate: (date: string) => void;
  onConfirm: () => void;
  onClose: () => void;
};

const FlavorPicker = ({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (f: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.length > 0 ? (
      options.map((flavor) => (
        <button
          key={flavor}
          onClick={() => onSelect(flavor)}
          className={`px-4 py-2 rounded-lg border text-sm font-sans transition-colors ${
            selected === flavor
              ? "border-primary bg-primary text-white"
              : "border-black/30 text-primary hover:border-black/60"
          }`}
        >
          {flavor}
        </button>
      ))
    ) : (
      <p className="text-sm text-gray-400 font-sans">此商品尚未設定口味</p>
    )}
  </div>
);

const DatePicker = ({
  selectedFlavor,
  dates,
  selectedDate,
  onSelect,
}: {
  selectedFlavor: string;
  dates: string[];
  selectedDate: string;
  onSelect: (d: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {!selectedFlavor ? (
      <p className="text-sm text-gray-400 font-sans">請先選擇口味</p>
    ) : dates.length > 0 ? (
      dates.map((date) => (
        <button
          key={date}
          onClick={() => onSelect(date)}
          className={`px-4 py-2 rounded-lg border text-sm font-sans transition-colors ${
            selectedDate === date
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
);

const ModalHeader = ({
  item,
  currentPrice,
  onClose,
}: {
  item: MenuItem;
  currentPrice: number | null;
  onClose: () => void;
}) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-xs tracking-[0.2em] uppercase text-accent-gold font-sans mb-2">
        Add To Cart
      </p>
      <h3 className="font-serif text-3xl text-primary">{item.name}</h3>
      <p className="font-sans text-sm text-gray-500 mt-2">
        {currentPrice !== null ? `$ ${currentPrice}` : getPriceDisplay(item)}
      </p>
    </div>
    <button
      onClick={onClose}
      className="h-9 w-9 rounded-full border border-black/15 flex items-center justify-center text-gray-500 hover:text-primary hover:border-black/30 transition-colors"
      aria-label="關閉視窗"
    >
      <X size={18} />
    </button>
  </div>
);

export const AddToCartModalContent = ({
  item,
  currentPrice,
  flavorOptions,
  selectedFlavor,
  selectedFlavorDates,
  selectedPickupDate,
  onSelectFlavor,
  onSelectDate,
  onConfirm,
  onClose,
}: Omit<Props, "isOpen">) => {
  if (!item) return null;

  return (
    <>
      <ModalHeader item={item} currentPrice={currentPrice} onClose={onClose} />

      <div className="mt-7">
        <p className="text-sm font-sans tracking-[0.15em] text-gray-700 mb-3">
          口味
        </p>
        <FlavorPicker
          options={flavorOptions}
          selected={selectedFlavor}
          onSelect={onSelectFlavor}
        />
      </div>

      <div className="mt-6">
        <p className="text-sm font-sans tracking-[0.15em] text-gray-700 mb-3">
          取貨日期
        </p>
        <DatePicker
          selectedFlavor={selectedFlavor}
          dates={selectedFlavorDates}
          selectedDate={selectedPickupDate}
          onSelect={onSelectDate}
        />
      </div>
    </>
  );
};

export default AddToCartModalContent;

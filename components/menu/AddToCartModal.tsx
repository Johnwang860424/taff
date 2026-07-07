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
          className={`px-4 py-2 rounded-soft border text-sm font-sans transition-colors ${
            selected === flavor
              ? "border-primary bg-primary text-on-primary"
              : "border-outline-variant text-on-surface hover:border-primary"
          }`}
        >
          {flavor}
        </button>
      ))
    ) : (
      <p className="text-sm text-on-surface-variant/70 font-sans">此商品尚未設定口味</p>
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
      <p className="text-sm text-on-surface-variant/70 font-sans">請先選擇口味</p>
    ) : dates.length > 0 ? (
      dates.map((date) => (
        <button
          key={date}
          onClick={() => onSelect(date)}
          className={`px-4 py-2 rounded-soft border text-sm font-label tracking-[0.05em] transition-colors ${
            selectedDate === date
              ? "border-primary bg-primary text-on-primary"
              : "border-outline-variant text-on-surface hover:border-primary"
          }`}
        >
          {date}
        </button>
      ))
    ) : (
      <p className="text-sm text-on-surface-variant/70 font-sans">
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
      <p className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant mb-2">
        Add To Cart
      </p>
      <h3 className="font-serif text-3xl text-on-surface">{item.name}</h3>
      <p className="font-label text-sm tracking-[0.1em] text-primary mt-2">
        {currentPrice !== null ? `$ ${currentPrice}` : getPriceDisplay(item)}
      </p>
    </div>
    <button
      onClick={onClose}
      className="h-9 w-9 rounded-soft border border-ghost-line flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-outline transition-colors"
      aria-label="關閉視窗"
    >
      <X size={18} strokeWidth={1} />
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
        <p className="font-label text-xs tracking-[0.1em] uppercase text-on-surface-variant mb-3">
          口味
        </p>
        <FlavorPicker
          options={flavorOptions}
          selected={selectedFlavor}
          onSelect={onSelectFlavor}
        />
      </div>

      <div className="mt-6">
        <p className="font-label text-xs tracking-[0.1em] uppercase text-on-surface-variant mb-3">
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

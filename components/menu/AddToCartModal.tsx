"use client";

import { X } from "lucide-react";
import type { MenuItem } from "@/lib/menu-utils";
import { getPriceDisplay } from "@/lib/menu-utils";

type Props = {
  item: MenuItem | null;
  currentPrice: number | null;
  flavorOptions: string[];
  selectedFlavor: string;
  selectedFlavorDates: string[];
  selectedPickupDate: string;
  onSelectFlavor: (flavor: string) => void;
  onSelectDate: (date: string) => void;
  onClose: () => void;
};

const chipClass = (active: boolean) =>
  `px-4 py-2.5 rounded-soft border text-sm transition-colors ${
    active
      ? "bg-primary border-primary text-on-primary"
      : "bg-transparent border-ghost-line text-on-surface hover:border-primary"
  }`;

const FlavorPicker = ({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (f: string) => void;
}) => (
  <div className="flex flex-wrap gap-[9px]">
    {options.length > 0 ? (
      options.map((flavor) => (
        <button
          key={flavor}
          onClick={() => onSelect(flavor)}
          className={chipClass(selected === flavor)}
        >
          {flavor}
        </button>
      ))
    ) : (
      <p className="text-sm text-on-surface-variant/70">此商品尚未設定口味</p>
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
  <div className="flex flex-wrap gap-[9px]">
    {!selectedFlavor ? (
      <p className="text-sm text-on-surface-variant/70">請先選擇口味</p>
    ) : dates.length > 0 ? (
      dates.map((date) => (
        <button
          key={date}
          onClick={() => onSelect(date)}
          className={chipClass(selectedDate === date)}
        >
          {date}
        </button>
      ))
    ) : (
      <p className="text-sm text-on-surface-variant/70">
        此口味目前無可取貨日期
      </p>
    )}
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
  onClose,
}: Props) => {
  if (!item) return null;

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-[23px] text-on-surface">{item.name}</h3>
          <p className="mt-1.5 text-[15px] text-primary">
            {currentPrice !== null ? `$ ${currentPrice}` : getPriceDisplay(item)}
          </p>
        </div>
        <button
          onClick={onClose}
          className="h-[34px] w-[34px] flex-none rounded-soft border border-ghost-line flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-outline transition-colors"
          aria-label="關閉"
        >
          <X size={16} strokeWidth={1.4} />
        </button>
      </div>

      <p className="mt-[22px] mb-2.5 text-[13px] text-on-surface-variant">
        選擇口味
      </p>
      <FlavorPicker
        options={flavorOptions}
        selected={selectedFlavor}
        onSelect={onSelectFlavor}
      />

      <p className="mt-5 mb-2.5 text-[13px] text-on-surface-variant">
        取貨 / 出貨日
      </p>
      <DatePicker
        selectedFlavor={selectedFlavor}
        dates={selectedFlavorDates}
        selectedDate={selectedPickupDate}
        onSelect={onSelectDate}
      />
    </>
  );
};

export default AddToCartModalContent;

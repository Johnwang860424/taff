"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuData } from "@/lib/menu-utils";
import { getPriceDisplay } from "@/lib/menu-utils";
import { useMenuItemSelection } from "@/hooks/useMenuItemSelection";
import AddToCartDialog from "./AddToCartDialog";

const CATEGORY_NAMES: Record<keyof MenuData, string> = {
  shippableItems: "可宅配",
  pickupOnlyItems: "限自取",
};

const MenuDesktop = ({ data }: { data: MenuData }) => {
  const [activeCategory, setActiveCategory] =
    useState<keyof MenuData>("shippableItems");

  const selection = useMenuItemSelection();
  const { openModal } = selection;

  const categories = Object.keys(data) as Array<keyof MenuData>;

  return (
    <main className="max-w-[1120px] mx-auto px-12 pt-16 pb-[90px]">
      <h1 className="font-serif text-[44px] text-on-surface">季節嚴選</h1>
      <p className="mt-3 text-base text-on-surface-variant">
        每週更新，數量有限，建議提早預訂。
      </p>

      <div className="flex gap-3 mt-8 mb-10">
        {categories.map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`rounded-soft border px-[22px] py-[11px] text-[15px] transition-all active:scale-[0.98] ${
              activeCategory === key
                ? "bg-primary border-primary text-on-primary"
                : "bg-transparent border-ghost-line text-primary hover:border-primary"
            }`}
          >
            {CATEGORY_NAMES[key]}
          </button>
        ))}
      </div>

      {!data[activeCategory]?.length && (
        <p className="py-20 text-center text-base text-on-surface-variant">
          這個分類目前沒有品項，歡迎改天再來看看。
        </p>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
        {data[activeCategory]?.map((item, index) => (
          <div key={item.name}>
            <div className="relative aspect-square rounded-soft overflow-hidden">
              {item.img ? (
                <Image
                  alt={item.name}
                  src={item.img}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-primary-fixed" />
              )}
            </div>
            <div className="mt-[15px] flex items-baseline justify-between">
              <h3 className="font-serif text-[22px] text-on-surface">
                {item.name}
              </h3>
              <span className="text-base text-on-surface-variant">
                {getPriceDisplay(item)}
              </span>
            </div>
            {item.description && (
              <p className="mt-[7px] text-sm leading-[1.6] text-on-surface-variant">
                {item.description}
              </p>
            )}
            <button
              onClick={() => openModal(item, activeCategory)}
              className="w-full mt-4 bg-primary text-on-primary rounded-soft py-[13px] text-[14.5px] font-medium hover:bg-primary-dark active:scale-[0.98] transition-all"
            >
              加入購物車
            </button>
          </div>
        ))}
      </div>

      <AddToCartDialog selection={selection} />
    </main>
  );
};

export default MenuDesktop;

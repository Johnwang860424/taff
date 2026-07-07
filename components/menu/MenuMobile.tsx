"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuData } from "@/lib/menu-utils";
import { getPriceDisplay } from "@/lib/menu-utils";
import { useMenuItemSelection } from "@/hooks/useMenuItemSelection";
import AddToCartSheet from "./AddToCartSheet";

const CATEGORY_NAMES: Record<keyof MenuData, string> = {
  shippableItems: "可宅配",
  pickupOnlyItems: "限自取",
};

const MenuMobile = ({ data }: { data: MenuData }) => {
  const [activeCategory, setActiveCategory] =
    useState<keyof MenuData>("shippableItems");

  const selection = useMenuItemSelection();
  const { openModal } = selection;

  const categories = Object.keys(data) as Array<keyof MenuData>;

  return (
    <main className="relative">
      <div className="px-page pt-6 pb-2">
        <h1 className="font-serif text-[27px] text-on-surface">季節嚴選</h1>
        <p className="mt-1.5 text-sm text-on-surface-variant">
          每週更新，數量有限，建議提早預訂。
        </p>
      </div>

      {/* 分類 pills：黏在手機頂欄之下 */}
      <div className="sticky top-14 z-10 bg-background flex gap-2.5 px-page pt-3.5 pb-1.5">
        {categories.map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`rounded-soft border px-[18px] py-[9px] text-sm transition-all active:scale-[0.97] ${
              activeCategory === key
                ? "bg-primary border-primary text-on-primary"
                : "bg-transparent border-ghost-line text-primary"
            }`}
          >
            {CATEGORY_NAMES[key]}
          </button>
        ))}
      </div>

      <div className="px-page pt-2 pb-6 flex flex-col gap-5">
        {!data[activeCategory]?.length && (
          <p className="py-14 text-center text-sm text-on-surface-variant">
            這個分類目前沒有品項，歡迎改天再來看看。
          </p>
        )}
        {data[activeCategory]?.map((item, index) => (
          <div
            key={item.name}
            className="flex gap-[15px] items-center border-b border-ghost-line pb-5"
          >
            <div className="relative h-[104px] w-[104px] flex-none rounded-soft overflow-hidden">
              {item.img ? (
                <Image
                  alt={item.name}
                  src={item.img}
                  fill
                  priority={index < 2}
                  sizes="104px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-primary-fixed" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-on-surface">{item.name}</h3>
              {item.description && (
                <p className="mt-1 text-[12.5px] leading-[1.55] text-on-surface-variant">
                  {item.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-[15px] text-on-surface">
                  {getPriceDisplay(item)}
                </span>
                <button
                  onClick={() => openModal(item, activeCategory)}
                  className="bg-primary text-on-primary rounded-soft px-[18px] py-2 text-[13.5px] font-medium active:scale-95 transition-transform"
                >
                  加入
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddToCartSheet selection={selection} />
    </main>
  );
};

export default MenuMobile;

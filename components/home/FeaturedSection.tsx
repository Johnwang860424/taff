"use client";

import Image from "next/image";
import type { MenuData, MenuItem } from "@/lib/menu-utils";
import { getPriceDisplay } from "@/lib/menu-utils";
import { useMenuItemSelection } from "@/hooks/useMenuItemSelection";
import AddToCartSheet from "@/components/menu/AddToCartSheet";
import AddToCartDialog from "@/components/menu/AddToCartDialog";

/* 品項需帶原分類，加入購物車時才能標記 宅配/自取 */
export type FeaturedEntry = {
  item: MenuItem;
  category: keyof MenuData;
};

const FeaturedImage = ({ item, sizes }: { item: MenuItem; sizes: string }) =>
  item.img ? (
    <Image
      src={item.img}
      alt={item.name}
      fill
      sizes={sizes}
      className="object-cover"
    />
  ) : (
    <div className="absolute inset-0 bg-primary-fixed" />
  );

const FeaturedSection = ({
  entries,
  variant,
}: {
  entries: FeaturedEntry[];
  variant: "mobile" | "desktop";
}) => {
  const selection = useMenuItemSelection();
  const { openModal } = selection;

  if (variant === "mobile") {
    return (
      <>
        <div className="flex gap-3.5 overflow-x-auto px-5 pb-1.5 scrollbar-hide">
          {entries.map(({ item, category }) => (
            <button
              key={item.name}
              onClick={() => openModal(item, category)}
              className="flex-none w-[150px] text-left active:scale-[0.98] transition-transform"
            >
              <div className="relative h-[150px] w-[150px] rounded-soft overflow-hidden">
                <FeaturedImage item={item} sizes="150px" />
              </div>
              <p className="mt-2 font-serif text-base text-on-surface">
                {item.name}
              </p>
              <p className="mt-0.5 text-[13px] text-on-surface-variant">
                {getPriceDisplay(item)}
              </p>
            </button>
          ))}
        </div>

        <AddToCartSheet selection={selection} />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        {entries.map(({ item, category }) => (
          <button
            key={item.name}
            onClick={() => openModal(item, category)}
            className="group text-left"
          >
            <div className="relative aspect-[4/3] rounded-soft overflow-hidden">
              <FeaturedImage item={item} sizes="33vw" />
            </div>
            <div className="mt-3.5 flex items-baseline justify-between w-full">
              <h3 className="font-serif text-[21px] text-on-surface group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <span className="text-[15px] text-on-surface-variant">
                {getPriceDisplay(item)}
              </span>
            </div>
            {item.description && (
              <p className="mt-1.5 text-sm text-on-surface-variant">
                {item.description}
              </p>
            )}
          </button>
        ))}
      </div>

      <AddToCartDialog selection={selection} />
    </>
  );
};

export default FeaturedSection;

"use client";

import { useRef } from "react";
import type { MenuItemSelection } from "@/hooks/useMenuItemSelection";
import { AddToCartModalContent } from "./AddToCartModal";

/* 手機版底部彈出面板（backdrop + 可下滑關閉的 sheet + 確認按鈕） */
const AddToCartSheet = ({ selection }: { selection: MenuItemSelection }) => {
  const {
    selectedItem,
    selectedFlavor,
    selectedPickupDate,
    isModalOpen,
    flavorOptions,
    currentPrice,
    selectedFlavorDates,
    closeModal,
    handleConfirm,
    selectFlavor,
    setSelectedPickupDate,
  } = selection;

  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  const canConfirm = !!(selectedFlavor && selectedPickupDate);

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
    <>
      {/* Bottom Sheet Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[rgba(43,36,30,.4)] transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      />

      {/* Bottom Sheet Panel */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 bg-background rounded-t-2xl border-t border-ghost-line px-[22px] pt-2 pb-[26px] max-h-[86vh] overflow-y-auto transition-transform duration-300 ease-out ${
          isModalOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {selectedItem && (
          <>
            <div className="w-[38px] h-1 bg-ghost-line rounded-full mx-auto mt-1.5 mb-4" />

            <AddToCartModalContent
              item={selectedItem}
              currentPrice={currentPrice}
              flavorOptions={flavorOptions}
              selectedFlavor={selectedFlavor}
              selectedFlavorDates={selectedFlavorDates}
              selectedPickupDate={selectedPickupDate}
              onSelectFlavor={selectFlavor}
              onSelectDate={setSelectedPickupDate}
              onClose={closeModal}
            />

            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className={`w-full mt-6 rounded-soft py-4 text-[15px] font-medium tracking-[0.04em] transition-all ${
                canConfirm
                  ? "bg-primary text-on-primary active:scale-[0.99]"
                  : "bg-ghost-line text-outline cursor-not-allowed"
              }`}
            >
              {canConfirm ? "加入購物車" : "請選擇口味與日期"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddToCartSheet;

"use client";

import type { MenuItemSelection } from "@/hooks/useMenuItemSelection";
import { AddToCartModalContent } from "./AddToCartModal";

/* 桌機版置中對話框（backdrop + 460px 卡片 + 確認按鈕） */
const AddToCartDialog = ({ selection }: { selection: MenuItemSelection }) => {
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

  const canConfirm = !!(selectedFlavor && selectedPickupDate);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[rgba(43,36,30,.4)] flex items-center justify-center p-6 transition-opacity duration-200 ${
        isModalOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={closeModal}
    >
      <div
        className={`w-[460px] max-w-full max-h-[88vh] overflow-y-auto bg-background rounded-lg p-[34px] shadow-[0_24px_70px_rgba(43,36,30,.28)] transition-all duration-200 ${
          isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedItem && (
          <>
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
              className={`w-full mt-[26px] rounded-soft py-4 text-[15px] font-medium tracking-[0.03em] transition-all ${
                canConfirm
                  ? "bg-primary text-on-primary hover:bg-primary-dark active:scale-[0.99]"
                  : "bg-ghost-line text-outline cursor-not-allowed"
              }`}
            >
              {canConfirm ? "加入購物車" : "請選擇口味與日期"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCartDialog;

"use client";

import { useState } from "react";
import type { MenuItem, MenuData } from "@/lib/menu-utils";
import { isDateExpired } from "@/lib/menu-utils";
import { useCart, cartItemKey } from "@/context/CartContext";

const ADDED_FEEDBACK_MS = 1500;

export function useMenuItemSelection() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<keyof MenuData>("shippableItems");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedPickupDate, setSelectedPickupDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedKey, setAddedKey] = useState<string | null>(null);

  const { addItem } = useCart();

  const flavorOptions = [
    ...new Set(selectedItem?.flavorSchedules.flatMap((fs) => fs.flavor) || []),
  ];

  const selectedSchedule = selectedItem?.flavorSchedules.find((fs) =>
    fs.flavor.includes(selectedFlavor),
  );

  const currentPrice = selectedSchedule?.price ?? null;

  const selectedFlavorDates = (selectedSchedule?.dates ?? []).filter(
    (d) => !isDateExpired(d),
  );

  const openModal = (item: MenuItem, category: keyof MenuData) => {
    const options = [
      ...new Set(item.flavorSchedules.flatMap((fs) => fs.flavor)),
    ];
    setSelectedItem(item);
    setSelectedCategory(category);
    setSelectedFlavor(options.length === 1 ? options[0] : "");
    setSelectedPickupDate("");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    if (
      !selectedItem ||
      !selectedFlavor ||
      !selectedPickupDate ||
      currentPrice === null
    )
      return;

    const key = cartItemKey(
      selectedItem.name,
      selectedFlavor,
      selectedPickupDate,
    );

    addItem({
      name: selectedItem.name,
      price: currentPrice,
      img: selectedItem.img,
      category:
        selectedCategory === "shippableItems" ? "shippable" : "pickupOnly",
      flavor: selectedFlavor,
      pickupDate: selectedPickupDate,
    });

    setAddedKey(key);
    setTimeout(() => setAddedKey(null), ADDED_FEEDBACK_MS);
    closeModal();
  };

  const selectFlavor = (flavor: string) => {
    setSelectedFlavor(flavor);
    setSelectedPickupDate("");
  };

  return {
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
  };
}

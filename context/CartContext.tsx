"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type CartItem = {
  name: string;
  price: number;
  img: string;
  category: "shippable" | "pickupOnly";
  flavor: string;
  pickupDate: string;
  quantity: number;
};

export const cartItemKey = (
  name: string,
  flavor: string,
  pickupDate: string
) => `${name}::${flavor}::${pickupDate}`;

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (name: string, flavor: string, pickupDate: string) => void;
  updateQuantity: (name: string, flavor: string, pickupDate: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CART_STORAGE_KEY = "taff_cart";

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: CartItem[] = JSON.parse(raw);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parsed.filter((item) => new Date(item.pickupDate) >= today);
  } catch {
    return [];
  }
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return loadCart();
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    const key = cartItemKey(item.name, item.flavor, item.pickupDate);
    setItems((prev) => {
      const existing = prev.find(
        (i) => cartItemKey(i.name, i.flavor, i.pickupDate) === key
      );
      if (existing) {
        return prev.map((i) =>
          cartItemKey(i.name, i.flavor, i.pickupDate) === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback(
    (name: string, flavor: string, pickupDate: string) => {
      const key = cartItemKey(name, flavor, pickupDate);
      setItems((prev) =>
        prev.filter((i) => cartItemKey(i.name, i.flavor, i.pickupDate) !== key)
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (name: string, flavor: string, pickupDate: string, quantity: number) => {
      const key = cartItemKey(name, flavor, pickupDate);
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter(
            (i) => cartItemKey(i.name, i.flavor, i.pickupDate) !== key
          )
        );
      } else {
        setItems((prev) =>
          prev.map((i) =>
            cartItemKey(i.name, i.flavor, i.pickupDate) === key
              ? { ...i, quantity }
              : i
          )
        );
      }
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

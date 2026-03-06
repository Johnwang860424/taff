"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDeliveryBadge from "@/components/cart/CartDeliveryBadge";
import CartItemList from "@/components/cart/CartItemList";
import CartOrderForm from "@/components/cart/CartOrderForm";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [userDeliveryChoice, setUserDeliveryChoice] = useState<"pickup" | "shippable">("shippable");

  const hasPickupOnly = items.some((i) => i.category === "pickupOnly");
  const hasShippable = items.some((i) => i.category === "shippable");
  const isForced = hasPickupOnly;
  const deliveryMethod: "pickup" | "shippable" = isForced ? "pickup" : userDeliveryChoice;
  const isMixedCart = hasPickupOnly && hasShippable;

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-8 bg-background-light">
        <div className="text-center space-y-4">
          <p className="text-5xl">☁️</p>
          <h1 className="font-serif text-3xl tracking-widest text-primary">訂單已送出</h1>
          <p className="text-sm tracking-widest text-gray-500 font-sans">
            感謝您的訂購，我們會盡快與您聯繫確認細節。
          </p>
        </div>
        <Link
          href="/menu"
          className="mt-4 text-xs tracking-[0.25em] uppercase text-accent-gold border-b border-accent-gold/40 pb-0.5 hover:border-accent-gold transition-colors"
        >
          繼續選購
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-8 bg-background-light">
        <ShoppingBag size={48} strokeWidth={1} className="text-gray-300" />
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl tracking-widest text-gray-500">購物車是空的</h1>
          <p className="text-sm tracking-widest text-gray-400 font-sans">去挑幾款甜點吧</p>
        </div>
        <Link
          href="/menu"
          className="mt-2 text-xs tracking-[0.25em] uppercase text-accent-gold border-b border-accent-gold/40 pb-0.5 hover:border-accent-gold transition-colors"
        >
          前往季節嚴選
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 px-8 pb-8 md:px-24 md:pt-28 md:pb-16 bg-background-light">
      <div className="mx-auto">
        <div className="mb-6">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">Your Cart</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-widest font-light">
            購物車
          </h1>
        </div>

        <CartDeliveryBadge
          deliveryMethod={deliveryMethod}
          isMixedCart={isMixedCart}
          isForced={isForced}
          onDeliveryChange={setUserDeliveryChoice}
        />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <CartItemList
            items={items}
            totalPrice={totalPrice}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
          <CartOrderForm
            deliveryMethod={deliveryMethod}
            clearCart={clearCart}
            onSubmitSuccess={() => setSubmitted(true)}
          />
        </div>
      </div>
    </main>
  );
}

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
      <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-8 bg-background-light">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl tracking-widest text-primary">訂單已送出</h1>
          <p className="text-sm tracking-widest text-gray-500 font-sans">
            感謝您的訂購！
          </p>
        </div>

        <div className="border border-accent-gold/30 bg-accent-gold/5 rounded-sm px-8 py-6 max-w-sm w-full text-center space-y-3">
          <p className="text-xs tracking-[0.2em] uppercase text-accent-gold font-sans">下一步</p>
          <p className="text-sm text-primary/80 font-sans leading-relaxed tracking-wide">
            請私訊我們的社群帳號，<br />
            以取得匯款帳號及完成後續訂單確認。
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href="https://www.facebook.com/p/%E5%A1%94%E8%8A%99-TAFF-100083549960649/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-white bg-[#1877F2] hover:bg-[#166FE5] transition-colors px-5 py-2.5 rounded-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook 私訊
            </a>
            <a
              href="https://www.instagram.com/taff__dessert/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 transition-opacity px-5 py-2.5 rounded-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram 私訊
            </a>
          </div>
        </div>

        <Link
          href="/menu"
          className="text-xs tracking-[0.25em] uppercase text-accent-gold border-b border-accent-gold/40 pb-0.5 hover:border-accent-gold transition-colors"
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

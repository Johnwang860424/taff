"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDeliveryBadge from "@/components/cart/CartDeliveryBadge";
import CartItemList from "@/components/cart/CartItemList";
import CartOrderForm from "@/components/cart/CartOrderForm";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [userDeliveryChoice, setUserDeliveryChoice] = useState<"pickup" | "shippable">("shippable");

  const hasPickupOnly = items.some((i) => i.category === "pickupOnly");
  const isForced = hasPickupOnly;
  const deliveryMethod: "pickup" | "shippable" = isForced ? "pickup" : userDeliveryChoice;

  if (submitted) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-14">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 md:w-[62px] md:h-[62px] rounded-full bg-primary-fixed flex items-center justify-center mb-1.5">
            <Check size={28} strokeWidth={1.6} className="text-primary" />
          </div>
          <h1 className="font-serif text-2xl md:text-[34px] text-on-surface">
            訂單已送出
          </h1>
          <p className="text-sm md:text-base leading-[1.8] text-on-surface-variant">
            謝謝你的訂購。
            <br className="md:hidden" />
            再麻煩私訊我們，確認匯款與後續細節。
          </p>

          <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 w-full max-w-[280px] md:w-auto md:max-w-none mt-5">
            <a
              href="https://www.instagram.com/taff__dessert/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-primary text-primary rounded-soft px-6 py-[13px] text-sm hover:bg-surface-container transition-colors"
            >
              <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram 私訊
            </a>
            <Link
              href="/menu"
              className="text-sm text-on-surface-variant underline underline-offset-[3px] py-1.5 md:no-underline md:border md:border-ghost-line md:rounded-soft md:px-6 md:py-[13px] md:hover:bg-surface-container md:transition-colors"
            >
              繼續選購
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <ShoppingBag size={44} strokeWidth={1.2} className="text-outline" />
        <p className="font-serif text-xl md:text-2xl text-on-surface-variant">
          購物車是空的
        </p>
        <Link
          href="/menu"
          className="bg-primary text-on-primary rounded-soft px-7 py-3 text-sm md:text-[15px] hover:bg-primary-dark transition-colors"
        >
          去挑幾款甜點
        </Link>
      </main>
    );
  }

  return (
    <main className="px-page pt-6 md:pb-8 lg:px-12 lg:pt-16 lg:pb-[90px]">
      <div className="lg:max-w-[1040px] lg:mx-auto">
        <h1 className="font-serif text-[27px] lg:text-[44px] text-on-surface mb-4 lg:mb-7">
          購物車
        </h1>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-16 lg:items-start">
          <div>
            <CartDeliveryBadge
              deliveryMethod={deliveryMethod}
              isForced={isForced}
              onDeliveryChange={setUserDeliveryChoice}
            />
            <CartItemList
              items={items}
              totalPrice={totalPrice}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </div>

          <div className="pt-6 border-t border-ghost-line lg:pt-8 lg:border-t-0 lg:bg-surface-container lg:border lg:border-ghost-line lg:rounded-md lg:p-8">
            <CartOrderForm
              deliveryMethod={deliveryMethod}
              totalPrice={totalPrice}
              clearCart={clearCart}
              onSubmitSuccess={() => setSubmitted(true)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

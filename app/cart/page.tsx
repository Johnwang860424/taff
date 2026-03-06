"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cartItemKey } from "@/context/CartContext";

type OrderForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
};

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    totalPrice,
    clearCart,
  } = useCart();
  const hasPickupOnly = items.some((i) => i.category === "pickupOnly");
  const hasShippable = items.some((i) => i.category === "shippable");
  const deliveryMethod: "pickup" | "shippable" = hasPickupOnly ? "pickup" : "shippable";
  const isMixedCart = hasPickupOnly && hasShippable;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<OrderForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof OrderForm, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderForm, string>> = {};
    if (!form.name.trim()) {
      newErrors.name = "請輸入姓名";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "請輸入電話";
    } else if (!/^09\d{8}$/.test(form.phone.trim())) {
      newErrors.phone = "電話格式錯誤，請輸入 09 開頭的 10 碼手機號碼";
    }
    if (!form.email.trim()) {
      newErrors.email = "請輸入 Email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Email 格式錯誤";
    }
    if (deliveryMethod === "shippable" && !form.address.trim()) {
      newErrors.address = "請輸入收件地址";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // 這裡之後可以接 API 送出訂單，例如：
    // await fetch('/api/order', { method: 'POST', body: JSON.stringify({ items, form, totalPrice }) })
    await new Promise((r) => setTimeout(r, 800)); // 模擬送出延遲
    clearCart();
    setSubmitted(true);
    setIsSubmitting(false);
  };

  // 訂單送出成功畫面
  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-8 bg-background-light">
        <div className="text-center space-y-4">
          <p className="text-5xl">☁️</p>
          <h1 className="font-serif text-3xl tracking-widest text-primary">
            訂單已送出
          </h1>
          <p className="text-sm tracking-widest text-gray-500 dark:text-gray-400 font-sans">
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

  // 購物車空
  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-8 bg-background-light">
        <ShoppingBag
          size={48}
          strokeWidth={1}
          className="text-gray-300 dark:text-gray-600"
        />
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl tracking-widest text-gray-500 dark:text-gray-400">
            購物車是空的
          </h1>
          <p className="text-sm tracking-widest text-gray-400 dark:text-gray-500 font-sans">
            去挑幾款甜點吧
          </p>
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
    <main className="min-h-screen p-8 pt-24 md:p-24 md:py-16 bg-background-light">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">
            Your Cart
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-widest font-light">
            購物車
          </h1>
        </div>

        {/* 取貨方式提示 */}
        <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-8 text-sm font-sans ${
          deliveryMethod === "pickup"
            ? "bg-amber-50 border border-amber-200 text-amber-800"
            : "bg-sky-50 border border-sky-200 text-sky-800"
        }`}>
          {deliveryMethod === "pickup" ? (
            <MapPin size={16} className="shrink-0" />
          ) : (
            <Truck size={16} className="shrink-0" />
          )}
          <span className="tracking-wider">
            取貨方式：
            <strong className="ml-1">
              {deliveryMethod === "pickup" ? "自取" : "宅配"}
            </strong>
          </span>
          {isMixedCart && (
            <span className="ml-1 text-xs text-amber-600 border-l border-amber-300 pl-3">
              購物車含自取商品，此單須親自取貨
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* 左：商品清單 */}
          <section>
            <div className="divide-y divide-primary/10">
              {items.map((item) => (
                <div
                  key={cartItemKey(item.name, item.flavor, item.pickupDate)}
                  className="py-6 flex items-center gap-4"
                >
                  {/* 商品圖片 */}
                  {item.img && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}

                  {/* 名稱 + 分類 */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg md:text-xl font-light text-gray-800 dark:text-gray-300 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs tracking-widest text-gray-500 dark:text-gray-500 font-sans mt-0.5">
                      {item.category === "shippable" ? "可宅配" : "限自取"}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="inline-block bg-accent-gold/10 text-accent-gold text-xs font-sans px-2 py-0.5 rounded-full">
                        {item.flavor}
                      </span>
                      <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-sans px-2 py-0.5 rounded-full">
                        {item.pickupDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 font-sans mt-1">
                      $ {item.price}
                    </p>
                  </div>

                  {/* 數量控制 */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.name,
                          item.flavor,
                          item.pickupDate,
                          item.quantity - 1,
                        )
                      }
                      className="w-7 h-7 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 md:hover:border-accent-gold md:hover:text-accent-gold transition-colors active:scale-95"
                      aria-label="減少數量"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-sm font-sans text-gray-800 dark:text-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.name,
                          item.flavor,
                          item.pickupDate,
                          item.quantity + 1,
                        )
                      }
                      className="w-7 h-7 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 md:hover:border-accent-gold md:hover:text-accent-gold transition-colors active:scale-95"
                      aria-label="增加數量"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* 小計 */}
                  <p className="w-16 text-right text-sm font-sans text-gray-800 dark:text-gray-300 shrink-0">
                    $ {item.price * item.quantity}
                  </p>

                  {/* 刪除 */}
                  <button
                    onClick={() =>
                      removeItem(item.name, item.flavor, item.pickupDate)
                    }
                    className="text-gray-400 dark:text-gray-500 md:hover:text-accent-gold active:text-red transition-colors shrink-0"
                    aria-label={`移除 ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* 總金額 */}
            <div className="border-t border-primary/10 pt-6 flex justify-between items-baseline">
              <span className="text-xs tracking-[0.25em] uppercase text-primary/40 font-sans">
                Total
              </span>
              <span className="font-serif text-3xl text-primary">
                $ {totalPrice}
              </span>
            </div>
          </section>

          {/* 右：聯絡 / 收件資訊 */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 pb-2 border-b border-accent-gold inline-block pr-8">
              {deliveryMethod === "pickup" ? "取件資訊" : "收件資訊"}
              <span className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase ml-2">
                {deliveryMethod === "pickup" ? "Pickup Information" : "Shipping Information"}
              </span>
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {(
                [
                  {
                    name: "name",
                    label: "姓名",
                    type: "text",
                    placeholder: "請輸入姓名",
                    required: true,
                  },
                  {
                    name: "phone",
                    label: "電話",
                    type: "tel",
                    placeholder: "例：0912345678",
                    required: true,
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "例：example@mail.com",
                    required: true,
                  },
                  {
                    name: "address",
                    label: deliveryMethod === "pickup" ? "地址（選填）" : "地址",
                    type: "text",
                    placeholder: deliveryMethod === "pickup" ? "自取可免填" : "請輸入收件地址",
                    required: deliveryMethod === "shippable",
                  },
                ] as Array<{
                  name: keyof OrderForm;
                  label: string;
                  type: string;
                  placeholder: string;
                  required: boolean;
                }>
              ).map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-sans">
                    {field.label}{" "}
                    {field.required && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={(e) => {
                      handleChange(e);
                      if (errors[field.name]) {
                        setErrors((prev) => ({
                          ...prev,
                          [field.name]: undefined,
                        }));
                      }
                    }}
                    placeholder={field.placeholder}
                    className={`border-b ${
                      errors[field.name]
                        ? "border-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    } bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 dark:text-gray-300 placeholder:text-gray-400`}
                  />
                  {errors[field.name] && (
                    <p className="text-xs md:text-sm text-red-400 font-sans">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-sans">
                  備註
                </label>
                <textarea
                  name="note"
                  rows={3}
                  value={form.note}
                  onChange={handleChange}
                  className="border-b border-gray-300 dark:border-gray-700 bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 dark:text-gray-300 resize-none placeholder:text-gray-400"
                  placeholder="口味偏好、取貨時間等..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-accent-gold text-white rounded-xl shadow-md py-4 tracking-[0.25em] text-xs uppercase font-sans hover:bg-accent-gold/80 hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "送出中..." : "送出訂單"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";

type OrderForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
};

type Props = {
  deliveryMethod: "pickup" | "shippable";
  clearCart: () => void;
  onSubmitSuccess: () => void;
};

const FIELDS = (deliveryMethod: "pickup" | "shippable") =>
  [
    { name: "name", label: "姓名", type: "text", placeholder: "請輸入姓名", required: true },
    { name: "phone", label: "電話", type: "tel", placeholder: "例：0912345678", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "例：example@mail.com", required: true },
    {
      name: "address",
      label: deliveryMethod === "pickup" ? "地址（選填）" : "地址",
      type: "text",
      placeholder: deliveryMethod === "pickup" ? "自取可免填" : "請輸入收件地址",
      required: deliveryMethod === "shippable",
    },
  ] as Array<{ name: keyof OrderForm; label: string; type: string; placeholder: string; required: boolean }>;

const CartOrderForm = ({ deliveryMethod, clearCart, onSubmitSuccess }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<OrderForm>({ name: "", phone: "", email: "", address: "", note: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderForm, string>> = {};
    if (!form.name.trim()) newErrors.name = "請輸入姓名";
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
    // await fetch('/api/order', { method: 'POST', body: JSON.stringify({ form, deliveryMethod }) })
    await new Promise((r) => setTimeout(r, 800));
    clearCart();
    onSubmitSuccess();
    setIsSubmitting(false);
  };

  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 pb-2 border-b border-accent-gold inline-block pr-8">
        {deliveryMethod === "pickup" ? "取件資訊" : "收件資訊"}
        <span className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase ml-2">
          {deliveryMethod === "pickup" ? "Pickup Information" : "Shipping Information"}
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {FIELDS(deliveryMethod).map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 font-sans">
              {field.label}{" "}
              {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={(e) => {
                handleChange(e);
                if (errors[field.name]) setErrors((prev) => ({ ...prev, [field.name]: undefined }));
              }}
              placeholder={field.placeholder}
              className={`border-b ${
                errors[field.name] ? "border-red-400" : "border-gray-300"
              } bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 placeholder:text-gray-400`}
            />
            {errors[field.name] && (
              <p className="text-xs md:text-sm text-red-400 font-sans">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 font-sans">
            備註
          </label>
          <textarea
            name="note"
            rows={3}
            value={form.note}
            onChange={handleChange}
            className="border-b border-gray-300 bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 resize-none placeholder:text-gray-400"
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
  );
};

export default CartOrderForm;

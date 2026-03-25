"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Facebook, Instagram, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

type OrderForm = {
  name: string;
  phone: string;
  address: string;
  note: string;
  socialPlatform: "facebook" | "instagram";
  socialUsername: string;
};

const getOrderFormSchema = (deliveryMethod: "pickup" | "shippable") =>
  z
    .object({
      name: z.string().min(1, "請輸入姓名"),
      phone: z
        .string()
        .min(1, "請輸入電話")
        .regex(/^09\d{8}$/, "電話格式錯誤，請輸入 09 開頭的 10 碼手機號碼"),
      address:
        deliveryMethod === "shippable"
          ? z.string().min(1, "請輸入收件地址")
          : z.string(),
      note: z.string(),
      socialPlatform: z.enum(["facebook", "instagram"]),
      socialUsername: z.string().min(1, "請輸入帳號名稱"),
    })
    .superRefine((data, ctx) => {
      const username = extractUsername(
        data.socialPlatform,
        data.socialUsername,
      );
      if (
        data.socialPlatform === "facebook" &&
        !/^[a-zA-Z0-9.]{5,50}$/.test(username)
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "找不到有效的 Facebook 帳號，請輸入帳號名稱或貼上個人主頁網址",
          path: ["socialUsername"],
        });
      } else if (
        data.socialPlatform === "instagram" &&
        !/^[a-zA-Z0-9._]{1,30}$/.test(username)
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "找不到有效的 Instagram 帳號，請輸入帳號名稱或貼上個人主頁網址",
          path: ["socialUsername"],
        });
      }
    });

// ── 從 URL 或純帳號名稱中提取 username ────────────────────────
const PLATFORM_URL_RE: Record<"facebook" | "instagram", RegExp> = {
  facebook: /(?:facebook\.com|fb\.com)\/(?!profile\.php)([a-zA-Z0-9.]{1,50})/,
  instagram: /instagram\.com\/([a-zA-Z0-9._]{1,30})/,
};

const extractUsername = (
  platform: "facebook" | "instagram",
  raw: string,
): string => {
  const trimmed = raw.trim();
  const match = trimmed.match(PLATFORM_URL_RE[platform]);
  if (match) return match[1];
  return trimmed.replace(/^@/, "");
};

type Props = {
  deliveryMethod: "pickup" | "shippable";
  clearCart: () => void;
  onSubmitSuccess: () => void;
};

const FIELDS = (deliveryMethod: "pickup" | "shippable") =>
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
      name: "address",
      label: deliveryMethod === "pickup" ? "地址（選填）" : "地址",
      type: "text",
      placeholder:
        deliveryMethod === "pickup" ? "自取可免填" : "請輸入收件地址",
      required: deliveryMethod === "shippable",
    },
  ] as Array<{
    name: keyof OrderForm;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;

const CartOrderForm = ({
  deliveryMethod,
  clearCart,
  onSubmitSuccess,
}: Props) => {
  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<
    "validating" | "submitting" | null
  >(null);
  const [form, setForm] = useState<OrderForm>({
    name: "",
    phone: "",
    address: "",
    note: "",
    socialPlatform: "instagram",
    socialUsername: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof OrderForm, string>>
  >({});
  const [submitError, setSubmitError] = useState<{
    title: string;
    items: string[];
  } | null>(null);

  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const platformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        platformRef.current &&
        !platformRef.current.contains(e.target as Node)
      )
        setIsPlatformOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const clearSocialErrors = () =>
    setErrors((prev) => ({
      ...prev,
      socialPlatform: undefined,
      socialUsername: undefined,
    }));

  const validate = (): boolean => {
    const schema = getOrderFormSchema(deliveryMethod);
    const result = schema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors = result.error.flatten().fieldErrors as Partial<
      Record<keyof OrderForm, string[]>
    >;
    const newErrors: Partial<Record<keyof OrderForm, string>> = {};
    for (const [k, v] of Object.entries(fieldErrors))
      if (v?.[0]) newErrors[k as keyof OrderForm] = v[0];
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const platform = form.socialPlatform;
    const cleanUsername = extractUsername(platform, form.socialUsername);

    try {
      // ── 社群帳號存在性驗證 ──────────────────────────────────
      setSubmitStep("validating");
      const socialErrors: string[] = [];

      await fetch(
        `/api/social-validate?platform=${platform}&username=${encodeURIComponent(cleanUsername)}`,
      )
        .then((r) => r.json())
        .then((data) => {
          if (data.exists === false)
            socialErrors.push(
              `找不到 ${platform === "facebook" ? "Facebook" : "Instagram"} 帳號「${cleanUsername}」，請確認後再試。`,
            );
        })
        .catch(() => {});

      if (socialErrors.length > 0) {
        setSubmitError({ title: "帳號驗證失敗", items: socialErrors });
        return;
      }

      // ── 送出訂單 ────────────────────────────────────────────
      setSubmitStep("submitting");
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: {
            name: form.name,
            phone: form.phone,
            address: form.address,
            note: form.note,
            facebook: platform === "facebook" ? cleanUsername : "",
            instagram: platform === "instagram" ? cleanUsername : "",
          },
          deliveryMethod,
          items,
        }),
      });

      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        setSubmitError({
          title: "庫存不足",
          items: data.items ?? ["部分品項庫存不足，請調整數量後再試。"],
        });
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError({
          title: "送出失敗",
          items: [data.detail ?? data.error ?? "送出失敗，請稍後再試。"],
        });
        return;
      }

      clearCart();
      onSubmitSuccess();
    } catch (err) {
      console.error(err);
      setSubmitError({ title: "網路錯誤", items: ["網路錯誤，請稍後再試。"] });
    } finally {
      setIsSubmitting(false);
      setSubmitStep(null);
    }
  };

  const buttonLabel =
    submitStep === "validating"
      ? "驗證帳號中..."
      : submitStep === "submitting"
        ? "送出中..."
        : "送出訂單";

  const socialHasError = !!(errors.socialPlatform || errors.socialUsername);

  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 pb-2 border-b border-accent-gold inline-block pr-8">
        {deliveryMethod === "pickup" ? "取件資訊" : "收件資訊"}
        <span className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase ml-2">
          {deliveryMethod === "pickup"
            ? "Pickup Information"
            : "Shipping Information"}
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* 姓名、電話 */}
        {FIELDS(deliveryMethod)
          .slice(0, 2)
          .map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 font-sans">
                {field.label}{" "}
                {field.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name] as string}
                onChange={(e) => {
                  handleChange(e);
                  if (errors[field.name])
                    setErrors((prev) => ({ ...prev, [field.name]: undefined }));
                }}
                placeholder={field.placeholder}
                className={`border-b ${
                  errors[field.name] ? "border-red-400" : "border-gray-300"
                } bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 placeholder:text-gray-400`}
              />
              {errors[field.name] && (
                <p className="text-xs md:text-sm text-red-400 font-sans">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

        {/* ── 社群帳號 ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 font-sans">
            社群帳號 <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-3 items-end">
            {/* 自訂下拉選單 */}
            <div className="relative w-36 shrink-0" ref={platformRef}>
              <button
                type="button"
                onClick={() => setIsPlatformOpen((o) => !o)}
                className={`w-full flex items-center justify-between gap-2 border-b ${
                  socialHasError ? "border-red-400" : "border-gray-300"
                } py-3 text-base font-sans text-gray-800 focus:outline-none focus:border-accent-gold transition-colors`}
              >
                <span className="flex items-center gap-2">
                  {form.socialPlatform === "facebook" ? (
                    <Facebook size={14} className="text-blue-500 shrink-0" />
                  ) : (
                    <Instagram size={14} className="text-pink-500 shrink-0" />
                  )}
                  <span>
                    {form.socialPlatform === "facebook"
                      ? "Facebook"
                      : "Instagram"}
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isPlatformOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isPlatformOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 z-20 w-full bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
                  {(
                    [
                      {
                        value: "instagram",
                        label: "Instagram",
                        icon: <Instagram size={14} className="text-pink-500" />,
                      },
                      {
                        value: "facebook",
                        label: "Facebook",
                        icon: <Facebook size={14} className="text-blue-500" />,
                      },
                    ] as const
                  ).map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          socialPlatform: value,
                        }));
                        clearSocialErrors();
                        setIsPlatformOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-sans transition-colors ${
                        form.socialPlatform === value
                          ? "bg-accent-gold/5 text-accent-gold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {icon}
                      {label}
                      {form.socialPlatform === value && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 帳號輸入框 */}
            <input
              type="text"
              name="socialUsername"
              value={form.socialUsername}
              onChange={(e) => {
                handleChange(e);
                clearSocialErrors();
              }}
              onBlur={() => {
                const normalized = extractUsername(
                  form.socialPlatform,
                  form.socialUsername,
                );
                if (normalized !== form.socialUsername)
                  setForm((prev) => ({ ...prev, socialUsername: normalized }));
              }}
              placeholder={
                form.socialPlatform === "instagram"
                  ? "帳號或網址，例：@john.doe"
                  : "帳號或網址，例：john.doe"
              }
              className={`flex-1 border-b ${
                socialHasError ? "border-red-400" : "border-gray-300"
              } bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 placeholder:text-gray-400`}
            />
          </div>
          {socialHasError && (
            <p className="text-xs md:text-sm text-red-400 font-sans">
              {errors.socialPlatform ?? errors.socialUsername}
            </p>
          )}
        </div>

        {/* 地址 */}
        {FIELDS(deliveryMethod)
          .slice(2)
          .map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 font-sans">
                {field.label}{" "}
                {field.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name] as string}
                onChange={(e) => {
                  handleChange(e);
                  if (errors[field.name])
                    setErrors((prev) => ({ ...prev, [field.name]: undefined }));
                }}
                placeholder={field.placeholder}
                className={`border-b ${
                  errors[field.name] ? "border-red-400" : "border-gray-300"
                } bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 placeholder:text-gray-400`}
              />
              {errors[field.name] && (
                <p className="text-xs md:text-sm text-red-400 font-sans">
                  {errors[field.name]}
                </p>
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

        {submitError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex flex-col gap-1">
            <p className="text-xs font-sans tracking-[0.15em] uppercase text-red-500 mb-1">
              {submitError.title}
            </p>
            {submitError.items.map((msg, i) => (
              <p key={i} className="text-sm font-sans text-red-600">
                {msg}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-accent-gold text-white rounded-xl shadow-md py-4 tracking-[0.25em] text-xs uppercase font-sans hover:bg-accent-gold/80 hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonLabel}
        </button>
      </form>
    </section>
  );
};

export default CartOrderForm;

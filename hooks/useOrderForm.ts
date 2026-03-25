"use client";

import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/context/CartContext";

export type OrderFormData = {
  name: string;
  phone: string;
  address: string;
  note: string;
  socialPlatform: "facebook" | "instagram";
  socialUsername: string;
};

// ── Username extraction ────────────────────────────────────────

const PLATFORM_URL_RE: Record<"facebook" | "instagram", RegExp> = {
  facebook: /(?:facebook\.com|fb\.com)\/(?!profile\.php)([a-zA-Z0-9.]{1,50})/,
  instagram: /instagram\.com\/([a-zA-Z0-9._]{1,30})/,
};

export const extractUsername = (
  platform: "facebook" | "instagram",
  raw: string,
): string => {
  const trimmed = raw.trim();
  const match = trimmed.match(PLATFORM_URL_RE[platform]);
  if (match) return match[1];
  return trimmed.replace(/^@/, "");
};

// ── Validation schema ──────────────────────────────────────────

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
      const username = extractUsername(data.socialPlatform, data.socialUsername);
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

// ── Hook ───────────────────────────────────────────────────────

export type SubmitError = { title: string; items: string[] };

export function useOrderForm(
  deliveryMethod: "pickup" | "shippable",
  clearCart: () => void,
  onSubmitSuccess: () => void,
) {
  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<
    "validating" | "submitting" | null
  >(null);
  const [form, setForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    address: "",
    note: "",
    socialPlatform: "instagram",
    socialUsername: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof OrderFormData, string>>
  >({});
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const clearFieldError = (field: keyof OrderFormData) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

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
      Record<keyof OrderFormData, string[]>
    >;
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};
    for (const [k, v] of Object.entries(fieldErrors))
      if (v?.[0]) newErrors[k as keyof OrderFormData] = v[0];
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
      // Social account validation
      setSubmitStep("validating");
      const socialRes = await fetch(
        `/api/social-validate?platform=${platform}&username=${encodeURIComponent(cleanUsername)}`,
      ).then((r) => r.json()).catch(() => ({}));

      if (socialRes.exists === false) {
        setSubmitError({
          title: "帳號驗證失敗",
          items: [
            `找不到 ${platform === "facebook" ? "Facebook" : "Instagram"} 帳號「${cleanUsername}」，請確認後再試。`,
          ],
        });
        return;
      }

      // Submit order
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

  const normalizeSocialUsername = () => {
    const normalized = extractUsername(form.socialPlatform, form.socialUsername);
    if (normalized !== form.socialUsername)
      setForm((prev) => ({ ...prev, socialUsername: normalized }));
  };

  const setSocialPlatform = (value: "facebook" | "instagram") => {
    setForm((prev) => ({ ...prev, socialPlatform: value }));
    clearSocialErrors();
  };

  const buttonLabel =
    submitStep === "validating"
      ? "驗證帳號中..."
      : submitStep === "submitting"
        ? "送出中..."
        : "送出訂單";

  return {
    form,
    errors,
    submitError,
    isSubmitting,
    buttonLabel,
    handleChange,
    handleSubmit,
    clearFieldError,
    clearSocialErrors,
    normalizeSocialUsername,
    setSocialPlatform,
  };
}

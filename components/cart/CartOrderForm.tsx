"use client";

import { useOrderForm, type OrderFormData } from "@/hooks/useOrderForm";
import SocialPlatformSelect from "./SocialPlatformSelect";

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
    name: keyof OrderFormData;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;

// ── Reusable form field ────────────────────────────────────────

const FormField = ({
  field,
  value,
  error,
  onChange,
}: {
  field: (typeof FIELDS extends (...args: never[]) => infer R ? R : never)[number];
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 font-sans">
      {field.label}{" "}
      {field.required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={field.type}
      name={field.name}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      className={`border-b ${
        error ? "border-red-400" : "border-gray-300"
      } bg-transparent py-3 outline-none focus:border-accent-gold transition-colors text-base md:text-lg font-sans text-gray-800 placeholder:text-gray-400`}
    />
    {error && (
      <p className="text-xs md:text-sm text-red-400 font-sans">{error}</p>
    )}
  </div>
);

// ── Main component ─────────────────────────────────────────────

const CartOrderForm = ({
  deliveryMethod,
  clearCart,
  onSubmitSuccess,
}: Props) => {
  const {
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
  } = useOrderForm(deliveryMethod, clearCart, onSubmitSuccess);

  const socialHasError = !!(errors.socialPlatform || errors.socialUsername);
  const fields = FIELDS(deliveryMethod);

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
        {fields.slice(0, 2).map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={form[field.name] as string}
            error={errors[field.name]}
            onChange={(e) => {
              handleChange(e);
              if (errors[field.name]) clearFieldError(field.name);
            }}
          />
        ))}

        {/* 社群帳號 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 font-sans">
            社群帳號 <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-3 items-end">
            <SocialPlatformSelect
              value={form.socialPlatform}
              onChange={setSocialPlatform}
              hasError={socialHasError}
            />
            <input
              type="text"
              name="socialUsername"
              value={form.socialUsername}
              onChange={(e) => {
                handleChange(e);
                clearSocialErrors();
              }}
              onBlur={normalizeSocialUsername}
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
        {fields.slice(2).map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={form[field.name] as string}
            error={errors[field.name]}
            onChange={(e) => {
              handleChange(e);
              if (errors[field.name]) clearFieldError(field.name);
            }}
          />
        ))}

        {/* 備註 */}
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

        {/* 送出錯誤 */}
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

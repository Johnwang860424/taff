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
    <label className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant">
      {field.label}{" "}
      {field.required && <span className="text-error">*</span>}
    </label>
    <input
      type={field.type}
      name={field.name}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      className={`border-b ${
        error ? "border-error/60" : "border-ghost-line"
      } bg-transparent py-3 outline-none focus:border-primary transition-colors text-base font-sans text-on-surface placeholder:text-on-surface-variant/50`}
    />
    {error && (
      <p className="text-xs md:text-sm text-error font-sans">{error}</p>
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
      <h2 className="font-serif text-2xl md:text-3xl text-on-surface mb-6 pb-2 border-b border-ghost-line inline-block pr-8">
        {deliveryMethod === "pickup" ? "取件資訊" : "收件資訊"}
        <span className="font-label text-xs tracking-[0.15em] text-on-surface-variant uppercase ml-2">
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
          <label className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant">
            社群帳號 <span className="text-error">*</span>
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
                socialHasError ? "border-error/60" : "border-ghost-line"
              } bg-transparent py-3 outline-none focus:border-primary transition-colors text-base font-sans text-on-surface placeholder:text-on-surface-variant/50`}
            />
          </div>
          {socialHasError && (
            <p className="text-xs md:text-sm text-error font-sans">
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
          <label className="font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant">
            備註
          </label>
          <textarea
            name="note"
            rows={3}
            value={form.note}
            onChange={handleChange}
            className="border-b border-ghost-line bg-transparent py-3 outline-none focus:border-primary transition-colors text-base font-sans text-on-surface resize-none placeholder:text-on-surface-variant/50"
            placeholder="口味偏好、取貨時間等..."
          />
        </div>

        {/* 送出錯誤 */}
        {submitError && (
          <div className="rounded-soft border border-error/30 bg-error/5 px-4 py-3 flex flex-col gap-1">
            <p className="font-label text-xs tracking-[0.1em] uppercase text-error mb-1">
              {submitError.title}
            </p>
            {submitError.items.map((msg, i) => (
              <p key={i} className="text-sm font-sans text-error">
                {msg}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-primary text-on-primary rounded-soft py-4 tracking-[0.25em] text-xs uppercase font-sans hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonLabel}
        </button>
      </form>
    </section>
  );
};

export default CartOrderForm;

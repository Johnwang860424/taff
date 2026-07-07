"use client";

import { useOrderForm, type OrderFormData } from "@/hooks/useOrderForm";
import SocialPlatformSelect from "./SocialPlatformSelect";

type Props = {
  deliveryMethod: "pickup" | "shippable";
  totalPrice: number;
  clearCart: () => void;
  onSubmitSuccess: () => void;
};

type Field = {
  name: keyof OrderFormData;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

const FIELDS = (deliveryMethod: "pickup" | "shippable"): Field[] => [
  {
    name: "name",
    label: "姓名",
    type: "text",
    placeholder: "怎麼稱呼你",
    required: true,
  },
  {
    name: "phone",
    label: "電話",
    type: "tel",
    placeholder: "0912 345 678",
    required: true,
  },
  {
    name: "address",
    label: deliveryMethod === "pickup" ? "地址（選填）" : "寄送地址",
    type: "text",
    placeholder:
      deliveryMethod === "pickup" ? "自取可免填" : "請填寫完整收件地址",
    required: deliveryMethod === "shippable",
  },
];

// ── Reusable form field ────────────────────────────────────────

const FieldLabel = ({
  label,
  required,
}: {
  label: string;
  required: boolean;
}) => (
  <label className="text-[12.5px] text-on-surface-variant">
    {label} {required && <span className="text-primary">*</span>}
  </label>
);

const FormField = ({
  field,
  value,
  error,
  onChange,
}: {
  field: Field;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-1.5">
    <FieldLabel label={field.label} required={field.required} />
    <input
      type={field.type}
      name={field.name}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      className={`border-b ${
        error ? "border-error/60" : "border-ghost-line"
      } bg-transparent py-[9px] outline-none focus:border-primary transition-colors text-base text-on-surface placeholder:text-on-surface-variant/50`}
    />
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
);

// ── Main component ─────────────────────────────────────────────

const CartOrderForm = ({
  deliveryMethod,
  totalPrice,
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
      <h2 className="font-serif text-[19px] lg:text-2xl text-on-surface mb-4 lg:mb-[22px]">
        {deliveryMethod === "pickup" ? "取件資訊" : "收件資訊"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-1.5">
          <FieldLabel label="社群帳號（IG / FB）" required />
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
              placeholder="方便我們聯絡你，例：@taff"
              className={`flex-1 min-w-0 border-b ${
                socialHasError ? "border-error/60" : "border-ghost-line"
              } bg-transparent py-[9px] outline-none focus:border-primary transition-colors text-base text-on-surface placeholder:text-on-surface-variant/50`}
            />
          </div>
          {socialHasError && (
            <p className="text-xs text-error">
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
        <div className="flex flex-col gap-1.5">
          <FieldLabel label="備註" required={false} />
          <textarea
            name="note"
            rows={2}
            value={form.note}
            onChange={handleChange}
            className="border-b border-ghost-line bg-transparent py-[9px] outline-none focus:border-primary transition-colors text-base text-on-surface resize-none placeholder:text-on-surface-variant/50"
            placeholder="口味偏好、取貨時間…"
          />
        </div>

        {/* 送出錯誤 */}
        {submitError && (
          <div className="rounded-soft border border-error/30 bg-error/5 px-4 py-3 flex flex-col gap-1">
            <p className="text-xs text-error font-medium mb-1">
              {submitError.title}
            </p>
            {submitError.items.map((msg, i) => (
              <p key={i} className="text-sm text-error">
                {msg}
              </p>
            ))}
          </div>
        )}

        {/* 送出：手機黏在 tab bar 上方，桌機收在表單卡內 */}
        <div className="sticky bottom-[calc(64px+env(safe-area-inset-bottom))] z-30 -mx-page px-page py-3 bg-surface-container border-t border-ghost-line mt-2 md:static md:z-auto md:m-0 md:mt-2 md:p-0 md:bg-transparent md:border-0">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-on-primary rounded-soft py-4 text-[15px] font-medium tracking-[0.04em] hover:bg-primary-dark active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? buttonLabel : `送出訂單 · $ ${totalPrice}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CartOrderForm;

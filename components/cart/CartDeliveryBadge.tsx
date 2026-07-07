type Props = {
  deliveryMethod: "pickup" | "shippable";
  isForced: boolean;
  onDeliveryChange: (method: "pickup" | "shippable") => void;
};

const OPTIONS = [
  { id: "shippable" as const, label: "宅配到府" },
  { id: "pickup" as const, label: "到店自取" },
];

const CartDeliveryBadge = ({ deliveryMethod, isForced, onDeliveryChange }: Props) => {
  if (isForced) {
    return (
      <div className="bg-primary-fixed rounded-soft px-3.5 py-[11px] text-[12.5px] lg:text-[13px] text-primary-dark mb-4 lg:mb-5">
        含限自取品項，本次訂單為「到店自取」。
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 lg:gap-3 mb-[18px] lg:mb-6">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onDeliveryChange(option.id)}
          className={`rounded-soft border px-[18px] py-[9px] text-sm transition-all active:scale-[0.97] ${
            deliveryMethod === option.id
              ? "bg-primary border-primary text-on-primary"
              : "bg-transparent border-ghost-line text-primary"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default CartDeliveryBadge;

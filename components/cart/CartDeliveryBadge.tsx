import { MapPin, Truck } from "lucide-react";

type Props = {
  deliveryMethod: "pickup" | "shippable";
  isMixedCart: boolean;
  isForced: boolean;
  onDeliveryChange: (method: "pickup" | "shippable") => void;
};

const CartDeliveryBadge = ({ deliveryMethod, isMixedCart, isForced, onDeliveryChange }: Props) => {
  if (isForced) {
    return (
      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-soft mb-8 text-sm font-sans bg-primary-fixed/40 border border-outline-variant text-primary">
        <MapPin size={16} strokeWidth={1.25} className="shrink-0" />
        <span className="tracking-wider">
          取貨方式：<strong className="ml-1">自取</strong>
        </span>
        {isMixedCart && (
          <span className="ml-1 text-xs text-on-surface-variant border-l border-outline-variant pl-3">
            購物車含自取商品，此單須親自取貨
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-label text-xs tracking-[0.1em] uppercase text-on-surface-variant">取貨方式</span>
      <div className="flex rounded-soft overflow-hidden border border-outline-variant text-sm font-sans">
        <button
          type="button"
          onClick={() => onDeliveryChange("shippable")}
          className={`flex items-center gap-2 px-5 py-2.5 transition-colors ${
            deliveryMethod === "shippable"
              ? "bg-primary text-on-primary"
              : "bg-transparent text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          <Truck size={15} strokeWidth={1.25} />
          宅配
        </button>
        <button
          type="button"
          onClick={() => onDeliveryChange("pickup")}
          className={`flex items-center gap-2 px-5 py-2.5 border-l border-outline-variant transition-colors ${
            deliveryMethod === "pickup"
              ? "bg-primary text-on-primary"
              : "bg-transparent text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          <MapPin size={15} strokeWidth={1.25} />
          自取
        </button>
      </div>
    </div>
  );
};

export default CartDeliveryBadge;

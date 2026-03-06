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
      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-8 text-sm font-sans bg-amber-50 border border-amber-200 text-amber-800">
        <MapPin size={16} className="shrink-0" />
        <span className="tracking-wider">
          取貨方式：<strong className="ml-1">自取</strong>
        </span>
        {isMixedCart && (
          <span className="ml-1 text-xs text-amber-600 border-l border-amber-300 pl-3">
            購物車含自取商品，此單須親自取貨
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-xs tracking-[0.2em] uppercase text-gray-500 font-sans">取貨方式</span>
      <div className="flex rounded-xl overflow-hidden border border-gray-200 text-sm font-sans">
        <button
          type="button"
          onClick={() => onDeliveryChange("shippable")}
          className={`flex items-center gap-2 px-5 py-2.5 transition-colors ${
            deliveryMethod === "shippable"
              ? "bg-sky-600 text-white"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          <Truck size={15} />
          宅配
        </button>
        <button
          type="button"
          onClick={() => onDeliveryChange("pickup")}
          className={`flex items-center gap-2 px-5 py-2.5 border-l border-gray-200 transition-colors ${
            deliveryMethod === "pickup"
              ? "bg-amber-500 text-white"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          <MapPin size={15} />
          自取
        </button>
      </div>
    </div>
  );
};

export default CartDeliveryBadge;

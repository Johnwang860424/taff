import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/context/CartContext";
import { cartItemKey } from "@/context/CartContext";

type Props = {
  items: CartItem[];
  totalPrice: number;
  updateQuantity: (
    name: string,
    flavor: string,
    pickupDate: string,
    quantity: number,
  ) => void;
  removeItem: (name: string, flavor: string, pickupDate: string) => void;
};

const CartItemList = ({
  items,
  totalPrice,
  updateQuantity,
  removeItem,
}: Props) => (
  <section>
    <div className="divide-y divide-ghost-line">
      {items.map((item) => (
        <div
          key={cartItemKey(item.name, item.flavor, item.pickupDate)}
          className="py-6 flex items-center gap-4"
        >
          {item.img && (
            <div className="relative w-16 h-16 rounded-soft overflow-hidden shrink-0">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-serif text-lg md:text-xl text-on-surface truncate">
              {item.name}
            </p>
            <p className="font-label text-[11px] tracking-[0.1em] text-on-surface-variant mt-0.5">
              {item.category === "shippable" ? "可宅配" : "限自取"}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="inline-block bg-primary-fixed/60 text-primary text-xs font-sans px-2 py-0.5 rounded-soft">
                {item.flavor}
              </span>
              <span className="inline-block bg-surface-container text-on-surface-variant text-xs font-label tracking-[0.05em] px-2 py-0.5 rounded-soft">
                {item.pickupDate}
              </span>
            </div>
            <p className="font-label text-sm tracking-[0.1em] text-on-surface-variant mt-1">
              $ {item.price}
            </p>
          </div>

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
              className="w-7 h-7 border border-outline-variant rounded-soft flex items-center justify-center text-on-surface-variant md:hover:border-primary md:hover:text-primary transition-colors active:scale-95"
              aria-label="減少數量"
            >
              <Minus size={12} strokeWidth={1.25} />
            </button>
            <span className="w-5 text-center text-sm font-label text-on-surface">
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
              className="w-7 h-7 border border-outline-variant rounded-soft flex items-center justify-center text-on-surface-variant md:hover:border-primary md:hover:text-primary transition-colors active:scale-95"
              aria-label="增加數量"
            >
              <Plus size={12} strokeWidth={1.25} />
            </button>
          </div>

          <p className="w-16 text-right text-sm font-label tracking-[0.05em] text-on-surface shrink-0">
            $ {item.price * item.quantity}
          </p>

          <button
            onClick={() => removeItem(item.name, item.flavor, item.pickupDate)}
            className="text-on-surface-variant/60 md:hover:text-error transition-colors shrink-0"
            aria-label={`移除 ${item.name}`}
          >
            <Trash2 size={16} strokeWidth={1.25} />
          </button>
        </div>
      ))}
    </div>

    <div className="border-t border-ghost-line pt-6 flex justify-between items-baseline">
      <span className="font-label text-xs tracking-[0.1em] uppercase text-on-surface-variant">
        Total
      </span>
      <span className="font-serif text-3xl text-on-surface">$ {totalPrice}</span>
    </div>
  </section>
);

export default CartItemList;

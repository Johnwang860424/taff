import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/context/CartContext";
import { cartItemKey } from "@/context/CartContext";

type Props = {
  items: CartItem[];
  totalPrice: number;
  updateQuantity: (name: string, flavor: string, pickupDate: string, quantity: number) => void;
  removeItem: (name: string, flavor: string, pickupDate: string) => void;
};

const CartItemList = ({ items, totalPrice, updateQuantity, removeItem }: Props) => (
  <section>
    <div className="divide-y divide-primary/10">
      {items.map((item) => (
        <div
          key={cartItemKey(item.name, item.flavor, item.pickupDate)}
          className="py-6 flex items-center gap-4"
        >
          {item.img && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
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
            <p className="font-serif text-lg md:text-xl font-light text-gray-800 truncate">
              {item.name}
            </p>
            <p className="text-xs tracking-widest text-gray-500 font-sans mt-0.5">
              {item.category === "shippable" ? "可宅配" : "限自取"}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="inline-block bg-accent-gold/10 text-accent-gold text-xs font-sans px-2 py-0.5 rounded-full">
                {item.flavor}
              </span>
              <span className="inline-block bg-gray-100 text-gray-500 text-xs font-sans px-2 py-0.5 rounded-full">
                {item.pickupDate}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-sans mt-1">$ {item.price}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => updateQuantity(item.name, item.flavor, item.pickupDate, item.quantity - 1)}
              className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 md:hover:border-accent-gold md:hover:text-accent-gold transition-colors active:scale-95"
              aria-label="減少數量"
            >
              <Minus size={12} />
            </button>
            <span className="w-5 text-center text-sm font-sans text-gray-800">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.name, item.flavor, item.pickupDate, item.quantity + 1)}
              className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 md:hover:border-accent-gold md:hover:text-accent-gold transition-colors active:scale-95"
              aria-label="增加數量"
            >
              <Plus size={12} />
            </button>
          </div>

          <p className="w-16 text-right text-sm font-sans text-gray-800 shrink-0">
            $ {item.price * item.quantity}
          </p>

          <button
            onClick={() => removeItem(item.name, item.flavor, item.pickupDate)}
            className="text-gray-400 md:hover:text-accent-gold transition-colors shrink-0"
            aria-label={`移除 ${item.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>

    <div className="border-t border-primary/10 pt-6 flex justify-between items-baseline">
      <span className="text-xs tracking-[0.25em] uppercase text-primary/40 font-sans">
        Total
      </span>
      <span className="font-serif text-3xl text-primary">$ {totalPrice}</span>
    </div>
  </section>
);

export default CartItemList;

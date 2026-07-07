import Image from "next/image";
import { Trash2 } from "lucide-react";
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
    <div>
      {items.map((item) => (
        <div
          key={cartItemKey(item.name, item.flavor, item.pickupDate)}
          className="flex gap-[13px] lg:gap-4 items-start py-[15px] lg:py-5 border-b border-ghost-line"
        >
          <div className="relative w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] flex-none rounded-soft overflow-hidden bg-primary-fixed flex items-center justify-center">
            {item.img ? (
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
                sizes="60px"
              />
            ) : (
              <span className="font-serif text-[17px] lg:text-xl text-primary">
                {item.name.slice(0, 1)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-serif text-base lg:text-lg text-on-surface">
              {item.name}
            </p>
            <p className="mt-[3px] text-xs lg:text-[13px] text-on-surface-variant">
              {item.flavor} · {item.pickupDate} ·{" "}
              {item.category === "pickupOnly" ? "自取" : "宅配"}
            </p>

            <div className="flex items-center gap-3 lg:gap-4 mt-[9px] lg:mt-3">
              <div className="flex items-center border border-ghost-line rounded-soft">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.name,
                      item.flavor,
                      item.pickupDate,
                      item.quantity - 1,
                    )
                  }
                  className="w-[30px] h-[30px] lg:w-8 lg:h-8 text-on-surface-variant text-[17px] leading-none active:bg-ghost-line transition-colors"
                  aria-label="減少數量"
                >
                  −
                </button>
                <span className="w-[26px] lg:w-7 text-center text-sm lg:text-[15px] text-on-surface">
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
                  className="w-[30px] h-[30px] lg:w-8 lg:h-8 text-on-surface-variant text-base leading-none active:bg-ghost-line transition-colors"
                  aria-label="增加數量"
                >
                  +
                </button>
              </div>

              <span className="text-sm lg:text-[15px] text-on-surface">
                $ {item.price * item.quantity}
              </span>

              <button
                onClick={() =>
                  removeItem(item.name, item.flavor, item.pickupDate)
                }
                className="ml-auto p-1 text-outline hover:text-error transition-colors"
                aria-label={`移除 ${item.name}`}
              >
                <Trash2 size={17} strokeWidth={1.3} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-between items-baseline pt-[18px] lg:pt-[22px] pb-1">
      <span className="text-[13px] lg:text-sm text-on-surface-variant">
        合計
      </span>
      <span className="font-serif text-[28px] lg:text-[34px] text-on-surface">
        $ {totalPrice}
      </span>
    </div>
  </section>
);

export default CartItemList;

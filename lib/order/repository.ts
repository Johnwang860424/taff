import type { D1Database } from "@cloudflare/workers-types";
import type { OrderForm } from "./validation";
import type { ResolvedOrderItem } from "./inventory";

function buildSocialUrl(form: OrderForm): string {
  if (form.facebook) return `https://www.facebook.com/${form.facebook}`;
  if (form.instagram) return `https://www.instagram.com/${form.instagram}`;
  return "";
}

/** 寫入訂單主表 + 明細，並扣減對應庫存 (單一 batch，原子執行) */
export async function writeOrder(
  db: D1Database,
  form: OrderForm,
  deliveryMethod: "pickup" | "shippable",
  items: ResolvedOrderItem[],
): Promise<void> {
  const deliveryLabel = deliveryMethod === "pickup" ? "自取" : "宅配";
  const socialUrl = buildSocialUrl(form);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const orderResult = await db
    .prepare(
      `INSERT INTO orders (name, phone, social_account, address, delivery_method, total_amount, note)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(form.name, form.phone, socialUrl, form.address, deliveryLabel, totalAmount, form.note)
    .run();

  const orderId = orderResult.meta.last_row_id;

  const statements = items.map((item) => {
    const categoryLabel = item.category === "pickupOnly" ? "限自取" : "可宅配";
    return db
      .prepare(
        `INSERT INTO order_items (order_id, variant_id, product_type, product_name, flavor_name, pickup_date, quantity, unit_price, subtotal)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        orderId,
        item.variantId,
        categoryLabel,
        item.name,
        item.flavor,
        item.pickupDate,
        item.quantity,
        item.price,
        item.price * item.quantity,
      );
  });

  for (const item of items) {
    if (item.variantId) {
      statements.push(
        db
          .prepare("UPDATE inventory SET stock = stock - ? WHERE variant_id = ? AND date = ?")
          .bind(item.quantity, item.variantId, item.pickupDate),
      );
    }
  }

  await db.batch(statements);
}

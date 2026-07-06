import type { D1Database } from "@cloudflare/workers-types";
import type { OrderItem } from "./validation";

export interface ResolvedOrderItem extends OrderItem {
  variantId: number | null;
}

interface InventoryCheckResult {
  insufficient: string[];
  resolved: ResolvedOrderItem[];
}

/** 依商品名稱 + 口味回查 variant id (找不到回傳 null) */
async function resolveVariantId(
  db: D1Database,
  productName: string,
  flavorName: string,
): Promise<number | null> {
  const variant = await db
    .prepare(
      `SELECT v.id FROM variants v
       JOIN products p ON p.id = v.product_id
       WHERE p.name = ? AND v.flavor_name = ?`,
    )
    .bind(productName, flavorName)
    .first<{ id: number }>();
  return variant?.id ?? null;
}

/** 檢查每個品項在指定日期的庫存是否足夠 (同一 variant+日期的多筆需求會加總比對) */
export async function checkInventory(
  db: D1Database,
  items: OrderItem[],
): Promise<InventoryCheckResult> {
  const resolved: ResolvedOrderItem[] = await Promise.all(
    items.map(async (item) => ({
      ...item,
      variantId: await resolveVariantId(db, item.name, item.flavor),
    })),
  );

  const required = new Map<string, number>();
  for (const item of resolved) {
    if (!item.variantId) continue;
    const key = `${item.variantId}_${item.pickupDate}`;
    required.set(key, (required.get(key) ?? 0) + item.quantity);
  }

  const insufficient: string[] = [];
  await Promise.all(
    Array.from(required.entries()).map(async ([key, qty]) => {
      const [variantIdStr, date] = key.split("_");
      const variantId = Number(variantIdStr);
      const inv = await db
        .prepare("SELECT stock FROM inventory WHERE variant_id = ? AND date = ?")
        .bind(variantId, date)
        .first<{ stock: number }>();
      const stock = inv?.stock ?? 0;
      if (stock < qty) {
        const item = resolved.find((r) => r.variantId === variantId);
        insufficient.push(
          `${item?.name ?? ""}（${item?.flavor ?? ""}）${date}：庫存剩 ${stock}，需求 ${qty}`,
        );
      }
    }),
  );

  return { insufficient, resolved };
}

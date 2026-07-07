import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/cloudflare";
import { toLocalImageUrl } from "@/lib/images";
export type { FlavorSchedule, MenuItem, MenuData } from "./menu-utils";
export { isDateExpired, getPriceDisplay } from "./menu-utils";
import { isDateExpired } from "./menu-utils";
import type { FlavorSchedule, MenuData, MenuItem } from "@/lib/menu-utils";

// ── D1 資料列 ──────────────────────────────────────────────────

interface ProductRow {
  id: number;
  name: string;
  image_url: string;
  description: string;
  category: string; // "宅配" | "自取"
}

interface VariantRow {
  id: number;
  product_id: number;
  flavor_name: string;
  price: number;
}

interface InventoryRow {
  variant_id: number;
  date: string;
  stock: number;
}

// ── 內部 raw 介面 ──────────────────────────────────────────────

interface RawProduct {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  category: string;
}

interface RawVariant {
  id: number;
  productId: number;
  flavorName: string;
  price: number;
}

interface RawInventory {
  variantId: number;
  date: string;
  stock: number;
}

const rowToProduct = (r: ProductRow): RawProduct => ({
  id: r.id,
  name: r.name,
  imageUrl: toLocalImageUrl(r.image_url),
  description: r.description,
  category: r.category,
});

const rowToVariant = (r: VariantRow): RawVariant => ({
  id: r.id,
  productId: r.product_id,
  flavorName: r.flavor_name,
  price: r.price,
});

const rowToInventory = (r: InventoryRow): RawInventory => ({
  variantId: r.variant_id,
  date: r.date,
  stock: r.stock,
});

// ── 組裝 MenuData ──────────────────────────────────────────────

const buildMenuData = (
  products: RawProduct[],
  variants: RawVariant[],
  inventory: RawInventory[],
): MenuData => {
  const shippableItems: MenuItem[] = [];
  const pickupOnlyItems: MenuItem[] = [];

  for (const product of products) {
    if (!product.id || !product.name) continue;

    const productVariants = variants.filter((v) => v.productId === product.id);

    const flavorSchedules: FlavorSchedule[] = productVariants
      .map((variant) => {
        const dates = inventory
          .filter(
            (inv) =>
              inv.variantId === variant.id &&
              inv.stock > 0 &&
              !isDateExpired(inv.date),
          )
          .map((inv) => inv.date);

        return {
          flavor: [variant.flavorName],
          price: variant.price,
          dates,
        };
      })
      .filter((fs) => fs.flavor[0]);

    const menuItem: MenuItem = {
      name: product.name,
      img: product.imageUrl,
      description: product.description ?? "",
      flavorSchedules,
    };

    if (product.category === "宅配") {
      shippableItems.push(menuItem);
    } else if (product.category === "自取") {
      pickupOnlyItems.push(menuItem);
    }
  }

  return { shippableItems, pickupOnlyItems };
};

// ── 靜態資料快取（Products + Variants）────────────────────────
// 後台新增/修改/刪除品項時會呼叫 revalidateTag("menu") 通知這裡重新抓取。

const getStaticData = unstable_cache(
  async () => {
    const db = await getDb();
    const [productsRes, variantsRes] = await db.batch([
      db.prepare("SELECT * FROM products ORDER BY created_at"),
      db.prepare("SELECT * FROM variants"),
    ]);

    return {
      products: (productsRes.results as unknown as ProductRow[]).map(rowToProduct),
      variants: (variantsRes.results as unknown as VariantRow[]).map(rowToVariant),
    };
  },
  ["menu-static-cache-v1"],
  { revalidate: false, tags: ["menu"] },
);

// ── 對外 API：每次請求都取得即時庫存 ──────────────────────────

export const getMenuData = async (): Promise<MenuData> => {
  const db = await getDb();

  const [staticData, inventoryRes] = await Promise.all([
    getStaticData(),
    db.prepare("SELECT * FROM inventory").all(),
  ]);

  const inventory = (inventoryRes.results as unknown as InventoryRow[]).map(rowToInventory);

  return buildMenuData(staticData.products, staticData.variants, inventory);
};

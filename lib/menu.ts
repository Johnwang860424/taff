import { google } from "googleapis";
import { unstable_cache } from "next/cache";
export type { FlavorSchedule, MenuItem, MenuData } from "./menu-utils";
export { isDateExpired, getPriceDisplay } from "./menu-utils";
import { isDateExpired } from "./menu-utils";
import type { FlavorSchedule, MenuData, MenuItem } from "@/lib/menu-utils";

// ── 內部 raw 介面 ──────────────────────────────────────────────

interface RawProduct {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  category: string; // "宅配" | "自取"
}

interface RawVariant {
  id: string;
  productId: string;
  flavorName: string;
  price: number;
}

interface RawInventory {
  variantId: string;
  date: string;
  stock: number;
}

// ── Row parsers ────────────────────────────────────────────────

const parseProducts = (rows: string[][]): RawProduct[] =>
  rows.slice(1).map((r) => ({
    id: (r[0] || "").trim(),
    name: (r[1] || "").trim(),
    imageUrl: (r[2] || "").trim(),
    description: (r[3] || "").trim(),
    category: (r[4] || "").trim(),
  }));

const parseVariants = (rows: string[][]): RawVariant[] =>
  rows.slice(1).map((r) => ({
    id: (r[0] || "").trim(),
    productId: (r[1] || "").trim(),
    flavorName: (r[2] || "").trim(),
    price: Number(r[3]) || 0,
  }));

const parseInventory = (rows: string[][]): RawInventory[] =>
  rows.slice(1).map((r) => ({
    variantId: (r[0] || "").trim(),
    date: (r[1] || "").trim(),
    stock: Number(r[2]) || 0,
  }));

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
      .filter((fs) => fs.flavor[0]); // 過濾掉口味名稱為空的 variant

    const menuItem: MenuItem = {
      name: product.name,
      img: product.imageUrl,
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
// 品項與口味變動少，手動透過 /api/revalidate 失效

const getStaticData = unstable_cache(
  async () => {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: ["Products!A:E", "Variants!A:D"],
    });

    const [productRows, variantRows] = response.data.valueRanges?.map(
      (vr) => vr.values ?? [],
    ) ?? [[], []];

    return {
      products: parseProducts(productRows),
      variants: parseVariants(variantRows),
    };
  },
  ["menu-static-cache-v1"],
  { revalidate: false, tags: ["menu"] },
);

// ── 對外 API：每次請求都取得即時庫存 ──────────────────────────

export const getMenuData = async (): Promise<MenuData> => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  const [staticData, inventoryResponse] = await Promise.all([
    getStaticData(),
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Inventory!A:C",
    }),
  ]);

  const inventoryRows = inventoryResponse.data.values ?? [];
  const inventory = parseInventory(inventoryRows);

  return buildMenuData(staticData.products, staticData.variants, inventory);
};

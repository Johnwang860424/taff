import type { sheets_v4 } from "googleapis";
import type { OrderItem } from "./validation";

interface Product {
  id: string;
  name: string;
}

interface Variant {
  id: string;
  productId: string;
  flavorName: string;
}

interface InventoryRow {
  variantId: string;
  date: string;
  stock: number;
  sheetRow: number;
}

export interface StockDeduction {
  sheetRow: number;
  newStock: number;
}

interface InventoryCheckResult {
  insufficient: string[];
  deductions: StockDeduction[];
}

const parseProducts = (rows: string[][]): Product[] =>
  rows.slice(1).map((r) => ({
    id: (r[0] || "").trim(),
    name: (r[1] || "").trim(),
  }));

const parseVariants = (rows: string[][]): Variant[] =>
  rows.slice(1).map((r) => ({
    id: (r[0] || "").trim(),
    productId: (r[1] || "").trim(),
    flavorName: (r[2] || "").trim(),
  }));

const parseInventory = (rows: string[][]): InventoryRow[] =>
  rows.slice(1).map((r, i) => ({
    variantId: (r[0] || "").trim(),
    date: (r[1] || "").trim(),
    stock: Number(r[2]) || 0,
    sheetRow: i + 2,
  }));

export async function checkInventory(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  items: OrderItem[],
): Promise<InventoryCheckResult> {
  const menuData = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: ["Products!A:B", "Variants!A:C", "Inventory!A:C"],
  });

  const [productRows, variantRows, inventoryRows] =
    menuData.data.valueRanges?.map((vr) => vr.values ?? []) ?? [[], [], []];

  const products = parseProducts(productRows);
  const variants = parseVariants(variantRows);
  const inventory = parseInventory(inventoryRows);

  const insufficient: string[] = [];
  const deductions: StockDeduction[] = [];

  for (const item of items) {
    const product = products.find((p) => p.name === item.name);
    if (!product) continue;
    const variant = variants.find(
      (v) => v.productId === product.id && v.flavorName === item.flavor,
    );
    if (!variant) continue;
    const inv = inventory.find(
      (i) => i.variantId === variant.id && i.date === item.pickupDate,
    );
    const stock = inv?.stock ?? 0;
    if (stock < item.quantity) {
      insufficient.push(
        `${item.name}（${item.flavor}）${item.pickupDate}：庫存剩 ${stock}，需求 ${item.quantity}`,
      );
    } else if (inv) {
      deductions.push({ sheetRow: inv.sheetRow, newStock: stock - item.quantity });
    }
  }

  return { insufficient, deductions };
}

export async function deductStock(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  deductions: StockDeduction[],
): Promise<void> {
  await Promise.all(
    deductions.map(({ sheetRow, newStock }) =>
      sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Inventory!C${sheetRow}`,
        valueInputOption: "RAW",
        requestBody: { values: [[newStock]] },
      }),
    ),
  );
}

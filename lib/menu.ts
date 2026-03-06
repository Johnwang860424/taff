import { google } from "googleapis";
import { unstable_cache } from "next/cache";

export interface FlavorSchedule {
  flavor: string[];  // 逗號分隔多口味（同價格同日期）
  price: number;     // 此口味群組的單價
  dates: string[];   // 可取貨日期（YYYY-MM-DD）
}

export interface MenuItem {
  name: string;
  img: string;
  flavorSchedules: FlavorSchedule[];
}

export interface MenuData {
  shippableItems: MenuItem[];
  pickupOnlyItems: MenuItem[];
}

const parseCsv = (cell: string): string[] =>
  cell.split(",").map((s) => s.trim()).filter(Boolean);

const buildMenuItems = (rows: string[][]): MenuItem[] => {
  let lastItemName = "";
  let lastImg = "";

  // 先用 Map 依 name 聚合，保留插入順序
  const map = new Map<string, MenuItem>();

  for (const row of rows) {
    const rawName = (row[0] || "").trim();
    const name = rawName || lastItemName;
    if (!name) continue;
    lastItemName = name;

    const price = Number(row[1]) || 0;

    const rawImg = (row[2] || "").trim();
    const img = rawImg || lastImg;
    if (rawImg) lastImg = rawImg;

    const flavors = parseCsv(row[3] || "");
    const dates = parseCsv(row[4] || "");

    const existing = map.get(name);
    if (existing) {
      // 同名品項：更新圖片（若本列有），追加口味排程
      if (rawImg) existing.img = img;
      if (flavors.length > 0) {
        existing.flavorSchedules.push({ flavor: flavors, price, dates });
      }
    } else {
      map.set(name, {
        name,
        img,
        flavorSchedules:
          flavors.length > 0 ? [{ flavor: flavors, price, dates }] : [],
      });
    }
  }

  return Array.from(map.values());
};

export const getMenuData = unstable_cache(
  async (): Promise<MenuData> => {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const range = ["可宅配!A:E", "限自取!A:E"];
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: range,
    });

    const deliverableRows =
      response.data.valueRanges?.[0].values?.slice(1) || [];
    const pickupOnlyRows =
      response.data.valueRanges?.[1].values?.slice(1) || [];

    const shippableItems = buildMenuItems(deliverableRows);
    const pickupOnlyItems = buildMenuItems(pickupOnlyRows);

    return { shippableItems, pickupOnlyItems };
  },
  ["menu-data-cache-v5"],
  { revalidate: 3600, tags: ["menu"] },
);

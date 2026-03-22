import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { form, deliveryMethod, items } = body as {
      form: {
        name: string;
        phone: string;
        address: string;
        note: string;
        facebook?: string;
        instagram?: string;
      };
      deliveryMethod: "pickup" | "shippable";
      items: Array<{
        name: string;
        flavor: string;
        pickupDate: string;
        quantity: number;
        price: number;
        category: "pickupOnly" | "shippable";
      }>;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const orderSpreadsheetId = process.env.GOOGLE_ORDER_SPREADSHEET_ID;
    if (!orderSpreadsheetId) {
      return NextResponse.json(
        { error: "Missing GOOGLE_ORDER_SPREADSHEET_ID" },
        { status: 500 },
      );
    }

    const menuSpreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    if (!menuSpreadsheetId) {
      return NextResponse.json(
        { error: "Missing GOOGLE_SPREADSHEET_ID" },
        { status: 500 },
      );
    }

    // ── 讀取 Products / Variants / Inventory ──────────────────
    const menuData = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: menuSpreadsheetId,
      ranges: ["Products!A:B", "Variants!A:C", "Inventory!A:C"],
    });

    const [productRows, variantRows, inventoryRows] =
      menuData.data.valueRanges?.map((vr) => vr.values ?? []) ?? [[], [], []];

    const products = productRows.slice(1).map((r) => ({
      id: (r[0] || "").trim(),
      name: (r[1] || "").trim(),
    }));

    const variants = variantRows.slice(1).map((r) => ({
      id: (r[0] || "").trim(),
      productId: (r[1] || "").trim(),
      flavorName: (r[2] || "").trim(),
    }));

    // 保留 row 編號（sheet 列號，從 2 開始，第 1 列是標題）
    const inventory = inventoryRows.slice(1).map((r, i) => ({
      variantId: (r[0] || "").trim(),
      date: (r[1] || "").trim(),
      stock: Number(r[2]) || 0,
      sheetRow: i + 2,
    }));

    // ── 驗證庫存 ──────────────────────────────────────────────
    const insufficient: string[] = [];
    const deductions: Array<{ sheetRow: number; newStock: number }> = [];

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

    if (insufficient.length > 0) {
      return NextResponse.json(
        { error: "庫存不足", items: insufficient },
        { status: 409 },
      );
    }

    // ── 寫入訂單 ──────────────────────────────────────────────
    const now = new Date().toISOString();
    const groupedData: Record<string, unknown[][]> = {};

    items.forEach((item) => {
      const dateObj = new Date(item.pickupDate);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const sheetName = `${year}-${month}`;

      if (!groupedData[sheetName]) {
        groupedData[sheetName] = [];
      }

      const socialUrl = form.facebook
        ? `https://www.facebook.com/${form.facebook}`
        : form.instagram
          ? `https://www.instagram.com/${form.instagram}`
          : "";

      const deliveryLabel = deliveryMethod === "pickup" ? "自取" : "宅配";
      const categoryLabel = item.category === "pickupOnly" ? "限自取" : "可宅配";

      groupedData[sheetName].push([
        now,
        form.name,
        form.phone,
        socialUrl,
        form.address,
        deliveryLabel,
        categoryLabel,
        item.name,
        item.flavor,
        item.pickupDate,
        item.quantity,
        item.price,
        item.price * item.quantity,
        form.note,
      ]);
    });

    for (const [sheetName, values] of Object.entries(groupedData)) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: orderSpreadsheetId,
        range: `'${sheetName}'!A:N`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
    }

    // ── 扣減庫存 ──────────────────────────────────────────────
    await Promise.all(
      deductions.map(({ sheetRow, newStock }) =>
        sheets.spreadsheets.values.update({
          spreadsheetId: menuSpreadsheetId,
          range: `Inventory!C${sheetRow}`,
          valueInputOption: "RAW",
          requestBody: { values: [[newStock]] },
        }),
      ),
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    const err = error as Error & { code?: number; response?: { data?: unknown } };
    const message = err?.response?.data
      ? JSON.stringify((err.response as { data?: unknown }).data)
      : err?.message ?? String(error);
    console.error("Order submit error", err);

    return NextResponse.json(
      {
        error: "Failed to submit order",
        detail: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 },
    );
  }
}

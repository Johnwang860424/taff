import { NextResponse } from "next/server";
import { getReadWriteSheets } from "@/lib/sheets-client";
import { orderBodySchema } from "@/lib/order/validation";
import { checkInventory, deductStock } from "@/lib/order/inventory";
import { writeOrder } from "@/lib/order/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { form, deliveryMethod, items } = parsed.data;

    const menuSpreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const orderSpreadsheetId = process.env.GOOGLE_ORDER_SPREADSHEET_ID;
    if (!menuSpreadsheetId || !orderSpreadsheetId) {
      return NextResponse.json(
        { error: "Missing spreadsheet configuration" },
        { status: 500 },
      );
    }

    const sheets = getReadWriteSheets();

    // Check inventory
    const { insufficient, deductions } = await checkInventory(
      sheets,
      menuSpreadsheetId,
      items,
    );

    if (insufficient.length > 0) {
      return NextResponse.json(
        { error: "庫存不足", items: insufficient },
        { status: 409 },
      );
    }

    // Deduct stock first (fail-safe: no order written if deduction fails)
    await deductStock(sheets, menuSpreadsheetId, deductions);

    // Write order
    await writeOrder(sheets, orderSpreadsheetId, form, deliveryMethod, items);

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

import { NextResponse } from "next/server";
import { google } from "googleapis";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { form, deliveryMethod, items } = body as {
      form: {
        name: string;
        phone: string;
        email: string;
        address: string;
        note: string;
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

    const spreadsheetId = process.env.GOOGLE_ORDER_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json(
        { error: "Missing GOOGLE_ORDER_SPREADSHEET_ID" },
        { status: 500 },
      );
    }

    const now = new Date().toISOString();
    const groupedData: Record<string, any[][]> = {};

    items.forEach((item) => {
      const dateObj = new Date(item.pickupDate);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const sheetName = `${year}-${month}`;

      if (!groupedData[sheetName]) {
        groupedData[sheetName] = [];
      }

      groupedData[sheetName].push([
        now, // 建立時間
        form.name,
        form.phone,
        form.email,
        form.address,
        deliveryMethod,
        item.category,
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
        spreadsheetId,
        range: `'${sheetName}'!A:N`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      });
    }

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

import { NextResponse } from "next/server";
import { getDb } from "@/lib/cloudflare";
import { orderBodySchema } from "@/lib/order/validation";
import { checkInventory } from "@/lib/order/inventory";
import { writeOrder } from "@/lib/order/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { form, deliveryMethod, items } = parsed.data;

    const db = await getDb();

    // Check inventory
    const { insufficient, resolved } = await checkInventory(db, items);

    if (insufficient.length > 0) {
      return NextResponse.json(
        { error: "庫存不足", items: insufficient },
        { status: 409 },
      );
    }

    // Write order + deduct stock (single atomic batch)
    await writeOrder(db, form, deliveryMethod, resolved);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Order submit error", error);

    return NextResponse.json(
      {
        error: "Failed to submit order",
        detail: process.env.NODE_ENV === "development" ? (error as Error)?.message : undefined,
      },
      { status: 500 },
    );
  }
}

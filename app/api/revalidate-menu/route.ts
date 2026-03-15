import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { secret } = await request.json();

  if (secret !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("menu", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

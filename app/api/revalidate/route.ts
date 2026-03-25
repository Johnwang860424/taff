import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("Authorization");

  if (secret !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { tag } = await request.json();

  if (typeof tag !== "string" || !tag) {
    return NextResponse.json({ message: "Missing tag" }, { status: 400 });
  }

  revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}

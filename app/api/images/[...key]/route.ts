import { NextResponse } from "next/server";
import { getImagesBucket } from "@/lib/cloudflare";

/** GET: 公開提供 R2 內的圖片 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const objectKey = key.map(decodeURIComponent).join("/");

  const bucket = await getImagesBucket();
  const object = await bucket.get(objectKey);
  if (!object) {
    return NextResponse.json({ error: "找不到圖片" }, { status: 404 });
  }

  const etag = object.httpEtag;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304 });
  }

  // workers-types 與 DOM 的 ReadableStream 型別不相容，runtime 上是同一個物件
  return new Response(object.body as unknown as ReadableStream, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "Content-Length": String(object.size),
      ETag: etag,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

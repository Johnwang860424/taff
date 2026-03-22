import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform");
  const username = searchParams.get("username");

  if (!platform || !username) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const cleanUsername = username.replace(/^@/, "");

  let url: string;
  if (platform === "instagram") {
    url = `https://www.instagram.com/${encodeURIComponent(cleanUsername)}/`;
  } else if (platform === "facebook") {
    url = `https://www.facebook.com/${encodeURIComponent(cleanUsername)}`;
  } else {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) return NextResponse.json({ exists: false });
    if (res.status === 200) return NextResponse.json({ exists: true });
    // 其他狀態碼（403、302 等）→ 無法判斷，略過驗證
    return NextResponse.json({ exists: null });
  } catch {
    // 逾時或網路錯誤 → 略過驗證，不阻擋訂單送出
    return NextResponse.json({ exists: null });
  }
}

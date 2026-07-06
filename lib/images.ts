/**
 * 資料庫存的圖片 URL 可能是任一個 worker (前台/後台) 上傳時組出的絕對網址，
 * 但兩邊都綁定同一個 R2 bucket，也都提供 /api/images/[...key] 路由。
 * 統一轉成相對路徑，改由目前這個 worker 自己提供圖片，避免依賴對方網域。
 */
export function toLocalImageUrl(url: string): string {
  if (!url) return url;
  const marker = "/api/images/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx);
}

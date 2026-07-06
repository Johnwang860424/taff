import { getImagesBucket } from "./cloudflare";

/** 固定的 R2 物件 key，對應後台「前台圖片管理」頁面上傳的圖片 */
const SITE_IMAGE_KEYS = {
  home: "site/home",
  "brand-story": "site/brand-story",
  contact: "site/contact",
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGE_KEYS;

/**
 * 取得固定版位圖片的相對 URL (帶版本號避免快取舊圖)；尚未上傳時回傳空字串。
 *
 * 直接讀 R2、不包 unstable_cache：使用這個函式的頁面 (home/brand/contact) 都宣告成
 * `dynamic = "force-dynamic"` 每次請求即時渲染。
 * 不要改回靜態或加上 unstable_cache —— 實測過純靜態頁 + revalidateTag 在 OpenNext 上
 * 不可靠：頁面會忽好忽壞地重生成空圖，且 unstable_cache 可能把空字串快取住。
 */
export async function getSiteImageUrl(key: SiteImageKey): Promise<string> {
  const objectKey = SITE_IMAGE_KEYS[key];
  const bucket = await getImagesBucket();
  const head = await bucket.head(objectKey);
  if (!head) return "";
  return `/api/images/${objectKey}?v=${head.uploaded.getTime()}`;
}

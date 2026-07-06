// Cloudflare bindings 型別宣告
// 刻意不使用 `wrangler types` 產生的 runtime 全域型別，
// 避免覆蓋 DOM 的 fetch/Response 型別 (client 元件會壞掉)
import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    IMAGES_BUCKET: R2Bucket;
    NEXT_INC_CACHE_R2_BUCKET: R2Bucket;
    NEXT_TAG_CACHE_D1: D1Database;
  }
}

export {};

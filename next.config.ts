import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  images: {
    // 圖片都是從 R2 動態提供 (/api/images/[...key])，不是建置時的靜態檔案。
    // Cloudflare 上 Next 的 image optimizer 對本機相對路徑會透過 ASSETS binding
    // (只認得建置時的靜態檔案) 去抓圖，永遠抓不到動態路由，所以直接關閉最佳化。
    unoptimized: true,
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// 與 taff-backend 共用同一份本地 D1/R2 模擬資料 (兩個 repo 需並排 checkout 在同一層目錄)
initOpenNextCloudflareForDev({
  // 注意：wrangler CLI 的 --persist-to 會自動在路徑後加上 v3/，
  // 這裡的 JS API 不會，所以路徑要手動補上 v3 才能對齊同一份本地模擬資料
  persist: { path: "../taff-local-wrangler-state/v3" },
});

// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

export default defineCloudflareConfig({
	incrementalCache: r2IncrementalCache,
	// 沒有這個的話 tagCache 預設是 no-op ("dummy")，revalidateTag() 呼叫了也不會真的讓
	// R2 裡的 cache 失效 — menu 資料在後台更新後永遠不會反映出來。
	tagCache: d1NextTagCache,
});

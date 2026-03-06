## Context

目前菜單頁直接在點擊「加入購物車」時加入商品，`CartItem` 只有 `name / price / img / category / quantity`，沒有口味或取貨日期資訊。

Google Sheets 目前欄位為 `A:C`（name / price / image），即將擴充至 `A:E`（加上 flavor / pickupDate）。

現況已完成：
- `lib/menu.ts` 已新增 `FlavorSchedule`（含 `flavor: string[]`、`price: number`、`dates: string[]`）
- `buildMenuItems` parser 已支援 `A` 欄留白沿用、逗號分隔口味與日期
- `MenuDesktop` 有 Modal 框架但尚未接新資料型別

---

## Goals / Non-Goals

**Goals:**
- Modal 內口味按鈕動態從 `flavorSchedules` 讀取，選口味後即時更新顯示價格
- 選完口味 → 自動過濾該口味可用日期（逗號分隔日期已 parse 為陣列）
- 列表頁顯示商品的**起始價格**（最低口味價格）或「起 $xxx」
- 購物車加入時帶入 `flavor`、`pickupDate`、正確 `price`
- `CartItem` 唯一鍵改為 `name + flavor + pickupDate`，相同組合才疊加數量
- 結帳頁每筆品項顯示口味與取貨日期
- 手機版（`MenuMobile`）同步套用 Modal 選口味/日期流程

**Non-Goals:**
- 不支援同一次結帳混合「宅配」與「自取」商品的衝突偵測
- 不做庫存管理（日期選項由店家手動維護試算表）
- 不處理 Modal 以外的 UI（如 side drawer）

---

## Decisions

### 1. 價格顯示：列表用「起 $xxx」，Modal 即時更新

**決定**：菜單列表顯示 `min(flavorSchedules[].price)` 加上「起」字（e.g. 起 $60）；Modal 內選了口味後，header 價格切換成該口味精確金額。

**原因**：同品項多口味有不同價格，列表無法顯示單一價格；「起 $xxx」是業界常見做法，不造成誤解。

**放棄選項**：顯示價格區間（$60–$100）→ 版面較長且對短商品名視覺不平衡。

---

### 2. Google Sheets 欄位：一列一個口味群組

**決定**：
```
A: name（留白沿用上列）
B: price（此口味群組的單價）
C: image（留白沿用上列）
D: flavor（逗號分隔，同價同日期的口味可同列）
E: pickupDate（逗號分隔多個日期，e.g. 2026-03-12,2026-03-19）
```

**原因**：同口味多日期時不需重複多列，店家維護成本低；不同口味不同價格時各自一列，語意清晰。

**放棄選項**：口味/日期各開獨立工作表 → 需 JOIN 邏輯，前端複雜度高。

---

### 3. CartItem 唯一鍵：`name + flavor + pickupDate`

**決定**：`addItem` 識別已存在品項的邏輯從 `i.name === item.name` 改為同時比對 `flavor` 與 `pickupDate`。

**原因**：同一商品不同口味或不同取貨日期，應各自計算數量與金額，不能合併。

---

### 4. 桌機用 Modal，手機用 Bottom Sheet（相同選項邏輯）

**決定**：`MenuDesktop` 用置中 Modal；`MenuMobile` 用從下方滑出的 Bottom Sheet（Tailwind `fixed bottom-0 inset-x-0`）。

**原因**：手機螢幕高度有限，Bottom Sheet 比 Modal 更符合行動端操作習慣，且可透過 `md:hidden` / `hidden md:block` 分別控制。

---

## Risks / Trade-offs

- **快取延遲**：`unstable_cache` 的 `revalidate` 目前設為 `1`（開發用），上線前需改回 `3600`，否則每秒都重新打 Google Sheets API，可能觸發配額限制。→ 上線前統一改回 `3600`，並加 `.env` 說明。
- **口味命名不一致**：試算表若同品項口味名稱拼法不同（如「原味」vs「原味布丁"），會出現重複按鈕。→ `design` 已建議店家統一命名，可在未來加前端 dedupe 警告。
- **舊 CartItem 相容性**：`CartItem` 新增 `flavor`、`pickupDate` 必填欄位後，若 localStorage 仍有舊格式資料（未來做持久化時），需處理 migration。→ 目前購物車為 in-memory，無持久化，不影響現在。

---

## Migration Plan

1. 更新 `lib/menu.ts`（已完成）
2. 更新 `context/CartContext.tsx`：新增 `flavor`、`pickupDate` 欄位與唯一鍵邏輯
3. 更新 `components/MenuDesktop.tsx`：Modal 接新資料、動態價格、傳入 `flavor`/`pickupDate`
4. 更新 `components/MenuMobile.tsx`：加入 Bottom Sheet 選口味/日期流程
5. 更新 `app/cart/page.tsx`：品項列顯示口味與取貨日期
6. 試算表更新欄位（店家操作，非程式）
7. 上線前將 `revalidate` 改回 `3600`

---

## Open Questions

- 若某口味所有日期都已過期，要不要自動在 UI 隱藏或 disabled 該口味按鈕？
- 手機版 Bottom Sheet 是否需要加上滑動關閉手勢（swipe down to dismiss）？
- 訂單送出後，是否要整合 Google Sheets 訂單工作表寫入（目前 `handleSubmit` 是 mock）？

## Why

目前「加入購物車」直接加入商品，沒有讓使用者選擇口味與取貨日期，導致店家收到訂單後需要再額外確認細節，增加客服成本。
現階段所有商品均需分開取貨，且同一商品可能有多種口味，不同口味價格也可能不同，需要在加入購物車前讓顧客完整選定。

## What Changes

- 點擊「加入購物車」按鈕時，改為先彈出 Modal，讓顧客選擇口味與取貨日期後才確認加入
- Google Sheets 欄位結構調整，支援每個品項設定多種口味（各自有獨立價格與可取貨日期）
- 購物車 Item 資料結構新增 `flavor`、`pickupDate` 欄位
- **BREAKING**：`CartItem` 新增必填欄位 `flavor` 與 `pickupDate`，現有加入購物車邏輯需一併更新
- 手機版（`MenuMobile`）同樣需要加入 Modal 或 Bottom Sheet 選項流程
- 結帳頁（`cart/page.tsx`）需顯示每個品項的口味與取貨日期，並用於最終訂單摘要

## Capabilities

### New Capabilities

- `cart-item-flavor-pickup`：購物車品項支援口味與取貨日期選擇，含 Modal UI、資料結構定義、驗證邏輯
- `menu-flavor-schedule`：菜單品項依 Google Sheets 口味/日期欄位動態載入，支援同品項多口味、不同口味不同價格

### Modified Capabilities

- `cart-context`：`CartItem` 資料型別新增 `flavor: string` 與 `pickupDate: string`；`addItem` 識別邏輯改為以 `name + flavor + pickupDate` 為唯一鍵（原本只用 `name`）

## Impact

### Google Sheets 欄位設計

建議採用「**一列一個口味**」結構，每列代表一個品項的一種口味：

| 欄位 | 欄名 | 說明 | 範例 |
|------|------|------|------|
| A | 品名 | 商品名稱（同品項多列可留白，沿用上列） | `草莓塔` |
| B | 價格 | **此口味**的單價 | `280` |
| C | 圖片 | 商品圖片 URL（同品項共用可留白） | `https://...` |
| D | 口味 | 口味名稱（逗號可分隔多口味共用同日期） | `青檸草莓6入盒` |
| E | 取貨日期 | `YYYY-MM-DD` 格式 | `2026-03-12` |

> 範例：草莓塔有兩種口味，各自有不同日期：
> ```
> 草莓塔, 280, img-url, 青檸草莓6入盒, 2026-03-12
>        , 280,        , 青檸草莓6入盒, 2026-03-13
>        , 320,        , 抹茶草莓6入盒, 2026-03-14
> ```

### 受影響的程式檔案

- `lib/menu.ts`：調整 `MenuItem` 型別，`price` 需下移到 `FlavorSchedule` 層（因不同口味價格不同）；`buildMenuItems` parser 同步更新
- `context/CartContext.tsx`：`CartItem` 新增 `flavor` 與 `pickupDate`；唯一鍵邏輯改為 `name + flavor + pickupDate`
- `components/MenuDesktop.tsx`：Modal 加入口味選擇後動態帶出對應價格；確認加入後傳入 `flavor` 與 `pickupDate`
- `components/MenuMobile.tsx`：加入相同選擇流程（Bottom Sheet 或 Modal）
- `app/cart/page.tsx`：品項顯示加上口味標籤與取貨日期；訂單摘要欄位擴充

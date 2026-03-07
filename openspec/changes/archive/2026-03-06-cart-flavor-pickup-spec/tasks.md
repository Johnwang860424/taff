## 1. 資料型別更新

- [x] 1.1 `lib/menu.ts`：確認 `FlavorSchedule` 含 `flavor: string[]`、`price: number`、`dates: string[]`；`MenuItem` 移除頂層 `price`
- [x] 1.2 `lib/menu.ts`：確認 `buildMenuItems` 支援 A/C 欄留白沿用、D 欄逗號多口味、E 欄逗號多日期
- [x] 1.3 `lib/menu.ts`：確認試算表讀取範圍為 `A:E`（可宅配 & 限自取兩張表）
- [x] 1.4 `context/CartContext.tsx`：`CartItem` 新增 `flavor: string` 與 `pickupDate: string`
- [x] 1.5 `context/CartContext.tsx`：`addItem` 唯一鍵改為 `name + flavor + pickupDate`（相同組合才疊加 quantity）

## 2. MenuDesktop Modal

- [x] 2.1 `MenuDesktop.tsx`：import `useEffect`，加入 `isModalOpen`、`selectedFlavor`、`selectedPickupDate` state
- [x] 2.2 `MenuDesktop.tsx`：`openAddToCartModal` 開啟 Modal，若只有一種口味自動預選
- [x] 2.3 `MenuDesktop.tsx`：計算 `flavorOptions`（從 `flavorSchedules` 攤平去重）
- [x] 2.4 `MenuDesktop.tsx`：計算 `selectedFlavorDates`（依 selectedFlavor 過濾，並排除今日之前的日期）
- [x] 2.5 `MenuDesktop.tsx`：計算 `currentPrice`（selectedFlavor 對應的 price；未選時顯示最低起始價）
- [x] 2.6 `MenuDesktop.tsx`：Modal UI — 商品名稱、動態價格、口味按鈕群組、日期按鈕群組
- [x] 2.7 `MenuDesktop.tsx`：口味未選時日期區顯示「請先選擇口味」；過期日期按鈕 disabled + 灰化
- [x] 2.8 `MenuDesktop.tsx`：口味或日期未選時「確認加入」disabled
- [x] 2.9 `MenuDesktop.tsx`：確認加入時傳入 `flavor`、`pickupDate`、`price` 至 `addItem`
- [x] 2.10 `MenuDesktop.tsx`：點遮罩或 × 關閉 Modal，不加入購物車

## 3. 菜單列表價格顯示

- [x] 3.1 `MenuDesktop.tsx`：列表每筆品項價格改為從 `flavorSchedules` 取最低 price
- [x] 3.2 `MenuDesktop.tsx`：若所有口味同價顯示 `$ xxx`；多種價格顯示 `起 $xxx`
- [x] 3.3 `MenuMobile.tsx`：同上，列表價格顯示邏輯一致

## 4. MenuMobile Bottom Sheet

- [x] 4.1 `MenuMobile.tsx`：加入 `isModalOpen`、`selectedItem`、`selectedFlavor`、`selectedPickupDate` state
- [x] 4.2 `MenuMobile.tsx`：點擊「加入購物車」開啟 Bottom Sheet（`fixed bottom-0 inset-x-0`）
- [x] 4.3 `MenuMobile.tsx`：Bottom Sheet 支援向下滑動關閉（`onTouchStart` / `onTouchMove` / `onTouchEnd` 偵測滑動距離）
- [x] 4.4 `MenuMobile.tsx`：Bottom Sheet 內容與 Desktop Modal 相同（口味、日期、動態價格、確認加入）
- [x] 4.5 `MenuMobile.tsx`：過期日期 disabled；口味/日期未選時確認按鈕 disabled
- [x] 4.6 `MenuMobile.tsx`：確認加入傳入 `flavor`、`pickupDate`、`price`

## 5. 購物車頁面更新

- [x] 5.1 `app/cart/page.tsx`：`OrderForm` 或品項列 type 確認不破壞現有欄位
- [x] 5.2 `app/cart/page.tsx`：每筆購物車品項下方顯示口味（badge 樣式）
- [x] 5.3 `app/cart/page.tsx`：每筆購物車品項下方顯示取貨日期
- [x] 5.4 `app/cart/page.tsx`：確認小計（`price × quantity`）使用 `CartItem.price`（口味對應金額）

## 6. 收尾

- [x] 6.1 `lib/menu.ts`：上線前將 `revalidate` 改回 `3600`
- [x] 6.2 全站確認無 TypeScript linter 錯誤（`npm run build` 無 error）
- [x] 6.3 手動測試：多口味不同價、多日期、過期日期 disabled、購物車同組合疊加、不同組合分開顯示

# Tasks — Mobile-First Dessert Editorial Redesign

## 1. Tokens 與字體基礎

- [x] 1.1 更新 `app/globals.css` 的 `@theme`：依 design.md D1 落地 DESIGN.md 色彩/圓角 tokens，刪除 `accent-gold`、`background-light` 舊 tokens
- [x] 1.2 更新 `app/layout.tsx`：`next/font/google` 改載 Libre Caslon Text、Work Sans、Space Grotesk（保留 Noto TC fallback），更新 `--font-*` 變數與 body class（`bg-background text-on-surface`）
- [x] 1.3 在 globals.css 補齊字體/間距輔助（`--font-label`、body 行高 1.6/長文 1.8 慣例、`margin-page` 用法）並確認 `npm run build` 於此階段可過（元件暫時失色屬預期）

## 2. 全域元件

- [x] 2.1 `components/Navbar.tsx`：移除 `mix-blend-difference` 改明確配色、cart badge 改 token 色、漢堡按鈕改為兩條不等長水平細線（自製 span）、lucide icon `strokeWidth` 調細
- [x] 2.2 `components/MobileSidebar.tsx`：套用新 tokens、幽靈邊框、襯線連結底線樣式
- [x] 2.3 `components/DecorativeCircle.tsx` / `app/layout.tsx`：改用 `Logo.tsx` 的雲朵 SVG 作浮水印，opacity 0.05、fixed 底層、pointer-events 穿透
- [x] 2.4 `components/SocialLinks.tsx`、`components/Logo.tsx`：icon 線條調細、顏色改 token

## 3. 頁面改版（每頁：mobile-first className 反轉 + 新皮膚）

- [x] 3.1 `components/home/Home.tsx`：base 單欄 5vw 邊距，`lg:` 恢復 50/50 分割；CTA 改實心棕 4px 圓角無陰影；文字色改 tokens；版權/編目元素手機可見
- [x] 3.2 `components/brand/Brand.tsx`：同上；引言邊線與分隔線改 ghost-line；編目元素 `01 / BRAND STORY` 手機改水平呈現
- [x] 3.3 `components/contact/Contact.tsx`：同上；地圖容器邊框改 ghost border；`02 / CONTACT US` 手機可見
- [x] 3.4 `components/menu/MenuMobile.tsx`：卡片改無邊框無陰影直角照片 + 兩位數序號；分類 pill 與 badge 改幽靈/棕色系；「已加入購物車」狀態改棕色系（primary + check）；CTA 與 bottom sheet 皮膚更新（互動不變）
- [x] 3.5 `components/menu/MenuDesktop.tsx` + `components/menu/AddToCartModal.tsx`：清單 hover 色、章節標題線、modal 按鈕改主要/幽靈按鈕、「已加入購物車」狀態改棕色系、陰影改 ghost border
- [x] 3.6 `app/cart/page.tsx` + `components/cart/CartItemList.tsx` + `CartDeliveryBadge.tsx`：mobile-first 單欄、標題/連結/badge 改 tokens 與編目風格
- [x] 3.7 `components/cart/CartOrderForm.tsx` + `SocialPlatformSelect.tsx`：輸入欄位改僅底部邊框 + Space Grotesk 全大寫 label；送出按鈕改主要按鈕樣式；錯誤色用 `error` token

## 4. 收尾與驗證

- [x] 4.1 全域 grep 收尾：`accent-gold|background-light|rounded-full|rounded-2xl|shadow-(lg|xl|2xl)|text-gray-|Cormorant|Montserrat` 於 `app/`、`components/` 應僅剩有意保留的例外（逐一確認）
- [x] 4.2 `npm run lint` 與 `npm run build` 通過
- [x] 4.3 `npm run dev`（資料頁用 `npm run preview`）於 375px/768px/1280px 目視驗證：home、brand、menu（含加入購物車 bottom sheet 與 modal）、cart（空/有商品/送出後）、contact、sidebar；確認無水平捲動、行為與改版前一致（使用者確認）

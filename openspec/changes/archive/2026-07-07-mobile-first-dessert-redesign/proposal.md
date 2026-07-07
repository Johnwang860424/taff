# Mobile-First Dessert Editorial Redesign

## Why

目前的 UI 樣式（深炭色 `#2C2C2C` + 金色 `#C6A87C`、Cormorant Garamond/Montserrat 字體、圓角膠囊按鈕與陰影卡片）是早期臨時定調的，與新確立的 `DESIGN.md` 設計系統（金棕主色系、Libre Caslon Text/Work Sans/Space Grotesk 三字體、極簡雜誌風）不一致。同時多數版面以桌機 50/50 分割為出發點再向下適配，行動版體驗（實際主要客群來自 IG/FB/LINE 的手機流量）是事後補的。本次改版要把畫面改為 mobile-first，並全面對齊 DESIGN.md 的甜點店風格。

## What Changes

- **設計 tokens 全面替換**：`app/globals.css` 的 Tailwind v4 `@theme` 改為 DESIGN.md 定義的色彩（primary `#C6A87C` 金棕、background `#EEECE1` 米色 — 實作後由使用者定案保留金/米色調，DESIGN.md 已同步；outline-variant `#d1c4ba` 等其餘依 DESIGN.md）、圓角（4px 為主）與間距 tokens（`margin-page: 5vw`、`stack-*`）。
- **字體系統更換**：Google Fonts 由 Cormorant Garamond/Montserrat 改為 Libre Caslon Text（標題）、Work Sans（內文）、Space Grotesk（編號/標籤），保留 Noto Serif TC / Noto Sans TC 作為中文 fallback。
- **Mobile-first 重構**：所有頁面元件的 className 以手機單欄為 base 樣式，`md:`/`lg:` 才疊加桌機的左右分割與大邊距（現況多處反向）。
- **元件風格對齊 DESIGN.md**：
  - 按鈕：主要按鈕改為實心棕底白字、4px 微圓角、無陰影；次要操作改幽靈按鈕（細棕框）；移除膠囊圓角（rounded-full/xl/2xl）與 hover 陰影。
  - 卡片：菜單卡片改為無邊框、無陰影，圖片直角/微圓角，下方直接銜接文字與 `01, 02` 兩位數序號。
  - 輸入欄位：訂購表單改為僅底部邊框，label 用 Space Grotesk 小型全大寫加字距。
  - 層次：以極細 ghost border 取代陰影；雲朵 Logo 以 5% 透明度作為背景浮水印。
  - 雜誌編目元素：各頁保留/強化 `Section 01 / …` 章節編號，數字統一兩位數並使用 Space Grotesk。
  - 圖示：統一超細線條（lucide `strokeWidth` 調細），漢堡選單改為兩條長度不一的水平細線。
- **不變**：所有資料流、cart/order 邏輯、routing、Desktop/Mobile 元件拆分架構均不動 — 這是純視覺/排版改版。（LIFF 已於本 change 之前另行移除。）

## Capabilities

### New Capabilities

- `design-system`: DESIGN.md 設計系統在程式中的落地 — 色彩/字體/圓角/間距 tokens、按鈕/輸入欄位/卡片/圖示的元件風格規範。
- `mobile-first-layout`: 各頁面（home、brand、menu、cart、contact、navbar）的 mobile-first 響應式排版需求 — base 為手機單欄，斷點向上疊加雜誌式分割構圖。

### Modified Capabilities

（無 — `cart-context`、`cart-item-flavor-pickup`、`menu-flavor-schedule` 為行為規格，本次不改任何行為需求。）

## Impact

- **受影響程式碼**：`app/globals.css`（@theme tokens）、`app/layout.tsx`（字體載入、body class、浮水印）、`components/` 下所有 UI 元件（Navbar、MobileSidebar、Logo、DecorativeCircle、SocialLinks、home/brand/contact/menu/cart 全部）、`app/cart/page.tsx`。
- **不受影響**：`lib/`、`hooks/`、`context/` 的邏輯（僅 className 層面可能微調）、API routes、D1/R2 資料、wrangler 設定。
- **相依套件**：無新增；僅更換 `next/font/google` 載入的字體。
- **風險**：中文字體與 Libre Caslon Text 混排的視覺協調需在瀏覽器實測；`mix-blend-difference`（Navbar）在新配色上的可讀性需重驗。

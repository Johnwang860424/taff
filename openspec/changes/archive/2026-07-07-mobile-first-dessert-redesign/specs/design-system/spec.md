# design-system

DESIGN.md 設計系統在前端程式中的落地：色彩/字體/圓角/間距 tokens 與元件視覺規範。

## ADDED Requirements

### Requirement: Design tokens 定義於 Tailwind theme
系統 SHALL 在 `app/globals.css` 的 `@theme` 區塊定義 DESIGN.md 的設計 tokens：主色 `#C6A87C`（金棕）、背景 `#EEECE1`（米色）、主要文字 `#1b1c1c`、次要文字 `#4e453e`、幽靈邊框線 `#E0DDD5`、outline `#80756d`、outline-variant `#d1c4ba`、soft 圓角 `4px`。UI 元件 MUST 引用這些 tokens，不得使用舊 tokens（`#2C2C2C`、token 名 `accent-gold`/`background-light`）或 hardcode 灰階（如 `text-gray-500`）表達設計系統中已有語意的顏色；色碼字面值 MUST 只出現在 `@theme` 的 token 定義中。

#### Scenario: 全站顏色來自 tokens
- **WHEN** 檢視任一頁面元件的 className 與 `@theme` 定義
- **THEN** 品牌色、背景色、文字色、邊框線均對應 DESIGN.md 色票 tokens，且 grep `accent-gold|background-light|#2C2C2C` 在 `app/` 與 `components/` 下無結果、色碼字面值僅存在於 `app/globals.css`

### Requirement: 三字體系統
系統 SHALL 以 `next/font/google` 載入 Libre Caslon Text（標題襯線）、Work Sans（內文無襯線）、Space Grotesk（編號與標籤），並保留 Noto Serif TC / Noto Sans TC 作為中文 fallback。標題與產品名稱 MUST 使用襯線堆疊，內文 MUST 使用 Work Sans 堆疊且長文行高為 1.8，編號/表單 label/技術性標籤 MUST 使用 Space Grotesk。

#### Scenario: 頁面標題使用襯線字體
- **WHEN** 渲染任一頁面大標題或菜單產品名稱
- **THEN** 英文以 Libre Caslon Text 顯示，中文 fallback 至 Noto Serif TC

#### Scenario: 編號標籤使用 Space Grotesk
- **WHEN** 渲染章節編號或產品序號
- **THEN** 以 Space Grotesk 顯示，且數字為兩位數格式（01、02）並帶 0.1em 字距

### Requirement: 按鈕風格
主要按鈕 SHALL 為實心棕色（primary）背景、白色文字、4px 圓角、無陰影；次要操作 SHALL 為幽靈按鈕（透明背景、outline 色細邊框、4px 圓角）；文字連結 SHALL 為帶底線的襯線體文字，hover 時底線平滑淡出。按鈕 MUST NOT 使用膠囊圓角（rounded-full）或 hover 陰影。

#### Scenario: 主要 CTA 按鈕
- **WHEN** 渲染「線上訂購」「加入購物車」「確認加入」「送出訂單」等主要按鈕
- **THEN** 顯示為實心 primary（`#C6A87C`）底白字、4px 圓角、無 box-shadow

#### Scenario: 次要按鈕
- **WHEN** 渲染「取消」等次要操作按鈕
- **THEN** 顯示為透明背景加細棕邊框的幽靈按鈕

#### Scenario: 已加入購物車成功狀態
- **WHEN** 商品成功加入購物車後按鈕短暫顯示成功狀態
- **THEN** 按鈕以棕色系（primary 底 + check icon）表達成功，MUST NOT 使用綠色

### Requirement: 輸入欄位僅底部邊框
訂購表單的文字輸入欄位 SHALL 僅顯示底部邊框（無封閉外框、無背景填色），focus 時底線變為 primary 色；欄位 label SHALL 使用 Space Grotesk 縮小字級、全大寫並加寬字距。

#### Scenario: 訂購表單輸入框
- **WHEN** 渲染購物車訂購表單的姓名/電話/地址等輸入欄位
- **THEN** 只有底部一條細線（`#E0DDD5`），focus 時底線轉為棕色，label 為小型全大寫 Space Grotesk

### Requirement: 層次以 ghost border 取代陰影
區塊與卡片分隔 SHALL 使用極細 `#E0DDD5` 線條或留白，MUST NOT 使用沉重 box-shadow（shadow-lg/2xl 等）。產品卡片 SHALL 無邊框、無陰影，圖片容器保持直角或極微圓角。

#### Scenario: 菜單產品卡片
- **WHEN** 渲染手機版菜單產品卡片
- **THEN** 卡片無邊框無陰影，頂部為直角（或 ≤4px 圓角）產品照片，下方直接銜接名稱、價格與兩位數序號

### Requirement: 雲朵浮水印
系統 SHALL 將品牌雲朵 Logo（使用現有 `Logo.tsx` 的 SVG）以 0.05 透明度作為全頁固定的背景浮水印呈現（實作為 fixed 低透明度覆蓋層，因各頁區塊背景不透明，置於真正底層會不可見），且 MUST NOT 干擾前景內容的互動與可讀性（pointer-events 穿透、位於 modal/navbar 之下）。

#### Scenario: 浮水印呈現
- **WHEN** 開啟任一頁面
- **THEN** 背景可見低透明度雲朵線稿，點擊穿透至下層內容

### Requirement: 超細線條圖示
UI 圖示 SHALL 統一使用超細線條（lucide `strokeWidth` 1 或同等視覺粗細）；漢堡選單圖示 SHALL 為兩條長度不一的水平細線。

#### Scenario: 行動版選單觸發鈕
- **WHEN** 在手機寬度檢視 Navbar
- **THEN** 漢堡按鈕顯示為兩條不等長水平細線，而非三條等長粗線

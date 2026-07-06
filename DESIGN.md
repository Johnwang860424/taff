---
name: Taff Dessert Design System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4e453e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#80756d'
  outline-variant: '#d1c4ba'
  surface-tint: '#6f5b48'
  primary: '#6c5846'
  on-primary: '#ffffff'
  primary-container: '#86715d'
  on-primary-container: '#fffbff'
  inverse-primary: '#dcc2ab'
  secondary: '#5f5f5a'
  on-secondary: '#ffffff'
  secondary-container: '#e1e0da'
  on-secondary-container: '#63635e'
  tertiary: '#5d5c56'
  on-tertiary: '#ffffff'
  tertiary-container: '#76756e'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f9dec6'
  primary-fixed-dim: '#dcc2ab'
  on-primary-fixed: '#27190a'
  on-primary-fixed-variant: '#564332'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c1'
  on-secondary-fixed: '#1b1c18'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#e5e2da'
  tertiary-fixed-dim: '#c9c6bf'
  on-tertiary-fixed: '#1c1c17'
  on-tertiary-fixed-variant: '#484741'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.8'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-numeric:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.3'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-page: 5vw
  gutter-split: 4rem
  stack-sm: 1rem
  stack-md: 2.5rem
  stack-lg: 5rem
---

## 品牌與風格

本設計系統旨在傳達 **Taff 甜點工作室** 的核心精神：極簡、溫暖、優雅。視覺語彙結合了職人手作的溫度與當代雜誌排版的空氣感。

### 視覺風格：極簡雜誌風 (Minimalist Editorial)
我們採用大面積的留白與非對稱的構圖，創造出如精品雜誌般的閱讀體驗。
- **空氣感：** 透過寬鬆的邊距與行距，讓視覺呼吸，呼應甜點輕盈的口感。
- **職人質感：** 使用細膩的襯線體與手繪線條，展現手工製作的專注與細節。
- **現代感：** 結合規整的無襯線體與簡潔的功能元件，確保數位體驗的直觀與流暢。

## 色彩計畫

色彩靈感源自烘焙過程中的原色：麵粉、奶油與溫潤的火候。

- **Primary (柔和棕):** 用於品牌標誌、重點按鈕與導覽連結，象徵烘焙職人的成熟與穩重。
- **Background (米色/奶油色):** 作為全站背景主色，營造溫馨且舒適的基礎氛圍。
- **Neutral (深炭灰):** 用於所有主要文字內容，確保在米色背景下擁有極佳的易讀性與專業感。
- **Accent (淡雅浮水印):** 品牌雲朵標誌以 5% - 8% 的低透明度作為背景底紋，增加視覺層次而不干擾內容。

## 字體系統

本系統採用雙字體策略，平衡傳統優雅與現代簡潔。

- **標題級別 (Serif):** 使用 `Libre Caslon Text`。展現文學與職人氣息。特別是頁面大標題與產品名稱。
- **內文級別 (Sans-Serif):** 使用 `Work Sans`。確保長篇描述與說明的清晰度，維持現代極簡感。
- **編目與標籤 (Monospace/Geometric):** 使用 `Space Grotesk` 處理如 "01", "02" 的雜誌風格頁碼或技術性標籤，增加設計的結構感。

**排版規範：**
- 數字頁碼必須使用兩位數格式（如 01, 02）。
- 內文段落採用較寬行高（1.8）以強化輕盈的「空氣感」。

## 佈局與間距

遵循雜誌編目美學，強調非對稱性。

- **佈局模型：** 採用 12 欄彈性網格，但內容通常偏離中心線。
- **左右分割構圖：** 在桌機版面上，頻繁使用 50/50 或 40/60 的左右分割，一側為產品攝影，另一側為文字與留白。
- **斷點規範：**
  - **Desktop (1200px+):** 使用大面積頁邊距 (5vw)，內容欄位寬度最大限制。
  - **Tablet (768px - 1199px):** 減少分割間距，內容改為垂直堆疊但保留左右錯位的平衡。
  - **Mobile (767px以下):** 取消複雜分割，轉為單欄流動，但保持頂部與底部的寬鬆間距。

## 層次與深度

為了維持極簡與職人質感，我們避免使用沈重的陰影。

- **低對比輪廓 (Ghost Borders):** 區塊分隔使用極細 (#E0DDD5) 的線條，而非物理陰影。
- **疊加層次：** 圖片可以稍微重疊在背景文字或另一個色塊上，創造出類似紙張拼貼的平面深度感。
- **透明度應用：** 背景浮水印 (雲朵 Logo) 固定於底層，透明度設定為 0.05，確保不干擾前排資訊。

## 形狀語彙

雖然 Logo 包含圓形雲朵，但 UI 元件應保持克制，以直線為主、圓角為輔。

- **容器與按鈕：** 使用 `Soft` 圓角 (4px)，既能保留現代主義的俐落，又能呼應甜點的柔和感。
- **圖片容器：** 產品圖片通常保持直角或極微圓角，模擬實體沖印照片的邊緣。
- **Logo 元素：** 手繪雲朵標誌始終保持其原始的不規則有機形狀，作為設計中唯一的「非幾何」亮點。

## 元件規範

### 1. 按鈕 (Buttons)
- **主要按鈕：** 實心棕色背景，白色文字，無陰影，微小圓角。
- **幽靈按鈕：** 細線條 (#8C7662) 邊框，背景透明，用於次要操作。
- **文字連結：** 帶有底線的襯線體文字，滑過時底線平滑消失。

### 2. 圖示風格 (Icons)
- 統一使用 **超細線條 (Hairline/Thin)** 圖示，線條寬度與文字筆畫粗細一致。
- 漢堡選單改為兩條長度不一的水平細線，體現不對稱美學。

### 3. 輸入欄位 (Inputs)
- 僅顯示底部邊框 (Bottom border-only)，不使用封閉式邊框，增加視覺的穿透力。
- Label 字體使用縮小後的 `Space Grotesk` 全大寫並增加字距。

### 4. 產品卡片 (Cards)
- 無邊框、無陰影。
- 頂部為高品質甜點攝影，下方直接銜接文字說明與「01, 02」序號。

### 5. 雜誌編目元素 (Editorial Elements)
- 在頁面轉折處或區塊頂部，標註細線與對應的章節編號（如：Section 01 / Selected Sweets）。
---
name: Taff Dessert Design System
colors:
  primary: '#C6A87C'
  primary-dark: '#5C4230'
  on-primary: '#ffffff'
  background: '#EFE9DE'
  surface-container: '#FBF7F2'
  on-surface: '#2B241E'
  on-surface-variant: '#6F6156'
  outline: '#9D8F80'
  outline-variant: '#E6DCCD'
  ghost-line: '#E6DCCD'
  primary-fixed: '#F1E4D2'
  error: '#ba1a1a'
typography:
  display-hero:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 31px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 44px
    fontWeight: '400'
    lineHeight: '1.25'
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 27px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 23px
    fontWeight: '400'
    lineHeight: '1.4'
  title-product:
    fontFamily: Libre Caslon Text
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.4'
  body-md:
    fontFamily: Work Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.85'
  body-sm:
    fontFamily: Work Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
  label-tracking:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.22em
rounded:
  soft: 4px
  md: 0.375rem
  lg: 0.5rem
  sheet-top: 1rem
  full: 9999px
spacing:
  margin-page: 5vw
  header-mobile: 56px
  tabbar-mobile: 64px
---

## 品牌與風格

本設計系統旨在傳達 **Taff 甜點工作室** 的核心精神：極簡、溫暖、優雅。視覺語彙結合了職人手作的溫度與當代雜誌排版的空氣感。

### 視覺風格：溫暖極簡 (Warm Minimalist)
以米杏色基底、細線分隔與寬鬆留白，創造安靜舒適的閱讀體驗。
- **空氣感：** 透過寬鬆的邊距與行距，讓視覺呼吸，呼應甜點輕盈的口感。
- **職人質感：** 標題使用細膩的襯線體，展現手工製作的專注與細節。
- **行動優先：** 手機版採 App 化外殼（頂欄 + 底部分頁列），桌機版為傳統頂部導覽，介面在兩種型態間保持同一套語彙。

## 色彩計畫

色彩靈感源自烘焙過程中的原色：麵粉、奶油與溫潤的火候。所有 token 落地於 `app/globals.css` 的 `@theme`。

- **Primary `#C6A87C` (柔和金棕):** 品牌標誌、主要按鈕、當前導覽狀態與強調文字。
- **Primary-dark `#5C4230` (深棕):** 主要按鈕 hover / active 狀態。
- **Background `#EFE9DE` (米杏):** 全站背景主色，營造溫馨且舒適的基礎氛圍。
- **Surface-container `#FBF7F2` (卡片米白):** 卡片、底部分頁列、桌機版表單容器等浮出區塊的底色。
- **On-surface `#2B241E` (墨棕):** 主要文字。On-surface-variant `#6F6156` 用於次要文字，Outline `#9D8F80` 用於最弱化的說明與未選中圖示。
- **Ghost-line `#E6DCCD` (幽靈線):** 所有區塊分隔線、細邊框與停用按鈕底色。
- **Primary-fixed `#F1E4D2` (淺茶):** 提示區塊（如「限自取」通知）、縮圖字母替代底色、成功狀態圓形底色。
- **Accent (淡雅浮水印):** 品牌雲朵標誌以 5% 低透明度作為背景底紋，增加視覺層次而不干擾內容。

## 字體系統

三字體策略，平衡傳統優雅與現代簡潔（皆搭配 Noto TC 系列作為中文 fallback）。

- **標題級別 (Serif):** `Libre Caslon Text`。頁面大標題（手機 27px / 桌機 44px）、首頁 hero（31px / 64px）、產品名稱（18px）、彈窗標題（23px）。
- **內文級別 (Sans-Serif):** `Work Sans`。內文 15px、說明文字 12.5–13px；品牌故事等長文採 1.85 行高強化「空氣感」，一般內文 1.6。
- **追蹤標籤 (Geometric):** `Space Grotesk` 用於小型寬字距標識（如頂欄 `TAFF DESSERT`，10px、字距 0.22em）。

**排版規範：**
- 導覽連結為 15px、近正常字距（0.02em）、正常字重；不使用全大寫寬字距樣式。
- 中文標題與內文不加額外字距，維持字形自然密度。

## 佈局與間距

### App 外殼（斷點 `md` 768px 切換）
- **手機版：** 頂欄 56px（sticky，品牌識別）＋ 底部分頁列 64px（fixed，首頁 / 菜單 / 購物車 / 我們，含 safe-area 內距）。內容容器保留 `calc(64px + env(safe-area-inset-bottom))` 底部空間。
- **桌機版：** sticky 頂部導覽（`background/90` + backdrop-blur + 底部幽靈線），左側 Logo + 塔芙，右側文字連結與購物袋圖示（含數量徽章）。

### 頁面構圖（內容斷點 `lg`）
- **左右分割構圖：** 首頁 hero 採 50/50 分割（文案｜攝影），關於頁採 44/56 分割（攝影｜文字）。
- **手機版：** 單欄流動；首頁 hero 為 270px 滿版圖 + 底部漸層文字疊加；推薦商品採橫向滑動卡片（隱藏捲軸）。
- **頁邊距：** 手機 5vw（`margin-page` token），桌機內容區設最大寬度（約 1040–1120px）置中。

## 層次與深度

為了維持極簡與職人質感，幾乎不使用陰影。

- **低對比輪廓 (Ghost Borders):** 區塊分隔一律使用極細 `#E6DCCD` 線條。
- **唯一例外：** 桌機版置中對話框使用大範圍柔和陰影（`0 24px 70px rgba(43,36,30,.28)`）以自背景浮起。
- **透明度應用：** 背景浮水印（雲朵 Logo）固定於底層，透明度 0.05，確保不干擾前排資訊。

## 形狀語彙

UI 元件以直線為主、圓角為輔；手繪雲朵 Logo 為唯一的有機形狀亮點。

- **按鈕、chips、輸入提示框、縮圖：** `soft` 圓角（4px）。
- **卡片容器：** `md` 圓角（6px）。
- **手機版底部彈出面板 (Bottom Sheet):** 頂部 `2xl` 圓角 + 38×4px 拖曳把手。
- **桌機版對話框：** `lg` 圓角（8px）、寬 460px 置中。
- **徽章與把手：** 全圓角（pill / circle）。

## 元件規範

### 1. 按鈕 (Buttons)
- **主要按鈕：** 實心 primary 金棕背景、白色文字、無陰影、soft 圓角；hover 轉 primary-dark，按下輕微縮放（scale 0.98–0.99）。
- **幽靈按鈕：** primary 細邊框、背景透明，用於次要操作（如「認識我們」「Instagram 私訊」）。
- **停用狀態：** `ghost-line` 底色 + `outline` 文字（如加入購物車前的「請選擇口味與日期」）。
- **文字連結：** 帶底線的內文連結，或導覽式「看全部 →」。

### 2. Chips（口味 / 日期 / 分類選擇）
- soft 圓角細邊框；未選中為 `ghost-line` 邊框 + 深色文字，選中為實心 primary + 白字。
- 分類 pills 在手機菜單頁 sticky 於頂欄下方（`top-14`）。

### 3. 圖示風格 (Icons)
- 統一使用**超細線條 (Hairline)** 圖示，strokeWidth 1.2–1.6，線條粗細與文字筆畫一致。
- 導覽不使用漢堡選單；手機版導覽由底部分頁列承擔（四個線條圖示 + 中文標籤，購物車附 primary 圓形數量徽章，9+ 封頂）。

### 4. 輸入欄位 (Inputs)
- 僅顯示底部邊框 (Bottom border-only)，focus 時邊框轉 primary，不使用封閉式邊框。
- Label 使用 12.5px `on-surface-variant` 無襯線體，必填以 primary 色 `*` 標示。
- 錯誤訊息以 error 色小字直接列於欄位下方；整單錯誤用 `error/5` 底色 + `error/30` 邊框的提示框。

### 5. 產品卡片 (Cards)
- 無邊框、無陰影；圖片容器 soft 圓角。
- 手機菜單為列表式（104px 方形縮圖 + 名稱 / 描述 / 價格 + 「加入」按鈕，列間以幽靈線分隔）。
- 桌機菜單為 2–3 欄網格（方形圖、襯線名稱 + 價格、描述、整寬「加入購物車」按鈕）。
- 縮圖無圖片時以 `primary-fixed` 底色 + 襯線首字作為替代顯示。

### 6. 黏著操作列 (Sticky Actions)
- 手機版購物車送出按鈕固定於底部分頁列上方（`bottom: calc(64px + safe-area)`），`surface-container` 底色 + 頂部幽靈線；標籤為「送出訂單 · $ 總額」。
- 桌機版送出按鈕收於右欄表單卡片內，不使用黏著定位。

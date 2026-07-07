# mobile-first-layout

## Purpose

各頁面（home、brand、menu、cart、contact、navbar）的 mobile-first 響應式排版需求：base 樣式為手機單欄，斷點向上疊加雜誌式分割構圖。

## Requirements

### Requirement: Mobile-first className 慣例
所有頁面元件的 Tailwind className SHALL 以手機（<768px）為無前綴的 base 樣式，`md:` 及以上前綴僅用於疊加平板/桌機樣式。MUST NOT 出現以桌機為 base、用無前綴樣式描述桌機再靠 override 適配手機的寫法。

#### Scenario: 檢視任一頁面元件
- **WHEN** 閱讀 home/brand/menu/cart/contact 元件的 className
- **THEN** 無前綴 class 描述的是手機單欄呈現，分割構圖與大邊距僅出現在 `md:`/`lg:`/`xl:` 前綴中

### Requirement: 手機單欄流動排版
在 767px 以下寬度，各頁 SHALL 為單欄垂直流動排版：取消左右分割，保持寬鬆的頂部與底部留白，頁面水平邊距為 5vw。內容 MUST NOT 產生水平捲動。

#### Scenario: 手機檢視首頁
- **WHEN** 以 375px 寬度開啟 `/`
- **THEN** 形象照片與文字區塊垂直堆疊為單欄，無水平捲動，主 CTA 完整可見可點

#### Scenario: 手機檢視購物車
- **WHEN** 以 375px 寬度開啟 `/cart`（有商品）
- **THEN** 商品清單與訂購表單垂直堆疊為單欄，表單欄位寬度不溢出

### Requirement: 桌機雜誌式分割構圖
在 1200px 級別寬度（`xl:` 或 `lg:` 近似），home/brand/menu/contact SHALL 呈現左右分割構圖（50/50 或 40/60，一側為攝影、一側為文字與留白），頁邊距為 5vw；平板區間（768–1199px）SHALL 為垂直堆疊但保留非對稱錯位平衡。

#### Scenario: 桌機檢視品牌故事頁
- **WHEN** 以 ≥1280px 寬度開啟 `/brand`
- **THEN** 照片與文字呈左右分割，頁面兩側留有約 5vw 邊距

### Requirement: 雜誌編目元素跨斷點呈現
除首頁（作為封面頁，以無編號 eyebrow 與版權標示替代）外，各頁面 SHALL 顯示章節編號的編目元素（格式含兩位數編號與章節名，如 `01 / BRAND STORY`）：桌機維持頁面角落直排/角落定位，手機 SHALL 改為區塊頂部的水平細線 + 編號呈現，MUST NOT 直接隱藏。

#### Scenario: 手機檢視聯絡頁
- **WHEN** 以 375px 寬度開啟 `/contact`
- **THEN** 頁面內可見 `02 / CONTACT US`（或同格式）編目元素，未被 `hidden` 移除

### Requirement: 既有行為與元件架構不變
Mobile-first 改版 SHALL 保持現有行為不變：`MenuDesktop`/`MenuMobile` 拆分架構、bottom-sheet 加入購物車流程、cart 的配送方式判斷、Navbar 的 cart badge 與 sidebar 開合，均 MUST 與改版前行為一致。

#### Scenario: 手機加入購物車流程
- **WHEN** 在手機版菜單點擊「加入購物車」並完成口味/日期選擇
- **THEN** bottom sheet 互動（上滑開啟、下滑關閉、確認加入）與改版前一致，僅視覺皮膚改變

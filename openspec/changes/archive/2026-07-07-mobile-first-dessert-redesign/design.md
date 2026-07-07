# Design — Mobile-First Dessert Editorial Redesign

## Context

- 樣式技術棧：Tailwind CSS v4（無 `tailwind.config`，tokens 在 `app/globals.css` 的 `@theme` 區塊）、`next/font/google` 載入字體並以 CSS 變數注入。
- 現況 tokens：`--color-primary: #2C2C2C`（深炭）、`--color-background-light: #EEECE1`、`--color-accent-gold: #C6A87C`；字體 Cormorant Garamond（serif）/ Montserrat（sans）+ Noto TC fallback。
- 現況排版：home/brand/contact/menu(desktop) 皆為 `flex-col md:flex-row` 的 50/50 分割，桌機邊距 `md:p-24` 寫死；menu 已有 `MenuDesktop`/`MenuMobile` 拆分；cart 為單頁雙欄 grid。
- 目標設計系統：`DESIGN.md`（repo 根目錄）— 色彩/字體/圓角/間距 tokens 於 frontmatter，風格規範（極簡雜誌風、ghost borders、底線輸入框、兩位數編號等）於內文。
- 不少既有 class 使用非 token 顏色（`text-gray-500`、`bg-stone-900/10`、`border-black/10`、`bg-green-500`），需一併收斂。

## Goals / Non-Goals

**Goals:**

- `@theme` 完整承載 DESIGN.md tokens，元件一律引用 token、不再出現 hardcode 灰階/金色。
- 所有頁面 className 改為 mobile-first：無前綴 = 手機樣式，`md:`/`lg:` 疊加桌機分割與大邊距。
- 元件視覺對齊 DESIGN.md 元件規範（按鈕、輸入欄位、卡片、圖示、編目元素、浮水印）。
- `npm run lint` / `npm run build` 通過；`npm run dev` 下逐頁目視驗證手機與桌機斷點。

**Non-Goals:**

- 不改任何資料流、API、cart/order 行為、routing。（LIFF 已於本次改版前另行移除，不在本 change 範圍內。）
- 不合併 `MenuDesktop`/`MenuMobile` 為單一響應式元件（維持現有架構，只改樣式）。
- 不重畫 Logo / 不換品牌素材照片。
- 不做 dark mode。

## Decisions

### D1 — Token 命名：沿用語意名，對映 Material 式色票的子集

DESIGN.md 的色票是 Material 3 風格的完整列表（40+ 色）。全部搬進 `@theme` 會產生大量沒人用的 class。決定只落地實際會用到的子集，並保留現有語意命名以減少改動面：

```css
@theme {
  --color-primary: #C6A87C;            /* 金棕（使用者定案，取代原深炭 #2C2C2C） */
  --color-on-primary: #ffffff;
  --color-background: #EEECE1;         /* 米色（使用者定案，沿用原底色值、token 改名） */
  --color-surface-container: #f0eded;  /* 卡片/區塊底 */
  --color-on-surface: #1b1c1c;         /* 主要文字 */
  --color-on-surface-variant: #4e453e; /* 次要文字（取代 text-gray-500） */
  --color-outline: #80756d;            /* 幽靈按鈕邊框（≈ DESIGN.md #8C7662） */
  --color-outline-variant: #d1c4ba;    /* ghost border 細線 */
  --color-ghost-line: #E0DDD5;         /* 區塊分隔極細線（DESIGN.md 內文指定） */
  --color-primary-fixed: #f9dec6;      /* 淡棕高亮/badge 底 */
  --color-error: #ba1a1a;
  --font-serif: var(--font-caslon), var(--font-noto-serif), serif;
  --font-sans: var(--font-work-sans), var(--font-noto-sans), sans-serif;
  --font-label: var(--font-space-grotesk), monospace;
  --radius-soft: 4px;
}
```

`accent-gold` token 直接刪除（不留 alias），強迫所有引用點在改版時被逐一檢視改為 `primary` 或 `outline`。舊 `background-light` 同理改名 `background`。

**色彩定案（2026-07-07，實作驗證後由使用者拍板）**：primary 採金棕 `#C6A87C`、background 採米色 `#EEECE1`（保留原品牌的金/米色調，而非 Material 色票的柔和棕/近白）；DESIGN.md frontmatter 與 specs 已同步此定案。其餘 tokens 維持 DESIGN.md 原值。

*替代方案*：完整搬入 40+ Material tokens — 放棄，維護成本高且多數用不到；需要時再加。

### D2 — 字體：三英文字體 + 保留 Noto TC fallback，中文標題用 Noto Serif TC

`next/font/google` 改載 `Libre_Caslon_Text`（400/700 + italic）、`Work_Sans`（300–500）、`Space_Grotesk`（500）。Noto Serif TC / Noto Sans TC 保留為中文 fallback（`preload: false` 維持現狀）。Libre Caslon Text 無中文字形，中文標題實際渲染為 Noto Serif TC — 這是預期行為，字體堆疊順序已保證。新增 `--font-label` 專供編號/表單 label/技術性標籤，不進 `--font-sans` 堆疊。

*替代方案*：中文標題另指定楷體類 — 放棄，DESIGN.md 未定義中文字體策略，Noto Serif TC 與 Caslon 氣質一致。

### D3 — Mobile-first 改寫策略：逐元件反轉斷點，不重寫結構

現有 JSX 結構（分割排版的 order、grid）大致可沿用，改動集中在 className：

- 基準（無前綴）一律寫手機樣式：單欄、`px-[5vw]`（`margin-page` token）、寬鬆上下留白（`stack-*`）。
- `md:` 疊加 Tablet（垂直堆疊但左右錯位）、`lg:` 疊加 Desktop 分割（50/50、40/60）與 `5vw` 頁邊距 — 對應 DESIGN.md 斷點規範（767 / 1200 分界；Tailwind 預設 `md:768px` / `xl:1280px` 足夠近似，不自訂斷點）。
- 現有 `md:p-24` 這類寫死大邊距改為 `lg:px-[5vw]` + 內容 max-width。
- `MenuMobile` 保持 bottom-sheet 互動不變，只換卡片與按鈕皮膚。

*替代方案*：自訂 `@theme` breakpoint 精確到 1200px — 放棄，與 Tailwind 生態預設偏離的收益太小。

### D4 — 元件皮膚規則（全站一致套用）

| 元件 | 現況 | 改為 |
|---|---|---|
| 主要按鈕 | `bg-primary rounded-full hover:shadow-2xl` | `bg-primary text-on-primary rounded-soft`，無陰影，hover 改深一階棕 |
| 次要按鈕 | `border border-black/20 rounded-xl` | 幽靈按鈕：`border border-outline text-primary rounded-soft` 背景透明 |
| 文字連結 | 金色底線 | 襯線體 + 底線，hover 底線淡出 |
| 卡片（MenuMobile） | `bg-white rounded-2xl` + badge 膠囊 | 無邊框無陰影、圖片直角、文字下墜排版 + `01` 序號（Space Grotesk） |
| 輸入欄位（CartOrderForm） | 封閉邊框 | `border-0 border-b border-ghost-line focus:border-primary`，label 為 Space Grotesk 全大寫 `tracking-[0.1em]` 縮小字級 |
| Modal/BottomSheet | `rounded-2xl shadow-2xl` | 保留功能性圓角上緣（bottom sheet 可用性優先），陰影減淡、加 ghost border |
| 圖示 | lucide 預設 strokeWidth 2 | 全站 `strokeWidth={1}`；漢堡選單改兩條不等長水平細線（自製 span，不用 lucide Menu） |
| 陰影 | shadow-sm/lg/2xl 散落 | 移除，一律 ghost border（`border-ghost-line`） |
| 浮水印 | `DecorativeCircle`（fixed 置中） | 改用現有 `Logo.tsx` 的雲朵 SVG，opacity 0.05，fixed 低透明度覆蓋層（pointer-events 穿透；因區塊背景不透明，置真正底層會不可見） |
| 編目元素 | 各頁已有 `— 01` 直排字 | 統一格式 `SECTION 01 / <NAME>`，Space Grotesk、兩位數，手機也顯示（現況 `hidden md:block`，改為手機置於區塊頂部水平呈現） |

顏色替換對照：`text-gray-*` → `text-on-surface-variant`、`accent-gold` → 語境判斷（強調文字 → `primary`；細線 → `outline-variant`）、`bg-stone-900/10` 圖片遮罩 → 保留但改 `bg-on-surface/10`、`bg-green-500`（已加入購物車）→ 改棕色系：`bg-primary` + check icon 表達成功狀態，不再使用綠色。

### D5 — 驗證方式

無測試套件。驗證 = `npm run lint` + `npm run build` + `npm run dev` 逐頁在 375px / 768px / 1280px 三寬度目視檢查（home、brand、menu、cart 空/有商品/送出後、contact、navbar/sidebar、加入購物車 modal 與 bottom sheet）。資料相依頁面用 `npm run preview` 帶本地 D1/R2 bindings 驗證。

## Risks / Trade-offs

- [中英混排：Caslon 與 Noto Serif TC 的字重/基線差異可能使標題視覺不齊] → 實測後必要時對中文標題微調 `tracking`/`font-weight`；標題盡量避免中英同行。
- [Navbar `mix-blend-difference` 在新米白背景 + 棕色文字下可讀性未知] → 改版時改為明確配色（照片上白字、淺底棕字）取代 blend 技巧，行為更可預測。
- [移除膠囊圓角與陰影後，行動版按鈕的可點擊感下降] → 以尺寸（足夠的 py）、實心色塊與 active 態（`active:scale`/變深）補償。
- [大量 className 改動屬機械式修改，容易漏改造成新舊風格混雜] → 完成後全域 grep `accent-gold|background-light|rounded-full|rounded-2xl|rounded-xl|shadow-(sm|md|lg|xl|2xl)|text-gray-|Cormorant|Montserrat` 收尾檢查。
- [字體更換影響 CLS/載入] → 維持 `display: swap` 與中文字體 `preload: false`，與現狀相同。

## Migration Plan

單一前端改版、無資料遷移。依 tasks 順序：tokens/字體 → 全域元件（Navbar/Sidebar/浮水印）→ 逐頁改版 → grep 收尾 → lint/build/目視驗證。可整包一次部署；回滾即 revert commit。

## Open Questions

（已全數定案）

- ~~「已加入購物車」的成功綠是否改為棕色系？~~ → **已決定**：改棕色系（`primary` + check icon），不用綠色。
- ~~雲朵浮水印的素材來源？~~ → **已決定**：直接使用現有 `Logo.tsx` 的 SVG。

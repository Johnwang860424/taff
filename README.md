# Taff Dessert Studio

`Taff Dessert Studio` 是一個以 `Next.js` 建置的甜點品牌網站，包含首頁、品牌故事、聯絡頁、線上菜單、購物車，以及串接 Google Sheets 的菜單讀取與訂單寫入流程。

## 功能

- 品牌導向的形象首頁與內容頁面
- 線上菜單，區分可宅配與限自取品項
- 購物車支援品項、口味、取貨日與數量管理
- `POST /api/order` 可將訂單寫入 Google Sheets
- 菜單資料從 Google Sheets 讀取，並做快取與定時更新

## 技術架構

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `googleapis`

## 路由

- `/` 首頁
- `/brand` 品牌故事
- `/menu` 線上訂購菜單
- `/cart` 購物車與結帳表單
- `/contact` 聯絡資訊

## 本機開發

### 前置需求

- `Node.js`
- `npm`
- 可存取 Google Sheets 的 service account

### 安裝

```bash
npm install
```

### 環境變數

建立 `.env.local`：

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=menu-spreadsheet-id
GOOGLE_ORDER_SPREADSHEET_ID=order-spreadsheet-id
```

說明：

- `GOOGLE_SPREADSHEET_ID`：用來讀取菜單資料
- `GOOGLE_ORDER_SPREADSHEET_ID`：用來寫入訂單資料
- `GOOGLE_PRIVATE_KEY` 在 `.env.local` 內要保留 `\n` 換行跳脫字元

### 啟動

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## 可用指令

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 資料流程

### 菜單資料

- 從 Google Sheets 的 `'可宅配'!A:E` 與 `'限自取'!A:E` 讀取資料
- 將列資料整理成品項、口味排程與可取貨日期
- 使用 `revalidate: 3600` 做快取更新

### 訂單送出

- 由 `POST /api/order` 接收購物車與表單資料
- 依照 `YYYY-MM` 分組到對應工作表
- 將訂單資料 append 到目標 Google Sheets

## 專案結構

```text
app/                  Next.js App Router 頁面與 API routes
components/           頁面元件與購物車相關 UI
context/              購物車狀態管理
lib/                  Google Sheets 菜單讀取與解析
constants/            靜態常數資料
```

# Taff Dessert Studio

`Taff Dessert Studio` 是一個以 `Next.js` 建置的甜點品牌網站，包含首頁、品牌故事、聯絡頁、線上菜單、購物車，以及串接 Google Sheets 的菜單讀取與訂單寫入流程。

## 功能

- 品牌導向的形象首頁與內容頁面
- 線上菜單，區分可宅配與限自取品項
- 購物車支援品項、口味、取貨日與數量管理
- `POST /api/order` 可將訂單寫入 Google Sheets
- 菜單資料從 Google Sheets 讀取，並做快取與手動更新
- 頁面圖片從 Cloudinary 動態取得版本號，並支援手動清除快取

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
- Cloudinary 帳號（需有 API Key 與 API Secret）

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

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

ADMIN_SECRET_TOKEN=your-secret-token
```

說明：

- `GOOGLE_SPREADSHEET_ID`：用來讀取菜單資料
- `GOOGLE_ORDER_SPREADSHEET_ID`：用來寫入訂單資料
- `GOOGLE_PRIVATE_KEY` 在 `.env.local` 內要保留 `\n` 換行跳脫字元
- `CLOUDINARY_*`：用來從 Cloudinary Admin API 動態取得圖片版本號
- `ADMIN_SECRET_TOKEN`：用來驗證 `/api/revalidate` 請求

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

- 從 Google Sheets 的 `Products!A:E` 與 `Variants!A:D` 讀取靜態品項資料
- 每次請求即時讀取 `Inventory!A:C` 庫存資料
- 靜態資料使用 `unstable_cache` 搭配 `tags: ["menu"]` 做快取，手動透過 `POST /api/revalidate` 清除

### 圖片快取

- 頁面圖片（首頁、品牌故事、聯絡）透過 Cloudinary Admin API 取得版本號
- 使用 Next.js fetch cache 搭配 `tags: [publicId]` 做快取
- 可針對單張圖片或全部圖片手動清除快取

### 訂單送出

- 由 `POST /api/order` 接收購物車與表單資料
- 依照 `YYYY-MM` 分組到對應工作表
- 將訂單資料 append 到目標 Google Sheets

## API

### `POST /api/revalidate`

手動清除指定 tag 的快取。

**Request body：**

```json
{
  "secret": "your-secret-token",
  "tag": "menu"
}
```

**常用 tag：**

| tag                     | 說明         |
| ----------------------- | ------------ |
| `menu`                  | 菜單靜態資料 |
| `taff/site/home`        | 首頁圖片     |
| `taff/site/brand-story` | 品牌故事圖片 |
| `taff/site/contact`     | 聯絡頁圖片   |

## 專案結構

```text
app/                  Next.js App Router 頁面與 API routes
components/           頁面元件與購物車相關 UI
context/              購物車狀態管理
lib/                  菜單讀取、Cloudinary 工具函數
constants/            靜態常數資料
```

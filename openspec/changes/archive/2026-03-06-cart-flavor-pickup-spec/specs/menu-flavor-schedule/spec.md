## ADDED Requirements

### Requirement: 從 Google Sheets 讀取口味與取貨日期欄位
系統 SHALL 從試算表 `A:E` 欄位讀取菜單資料，並依以下規則解析：

| 欄 | 欄名 | 說明 |
|----|------|------|
| A | name | 商品名稱，留白時沿用上一列 |
| B | price | 此列口味群組的單價 |
| C | image | 商品圖片 URL，留白時沿用上一列 |
| D | flavor | 口味名稱，逗號分隔可設多個（共用同列 price 與 dates） |
| E | pickupDate | 可取貨日期，逗號分隔可設多個，格式 YYYY-MM-DD |

#### Scenario: 單一口味單一日期
- **WHEN** 試算表一列為 `布丁, 60, img, 原味, 2026-03-12`
- **THEN** 解析為 `{ name:"布丁", img:"...", flavorSchedules:[{ flavor:["原味"], price:60, dates:["2026-03-12"] }] }`

#### Scenario: D 欄逗號分隔多口味共用同價格與日期
- **WHEN** 試算表一列 D 欄為 `原味,巧克力`，B 欄為 `60`，E 欄為 `2026-03-12`
- **THEN** 解析為 `flavorSchedules:[{ flavor:["原味","巧克力"], price:60, dates:["2026-03-12"] }]`

#### Scenario: E 欄逗號分隔多個取貨日期
- **WHEN** E 欄值為 `2026-03-12,2026-03-19`
- **THEN** `dates` 陣列為 `["2026-03-12","2026-03-19"]`

#### Scenario: A 欄留白沿用上一列品名
- **WHEN** 第二列 A 欄為空，第一列品名為 `布丁`
- **THEN** 第二列的 `name` 解析為 `布丁`

#### Scenario: C 欄留白沿用上一列圖片
- **WHEN** 後續列 C 欄為空，前一非空列 C 欄有 URL
- **THEN** 後續列使用前一非空列的圖片 URL

---

### Requirement: 資料快取控制
系統 SHALL 對菜單資料套用 `unstable_cache`，並在開發環境使用短 revalidate，正式環境使用長 revalidate。

#### Scenario: 快取在正式環境每小時更新一次
- **WHEN** 環境為 production
- **THEN** `revalidate` SHALL 設為 `3600`

#### Scenario: 快取在開發環境快速更新
- **WHEN** 環境為 development（開發調試期）
- **THEN** `revalidate` 可設為 `1` 以利即時測試

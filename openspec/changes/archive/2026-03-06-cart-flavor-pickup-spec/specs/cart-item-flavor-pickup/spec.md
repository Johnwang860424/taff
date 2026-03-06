## ADDED Requirements

### Requirement: 加入購物車前顯示口味與日期選擇 Modal
點擊「加入購物車」按鈕時，系統 SHALL 顯示一個 Modal（桌機）或 Bottom Sheet（手機），
讓顧客在確認加入前選擇口味與取貨日期。

#### Scenario: 開啟 Modal
- **WHEN** 使用者點擊「加入購物車」按鈕
- **THEN** 系統顯示 Modal，內含商品名稱、口味選項、取貨日期選項

#### Scenario: 點擊遮罩或叉叉關閉 Modal
- **WHEN** 使用者點擊 Modal 背景遮罩或右上角 × 按鈕
- **THEN** Modal 關閉，購物車不新增任何品項

#### Scenario: 手機版底部滑出並支援下滑關閉
- **WHEN** 使用者在手機版點擊「加入購物車」
- **THEN** Bottom Sheet 從螢幕底部滑入，可點叉叉或向下滑動關閉

---

### Requirement: 口味選擇動態帶出對應價格
選擇口味後，Modal 內的商品價格 SHALL 即時更新為該口味的對應金額。

#### Scenario: 選擇口味更新價格
- **WHEN** 使用者點擊某口味按鈕
- **THEN** Modal header 的價格顯示切換為該口味的 price
- **THEN** 取貨日期選項更新為僅顯示該口味可用日期

#### Scenario: 只有一種口味時自動預選
- **WHEN** Modal 開啟且商品只有一種口味
- **THEN** 該口味自動處於已選狀態，直接顯示對應日期選項

---

### Requirement: 取貨日期過期自動 disabled
系統 SHALL 將今日之前的取貨日期設為不可選取狀態（disabled），不予顯示或灰化。

#### Scenario: 過期日期顯示為 disabled
- **WHEN** Modal 顯示取貨日期選項
- **THEN** 日期早於今日（`< new Date()` 當天 00:00）的按鈕為 disabled 且視覺灰化
- **THEN** disabled 按鈕不可被點擊

#### Scenario: 所有日期均過期
- **WHEN** 該口味所有取貨日期均早於今日
- **THEN** 顯示提示文字「此口味目前無可取貨日期」
- **THEN** 「確認加入」按鈕維持 disabled

---

### Requirement: 確認加入前須完成所有必填選項
口味與取貨日期均為必填，系統 SHALL 在任一未選時禁用「確認加入」按鈕。

#### Scenario: 未選口味時確認按鈕 disabled
- **WHEN** Modal 開啟且使用者尚未選擇口味
- **THEN** 「確認加入」按鈕為 disabled

#### Scenario: 已選口味但未選日期時確認按鈕 disabled
- **WHEN** 使用者已選口味但未選取貨日期
- **THEN** 「確認加入」按鈕為 disabled

#### Scenario: 口味與日期均已選擇後可確認
- **WHEN** 使用者選定口味與取貨日期
- **THEN** 「確認加入」按鈕啟用
- **WHEN** 使用者點擊「確認加入」
- **THEN** 品項（含口味、日期、對應價格）加入購物車，Modal 關閉

---

### Requirement: 列表頁顯示起始價格
菜單品項列表的價格欄 SHALL 顯示該商品所有口味中的最低價，格式為「起 $xxx」。

#### Scenario: 多口味不同價格顯示起始價
- **WHEN** 商品有多種口味且價格不同（例如 60 / 80 / 100）
- **THEN** 列表顯示「起 $60」

#### Scenario: 只有單一價格
- **WHEN** 商品所有口味價格相同
- **THEN** 列表顯示「$ 60」（不加「起」字）

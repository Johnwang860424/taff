## MODIFIED Requirements

### Requirement: CartItem 資料結構
`CartItem` SHALL 包含以下欄位，以完整描述一筆購物車品項：

```ts
type CartItem = {
  name: string;
  price: number;        // 該口味的實際價格
  img: string;
  category: "shippable" | "pickupOnly";
  flavor: string;       // 選定的口味名稱（必填）
  pickupDate: string;   // 選定的取貨日期 YYYY-MM-DD（必填）
  quantity: number;
};
```

#### Scenario: 加入新品項
- **WHEN** 使用者在 Modal 選定口味與日期後確認加入
- **THEN** 購物車新增一筆 `CartItem`，`flavor` 與 `pickupDate` 為選定值，`price` 為該口味對應金額，`quantity` 為 `1`

#### Scenario: 相同品項相同口味相同日期疊加數量
- **WHEN** 購物車已有 `{ name:"布丁", flavor:"原味", pickupDate:"2026-03-12" }`
- **AND** 使用者再次加入相同組合
- **THEN** 該筆 `quantity` 加 1，不新增新筆

#### Scenario: 相同品項但不同口味視為獨立品項
- **WHEN** 購物車已有 `{ name:"布丁", flavor:"原味", pickupDate:"2026-03-12" }`
- **AND** 使用者加入 `{ name:"布丁", flavor:"焦糖", pickupDate:"2026-03-12" }`
- **THEN** 購物車新增第二筆獨立品項，各自維護數量

#### Scenario: 相同品項相同口味但不同日期視為獨立品項
- **WHEN** 購物車已有 `{ name:"布丁", flavor:"原味", pickupDate:"2026-03-12" }`
- **AND** 使用者加入 `{ name:"布丁", flavor:"原味", pickupDate:"2026-03-19" }`
- **THEN** 購物車新增第二筆獨立品項

---

### Requirement: 購物車顯示口味與取貨日期
結帳頁 (`cart/page.tsx`) SHALL 在每筆品項下方顯示口味與取貨日期。

#### Scenario: 品項列顯示口味與日期
- **WHEN** 購物車頁面渲染品項列
- **THEN** 每筆品項顯示：商品名稱、口味標籤、取貨日期、單價、數量、小計

import type { sheets_v4 } from "googleapis";
import type { OrderForm, OrderItem } from "./validation";

function buildSocialUrl(form: OrderForm): string {
  if (form.facebook) return `https://www.facebook.com/${form.facebook}`;
  if (form.instagram) return `https://www.instagram.com/${form.instagram}`;
  return "";
}

function groupItemsByMonth(
  form: OrderForm,
  deliveryMethod: "pickup" | "shippable",
  items: OrderItem[],
): Record<string, unknown[][]> {
  const now = new Date().toISOString();
  const grouped: Record<string, unknown[][]> = {};
  const socialUrl = buildSocialUrl(form);
  const deliveryLabel = deliveryMethod === "pickup" ? "自取" : "宅配";

  for (const item of items) {
    const dateObj = new Date(item.pickupDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const sheetName = `${year}-${month}`;

    if (!grouped[sheetName]) grouped[sheetName] = [];

    const categoryLabel = item.category === "pickupOnly" ? "限自取" : "可宅配";

    grouped[sheetName].push([
      now,
      form.name,
      form.phone,
      socialUrl,
      form.address,
      deliveryLabel,
      categoryLabel,
      item.name,
      item.flavor,
      item.pickupDate,
      item.quantity,
      item.price,
      item.price * item.quantity,
      form.note,
    ]);
  }

  return grouped;
}

export async function writeOrder(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  form: OrderForm,
  deliveryMethod: "pickup" | "shippable",
  items: OrderItem[],
): Promise<void> {
  const grouped = groupItemsByMonth(form, deliveryMethod, items);

  for (const [sheetName, values] of Object.entries(grouped)) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetName}'!A:N`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
  }
}

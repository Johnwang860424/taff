
import Contact from '@/components/contact/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '聯絡我們 | Taff 甜點工作室',
  description: '無論是訂購諮詢、異業合作或是有任何建議，都歡迎與我們聯繫。',
};

// 每次請求即時讀 R2 圖片；純靜態頁在 OpenNext 上會不穩定地渲染成空圖
export const dynamic = 'force-dynamic';

export default function Page() {
  return <Contact />;
}

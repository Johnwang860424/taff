import Brand from '@/components/brand/Brand';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '關於塔芙 | Taff 甜點工作室',
  description: '塔芙成立於 2022 年，在虎尾一個安靜的巷子裡。由兩位熱愛甜點的職人創立，堅持使用最純粹的原料，將對甜點的熱情轉化為每一口的感動',
};

// 每次請求即時讀 R2 圖片；純靜態頁在 OpenNext 上會不穩定地渲染成空圖
export const dynamic = 'force-dynamic';

export default function Page() {
  return <Brand />;
}

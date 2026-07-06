
import Home from '@/components/home/Home';

// 每次請求即時讀 R2 圖片；純靜態頁在 OpenNext 上會不穩定地渲染成空圖
export const dynamic = 'force-dynamic';

export default function Page() {
  return <Home />;
}

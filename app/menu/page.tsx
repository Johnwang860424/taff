import Menu from '@/components/Menu';
import type { Metadata } from 'next';
import { getMenuData } from '@/lib/menu';

export const metadata: Metadata = {
  title: '季節嚴選 | Taff 甜點工作室',
  description: '探索我們精心製作的甜點系列。',
};

export default async function Page() {
  const data = await getMenuData();
  return <Menu data={data} />;
}

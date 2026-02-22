import MenuDesktop from '@/components/MenuDesktop';
import MenuMobile from '@/components/MenuMobile';
import type { Metadata } from 'next';
import { getMenuData } from '@/lib/menu';

export const metadata: Metadata = {
  title: '季節嚴選 | Taff 甜點工作室',
  description: '探索我們精心製作的甜點系列。',
};

export default async function Page() {
  const data = await getMenuData();
  return (
    <>
      <div className="hidden md:block">
        <MenuDesktop data={data} />
      </div>

      <div className="block md:hidden">
        <MenuMobile data={data} />
      </div>
    </>
  );
}

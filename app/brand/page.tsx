
import Brand from '@/components/brand/Brand';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '品牌故事 | Taff 甜點工作室',
  description: '由兩位熱愛甜點的職人創立，堅持使用最純粹的原料，將對甜點的熱情轉化為每一口的感動。',
};

export default function Page() {
  return <Brand />;
}

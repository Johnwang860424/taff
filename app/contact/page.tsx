
import Contact from '@/components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '聯絡我們 | Taff 甜點工作室',
  description: '無論是訂購諮詢、異業合作或是有任何建議，都歡迎與我們聯繫。',
};

export default function Page() {
  return <Contact />;
}

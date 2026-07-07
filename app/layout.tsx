import type { Metadata } from 'next';
import { Libre_Caslon_Text, Work_Sans, Space_Grotesk, Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import DecorativeCircle from '@/components/DecorativeCircle';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';

const libreCaslon = Libre_Caslon_Text({
  subsets: ['latin'],
  variable: '--font-caslon',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500'],
  display: 'swap',
});

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-noto-sans',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Taff 甜點工作室 | 每一朵雲都鑲著糖邊',
  description: '感受手工甜點的輕盈口感，傳統工藝與現代創意的完美結合。成立於 2022 年。',
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${libreCaslon.variable} ${workSans.variable} ${spaceGrotesk.variable} ${notoSerifTC.variable} ${notoSansTC.variable}`}>
      <body className="bg-background text-on-surface antialiased overflow-x-hidden font-sans selection:bg-primary-fixed">
        <CartProvider>
          <div className="relative min-h-screen">
            <Navbar />

            {/* 雲朵浮水印：固定底紋，不干擾前景互動 */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20 overflow-hidden" aria-hidden>
              <DecorativeCircle />
            </div>

            <div>{children}</div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

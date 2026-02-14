import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat, Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import DecorativeCircle from '@/components/DecorativeCircle';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '600'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500'],
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
    <html lang="zh-TW" className={`${cormorantGaramond.variable} ${montserrat.variable} ${notoSerifTC.variable} ${notoSansTC.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="bg-background-light text-primary antialiased overflow-x-hidden font-sans selection:bg-accent-gold/30">
        <div className="relative min-h-screen">
          <Navbar />
          
          {/* Decorative central element that bridges both halves */}
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20 overflow-hidden">
            <DecorativeCircle />
          </div>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import { getSiteImageUrl } from "@/lib/site-images";

const Home = async () => {
  const imgSrc = await getSiteImageUrl("home");
  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full relative">
      {/* Text & Branding：手機在圖片下方，桌機在左半 */}
      <div className="w-full lg:w-1/2 min-h-fit lg:h-full flex flex-col justify-between px-page py-14 lg:p-[5vw] lg:py-24 bg-background z-10 order-2 lg:order-1">
        <div className="flex flex-col items-start space-y-6 lg:space-y-8">
          <p className="font-label text-xs tracking-[0.3em] uppercase text-on-surface-variant">
            職人手作甜點
          </p>
          <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl leading-[1.2] tracking-[-0.02em] text-on-surface max-w-full break-words">
            每一朵 <br />
            <span className="italic opacity-80 pr-2">雲</span>
            <br />
            都鑲著糖 <br />
            <span className="italic opacity-80 pr-2">邊</span>
            <br />
          </h1>
          <p className="max-w-sm text-on-surface-variant font-light leading-[1.8] text-sm md:text-base">
            感受手工甜點的輕盈口感，傳統工藝與現代創意的完美結合。成立於 2022
            年。
          </p>

          <div className="pt-4 lg:pt-8">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-10 py-3.5 bg-primary text-on-primary rounded-soft transition-colors duration-300 hover:bg-primary/90 font-medium tracking-widest text-sm"
            >
              線上訂購
            </Link>
          </div>
        </div>

        {/* Social Links：手機置於內文下方 */}
        <div className="flex items-center space-x-6 text-primary/60 pt-10 lg:hidden">
          <SocialLinks />
        </div>
      </div>

      {/* Social Links：桌機固定左下 */}
      <div className="hidden lg:flex fixed bottom-10 left-[5vw] items-center space-x-6 text-primary/60 z-20">
        <SocialLinks />
      </div>

      {/* Imagery：手機置頂 */}
      <div className="w-full lg:w-1/2 shrink-0 min-h-[48vh] relative overflow-hidden order-1 lg:order-2 group">
        <div className="absolute inset-0 bg-on-surface/10 transition-opacity duration-700 group-hover:bg-on-surface/0 z-10"></div>
        {imgSrc && (
          <Image
            alt="Artisan dessert pastries on a stand"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            src={imgSrc}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
      </div>

      <div className="absolute bottom-6 right-page lg:bottom-12 lg:right-12 z-20 font-label text-[9px] lg:text-[10px] tracking-[0.3em] text-on-surface-variant/60 lg:text-white/60 uppercase pointer-events-none">
        © 2026 TAFF DESSERT
      </div>
    </main>
  );
};

export default Home;

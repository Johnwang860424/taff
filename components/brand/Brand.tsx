import Image from "next/image";
import { getSiteImageUrl } from "@/lib/site-images";

const Brand = async () => {
  const imgSrc = await getSiteImageUrl("brand-story");
  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full relative">
      {/* Image：手機置頂，桌機在左半 */}
      <div className="w-full lg:w-1/2 shrink-0 min-h-[48vh] relative overflow-hidden order-1 group">
        <div className="absolute inset-0 bg-on-surface/10 transition-opacity duration-700 group-hover:bg-on-surface/0 z-10"></div>
        {imgSrc && (
          <Image
            alt="甜點師傅專注製作甜點的手部特寫,溫暖光線"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            src={imgSrc}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}

        {/* Quote overlay：桌機顯示 */}
        <div className="absolute bottom-10 left-10 lg:bottom-20 lg:left-20 z-20 text-white/95 max-w-xs lg:max-w-md opacity-0 lg:opacity-100 transition-opacity duration-1000 delay-300">
          <p className="font-serif italic text-2xl lg:text-3xl tracking-wide drop-shadow-lg">
            &quot;Crafting moments of sweetness,
            <br />
            one cloud at a time.&quot;
          </p>
        </div>
      </div>

      {/* Content：手機單欄，桌機在右半 */}
      <div className="w-full lg:w-1/2 shrink-0 flex flex-col justify-between px-page py-14 lg:p-[5vw] lg:py-16 bg-background z-10 order-2">
        <div className="z-10 relative max-w-xl">
          {/* 編目元素：手機水平細線 + 編號 */}
          <p className="flex items-center gap-3 font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant mb-3">
            <span className="h-px w-8 bg-outline-variant" />
            01 / Brand Story
          </p>
          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl xl:text-5xl text-on-surface mb-8 tracking-widest">
            品牌故事
          </h1>

          {/* Divider */}
          <div className="w-20 h-px bg-ghost-line mb-10"></div>

          {/* Quote section */}
          <div className="mb-10">
            <p className="font-serif text-xl lg:text-2xl text-on-surface/90 leading-loose tracking-wide border-l border-ghost-line pl-6 italic">
              「源自對甜點的純粹熱愛,我們相信每一份甜點都是雲朵般的輕盈與溫柔。」
            </p>
          </div>

          {/* Body text */}
          <div className="space-y-6 text-on-surface-variant font-serif leading-[1.8] text-base lg:text-lg text-justify tracking-wide">
            <p>
              Taff 甜點工作室成立於 2022
              年,座落於虎尾的靜謐角落。我們堅持選用最純淨的天然食材,摒棄繁複的化學添加,只為了還原食材本真的風味。
            </p>
            <p>
              從麵粉的篩選到奶油的打發,每一個步驟都由職人雙手細心呵護。如同天空中的雲朵千變萬化,我們的甜點也致力於探索口感的無限可能,帶給您味蕾上最溫暖的擁抱。
            </p>
          </div>

          {/* Brand signature */}
          <div className="mt-12 flex items-center space-x-6">
            <div className="flex flex-col">
              <span className="font-serif italic text-2xl text-on-surface">
                Taff Dessert
              </span>
              <span className="font-label text-[10px] tracking-[0.25em] uppercase text-primary mt-1">
                Artisan Studio
              </span>
            </div>
            <span className="h-px w-16 bg-ghost-line"></span>
          </div>
        </div>

        {/* 編目元素：桌機角落直排 */}
        <div className="absolute bottom-12 right-12 font-label text-[10px] tracking-[0.3em] text-on-surface-variant/50 hidden lg:block text-vertical">
          01 / BRAND STORY
        </div>
      </div>
    </main>
  );
};

export default Brand;

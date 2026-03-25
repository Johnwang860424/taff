import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const Brand = async () => {
  const imgSrc = await getCloudinaryUrl("taff/site/brand-story");
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full relative">
      {/* Left Section: Image */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] relative overflow-hidden order-1 group">
        <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-700 group-hover:bg-stone-900/0 z-10"></div>
        <Image
          alt="甜點師傅專注製作甜點的手部特寫,溫暖光線"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
          src={imgSrc}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Quote overlay */}
        <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 z-20 text-white/95 max-w-xs md:max-w-md opacity-0 md:opacity-100 transition-opacity duration-1000 delay-300">
          <p className="font-serif italic text-2xl md:text-3xl leading-relaxed tracking-wide drop-shadow-lg">
            &quot;Crafting moments of sweetness,
            <br />
            one cloud at a time.&quot;
          </p>
        </div>
      </div>

      {/* Right Section: Content */}
      <div className="w-full md:w-1/2 shrink-0 flex flex-col justify-between p-8 md:p-24 md:py-16 bg-background-light z-10 order-2">
        <div className="z-10 relative max-w-xl">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">
            BRAND STORY
          </p>
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary dark:text-white mb-8 tracking-widest font-light">
            品牌故事
          </h1>

          {/* Divider */}
          <div className="w-20 h-[1px] bg-accent-gold mb-10"></div>

          {/* Quote section */}
          <div className="mb-10">
            <p className="font-serif text-xl md:text-2xl text-primary/90 dark:text-white/90 leading-loose tracking-wide border-l-[3px] border-accent-gold/40 pl-6 italic">
              「源自對甜點的純粹熱愛,我們相信每一份甜點都是雲朵般的輕盈與溫柔。」
            </p>
          </div>

          {/* Body text */}
          <div className="space-y-6 text-primary/75 font-serif leading-loose text-base md:text-lg text-justify tracking-wide">
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
              <span className="font-serif italic text-2xl text-primary dark:text-white">
                Taff Dessert
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-accent-gold mt-1">
                Artisan Studio
              </span>
            </div>
            <span className="h-px w-16 bg-primary/10 dark:bg-white/10"></span>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] tracking-[0.3em] text-primary/30 dark:text-white/20 font-sans hidden md:block text-vertical">
          BRAND STORY — 01
        </div>
      </div>
    </main>
  );
};

export default Brand;

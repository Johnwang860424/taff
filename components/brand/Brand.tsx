import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";
import { getSiteImageUrl } from "@/lib/site-images";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9074767437846!2d120.43775407513047!3d23.714997890135084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346eb7ed35ed3bef%3A0x49409285425ead5a!2z5aGU6IqZ55Sc6bueIFRhZmYgRGVzc2VydO-8iOmgkOe0hOWItu-8iQ!5e0!3m2!1szh-TW!2stw!4v1770542101522!5m2!1szh-TW!2stw";

const STORY = [
  "塔芙成立於 2022 年，在虎尾一個安靜的巷子裡。由兩位熱愛甜點的職人創立，堅持使用最純粹的原料，將對甜點的熱情轉化為每一口的感動。",
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[13px] text-primary font-medium mb-[7px]">{children}</h3>
);

const MapEmbed = ({ className }: { className: string }) => (
  <div className={`${className} rounded-soft overflow-hidden border border-ghost-line`}>
    <iframe
      className="w-full h-full border-0"
      src={MAP_SRC}
      title="地圖"
      loading="lazy"
    />
  </div>
);

const Brand = async () => {
  const imgSrc = await getSiteImageUrl("brand-story");

  return (
    <main>
      {/* ── 手機版 ─────────────────────────────────────────── */}
      <div className="lg:hidden">
        <div className="relative h-[220px] w-full">
          {imgSrc && (
            <Image
              alt="塔芙甜點工作室"
              src={imgSrc}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="px-page pt-6 pb-8">
          <h1 className="font-serif text-[27px] text-on-surface mb-1">
            關於塔芙
          </h1>
          <p className="text-[13px] text-outline mb-5">虎尾 · 2022 年至今</p>

          <div className="flex flex-col gap-[15px] text-[15px] leading-[1.85] text-on-surface-variant">
            {STORY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-[22px]">
            <div>
              <SectionTitle>服務項目</SectionTitle>
              <p className="text-[15px] leading-[1.7] text-on-surface">
                預約制甜點、婚禮喜餅、節慶禮盒、企業訂製、Candy Bar
              </p>
            </div>
            <div>
              <SectionTitle>地址</SectionTitle>
              <p className="text-[15px] leading-[1.7] text-on-surface mb-3">
                雲林縣虎尾鎮林森路一段 157 巷 48 號
              </p>
              <MapEmbed className="w-full aspect-[16/10]" />
            </div>
            <div>
              <SectionTitle>營業方式</SectionTitle>
              <p className="text-[15px] leading-[1.7] text-on-surface">
                預約制，請先私訊確認
              </p>
            </div>
            <div>
              <SectionTitle>追蹤我們</SectionTitle>
              <div className="flex items-center gap-[18px] text-primary mt-1">
                <SocialLinks showLine={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 桌機版 ─────────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-[calc(100vh-75px)]">
        <div className="w-[44%] relative">
          {imgSrc && (
            <Image
              alt="塔芙甜點工作室"
              src={imgSrc}
              fill
              priority
              sizes="44vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="w-[56%] px-[6vw] py-[72px]">
          <h1 className="font-serif text-[44px] text-on-surface mb-1">
            關於塔芙
          </h1>
          <p className="text-sm text-outline mb-[26px]">虎尾 · 2022 年至今</p>

          <div className="flex flex-col gap-4 max-w-[520px] text-[17px] leading-[1.85] text-on-surface-variant">
            {STORY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-9 grid grid-cols-2 gap-7 max-w-[640px]">
            <div>
              <SectionTitle>服務項目</SectionTitle>
              <p className="text-[15px] leading-[1.7] text-on-surface">
                預約制甜點、婚禮喜餅、節慶禮盒、企業訂製、Candy Bar
              </p>
            </div>
            <div>
              <SectionTitle>營業方式</SectionTitle>
              <p className="text-[15px] leading-[1.7] text-on-surface">
                預約制，請先私訊確認
              </p>
            </div>
            <div>
              <SectionTitle>地址</SectionTitle>
              <p className="text-[15px] leading-[1.7] text-on-surface">
                雲林縣虎尾鎮林森路一段 157 巷 48 號
              </p>
            </div>
            <div>
              <SectionTitle>追蹤我們</SectionTitle>
              <div className="flex items-center gap-4 text-primary mt-1">
                <SocialLinks showLine={false} />
              </div>
            </div>
          </div>

          <MapEmbed className="mt-8 w-full max-w-[640px] aspect-[2/1]" />
        </div>
      </div>
    </main>
  );
};

export default Brand;

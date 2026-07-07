import Image from "next/image";
import Link from "next/link";
import { getSiteImageUrl } from "@/lib/site-images";
import { getMenuData } from "@/lib/menu";
import type { MenuData, MenuItem } from "@/lib/menu-utils";
import FeaturedSection, {
  type FeaturedEntry,
} from "@/components/home/FeaturedSection";

const INTRO_COPY = "感受手工甜點的輕盈口感，傳統工藝與現代創意的完美結合。";

const withCategory = (
  items: MenuItem[],
  category: keyof MenuData,
): FeaturedEntry[] => items.map((item) => ({ item, category }));

const Home = async () => {
  const [imgSrc, menu] = await Promise.all([
    getSiteImageUrl("home"),
    getMenuData(),
  ]);

  // 本週推薦：宅配前兩款 + 自取一款，不足三款時從其餘品項補滿
  const preferred = [
    ...withCategory(menu.shippableItems.slice(0, 2), "shippableItems"),
    ...withCategory(menu.pickupOnlyItems.slice(0, 1), "pickupOnlyItems"),
  ];
  const pool = [
    ...withCategory(menu.shippableItems, "shippableItems"),
    ...withCategory(menu.pickupOnlyItems, "pickupOnlyItems"),
  ];
  const featured = [
    ...preferred,
    ...pool.filter((entry) => !preferred.some((p) => p.item === entry.item)),
  ].slice(0, 3);

  return (
    <main className="relative">
      {/* ── 手機版 ─────────────────────────────────────────── */}
      <div className="lg:hidden">
        <div className="relative h-[270px] w-full">
          {imgSrc && (
            <Image
              alt="職人手作甜點"
              src={imgSrc}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[rgba(43,36,30,.62)] to-transparent pointer-events-none" />
          <div className="absolute left-5 right-5 bottom-[18px] pointer-events-none">
            <p className="text-xs tracking-[0.05em] text-white/85">
              職人手作 · 每週限量
            </p>
            <h1 className="mt-1.5 font-serif text-[31px] leading-[1.25] text-white">
              每一朵雲，
              <br />
              都鑲著糖邊
            </h1>
          </div>
        </div>

        <div className="p-5">
          <p className="text-[15px] leading-[1.8] text-on-surface-variant">
            {INTRO_COPY}
          </p>
          <Link
            href="/menu"
            className="mt-[18px] block w-full text-center bg-primary text-on-primary rounded-soft py-[15px] text-[15px] font-medium tracking-[0.04em] active:scale-[0.98] transition-transform"
          >
            看看這週的甜點
          </Link>
        </div>

        <div className="pt-1 pb-2">
          <div className="flex items-baseline justify-between px-5 pb-3">
            <h2 className="font-serif text-[21px] text-on-surface">本週推薦</h2>
            <Link href="/menu" className="text-[13px] text-primary">
              看全部 →
            </Link>
          </div>
          <FeaturedSection entries={featured} variant="mobile" />
        </div>

        <div className="mx-5 mt-[18px] mb-[26px] bg-surface-container border border-ghost-line rounded-md p-5">
          <h2 className="font-serif text-xl text-on-surface mb-2">關於塔芙</h2>
          <p className="text-sm leading-[1.8] text-on-surface-variant mb-3.5">
            2022 年開始，從一台烤箱到一間店。我們相信，好吃的甜點不用花俏，選對材料、認真做，就會有人記得。
          </p>
          <Link
            href="/brand"
            className="block w-full text-center border border-primary text-primary rounded-soft py-3 text-sm active:scale-[0.98] transition-transform"
          >
            認識我們
          </Link>
        </div>
      </div>

      {/* ── 桌機版 ─────────────────────────────────────────── */}
      <div className="hidden lg:block">
        {/* 導覽列實際高度：py-4 (32px) + Logo 50px + 底線 1px = 83px */}
        <section className="flex min-h-[calc(100vh-83px)]">
          <div className="w-1/2 flex flex-col justify-center px-[7vw]">
            <p className="mb-[18px] text-sm tracking-[0.05em] text-on-surface-variant">
              職人手作 · 每週限量
            </p>
            <h1 className="font-serif text-[64px] leading-[1.2] text-on-surface">
              每一朵雲，
              <br />
              都鑲著糖邊
            </h1>
            <p className="mt-7 max-w-[400px] text-[17px] leading-[1.85] text-on-surface-variant">
              {INTRO_COPY}
            </p>
            <div className="mt-9 flex gap-4">
              <Link
                href="/menu"
                className="bg-primary text-on-primary rounded-soft px-10 py-4 text-[15px] font-medium tracking-[0.03em] whitespace-nowrap hover:bg-primary-dark transition-colors"
              >
                看看這週的甜點
              </Link>
              <Link
                href="/brand"
                className="border border-primary text-primary rounded-soft px-9 py-4 text-[15px] whitespace-nowrap hover:bg-surface-container transition-colors"
              >
                認識我們
              </Link>
            </div>
          </div>
          <div className="w-1/2 relative">
            {imgSrc && (
              <Image
                alt="職人手作甜點"
                src={imgSrc}
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            )}
          </div>
        </section>

        <section className="px-[7vw] pt-20 pb-[90px]">
          <div className="flex items-baseline justify-between mb-[34px]">
            <h2 className="font-serif text-[34px] text-on-surface">本週推薦</h2>
            <Link href="/menu" className="text-[15px] text-primary">
              看全部 →
            </Link>
          </div>
          <FeaturedSection entries={featured} variant="desktop" />
        </section>
      </div>
    </main>
  );
};

export default Home;

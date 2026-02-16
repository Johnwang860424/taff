import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

const Home = () => {
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full relative">
      {/* Left Section: Text & Branding */}
      <div className="w-full md:w-1/2 min-h-fit md:h-full flex flex-col justify-between p-8 md:p-24 bg-background-light z-10 order-2 md:order-1">
        {/* Home Text */}
        <div className="flex flex-col items-start space-y-6 md:space-y-8">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 font-sans font-medium">
            職人手作甜點
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-light text-primary max-w-full break-words">
            每一朵 <br />
            <span className="italic font-normal opacity-80 pr-2">雲</span><br />
            都鑲著糖 <br />
            <span className="italic font-normal opacity-80 pr-2">邊</span><br />
          </h1>
          <p className="max-w-sm text-gray-500 font-light leading-relaxed text-sm md:text-base">
            感受手工甜點的輕盈口感，傳統工藝與現代創意的完美結合。成立於 2022 年。
          </p>

          <div className="pt-4 md:pt-6 lg:pt-10">
            <button className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-primary text-white rounded-full transition-all duration-300 hover:shadow-2xl hover:bg-neutral-800">
              <span className="relative z-10 font-medium tracking-widest text-sm">線上訂購</span>
            </button>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="fixed bottom-10 left-8 md:left-24 flex items-center space-x-6 text-primary/50 z-20">
        <SocialLinks/>
      </div>

      {/* Right Section: Imagery */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] relative overflow-hidden order-1 group">
        <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-700 group-hover:bg-stone-900/0 z-10"></div>
        <Image
          alt="Artisan dessert pastries on a stand"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChmrm-XtfdWCk-xBpsedGGCDHzdygVVgT1y8p2EaPQEBDATPziarlouiUi84rsvjTbTP6a-G7yvJDxkcL2uIa8LhC-IAzJDNGFrf5nz0DXtj7RQuI9ImzYC-YtZTw2hX2gZrHQF1ZiI_CDcajAfevh8rbxfAmK0S8Xr-KEyBLN_8HiZ0NI3r1igOgBiWKjSyWZ8APFqaN4TcrS1mUOgztVwr3P_8Y3M8btUaehln1q9d6crRKeE9a4A9sitEw-iowOM4q_2EzRbw"
          fill
          priority
        />
      </div>

      <div className="absolute bottom-10 right-6 md:bottom-12 md:right-12 z-20 text-[9px] md:text-[10px] tracking-[0.3em] text-white/60 font-sans block uppercase pointer-events-none">
        © 2026 TAFF DESSERT
      </div>
    </main>
  );
};

export default Home;

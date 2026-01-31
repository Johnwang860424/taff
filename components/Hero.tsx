const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full relative pt-20 md:pt-0">
      
      {/* Left Section: Text & Branding */}
      <div className="w-full md:w-1/2 min-h-screen md:h-full flex flex-col justify-between p-8 md:p-24 bg-background-light z-10">
        {/* Hero Text */}
        <div className="flex flex-col items-start space-y-6 md:space-y-8 overflow-hidden">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 font-sans font-medium">
            職人手作甜點
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-light text-primary max-w-full break-words">
            每一朵 <br/>
            <span className="italic font-normal opacity-80">雲</span><br/>
            都鑲著糖 <br/>
            <span className="italic font-normal opacity-80">邊</span><br/>
          </h1>
          <p className="max-w-sm text-gray-500 font-light leading-relaxed text-sm md:text-base">
            感受手工甜點的輕盈口感，傳統工藝與現代創意的完美結合。成立於 2022 年。
          </p>
          
          <div className="pt-4 md:pt-6 lg:pt-10">
            <button className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-primary text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-neutral-800">
              <span className="relative z-10 font-medium tracking-widest text-sm">線上訂購</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: Imagery */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none"></div>
        <img 
          alt="Artisan dessert pastries on a stand" 
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-[10s] ease-out" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChmrm-XtfdWCk-xBpsedGGCDHzdygVVgT1y8p2EaPQEBDATPziarlouiUi84rsvjTbTP6a-G7yvJDxkcL2uIa8LhC-IAzJDNGFrf5nz0DXtj7RQuI9ImzYC-YtZTw2hX2gZrHQF1ZiI_CDcajAfevh8rbxfAmK0S8Xr-KEyBLN_8HiZ0NI3r1igOgBiWKjSyWZ8APFqaN4TcrS1mUOgztVwr3P_8Y3M8btUaehln1q9d6crRKeE9a4A9sitEw-iowOM4q_2EzRbw"
        />
        
        {/* Mobile footer hint */}
        <div className="absolute bottom-6 left-6 md:hidden z-20 text-white/80 text-[10px] tracking-[0.3em] uppercase">
          Taff Dessert Studio © 2026
        </div>
      </div>
    </div>
  );
};

export default Hero;

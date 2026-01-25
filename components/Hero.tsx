
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full relative">
      
      {/* Left Section: Text & Branding */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-background-light z-10">
        
        {/* Logo Icon */}
        <div className="flex justify-start items-center mb-12">
          <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M150 280 Q140 280 135 270 Q120 250 130 230 Q140 210 160 210 Q165 180 190 170 Q220 160 240 180 Q250 170 270 175 Q290 180 295 200 Q315 205 325 220 Q335 240 325 260 Q315 280 290 275 L150 280 Z" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="15"
            ></path>
          </svg>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col items-start space-y-6 md:space-y-8">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 font-sans font-medium">
            職人手作甜點
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl leading-[1.1] font-light text-primary">
            每一朵 <br/>
            <span className="italic font-normal opacity-80">雲</span>，<br/>
            都鑲著糖邊。
          </h1>
          <p className="max-w-sm text-gray-500 font-light leading-relaxed text-sm md:text-base">
            感受手工甜點的輕盈口感，傳統工藝與現代創意的完美結合。成立於 2022 年。
          </p>
          
          <div className="pt-6 md:pt-10">
            <button className="group relative inline-flex items-center justify-center px-10 py-4 bg-primary text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-neutral-800">
              <span className="relative z-10 font-medium tracking-widest text-sm">線上訂購</span>
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="hidden md:flex items-center space-x-6 text-primary/50 text-xs tracking-widest mt-auto pt-10">
          <a href="#" className="hover:text-primary transition-colors">IG</a>
          <span className="h-px w-10 bg-primary/20"></span>
          <a href="#" className="hover:text-primary transition-colors">TW</a>
          <span className="h-px w-10 bg-primary/20"></span>
          <a href="#" className="hover:text-primary transition-colors">FB</a>
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
          Taff Dessert Studio © 2024
        </div>
      </div>
    </div>
  );
};

export default Hero;

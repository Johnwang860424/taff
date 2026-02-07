import { ArrowRight } from 'lucide-react';

const Brand = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse min-h-screen md:h-screen w-full relative pt-20 md:pt-0 bg-background-light">
      
      {/* Right Section: Content */}
      <div className="w-full md:w-1/2 min-h-fit md:h-full flex flex-col justify-center p-8 md:p-24 z-10">
        <div className="flex flex-col items-start space-y-6 md:space-y-8">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-accent-gold font-sans font-medium">
            品牌精神
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.2] font-light text-primary">
            由純粹出發 <br/>
            成就 <span className="italic font-normal opacity-80 decoration-accent-gold underline underline-offset-8">不凡</span>
          </h1>
          
          <div className="space-y-4 max-w-md text-gray-600 font-light leading-relaxed text-sm md:text-base">
            <p>
              TAFF 成立於 2022 年，我們的名字源自於對甜點最純粹的想像。在繁華的都市中，我們希望透過手作的溫度，為您送上一抹如雲朵般輕盈的甜蜜。
            </p>
            <p>
              每一份甜點都是職人精神的結晶，嚴選優質食材，在傳統法式工藝的基礎上，注入現代感的創意靈魂。
            </p>
          </div>
          
          <div className="pt-4 md:pt-6">
            <button className="group flex items-center space-x-4 text-primary font-medium tracking-widest text-sm uppercase hover:opacity-70 transition-opacity">
              <span>探索工藝</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Left Section: Imagery */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 z-10 pointer-events-none"></div>
        <img 
          alt="Artisan at work" 
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2000&auto=format&fit=crop"
        />
        
        {/* Decorative overlay text */}
        <div className="absolute bottom-12 left-12 z-20 hidden md:block">
          <div className="text-white/40 font-serif text-8xl italic select-none">TAFF</div>
        </div>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-10 left-6 md:bottom-12 md:left-12 z-20 text-[9px] md:text-[10px] tracking-[0.3em] text-primary/40 font-sans block uppercase pointer-events-none">
        ESTABLISHED 2022 / TAIPEI
      </div>
    </div>
  );
};

export default Brand;
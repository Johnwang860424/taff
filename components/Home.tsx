const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen w-full relative pt-20 md:pt-0">

      {/* Left Section: Text & Branding */}
      <div className="w-full md:w-1/2 min-h-fit md:h-full flex flex-col justify-between p-8 md:p-24 bg-background-light z-10">
        {/* Home Text */}
        <div className="flex flex-col items-start space-y-6 md:space-y-8">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 font-sans font-medium">
            職人手作甜點
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-light text-primary max-w-full break-words">
            每一朵 <br />
            <span className="italic font-normal opacity-80">雲</span><br />
            都鑲著糖 <br />
            <span className="italic font-normal opacity-80">邊</span><br />
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
      <div className="fixed bottom-10 left-8 md:left-24 z-20 flex items-center space-x-6 text-primary/50">
        <a href="https://www.instagram.com/taff__dessert/" target="_blank" className="hover:text-primary transition-all duration-300 hover:scale-110" aria-label="Instagram">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <span className="h-px w-10 bg-primary/20 origin-left line-animation"></span>
        <a href="https://www.facebook.com/p/%E5%A1%94%E8%8A%99-TAFF-100083549960649/" target="_blank" className="hover:text-primary transition-all duration-300 hover:scale-110" aria-label="Facebook">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      </div>

      {/* Right Section: Imagery */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden order-1 group">
        {/* <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none"></div> */}
        <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-700 group-hover:bg-stone-900/0 z-10"></div>
        <img
          alt="Artisan dessert pastries on a stand"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChmrm-XtfdWCk-xBpsedGGCDHzdygVVgT1y8p2EaPQEBDATPziarlouiUi84rsvjTbTP6a-G7yvJDxkcL2uIa8LhC-IAzJDNGFrf5nz0DXtj7RQuI9ImzYC-YtZTw2hX2gZrHQF1ZiI_CDcajAfevh8rbxfAmK0S8Xr-KEyBLN_8HiZ0NI3r1igOgBiWKjSyWZ8APFqaN4TcrS1mUOgztVwr3P_8Y3M8btUaehln1q9d6crRKeE9a4A9sitEw-iowOM4q_2EzRbw"
        />
      </div>

      <div className="absolute bottom-10 right-6 md:bottom-12 md:right-12 z-20 text-[9px] md:text-[10px] tracking-[0.3em] text-white/60 font-sans block uppercase pointer-events-none">
        © 2026 TAFF DESSERT
      </div>
    </div>
  );
};

export default Home;

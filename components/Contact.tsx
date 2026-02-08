import SocialLinks from "@/components/SocialLinks";

const Contact = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white transition-colors duration-300 font-sans antialiased overflow-x-hidden">
      {/* Main Content */}
      <main className="flex flex-col md:flex-row h-screen w-full relative">
        {/* Left Panel - Contact Information */}
        <div className="w-full md:w-5/12 lg:w-1/2 h-full flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-background-light dark:bg-background-dark transition-colors duration-500 relative order-2 md:order-1 overflow-y-auto">
          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 z-10 w-full mt-4 md:mt-0">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-sans mb-3">CONTACT US</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight font-light text-primary dark:text-gray-100">
                聯絡我們
              </h1>
            </div>

            <div className="space-y-6 md:space-y-8 w-full max-w-md pt-2">
              {/* Address */}
              <div className="group">
                <h3 className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase mb-2">Address</h3>
                <p className="font-serif text-xl md:text-2xl text-primary dark:text-gray-200">
                  雲林縣虎尾鎮<br/>林森路一段 157 巷 48 號
                </p>
                <div className="mt-4 w-full aspect-square max-w-[240px] md:max-w-[280px] rounded-lg overflow-hidden border border-accent-gold/20 shadow-lg relative group-hover:border-accent-gold/40 transition-colors">
                  <iframe 
                    allowFullScreen 
                    className="w-full h-full border-0" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9074767437846!2d120.43775407513047!3d23.714997890135084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346eb7ed35ed3bef%3A0x49409285425ead5a!2z5aGU6IqZ55Sc6bueIFRhZmYgRGVzc2VydO-8iOmgkOe0hOWItu-8iQ!5e0!3m2!1szh-TW!2stw!4v1770542101522!5m2!1szh-TW!2stw" 
                    style={{ border: 0 }} 
                    title="Google Map location of Taff Dessert Studio"
                  />
                </div>
              </div>

              {/* Opening Hours */}
              <div className="group">
                <h3 className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase mb-2">Opening Hours</h3>
                <p className="font-serif text-xl md:text-2xl text-primary dark:text-gray-200">
                  週一 <span className="font-sans">-</span> 週五 10:00 <span className="font-sans">-</span> 17:00
                </p>
                <p className="text-sm font-sans text-gray-500 mt-1 tracking-wide">週六、週日公休</p>
              </div>

              {/* Social Links */}
              <div className="group">
                <h3 className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase mb-2">Social Links</h3>
                <div className="bottom-10 left-8 md:left-24 z-20 flex items-center space-x-6 text-primary/50">
                  <SocialLinks showLine={false}/>
                </div>              
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden order-1 group">
          <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-700 group-hover:bg-stone-900/0 z-10"></div>
          <img 
            alt="極簡風格的甜點工作室內部，柔和的燈光和精緻的糕點" 
            className="absolute inset-0 w-full h-full object-cover transform scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuChmrm-XtfdWCk-xBpsedGGCDHzdygVVgT1y8p2EaPQEBDATPziarlouiUi84rsvjTbTP6a-G7yvJDxkcL2uIa8LhC-IAzJDNGFrf5nz0DXtj7RQuI9ImzYC-YtZTw2hX2gZrHQF1ZiI_CDcajAfevh8rbxfAmK0S8Xr-KEyBLN_8HiZ0NI3r1igOgBiWKjSyWZ8APFqaN4TcrS1mUOgztVwr3P_8Y3M8btUaehln1q9d6crRKeE9a4A9sitEw-iowOM4q_2EzRbw"
          />

          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] tracking-[0.3em] text-primary/30 dark:text-white/20 font-sans hidden md:block writing-vertical-rl">
            CONTACT US — 02
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

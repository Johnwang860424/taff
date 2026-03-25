import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const Contact = async () => {
  const imgSrc = await getCloudinaryUrl("taff/site/contact");
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full relative">
      {/* Left Section - Contact Information */}
      <div className="w-full md:w-1/2 md:h-screen h-full flex flex-col justify-between p-8 md:p-24 md:py-16 bg-background-light order-2 md:order-1 overflow-y-auto scrollbar-hide">
        <div className="z-10 relative max-w-xl">
          <p className="text-sm tracking-[0.2em] uppercase text-accent-gold font-sans mb-3">
            CONTACT US
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8 tracking-widest font-light">
            聯絡我們
          </h1>

          <div className="w-20 h-[1px] bg-accent-gold mb-10"></div>

          <div className="space-y-10 text-primary/75 dark:text-gray-300 font-serif">
            {/* Service */}
            <section>
              <h3 className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase mb-4">
                Service
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed">
                預約制甜點、婚禮喜餅、節慶禮盒、企業訂製、Candy Bar
              </p>
            </section>

            {/* Address */}
            <section>
              <h3 className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase mb-4">
                Address
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed">
                雲林縣虎尾鎮
                <br />
                林森路一段 157 巷 48 號
              </p>
              <div className="mt-6 w-full max-w-md aspect-video rounded-sm overflow-hidden border border-primary/5">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9074767437846!2d120.43775407513047!3d23.714997890135084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346eb7ed35ed3bef%3A0x49409285425ead5a!2z5aGU6IqZ55Sc6bueIFRhZmYgRGVzc2VydO-8iOmgkOe0hOWItu-8iQ!5e0!3m2!1szh-TW!2stw!4v1770542101522!5m2!1szh-TW!2stw"
                  title="Map"
                />
              </div>
            </section>

            {/* Opening Hours */}
            <section>
              <h3 className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase mb-4">
                Opening Hours
              </h3>
              <p className="text-xl md:text-2xl">預約制</p>
            </section>

            {/* Social Links */}
            <section>
              <h3 className="text-xs font-sans tracking-[0.15em] text-accent-gold uppercase mb-4">
                Social
              </h3>
              <div className="flex items-center space-x-6">
                <SocialLinks showLine={false} />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] relative overflow-hidden order-1 group">
        <div className="absolute inset-0 bg-stone-900/10 transition-opacity duration-700 group-hover:bg-stone-900/0 z-10"></div>
        <Image
          alt="極簡風格的甜點工作室內部，柔和的燈光和精緻的糕點"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
          src={imgSrc}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] tracking-[0.3em] text-primary/30 dark:text-white/20 font-sans hidden md:block text-vertical">
          CONTACT US — 02
        </div>
      </div>
    </main>
  );
};

export default Contact;

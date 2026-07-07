import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";
import { getSiteImageUrl } from "@/lib/site-images";

const Contact = async () => {
  const imgSrc = await getSiteImageUrl("contact");
  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full relative">
      {/* Contact Information：手機在圖片下方，桌機在左半 */}
      <div className="w-full lg:w-1/2 lg:h-screen h-full flex flex-col justify-between px-page py-14 lg:p-[5vw] lg:py-16 bg-background order-2 lg:order-1 overflow-y-auto scrollbar-hide">
        <div className="z-10 relative max-w-xl">
          {/* 編目元素：手機水平細線 + 編號 */}
          <p className="flex items-center gap-3 font-label text-[11px] tracking-[0.1em] uppercase text-on-surface-variant mb-3">
            <span className="h-px w-8 bg-outline-variant" />
            02 / Contact Us
          </p>
          <h1 className="font-serif text-3xl md:text-4xl xl:text-5xl text-on-surface mb-8 tracking-widest">
            聯絡我們
          </h1>

          <div className="w-20 h-px bg-ghost-line mb-10"></div>

          <div className="space-y-10 text-on-surface-variant font-serif">
            {/* Service */}
            <section>
              <h3 className="font-label text-xs tracking-[0.15em] text-primary uppercase mb-4">
                Service
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed">
                預約制甜點、婚禮喜餅、節慶禮盒、企業訂製、Candy Bar
              </p>
            </section>

            {/* Address */}
            <section>
              <h3 className="font-label text-xs tracking-[0.15em] text-primary uppercase mb-4">
                Address
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed">
                雲林縣虎尾鎮
                <br />
                林森路一段 157 巷 48 號
              </p>
              <div className="mt-6 w-full max-w-md aspect-video rounded-soft overflow-hidden border border-ghost-line">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9074767437846!2d120.43775407513047!3d23.714997890135084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346eb7ed35ed3bef%3A0x49409285425ead5a!2z5aGU6IqZ55Sc6bueIFRhZmYgRGVzc2VydO-8iOmgkOe0hOWItu-8iQ!5e0!3m2!1szh-TW!2stw!4v1770542101522!5m2!1szh-TW!2stw"
                  title="Map"
                />
              </div>
            </section>

            {/* Opening Hours */}
            <section>
              <h3 className="font-label text-xs tracking-[0.15em] text-primary uppercase mb-4">
                Opening Hours
              </h3>
              <p className="text-xl lg:text-2xl">預約制</p>
            </section>

            {/* Social Links */}
            <section>
              <h3 className="font-label text-xs tracking-[0.15em] text-primary uppercase mb-4">
                Social
              </h3>
              <div className="flex items-center space-x-6">
                <SocialLinks showLine={false} />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Image：手機置頂，桌機在右半 */}
      <div className="w-full lg:w-1/2 shrink-0 min-h-[48vh] relative overflow-hidden order-1 lg:order-2 group">
        <div className="absolute inset-0 bg-on-surface/10 transition-opacity duration-700 group-hover:bg-on-surface/0 z-10"></div>
        {imgSrc && (
          <Image
            alt="極簡風格的甜點工作室內部，柔和的燈光和精緻的糕點"
            className="absolute inset-0 w-full h-full object-cover transform scale-105"
            src={imgSrc}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}

        {/* 編目元素：桌機角落直排 */}
        <div className="absolute bottom-12 right-12 font-label text-[10px] tracking-[0.3em] text-white/60 hidden lg:block text-vertical z-20">
          02 / CONTACT US
        </div>
      </div>
    </main>
  );
};

export default Contact;

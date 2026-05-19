import React from "react";
import KatsuImg from "../Assets/IMG_4302.JPG";
import KatsuImg2 from "../Assets/IMG_4298.JPG";
import KatsuImg3 from "../Assets/IMG_4307.JPG";
import KatsuImg4 from "../Assets/JAPAN-RICE-01-gjmb-superJumbo.webp";
import KatsuImg5 from "../Assets/IMG_4314.JPG";
import KatsuImg6 from "../Assets/japandi-organization-tips-for-small-kitchens.png";
import KatsuImg7 from "../Assets/What-is-Japanese-Katsu_00-Feat-Img.jpg";
import { useNavigate } from "react-router-dom";
import { Quote } from "lucide-react"; // Import a clean quote icon for styling
import HelmetComponent from "../Components/HelmetComponent";

export default function Ourstory() {
  const navigate = useNavigate();

  const testimonials = [
    {
      quote: "The crunch is unbelievable. It stays perfectly crispy even after delivery! Best tonkatsu in town, hands down.",
      author: "Anonymous",
      role: "Local Citizen",
    },
    {
      quote: "Pure Japanese excellence. The pork is incredibly tender and pairs flawlessly with their special house sauce.",
      author: "Anonymous",
      role: "Local Citizen",
    },
    {
      quote: "Finally, authentic tasting katsu that fits the fast modern lifestyle. That local rice is immaculate!",
      author: "Anonymous",
      role: "Local Citizen",
    },
  ];

  // Duplicate original items to achieve uninterrupted endless loop seamlessly
  const doubleTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="font-body text-brand-dark bg-white">
      <HelmetComponent
        title="Our Story"
        description="Discover the passion and tradition behind Crisp Katsu, where we craft the perfect crunch for the modern soul. Learn about our roots, our commitment to quality, and the art of katsu that defines us."
      />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center bg-gray-900 overflow-hidden">
        <img
          src={KatsuImg7}
          alt="Hero Katsu Image"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/50 to-transparent z-0" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 w-full">
          <span className="inline-block bg-amber-400 text-black text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-md mb-4 sm:mb-6">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 sm:mb-6 font-display uppercase tracking-wide">
            Crafting the <span className="text-brand-red">Perfect Crunch</span>
            <br />
            for the Modern Soul
          </h1>
          <p className="text-sm sm:text-lg text-gray-200 max-w-md sm:max-w-xl mb-8 sm:mb-10 font-medium normal-case leading-relaxed">
            Born from a deep love of Japanese katsu culture, CrispKatsu GO
            brings the art of the golden crumb to every single table.
          </p>
          <a
            href="#art-of-the-crisp"
            className="inline-block bg-brand-red hover:bg-brand-dark text-white text-xs font-black uppercase tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand-red/20 active:scale-95"
          >
            Discover Our Story
          </a>
        </div>
      </section>

      {/* --- ART OF THE CRISP SECTION --- */}
      <section
        id="art-of-the-crisp"
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      >
        <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-[3/4] sm:aspect-square md:aspect-[4/5] shadow-sm">
          <img
            src={KatsuImg}
            alt="Katsu Crisp Art"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-brand-red text-xs font-black tracking-widest uppercase mb-2">
            Technique &amp; Craft
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-dark font-display uppercase tracking-wide mb-4 sm:mb-6">
            The Art of the Crisp
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-medium">
            Every piece of katsu we serve carries decades of Japanese frying
            tradition. We source panko from a single artisan mill, press-bread
            by hand, and fry at the exact temperature that turns each crumb into
            pure, airy gold.
          </p>
          
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
            <div>
              <span className="block text-2xl sm:text-3xl font-black font-display text-brand-red">
                180°C
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5 block">
                Fry Temp
              </span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black font-display text-brand-red">
                3mm
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5 block">
                Panko Size
              </span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black font-display text-brand-red">
                90s
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5 block">
                Rest Time
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- HERITAGE SECTION --- */}
      <section className="bg-gray-50/70 border-y border-gray-100 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-8 sm:mb-12 text-center md:text-left">
            <p className="text-brand-red text-xs font-black tracking-widest uppercase mb-2">
              Roots &amp; Legacy
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-brand-dark font-display uppercase tracking-wide">
              Our Heritage
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="flex flex-col justify-between gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/60 shadow-sm">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-brand-dark uppercase tracking-wide font-display mb-2.5">
                  Authentic Foundation
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium">
                  CrispKatsu GO traces its roots to the bustling market streets
                  of Osaka, where katsu was not fast food — it was ritual. Every
                  recipe we carry forward honours that history.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden bg-gray-100 aspect-[16/10] mt-2">
                <img
                  src={KatsuImg6}
                  alt="Heritage Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="bg-brand-red text-white rounded-2xl p-6 sm:p-8 shadow-md shadow-brand-red/5 flex-1 flex flex-col justify-center">
                <h4 className="text-base sm:text-lg font-black font-display uppercase tracking-wide mb-2">
                  Rooted in Japanese Tradition
                </h4>
                <p className="text-red-100 text-xs sm:text-sm leading-relaxed font-medium normal-case">
                  We trained under katsu masters in Kyoto and Osaka to bring the
                  exact technique that defines authentic tonkatsu. No shortcuts, no compromises.
                </p>
              </div>
              <div className="bg-amber-400 text-brand-dark rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-center">
                <h4 className="text-base sm:text-lg font-black font-display uppercase tracking-wide mb-2">
                  Modern Ambition, Timeless Soul
                </h4>
                <p className="text-amber-950/80 text-xs sm:text-sm leading-relaxed font-medium normal-case">
                  Our kitchens fuse the deep discipline of classic Japanese craftsmanship
                  with the vibrant, fast-paced energy of the modern culinary scene.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUALITY FIRST SECTION --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24">
        <div className="mb-8 sm:mb-12 text-center md:text-left">
          <p className="text-brand-red text-xs font-black tracking-widest uppercase mb-2">
            Ingredients &amp; Standards
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-dark font-display uppercase tracking-wide">
            Quality First
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
          {[
            {
              src: KatsuImg5,
              alt: "Premium Pork",
              title: "Premium Berkshire Pork",
              desc: "Heritage-breed Berkshire pork loins sourced from family farms that prioritise welfare and marbling depth.",
            },
            {
              src: KatsuImg3,
              alt: "Katsu Sauce",
              title: "Fresh Katsu Sauce",
              desc: "Our house tonkatsu sauce is blended daily from twelve premium ingredients, balanced perfectly to complement the hand-pressed crumb.",
            },
            {
              src: KatsuImg4,
              alt: "Koshihikari Rice",
              title: "Pearl Koshihikari Rice",
              desc: "Steamed fresh every 30 minutes from short-grain Koshihikari rice prized across Japan for its immaculate texture.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="bg-gray-100 aspect-[4/5] sm:aspect-[4/3] w-full shrink-0">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-6 flex-grow flex flex-col justify-start">
                <h4 className="text-xs sm:text-lg font-black font-display uppercase tracking-wide text-brand-dark mb-1 sm:mb-2 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-gray-400 sm:text-gray-500 text-[11px] sm:text-sm leading-relaxed font-medium line-clamp-3 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- INFINITE MARQUEE TESTIMONIALS SECTION --- */}
      <section className="bg-gray-50/70 border-t border-gray-100 py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-12 text-center md:text-left">
          <p className="text-brand-red text-xs font-black tracking-widest uppercase mb-2">
            Community Love
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-dark font-display uppercase tracking-wide">
            What They Say
          </h2>
        </div>

        {/* Outer Viewport Container Track Wrapper */}
        <div className="relative w-full overflow-hidden flex">
          {/* Edge Blur Vignette Gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-gray-50/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-gray-50/70 to-transparent z-10 pointer-events-none" />

          {/* Marquee Infinite Inner Scroll Component Track */}
          <div className="marquee-track flex gap-4 sm:gap-6 px-4">
            {doubleTestimonials.map((testi, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-between w-[290px] sm:w-[350px] shrink-0"
              >
                <div>
                  <Quote className="text-brand-red/20 mb-4" size={32} fill="currentColor" />
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium normal-case">
                    "{testi.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col">
                  <span className="text-sm font-black font-display tracking-wide uppercase text-brand-dark">
                    {testi.author}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                    {testi.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="bg-brand-red py-16 sm:py-20 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-display uppercase tracking-wide mb-6 sm:mb-8">
            Experience the Crisp Today.
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="inline-block bg-white text-brand-dark font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-md active:scale-95"
          >
            Order Now
          </button>
        </div>
      </section>

      {/* Embedded Style Block handling scrollbar concealment & marquee translations */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 24s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
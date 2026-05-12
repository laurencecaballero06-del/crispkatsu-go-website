import React from "react";
import KatsuImg from "../Assets/IMG_4302.JPG";
import KatsuImg2 from "../Assets/IMG_4298.JPG";
import KatsuImg3 from "../Assets/IMG_4307.JPG";
import KatsuImg4 from "../Assets/JAPAN-RICE-01-gjmb-superJumbo.webp";
import KatsuImg5 from "../Assets/IMG_4314.JPG";
import KatsuImg6 from "../Assets/japandi-organization-tips-for-small-kitchens.png";
import KatsuImg7 from "../Assets/What-is-Japanese-Katsu_00-Feat-Img.jpg";
import { useNavigate } from "react-router-dom";

export default function Ourstory() {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* hero ni banda */}
      <section className="relative min-h-[60vh] sm:min-h-[75vh] md:min-h-[90vh] flex items-end bg-gray-900 overflow-hidden">
        <img
          src={KatsuImg7}
          alt="Hero Katsu Image"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* left fade na overlay diria */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/100 via-white/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-20 pt-32 sm:pt-36 md:pt-40 w-full">
          <span className="inline-block bg-amber-400 text-black text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6  ">
            Crafting the <span className="text-red-600">Perfect Crunch</span>
            <br />
            for the Modern Soul
          </h1>
          <p className="text-base sm:text-lg text-gray-900 max-w-xl mb-8 sm:mb-10">
            Born from a deep love of Japanese katsu culture, CrispKatsu GO
            brings the art of the golden crumb to every table.
          </p>
          <a
            href="#art-of-the-crisp"
            className="inline-block bg-brand-red hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-colors duration-200"
          >
            Discover Our Story
          </a>
        </div>
      </section>

      {/* sa art of the crisp ni na section haaha */}
      <section id="art-of-the-crisp" className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Image — black bg so portrait/landscape both look clean */}
        <div className="rounded-2xl overflow-hidden bg-black w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <img
            src={KatsuImg}
            alt="Katsu Crisp Art"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-3">
            Technique &amp; Craft
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            The Art of the Crisp
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8 sm:mb-10">
            Every piece of katsu we serve carries decades of Japanese frying
            tradition. We source panko from a single artisan mill, press-bread
            by hand, and fry at the exact temperature that turns each crumb into
            pure, airy gold.
          </p>
          <div className="flex flex-wrap gap-8 sm:gap-10">
            <div>
              <span className="block text-3xl font-bold text-brand-red">
                72°C
              </span>
              <span className="text-sm text-gray-500 mt-1 block">Fry Temp</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-brand-red">
                3mm
              </span>
              <span className="text-sm text-gray-500 mt-1 block">
                Panko Thickness
              </span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-brand-red">
                90s
              </span>
              <span className="text-sm text-gray-500 mt-1 block">
                Rest Time
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* heritage na section ni */}
      <section className="bg-gray-50 py-16 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-10 sm:mb-14">
            <p className="text-brand-red text-sm font-semibold tracking-widest uppercase mb-3">
              Roots &amp; Legacy
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our Heritage
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Left */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Authentic Foundation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  CrispKatsu GO traces its roots to the bustling market streets
                  of Osaka, where katsu was not fast food — it was ritual. Every
                  recipe we carry forward honours that history.
                </p>
              </div>
              {/* heritage image ni diria */}
              <div className="rounded-2xl overflow-hidden bg-gray-200 w-full h-[200px] sm:h-[250px] md:h-[300px]">
                <img
                  src={KatsuImg6}
                  alt="Heritage Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* mao ning right part sa kadtong image nga naay rooten in japanese tradition ug modern ambition */}
            <div className="flex flex-col gap-6">
              <div className="bg-brand-red text-white rounded-2xl p-6 sm:p-8">
                <h4 className="text-lg font-bold mb-3">
                  Rooted in Japanese Tradition
                </h4>
                <p className="text-red-100 leading-relaxed text-sm">
                  We trained under katsu masters in Kyoto and Osaka to bring the
                  exact technique that defines authentic tonkatsu. No shortcuts.
                </p>
              </div>
              <div className="bg-amber-400 text-amber-900 rounded-2xl p-6 sm:p-8">
                <h4 className="text-lg font-bold mb-3">
                  Modern Ambition, Timeless Soul
                </h4>
                <p className="text-amber-800 leading-relaxed text-sm">
                  Our kitchens fuse the discipline of Japanese craftsmanship
                  with the energy of the modern city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* quality first na section*/}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-red-600 text-sm font-semibold tracking-widest uppercase mb-3">
              Ingredients &amp; Standards
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Quality First
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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
              desc: "Our house tonkatsu sauce is blended daily from twelve ingredients, balanced to complement the crumb.",
            },
            {
              src: KatsuImg4,
              alt: "Koshihikari Rice",
              title: "Pearl Koshihikari Rice",
              desc: "Steamed fresh every 30 minutes from short-grain Koshihikari rice prized across Japan for its texture.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* quality cards images ni*/}
              <div className="bg-gray-100 w-full h-[220px]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* cta banner ni siya */}
      <section className="bg-brand-red py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10">
          Experience the Crisp Today.
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className="inline-block bg-white text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-200"
          >
            Order Now
          </button>
        </div>
      </section>
    </div>
  );
}

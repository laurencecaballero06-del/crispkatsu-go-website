import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "../Utils/ScreenChecker/isMobile.js";
import { ShieldCheck, AlertCircle } from "lucide-react";
import HelmetComponent from "../Components/HelmetComponent.jsx";

export default function ProductDetailsPage() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <button
          onClick={() => navigate("/products")}
          className="text-brand-red font-black uppercase tracking-widest text-sm bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const images = Array.isArray(product.image) ? product.image : [product.image];

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleAddToCart = () => {
    const newItem = {
      id: product.id,
      name: product.ProdName,
      price: product.Price,
      quantity: quantity,
      image: product.ImageURL || (Array.isArray(product.image) ? product.image[0] : product.image),
    };

    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = currentCart.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("cart-update")); // Keep cart badge synced across components
    navigate("/products");
  };

  return (
    <div className={`min-h-screen bg-white font-body ${isMobile ? "pb-40" : "py-8"}`}>
      <HelmetComponent
        title={`${product.ProdName}`}
        description={product.ProdDesc}
      />
      
      <div className="max-w-6xl mx-auto px-0 sm:px-4 md:px-8">
        {/* --- DESKTOP BACK BUTTON --- */}
        {!isMobile && (
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-brand-dark transition-colors group"
          >
            <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-widest">
              Back to Menu
            </span>
          </button>
        )}

        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2 gap-12 lg:gap-16 items-start"}`}>
          
          {/* --- IMAGE CAROUSEL SECTION --- */}
          <div className={`relative overflow-hidden bg-gray-50 ${
            isMobile 
              ? "w-full aspect-[16/11]" // Cinema aspect ratio stops the massive vertical screen block on mobile
              : "rounded-[2rem] shadow-xl border border-gray-100 aspect-square"
          }`}>
            {/* FLOATING MOBILE BACK BUTTON */}
            {isMobile && (
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 z-10 flex items-center justify-center p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-brand-dark active:scale-95 transition-all border border-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Slider Track */}
            <div
              className="w-full h-full flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img || `/images/${product.id}.jpg`}
                  alt={product.ProdName}
                  className="w-full h-full object-cover shrink-0"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x450?text=CrispkatsuGo";
                  }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={prevImage}
                    className="pointer-events-auto p-2 bg-white/80 backdrop-blur-sm rounded-full text-brand-dark shadow-sm hover:bg-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="pointer-events-auto p-2 bg-white/80 backdrop-blur-sm rounded-full text-brand-dark shadow-sm hover:bg-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Dots indicator */}
                <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        currentImageIndex === idx ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* --- DETAILS CONTENT SECTION --- */}
          <div className="flex flex-col px-4 sm:px-0 mt-4 sm:mt-0">
            {/* Category Tag */}
            <span className="w-fit px-3 py-1 bg-brand-red/5 text-brand-red rounded-md text-[10px] font-black uppercase tracking-widest">
              {product.Category || "Rice Meal"}
            </span>

            {/* Balanced dynamic text tracking sizes */}
            <h1 className={`${isMobile ? "text-2xl" : "text-5xl lg:text-6xl"} mt-2 sm:mt-4 font-black text-brand-dark leading-tight font-display tracking-wide uppercase`}>
              {product.ProdName}
            </h1>

            {/* Dietary / Info Badges */}
            {(product.isHalal || product.hasAllergen) && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {product.isHalal && (
                  <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 border border-green-100">
                    <ShieldCheck size={12} className="text-brand-green" strokeWidth={2.5} />
                    <span className="text-[9px] font-black text-brand-green uppercase tracking-wider">Halal</span>
                  </div>
                )}
                {product.hasAllergen && (
                  <div className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 border border-red-100">
                    <AlertCircle size={12} className="text-brand-red" strokeWidth={2.5} />
                    <span className="text-[9px] font-black text-brand-red uppercase tracking-wider">Allergens</span>
                  </div>
                )}
              </div>
            )}

            {/* Description Block */}
            <div className="mt-6 border-t border-gray-100 pt-5">
              <h3 className="text-[10px] font-black text-brand-dark uppercase tracking-[0.15em] mb-2">
                Description
              </h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                {product.ProdDesc}
              </p>
            </div>

            {/* --- DESKTOP ADD TO CART BLOCK --- */}
            {!isMobile && (
              <div className="mt-8 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">
                      Price per serving
                    </span>
                    <span className="text-3xl font-black text-brand-dark font-display">
                      ₱{product.Price}
                    </span>
                  </div>
                  <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center font-bold text-brand-dark hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-black text-brand-dark text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center font-bold text-brand-dark hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-brand-red text-white py-4 rounded-xl font-black text-base shadow-lg shadow-brand-red/10 uppercase tracking-widest hover:bg-brand-dark transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
                >
                  Add to Bag — ₱{(product.Price * quantity).toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- STICKY FOOTER (Mobile Only) --- */}
      {isMobile && (
        <div className="fixed bottom-0 inset-x-0 p-4 pb-5 bg-white/95 backdrop-blur-md border-t border-gray-100 flex flex-col gap-3.5 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center">
            {/* Mobile Counter */}
            <div className="flex items-center bg-gray-100/80 rounded-xl p-0.5 border border-gray-200/20">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center font-black text-brand-dark text-lg"
              >
                -
              </button>
              <span className="w-8 text-center font-black text-brand-dark font-display text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center font-black text-brand-dark text-lg"
              >
                +
              </button>
            </div>
            
            {/* Mobile Price Total readout */}
            <div className="text-right">
              <span className="block text-[9px] text-gray-400 font-black uppercase tracking-wider">
                Subtotal
              </span>
              <span className="text-xl sm:text-2xl font-black text-brand-dark font-display tracking-tight">
                ₱{(product.Price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-brand-red text-white py-3.5 rounded-xl font-black text-sm shadow-md font-display uppercase tracking-widest active:scale-[0.97] transition-transform"
          >
            Add to Bag
          </button>
        </div>
      )}
    </div>
  );
}
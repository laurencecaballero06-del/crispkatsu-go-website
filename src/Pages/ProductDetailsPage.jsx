import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "../Utils/ScreenChecker/isMobile.js";
import { ShieldCheck, AlertCircle } from "lucide-react";

export default function ProductDetailsPage() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="text-brand-red font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Handle both single image string and array of images
  const images = Array.isArray(product.image) ? product.image : [product.image];

  // Functions to navigate through images in the carousel
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  // The previous image function wraps around to the last image when at the beginning
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Add to Cart function that updates localStorage with the new item and quantity
  const handleAddToCart = () => {
    const newItem = {
      name: product.ProdName,
      price: product.Price,
      quantity: quantity,
      image: product.ImageURL || product.image,
    };

    // 1. Get the current cart from localStorage.
    // If it's empty, we start with an empty array [].
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // 2. Check if this specific product is already in the cart
    const existingItemIndex = currentCart.findIndex(
      (item) => item.name === newItem.name,
    );

    if (existingItemIndex !== -1) {
      // If it exists, update the quantity of that item in the array
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // If it's a new product, add it to the list
      currentCart.push(newItem);
    }

    // 3. Save the entire updated array back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(currentCart));

    navigate("/products");
  };

  return (
    <div
      className={`min-h-screen bg-white font-body ${isMobile ? "pb-44" : "py-2"}`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-widest">
              Back to Menu
            </span>
          </button>
        )}

        <div
          className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2 gap-16 items-start"}`}
        >
          {/* --- IMAGE SECTION --- */}
          <div
            className={`relative overflow-hidden ${isMobile ? "w-full aspect-square" : "rounded-[2.5rem] shadow-2xl border-4 border-white aspect-square"}`}
          >
            {/* MOBILE BACK BUTTON (Stays Floating) */}
            {isMobile && (
              <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-brand-dark active:scale-95 transition-all border border-gray-100/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest">
                  Back
                </span>
              </button>
            )}

            <div
              className="w-full h-full flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.ProdName}
                  className="w-full h-full object-cover shrink-0"
                />
              ))}
            </div>

            {images.length > 1 && (
              <>
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={prevImage}
                    className="pointer-events-auto p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="pointer-events-auto p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1 transition-all duration-300 rounded-full ${currentImageIndex === idx ? "w-8 bg-white" : "w-4 bg-white/40"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* --- DETAILS SECTION --- */}
          <div className="flex flex-col h-full justify-center">
            <span className="w-fit px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-black uppercase tracking-widest">
              {product.Category || "Rice Meal"}
            </span>

            <h1
              className={`${isMobile ? "text-4xl" : "text-7xl"} mt-4 font-black text-brand-dark leading-tight font-display tracking-tighter`}
            >
              {product.ProdName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Halal Badge */}
              {product.isHalal && (
                <div className="flex items-center gap-1.5 rounded-full bg-brand-green/10 px-2 py-1 border border-brand-green/20">
                  <ShieldCheck
                    size={14}
                    className="text-brand-green"
                    strokeWidth={2.5}
                  />
                  <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider">
                    Halal
                  </span>
                </div>
              )}

              {/* Allergen Badge */}
              {product.hasAllergen && (
                <div className="flex items-center gap-1.5 rounded-full bg-brand-red/10 px-2 py-1 border border-brand-red/20">
                  <AlertCircle
                    size={14}
                    className="text-brand-red"
                    strokeWidth={2.5}
                  />
                  <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider">
                    Allergens
                  </span>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <h3 className="text-xs font-black text-brand-dark uppercase tracking-[0.2em]">
                Description
              </h3>
              <p className="mt-4 text-gray-500 leading-relaxed text-lg max-w-md">
                {product.ProdDesc}
              </p>
            </div>

            {/* --- DESKTOP ADD TO CART SECTION --- */}
            {!isMobile && (
              <div className="mt-12 bg-gray-50 p-8 rounded-4xl border border-gray-100">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                      Price per serving
                    </span>
                    <span className="text-4xl font-black text-brand-dark">
                      ₱{product.Price}
                    </span>
                  </div>
                  <div className="flex items-center bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-12 h-12 flex items-center justify-center font-bold text-brand-dark hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-black text-brand-dark text-xl">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-12 h-12 flex items-center justify-center font-bold text-brand-dark hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-brand-red text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-red-900/20 uppercase tracking-[0.2em] hover:bg-[#900000] transition-all transform hover:-translate-y-1 active:scale-95"
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
        <div className="fixed bottom-0 inset-x-0 p-6 bg-white/95 backdrop-blur-lg border-t border-gray-100 flex flex-col gap-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center">
            <div className="flex items-center bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center font-bold text-brand-dark"
              >
                -
              </button>
              <span className="w-10 text-center font-black text-brand-dark font-display text-lg">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-12 h-12 flex items-center justify-center font-bold text-brand-dark"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-gray-400 font-black uppercase tracking-tighter">
                Subtotal
              </span>
              <span className="text-2xl font-black text-brand-dark font-display">
                ₱{(product.Price * quantity).toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-brand-red text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-900/20 font-display uppercase tracking-widest active:scale-95 transition-transform"
          >
            Add to Bag
          </button>
        </div>
      )}
    </div>
  );
}

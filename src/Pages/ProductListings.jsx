import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../Data/Products.json";
import { useIsMobile } from "../Utils/ScreenChecker/isMobile.js";

export default function ProductListings() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(productsData.map((p) => p.Category))];

  const filteredProducts = productsData
    .filter((p) => activeCategory === "All" || p.Category === activeCategory)
    .sort((a, b) => {
      // Sort by availability first (True/1 comes before False/0)
      return Number(b.isAvailable) - Number(a.isAvailable);
    });
    
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-brand-dark tracking-tight font-display text-center md:text-left">
              Crispkatsu Menu
            </h1>
            <p className="mt-2 text-lg text-gray-500 text-center md:text-left">
              Satisfying fusion of crispy katsu and fresh wraps.
            </p>
          </div>

          {/* FILTER BAR */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/20 scale-105"
                    : "bg-white text-brand-dark border border-gray-200 hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isAvailable = product.isAvailable !== false; // Assuming true if not explicitly false

            return (
              <div
                key={product.id}
                onClick={() => {
                  // Prevent navigation if not available
                  if (isAvailable) {
                    navigate(`/products/${product.id}`, { state: { product } });
                  }
                }}
                className={`group relative bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-500 ${
                  isAvailable
                    ? "cursor-pointer border-gray-200"
                    : "cursor-not-allowed border-gray-100 opacity-75 grayscale-[0.5]"
                } ${
                  isAvailable && !isMobile
                    ? "hover:shadow-xl hover:-translate-y-2"
                    : isAvailable
                      ? "active:scale-[0.98]"
                      : ""
                }`}
              >
                {/* Image Container */}
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.image || `/images/${product.id}.jpg`}
                    alt={product.ProdName}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isAvailable && !isMobile ? "group-hover:scale-110" : ""
                    }`}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300?text=Crispkatsu";
                    }}
                  />

                  {/* Sold Out Overlay Badge */}
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-brand-red text-white px-4 py-1 rounded-full text-sm font-black uppercase tracking-widest shadow-lg">
                        Sold Out
                      </span>
                    </div>
                  )}

                  {/* Desktop Hover Name - Only show if available */}
                  {isAvailable && !isMobile && (
                    <div className="absolute inset-0 bg-brand-dark/40 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                      <h3 className="text-white text-center text-xl font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-display">
                        {product.ProdName}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {isMobile && (
                    <h3
                      className={`text-xl font-black font-display mb-2 leading-tight ${isAvailable ? "text-brand-dark" : "text-gray-400"}`}
                    >
                      {product.ProdName}
                    </h3>
                  )}

                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isAvailable ? "text-brand-green" : "text-gray-400"}`}
                      >
                        {product.Category}
                      </span>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {product.ProdDesc}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-lg font-black ${isAvailable ? "text-brand-dark" : "text-gray-400"}`}
                      >
                        ₱{product.Price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase ${isAvailable ? "text-brand-green" : "text-brand-red"}`}
                    >
                      {isAvailable ? "Available" : "Currently Unavailable"}
                    </span>

                    <button
                      disabled={!isAvailable}
                      className={`p-2 rounded-lg transition-all ${
                        isAvailable
                          ? "bg-brand-red text-white hover:bg-brand-dark shadow-md shadow-brand-red/20"
                          : "bg-gray-100 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-dark font-medium text-lg">
              No products found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../Data/Products.json";
import { useIsMobile } from "../Utils/ScreenChecker/isMobile.js";
import HelmetComponent from "../Components/HelmetComponent.jsx";

export default function ProductListings() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(productsData.map((p) => p.Category))];
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => activeCategory === "All" || p.Category === activeCategory)
      .sort((a, b) => {
        const aAvail = a.isAvailable !== false ? 1 : 0;
        const bAvail = b.isAvailable !== false ? 1 : 0;
        return bAvail - aAvail;
      });
  }, [activeCategory]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const savedCart = localStorage.getItem("cartItems") || "[]";
    const cart = JSON.parse(savedCart);
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-update"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 font-body">
      <HelmetComponent
        title="Menu"
        description="Explore our delicious menu of crispy katsu dishes, fresh wraps, and satisfying sides. Find your new favorite meal at Crisp Katsu!"
      />
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-12 gap-4 md:gap-6 border-b border-gray-200 pb-5">
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight font-display uppercase">
              Crispkatsu Menu
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-md tracking-wide">
              A satisfying fusion of premium crispy katsu and fresh geometric signature wraps.
            </p>
          </div>

          {/* FILTER BAR - Smooth horizontal scrolling on small mobile screens */}
          <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0 justify-start md:justify-center -mx-3 px-3 md:mx-0 md:px-0 scroll-smooth snap-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap snap-letter ${
                  activeCategory === cat
                    ? "bg-brand-red text-white shadow-md shadow-brand-red/20 scale-105"
                    : "bg-white text-brand-dark border border-gray-200 hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Changed to 2 columns on mobile to stop huge vertical zoom blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {filteredProducts.map((product) => {
            const isAvailable = product.isAvailable !== false;

            return (
              <div
                key={product.id}
                onClick={() => {
                  if (isAvailable) {
                    navigate(`/products/${product.id}`, { state: { product } });
                  }
                }}
                className={`group relative bg-white border rounded-xl sm:rounded-2xl overflow-hidden shadow-sm transition-all duration-500 flex flex-col justify-between ${
                  isAvailable
                    ? "cursor-pointer border-gray-200"
                    : "cursor-not-allowed border-gray-100 opacity-75 grayscale-[0.2]"
                } ${
                  isAvailable && !isMobile
                    ? "hover:shadow-xl hover:-translate-y-2"
                    : isAvailable
                      ? "active:scale-[0.98]"
                      : ""
                }`}
              >
                {/* Image Container - Switched from aspect-square to aspect-[4/3] on mobile for better framing */}
                <div className="aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100 relative border-b border-gray-100 flex-shrink-0">
                  <img
                    src={product.image || `/images/${product.id}.jpg`}
                    alt={product.ProdName}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isAvailable && !isMobile ? "group-hover:scale-105" : ""
                    }`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400?text=CrispkatsuGo";
                    }}
                  />

                  {/* Sold Out Overlay Badge */}
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-brand-red text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm border solid #fff">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow h-[135px] sm:h-[180px]">
                  <div>
                    {/* Item Heading and Category */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] text-brand-red truncate">
                        {product.Category}
                      </span>
                    </div>

                    {/* Unified Title Field */}
                    <h3 className={`text-sm sm:text-lg font-black font-display tracking-wide uppercase line-clamp-1 group-hover:text-brand-red transition-colors duration-200 ${
                      isAvailable ? "text-brand-dark" : "text-gray-400"
                    }`}>
                      {product.ProdName}
                    </h3>

                    {/* Item Description - Hidden on small mobile devices to save space and maintain balance */}
                    <p className="hidden sm:line-clamp-2 text-xs text-gray-400 mt-1 font-medium normal-case">
                      {product.ProdDesc}
                    </p>
                  </div>

                  {/* Actions & Price Area */}
                  <div className="mt-2 sm:mt-4 flex items-center justify-between border-t border-gray-50 pt-2 sm:pt-3">
                    <div>
                      <p className={`text-base sm:text-2xl font-black font-display tracking-tight ${
                        isAvailable ? "text-brand-dark" : "text-gray-400"
                      }`}>
                        ₱{product.Price}
                      </p>
                    </div>

                    <button
                      disabled={!isAvailable}
                      onClick={(e) => handleAddToCart(e, product)}
                      aria-label={`Add ${product.ProdName} to cart`}
                      className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-200 ${
                        isAvailable
                          ? "bg-brand-red text-white hover:bg-brand-dark shadow-sm hover:scale-105"
                          : "bg-gray-100 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
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
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-white m-2">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs sm:text-sm">
              No menu items found.
            </p>
          </div>
        )}
      </div>
      
      {/* Inline styling block to completely hide the horizontal scrollbar wrapper on mobile filter categories */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
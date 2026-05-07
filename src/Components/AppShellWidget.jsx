import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppShellWidget() {
  const [menuState, setMenuState] = useState(false);

  const navigation = [
    { title: "Our Story", path: "/" },
    { title: "Menu", path: "/products" }, // Renamed to Menu for better katsu vibes
  ];

  return (
    <nav className="bg-white border-b border-gray-100 font-body sticky top-0 z-50">
      <div className="flex items-center space-x-8 py-4 px-4 max-w-7xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <Link to="/" className="flex items-center gap-2">
            {/* PRO-TIP: Swap this src with your actual logo. 
              The 'font-display' matches your Space Grotesk headline style.
            */}
            <div className="h-10 w-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-black text-xl font-display">
              C
            </div>
            <span className="font-display font-black text-xl tracking-tighter text-brand-dark hidden sm:block">
              CRISPKATSU<span className="text-brand-red">GO</span>
            </span>
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-between">
          <div
            className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "block" : "hidden"
            }`}
          >
            <ul className="space-y-5 lg:flex lg:space-x-8 lg:space-y-0 lg:mt-0">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-brand-red font-bold transition-colors duration-200 uppercase text-sm tracking-widest"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            {/* Cart Link with Brand Red badge support */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center p-2 text-brand-dark hover:text-brand-red transition-colors"
              aria-label="View shopping cart"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* If you add a cart count later, use the brand-red here: */}
              {/* <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white shadow-sm">
                  3
              </span> */}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="outline-none text-brand-dark block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function   () {
  const [menuState, setMenuState] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation(); // Used to trigger a refresh when navigating

  // Function to calculate total items (sum of quantities)
  const updateCartCount = () => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      const total = parsedCart.reduce(
        (acc, item) => acc + (item.name ? 1 : 0),
        0,
      );
      setCartCount(total);
    } else {
      setCartCount(0);
    }
  };

  // Update count on mount and whenever the URL changes
  useEffect(() => {
    updateCartCount();

    // Optional: Listen for storage events (if shopping in multiple tabs)
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [location]);

  const navigation = [
    { title: "Our Story", path: "/" },
    { title: "Menu", path: "/products" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 font-body sticky top-0 z-50">
      <div className="flex items-center space-x-8 py-4 px-4 max-w-7xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <Link to="/" className="flex items-center gap-2">
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
            {/* Cart Link with Badge */}
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

              {/* --- THE BADGE --- */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white shadow-sm animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="outline-none text-brand-dark block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

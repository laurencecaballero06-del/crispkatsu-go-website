import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuState, setMenuState] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Wrapped in useCallback to prevent infinite reference re-triggers
  const updateCartCount = useCallback(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure accurate counting based on array presence or quantity properties
        const total = Array.isArray(parsedCart) 
          ? parsedCart.reduce((acc, item) => acc + (item.quantity || 1), 0)
          : 0;
        setCartCount(total);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      setCartCount(0);
    }
  }, []);

  // Sync cart across same-tab events and multi-tab actions
  useEffect(() => {
    updateCartCount();
    
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart-update", updateCartCount); // Custom event listener
    
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-update", updateCartCount);
    };
  }, [updateCartCount, location]);

  // Handle background change on window scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically close mobile menu drawer on route change
  useEffect(() => {
    setMenuState(false);
  }, [location]);

  const navigation = [
    { title: "Our Story", path: "/" },
    { title: "Menu", path: "/products" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;700&family=Barlow+Condensed:wght@500;700;900&display=swap');

        .navbar-root {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #ffffff;
          border-bottom: 2px solid #1a1a1a;
          transition: box-shadow 0.3s ease;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .navbar-root.scrolled {
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
        }

        .navbar-stripe {
          height: 4px;
          background: repeating-linear-gradient(
            90deg,
            #c0392b 0px,
            #c0392b 32px,
            #1a1a1a 32px,
            #1a1a1a 36px
          );
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          height: 72px;
          gap: 1.5rem;
        }

        /* ── LOGO BLOCK ── */
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-image-wrap {
          position: relative;
          width: 56px;
          height: 56px;
          flex-shrink: 0;
        }
        .logo-image-wrap::before {
          content: '';
          position: absolute;
          inset: -3px;
          border: 2px solid #c0392b;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.25s ease, transform 0.25s ease;
          transform: scale(0.85);
        }
        .logo-link:hover .logo-image-wrap::before {
          opacity: 1;
          transform: scale(1);
        }
        .logo-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .logo-text-block {
          display: flex;
          flex-direction: column;
          line-height: 1;
          padding-left: 10px;
          border-left: 3px solid #c0392b;
          margin-left: 12px;
        }
        .logo-jp {
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 700;
          font-size: 8px;
          letter-spacing: 0.25em;
          color: #c0392b;
          text-transform: uppercase;
          margin-bottom: 1px;
        }
        .logo-main {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 0.04em;
          color: #1a1a1a;
        }
        .logo-main .highlight {
          color: #c0392b;
        }
        .logo-tagline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 500;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #888;
          text-transform: uppercase;
          margin-top: 1px;
        }

        @media (max-width: 480px) {
          .logo-text-block { display: none; }
        }

        /* ── NAV LINKS (DESKTOP) ── */
        .desktop-nav {
          display: none;
          gap: 0.5rem;
          align-items: center;
          margin-left: auto; /* Pushes content right dynamically */
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex; }
        }

        .nav-link {
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          text-decoration: none;
          padding: 6px 16px;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background: #c0392b;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover {
          color: #c0392b;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* ── ACTIONS ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        @media (max-width: 1023px) {
          .nav-actions { margin-left: auto; }
        }

        .cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 4px;
          color: #1a1a1a;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .cart-btn:hover {
          border-color: #c0392b;
          color: #c0392b;
          background: #fff5f5;
        }
        .cart-btn svg {
          width: 22px;
          height: 22px;
        }
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          background: #c0392b;
          color: #fff;
          font-weight: 900;
          font-size: 10px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          animation: popIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes popIn {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }

        /* ── HAMBURGER ── */
        .hamburger-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: transparent;
          border: 2px solid #1a1a1a;
          border-radius: 4px;
          cursor: pointer;
          color: #1a1a1a;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .hamburger-btn:hover {
          border-color: #c0392b;
          color: #c0392b;
          background: #fff5f5;
        }
        .hamburger-btn svg {
          width: 20px;
          height: 20px;
        }
        @media (min-width: 1024px) {
          .hamburger-btn { display: none; }
        }

        /* ── MOBILE DRAWER ── */
        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #1a1a1a;
          border-bottom: 3px solid #c0392b;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
          z-index: 40;
        }
        .mobile-drawer.open {
          max-height: 300px;
        }
        .mobile-drawer-inner {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-nav-link {
          font-weight: 700;
          font-size: 20px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #e8e8e8;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: color 0.2s, padding-left 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mobile-nav-link:last-child { border-bottom: none; }
        .mobile-nav-link::before {
          content: '›';
          color: #c0392b;
          font-size: 22px;
          line-height: 1;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .mobile-nav-link:hover {
          color: #c0392b;
          padding-left: 4px;
        }
        .mobile-nav-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        @media (min-width: 1024px) {
          .mobile-drawer { display: none; }
        }
      `}</style>

      <nav className={`navbar-root ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-stripe" />

        <div className="navbar-inner">
          {/* LOGO */}
          <Link to="/" className="logo-link">
            <div className="logo-image-wrap">
              <img
                src="src/assets/logo/KatsuLogo.png"
                alt="CrispkatsuGO Logo"
              />
            </div>
            <div className="logo-text-block">
              <span className="logo-jp">日本風カツ</span>
              <span className="logo-main">
                CRISPKATSU<span className="highlight">GO</span>
              </span>
              <span className="logo-tagline">Local Katsu · Est. 2024</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="desktop-nav">
            {navigation.map((item, idx) => (
              <Link key={idx} to={item.path} className="nav-link">
                {item.title}
              </Link>
            ))}
          </div>

          {/* ACTIONS CONTAINER */}
          <div className="nav-actions">
            {/* Cart Button */}
            <Link to="/cart" className="cart-btn" aria-label={`View shopping cart, ${cartCount} items`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>

            {/* Hamburger Button */}
            <button
              className="hamburger-btn"
              onClick={() => setMenuState(!menuState)}
              aria-label="Toggle menu"
              aria-expanded={menuState}
              aria-controls="mobile-navigation-drawer"
            >
              {menuState ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div 
          id="mobile-navigation-drawer" 
          className={`mobile-drawer ${menuState ? "open" : ""}`}
        >
          <div className="mobile-drawer-inner">
            {navigation.map((item, idx) => (
              <Link key={idx} to={item.path} className="mobile-nav-link">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
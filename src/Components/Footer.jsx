import { Link } from "react-router-dom";

export default function Footer() {
  const navigation = [
    { title: "Our Story", path: "/" },
    { title: "Menu", path: "/products" },
  ];

  return (
    <>
      <style>{`
        .footer-root {
          background: #ffffff;
          border-top: 2px solid #1a1a1a;
          font-family: 'Barlow Condensed', sans-serif;
          position: relative;
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 2rem 1.5rem;
        }

        .footer-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .footer-top {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        /* ── LOGO BLOCK (Synced with Navbar) ── */
        .footer-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .footer-logo-img-wrap {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
        }
        .footer-logo-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          padding-left: 8px;
          border-left: 2px solid #c0392b;
          margin-left: 10px;
          text-align: left;
        }
        .footer-logo-jp {
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 700;
          font-size: 7px;
          letter-spacing: 0.25em;
          color: #c0392b;
          text-transform: uppercase;
          margin-bottom: 1px;
        }
        .footer-logo-main {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 0.04em;
          color: #1a1a1a;
        }
        .footer-logo-main .highlight {
          color: #c0392b;
        }

        /* ── LINKS ── */
        .footer-nav {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 1.5rem;
          align-items: center;
        }
        .footer-link {
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #c0392b;
        }

        /* ── BOTTOM DIVIDER & METADATA ── */
        .footer-divider {
          border-top: 1px solid #e8e8e8;
          margin-top: 2rem;
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #888;
        }
        @media (min-width: 640px) {
          .footer-divider {
            flex-direction: row;
          }
        }
        
        .footer-credit {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Bottom closing stripe */
        .footer-stripe {
          height: 4px;
          background: repeating-linear-gradient(
            90deg,
            #c0392b 0px,
            #c0392b 32px,
            #1a1a1a 32px,
            #1a1a1a 36px
          );
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          {/* Top row: Logo + Nav */}
          <div className="footer-top">
            {/* Logo */}
            <Link to="/" className="footer-logo-link">
              <div className="footer-logo-img-wrap">
                <img
                  src="/KatsuLogo.png"
                  alt="CrispkatsuGO Logo"
                />
              </div>
              <div className="footer-logo-text">
                <span className="footer-logo-jp">日本風カツ</span>
                <span className="footer-logo-main">
                  CRISPKATSU<span className="highlight">GO</span>
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <ul className="footer-nav">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="footer-link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider & Meta */}
          <div className="footer-divider">
            <p>© {new Date().getFullYear()} CrispkatsuGo. All rights reserved.</p>
            <p className="footer-credit">Made with ❤️ in the Philippines</p>
          </div>
        </div>

        {/* Closing geometric stripe accent */}
        <div className="footer-stripe" />
      </footer>
    </>
  );
}
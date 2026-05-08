import { Link } from "react-router-dom";

export default function Footer() {
  const navigation = [
    { title: "Our Story", path: "/" },
    { title: "Menu", path: "/products" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 font-body">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Top row: Logo + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-black text-xl font-display">
              C
            </div>
            <span className="font-display font-black text-xl tracking-tighter text-brand-dark">
              CRISPKATSU<span className="text-brand-red">GO</span>
            </span>
          </Link>

          {/* Nav Links */}
          <ul className="flex items-center gap-6">
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

        {/* Divider */}
        <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} CrispkatsuGo. All rights reserved.</p>
          <p>Made with ❤️ in the Philippines</p>
        </div>
      </div>
    </footer>
  );
}

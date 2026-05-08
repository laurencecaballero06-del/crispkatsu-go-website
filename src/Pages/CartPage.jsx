import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Plus,
  Minus,
  Utensils,
  ShoppingBasket,
  ShieldCheck,
  X,
  Loader2,
} from "lucide-react";
import { TurnstileWidget } from "./TurnstileWidget";

// ── Verification Modal ────────────────────────────────────────────────────────
function VerificationModal({ onVerified, onClose }) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProceed = () => {
    if (!token) return;
    setLoading(true);
    // Token verified client-side (widget passed); proceed
    setTimeout(() => {
      setLoading(false);
      onVerified(token);
    }, 600);
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl shadow-black/10 relative animate-[fadeUp_0.25s_ease]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
            <ShieldCheck size={28} className="text-brand-red" />
          </div>
        </div>

        {/* Copy */}
        <h2 className="text-xl font-black text-brand-dark text-center font-display tracking-tight uppercase mb-1">
          Verify You're Human
        </h2>
        <p className="text-[11px] text-gray-400 font-bold text-center uppercase tracking-widest mb-7">
          Quick check before placing your order
        </p>

        {/* Turnstile */}
        <div className="mb-6">
          {error ? (
            <p className="text-center text-[11px] text-red-400 font-bold uppercase tracking-wider">
              Verification failed. Please refresh and try again.
            </p>
          ) : (
            <TurnstileWidget
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={(t) => {
                setToken(t);
                setError(false);
              }}
              onError={() => setError(true)}
              onExpired={() => setToken(null)}
            />
          )}
        </div>

        {/* Proceed button */}
        <button
          onClick={handleProceed}
          disabled={!token || loading}
          className="w-full bg-brand-red text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/20 active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <MessageCircle size={18} fill="currentColor" />
          )}
          {loading ? "Verifying..." : "Continue to Messenger"}
        </button>
      </div>
    </div>
  );
}

// ── Cart Page ─────────────────────────────────────────────────────────────────
export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [serviceType, setServiceType] = useState("Dining In");
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const updateQuantity = (itemName, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === itemName) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleRemove = (itemName) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Called after Turnstile verifies the user
  const handleVerified = (_token) => {
    setShowVerification(false);

    const orderDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const itemsList = cartItems
      .map(
        (item) =>
          `- ${item.name} (x${item.quantity}): ₱${(item.price * item.quantity).toFixed(2)}`,
      )
      .join("\n");

    const message = `Hello! I'd like to place an order:

Order Type: ${serviceType}
Order Date: ${orderDate}

Order Details:
${itemsList}

Total: ₱${subtotal.toFixed(2)}

Please let me know how to proceed with the payment.`;

    const encodedMessage = encodeURIComponent(message);
    const phone = "+63XXXXXXXXXX"; // your number here
    const url = `https://m.me/FuritsuProjectFreelance?text=${encodedMessage}`;

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isIOS) {
      // iOS uses & as separator
      window.location.href = `sms:${phone}&body=${encodedMessage}`;
    } else if (isAndroid) {
      // Android uses ? as separator
      window.location.href = `sms:${phone}?body=${encodedMessage}`;
    } else {
      // Desktop fallback — copy to clipboard
      window.open(url, "_blank");
    }
  };

  return (
    <>
      {/* ── Verification Modal ── */}
      {showVerification && (
        <VerificationModal
          onVerified={handleVerified}
          onClose={() => setShowVerification(false)}
        />
      )}

      <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-body">
        <div className="max-w-5xl mx-auto">
          {/* Navigation */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-brand-red transition-colors mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-bold uppercase text-[10px] tracking-[0.2em]">
              Back to Menu
            </span>
          </button>

          <h1 className="text-3xl font-black text-brand-dark mb-10 flex items-center gap-3 font-display tracking-tight uppercase">
            <ShoppingBag className="text-brand-red" size={28} />
            Your Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5"
                    >
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-brand-dark text-base font-display uppercase tracking-tight leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-gray-100 rounded-xl p-1 bg-gray-50">
                            <button
                              onClick={() => updateQuantity(item.name, -1)}
                              className="p-1 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-black text-brand-dark w-8 text-center text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.name, 1)}
                              className="p-1 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-brand-dark text-lg">
                          ₱
                          {(item.price * item.quantity).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2 },
                          )}
                        </p>
                        <button
                          onClick={() => handleRemove(item.name)}
                          className="text-gray-300 text-[10px] hover:text-brand-red mt-2 flex items-center gap-1 ml-auto transition-colors font-bold uppercase tracking-widest"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <ShoppingBag
                    className="mx-auto text-gray-100 mb-4"
                    size={48}
                  />
                  <p className="text-gray-400 font-bold font-display">
                    Your bag is empty
                  </p>
                  <Link
                    to="/products"
                    className="text-brand-red font-black uppercase text-xs tracking-widest mt-2 inline-block hover:underline"
                  >
                    Browse Menu
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 sticky top-10">
                <h2 className="text-xl font-black text-brand-dark mb-8 font-display tracking-tight border-b border-gray-50 pb-5">
                  SUMMARY
                </h2>

                {/* Service Type */}
                <div className="mb-8">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    How do you want your katsu?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceType("Dining In")}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                        serviceType === "Dining In"
                          ? "border-brand-red bg-red-50 text-brand-red shadow-sm"
                          : "border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      <Utensils size={20} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-center">
                        Dining In
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType("Take Out")}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                        serviceType === "Take Out"
                          ? "border-brand-red bg-red-50 text-brand-red shadow-sm"
                          : "border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      <ShoppingBasket size={20} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-center">
                        Take Out
                      </span>
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-brand-dark font-black font-display text-lg">
                      ₱
                      {subtotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest">
                      Delivery
                    </span>
                    <span className="text-brand-green bg-brand-green/5 px-2 py-1 rounded-md text-[9px] font-black">
                      CALCULATED IN CHAT
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-gray-50 mb-10">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                    Total
                  </span>
                  <span className="text-4xl font-black text-brand-gold font-display leading-none">
                    ₱
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* ── Place Order → triggers modal ── */}
                <button
                  onClick={() =>
                    cartItems.length > 0 && setShowVerification(true)
                  }
                  disabled={cartItems.length === 0}
                  className="w-full bg-brand-red text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/20 active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-300 disabled:shadow-none"
                >
                  <MessageCircle size={20} fill="currentColor" />
                  Place Order
                </button>

                <p className="mt-8 text-[9px] text-gray-400 text-center font-bold uppercase tracking-tight leading-relaxed">
                  Orders are finalized via{" "}
                  <span className="text-brand-red">Messenger</span> for
                  freshness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fade-up animation for modal */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

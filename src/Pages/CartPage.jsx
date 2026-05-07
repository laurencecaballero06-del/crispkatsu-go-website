import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

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

  // --- NEW: Quantity Update Logic ---
  const updateQuantity = (itemName, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === itemName) {
        // Prevent quantity from going below 1
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
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

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // 1. Generate the current date and time
    const orderDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const itemsList = cartItems
      .map(
        (item) =>
          `- ${item.name} (x${item.quantity}): $${(
            item.price * item.quantity
          ).toFixed(2)}`,
      )
      .join("\n");

    // 2. Add the Order Date to the template
    const message = `Hello! I'd like to place an order:

Order Date: ${orderDate}
    
Order Details:
${itemsList}

Total: $${subtotal.toFixed(2)}

Please let me know how to proceed with the payment.`;

    const encodedMessage = encodeURIComponent(message);
    const messengerUrl = `https://m.me/FuritsuProjectFreelance?text=${encodedMessage}`;

    window.open(messengerUrl, "_blank");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Shop</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="text-brand-red" />
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {item.name}
                      </h3>

                      {/* --- UPDATED: Quantity Controls --- */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          className="p-1 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-gray-700 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="p-1 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemove(item.name)}
                        className="text-red-500 text-xs hover:text-red-700 mt-2 flex items-center gap-1 ml-auto transition-colors"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">Your cart is empty.</p>
                <Link
                  to="/"
                  className="text-blue-600 font-bold hover:underline mt-2 inline-block"
                >
                  Explore Products
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Section remains the same */}
          <div className="lg:col-span-4">
            {/* ... (Your existing Summary UI) ... */}
            <div className="bg-white sticky top-8 p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
              </div>
              <div className="flex justify-between py-4 text-xl font-black text-gray-900 uppercase tracking-tight">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-200 disabled:bg-gray-400"
              >
                <MessageCircle size={20} />
                Checkout via Messenger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();

  // Mock data
  const cartItems = [
    {
      id: 1,
      ProdName: "Premium Wireless Headphones",
      price: 299.0,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // --- NEW: Messenger Integration Logic ---
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // 1. Format the item list
    const itemsList = cartItems
      .map((item) => `- ${item.ProdName} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    // 2. Create the full message template
    const message = `Hello! I'd like to place an order:
    
Order Details:
${itemsList}

Total: $${subtotal.toFixed(2)}

Please let me know how to proceed with the payment.`;

    // 3. Encode the message and redirect
    const encodedMessage = encodeURIComponent(message);
    const messengerUrl = `https://m.me/FuritsuProjectFreelance?text=${encodedMessage}`;
    
    window.open(messengerUrl, "_blank");
  };
  // ------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.ProdName}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.ProdName}</h3>
                      <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                      <button className="text-red-500 text-xs hover:underline mt-1">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link to="/" className="text-indigo-600 font-medium hover:underline mt-2 inline-block">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white/70 backdrop-blur-md sticky top-8 p-6 rounded-2xl border border-white shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Updated Button to trigger the handler */}
              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-gray-200 disabled:bg-gray-400"
              >
                Checkout via Messenger
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                This will open Messenger with your order details pre-filled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
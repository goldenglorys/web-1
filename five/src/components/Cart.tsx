import React from "react";
import { CartItem } from "../App";

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, increment: boolean) => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  updateQuantity,
}) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 border-b border-gray-200">Image</th>
                <th className="py-3 px-4 border-b border-gray-200">Name</th>
                <th className="py-3 px-4 border-b border-gray-200">Price</th>
                <th className="py-3 px-4 border-b border-gray-200">Quantity</th>
                <th className="py-3 px-4 border-b border-gray-200">Total</th>
                <th className="py-3 px-4 border-b border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 border-b border-gray-200`}
                >
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4 flex items-center">
                    <button
                      className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition"
                      onClick={() => updateQuantity(item.id, false)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition"
                      onClick={() => updateQuantity(item.id, true)}
                    >
                      +
                    </button>
                  </td>
                  <td className="py-3 px-4">${item.price * item.quantity}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-xl font-semibold mt-4">
            Total Price: ${totalPrice}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;

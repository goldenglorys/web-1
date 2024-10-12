import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Random Product 1",
      price: 10,
      image: "https://picsum.photos/seed/p19/100",
    },
    {
      id: 2,
      name: "Random Product 2",
      price: 15,
      image: "https://picsum.photos/seed/p9/100",
    },
    {
      id: 3,
      name: "Random Product 3",
      price: 20,
      image: "https://picsum.photos/seed/p4/100",
    },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, increment: boolean) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Shopping App
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductList products={products} addToCart={addToCart} />
        <Cart
          cartItems={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
};

export default App;

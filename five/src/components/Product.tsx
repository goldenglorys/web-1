import React from "react";
import { Product as ProductType } from "../App";

interface ProductProps {
  product: ProductType;
  addToCart: (product: ProductType) => void;
  isOdd: boolean;
}

const Product: React.FC<ProductProps> = ({ product, addToCart, isOdd }) => {
  return (
    <tr
      className={`${
        isOdd ? "bg-gray-50" : "bg-white"
      } hover:bg-gray-100 border-b border-gray-200`}
    >
      <td className="py-3 px-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </td>
      <td className="py-3 px-4">{product.name}</td>
      <td className="py-3 px-4">${product.price}</td>
      <td className="py-3 px-4">
        <button
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </td>
    </tr>
  );
};

export default Product;

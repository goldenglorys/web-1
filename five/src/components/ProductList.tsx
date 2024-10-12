import React from "react";
import Product from "./Product";
import { Product as ProductType } from "../App";

interface ProductListProps {
  products: ProductType[];
  addToCart: (product: ProductType) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Products</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 border-b border-gray-200">Image</th>
            <th className="py-3 px-4 border-b border-gray-200">Name</th>
            <th className="py-3 px-4 border-b border-gray-200">Price</th>
            <th className="py-3 px-4 border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Product
              key={product.id}
              product={product}
              addToCart={addToCart}
              isOdd={index % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

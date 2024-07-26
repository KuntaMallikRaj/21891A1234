import React from "react";
import { useParams } from "react-router-dom";
import { getRandomImage } from "../utils/helper";

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // In a real scenario, you'd fetch the product data from an API
  // For this example, we'll use mock data
  const product = {
    id,
    name: "Sample Product",
    company: "AMZ",
    category: "Laptop",
    price: 999.99,
    rating: 4.5,
    discount: 10,
    availability: true,
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={
              "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">
              {"\u2605".repeat(Math.round(product.rating))}
            </span>
            <span className="ml-1 text-sm text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <p className="mb-2">Company: {product.company}</p>
          <p className="mb-2">Category: {product.category}</p>
          <p className="mb-2">Discount: {product.discount}%</p>
          <p
            className={`mb-4 ${
              product.availability ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.availability ? "In Stock" : "Out of Stock"}
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

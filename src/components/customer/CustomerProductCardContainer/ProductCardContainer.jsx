import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import sampleImg from "../../../assets/sample-image.jpg";

import "./ProductCardContainer.css";

const products = [
  { id: 1, name: "Organic Apples", image: sampleImg, price: 120, oldPrice: 150, rating: 4 },
  { id: 2, name: "Fresh Milk", image: sampleImg, price: 60, rating: 5 },
  { id: 3, name: "Whole Wheat Bread", image: sampleImg, price: 40, oldPrice: 50, rating: 4 },
  { id: 4, name: "Bananas", image: "/images/banana.jpg", price: 50, rating: 5 },
  { id: 5, name: "Orange Juice", image: "/images/juice.jpg", price: 80, oldPrice: 100, rating: 3 },
];

const ProductCardContainer = () => {
  if (!products || products.length === 0) {
    return <p className="no-products">No products available.</p>;
  }

  return (
    <div className="card-container">
      <div className="product-card-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>

  );
};

export default ProductCardContainer;

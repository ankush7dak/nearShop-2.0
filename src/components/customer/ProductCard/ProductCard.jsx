import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { name, image, price, oldPrice, rating } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={image || sampleImage}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '../../../assets/image-not-found.png';
          }}
          className="product-img"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">
          <span className="current-price">₹{price}</span>
          {oldPrice && <span className="old-price">₹{oldPrice}</span>}
        </div>

        <div className="product-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
          ))}
        </div>

        <button className="add-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

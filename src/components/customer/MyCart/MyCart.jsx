import React, { useEffect, useState } from "react";
import "./MyCart.css";
import axios from "axios";
import { LINKS } from "../../../constants/LinksUtility";
import NearShopNavBar from "../NearByShopSearchPage/NearShopNavBar/NearShopNavBar";


/* =============================
   MOCK CART DATA (INDUSTRY STYLE)
============================= */

const mockCartItems = [
  {
    id: 1,
    name: "Organic Apples (1kg)",
    image: "/images/apple.jpg",
    price: 120,
    qty: 2,
    stock: 18,
    category: "Fruits",
    sku: "FRU-APL-001",
    seller: "GreenFresh Store",
    taxPercent: 5,
    maxOrderQty: 5,
  },
  {
    id: 2,
    name: "Fresh Cow Milk 1L",
    image: "/images/milk.jpg",
    price: 60,
    qty: 1,
    stock: 0, // OUT OF STOCK
    category: "Dairy",
    sku: "DAR-MIL-012",
    seller: "DailyMart",
    taxPercent: 5,
    maxOrderQty: 10,
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    image: "/images/bread.jpg",
    price: 40,
    qty: 3,
    stock: 12,
    category: "Bakery",
    sku: "BAK-BRD-009",
    seller: "BakeHouse Corner",
    taxPercent: 5,
    maxOrderQty: 6,
  },
];

const MyCart = ({ cartItems = mockCartItems }) => {
  const [items, setItems] = useState(cartItems);
  const [showPayment, setShowPayment] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cartProducts,setCartProducts] = useState([]);

  const DELIVERY_FEE = 30;

  const fetchCartData = async ()=>{
    try{
      const res = await axios.get(`${LINKS.API_BASE_URL}/api/customer/getMyCartData`,{
        withCredentials : true
      });
      console.log(res.data);
      setCartProducts(res.data);
    }catch(e){

    }
  }

  useEffect(()=>{
    fetchCartData();
  },[]);

  /* =============================
      CART ACTIONS
  ============================= */







  /* =============================
      CALCULATIONS
  ============================= */

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const applyCoupon = () => {
    if (coupon === "NEAR10") setDiscount(0.1);
    else alert("Invalid Coupon");
  };

  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + DELIVERY_FEE;

  return (
    <>
    <NearShopNavBar />

    <div className="my-cart-container">
      <div className="cart-page">
        {/* =============================
            CART ITEMS
        ============================= */}
        <div className="cart-items">
          <h2>My Cart</h2>

          {cartProducts.length === 0 && (
            <p className="empty-cart">Your cart is empty</p>
          )}

          {cartProducts.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img src={item.imageLink} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <span className="stock-text">
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="cart-qty">
                <button >-</button>
                <span>{item.qty}</span>
                <button >+</button>
              </div>

              <div className="cart-total">
                ₹{item.price * item.qty}
              </div>

              <button
                className="remove-btn"
                
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* =============================
            SUMMARY
        ============================= */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹{DELIVERY_FEE}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row green">
              <span>Discount</span>
              <span>-₹{discountAmount.toFixed(0)}</span>
            </div>
          )}

          <div className="coupon-box">
            <input
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          <button
            className="pay-btn"
            disabled={items.length === 0}
            onClick={() => setShowPayment(true)}
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* =============================
          PAYMENT MODAL
      ============================= */}
      {showPayment && (
        <div className="payment-overlay">
          <div className="payment-modal">
            <h3>Select Payment Method</h3>

            <div className="payment-method">
              <label>
                <input type="radio" name="pay" defaultChecked /> UPI
              </label>
              <label>
                <input type="radio" name="pay" /> Card
              </label>
              <label>
                <input type="radio" name="pay" /> Cash on Delivery
              </label>
            </div>

            <button
              className="confirm-pay"
              onClick={() => {
                alert("Payment Successful 🎉");
                setShowPayment(false);
                setItems([]);
              }}
            >
              Pay ₹{total.toFixed(0)}
            </button>

            <button
              className="close-btn"
              onClick={() => setShowPayment(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
};

export default MyCart;

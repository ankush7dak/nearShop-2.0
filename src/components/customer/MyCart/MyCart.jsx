import React, { useEffect, useState, useMemo } from "react";
import "./MyCart.css";
import axios from "axios";
import { LINKS } from "../../../constants/LinksUtility";
import NearShopNavBar from "../NearByShopSearchPage/NearShopNavBar/NearShopNavBar";
import Loading from "../../Loading/Loading";



  

const MyCart = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [shopId, setShopId] = useState(0);

  const DELIVERY_FEE = 30;

  const fetchCartData = async ()=>{
    try{
      const res = await axios.get(`${LINKS.API_BASE_URL}/api/customer/getMyCartData`,{
        withCredentials : true
      });
      console.log(res.data);
      if (res.data.length > 0) {
        setCartProducts(res.data);
        setShopId(res.data[0].shopId);
        handleGetCartData(res.data[0].shopId);
        console.log("shop id from cart data "+res.data[0].shopId);
      } else {
        setCartProducts([]);
        setShopId(0);
        
      }
    }catch(e){
      console.error(e);
    }
  }

  useEffect(()=>{
    fetchCartData();
  },[]);

   const handleGetCartData = async (id)=>{
      try{
        setLoading(true);
        const res = await axios.get(`${LINKS.API_BASE_URL}/api/customer/getCartQuantities`,{
          withCredentials: true,
          params :{
            shopId : id
          }
        });
        setCart(res.data);
        console.log("cart data "+res.data + id);
      }catch(e){
        console.log(e);
      }
      setLoading(false);
    }

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (sum, item) => sum + item.price * (cart[item.productId] || 0),
      0
    );
  }, [cartProducts, cart]);

  const totalItems = useMemo(() => {
    return cartProducts.reduce((sum, item) => sum + (cart[item.productId] || 0), 0);
  }, [cartProducts, cart]);

  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + DELIVERY_FEE;

  const deleteCartItems = async (shopId) => {
    try {
      const res = await axios.post(`${LINKS.API_BASE_URL}/api/customer/deleteCartItems`, null,
        {
          withCredentials: true,
          params: {
            shopId: Number(shopId),
          }
        }
      );
      alert("Cart Cleared!!");
      handleGetCartData(shopId);
    } catch (e) {
      alert(e);
    }
  };

  const addOrDeleteToCart = async (product, cartTask) => {
    setLoading(true);
    try {
      const res = await axios.post(`${LINKS.API_BASE_URL}/api/customer/addOrDeleteToCart`, null,
        {
          withCredentials: true,
          params: {
            shopId: Number(product.shopId),
            productId: Number(product.productId),
            productPrice: Number(product.price),
            cartTask: cartTask
          }
        }
      );
      if (res.data == 'clearCart') {
        const userAccepted = window.confirm("Do you want to delete cart items of another shop as you are selecting product from different shop!!");
        if (userAccepted) {
          deleteCartItems(product.shopId);
        }
      } else {
        handleGetCartData(product.shopId);
      }
      setCartProducts(prev => prev.filter(p => p.productId !== product.productId));
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const removeItem = async (item) => {
    try {
      const currentQty = cart[item.productId] || 0;
      for (let i = 0; i < currentQty; i++) {
        await addOrDeleteToCart(item, 'delete');
      }
      setCartProducts(prev => prev.filter(p => p.productId !== item.productId));
    } catch (e) {
      console.error(e);
    }
  };

  const applyCoupon = () => {
    if (coupon === "NEAR10") setDiscount(0.1);
    else alert("Invalid Coupon");
  };

  return (
    <>
    <NearShopNavBar />

    <div className="my-cart-container">
      {loading && (
        <Loading></Loading>
      )}
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
              <img src={item.imageLink} alt={item.name} loading="lazy"/>

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <span className="stock-text">
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="cart-qty">
                {cart[item.productId] ? (
                        <>
                          <button onClick={() => addOrDeleteToCart(item, 'delete')}>-</button>
                          <span>{cart[item.productId]}</span>
                          <button onClick={() => addOrDeleteToCart(item, 'add')}>+</button>
                        </>):''}
              </div>

              <div className="cart-total">
                ₹{item.price * (cart[item.productId] || 0)}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item)}
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
            disabled={cartProducts.length === 0}
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

            <div className="summary-row total" style={{ marginBottom: '18px' }}>
              <span>{totalItems} items</span>
              <span>₹{total.toFixed(0)}</span>
            </div>

            <button
              className="confirm-pay"
              onClick={() => {
                alert("Payment Successful 🎉");
                setShowPayment(false);
                setCartProducts([]);
                setCart({});
                setCoupon("");
                setDiscount(0);
                fetchCartData(); // Refresh cart data
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

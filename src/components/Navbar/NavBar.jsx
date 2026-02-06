import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "../searchComponent/SearchBar";
import HamburgerMenu from "../Hamburgers/HamburgerMenu";

export default function NavBar() {
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);

  const userName = localStorage.getItem("username") || "Ankush";
  const role = localStorage.getItem("role") || "customer";

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close when pressing ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenProfile(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="nearshop-navbar">
      {/* Left: Logo */}
      {/* <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          🛒 NearShop
        </Link>
      </div> */}

      {/* Center: Search */}
        <SearchBar />

      {/* Right: Actions */}
      <div className="navbar-right">
        {/* Cart */}
        <Link to="/cart" className="navbar-cart">
          🛍️
          <span className="cart-badge">2</span>
        </Link>

        {/* Profile */}
        <div
          className="navbar-profile"
          ref={dropdownRef}
          onClick={() => setOpenProfile((prev) => !prev)}
          role="button"
          aria-haspopup="menu"
          aria-expanded={openProfile}
        >
          <div className="profile-trigger">
            <span className="avatar">
              {userName.charAt(0).toUpperCase()}
            </span>
            <span className="name">{userName}</span>
            <span className="chevron">▾</span>
          </div>

          {openProfile && (
            <div className="profile-dropdown">
              {role === "customer" && (
                <>
                  <Link to="/customer/profile">Profile</Link>
                  < Link to="/customer/orders">My Orders</Link>
                  <Link to="/customer/notifications">Notifications</Link>
                </>
              )}
              

              {role === "shopkeeper" && (
                <>
                <Link to="/shopkeeper/profile">Profile</Link>
                < Link to="/shopkeeper/orders">My Orders</Link>
                <Link to="/shopkeeper/notifications">Notifications</Link>
                <Link to="/products">My Products</Link>
                </>
              )}

              {role === "superadmin" && (
                <Link to="/dashboard">Admin Dashboard</Link>
              )}

              <div className="divider" />

              <Link to="/login" className="logout">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

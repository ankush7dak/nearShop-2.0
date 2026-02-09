import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import HamburgerMenu from "../../Hamburgers/HamburgerMenu";
import SearchBar from "../searchComponent/searchBar";

export default function NavBar({ data }) {
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const cartCount = 0 

  const userName =
    localStorage.getItem("username") || "Ankush";
  const role =
    localStorage.getItem("role") || "customer";

  // Close when clicking outside
  useEffect(() => {
    if (!openProfile) return;

    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openProfile]);

  // Close when pressing ESC
  useEffect(() => {
    if (!openProfile) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenProfile(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [openProfile]);

  const handleLogout = () => {
    localStorage.clear(); // or remove specific keys
    navigate("/login");
  };

  return (
    <header className="nearshop-navbar">
      {/* Left: Hamburger / Logo */}
      {data && <div className="shop-name-container">{data.name}</div>}
      {/* Center: Search */}
      <SearchBar />

      {/* Right: Actions */}
      <div className="navbar-right">
        {/* Cart */}
        <Link to="/customer/cart" className="navbar-cart">
          🛍️
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>

        {/* Profile */}
        <div className="navbar-profile" ref={dropdownRef}>
          <button
            className="profile-trigger"
            onClick={() => setOpenProfile((p) => !p)}
            aria-haspopup="menu"
            aria-expanded={openProfile}
          >
            <span className="avatar">
              {userName.charAt(0).toUpperCase()}
            </span>
            <span className="name">{userName}</span>
            <span className="chevron">▾</span>
          </button>

          {openProfile && (
            <div className="profile-dropdown" role="menu">
              {role === "customer" && (
                <>
                  <Link to="/customer/profile">Profile</Link>
                  <Link to="/customer/orders">My Orders</Link>
                  <Link to="/customer/cart">My Cart</Link>

                  <Link to="/customer/notifications">
                    Notifications
                  </Link>
                </>
              )}

              {role === "shopkeeper" && (
                <>
                  <Link to="/shopkeeper/profile">Profile</Link>
                  <Link to="/shopkeeper/orders">My Orders</Link>
                  <Link to="/shopkeeper/notifications">
                    Notifications
                  </Link>
                  <Link to="/products">My Products</Link>
                </>
              )}

              {role === "superadmin" && (
                <Link to="/dashboard">Admin Dashboard</Link>
              )}

              <div className="divider" />

              <button
                className="logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

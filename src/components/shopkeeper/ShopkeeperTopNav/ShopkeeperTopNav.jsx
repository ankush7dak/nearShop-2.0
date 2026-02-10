import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaStore,
  FaPowerOff,
} from "react-icons/fa";
import "./ShopkeeperTopNav.css";
import HamburgerMenu from "../../Hamburgers/HamburgerMenu";

export default function ShopkeeperTopNav() {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sk-topnav">

      {/* LEFT */}
      <HamburgerMenu></HamburgerMenu>
      <div className="sk-topnav-left">
        <FaStore className="logo-icon" />
        <h2>NearShop Seller</h2>
      </div>

      {/* RIGHT */}
      <div className="sk-topnav-right">

        {/* SHOP STATUS */}
        <button className="shop-status-btn open">
          Open
        </button>

        {/* NOTIFICATIONS */}
        <Link to="/shopkeeper/notifications" className="icon-btn">
          <FaBell />
          <span className="badge">3</span>
        </Link>

        {/* PROFILE */}
        <div className="profile-wrapper" ref={dropdownRef}>
          <button
            className="profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <FaUserCircle />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <Link to="/shopkeeper/profile">My Profile</Link>
              <Link to="/shopkeeper/shop">Shop Settings</Link>
              <Link to="/shopkeeper/bank">Bank Details</Link>
              <hr />
              <button className="logout-btn">
                <FaPowerOff /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

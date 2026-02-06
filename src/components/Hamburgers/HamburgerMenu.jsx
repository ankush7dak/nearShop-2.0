import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HamburgerMenu.css";
import { HOME_BY_ROLE } from "../../constants/HomeByRole";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role") || "customer";

  const menuItems = {
    customer: [
      { name: "Home", path: HOME_BY_ROLE.customer },
      { name: "My Orders", path: "/customer/orders" },
      { name: "Nearby Shops", path: "/customer/nearby-shops" },
      { name: "Profile", path: "/customer/profile" },
      { name: "Profile Management", path: "/profile-management" },
      { name: "Notifications", path: "/notifications" },
      { name: "Logout", path: "/login" },
    ],
    shopkeeper: [
      { name: "Home", path: HOME_BY_ROLE.shopkeeper },
      { name: "Products", path: "/products" },
      { name: "Orders", path: "/orders" },
      { name: "Profile", path: "/shopkeeper/profile" },
    ],
    superadmin: [
      { name: "Dashboard", path: "/" },
      { name: "Users", path: "/users" },
      { name: "Shops", path: "/shops" },
      { name: "Reports", path: "/reports" },
    ],
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div
        className={`hamburger-icon ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Background overlay */}
      {open && <div className="menu-backdrop" onClick={() => setOpen(false)} />}

      {/* Side Menu */}
      {<div className={`menu-overlay ${open ? "open" : ""}`}>
        {<ul>
          {menuItems[role].map((item) => (
            <li key={item.name} onClick={() => setOpen(false)}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>}
      </div>}
    </>
  );
};

export default HamburgerMenu;

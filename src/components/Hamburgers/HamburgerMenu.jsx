import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./HamburgerMenu.css";
import { HOME_BY_ROLE } from "../../constants/HomeByRole";
import { jwtDecode } from "jwt-decode";
import { accessToken } from "../../constants/constant";
import { AuthContext } from "../../contexts/authcontext/AuthProvider";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const {user,setUser} = useContext(AuthContext);
  const role = user;
  console.log("role check " + role);
  // const role = localStorage.getItem("role") || "customer";
  // const role = jwtDecode(localStorage.getItem(accessToken)).role;
  // const handleLogout= ()=>{
  //   localStorage.removeItem(accessToken);
  // }

  const menuItems = {
    customer: [
      { name: "Home", path: HOME_BY_ROLE.customer },
      // { name: "Nearby Shops", path: "/customer/nearby-shops" },
      { name: "Visited Shops", path: "/customer/visited-shops" },
      { name: "My Orders", path: "/customer/orders" },
      { name: "My Cart", path: "/customer/cart" },
      { name: "My Profile", path: "/customer/profile" },


      // { name: "Profile Management", path: "/profile-management" },
      { name: "Notifications", path: "/customer/notifications" },
      { name: "Logout", path: "/login" },
    ],
    shopkeeper: [
      { name: "Home", path: HOME_BY_ROLE.shopkeeper },
      { name: "Products", path: "/shopkeeper/inventory" },
      { name: "Orders", path: "/shopkeeper/orders" },
      { name: "Profile", path: "/shopkeeper/profile" },
      { name: "Logout", path: "/login" },

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
              {(item.name == 'Logout')?<Link to={item.path} >{item.name}</Link>:<Link to={item.path}>{item.name}</Link>}
            </li>
          ))}
        </ul>}
      </div>}
    </>
  );
};

export default HamburgerMenu;

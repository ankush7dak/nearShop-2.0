import React from "react";
import "./ShopkeeperDashboard.css";
import {
  FaShoppingBag,
  FaClipboardList,
  FaRupeeSign,
  FaBoxes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";

export default function ShopkeeperDashboard() {
  return (
    <>
    <ShopkeeperTopNav></ShopkeeperTopNav>
    <div className="sk-dashboard">

      {/* HEADER */}
      <div className="sk-dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome back 👋 Here’s today’s overview</p>
      </div>

      {/* STATS GRID */}
      <div className="sk-stats-grid">
        <StatCard
          icon={<FaClipboardList />}
          title="New Orders"
          value="12"
          link="/shopkeeper/orders"
        />
        <StatCard
          icon={<FaRupeeSign />}
          title="Today’s Revenue"
          value="₹4,520"
        />
        <StatCard
          icon={<FaShoppingBag />}
          title="Total Products"
          value="245"
          link="/shopkeeper/products"
        />
        <StatCard
          icon={<FaBoxes />}
          title="Low Stock"
          value="8"
          danger
          link="/shopkeeper/inventory"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="sk-quick-actions">
        <h3>Quick Actions</h3>

        <div className="sk-actions-grid">
          <Link to="/shopkeeper/orders" className="sk-action-card">
            📦 Manage Orders
          </Link>

          <Link to="/shopkeeper/products" className="sk-action-card">
            🛒 Add Products
          </Link>

          <Link to="/shopkeeper/inventory" className="sk-action-card">
            📊 Inventory
          </Link>

          <Link to="/shopkeeper/profile" className="sk-action-card">
            🏪 Shop Profile
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

/* -------------------------------- */

function StatCard({ icon, title, value, link, danger }) {
  const Wrapper = link ? Link : "div";

  return (
    <Wrapper
      to={link}
      className={`sk-stat-card ${danger ? "danger" : ""}`}
    >
      <div className="sk-stat-icon">{icon}</div>

      <div className="sk-stat-info">
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </Wrapper>
  );
}

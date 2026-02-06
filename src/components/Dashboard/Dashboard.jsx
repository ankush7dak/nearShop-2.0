import React from "react";
import "./Dashboard.css"; // Import the CSS file

// Mock Data
const mockData = {
  customer: {
    name: "Ankush",
    recentOrders: [
      { id: 1, shop: "NearShop Grocery", total: 500, status: "Delivered" },
      { id: 2, shop: "FreshMart", total: 250, status: "Pending" },
    ],
    nearbyShops: [
      { id: 1, name: "NearShop Grocery", distance: "1.2 km" },
      { id: 2, name: "FreshMart", distance: "2 km" },
    ],
  },
  shopkeeper: {
    name: "Vicky's Store",
    productsCount: 12,
    pendingOrders: 5,
    totalRevenue: 12500,
  },
  superadmin: {
    totalUsers: 102,
    totalShops: 25,
    pendingApprovals: 3,
  },
};

const Dashboard = () => {
  const role = localStorage.getItem("role"); // customer | shopkeeper | superadmin
  if (!role) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard - {role}</h1>

      {/* CUSTOMER */}
      {role === "customer" && (
        <div className="dashboard-section">
          <h2>Recent Orders</h2>
          <ul className="list">
            {mockData.customer.recentOrders.map((order) => (
              <li key={order.id}>
                {order.shop} - ₹{order.total} ({order.status})
              </li>
            ))}
          </ul>

          <h2>Nearby Shops</h2>
          <ul className="list">
            {mockData.customer.nearbyShops.map((shop) => (
              <li key={shop.id}>
                {shop.name} - {shop.distance}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SHOPKEEPER */}
      {role === "shopkeeper" && (
        <div className="dashboard-section">
          <p><strong>Store:</strong> {mockData.shopkeeper.name}</p>
          <p><strong>Products:</strong> {mockData.shopkeeper.productsCount}</p>
          <p><strong>Pending Orders:</strong> {mockData.shopkeeper.pendingOrders}</p>
          <p><strong>Total Revenue:</strong> ₹{mockData.shopkeeper.totalRevenue}</p>
        </div>
      )}

      {/* SUPERADMIN */}
      {role === "superadmin" && (
        <div className="dashboard-section">
          <p><strong>Total Users:</strong> {mockData.superadmin.totalUsers}</p>
          <p><strong>Total Shops:</strong> {mockData.superadmin.totalShops}</p>
          <p><strong>Pending Approvals:</strong> {mockData.superadmin.pendingApprovals}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useMemo, useState } from "react";
import "./MyOrders.css";

const MOCK_ORDERS = [
  {
    id: "ORD12345",
    shop: "Fresh Mart",
    date: "2026-02-01",
    status: "Delivered",
    total: 560,
    items: ["Milk 1L", "Bread", "Rice"],
  },
  {
    id: "ORD12346",
    shop: "Veg Bazaar",
    date: "2026-02-04",
    status: "Active",
    total: 230,
    items: ["Tomato", "Potato"],
  },
  {
    id: "ORD12347",
    shop: "City Pharmacy",
    date: "2026-01-28",
    status: "Cancelled",
    total: 120,
    items: ["Paracetamol"],
  },
  {
    id: "ORD12348",
    shop: "Electro World",
    date: "2026-02-02",
    status: "Delivered",
    total: 3200,
    items: ["Power Bank", "Charger"],
  },
];

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredOrders = useMemo(() => {
    let data = [...MOCK_ORDERS];

    if (activeTab !== "All") {
      data = data.filter((o) => o.status === activeTab);
    }

    if (search) {
      data = data.filter(
        (o) =>
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.shop.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "oldest") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  }, [activeTab, search, sort]);

  return (
    <div className="customer-orders-container">
        <div className="nearshop-orders-page">
      <h2 className="page-title">My Orders</h2>

      {/* FILTER BAR */}
      <div className="orders-toolbar">
        <div className="tabs">
          {["All", "Active", "Delivered", "Cancelled"].map((t) => (
            <button
              key={t}
              className={activeTab === t ? "tab active" : "tab"}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="filters">
          <input
            placeholder="Search orders or shops"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* ORDER LIST */}
      <div className="orders-list">
        {filteredOrders.length === 0 && (
          <div className="empty-orders">
            <h3>No orders found</h3>
            <p>Try adjusting filters or search.</p>
          </div>
        )}

        {filteredOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-top">
              <div>
                <h4>{order.shop}</h4>
                <p>Order ID: {order.id}</p>
                <p className="order-date">{order.date}</p>
              </div>

              <span
                className={`status-badge ${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>
            </div>

            <div className="order-middle">
              <p>
                {order.items.join(", ")}
              </p>
            </div>

            <div className="order-bottom">
              <div className="price">₹{order.total}</div>

              <div className="actions">
                {order.status === "Active" && (
                  <button className="btn secondary">Track</button>
                )}

                {order.status === "Delivered" && (
                  <>
                    <button className="btn secondary">Invoice</button>
                    <button className="btn primary">Reorder</button>
                  </>
                )}

                {order.status === "Cancelled" && (
                  <button className="btn secondary">Details</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
}

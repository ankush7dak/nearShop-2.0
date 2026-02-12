import { useState } from "react";
import "./ShopkeeperOrders.css";
import {
  FaSearch,
  FaCheck,
  FaTimes,
  FaEye,
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";

const DUMMY_ORDERS = [
  {
    id: "ORD1023",
    customer: "Rahul",
    amount: 540,
    status: "NEW",
    time: "5 mins ago",
    items: ["Rice", "Milk", "Bread"],
  },
  {
    id: "ORD1024",
    customer: "Sneha",
    amount: 320,
    status: "PREPARING",
    time: "20 mins ago",
    items: ["Paracetamol", "ORS"],
  },
  {
    id: "ORD1025",
    customer: "Amit",
    amount: 890,
    status: "DELIVERED",
    time: "1 hr ago",
    items: ["Shampoo", "Soap"],
  },
];

const STATUS_TABS = ["ALL", "NEW", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

export default function ShopkeeperOrders() {
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchStatus =
      activeTab === "ALL" ? true : o.status === activeTab;

    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <>
    <ShopkeeperTopNav></ShopkeeperTopNav>
    <div className="orders-page">
      <h2>📦 Orders Management</h2>

      {/* Top Bar */}
      <div className="orders-topbar">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Search by Order ID or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="status-tabs">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replaceAll("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="orders-grid">
        {filteredOrders.length === 0 && (
          <p className="no-orders">No orders found</p>
        )}

        {filteredOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-head">
              <span className="order-id">{order.id}</span>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status.replaceAll("_", " ")}
              </span>
            </div>

            <p>
              <strong>Customer:</strong> {order.customer}
            </p>
            <p>
              <strong>Items:</strong> {order.items.join(", ")}
            </p>
            <p>
              <strong>Amount:</strong> ₹{order.amount}
            </p>
            <p className="time">{order.time}</p>

            <div className="order-actions">
              <button
                className="view"
                onClick={() => setSelectedOrder(order)}
              >
                <FaEye /> View
              </button>

              {order.status === "NEW" && (
                <>
                  <button
                    className="accept"
                    onClick={() => updateStatus(order.id, "PREPARING")}
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    className="reject"
                    onClick={() => updateStatus(order.id, "CANCELLED")}
                  >
                    <FaTimes /> Reject
                  </button>
                </>
              )}

              {order.status === "PREPARING" && (
                <button
                  className="delivery"
                  onClick={() =>
                    updateStatus(order.id, "OUT_FOR_DELIVERY")
                  }
                >
                  <FaTruck /> Out for delivery
                </button>
              )}

              {order.status === "OUT_FOR_DELIVERY" && (
                <button
                  className="complete"
                  onClick={() => updateStatus(order.id, "DELIVERED")}
                >
                  <FaBoxOpen /> Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Order Details</h3>
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {selectedOrder.items.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <button onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

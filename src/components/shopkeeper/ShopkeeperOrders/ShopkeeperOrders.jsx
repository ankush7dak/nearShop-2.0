import { useState } from "react";
import "./ShopkeeperOrders.css";

const dummyOrders = [
  {
    id: "ORD1023",
    customer: "Rohit",
    items: 5,
    total: 540,
    status: "NEW",
    type: "DELIVERY",
    time: "10:42 AM",
  },
  {
    id: "ORD1024",
    customer: "Aman",
    items: 2,
    total: 180,
    status: "PREPARING",
    type: "PICKUP",
    time: "10:15 AM",
  },
];

export default function ShopkeeperOrders() {
  const [orders, setOrders] = useState(dummyOrders);
  const [filter, setFilter] = useState("ALL");

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((o) => o.status === filter);

  return (
    <div className="sk-orders-page">

      {/* HEADER */}
      <div className="sk-orders-header">
        <h2>Orders</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="NEW">New</option>
          <option value="PREPARING">Preparing</option>
          <option value="READY">Ready</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* LIST */}
      <div className="sk-orders-list">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            setOrders={setOrders}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function OrderCard({ order, setOrders }) {
  const handleStatusChange = (newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );
  };

  return (
    <div className="sk-order-card">

      <div className="sk-order-main">
        <h4>{order.id}</h4>
        <p>{order.customer}</p>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <div className="sk-order-meta">
        <p>{order.items} items</p>
        <p>₹{order.total}</p>
        <p>{order.type}</p>
        <p>{order.time}</p>
      </div>

      <div className="sk-order-actions">
        {order.status === "NEW" && (
          <>
            <button onClick={() => handleStatusChange("PREPARING")}>
              Accept
            </button>
            <button className="danger">Reject</button>
          </>
        )}

        {order.status === "PREPARING" && (
          <button onClick={() => handleStatusChange("READY")}>
            Mark Ready
          </button>
        )}

        {order.status === "READY" && (
          <button onClick={() => handleStatusChange("COMPLETED")}>
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

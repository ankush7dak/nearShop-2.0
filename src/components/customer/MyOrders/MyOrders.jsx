
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customer's orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:8081/api/orders/my-orders",
          {
            withCredentials: true,
          }
        );

        setOrders(response.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    let data = [...orders];

    // Status filter
    if (activeTab !== "All") {
      data = data.filter((o) => {
        if (activeTab === "Active") {
          return ["PLACED", "CONFIRMED", "PROCESSING", "OUT_FOR_DELIVERY"].includes(
            o.orderStatus
          );
        }

        if (activeTab === "Delivered") {
          return o.orderStatus === "DELIVERED";
        }

        if (activeTab === "Cancelled") {
          return o.orderStatus === "CANCELLED";
        }

        return true;
      });
    }

    // Search by order ID, shop name or product name
    if (search.trim()) {
      const searchText = search.toLowerCase();

      data = data.filter((o) => {
        const orderIdMatch = String(o.orderId)
          .toLowerCase()
          .includes(searchText);

        const shopMatch = String(o.shopName || "")
          .toLowerCase()
          .includes(searchText);

        const productMatch = (o.items || []).some((item) =>
          String(item.productName || "")
            .toLowerCase()
            .includes(searchText)
        );

        return orderIdMatch || shopMatch || productMatch;
      });
    }

    // Sort
    if (sort === "oldest") {
      data.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() -
          new Date(b.orderDate).getTime()
      );
    } else {
      data.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() -
          new Date(a.orderDate).getTime()
      );
    }

    return data;
  }, [orders, activeTab, search, sort]);

  const getStatusText = (status) => {
    switch (status) {
      case "PLACED":
        return "Placed";
      case "CONFIRMED":
        return "Confirmed";
      case "PROCESSING":
        return "Processing";
      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";
      case "DELIVERED":
        return "Delivered";
      case "CANCELLED":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PLACED":
      case "CONFIRMED":
      case "PROCESSING":
      case "OUT_FOR_DELIVERY":
        return "active";

      case "DELIVERED":
        return "delivered";

      case "CANCELLED":
        return "cancelled";

      default:
        return "";
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
              placeholder="Search orders or products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="empty-orders">
            <h3>Loading orders...</h3>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="empty-orders">
            <h3>{error}</h3>
          </div>
        )}

        {/* ORDER LIST */}
        {!loading && !error && (
          <div className="orders-list">
            {filteredOrders.length === 0 && (
              <div className="empty-orders">
                <h3>No orders found</h3>
                <p>Try adjusting filters or search.</p>
              </div>
            )}

            {filteredOrders.map((order) => (
              <div className="order-card" key={order.orderId}>
                {/* TOP */}
                <div className="order-top">
                  <div>
                    <h4>{order.shopName || `Shop #${order.shopId}`}</h4>

                    <p>Shop ID: {order.shopId}</p>

                    <p>Order ID: {order.orderId}</p>

                    <p className="order-date">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>

                  <span
                    className={`status-badge ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {getStatusText(order.orderStatus)}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="order-middle">
                  {(order.items || []).map((item) => (
                    <div
                      className="order-item"
                      key={item.orderItemId || item.productId}
                    >
                      <div>
                        <strong>{item.productName}</strong>

                        <span>
                          {" "}
                          × {item.quantity}
                        </span>
                      </div>

                      <div>
                        ₹{item.itemTotal}
                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTTOM */}
                <div className="order-bottom">
                  <div className="price">
                    ₹{order.totalAmount}
                  </div>

                  <div className="actions">
                    {[
                      "PLACED",
                      "CONFIRMED",
                      "PROCESSING",
                      "OUT_FOR_DELIVERY",
                    ].includes(order.orderStatus) && (
                      <button className="btn secondary">
                        Track
                      </button>
                    )}

                    {order.orderStatus === "DELIVERED" && (
                      <>
                        <button className="btn secondary">
                          Invoice
                        </button>

                        <button className="btn primary">
                          Reorder
                        </button>
                      </>
                    )}

                    {order.orderStatus === "CANCELLED" && (
                      <button className="btn secondary">
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

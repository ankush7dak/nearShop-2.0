import React, { useState } from "react";
import "./NotificationsPage.css";

export default function NotificationsPage() {

  const initialNotifications = [
    {
      id: 1,
      title: "Order Delivered 🎉",
      message: "Your order #NS1023 has been delivered successfully.",
      type: "orders",
      time: "2h ago",
      unread: true
    },
    {
      id: 2,
      title: "20% OFF Nearby!",
      message: "FreshMart is offering 20% discount near you.",
      type: "offers",
      time: "5h ago",
      unread: true
    },
    {
      id: 3,
      title: "Payment Received",
      message: "₹560 paid successfully for order #NS1021.",
      type: "system",
      time: "Yesterday",
      unread: false
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  /* ---------------- FILTER ---------------- */

  const filtered =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => n.unread).length;

  /* ---------------- ACTIONS ---------------- */

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  return (
    <div className="notification-container">
        <div className="nearshop-notifications-page">

      {/* HEADER */}
      <div className="notifications-header">

        <div>
          <h2>Notifications</h2>
          <p>{unreadCount} unread</p>
        </div>

        <button onClick={markAllRead}>
          Mark all as read
        </button>
      </div>

      {/* TABS */}
      <div className="notification-tabs">

        {["all", "orders", "offers", "system"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}

      </div>

      {/* LIST */}
      <div className="notification-list">

        {filtered.length === 0 && (
          <div className="empty-state">
            🔔 No notifications here
          </div>
        )}

        {filtered.map((n) => (
          <div
            key={n.id}
            className={`notification-card ${
              n.unread ? "unread" : ""
            }`}
          >

            <div className="notification-left">

              <span className={`badge ${n.type}`}>
                {n.type}
              </span>

              <div>
                <h4>{n.title}</h4>
                <p>{n.message}</p>
                <small>{n.time}</small>
              </div>

            </div>

            <div className="notification-actions">

              {n.unread && (
                <button onClick={() => markAsRead(n.id)}>
                  Mark Read
                </button>
              )}

              <button
                className="danger"
                onClick={() => deleteNotification(n.id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./Notifications.css";

const Notifications = ({ role = "customer" }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data: replace with API call to fetch notifications
    if (role === "customer") {
      setNotifications([
        { id: 1, type: "order", message: "Your order #1234 is shipped", time: "2h ago" },
        { id: 2, type: "order", message: "Order #1233 delivered successfully", time: "1d ago" },
      ]);
    } else if (role === "shop") {
      setNotifications([
        { id: 1, type: "announcement", message: "New shop promotion starts today", time: "3h ago" },
        { id: 2, type: "order", message: "New order #567 received", time: "30m ago" },
      ]);
    } else {
      setNotifications([]);
    }
  }, [role]);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((note) => (
            <li key={note.id} className={`notification-item ${note.type}`}>
              <div className="message">{note.message}</div>
              <div className="time">{note.time}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

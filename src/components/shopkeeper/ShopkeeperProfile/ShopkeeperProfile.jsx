import { useState } from "react";
import "./ShopkeeperProfile.css";
import {
  FaStore,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaCreditCard,
  FaLock,
  FaSave,
  FaUpload,
} from "react-icons/fa";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";

export default function ShopkeeperProfile() {
  const [profile, setProfile] = useState({
    ownerName: "Ramesh Kumar",
    email: "ramesh@nearshop.com",
    phone: "9876543210",

    shopName: "Ramesh Grocery",
    shopCategory: "Grocery",
    gst: "22ABCDE1234F1Z5",

    address: "Station Road, Gaya",
    city: "Gaya",
    pincode: "823001",

    openTime: "08:00",
    closeTime: "22:00",

    upi: "ramesh@upi",
    bank: "HDFC Bank",
    account: "1234567890",

    deliveryEnabled: true,
    vacationMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PROFILE UPDATED =>", profile);
    alert("Profile saved (mock)");
  };

  return (
    <>
    <ShopkeeperTopNav></ShopkeeperTopNav>
    <div className="shop-profile-page">

      <h2>🏪 Shopkeeper Profile & Store Settings</h2>

      <form onSubmit={handleSubmit}>

        {/* Owner Info */}
        <section className="profile-card">
          <h3><FaUser /> Owner Details</h3>

          <div className="grid">
            <input
              name="ownerName"
              value={profile.ownerName}
              onChange={handleChange}
              placeholder="Owner Name"
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
        </section>

        {/* Shop Info */}
        <section className="profile-card">
          <h3><FaStore /> Shop Details</h3>

          <div className="grid">
            <input
              name="shopName"
              value={profile.shopName}
              onChange={handleChange}
              placeholder="Shop Name"
            />

            <select
              name="shopCategory"
              value={profile.shopCategory}
              onChange={handleChange}
            >
              <option>Grocery</option>
              <option>Medical</option>
              <option>Electronics</option>
              <option>Cosmetics</option>
            </select>

            <input
              name="gst"
              value={profile.gst}
              onChange={handleChange}
              placeholder="GST Number"
            />
          </div>
        </section>

        {/* Address */}
        <section className="profile-card">
          <h3><FaMapMarkerAlt /> Address</h3>

          <div className="grid">
            <input
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Street Address"
            />

            <input
              name="city"
              value={profile.city}
              onChange={handleChange}
              placeholder="City"
            />

            <input
              name="pincode"
              value={profile.pincode}
              onChange={handleChange}
              placeholder="Pincode"
            />
          </div>
        </section>

        {/* Timings */}
        <section className="profile-card">
          <h3><FaClock /> Business Hours</h3>

          <div className="grid">
            <div>
              <label>Open</label>
              <input
                type="time"
                name="openTime"
                value={profile.openTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Close</label>
              <input
                type="time"
                name="closeTime"
                value={profile.closeTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Payments */}
        <section className="profile-card">
          <h3><FaCreditCard /> Payment Info</h3>

          <div className="grid">
            <input
              name="upi"
              value={profile.upi}
              onChange={handleChange}
              placeholder="UPI ID"
            />

            <input
              name="bank"
              value={profile.bank}
              onChange={handleChange}
              placeholder="Bank Name"
            />

            <input
              name="account"
              value={profile.account}
              onChange={handleChange}
              placeholder="Account Number"
            />
          </div>
        </section>

        {/* Controls */}
        <section className="profile-card">
          <h3><FaLock /> Controls</h3>

          <div className="toggle-row">
            <label>
              <input
                type="checkbox"
                name="deliveryEnabled"
                checked={profile.deliveryEnabled}
                onChange={handleChange}
              />
              Enable Delivery
            </label>

            <label>
              <input
                type="checkbox"
                name="vacationMode"
                checked={profile.vacationMode}
                onChange={handleChange}
              />
              Vacation Mode
            </label>
          </div>
        </section>

        {/* Save */}
        <div className="save-row">
          <button type="submit">
            <FaSave /> Save Changes
          </button>
        </div>

      </form>

    </div>
    </>
  );
}

import { useEffect, useState } from "react";
import "./ShopkeeperProfile.css";
import {
  FaStore,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaCreditCard,
  FaLock,
  FaSave,
} from "react-icons/fa";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";
import axios from "axios";
import { LINKS } from "../../../constants/LinksUtility";
import Loading from "../../Loading/Loading";

export default function ShopkeeperProfile() {
  const [profile, setProfile] = useState({
    ownerName: "",
    email: "",
    phone: "",
    shopName: "",
    shopCategory: "",
    shopId: "",
    address: "",
    city: "",
    pincode: "",
    openTime: "",
    closeTime: "",
    upi: "",
    bank: "",
    account: "",

    deliveryEnabled: true,
    vacationMode: false,
  });
  const [loading,setLoading] = useState(false);
  const fetchShopProfileData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${LINKS.API_BASE_URL}/api/shop/getShopProfile`,
        { withCredentials: true });
      if (res.data) {
        const userDTO = res.data.userDTO;
        const shopDTO = res.data.shopDTO;
        setProfile({
          ownerName: userDTO.name,
          email: userDTO.email,
          phone: userDTO.mobile,
          shopName: shopDTO.shopName,
          shopCategory: shopDTO.categoryName,
          shopId: shopDTO.id,
          address: shopDTO.address,
          city: shopDTO.city,
          pincode: shopDTO.pincode,
          openTime: shopDTO.openingTime,
          closeTime: shopDTO.closingTime,
          upi: "",
          bank: "",
          account: "",

          deliveryEnabled: true,
          vacationMode: false,
        });
      }
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchShopProfileData();
  }, []);

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
      <ShopkeeperTopNav />
      <div className="shop-profile-page">
        {loading && (<Loading></Loading>)}
        <h2>🏪 Shopkeeper Profile & Store Settings</h2>

        <form onSubmit={handleSubmit}>

          {/* Owner Info */}
          <section className="profile-card">
            <h3><FaUser /> Owner Details</h3>

            <div className="grid">

              <div className="form-group">
                <label htmlFor="ownerName">Owner Name</label>
                <input
                  id="ownerName"
                  name="ownerName"
                  value={profile.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </section>

          {/* Shop Info */}
          <section className="profile-card">
            <h3><FaStore /> Shop Details</h3>

            <div className="grid">

              <div className="form-group">
                <label htmlFor="shopName">Shop Name</label>
                <input
                  id="shopName"
                  name="shopName"
                  value={profile.shopName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="shopCategory">Category</label>
                <select
                  id="shopCategory"
                  name="shopCategory"
                  value={profile.shopCategory}
                  onChange={handleChange}
                >
                  <option>Grocery</option>
                  <option>Medical</option>
                  <option>Electronics</option>
                  <option>Cosmetics</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="shopId">Shop ID</label>
                <input
                  id="shopId"
                  name="shopId"
                  value={profile.shopId}
                  readOnly
                />
              </div>

            </div>
          </section>

          {/* Address */}
          <section className="profile-card">
            <h3><FaMapMarkerAlt /> Address</h3>

            <div className="grid">

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleChange}
                />
              </div>

            </div>
          </section>

          {/* Timings */}
          <section className="profile-card">
            <h3><FaClock /> Business Hours</h3>

            <div className="grid">

              <div className="form-group">
                <label htmlFor="openTime">Open Time</label>
                <input
                  type="time"
                  id="openTime"
                  name="openTime"
                  value={profile.openTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="closeTime">Close Time</label>
                <input
                  type="time"
                  id="closeTime"
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

              <div className="form-group">
                <label htmlFor="upi">UPI ID</label>
                <input
                  id="upi"
                  name="upi"
                  value={profile.upi}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bank">Bank Name</label>
                <input
                  id="bank"
                  name="bank"
                  value={profile.bank}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="account">Account Number</label>
                <input
                  id="account"
                  name="account"
                  value={profile.account}
                  onChange={handleChange}
                />
              </div>

            </div>
          </section>

          {/* Controls */}
          <section className="profile-card">
            <h3><FaLock /> Controls</h3>

            <div className="toggle-row">
              <label>
                <div className="dir-column">
                  <div>
                    <input
                      type="checkbox"
                      name="deliveryEnabled"
                      checked={profile.deliveryEnabled}
                      onChange={handleChange}
                    />
                    Enable Delivery
                  </div>
                  {profile.deliveryEnabled && (
                    <div className="label-data">
                      <input
                        type="number"
                        name="deliveryRange"
                        checked={profile.deliveryRange}
                        onChange={handleChange}
                        placeholder="Enter delivery range in kms"
                      />
                    </div>
                  )}
                </div>

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
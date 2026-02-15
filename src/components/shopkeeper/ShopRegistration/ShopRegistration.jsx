import React, { useState } from "react";
import axios from "axios";
import "./ShopRegistration.css";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";

const ShopRegistration = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    mobile: "",
    email: "",
    gstNumber: "",
    description: "",
    openingTime: "",
    closingTime: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    categoryId: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:8080/api/shops/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Shop Registered Successfully!");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (

    <>
    <ShopkeeperTopNav></ShopkeeperTopNav>
    <div className="shop-form-container">
      <h2>Shop Registration</h2>

      <form onSubmit={handleSubmit} className="shop-form">

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          value={formData.shopName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Shop Description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="time-row">
          <input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
          />

          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="1">Grocery</option>
          <option value="2">Medical</option>
          <option value="3">Electronics</option>
        </select>

        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Register Shop</button>

      </form>
    </div>
    </>
  );
};

export default ShopRegistration;

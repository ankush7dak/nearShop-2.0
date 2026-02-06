import React, { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Ankush Kumar",
    email: "ankush@email.com",
    phone: "+91 9876543210",
    address: "Gaya, Bihar",
    gender: "Male",
    dob: "1999-06-10",
    city: "Gaya",
    state: "Bihar",
    pincode: "823001"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log("Saved Profile:", profile);

    // API call will go here later

    setIsEditing(false);
  };

  return (
    <div className="profile-container-1">
      <h2 className="page-title">My Profile</h2>

      <div className="nearshop-profile-page">
        <div className="profile-card">
          {/* Avatar */}
          <div className="avatar-section">
            <img src="https://i.pravatar.cc/150" alt="profile" />

            <button
              className="change-photo-btn"
              disabled={!isEditing}
            >
              Change Photo
            </button>
          </div>

          {/* Info */}
          <div className="profile-form">
            {/* Full Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={profile.email}
                disabled
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* DOB */}
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* City */}
            <div className="form-group">
              <label>City</label>
              <input
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* State */}
            <div className="form-group">
              <label>State</label>
              <input
                name="state"
                value={profile.state}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label>Pincode</label>
              <input
                name="pincode"
                value={profile.pincode}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* Address */}
            <div className="form-group full">
              <label>Address</label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {/* ACTION BUTTON */}
            {!isEditing ? (
              <button
                className="save-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

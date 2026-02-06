import React, { useState } from "react";
import "./ProfileManagement.css";

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    console.log("Profile info updated:", profile);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (profile.newPassword !== profile.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed:", profile.newPassword);
  };

  return (
    <div className="profile-container">
      <h2>Profile Management</h2>

      <form className="profile-form" onSubmit={handleSubmitInfo}>
        <h3>Update Personal Information</h3>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            placeholder="Your Mobile"
            required
          />
        </div>

        <div className="form-group">
          <label>Email (readonly)</label>
          <input type="email" value={profile.email} readOnly />
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" name="profileImage" />
        </div>

        <button type="submit" className="btn-primary">Update Info</button>
      </form>

      <form className="profile-form" onSubmit={handleChangePassword}>
        <h3>Change Password</h3>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={profile.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={profile.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Change Password</button>
      </form>
    </div>
  );
};

export default ProfileManagement;

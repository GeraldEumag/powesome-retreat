import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import EditProfileModal from "../modals/EditProfileModal";

function UserInfoTab() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!userInfo) {
    return (
      <section className="dashboard-section profile-section">
        <h3>My Profile</h3>
        <p style={{ color: "red" }}>⚠️ No user profile data available</p>
      </section>
    );
  }

  return (
    <section className="dashboard-section profile-section">
      <h3>My Profile</h3>
      <div className="profile-info">
        <p><strong>Full Name:</strong> {userInfo.name || "Unknown"}</p>
        <p><strong>Email:</strong> {userInfo.email || "N/A"}</p>
        <p><strong>Phone:</strong> {userInfo.phone || "N/A"}</p>
        <p><strong>Address:</strong> {userInfo.address || "N/A"}</p>
        <p><strong>Member Since:</strong> {userInfo.memberSince || "N/A"}</p>
      </div>

      <div className="summary-boxes">
        <div className="summary-box">Total Bookings: <span>{userInfo.totalBookings || 0}</span></div>
        <div className="summary-box">Total Purchases: <span>{userInfo.totalPurchases || 0}</span></div>
        <div className="summary-box">My Pets: <span>{userInfo.petsCount || 0}</span></div>
      </div>

      <h4>Booking History</h4>
      <table>
        <thead>
          <tr><th>Pet Name</th><th>Service</th><th>Check-In</th><th>Check-Out</th><th>Price</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Max</td><td>Hotel Boarding</td><td>2026-02-20</td><td>2026-02-27</td><td>$350</td><td>Active</td></tr>
          <tr><td>Bella</td><td>Hotel Boarding</td><td>2025-12-15</td><td>2025-12-20</td><td>$250</td><td>Completed</td></tr>
        </tbody>
      </table>

      <button className="edit-profile-btn" onClick={() => setShowEditModal(true)}>
        Edit Profile
      </button>

      {showEditModal && (
        <EditProfileModal
          userInfo={userInfo}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedInfo) => {
            setUserInfo(updatedInfo);
            setShowEditModal(false);
          }}
        />
      )}
    </section>
  );
}

export default UserInfoTab;
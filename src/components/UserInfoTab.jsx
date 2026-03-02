import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function UserInfoTab() {
  const { currentUser, userInfo } = useContext(LoginContext);

  // ✅ Use either currentUser or userInfo (they’re the same now)
  const user = currentUser || userInfo;

  if (!user) {
    return (
      <div className="user-info-tab">
        <h2>User Info</h2>
        <p>No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="user-info-tab">
      <h2>User Info</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default UserInfoTab;
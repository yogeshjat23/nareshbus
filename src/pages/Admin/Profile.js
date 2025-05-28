import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../resources/profile.css";

function Profile() {
  const { user } = useSelector((state) => state.users || { user: null });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img
            src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
            alt="Profile"
            className="profile-pic"
          />
        </div>
        <h2>Profile</h2>
        <p><strong>Username:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.isAdmin ? "Admin" : "User"}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;

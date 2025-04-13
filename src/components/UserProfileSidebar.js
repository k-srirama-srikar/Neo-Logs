import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/sidebar.css";
import { AuthContext } from "../context/AuthContext";

const UserProfileSidebar = ({ username }) => {
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token"); // Get stored token
  const [isFollowing, setIsFollowing] = useState(false); // Track follow state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`http://localhost:8000/api/users/${username}`, { headers });

        setProfile(response.data.user);
        if (token) {
          setIsFollowing(response.data.user.is_following); // ✅ Set follow state only if logged in
        }
      } catch (error) {
        console.error("Error fetching profile ???", error);
      }
    };

    fetchProfile();
  }, [username, token]);

  const handleFollowToggle = async () => {
    if (!token) {
      alert("You need to be logged in to follow users.");
      return;
    }

    try {
      const url = isFollowing
        ? "http://localhost:8000/api/unfollow"
        : "http://localhost:8000/api/follow";

      await axios.post(url, { username }, { headers: { Authorization: `Bearer ${token}` } });

      // Update state
      setIsFollowing(!isFollowing);
      setProfile((prev) => ({
        ...prev,
        followers: isFollowing ? prev.followers - 1 : prev.followers + 1, // Update followers count
      }));
    } catch (error) {
      console.error("Error following/unfollowing", error);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-sidebar">
      <div className="profile-picture">
        <img src={profile.profile_picture || "/default-profile.png"} alt="Profile" />
      </div>
      <h2 className="profile-fullname">{profile.full_name || "No Name"}</h2>
      <p className="profile-username">@{profile.username}</p>
      <p className="profile-bio">{profile.bio || "No bio available."}</p>
      <div className="profile-stats">
        <p><strong>Followers:</strong> {profile.followers}</p>
        <p><strong>Following:</strong> {profile.following}</p>
      </div>
      
      {/* Show Edit Profile button only if the logged-in user is viewing their own profile */}
      {user?.username === username && (
        <button className="edit-profile-btn">Edit Profile</button>
      )}

      {/* Show Follow button only if logged in and viewing another user's profile */}
      {user?.username !== username && token && (
        <button className={`follow-btn ${isFollowing ? "unfollow" : ""}`} onClick={handleFollowToggle}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfileSidebar;

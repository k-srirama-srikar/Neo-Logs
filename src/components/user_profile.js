import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ username }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${username}`);
        setUser(response.data);
      } catch (err) {
        setError("User not found");
      }
    };

    fetchUserProfile();
  }, [username]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <img src={user.profile_picture || "/default-profile.png"} alt="Profile" />
      <h2>{user.full_name || user.name}</h2>
      <p>{user.bio || "No bio available"}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;

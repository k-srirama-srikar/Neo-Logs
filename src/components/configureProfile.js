import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/configureTab.css"; // Optional: your custom styles

const ConfigureTab = ({ username }) => {
  const [profile, setProfile] = useState({
    full_name: "",
    bio: "",
    overview: "",
    profile_picture: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:8000/api/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProfile(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to load user profile", err);
      setLoading(false);
    });
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.put(`http://localhost:8000/api/profile/users/${username}`, profile, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setMessage("Profile updated successfully!"))
    .catch(err => {
      console.error("Failed to update profile", err);
      setMessage("Failed to update profile.");
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="configure-tab">
      <h3>🛠️ Edit Your Profile</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="configure-form">
        <label>
          Full Name:
          <input type="text" name="full_name" value={profile.full_name || ""} onChange={handleChange} />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={profile.bio || ""} onChange={handleChange} rows="3" />
        </label>
        <label>
          Overview (Markdown Supported):
          <textarea name="overview" value={profile.overview || ""} onChange={handleChange} rows="6" />
        </label>
        <label>
          Profile Picture URL:
          <input type="text" name="profile_picture" value={profile.profile_picture || ""} onChange={handleChange} />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ConfigureTab;

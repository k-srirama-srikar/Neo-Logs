import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ username }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${username}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile">
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
      <p>Followers: {profile.followersCount}</p>
      <p>Following: {profile.followingCount}</p>
    </div>
  );
};

export default UserProfile;

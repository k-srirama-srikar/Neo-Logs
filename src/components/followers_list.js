import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowersList = ({ username }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${username}/followers`)
      .then((res) => setFollowers(res.data))
      .catch((err) => console.error(err));

    axios.get(`http://localhost:8000/api/users/${username}/following`)
      .then((res) => setFollowing(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="followers">
      <h3>Followers ({followers.length})</h3>
      <ul>{followers.map((f) => <li key={f.id}>{f.name}</li>)}</ul>

      <h3>Following ({following.length})</h3>
      <ul>{following.map((f) => <li key={f.id}>{f.name}</li>)}</ul>
    </div>
  );
};

export default FollowersList;

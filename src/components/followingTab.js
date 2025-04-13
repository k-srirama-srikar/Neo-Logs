import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/followers.css";
import { Link } from "react-router-dom";

const FollowingTab = ({ username }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/${username}/following`);
        setFollowers(res.data.followers);
      } catch (err) {
        console.error("Error fetching following", err);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div className="followers-tab">
      <h3>Following</h3>
      {followers.length === 0 ? (
        <p>No followers yet.</p>
      ) : (
        //   {followers.map((follower) => (
        //     <li key={follower.id}>
        //       <Link to={`/users/${follower.username}`}>
        //         <img src={follower.profile_picture || "/default-profile.png"} alt="Profile" />
        //         <span>{follower.full_name || follower.username}</span>
        //       </Link>
        //     </li>
        //   ))}
        // </ul>
        <div className="followers-container">
        {followers.map((user) => (
            <Link key={user.id} to={`/users/${user.username}`}>
            <div className="follower-card">
                    <span>
                    <div className="follower-info">
                    <img src={user.profile_picture || "/default_avatar.png"} alt="avatar" className="follower-avatar" />
                        <span className="follower-fullname">{user.full_name || user.username}</span> <br></br>
                        <span className="follower-username">@{user.username}</span>
                    </div></span>
            </div>
            </Link>
        ))}
        </div>
      )}
    </div>
  );
};

export default FollowingTab;

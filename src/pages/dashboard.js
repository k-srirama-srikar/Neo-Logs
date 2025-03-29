import React from "react";
import { useParams } from "react-router-dom";
// import UserProfile from "../components/user_profile";
// import UserBlogs from "../components/user_blogs";
// import FollowersList from "../components/FollowersList";
// import Notifications from "../components/Notifications";
import UserProfileSidebar from "../components/UserProfileSidebar";
import UserDashboardTabs from "../components/userdashboardtabs";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const DashboardPage = () => {
  const { username } = useParams(); // Get the username from the URL
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${username}`)
      .then((response) => setIsOwner(response.data.is_owner))
      .catch((error) => console.error("Error fetching profile", error));
  }, [username]);

  return (
    <div className="dashboard-container">
      {/* <UserProfile username={username} /> */}
      <UserProfileSidebar username={username} />
      <UserDashboardTabs username={username} isOwner={isOwner} />
      {/* <div className="dashboard-content">
        <UserBlogs username={username} />
        <FollowersList username={username} />
        <Notifications username={username} />
      </div> */}
    </div>
  );
};

export default DashboardPage;

import React from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/user_profile";
import UserBlogs from "../components/user_blogs";
// import FollowersList from "../components/FollowersList";
// import Notifications from "../components/Notifications";

const DashboardPage = () => {
  const { username } = useParams(); // Get the username from the URL

  return (
    <div className="dashboard-container">
      <UserProfile username={username} />
      <div className="dashboard-content">
        <UserBlogs username={username} />
        {/* <FollowersList username={username} />
        <Notifications username={username} /> */}
      </div>
    </div>
  );
};

export default DashboardPage;

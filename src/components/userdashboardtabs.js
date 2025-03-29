import React, { useState } from "react";
import BlogsTab from "./BlogsTab";
import CommentsTab from "./CommentsTab";
import DraftsTab from "./DraftsTab";
import FavoritesTab from "./FavoritesTab";

const UserDashboardTabs = ({ username, isOwner }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="dashboard-content">
      <div className="tab-buttons">
        <button onClick={() => setActiveTab("overview")}>Overview</button>
        <button onClick={() => setActiveTab("blogs")}>Blogs</button>
        <button onClick={() => setActiveTab("comments")}>Comments</button>
        {isOwner && <button onClick={() => setActiveTab("drafts")}>Drafts</button>}
        {isOwner && <button onClick={() => setActiveTab("favorites")}>Favorites</button>}
        {isOwner && <button onClick={() => setActiveTab("configure")}>Configure</button>}
      </div>
      
      {activeTab === "overview" && <p>User Bio here</p>}
      {activeTab === "blogs" && <BlogsTab username={username} />}
      {activeTab === "comments" && <CommentsTab username={username} />}
      {activeTab === "drafts" && isOwner && <DraftsTab username={username} />}
      {activeTab === "favorites" && isOwner && <FavoritesTab username={username} />}
    </div>
  );
};

export default UserDashboardTabs;

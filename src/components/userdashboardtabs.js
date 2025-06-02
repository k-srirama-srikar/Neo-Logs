// import React, { useState } from "react";
// import UserBlogs from "./BlogsTab";
// import CommentsTab from "./CommentsTab";
// import UserDrafts from "./DraftsTab";
// import FavoritesTab from "./FavoritesTab";
// import FollowersTab from "./followersTab"; // import this
// import FollowingTab from "./followingTab";


// const UserDashboardTabs = ({ username, isOwner }) => {
//   const [activeTab, setActiveTab] = useState("overview");

//   return (
//     <div className="dashboard-content">
//       <div className="tab-buttons">
//         <button onClick={() => setActiveTab("overview")}>Overview</button>
//         <button onClick={() => setActiveTab("blogs")}>Blogs</button>
//         <button onClick={() => setActiveTab("comments")}>Comments</button>
//         {isOwner && <button onClick={() => setActiveTab("drafts")}>Drafts</button>}
//         {isOwner && <button onClick={() => setActiveTab("favorites")}>Favorites</button>}
//         {isOwner && <button onClick={() => setActiveTab("configure")}>Configure</button>}
//         <button onClick={() => setActiveTab("followers")}>Followers</button>
//         <button onClick={() => setActiveTab("following")}>Following</button>
//       </div>
//       {activeTab === "followers" && <FollowersTab username={username} />}
//       {activeTab === "following" && <FollowingTab username={username} />}
//       {activeTab === "overview" && <p>User Bio here</p>}
//       {activeTab === "blogs" && <UserBlogs username={username} />}
//       {activeTab === "comments" && <CommentsTab username={username} />}
//       {activeTab === "drafts" && isOwner && <UserDrafts username={username} />}
//       {activeTab === "favorites" && isOwner && <FavoritesTab username={username} />}
//     </div>
//   );
// };

// export default UserDashboardTabs;


import React from "react";
import { useSearchParams } from "react-router-dom";
import UserBlogs from "./BlogsTab";
import CommentsTab from "./CommentsTab";
import UserDrafts from "./DraftsTab";
import FavoritesTab from "./FavoritesTab";
import FollowersTab from "./followersTab";
import FollowingTab from "./followingTab";
import ConfigureTab from "./configureProfile";

const UserDashboardTabs = ({ username, isOwner }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const changeTab = (tab) => {
    setSearchParams({ tab });
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "blogs":
        return <UserBlogs username={username} />;
      case "comments":
        return <CommentsTab username={username} />;
      case "drafts":
        return isOwner && <UserDrafts username={username} />;
      case "favorites":
        return isOwner && <FavoritesTab username={username} />;
      case "followers":
        return <FollowersTab username={username} />;
      case "following":
        return <FollowingTab username={username} />;
      case "configure":
        // return isOwner && <p>Settings Page</p>;
        return isOwner && <ConfigureTab username={username}/>
      default:
        return <p>User Bio here</p>;
    }
  };

  return (
    <div className="dashboard-content">
      <div className="tab-buttons">
        <button onClick={() => changeTab("overview")}>Overview</button>
        <button onClick={() => changeTab("blogs")}>Blogs</button>
        <button onClick={() => changeTab("comments")}>Comments</button>
        {isOwner && <button onClick={() => changeTab("drafts")}>Drafts</button>}
        {isOwner && <button onClick={() => changeTab("favorites")}>Favorites</button>}
        {isOwner && <button onClick={() => changeTab("configure")}>Configure</button>}
        <button onClick={() => changeTab("followers")}>Followers</button>
        <button onClick={() => changeTab("following")}>Following</button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default UserDashboardTabs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";

const UserDrafts = ({ username }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/drafts/users/${username}`, {headers})
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h2>📝 @{username}'s Drafts</h2>
      </div>
      {blogs === null || blogs.length === 0 ? (
          <p>No drafts found.</p>
        ) : (
        <div className="blog-list">
            {blogs.map(blog => <BlogCard key={blog.id} blog={blog} isDraft={true} />)}
        </div>
      )}
    </div>
  );
};

export default UserDrafts;
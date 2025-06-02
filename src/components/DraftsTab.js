import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";
// import { Link } from "react-router-dom";

const UserDrafts = ({ username }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`http://localhost:8000/api/blogs/drafts/users/${username}`, {headers})
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    // <div className="blogs">
    //   <h2>{username}'s Blogs</h2>
    //   {blogs.map((blog) => (
    //     <div key={blog.id} className="blog-post">
    //       <h3>{blog.title}</h3>
    //       <p>{blog.content}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="blogs-page">
          <div className="blogs-header">
            <h2>📝 @{username}'s Drafts</h2>
            {/* <Link to="/blogs/new"><button className="post-btn">Post Blog</button></Link> */}
          </div>
          {blogs === null ? (
              <p>No drafts found.</p>
            ) : (
            <div className="blog-list">
                {blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
            </div>
        )}
        </div>
  );
};

export default UserDrafts;
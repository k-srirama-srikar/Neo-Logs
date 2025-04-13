import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";
import { Link } from "react-router-dom";
import "../styles/blogs.css";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios
      .get(`http://localhost:8000/api/blogs`, {headers})
      .then(res => {
        const data = res.data||[];
        console.log(res.data);
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => console.error("Failed to fetch blogs", err));
  }, []);

  
  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h2>📝 All Blogs</h2>
        <Link to="/blogs/new"><button className="post-btn">Post Blog</button></Link>
      </div>
      {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
        <div className="blog-list">
            {blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
        </div>
    )}
    </div>
)
};

export default BlogsPage;

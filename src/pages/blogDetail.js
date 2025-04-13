import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../styles/blogdetail.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`http://localhost:8000/api/blogs/${id}`, {headers})
      .then(res => setBlog(res.data))
      .catch(err => console.error("Error loading blog", err));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <p className="blog-meta">By {blog.username} • {new Date(blog.created_at).toLocaleString()}</p>
      <div className="blog-tags">
        {blog.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
      </div>
      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </div>
  );
};

export default BlogDetailPage;

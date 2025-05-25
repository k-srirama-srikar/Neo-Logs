import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../styles/blogdetail.css";
import CommentsSection from "../components/comments/CommentSection";

const BlogDetailPage = () => {
  const { id: blogId } = useParams(); // renamed for clarity
  const [blog, setBlog] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios.get(`http://localhost:8000/api/blogs/${blogId}`, { headers })
      .then(res => setBlog(res.data))
      .catch(err => console.error("Error loading blog", err));
  }, [blogId]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:8000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.id);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <p className="blog-meta">By {blog.username} • {new Date(blog.created_at).toLocaleString()}</p>
      <div className="blog-tags">
        {blog.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
      </div>
      <ReactMarkdown>{blog.content}</ReactMarkdown>

      <div className="prose">
        <CommentsSection blogId={blogId} userId={userId} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
